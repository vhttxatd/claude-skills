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
  Table, TableRow, TableCell, WidthType, AlignmentType, ExternalHyperlink,
} = require('docx');

const { COQUAN, QUOCHIEU, KY_HIEU, TRANG, DON_VI_TRUC_THUOC, BANG_TIEU_DE, contentWidth } = require('../config/config');
const { cellP, noBorders, divider, r, sp0 } = require('./base');
const { Paragraph } = require('docx');

// Bề rộng thân trang lấy từ nguồn duy nhất (config), không gõ số DXA thủ công.
const contentW = contentWidth('MAC_DINH');
// Bảng tiêu đề nới rộng ra ngoài lề 2 bên (BANG_TIEU_DE.moRongMoiBen trong config)
const NOI_RONG = Math.round(contentW * BANG_TIEU_DE.moRongMoiBen);
const bangW = contentW + NOI_RONG * 2;

/**
 * Tạo bảng tiêu đề (header table).
 * @param {object} opts
 * @param {string} opts.loai - CV | BC | KH | TTr | QD | TB | GM
 * @param {string} opts.so - Số văn bản (ví dụ "125")
 * @param {string} opts.nam - Năm (ví dụ "2026")
 * @param {string} opts.ngay - Ngày (số, để trống thì hiện "...")
 * @param {string} opts.thang - Tháng (số, để trống thì hiện "...")
 * @param {string} opts.trichYeu - Trích yếu (CHỈ dùng cho CV - nằm dưới ký hiệu)
 * @param {string} [opts.donViBanHanh] - CÁCH DÙNG CHUẨN khi đơn vị trực thuộc tự ban hành:
 *   truyền mã đơn vị ('VHXH' | 'KT' | 'VP' | 'TTPVHCC'). Tên cơ quan chủ quản và
 *   ký hiệu tự lấy từ DON_VI_TRUC_THUOC trong config → không thể viết sai tên.
 * @param {string} [opts.coQuanDong1] - (Hạn chế dùng) override thủ công dòng 1
 * @param {string} [opts.coQuanDong2] - (Hạn chế dùng) override thủ công dòng 2
 * @param {string} [opts.kyHieuDonVi] - (Hạn chế dùng) override thủ công ký hiệu đơn vị
 * @param {string} [opts.soLink] - URL (Google Drive/Notion) để gắn hyperlink vào dòng "Số: .../..."
 *   Chỉ dùng khi văn bản đã có số phát hành chính thức + đã có nơi lưu trữ. Để trống khi còn là bản dự thảo.
 */
function headerTable({
  loai, so = "", nam = "20..", ngay = "", thang = "", trichYeu = "",
  donViBanHanh, coQuanDong1, coQuanDong2, kyHieuDonVi, soLink,
}) {
  // Ưu tiên registry đơn vị trực thuộc; override thủ công chỉ là lối thoát cuối.
  const dv = donViBanHanh ? DON_VI_TRUC_THUOC[donViBanHanh] : null;
  if (donViBanHanh && !dv) {
    throw new Error(`headerTable: đơn vị "${donViBanHanh}" chưa khai báo trong DON_VI_TRUC_THUOC (config/config.js)`);
  }
  const dong1 = coQuanDong1 || (dv && dv.dong1) || COQUAN.banHanh_dong1;
  const dong2 = coQuanDong2 || (dv && dv.dong2) || COQUAN.banHanh_dong2;
  const donVi = kyHieuDonVi || (dv && dv.kyHieu) || COQUAN.kyHieuUBND;
  // Ký hiệu văn bản — KHÔNG chèn năm vào giữa (năm chỉ xuất hiện ở dòng
  // "ngày ... tháng ... năm ..." bên cột phải). Đúng chuẩn: "Số: 123/BC-UBND".
  const kh = KY_HIEU[loai] || "";
  const soKyHieu = kh
    ? `Số:     /${kh}-${donVi}`
    : `Số:     /${donVi}`;
  const soDisplay = so
    ? (kh ? `Số: ${so}/${kh}-${donVi}` : `Số: ${so}/${donVi}`)
    : soKyHieu;

  // Địa danh, ngày tháng
  const ngayStr = ngay || "    ";
  const thangStr = thang || "    ";
  const diaDanhNgay = `${COQUAN.diaDanh}, ngày ${ngayStr} tháng ${thangStr} năm ${nam}`;

  // Cột trái: cơ quan + số ký hiệu — LUÔN dùng cỡ chữ mặc định 14pt (TRANG.BODY)
  // cho cả 2 dòng cơ quan, kể cả khi có override (đơn vị trực thuộc ban hành).
  // Dùng tên viết tắt "UBND XÃ AN THỚI ĐÔNG" (không viết đầy đủ "ỦY BAN NHÂN
  // DÂN") để vừa 1 dòng ở cỡ chuẩn — KHÔNG giảm cỡ chữ để né vỡ dòng.
  // Tỷ lệ cột lấy từ BANG_TIEU_DE.tyLeCotTrai — cột phải rộng hơn để dòng
  // "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" nằm trọn 1 dòng ở cỡ chữ 14pt.
  const colL = Math.round(bangW * BANG_TIEU_DE.tyLeCotTrai);
  const colR = bangW - colL;
  // Dòng số ký hiệu — nếu có soLink thì bọc trong ExternalHyperlink (giữ nguyên
  // font/cỡ chữ mặc định của cellP, chỉ thêm màu xanh + gạch chân theo chuẩn Hyperlink).
  const soParagraph = soLink
    ? cellP([new ExternalHyperlink({
        link: soLink,
        children: [r(soDisplay, { color: '0563C1' })],
      })])
    : cellP(soDisplay);
  const leftChildren = [
    cellP(dong1),
    cellP(dong2, { bold: true }),
    divider('coQuan'),                            // Thông số lấy từ DIVIDER.coQuan trong config
    soParagraph,                                  // Số ký hiệu (có thể là hyperlink)
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
    divider('quocHieu'),                          // Thông số lấy từ DIVIDER.quocHieu trong config
    cellP(diaDanhNgay, { italic: true }),
  ];

  return new Table({
    width: { size: bangW, type: WidthType.DXA },
    // Thụt âm để bảng tràn đều ra ngoài lề trái/phải
    indent: { size: -NOI_RONG, type: WidthType.DXA },
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
