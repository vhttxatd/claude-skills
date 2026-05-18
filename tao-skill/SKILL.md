---
name: tao-skill
description: >
  Sử dụng skill này khi người dùng muốn TẠO MỚI, CHỈNH SỬA hoặc CẢI TIẾN một
  skill (bộ hướng dẫn) cho Claude. Kích hoạt khi người dùng nói "tạo skill",
  "viết skill", "xây dựng skill", "cập nhật skill", "cải thiện skill", "skill
  mới cho...", hoặc muốn Claude học cách làm một việc lặp đi lặp lại.
  Đây là skill dùng để tạo ra các skill khác — ví dụ skill soạn công văn,
  skill theo dõi tiến độ, skill phân tích văn bản pháp lý, v.v.
---

# Skill: Tạo và Cải Tiến Skill

Skill này giúp Hiếu xây dựng các bộ hướng dẫn (skill) để Claude thực hiện
các nhiệm vụ lặp lại một cách nhất quán và chính xác.

---

## Skill là gì?

Một skill là **file hướng dẫn** (SKILL.md) mà Claude đọc trước khi thực hiện
nhiệm vụ. File này chứa: quy trình xử lý, quy tắc đầu vào/đầu ra, mẫu cố định,
và các lưu ý đặc thù. Skill giúp Claude làm đúng ngay từ lần đầu, không cần
giải thích lại mỗi lần.

---

## QUY TRÌNH TẠO SKILL MỚI

### Bước 1 — Hiểu mục tiêu

Hỏi người dùng:
1. Skill này giúp Claude làm việc gì cụ thể?
2. Khi nào cần dùng skill này? (từ khóa kích hoạt)
3. Dữ liệu đầu vào thường là gì? (file, văn bản, yêu cầu...)
4. Kết quả đầu ra mong muốn là gì? (file Word, bảng, văn bản...)
5. Có ví dụ mẫu nào về kết quả tốt không?

### Bước 2 — Thu thập ngữ cảnh

Nếu người dùng có:
- **File mẫu** (báo cáo cũ, công văn cũ) → đọc và học phong cách
- **Quy trình có sẵn** → hệ thống hóa thành các bước rõ ràng
- **Yêu cầu đặc thù** (từ viết tắt, văn phong, định dạng) → ghi vào skill

### Bước 3 — Soạn SKILL.md

Cấu trúc file SKILL.md:

```
---
name: ten-skill-khong-dau
description: >
  Mô tả NGẮN GỌN khi nào dùng skill này.
  Liệt kê các từ khóa kích hoạt.
---

# Tên Skill

## BỐI CẢNH (nếu cần)
## BƯỚC 1 — ...
## BƯỚC 2 — ...
## LƯU Ý ĐẶC BIỆT
```

**Nguyên tắc viết skill tốt:**
- Mỗi bước phải cụ thể, có thể làm được ngay
- Dùng ví dụ ĐÚNG và SAI để Claude học phong cách
- Ghi rõ những điều TUYỆT ĐỐI KHÔNG làm
- Phần `description` phải đủ rõ để Claude tự biết khi nào cần dùng

### Bước 4 — Thử nghiệm

Sau khi soạn xong:
1. Chạy thử với 2-3 tình huống thực tế
2. Đánh giá kết quả: đúng không? thiếu gì? thừa gì?
3. Chỉnh sửa skill dựa trên phản hồi
4. Lặp lại cho đến khi đạt yêu cầu

### Bước 5 — Đóng gói và cài đặt

```bash
# Đóng gói skill thành file .skill
zip -r ten-skill.skill ten-skill/

# Cài vào Claude.ai:
# Vào Customize → Skills → + → Upload file .skill
```

---

## QUY TRÌNH CẢI TIẾN SKILL ĐÃ CÓ

Khi người dùng muốn cập nhật skill:

1. **Đọc skill hiện tại** — xác định phần nào cần sửa
2. **Hỏi vấn đề cụ thể** — kết quả nào chưa đúng ý?
3. **Chỉnh sửa có mục tiêu** — không sửa những phần đang hoạt động tốt
4. **Kiểm tra lại** — đảm bảo chỉnh sửa không gây lỗi ở phần khác
5. **Đóng gói lại** — xuất file `.skill` mới để cài đặt

---

## GỢI Ý SKILL NÊN TẠO TIẾP

Dựa trên công việc tại xã An Thới Đông, các skill hữu ích:

| Skill nên tạo | Mô tả |
|--------------|-------|
| `soan-cong-van` | Soạn công văn, thông báo, tờ trình theo mẫu hành chính |
| `phan-tich-van-ban` | Đọc và tóm tắt văn bản pháp lý, bóc tách nhiệm vụ |
| `theo-doi-tien-do` | Cập nhật và tổng hợp tiến độ từ NEXUS Gov |
| `tra-loi-phieu-khao-sat` | Tổng hợp và phân tích kết quả khảo sát |
