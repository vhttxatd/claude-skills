/**
 * partials/base.js - HÀM TIỆN ÍCH CỐT LÕI
 * =========================================
 * Mọi partials khác và templates đều import từ đây.
 */

const {
  Paragraph, TextRun, AlignmentType, BorderStyle, LineRuleType,
  HeadingLevel,
} = require('docx');

const { TRANG, DIVIDER, HEADING, LIET_KE } = require('../config/config');

const { BODY, SMALL, INDENT } = TRANG;

// Spacing = 0 tuyệt đối (dùng trong bảng tiêu đề, chữ ký)
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT };

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
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: {
      before: opts.before ?? 0,
      after: opts.after ?? 100,
      line: opts.line || 276,
    },
    indent: opts.noIndent ? undefined : { firstLine: INDENT },
    pageBreakBefore: opts.pageBreak || false,
    children: typeof text === 'string'
      ? [r(text, { size: BODY, bold: opts.bold, italic: opts.italic })]
      : text,
  });
}

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
 * Divider — ký tự `-` lặp lại, đậm, căn giữa.
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
      spacing: { before: 0, after: opts.after ?? 0, line: 240, lineRule: LineRuleType.EXACT },
      children: [r("-".repeat(viTri), { bold: true, size: DIVIDER.size })],
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
      lineRule: LineRuleType.EXACT,
    },
    children: [r("-".repeat(cfg.width), { bold: true, size: DIVIDER.size })],
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
function heading(cap, text) {
  const cfg = HEADING[cap];
  if (!cfg) throw new Error(`heading: cấp ${cap} không hợp lệ (1..4)`);
  return new Paragraph({
    heading: HeadingLevel[`HEADING_${cap}`],
    children: [r(text, { bold: cfg.bold, italic: cfg.italics, size: BODY })],
  });
}

const h1 = (text) => heading(1, text);
const h2 = (text) => heading(2, text);
const h3 = (text) => heading(3, text);
const h4 = (text) => heading(4, text);

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
  r, bp, cellP, emp, divider,
  heading, h1, h2, h3, h4, lietKe, dieu,
};
