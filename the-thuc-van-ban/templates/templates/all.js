/**
 * templates/all.js - TEMPLATES THEO LOẠI VĂN BẢN
 * =================================================
 * Mỗi hàm trả về Document docx-js hoàn chỉnh, sẵn sàng đóng gói bằng Packer.
 *
 * Cấu trúc chuẩn:
 *   buildDocument(loai, [
 *     headerTable({...}),     // Bảng tiêu đề
 *     ...titleBlock() HOẶC ...kinhGuiBlock()  // Tên loại / Kính gửi
 *     ...canCuBlock(),        // Khối căn cứ (nếu có)
 *     ...body,                // Nội dung chính
 *     signatureBlock({...}),  // Nơi nhận + chữ ký
 *   ]);
 */

const { headerTable } = require('../partials/header-table');
const { titleBlock } = require('../partials/title-block');
const { canCuBlock } = require('../partials/can-cu');
const { kinhGuiBlock } = require('../partials/kinh-gui');
const { signatureBlock } = require('../partials/signature');
const { buildDocument } = require('../partials/document-builder');
const { bp, emp, h1, h2, h3, dieu, r } = require('../partials/base');
const { Paragraph, AlignmentType } = require('docx');
const { TRANG } = require('../config/config');

// ============================================================================
// 1. CÔNG VĂN (CV)
// ============================================================================
function mauCongVan({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu công văn]",
  kinhGui = ["[Đơn vị nhận]"],
  noiDung = [],
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [bp("[Nội dung công văn - phần mở đầu nêu bối cảnh, vấn đề.]"),
       bp("[Phần giữa nêu đề nghị, yêu cầu cụ thể.]"),
       bp("[Phần kết: đề nghị phối hợp/trả lời/thực hiện.]", { after: 120 }),
       bp("Trân trọng./.", { bold: false, align: AlignmentType.JUSTIFIED })];

  const children = [
    headerTable({ loai: 'CV', so, nam, ngay, thang, trichYeu }),
    ...emp(1),
    ...kinhGuiBlock(kinhGui),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'CV', tenDonViSoan }),
  ];

  return buildDocument('CV', children);
}

// ============================================================================
// 2. BÁO CÁO (BC)
// ============================================================================
function mauBaoCao({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu báo cáo]",
  noiDung = [],
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [
        h1("I. KẾT QUẢ THỰC HIỆN"),
        bp("[Nội dung phần I - kết quả theo từng nhiệm vụ.]"),
        h1("II. ĐÁNH GIÁ CHUNG"),
        h2("1. Ưu điểm"),
        bp("[Các ưu điểm đạt được.]"),
        h2("2. Hạn chế"),
        bp("[Các hạn chế, khó khăn.]"),
        h1("III. PHƯƠNG HƯỚNG, NHIỆM VỤ TRỌNG TÂM"),
        bp("[Các nhiệm vụ thời gian tới.]"),
        bp("Trên đây là báo cáo của [Đơn vị], kính đề nghị [Cấp trên] xem xét, chỉ đạo./.",
           { bold: false, after: 240 }),
      ];

  const children = [
    headerTable({ loai: 'BC', so, nam, ngay, thang }),
    ...titleBlock('BC', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'BC', tenDonViSoan }),
  ];

  return buildDocument('BC', children);
}

// ============================================================================
// 3. KẾ HOẠCH (KH)
// ============================================================================
function mauKeHoach({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu kế hoạch]",
  canCu = [],
  noiDung = [],
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const defaultCanCu = canCu.length > 0 ? canCu : [
    "Căn cứ [văn bản pháp lý cấp trên ngày tháng năm về...]",
    "Theo đề nghị của [đơn vị tham mưu]",
  ];

  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [
        bp("Ủy ban nhân dân xã An Thới Đông xây dựng Kế hoạch [...] với các nội dung cụ thể như sau:",
           { noIndent: false }),
        h1("I. MỤC ĐÍCH, YÊU CẦU"),
        h2("1. Mục đích"),
        bp("[Các mục đích cụ thể.]"),
        h2("2. Yêu cầu"),
        bp("[Các yêu cầu cụ thể.]"),
        h1("II. NỘI DUNG THỰC HIỆN"),
        bp("[Chi tiết các hoạt động, nhiệm vụ, thời gian, phân công.]"),
        h1("III. TỔ CHỨC THỰC HIỆN"),
        h2("1. [Đơn vị chủ trì]"),
        bp("[Nhiệm vụ cụ thể.]"),
        h2("2. [Đơn vị phối hợp]"),
        bp("[Nhiệm vụ cụ thể.]"),
        bp("Trên đây là Kế hoạch [...] của Ủy ban nhân dân xã An Thới Đông, yêu cầu các đơn vị nghiêm túc triển khai thực hiện./.",
           { after: 240 }),
      ];

  const children = [
    headerTable({ loai: 'KH', so, nam, ngay, thang }),
    ...titleBlock('KH', trichYeu),
    ...canCuBlock(defaultCanCu, { batBuoc: false }),
    ...emp(1),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'KH', tenDonViSoan }),
  ];

  return buildDocument('KH', children);
}

