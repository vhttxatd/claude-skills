/**
 * config.js - CẤU HÌNH TRUNG TÂM
 * ================================
 * Sửa file này → toàn bộ mẫu văn bản tự cập nhật.
 * KHÔNG sửa trực tiếp trong templates/*.js.
 */

// ==================== CƠ QUAN ====================
const COQUAN = {
  chuQuan: "ỦY BAN NHÂN DÂN",                          // Dòng 1 trái header
  chuQuan2: "THÀNH PHỐ HỒ CHÍ MINH",                  // Dòng 2 (khi cần)
  banHanh_dong1: "ỦY BAN NHÂN DÂN",                    // Dòng 1 cơ quan ban hành
  banHanh_dong2: "XÃ AN THỚI ĐÔNG",                    // Dòng 2 cơ quan ban hành
  // Tên chủ quản dạng VIẾT TẮT — BẮT BUỘC dùng làm dòng 1 khi đơn vị trực
  // thuộc (Phòng/Trung tâm) tự ban hành văn bản. KHÔNG viết "ỦY BAN NHÂN DÂN
  // XÃ AN THỚI ĐÔNG" đầy đủ vì sẽ vỡ dòng ở cỡ chữ chuẩn 14pt.
  chuQuanVietTat: "UBND XÃ AN THỚI ĐÔNG",
  diaDanh: "An Thới Đông",                             // Địa danh trong ngày tháng
  kyHieuUBND: "UBND",                                  // Ký hiệu đơn vị
};

// ==================== ĐƠN VỊ TRỰC THUỘC BAN HÀNH VĂN BẢN ====================
// Dùng khi Phòng/Trung tâm trực thuộc tự ban hành (không phải UBND xã).
// Gọi: headerTable({ donViBanHanh: 'VHXH' }) — KHÔNG truyền chuỗi tên cơ quan
// thủ công, để tránh viết sai tên chủ quản (lỗi đã lặp nhiều lần).
const DON_VI_TRUC_THUOC = {
  VHXH: {
    dong1: COQUAN.chuQuanVietTat,        // "UBND XÃ AN THỚI ĐÔNG"
    dong2: "PHÒNG VĂN HÓA - XÃ HỘI",
    kyHieu: "VHXH",
    nguoiKyMacDinh: "truongPhongVHXH",
  },
  KT: {
    dong1: COQUAN.chuQuanVietTat,
    dong2: "PHÒNG KINH TẾ",
    kyHieu: "KT",
    nguoiKyMacDinh: null,
  },
  VP: {
    dong1: COQUAN.chuQuanVietTat,
    dong2: "VĂN PHÒNG HĐND VÀ UBND",
    kyHieu: "VP",
    nguoiKyMacDinh: null,
  },
  TTPVHCC: {
    dong1: COQUAN.chuQuanVietTat,
    dong2: "TRUNG TÂM PHỤC VỤ HÀNH CHÍNH CÔNG",
    kyHieu: "TTPVHCC",
    nguoiKyMacDinh: null,
  },
};

// ==================== QUỐC HIỆU ====================
const QUOCHIEU = {
  dong1: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
  dong2: "Độc lập - Tự do - Hạnh phúc",                // Dùng dấu ` - ` theo quy-tac-chung
};

// ==================== LÃNH ĐẠO ====================
const LANHDAO = {
  chuTich: {
    hoTen: "Trần Hoàng Vũ",
    chucDanh: "CHỦ TỊCH",
    chucDanhDay: "TM. ỦY BAN NHÂN DÂN XÃ",             // Dòng trên chức danh
  },
  pctKinhTe: {
    hoTen: "Phan Kim Anh",
    chucDanh: "PHÓ CHỦ TỊCH",
    chucDanhDay: "KT. CHỦ TỊCH",
  },
  pctVHXH: {
    hoTen: "Nguyễn Minh Kha",
    chucDanh: "PHÓ CHỦ TỊCH",
    chucDanhDay: "KT. CHỦ TỊCH",
  },
  truongPhongVHXH: {
    hoTen: "Nguyễn Văn Chính",                         // Mặc định khi VB do Phòng VHXH soạn
    chucDanh: "TRƯỞNG PHÒNG",
    chucDanhDay: null,                                 // Không cần dòng trên nếu ký tên đơn vị
  },
};

