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
const { LANHDAO, TRANG, getDinhDang } = require('../config/config');

const contentW = TRANG.W - 1800 - 1080;  // 9026
const colSL = Math.round(contentW * 0.52); // 4694
const colSR = contentW - colSL;            // 4332

/**
 * @param {object} opts
 * @param {string[]} opts.noiNhan - Danh sách nơi nhận (mỗi phần tử là 1 dòng "- ...")
 * @param {string} opts.nguoiKy - Key trong LANHDAO: 'chuTich' | 'pctKinhTe' | 'pctVHXH' | 'truongPhongVHXH'
 * @param {string} opts.loai - Loại VB (để áp size Nơi nhận đúng - BC=11pt, khác=12pt)
 * @param {string} opts.tenDonViSoan - Ký hiệu đơn vị soạn (thay vào "Lưu: VT, XXX")
 */
function signatureBlock({ noiNhan = [], nguoiKy = 'chuTich', loai = 'KH', tenDonViSoan = 'VHXH' }) {
  const dd = getDinhDang(loai);
  const nnSize = dd.noiNhanSize;   // 22 hoặc 24
  const ld = LANHDAO[nguoiKy];

  if (!ld) {
    throw new Error(`signatureBlock: nguoiKy "${nguoiKy}" không tồn tại trong LANHDAO`);
  }

  // Xử lý nơi nhận: thay [Ký hiệu đơn vị soạn] nếu có
  const processedNoiNhan = noiNhan.map(n =>
    n.replace('[Ký hiệu đơn vị soạn]', tenDonViSoan)
  );

  // Đảm bảo có "Lưu: VT, ..." ở cuối
  const hasLuu = processedNoiNhan.some(n => n.includes('Lưu:'));
  if (!hasLuu) {
    processedNoiNhan.push(`- Lưu: VT, ${tenDonViSoan}.`);
  }

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
        spacing: { ...sp0, after: 40 },
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

module.exports = { signatureBlock };
