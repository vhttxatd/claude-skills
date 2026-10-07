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
const { signatureBlock, chuKyNhieuBen } = require('../partials/signature');
const { buildDocument } = require('../partials/document-builder');
const { khungNoiDungPhieuTrinh } = require('../partials/khung-noi-dung');
const { bp, emp, h1, h2, h3, h4, lietKe, dieu, r, divider } = require('../partials/base');
const { Paragraph, AlignmentType } = require('docx');
const { TRANG, getDinhDang, LANHDAO } = require('../config/config');

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
  donViBanHanh, soLink,
  phuLuc,                       // kết quả partials/phu-luc.js → phuLuc({...}); tự chọn khổ ngang/dọc
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [bp("[Nội dung công văn - phần mở đầu nêu bối cảnh, vấn đề.]"),
       bp("[Phần giữa nêu đề nghị, yêu cầu cụ thể.]"),
       bp("[Phần kết: đề nghị phối hợp/trả lời/thực hiện.]", { after: 120 }),
       bp("Trân trọng./.", { bold: false, align: AlignmentType.JUSTIFIED })];

  const children = [
    headerTable({ loai: 'CV', so, nam, ngay, thang, trichYeu, donViBanHanh, soLink }),
    ...emp(1),
    ...kinhGuiBlock(kinhGui),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'CV', tenDonViSoan, ubnd: !donViBanHanh, coKinhGui: true }),
  ];

  return buildDocument('CV', children, phuLuc);
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
  donViBanHanh, coQuanDong1, coQuanDong2, kyHieuDonVi, soLink,
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
    headerTable({ loai: 'BC', so, nam, ngay, thang, donViBanHanh, coQuanDong1, coQuanDong2, kyHieuDonVi, soLink }),
    ...titleBlock('BC', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'BC', tenDonViSoan, ubnd: !donViBanHanh }),
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
  donViBanHanh, soLink,
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
    headerTable({ loai: 'KH', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('KH', trichYeu),
    ...canCuBlock(defaultCanCu, { batBuoc: false }),
    ...emp(1),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'KH', tenDonViSoan, ubnd: !donViBanHanh }),
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
  donViBanHanh, soLink,
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
    headerTable({ loai: 'TTr', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('TTr', trichYeu),
    ...kinhGuiBlock(kinhGui),
    ...(canCu.length > 0 ? canCuBlock(canCu) : []),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'TTr', tenDonViSoan, ubnd: !donViBanHanh, coKinhGui: true }),
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
  donViBanHanh, soLink,
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
    headerTable({ loai: 'QD', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('QD', trichYeu),
    ...canCuBlock(canCu, { batBuoc: true }),
    quyetDinhLine,
    ...defaultDieu.map(d => dieu(d.so, d.noiDung)),
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'QD', tenDonViSoan, ubnd: !donViBanHanh }),
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
  donViBanHanh, soLink,
} = {}) {
  const body = noiDung.length > 0
    ? noiDung.map(p => typeof p === 'string' ? bp(p) : p)
    : [
        bp("[Nội dung thông báo - nêu rõ sự việc, thời gian, địa điểm, đơn vị liên quan.]"),
        bp("Ủy ban nhân dân xã An Thới Đông thông báo để các đơn vị, cá nhân có liên quan biết và thực hiện./.",
           { after: 240 }),
      ];

  const children = [
    headerTable({ loai: 'TB', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('TB', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'TB', tenDonViSoan, ubnd: !donViBanHanh }),
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
  donViBanHanh, soLink,
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
    headerTable({ loai: 'GM', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('GM', trichYeu),
    ...body,
    ...emp(1),
    signatureBlock({ noiNhan, nguoiKy, loai: 'GM', tenDonViSoan, ubnd: !donViBanHanh }),
  ];

  return buildDocument('GM', children);
}


// ============================================================================
// 8. PHIẾU TRÌNH (PTr) - nội bộ: Kính gửi + khối nội dung đóng khung
// ============================================================================
function mauPhieuTrinh({
  so = "", nam = "2026", ngay = "", thang = "",
  loaiVanBan = "[Loại văn bản]",          // loại VB được trình: Công văn, Kế hoạch, Báo cáo...
  trichYeu = "[nội dung văn bản được trình]", // phần sau "Về việc ban hành [Loại VB]"
  kinhGui = ["Thường trực Ủy ban nhân dân xã"],
  tomTat = [],
  deXuat = [],
  nguoiTrinh = "Phan Trung Hiếu",
  chucDanhNguoiTrinh = "CHUYÊN VIÊN",
  yKienTruongPhong = "Thống nhất",
  donViBanHanh = 'VHXH',
  soLink,
} = {}) {
  const dd = getDinhDang('PTr');
  const contentW = TRANG.W - dd.marginLeft - dd.marginRight;

  // Phiếu trình luôn để trình một văn bản của cấp trên ban hành, nên trích yếu
  // LUÔN có dạng: "Về việc ban hành [Loại văn bản] [nội dung]."
  // (nếu người gọi đã tự viết đủ "Về việc ..." thì giữ nguyên, tránh lặp)
  const tyTho = String(trichYeu).trim();
  const trichYeuDay = /^về việc/i.test(tyTho)
    ? tyTho
    : `Về việc ban hành ${loaiVanBan} ${tyTho}`;
  const trichYeuChuan = trichYeuDay.endsWith('.') ? trichYeuDay : `${trichYeuDay}.`;

  const children = [
    headerTable({ loai: 'PTr', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...titleBlock('PTr', trichYeuChuan),
    ...kinhGuiBlock(kinhGui),
    khungNoiDungPhieuTrinh({
      tomTat: tomTat.length ? tomTat : ["[Căn cứ + mục đích của văn bản trình]"],
      deXuat: deXuat.length ? deXuat : [
        "Phòng Văn hóa - Xã hội đã tham mưu dự thảo [tên văn bản] của [cơ quan ban hành].",
        "(Đính kèm dự thảo [loại văn bản]).",
        "Kính trình Thường trực Ủy ban nhân dân xã xem xét, ban hành.",
      ],
      nguoiTrinh, chucDanhNguoiTrinh, yKienTruongPhong,
      ngay, thang, nam, contentW,
    }),
  ];

  return buildDocument('PTr', children);
}

// ============================================================================
// 8. BIÊN BẢN (BB) - chữ ký nhiều bên
// ============================================================================
/**
 * Biên bản có chữ ký nhiều bên. Cơ quan phát hành LUÔN ở cột phải cuối (xem
 * chuKyNhieuBen trong partials/signature.js) - hàm này không cho đảo cột.
 *
 * @param {(string|Paragraph|Table)[]} noiDung - thân biên bản. Chuỗi → bp(); dùng
 *        h1() cho đề mục, bangDuLieu() cho bảng, bp(text,{keepNext:true}) cho đoạn kết.
 * @param {{chucDanh:string,hoTen:string}} [nguoiLap] - cột đầu bên trái
 * @param {{dong:string[],hoTen:string}[]} [cacBenKy] - các bên ký nhận (giữa)
 * @param {string} nguoiKy - key LANHDAO của người ký thay mặt cơ quan phát hành
 * @param {string[]} nhanCoQuanPhatHanh - dòng nhãn phía trên chức danh (mặc định ĐẠI DIỆN BÊN GIAO)
 */
function mauBienBan({
  so = "", nam = "2026", ngay = "", thang = "",
  trichYeu = "[Trích yếu biên bản]",
  tieuDeDayDu = "",        // nếu có: tiêu đề 1 dòng in hoa (vd Mẫu 02/TSC-BBGN), thay cho "BIÊN BẢN" + trích yếu
  canCu = [],
  noiDung = [],
  nguoiLap = null,
  cacBenKy = [],
  nguoiKy = 'truongPhongVHXH',
  nhanCoQuanPhatHanh = ['ĐẠI DIỆN BÊN GIAO'],
  dongPhuKy = "",          // dòng nghiêng dưới chức danh cơ quan phát hành, vd "(Ký, ghi rõ họ tên, đóng dấu)"
  phuLuc = [],             // các phần tử đặt SAU khối chữ ký (phần tử đầu tự đặt pageBreak nếu cần)
  donViBanHanh = 'VHXH', soLink,
} = {}) {
  const ld = LANHDAO[nguoiKy];
  if (!ld) throw new Error(`mauBienBan: nguoiKy "${nguoiKy}" không tồn tại trong LANHDAO`);
  const body = noiDung.map(p => typeof p === 'string' ? bp(p) : p);
  const tieuDe = tieuDeDayDu
    ? [
        ...emp(1),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 60, line: 276 },
          children: [r(tieuDeDayDu, { bold: true, size: TRANG.BODY })],
        }),
        divider('trichYeu'),
      ]
    : titleBlock('BB', trichYeu);
  const children = [
    headerTable({ loai: 'BB', so, nam, ngay, thang, donViBanHanh, soLink }),
    ...tieuDe,
    ...canCuBlock(canCu),
    ...body,
    chuKyNhieuBen({
      nguoiLap: nguoiLap && { dong: ['NGƯỜI LẬP BIÊN BẢN', nguoiLap.chucDanh], hoTen: nguoiLap.hoTen },
      cacBenKy,
      coQuanPhatHanh: {
        dong: [...nhanCoQuanPhatHanh, ld.chucDanh, ...(dongPhuKy ? [{ text: dongPhuKy, bold: false, italic: true }] : [])],
        hoTen: ld.hoTen,
      },
    }),
    ...phuLuc,
  ];
  return buildDocument('BB', children);
}

module.exports = {
  mauCongVan, mauBaoCao, mauKeHoach, mauToTrinh,
  mauQuyetDinh, mauThongBao, mauGiayMoi, mauPhieuTrinh, mauBienBan,
};