// ==================== NƠI NHẬN MẶC ĐỊNH ====================
const NOINHAN_MAC_DINH = [
  "- Thường trực Đảng ủy xã;",
  "- Thường trực Hội đồng nhân dân xã;",
  "- Ủy ban MTTQ Việt Nam xã;",
  "- Thường trực Ủy ban nhân dân xã;",
  "- [Các đơn vị thực hiện];",
  "- Lưu: VT, [Ký hiệu đơn vị soạn].",
];

// ==================== CĂN CỨ BẮT BUỘC — CHỈ DÙNG CHO QUYẾT ĐỊNH HÀNH CHÍNH ====================
// ⚠️ CẢNH BÁO: Hằng số này CHỈ được chèn khi loại văn bản là QĐ (QĐ phê duyệt, QĐ thành lập,
// QĐ kiện toàn...). TUYỆT ĐỐI KHÔNG chèn vào Kế hoạch (KH), Báo cáo (BC), Công văn (CV),
// Tờ trình (TTr), Thông báo (TB), Giấy mời (GM).
// Cách dùng: canCuBlock(dsCanCu, { batBuoc: true }) — chỉ khi soạn QĐ.
const CANCU_BAT_BUOC_QD = [
  "Căn cứ Luật Tổ chức chính quyền địa phương số 72/2025/QH16 ngày 15 tháng 6 năm 2025;",
];

// Alias tương thích ngược (deprecated — sẽ xoá ở bản sau, dùng CANCU_BAT_BUOC_QD)
const CANCU_BAT_BUOC = CANCU_BAT_BUOC_QD;

// ==================== KÝ HIỆU VĂN BẢN THEO LOẠI ====================
// Quy tắc: Công văn KHÔNG có chữ CV, các loại khác có chữ viết tắt.
const KY_HIEU = {
  CV:  "",              // Số: .../UBND
  BC:  "BC",            // Số: .../BC-UBND
  KH:  "KH",
  TTr: "TTr",
  QD:  "QĐ",
  TB:  "TB",
  GM:  "GM",
  PTr: "PTr",           // Phiếu trình nội bộ
};

// Tên loại văn bản viết HOA (dùng in dưới quốc hiệu trừ Công văn)
const TEN_LOAI = {
  BC:  "BÁO CÁO",
  KH:  "KẾ HOẠCH",
  TTr: "TỜ TRÌNH",
  QD:  "QUYẾT ĐỊNH",
  TB:  "THÔNG BÁO",
  GM:  "GIẤY MỜI",
  PTr: "PHIẾU TRÌNH",
};

// ==================== DẤU GẠCH DIVIDER — NGUỒN DUY NHẤT ====================
// Ký tự `-` lặp lại, đậm, căn giữa, cỡ 4pt (8 half-points). KHÔNG dùng border.
// `width`  = số ký tự `-`
// `after`  = giãn cách tùy chỉnh phía sau, đơn vị DXA (1pt = 20 DXA)
// ⚠️ SỬA ĐỘ RỘNG/GIÃN CÁCH DIVIDER CHỈ Ở ĐÂY. Các partials đều đọc từ khối này,
//    tuyệt đối không hardcode số trong header-table.js / title-block.js.
const DIVIDER = {
  size: 8,                                    // 4pt = 8 half-points
  coQuan:   { width: 52,  after: 120 },       // Dưới tên cơ quan ban hành — sau 6pt
  quocHieu: { width: 136, after: 120 },       // Dưới "Độc lập - Tự do - Hạnh phúc" — sau 6pt
  trichYeu: { width: 120, after: 400 },       // Dưới trích yếu văn bản — sau 20pt
};

// ==================== SỐ TRANG — NGUỒN DUY NHẤT ====================
const SO_TRANG = {
  size: 28,        // 14pt (28 half-points)
  after: 240,      // Giãn cách phía dưới 12pt (1pt = 20 DXA)
};

// ==================== BẢNG TIÊU ĐỀ ĐẦU VĂN BẢN — NGUỒN DUY NHẤT ====================
// Bảng tiêu đề được nới rộng ra ngoài lề 2 bên để dòng quốc hiệu
// "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" nằm trọn 1 dòng ở cỡ chữ 14pt.
const BANG_TIEU_DE = {
  moRongMoiBen: 0.08,   // Nới mỗi bên 8% bề rộng thân trang
  tyLeCotTrai: 0.40,    // Cột trái (cơ quan ban hành) / cột phải (quốc hiệu)
};

