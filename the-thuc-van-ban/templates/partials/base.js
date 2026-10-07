/**
 * partials/base.js - HÀM TIỆN ÍCH CỐT LÕI
 * =========================================
 * Mọi partials khác và templates đều import từ đây.
 */

const {
  Paragraph, TextRun, AlignmentType, BorderStyle, LineRuleType,
  HeadingLevel, ExternalHyperlink, FootnoteReferenceRun,
} = require('docx');

const { TRANG, DIVIDER, HEADING, LIET_KE, LINK_VB, tenUBND, FOOTNOTE } = require('../config/config');

const { BODY, SMALL, INDENT } = TRANG;

// Spacing = 0 tuyệt đối (dùng trong bảng tiêu đề, chữ ký)
// ⚠️ Dòng ĐƠN TỰ ĐỘNG (AUTO), KHÔNG dùng EXACT: EXACT 12pt cắt dấu/chồng dòng với chữ 13-14pt (lỗi lặp lại, sửa 06/10/2026).
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.AUTO };

// Border
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder, bottom: noBorder, left: noBorder,
  right: noBorder, insideH: noBorder, insideV: noBorder,
};
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const solidBorders = {
  top: solidBorder, bottom: solidBorder,
  left: solidBorder, right: solidBorder,
  insideH: solidBorder, insideV: solidBorder,
};

/** TextRun cơ bản — font TNR mặc định */
function r(text, opts = {}) {
  return new TextRun({
    text,
    font: "Times New Roman",
    bold: opts.bold || false,
    italics: opts.italic || false,
    size: opts.size || BODY,
    color: opts.color || undefined,
  });
}

/**
 * Chuỗi có link → mảng run. Cú pháp: [chữ](https://url) — dùng cho SỐ KÝ HIỆU văn bản dẫn chiếu:
 *   "Kế hoạch số [63](https://drive.google.com/...)/KHPH-MTTQ-UBND ngày 28/9/2026"
 * Chỉ phần trong [] là hyperlink (xanh lam đậm, không gạch chân), phần còn lại giữ nguyên chữ → in giấy không mất nội dung.
 * Chuỗi không có link → 1 run thường (giống r()).
 */
const RE_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const RE_TOKEN = /\[\^(\d+)\]|\[([^\]^][^\]]*)\]\((https?:\/\/[^)\s]+)\)/g;   // [^n] = footnote; [chữ](url) = link

// ---- CHÚ THÍCH CUỐI TRANG: chuThich(1, 'Kế hoạch số ...') rồi viết "[^1]" trong thân văn bản ----
const _chuThich = {};
function chuThich(n, text) { _chuThich[n] = text; }
function layChuThich() {
  const o = {};
  Object.keys(_chuThich).forEach((n) => {
    o[n] = { children: [new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { before: 0, after: 40 },
      children: [r(` ${_chuThich[n]}`, { size: FOOTNOTE.size })] })] };
  });
  return o;
}
function runsCoLink(text, opts = {}) {
  const out = [];
  let last = 0, m;
  RE_TOKEN.lastIndex = 0;
  while ((m = RE_TOKEN.exec(text)) !== null) {
    if (m.index > last) out.push(r(text.slice(last, m.index), opts));
    if (m[1] !== undefined) {                       // [^n] → số chú thích
      if (!_chuThich[m[1]]) throw new Error(`[the-thuc-van-ban] Thiếu nội dung chú thích [^${m[1]}] — gọi chuThich(${m[1]}, '...') trước`);
      out.push(new FootnoteReferenceRun(Number(m[1])));
      last = m.index + m[0].length; continue;
    }
    out.push(new ExternalHyperlink({
      link: m[3],
      children: [new TextRun({
        text: m[2], font: "Times New Roman", size: opts.size || BODY,
        bold: opts.bold || false, italics: opts.italic || false,
        color: LINK_VB.color, underline: LINK_VB.underline ? {} : undefined,
      })],
    }));
    last = m.index + m[0].length;
  }
  if (last < text.length || out.length === 0) out.push(r(text.slice(last), opts));
  return out;
}

