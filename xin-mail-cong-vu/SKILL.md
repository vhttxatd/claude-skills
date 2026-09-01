---
name: xin-mail-cong-vu
description: >
  Quy trình xin mail công vụ Thành phố (@tphcm.gov.vn) cho cán bộ, viên chức
  xã An Thới Đông: cấp mail mới, reset mật khẩu, thay đổi thông tin tài khoản.
  Kích hoạt khi Hiếu nói "xin mail công vụ", "cấp mail mới", "reset mật khẩu
  mail", "đổi thông tin mail", hoặc khi Hiếu đính kèm file danh sách đăng ký
  mail (dạng "DS_de_nghi_cap_moi..." hoặc tương tự). Tuân theo 4 nguyên tắc
  vận hành trong tao-skill.
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quy trình Sở KHCN Thành phố · ra_soat_lai: 2027-03-01 · rui_ro: trung

# Skill: Xin Mail Công Vụ Thành Phố

## BỐI CẢNH

Đầu mối kỹ thuật Thành phố xử lý mail công vụ (@tphcm.gov.vn) cho xã:
- **To (xử lý chính):** kythuat-tt@tphcm.gov.vn — Kỹ thuật Trung tâm Chuyển đổi số Thành phố
- **CC (bắt buộc, người phụ trách tiếp nhận):** tkkhoa.ttcds@tphcm.gov.vn

Có 3 loại yêu cầu: **(1) Cấp mail mới**, **(2) Reset mật khẩu**, **(3) Thay đổi thông tin tài khoản**.

Đơn vị soạn mặc định: **Phòng Văn hóa - Xã hội**. Người gửi yêu cầu: **Phan Trung Hiếu** (KHCN-CĐS).

## KÊNH GỬI: Gmail draft (không tự động gửi)

- Dùng Gmail MCP connector, tool `create_draft` để tạo bản nháp — **không tự bấm gửi**, luôn để Hiếu kiểm tra và gửi thủ công (thông tin cán bộ sai sót trong văn bản gửi cơ quan Thành phố hậu quả nặng).
- **Giới hạn kỹ thuật:** `create_draft` KHÔNG hỗ trợ đính kèm file. Nếu người dùng có file cần kẹp theo (ví dụ danh sách gốc dạng .xlsx):
  - Nhắc Hiếu tự kéo-thả file vào draft trước khi gửi, HOẶC
  - Đề xuất upload lên Google Drive rồi chèn link chia sẻ vào nội dung email.
- Nếu chưa có Gmail connector trong phiên làm việc: gọi `search_mcp_registry` với từ khóa liên quan, sau đó `suggest_connectors` để Hiếu chọn kết nối — không tự ý chọn thay.

## BƯỚC 1 — Xác định loại yêu cầu

Hỏi hoặc suy luận từ ngữ cảnh: Cấp mới / Reset mật khẩu / Thay đổi thông tin.

## BƯỚC 2 — Thu thập thông tin

### (1) Cấp mail mới
Có thể nhận theo 2 dạng:
- **Nhập tay từng người:** hỏi Họ tên, Chức vụ/Đơn vị, SĐT, Mail cá nhân, Người đề xuất.
- **File danh sách đính kèm** (dạng bảng "DANH SÁCH ĐĂNG KÝ MAIL CÔNG VỤ"): đọc bằng `extract-text`, ánh xạ cột theo header thực tế (không giả định thứ tự cột cố định — kiểm tra header trước khi map dữ liệu).

**Với người CHƯA có tên đăng nhập/email đề xuất trong file** (thường ghi chú "Chưa có mail công vụ"):
Đề xuất username theo quy ước đã dùng tại xã: **chữ cái đầu của các từ trong họ + tên đệm, viết liền + tên riêng đầy đủ (không dấu) + ".atdong"**.
Ví dụ: Nguyễn Thị Cẩm Nhung → `ntcnhung.atdong` → `ntcnhung.atdong@tphcm.gov.vn`.
Luôn ghi rõ trong email đây là **"đề xuất"**, nhờ Trung tâm điều chỉnh nếu trùng hoặc sai quy ước hệ thống.

**Xử lý cột nhạy cảm (mật khẩu mặc định):** Nếu file có cột chứa giá trị dạng mật khẩu (kể cả bị đặt sai tên cột, ví dụ nằm dưới header "Năm sinh") → **KHÔNG đưa vào nội dung email gửi ra ngoài**. Hỏi Hiếu xác nhận trước, chỉ ghi chú nội bộ trong phản hồi chat.

### (2) Reset mật khẩu
Hỏi: Địa chỉ mail cần reset, Họ tên chủ tài khoản, SĐT xác minh (nếu có), Lý do.

### (3) Thay đổi thông tin
Hỏi: Địa chỉ mail hiện tại, Thông tin cũ → mới, Lý do.

## BƯỚC 3 — Soạn nội dung & tạo draft

- Nhiều người trong 1 yêu cầu (cấp mới hàng loạt) → trình bày dạng bảng: STT | Họ và tên | Chức vụ | SĐT | Đề xuất tên đăng nhập/Email | Ghi chú.
- 1 người / yêu cầu đơn lẻ (reset, đổi thông tin) → theo mẫu ngắn gọn tương ứng.
- Chữ ký cuối email: Họ tên người gửi, Phòng Văn hóa - Xã hội, UBND xã An Thới Đông, SĐT (nếu chưa có SĐT trong ngữ cảnh, để chỗ trống và nhắc Hiếu bổ sung — không tự bịa số).
- Gọi `Gmail:create_draft` với `to`, `cc`, `subject`, `body` đầy đủ.

## BƯỚC 4 — Báo cáo kết quả

Sau khi tạo draft, báo cho Hiếu:
1. Draft đã tạo, To/CC là gì
2. Những gì Hiếu cần tự kiểm tra/bổ sung trước khi gửi (SĐT, đính kèm file nếu cần, xác nhận username đề xuất)
3. Ghi chú nội bộ nhạy cảm (nếu có, ví dụ mật khẩu mặc định) — không đưa vào email

## LƯU Ý ĐẶC BIỆT

- Không tự gửi email — chỉ tạo draft.
- Không tự bịa SĐT, số văn bản, hoặc thông tin cán bộ không có trong dữ liệu gốc.
- Luôn CC tkkhoa.ttcds@tphcm.gov.vn — không bỏ sót.
- Username đề xuất luôn gắn nhãn "đề xuất", không khẳng định chắc chắn hệ thống Thành phố sẽ chấp nhận.
