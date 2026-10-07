/**
 * partials/signature.js - NƠI NHẬN + CHỮ KÝ
 * ============================================
 * Bảng 2 cột không viền:
 *   - Cột trái: "Nơi nhận:" + danh sách
 *   - Cột phải: Chức danh + khoảng trống + họ tên
 */

const {
  Table, TableRow, TableCell, WidthType, AlignmentType, Paragraph,
} = require('docx');

const { r, emp, noBorders, sp0 } = require('./base');
const { LANHDAO, TRANG, getDinhDang , contentWidth, CHU_KY_NHIEU_BEN, NOI_NHAN_UBND} = require('../config/config');

// Bề rộng thân trang lấy từ nguồn duy nhất (config), không gõ số DXA thủ công.
const contentW = contentWidth('MAC_DINH');
const colSL = Math.round(contentW * 0.52); // 4694
const colSR = contentW - colSL;            // 4332

/**
 * NƠI NHẬN CỦA VĂN BẢN DO UBND XÃ BAN HÀNH (Hiếu chốt 07/10/2026) — trả về mảng dòng "- ...".
 * Thứ tự cố định: [1] dòng 1 → [2] lãnh đạo UBND → [3] cơ quan/đơn vị khác → [4] tham mưu → [5] VP → [6] Lưu.
 *  [1] coKinhGui=true → "- Như trên;"  |  ngược lại → donViYeuCau (đơn vị yêu cầu thực hiện VB này,
 *      vd BC do Sở KHCN yêu cầu: 'Sở Khoa học và Công nghệ Thành phố' → "- Sở Khoa học và Công nghệ Thành phố (để báo cáo);")
 *      Không có cả hai (VB chủ động, không ai yêu cầu) → bỏ dòng 1.
 *  [2] lanhDao: 'macDinh' (Chủ tịch, các PCT UBND xã) | 'thuongTruc' (Thường trực UBND xã) | chuỗi tự do | false
 *  [3] coQuanKhac: mảng — cơ quan/đơn vị khác, ghi sẵn chú thích nếu cần: 'Ban Chỉ đạo xã (để báo cáo)'
 *  [4] thamMuu: đơn vị tham mưu (mặc định Phòng Văn hóa - Xã hội) | false
 *  [5] VP: CVP, PVP/TH — luôn có  |  [6] Lưu: VT, <tenDonViSoan>-Hiếu. — luôn là dòng cuối
 */
function noiNhanUBND({ coKinhGui = false, donViYeuCau, lanhDao = 'macDinh', coQuanKhac = [], thamMuu, tenDonViSoan = 'VHXH' } = {}) {
  const N = NOI_NHAN_UBND;
  const dong = (s) => `- ${String(s).trim().replace(/^-\s*/, '').replace(/[;.]+$/, '')};`;
  const ds = [];
  if (coKinhGui) ds.push(N.nhuTren);
  else if (donViYeuCau) {
    const t = String(donViYeuCau).trim();
    ds.push(dong(t.includes('(') ? t : `${t} ${N.dong1GhiChu}`));
  }
  if (lanhDao) ds.push(N.lanhDao[lanhDao] || dong(lanhDao));
  coQuanKhac.forEach(c => ds.push(dong(c)));
  if (thamMuu !== false) ds.push(dong(thamMuu || N.thamMuuMacDinh));
  ds.push(N.vp);
  ds.push(`- Lưu: VT, ${tenDonViSoan}-${N.nguoiSoan}.`);
  return ds;
}

/**
 * @param {object} opts
 * @param {boolean} opts.ubnd - true khi VB do UBND xã ban hành (không có donViBanHanh) → áp noiNhanUBND.
 *        noiNhan là mảng RỖNG → tự dựng toàn bộ theo mặc định; là OBJECT → tham số của noiNhanUBND;
 *        là MẢNG có dòng → giữ nguyên các dòng đó, nhưng vẫn đảm bảo có "VP: CVP, PVP/TH" và dòng Lưu cuối.
 * @param {boolean} opts.coKinhGui - VB có khối "Kính gửi" (CV, TTr) → dòng 1 = "- Như trên;"
 * @param {string[]|object} opts.noiNhan - Danh sách nơi nhận (mỗi phần tử là 1 dòng "- ...")
 * @param {string} opts.nguoiKy - Key trong LANHDAO: 'chuTich' | 'pctKinhTe' | 'pctVHXH' | 'truongPhongVHXH'
 * @param {string} opts.loai - Loại VB (để áp size Nơi nhận đúng - BC=11pt, khác=12pt)
 * @param {string} opts.tenDonViSoan - Ký hiệu đơn vị soạn (thay vào "Lưu: VT, XXX")
 */