/** Cảnh báo (không chặn) khi dẫn chiếu "số 63/KHPH-..." mà chưa gắn link. Tắt bằng opts.noLink = true. */
const RE_SO_KY_HIEU = /(?:số|Số)\s+(\d{1,6}\/[A-ZĐ][A-Za-zĐđ0-9\-]*(?:-[A-ZĐ][A-Za-zĐđ0-9\-]*)*)/g;
const daCanhBao = new Set();
function canhBaoThieuLink(text, opts = {}) {
  if (opts.noLink || typeof text !== 'string') return;
  const sach = text.replace(RE_LINK, '');            // bỏ phần đã có link
  let m; RE_SO_KY_HIEU.lastIndex = 0;
  while ((m = RE_SO_KY_HIEU.exec(sach)) !== null) {
    const k = m[1];
    if (daCanhBao.has(k)) continue;
    daCanhBao.add(k);
    console.warn(`[the-thuc-van-ban] ⚠ Dẫn chiếu "số ${k}" CHƯA gắn link. Tra link Drive trong Notion Tbl_QLVB_ATĐ rồi viết ` +
      `"số [${k.split('/')[0]}](url)/${k.split('/').slice(1).join('/')}"; chưa có file thì truyền { noLink: true } và nói rõ với Hiếu.`);
  }
}

/**
 * Bắt lỗi thân văn bản tự đánh số / tự gạch đầu dòng.
 * Quy tắc cứng: đoạn văn nội dung KHÔNG mang STT "1." "2." và KHÔNG mở đầu
 * bằng "-". Đánh số chỉ dành cho ĐỀ MỤC (h1..h4).
 */
const RE_TU_DANH_DAU = /^\s*(\d+[.)]|[a-zA-Zđ][).])\s+|^\s*[-•*+]\s+/;

function chanTuDanhDau(text, opts) {
  if (opts._lietKe || opts.noCheck) return;              // lối thoát có chủ đích
  if (typeof text !== 'string') return;
  if (!RE_TU_DANH_DAU.test(text)) return;
  throw new Error(
    `[the-thuc-van-ban] Đoạn văn thân bài không được tự đánh số/gạch đầu dòng:\n` +
    `   "${text.slice(0, 60)}..."\n` +
    `   → Nếu đây là ĐỀ MỤC: dùng h1/h2/h3/h4.\n` +
    `   → Nếu là đoạn văn: bỏ tiền tố, viết thành đoạn văn liền mạch.\n` +
    `   → Nếu là DANH SÁCH liệt kê: dùng lietKe([...]) để tự chọn đúng định dạng.`
  );
}

/** Paragraph thân văn bản (có thụt đầu dòng, justify) */
function bp(text, opts = {}) {
  chanTuDanhDau(text, opts);
  canhBaoThieuLink(text, opts);
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: {
      before: opts.before ?? 0,
      after: opts.after ?? 100,
      line: opts.line || 276,
    },
    indent: opts.noIndent ? undefined : { firstLine: INDENT },
    pageBreakBefore: opts.pageBreak || false,
    keepNext: opts.keepNext || false,
    children: typeof text === 'string'
      ? runsCoLink(text, { size: BODY, bold: opts.bold, italic: opts.italic })
      : text,
  });
}

/**
 * MỤC ĐÁNH SỐ KIỂU ĐƠN GIẢN — cho văn bản chỉ có MỘT cấp mục (công văn chỉ đạo, thông báo, giấy mời...).
 * Là đoạn văn thường (KHÔNG gắn Heading style), số thứ tự in đậm. (Hiếu chốt 07/10/2026)
 *   kieu 'tieuDe' (mặc định khi mục có nhiều ý con): cả dòng đậm, tiếp theo là các gạch đầu dòng gach()
 *        mucSo(1, 'Giao Phòng Văn hóa - Xã hội:', { kieu: 'tieuDe' })   → **1. Giao Phòng Văn hóa - Xã hội:**
 *   kieu 'doan' (mặc định): mục chỉ là 1 đoạn văn — chỉ SỐ in đậm, nội dung nối liền cùng đoạn
 *        mucSo(2, 'Giao Công an xã ...')                                   → **2.** Giao Công an xã ...
 * Văn bản có từ 2 cấp mục trở lên (KH, BC, TTr dài, QĐ...) vẫn dùng h1..h4.
 */
function mucSo(so, text, opts = {}) {
  const kieu = opts.kieu || 'doan';
  canhBaoThieuLink(text, opts);
  const children = kieu === 'tieuDe'
    ? [r(`${so}. ${text}`, { bold: true })]
    : [r(`${so}.`, { bold: true }), ...runsCoLink(` ${text}`, { bold: false })];
  return new Paragraph({
    alignment: kieu === 'tieuDe' ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
    spacing: { before: opts.before ?? 60, after: opts.after ?? (kieu === 'tieuDe' ? 60 : 100), line: 276 },
    indent: { firstLine: INDENT },
    keepNext: kieu === 'tieuDe',
    children,
  });
}