// ============================================================================
// 4. TỜ TRÌNH (TTr)
// ============================================================================
function mauToTrinh({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu tờ trình]",
  kinhGui = ["Ủy ban nhân dân xã An Thới Đông"],
  canCu = [],
  noiDung = [],
  nguoiKy = 'truongPhongVHXH',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [
        bp("[Phòng/Đơn vị] kính trình [cấp trên] xem xét, [nội dung đề nghị] với các nội dung cụ thể như sau:"),
        h1("I. SỰ CẦN THIẾT"),
        bp("[Nêu căn cứ, bối cảnh, lý do trình.]"),
        h1("II. NỘI DUNG ĐỀ NGHỊ"),
        bp("[Chi tiết nội dung đề xuất.]"),
        h1("III. KIẾN NGHỊ"),
        bp("[Phòng/Đơn vị] kính đề nghị [cấp trên] xem xét, quyết định./.",
           { after: 240 }),
      ];

  const children = [
    headerTable({ loai: 'TTr', so, nam, ngay, thang }),
    ...titleBlock('TTr', trichYeu),
    ...kinhGuiBlock(kinhGui),
    ...(canCu.length > 0 ? canCuBlock(canCu) : []),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'TTr', tenDonViSoan }),
  ];

  return buildDocument('TTr', children);
}

// ============================================================================
// 5. QUYẾT ĐỊNH (QĐ)
// ============================================================================
function mauQuyetDinh({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu quyết định]",
  canCu = [],
  dsDieu = [],
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const defaultDieu = dsDieu.length > 0 ? dsDieu : [
    { so: 1, noiDung: "[Nội dung điều 1 - quyết định chính.]" },
    { so: 2, noiDung: "[Nội dung điều 2 - giao nhiệm vụ/trách nhiệm.]" },
    { so: 3, noiDung: "Quyết định này có hiệu lực kể từ ngày ký. Các đơn vị, cá nhân có liên quan chịu trách nhiệm thi hành Quyết định này./." },
  ];

  // Dòng "QUYẾT ĐỊNH:" giữa phần căn cứ và các điều
  const quyetDinhLine = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 120, line: 276 },
    children: [r("QUYẾT ĐỊNH:", { bold: true, size: TRANG.BODY })],
  });

  const children = [
    headerTable({ loai: 'QD', so, nam, ngay, thang }),
    ...titleBlock('QD', trichYeu),
    ...canCuBlock(canCu, { batBuoc: true }),
    quyetDinhLine,
    ...defaultDieu.map(d => dieu(d.so, d.noiDung)),
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'QD', tenDonViSoan }),
  ];

  return buildDocument('QD', children);
}

// ============================================================================
// 6. THÔNG BÁO (TB)
// ============================================================================
function mauThongBao({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu thông báo]",
  noiDung = [],
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [
        bp("[Nội dung thông báo - nêu rõ sự việc, thời gian, địa điểm, đơn vị liên quan.]"),
        bp("Ủy ban nhân dân xã An Thới Đông thông báo để các đơn vị, cá nhân có liên quan biết và thực hiện./.",
           { after: 240 }),
      ];

  const children = [
    headerTable({ loai: 'TB', so, nam, ngay, thang }),
    ...titleBlock('TB', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'TB', tenDonViSoan }),
  ];

  return buildDocument('TB', children);
}

// ============================================================================
// 7. GIẤY MỜI (GM)
// ============================================================================
function mauGiayMoi({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Nội dung cuộc họp]",
  nguoiDuoc = "[Đơn vị/cá nhân được mời]",
  thoiGian = "[Thời gian]",
  diaDiem = "[Địa điểm]",
  noiDungHop = "[Nội dung cuộc họp]",
  nguoiKy = 'chuTich',
  noiNhan = [],
  tenDonViSoan = 'VHXH',
} = {}) {
  const body = [
    bp("Ủy ban nhân dân xã An Thới Đông trân trọng kính mời:"),
    bp(nguoiDuoc, { noIndent: true, align: AlignmentType.LEFT }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 80, after: 80, line: 276 },
      indent: { firstLine: TRANG.INDENT },
      children: [
        r("Đến dự: ", { bold: true, size: TRANG.BODY }),
        r(noiDungHop, { size: TRANG.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 0, after: 80, line: 276 },
      indent: { firstLine: TRANG.INDENT },
      children: [
        r("Thời gian: ", { bold: true, size: TRANG.BODY }),
        r(thoiGian, { size: TRANG.BODY }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 0, after: 80, line: 276 },
      indent: { firstLine: TRANG.INDENT },
      children: [
        r("Địa điểm: ", { bold: true, size: TRANG.BODY }),
        r(diaDiem, { size: TRANG.BODY }),
      ],
    }),
    bp("Sự có mặt đầy đủ và đúng giờ của Quý vị là sự quan tâm thiết thực đến công việc chung./.",
       { after: 240 }),
  ];

  const children = [
    headerTable({ loai: 'GM', so, nam, ngay, thang }),
    ...titleBlock('GM', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'GM', tenDonViSoan }),
  ];

  return buildDocument('GM', children);
}

module.exports = {
  mauCongVan, mauBaoCao, mauKeHoach, mauToTrinh,
  mauQuyetDinh, mauThongBao, mauGiayMoi,
};
