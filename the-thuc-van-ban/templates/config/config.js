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
  diaDanh: "An Thới Đông",                             // Địa danh trong ngày tháng
  kyHieuUBND: "UBND",                                  // Ký hiệu đơn vị
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
};

// Tên loại văn bản viết HOA (dùng in dưới quốc hiệu trừ Công văn)
const TEN_LOAI = {
  BC:  "BÁO CÁO",
  KH:  "KẾ HOẠCH",
  TTr: "TỜ TRÌNH",
  QD:  "QUYẾT ĐỊNH",
  TB:  "THÔNG BÁO",
  GM:  "GIẤY MỜI",
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
    pageNumberPosition: "header",  // header | footer
    noiNhanSize: 24,                // 12pt = 24 half-points
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
    pageNumberPosition: "footer",
    noiNhanSize: 22,                // 11pt
  },
};

function getDinhDang(loai) {
  return DINH_DANG[loai] || DINH_DANG.MAC_DINH;
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
  QUOCHIEU,
  LANHDAO,
  NOINHAN_MAC_DINH,
  CANCU_BAT_BUOC,
  CANCU_BAT_BUOC_QD,
  KY_HIEU,
  TEN_LOAI,
  DINH_DANG,
  getDinhDang,
  TRANG,
};