/**
 * MỞ ĐẦU BÁO CÁO (và văn bản tương tự: không có "Kính gửi", mở bằng "Thực hiện ...") — Hiếu chốt 07/10/2026.
 *   Đoạn 1: "Thực hiện <VB 1>;  <VB 2>;  <VB cuối>."  — nhiều văn bản: cách nhau bằng dấu chấm phẩy, văn bản cuối dấu chấm;
 *           chỉ 1 văn bản: dấu chấm.
 *   Đoạn 2 (xuống dòng): "Ủy ban nhân dân xã [An Thới Đông] báo cáo ..., cụ thể như sau:"
 * Mỗi văn bản NHẮC LẦN ĐẦU phải ghi đủ: loại, số (gắn link), ngày, cơ quan ban hành, trích yếu.
 * @param {string[]} o.canCu    - mỗi phần tử: "Công văn số [10613](url)/SKHCN-KTSXHS ngày ... của Sở ... về ..." (không cần dấu cuối câu)
 * @param {string}   o.noiDung  - phần sau tên cơ quan, vd "báo cáo sơ kết hoạt động của ..., cụ thể như sau:"
 * @param {boolean}  [o.guiNgoai=true] - true: "xã An Thới Đông"; false: "xã" (xem TEN_XA trong config)
 */
function moDauBaoCao({ canCu = [], noiDung, guiNgoai = true } = {}) {
  if (!canCu.length || !noiDung) throw new Error('[the-thuc-van-ban] moDauBaoCao: cần canCu[] và noiDung');
  const bo = (s) => s.trim().replace(/[;,.]+$/, '');
  const ds = canCu.map(bo);
  const cau = ds.map((t, i) => `${t}${i === ds.length - 1 ? '.' : ';'}`);
  return [
    bp(`Thực hiện ${cau[0]}`),
    ...cau.slice(1).map((t) => bp(t)),
    bp(`${tenUBND(guiNgoai)} ${noiDung.trim()}`),
  ];
}

/** Gạch đầu dòng dưới mục kieu 'tieuDe' (thụt đầu dòng như đoạn văn, đúng quy tắc gạch đầu dòng). */
const gach = (text, opts = {}) => bp(`- ${text}`, { ...opts, _lietKe: true });

/** Paragraph trong ô bảng tiêu đề (spacing = 0, căn giữa) */
function cellP(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.CENTER,
    spacing: sp0,
    children: typeof text === 'string'
      ? [r(text, {
          bold: opts.bold, italic: opts.italic,
          size: opts.size || BODY,
        })]
      : text,
  });
}

/** Dòng trống */
function emp(n = 1) {
  return Array(n).fill(null).map(() =>
    new Paragraph({
      spacing: { before: 0, after: 0, line: 200 },
      children: [r("", { size: BODY })],
    })
  );
}

/**
 * Divider — ký tự `—` (DIVIDER.char) lặp lại, đậm, căn giữa, cỡ 4pt → đường liền nét.
 * ⚠️ KHÔNG truyền số trực tiếp. Dùng tên vị trí để đọc từ config.DIVIDER:
 *      divider('coQuan') | divider('quocHieu') | divider('trichYeu')
 * Muốn đổi độ rộng / giãn cách sau → sửa DIVIDER trong config/config.js.
 */
function divider(viTri = 'coQuan', opts = {}) {
  // Tương thích ngược: nếu lỡ truyền số, vẫn chạy nhưng cảnh báo.
  if (typeof viTri === 'number') {
    console.warn('[the-thuc-van-ban] divider(number) đã lỗi thời — dùng divider("coQuan"|"quocHieu"|"trichYeu") để lấy thông số từ config.');
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: opts.after ?? 0, line: 240, lineRule: LineRuleType.AUTO },
      children: [r((DIVIDER.char || "-").repeat(viTri), { bold: true, size: DIVIDER.size })],
    });
  }
  const cfg = DIVIDER[viTri];
  if (!cfg) throw new Error(`divider: vị trí "${viTri}" không hợp lệ (coQuan | quocHieu | trichYeu)`);
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: {
      before: 0,
      after: opts.after ?? cfg.after,
      line: 240,
      lineRule: LineRuleType.AUTO,
    },
    children: [r((DIVIDER.char || "-").repeat(cfg.width), { bold: true, size: DIVIDER.size })],
  });
}

/**
 * HEADING — phân cấp thống nhất (xem HEADING trong config/config.js):
 *   h1 "I. ..."      Level 1 — phần lớn nhất
 *   h2 "1. ..."      Level 2 — mục
 *   h3 "1.1. ..."    Level 3 — tiểu mục
 *   h4 "a) ..."      Level 4 — mục nhỏ, in nghiêng
 * Cỡ chữ, thụt đầu dòng, giãn cách lấy từ paragraphStyles (document-builder.js).
 */
