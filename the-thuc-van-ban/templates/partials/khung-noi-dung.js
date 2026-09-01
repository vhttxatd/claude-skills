/**
 * partials/khung-noi-dung.js - KHỐI NỘI DUNG ĐÓNG KHUNG (Phiếu trình)
 * ====================================================================
 * Bảng 1 cột, 2 hàng có viền, theo thể thức Phiếu trình nội bộ:
 *   Hàng 1: khoản 1 (Tóm tắt nội dung) + khoản 2 (Ý kiến đề xuất)
 *           + địa danh ngày tháng + chữ ký người trình (căn phải)
 *   Hàng 2: Ý kiến của Trưởng Phòng + chữ ký
 *
 * ⚠️ Đây là NGUỒN DUY NHẤT của thể thức khung Phiếu trình.
 *    Không chép lại code khung này ở references/ hay skill khác.
 */

const {
  Table, TableRow, TableCell, WidthType, AlignmentType, Paragraph,
} = require('docx');

const { r, bp, emp, solidBorders } = require('./base');
const { COQUAN, LANHDAO, TRANG, getDinhDang } = require('../config/config');

const KHUNG_MARGIN = { top: 120, bottom: 120, left: 160, right: 160 };

/**
 * @param {object} opts
 * @param {string[]} opts.tomTat      - Các đoạn của khoản 1 (Tóm tắt nội dung)
 * @param {string[]} opts.deXuat      - Các đoạn của khoản 2 (Ý kiến đề xuất)
 * @param {string}   opts.nguoiTrinh  - Họ tên người trình (mặc định Phan Trung Hiếu)
 * @param {string}   opts.chucDanhNguoiTrinh - Mặc định "CHUYÊN VIÊN"
 * @param {string}   opts.ngay, opts.thang, opts.nam
 * @param {string}   opts.yKienTruongPhong  - Mặc định "Thống nhất"
 * @param {string}   opts.truongPhong       - Mặc định lấy từ LANHDAO.truongPhongVHXH
 * @param {number}   opts.contentW   - Bề rộng thân trang (DXA)
 */
function khungNoiDungPhieuTrinh({
  tomTat = ["[Căn cứ + mục đích]"],
  deXuat = ["[Nội dung đề xuất]"],
  nguoiTrinh = "Phan Trung Hiếu",
  chucDanhNguoiTrinh = "CHUYÊN VIÊN",
  ngay = "", thang = "", nam = "2026",
  yKienTruongPhong = "Thống nhất",
  truongPhong = LANHDAO.truongPhongVHXH.hoTen,
  contentW = TRANG.W - 1800 - 1080,
} = {}) {
  const dd = getDinhDang('PTr');
  const line = dd.lineSpacing;
  const ngayStr = ngay || "     ";
  const thangStr = thang || "     ";
  const diaDanhNgay = `${COQUAN.diaDanh}, ngày ${ngayStr} tháng ${thangStr} năm ${nam}`;

  const canPhai = (text, opts = {}) => new Paragraph({
    alignment: AlignmentType.RIGHT,
    spacing: { before: opts.before ?? 0, after: opts.after ?? 0, line },
    children: [r(text, { bold: opts.bold, italic: opts.italic, size: TRANG.BODY })],
  });

  const hang1 = [
    bp([r("1. Tóm tắt nội dung:", { bold: true, size: TRANG.BODY })],
       { noIndent: true, before: 0, after: 80, line }),
    ...tomTat.map((t, i) => bp(t, { after: i === tomTat.length - 1 ? 120 : 80, line })),
    bp([r("2. Ý kiến đề xuất của người trình:", { bold: true, size: TRANG.BODY })],
       { noIndent: true, before: 0, after: 80, line }),
    ...deXuat.map((t, i) => bp(t, { after: i === deXuat.length - 1 ? 160 : 60, line })),
    canPhai(diaDanhNgay, { italic: true }),
    canPhai(chucDanhNguoiTrinh, { bold: true, before: 60 }),
    ...emp(3),
    canPhai(nguoiTrinh, { bold: true }),
  ];

  const hang2 = [
    bp([r("Ý kiến của Trưởng Phòng", { bold: true, size: TRANG.BODY })],
       { noIndent: true, before: 0, after: 60, line }),
    bp(yKienTruongPhong, { noIndent: true, after: 120, line }),
    ...emp(2),
    canPhai(truongPhong, { bold: true }),
  ];

  return new Table({
    width: { size: contentW, type: WidthType.DXA },
    columnWidths: [contentW],
    borders: solidBorders,
    rows: [hang1, hang2].map(children => new TableRow({
      children: [new TableCell({
        borders: solidBorders,
        margins: KHUNG_MARGIN,
        width: { size: contentW, type: WidthType.DXA },
        children,
      })],
    })),
  });
}

module.exports = { khungNoiDungPhieuTrinh };