// ==================== LIỆT KÊ TRONG THÂN VĂN BẢN — NGUỒN DUY NHẤT ====================
// Quy tắc thống nhất toàn bộ văn bản, áp dụng cho mọi loại VB:
//   1 mục   → viết thành đoạn văn thường, không đánh dấu
//   2 mục   → gạch đầu dòng "-"
//   >2 mục  → đánh số thứ tự "1." "2." "3."
// Cả 3 trường hợp đều thụt đầu dòng firstLine = TRANG.INDENT để mép trái
// toàn văn bản thẳng hàng. Dùng hàm lietKe() — KHÔNG tự gõ tiền tố.
const LIET_KE = {
  nguongDungSTT: 3,    // Từ số mục này trở lên thì chuyển sang đánh số thứ tự
};

// ==================== PHÂN CẤP ĐỀ MỤC — NGUỒN DUY NHẤT ====================
// Level 1 = Phần lớn nhất   : "I." / "Phần I"        → h1()
// Level 2 = Mục             : "1." / "2."            → h2()
// Level 3 = Tiểu mục        : "1.1." / "1.2."        → h3()
// Level 4 = Mục nhỏ         : "a)" / "b)" (in nghiêng) → h4()
// Trong đề mục chỉ có ĐOẠN VĂN liền mạch, thụt đầu dòng chuẩn (INDENT).
// KHÔNG gắn tiền tố "1." / "-" vào đoạn văn — bp() sẽ ném lỗi khi build.
// Cần liệt kê danh sách → dùng lietKe() (xem khối LIET_KE bên dưới).
const HEADING = {
  1: { bold: true, italics: false, outlineLevel: 0 },
  2: { bold: true, italics: false, outlineLevel: 1 },
  3: { bold: true, italics: false, outlineLevel: 2 },
  4: { bold: true, italics: true,  outlineLevel: 3 },
};

// ==================== ĐỊNH DẠNG THEO LOẠI VĂN BẢN ====================
// Tham chiếu bảng B (phân biệt theo loại) trong skill the-thuc-van-ban.
const DINH_DANG = {
  // Mặc định (KH/TTr/QĐ/TB/GM/CV)
  MAC_DINH: {
    lineSpacing: 276,
    marginTop: 1134,
    marginBottom: 1134,
    marginRight: 1080,
    marginLeft: 1800,
    paraBefore: 0,
    paraAfter: 100,
    // Số trang: LUÔN ở HEADER (đầu trang) cho mọi loại văn bản — quy tắc thống nhất.
    pageNumberPosition: "header",
    noiNhanSize: 24,                // 12pt = 24 half-points
    headingSpacing: { 1:{before:160,after:80}, 2:{before:120,after:60},
                      3:{before:100,after:60}, 4:{before:100,after:60} },
  },
  // Báo cáo khác biệt
  BC: {
    lineSpacing: 240,
    marginTop: 1000,
    marginBottom: 1000,
    marginRight: 900,
    marginLeft: 1800,
    paraBefore: 120,
    paraAfter: 120,
    pageNumberPosition: "header",   // Thống nhất: số trang ở ĐẦU trang, kể cả Báo cáo
    noiNhanSize: 22,                // 11pt
    headingSpacing: { 1:{before:120,after:120}, 2:{before:120,after:120},
                      3:{before:120,after:120}, 4:{before:120,after:120} },
  },
};

function getDinhDang(loai) {
  return DINH_DANG[loai] || DINH_DANG.MAC_DINH;
}

/**
 * Bề rộng thân trang (DXA) = khổ A4 trừ 2 lề, theo đúng loại văn bản.
 * ⚠️ Mọi bảng/phụ lục phải lấy bề rộng từ đây, KHÔNG gõ số 9000/9026 thủ công.
 */
function contentWidth(loai) {
  const dd = getDinhDang(loai);
  return TRANG.W - dd.marginLeft - dd.marginRight;
}

// ==================== HẰNG SỐ TRANG ====================
const TRANG = {
  W: 11906,                 // A4 width DXA
  H: 16838,                 // A4 height DXA
  BODY: 28,                 // 14pt
  SMALL: 24,                // 12pt
  TINY: 22,                 // 11pt
  INDENT: 720,              // Thụt đầu dòng 1.27cm
};

module.exports = {
  COQUAN,
  DON_VI_TRUC_THUOC,
  DIVIDER,
  SO_TRANG,
  BANG_TIEU_DE,
  LIET_KE,
  HEADING,
  QUOCHIEU,
  LANHDAO,
  NOINHAN_MAC_DINH,
  CANCU_BAT_BUOC,
  CANCU_BAT_BUOC_QD,
  KY_HIEU,
  TEN_LOAI,
  DINH_DANG,
  getDinhDang,
  contentWidth,
  TRANG,
};