function heading(cap, text, opts = {}) {
  const cfg = HEADING[cap];
  if (!cfg) throw new Error(`heading: cấp ${cap} không hợp lệ (1..4)`);
  return new Paragraph({
    heading: HeadingLevel[`HEADING_${cap}`],
    pageBreakBefore: opts.pageBreak || false,
    children: [r(text, { bold: cfg.bold, italic: cfg.italics, size: BODY })],
  });
}

const h1 = (text, opts) => heading(1, text, opts);
const h2 = (text, opts) => heading(2, text, opts);
const h3 = (text, opts) => heading(3, text, opts);
const h4 = (text, opts) => heading(4, text, opts);

/**
 * LIỆT KÊ TRONG THÂN VĂN BẢN — dùng chung cho MỌI loại văn bản.
 *
 * ⚠️ ĐIỀU KIỆN BẮT BUỘC: chỉ dùng khi có CÂU DẪN mở danh sách (kết thúc bằng
 * dấu hai chấm). Nhiều đoạn văn độc lập đứng cạnh nhau trong cùng một đề mục
 * KHÔNG phải là liệt kê — chúng là đoạn văn thường, viết bằng bp().
 *
 * Định dạng tự chọn theo số mục (ngưỡng ở LIET_KE trong config):
 *    1 mục   → gộp thẳng vào câu dẫn, không đánh dấu
 *    2 mục   → gạch đầu dòng "-"
 *    >2 mục  → đánh số thứ tự "1." "2." "3."
 * Câu dẫn và mọi mục đều thụt đầu dòng như đoạn văn thường.
 *
 * @param {object} opts
 * @param {string}   opts.cauDan - Câu dẫn mở danh sách, PHẢI kết thúc bằng ":"
 * @param {string[]} opts.muc    - Các mục cần liệt kê
 * @returns {Paragraph[]} gồm câu dẫn + các mục
 *
 * @example
 *   h2("1. Thể chế"),
 *   ...lietKe({
 *     cauDan: "Sau khi Ban Chỉ đạo được kiện toàn, tại xã còn các vướng mắc sau:",
 *     muc: [
 *       "Chưa thành lập Tổ công tác hợp nhất...",
 *       "Cơ chế phối hợp, đầu mối chuyển đổi số chưa được xác lập...",
 *     ],
 *   }),
 */
function lietKe({ cauDan, muc, ...opts } = {}) {
  if (typeof cauDan !== 'string' || !cauDan.trim()) {
    throw new Error(
      '[the-thuc-van-ban] lietKe: thiếu "cauDan".\n' +
      '   Liệt kê chỉ hợp lệ khi có câu dẫn mở danh sách (kết thúc bằng ":").\n' +
      '   Nếu đây chỉ là nhiều đoạn văn độc lập trong cùng một đề mục thì KHÔNG\n' +
      '   phải liệt kê — viết từng đoạn bằng bp(), không đánh số, không gạch đầu dòng.'
    );
  }
  if (!cauDan.trim().endsWith(':')) {
    throw new Error(
      `[the-thuc-van-ban] lietKe: câu dẫn phải kết thúc bằng dấu hai chấm ":".\n` +
      `   Hiện tại: "${cauDan.slice(-40)}"\n` +
      '   Không có câu dẫn mở danh sách thì viết thành các đoạn văn thường bằng bp().'
    );
  }
  if (!Array.isArray(muc)) {
    throw new Error('[the-thuc-van-ban] lietKe: "muc" phải là mảng các nội dung liệt kê.');
  }

  const ds = muc.filter(t => t !== null && t !== undefined && t !== '');
  const dan = bp(cauDan, { ...opts, _lietKe: true });
  if (ds.length === 0) return [dan];

  // 1 mục: không tách danh sách, viết tiếp thành đoạn văn thường
  if (ds.length === 1) {
    return [dan, bp(ds[0], { ...opts, _lietKe: true })];
  }

  // Từ ngưỡng trở lên: đánh số. Dưới ngưỡng (2 mục): gạch đầu dòng.
  const dungSTT = ds.length >= LIET_KE.nguongDungSTT;
  return [dan, ...ds.map((text, i) =>
    bp(`${dungSTT ? `${i + 1}. ` : '- '}${text}`, { ...opts, _lietKe: true })
  )];
}

function dieu(soDieu, noiDung) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 120, after: 100, line: 276 },
    indent: { firstLine: INDENT },
    children: [
      r(`Điều ${soDieu}. `, { bold: true, size: BODY }),
      r(noiDung, { size: BODY }),
    ],
  });
}

module.exports = {
  sp0, noBorder, noBorders, solidBorder, solidBorders,
  r, runsCoLink, chuThich, layChuThich, canhBaoThieuLink, bp, cellP, emp, divider,
  heading, h1, h2, h3, h4, lietKe, dieu, mucSo, gach, moDauBaoCao,
};