function signatureBlock({ noiNhan = [], nguoiKy = 'chuTich', loai = 'KH', tenDonViSoan = 'VHXH', ubnd = false, coKinhGui = false }) {
  const dd = getDinhDang(loai);
  const nnSize = dd.noiNhanSize;   // 22 hoặc 24
  const ld = LANHDAO[nguoiKy];

  if (!ld) {
    throw new Error(`signatureBlock: nguoiKy "${nguoiKy}" không tồn tại trong LANHDAO`);
  }

  // Xử lý nơi nhận: thay [Ký hiệu đơn vị soạn] nếu có
  let dsNN;
  if (!Array.isArray(noiNhan)) {
    dsNN = noiNhanUBND({ coKinhGui, tenDonViSoan, ...noiNhan });          // object tham số
  } else if (ubnd && noiNhan.length === 0) {
    dsNN = noiNhanUBND({ coKinhGui, tenDonViSoan });                      // mặc định UBND
  } else {
    dsNN = [...noiNhan];
  }
  const processedNoiNhan = dsNN.map(n =>
    n.replace('[Ký hiệu đơn vị soạn]', tenDonViSoan)
  );

  // Đảm bảo có "Lưu: VT, ..." ở cuối (VB UBND: "VT, <đơn vị>-Hiếu"; luôn là dòng cuối cùng)
  const iLuu = processedNoiNhan.findIndex(n => n.includes('Lưu:'));
  const dongLuu = iLuu >= 0 ? processedNoiNhan.splice(iLuu, 1)[0]
    : (ubnd ? `- Lưu: VT, ${tenDonViSoan}-${NOI_NHAN_UBND.nguoiSoan}.` : `- Lưu: VT, ${tenDonViSoan}.`);
  // VB UBND: bắt buộc có dòng VP ngay trên dòng Lưu
  if (ubnd && !processedNoiNhan.some(n => /^-\s*VP:/i.test(n))) processedNoiNhan.push(NOI_NHAN_UBND.vp);
  processedNoiNhan.push(dongLuu);

  const leftCell = new TableCell({
    borders: noBorders,
    width: { size: colSL, type: WidthType.DXA },
    children: [
      new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: sp0,
        children: [r("Nơi nhận:", { bold: true, italic: true, size: nnSize })],
      }),
      ...processedNoiNhan.map(l => new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: sp0,
        indent: { left: 120 },
        children: [r(l, { size: nnSize })],
      })),
    ],
  });

  // Cột phải: chữ ký
  const rightChildren = [];

  if (ld.chucDanhDay) {
    rightChildren.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: sp0,
      children: [r(ld.chucDanhDay, { bold: true, size: TRANG.BODY })],
    }));
  }

  rightChildren.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: sp0,
    children: [r(ld.chucDanh, { bold: true, size: TRANG.BODY })],
  }));

  // 4 dòng trống để ký
  rightChildren.push(...emp(4));

  // Họ tên người ký
  rightChildren.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: sp0,
    children: [r(ld.hoTen, { bold: true, size: TRANG.BODY })],
  }));

  const rightCell = new TableCell({
    borders: noBorders,
    width: { size: colSR, type: WidthType.DXA },
    children: rightChildren,
  });

  return new Table({
    width: { size: contentW, type: WidthType.DXA },
    columnWidths: [colSL, colSR],
    borders: noBorders,
    rows: [new TableRow({ children: [leftCell, rightCell] })],
  });
}


/**
 * CHỮ KÝ NHIỀU BÊN (biên bản, văn bản có nhiều bên cùng ký).
 * QUY TẮC CỨNG: cơ quan phát hành văn bản LUÔN Ở CỘT PHẢI CUỐI, mọi tình huống.
 * Thứ tự cột từ trái sang phải: người lập (nếu có) → các bên ký nhận → cơ quan phát hành.
 * Hàm tự xếp thứ tự, người gọi không được đảo cột.
 *
 * @param {object} o
 * @param {{dong:string[],hoTen:string}} [o.nguoiLap]  - cột đầu bên trái (vd người lập biên bản)
 * @param {{dong:string[],hoTen:string}[]} [o.cacBenKy] - các bên ký nhận, xếp giữa theo thứ tự truyền vào
 * @param {{dong:string[],hoTen:string}} o.coQuanPhatHanh - cột cuối bên phải
 * @param {string} [o.loai] - loại VB (bề rộng thân trang)
 */
function chuKyNhieuBen({ nguoiLap, cacBenKy = [], coQuanPhatHanh, loai = 'MAC_DINH' }) {
  if (!coQuanPhatHanh) {
    throw new Error('chuKyNhieuBen: thiếu coQuanPhatHanh (cơ quan phát hành luôn ở cột phải cuối).');
  }
  const cot = [...(nguoiLap ? [nguoiLap] : []), ...cacBenKy, coQuanPhatHanh];
  const ext = CHU_KY_NHIEU_BEN.moRongMoiBen;
  const tong = contentWidth(loai) + ext * 2;
  const w = cot.map((_, i) => i < cot.length - 1 ? Math.floor(tong / cot.length) : tong - Math.floor(tong / cot.length) * (cot.length - 1));
  const maxDong = Math.max(...cot.map(c => c.dong.length));

  const cell = (c, wi) => new TableCell({
    borders: noBorders,
    width: { size: wi, type: WidthType.DXA },
    margins: { left: 0, right: 0 },
    children: [
      ...c.dong.map(t => {
        const o = typeof t === 'string' ? { text: t, bold: true } : t;   // dong: chuoi (in dam) hoac {text, bold, italic}
        return new Paragraph({
          keepNext: true, alignment: AlignmentType.CENTER, spacing: sp0,
          children: [r(o.text, { bold: o.bold ?? false, italic: o.italic || false, size: TRANG.BODY })],
        });
      }),
      // đệm để họ tên các cột thẳng hàng khi số dòng nhãn khác nhau
      ...Array(maxDong - c.dong.length).fill(0).map(() => new Paragraph({ spacing: sp0, children: [r("")] })),
      ...emp(CHU_KY_NHIEU_BEN.soDongKy),
      new Paragraph({
        alignment: AlignmentType.CENTER, spacing: sp0,
        children: [r(c.hoTen, { bold: true, size: TRANG.BODY })],
      }),
    ],
  });

  return new Table({
    width: { size: tong, type: WidthType.DXA },
    indent: { size: -ext, type: WidthType.DXA },   // nới đều ra ngoài lề 2 bên
    columnWidths: w,
    borders: noBorders,
    rows: [new TableRow({ cantSplit: true, children: cot.map((c, i) => cell(c, w[i])) })],
  });
}

module.exports = { signatureBlock, chuKyNhieuBen, noiNhanUBND };
