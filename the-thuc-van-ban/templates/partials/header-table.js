/**
 * partials/header-table.js - BẢNG TIÊU ĐỀ (QUỐC HIỆU + CƠ QUAN)
 * ===============================================================
 * Chứa P01 (Quốc hiệu), P02 (Cơ quan), P03 (Số ký hiệu),
 * P04 (Địa danh ngày), P05 (Trích yếu công văn).
 *
 * Loại CV: trích yếu nằm DƯỚI số ký hiệu (cột trái, không đậm).
 * Loại khác: trích yếu nằm DƯỚI tên loại VB (căn giữa, đậm).
 */

const {
  Table, TableRow, TableCell, WidthType, AlignmentType,
} = require('docx');

const { COQUAN, QUOCHIEU, KY_HIEU, TRANG } = require('../config/config');
const { cellP, noBorders, divider, r, sp0 } = require('./base');
const { Paragraph } = require('docx');

const contentW = TRANG.W - 1800 - 1080;   // 9026 DXA (dùng margin KH/CV - mặc định)
const colL = Math.round(contentW * 0.44); // ~3971
const colR = contentW - colL;              // ~5055

/**
 * Tạo bảng tiêu đề (header table).
 * @param {object} opts
 * @param {string} opts.loai - CV | BC | KH | TTr | QD | TB | GM
 * @param {string} opts.so - Số văn bản (ví dụ "125")
 * @param {string} opts.nam - Năm (ví dụ "2026")
 * @param {string} opts.ngay - Ngày (số, để trống thì hiện "...")
 * @param {string} opts.thang - Tháng (số, để trống thì hiện "...")
 * @param {string} opts.trichYeu - Trích yếu (CHỈ dùng cho CV - nằm dưới ký hiệu)
 */
function headerTable({ loai, so = "", nam = "20..", ngay = "", thang = "", trichYeu = "" }) {
  // Ký hiệu văn bản
  const kh = KY_HIEU[loai] || "";
  const soKyHieu = kh
    ? `Số:     /${nam}/${kh}-${COQUAN.kyHieuUBND}`
    : `Số:     /${COQUAN.kyHieuUBND}`;
  const soDisplay = so
    ? (kh ? `Số: ${so}/${nam}/${kh}-${COQUAN.kyHieuUBND}` : `Số: ${so}/${COQUAN.kyHieuUBND}`)
    : soKyHieu;

  // Địa danh, ngày tháng
  const ngayStr = ngay || "    ";
  const thangStr = thang || "    ";
  const diaDanhNgay = `${COQUAN.diaDanh}, ngày ${ngayStr} tháng ${thangStr} năm ${nam}`;

  // Cột trái: cơ quan + số ký hiệu
  const leftChildren = [
    cellP(COQUAN.banHanh_dong1),                 // "ỦY BAN NHÂN DÂN" (không đậm - cơ quan chủ quản)
    cellP(COQUAN.banHanh_dong2, { bold: true }), // "XÃ AN THỚI ĐÔNG" (đậm)
    divider(12),                                  // Gạch dưới tên cơ quan
    cellP(soDisplay),                             // Số ký hiệu
  ];

  // Nếu là Công văn: thêm trích yếu vào cột trái (dưới ký hiệu, không đậm, in nghiêng)
  if (loai === 'CV' && trichYeu) {
    leftChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp0,
        children: [r(`V/v ${trichYeu}`, { italic: true, size: 26 })],  // 13pt
      })
    );
  }

  // Cột phải: quốc hiệu + địa danh ngày
  const rightChildren = [
    cellP(QUOCHIEU.dong1, { bold: true }),
    cellP(QUOCHIEU.dong2, { bold: true }),
    divider(14),
    cellP(diaDanhNgay, { italic: true }),
  ];

  return new Table({
    width: { size: contentW, type: WidthType.DXA },
    columnWidths: [colL, colR],
    borders: noBorders,
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: colL, type: WidthType.DXA },
          children: leftChildren,
        }),
        new TableCell({
          borders: noBorders,
          width: { size: colR, type: WidthType.DXA },
          children: rightChildren,
        }),
      ],
    })],
  });
}

module.exports = { headerTable };
