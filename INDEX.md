# Mục lục Skill — Hướng dẫn nhanh cho AI

> Tài liệu này giúp AI (ChatGPT, Gemini, hoặc các trợ lý khác) hiểu nhanh cấu trúc kho tri thức để chọn đúng skill cho mỗi yêu cầu.

## Quy tắc chọn skill

Khi nhận yêu cầu, AI nên:
1. Xác định **loại công việc** (báo cáo / kế hoạch / công văn / dữ liệu nền / ...).
2. Đọc `SKILL.md` của skill tương ứng để biết quy tắc và cấu trúc.
3. Khi cần dữ liệu nền (cán bộ, viết tắt), luôn tra `quy-tac-chung` trước.
4. Khi cần số liệu địa phương, tra `tri-thuc-dia-phuong`.

## Phân loại theo nhóm

### 1. Dữ liệu nền (luôn ưu tiên đọc đầu tiên)

- **`quy-tac-chung/`** — Cán bộ, đơn vị, từ viết tắt, văn bản căn cứ. Dùng cho MỌI văn bản.
- **`tri-thuc-dia-phuong/`** — Hiện trạng, định hướng, tiềm năng xã An Thới Đông theo từng lĩnh vực.

### 2. Soạn văn bản hành chính

- **`the-thuc-van-ban/`** — Thể thức chuẩn NĐ 30/2020/NĐ-CP. Có template `.docx` qua Node.js.
- **`bao-cao-hanh-chinh/`** — Báo cáo định kỳ/đột xuất, KHCN-CĐS, DTI.
- **`cdso-kehoach/`** — Kế hoạch chuyển đổi số.

### 3. Quản lý công việc

- **`quan-ly-du-an/`** — Quy trình mua sắm chi thường xuyên (nhánh A/B/C).
- **`nhan-su-danh-gia/`** — Hồ sơ và đánh giá quý cán bộ.
- **`cong-viec-giao-ban/`** — Công việc cho họp giao ban hàng tuần.
- **`workboard/`** — Theo dõi tiến độ tổng hợp.

### 4. Meta

- **`tao-skill/`** — Hướng dẫn tạo/cải tiến skill mới.

## Quy tắc đầu ra

- Ngôn ngữ: **tiếng Việt**.
- Văn bản chính thức: **font Times New Roman**, xuất `.docx` qua Node.js docx lib.
- **Chỉ xuất file khi được yêu cầu rõ ràng**, không tự động.
- Ký hiệu ô số (`so-do-o-so.md`) dùng làm shorthand phản hồi.

## Bối cảnh người dùng

- **Tên**: Phan Trung Hiếu
- **Chức vụ**: Chuyên viên KHCN-CĐS, Phòng Văn hóa – Xã hội
- **Đơn vị**: UBND xã An Thới Đông, TPHCM (mô hình 2 cấp, báo cáo thẳng lên thành phố)
- **Lãnh đạo**:
  - Chủ tịch xã: Trần Hoàng Vũ
  - PCT: Nguyễn Minh Kha
  - Trưởng phòng: Nguyễn Văn Chính
