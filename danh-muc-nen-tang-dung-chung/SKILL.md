---
name: danh-muc-nen-tang-dung-chung
description: >
  Danh mục nền tảng số và CSDL dùng chung cấp Quốc gia, cấp Thành phố. Mỗi
  danh mục có căn cứ pháp lý cụ thể, hiệu lực, đơn vị chủ trì, phạm vi triển
  khai. Dùng khi cần tra cứu, dẫn chiếu, hoặc cập nhật thông tin nền
  tảng/CSDL dùng chung trong văn bản, kế hoạch, báo cáo.
---

# Danh mục nền tảng/CSDL dùng chung

> **Đọc tối thiểu:** SKILL.md này. Chỉ mở thêm khi cần:
> - `data/quoc-gia.md` — tra cứu/cập nhật nền tảng cấp Quốc gia
> - `data/thanh-pho.md` — tra cứu/cập nhật CSDL/nền tảng cấp Thành phố
> - `data/lich-su-cap-nhat.md` — xem lịch sử thay đổi theo văn bản

---

## MỤC ĐÍCH

Lưu trữ có cấu trúc các nền tảng số/CSDL dùng chung mà xã An Thới Đông có
thể phải kết nối, sử dụng, hoặc dẫn chiếu khi soạn kế hoạch CĐS, báo cáo
DTI, KHCN-CĐS. Đảm bảo luôn có căn cứ văn bản cụ thể, theo dõi được hiệu
lực, và **cập nhật ngay khi có văn bản mới**.

---

## CẤU TRÚC 1 ENTRY (BẮT BUỘC đủ các trường)

```markdown
### [Tên nền tảng/CSDL]

| Trường | Nội dung |
|---|---|
| Cấp | Quốc gia / Thành phố |
| Đơn vị chủ trì | [Bộ .../ Sở ... TP.HCM] |
| Mục tiêu dùng chung | [1-2 câu, rút gọn] |
| Thời gian bắt đầu vận hành/triển khai | [Đã vận hành / Năm cụ thể / Giai đoạn] |
| Phạm vi triển khai | [Toàn quốc / Toàn Thành phố / Phường-xã-Đặc khu — ghi đúng theo văn bản, KHÔNG suy đoán nếu văn bản không nói rõ] |
| Căn cứ pháp lý | [Số hiệu] – [Ngày ban hành] – [Cơ quan ban hành] |
| Hiệu lực | Đang hiệu lực / Hết hiệu lực (thay bằng VB nào) / Dự kiến |
| Cập nhật gần nhất | [ngày] – [nội dung thay đổi nếu có] |
```

---

## NGUYÊN TẮC VẬN HÀNH (theo 4 nguyên tắc Karpathy — xem `tao-skill`)

1. **Không tự bịa.** Nếu chưa có văn bản căn cứ cụ thể (số hiệu, ngày, cơ
   quan ban hành) → để `[...]` và hỏi người dùng. KHÔNG tự thêm nền tảng nào
   chỉ vì "nghe nói có" hoặc suy luận từ tên gọi tương tự.
2. **Trường "Phạm vi triển khai"** — nếu văn bản gốc không nêu rõ cấp hành
   chính (tỉnh/phường-xã), ghi đúng như văn bản (ví dụ "toàn quốc", không tự
   diễn giải thành "đến cấp xã" nếu văn bản không ghi).
3. **Sửa 1 phần = chỉ sửa đúng phần đó (surgical).** Khi có văn bản mới làm
   thay đổi 1 nền tảng đã có (đổi đơn vị chủ trì, mở rộng phạm vi, thay thế
   hiệu lực) → tìm đúng entry, chỉ sửa trường bị ảnh hưởng, KHÔNG viết lại
   toàn bộ entry. Đồng thời ghi vào `data/lich-su-cap-nhat.md`.
4. **Văn bản mới bãi bỏ/thay thế văn bản cũ** → cập nhật trường "Hiệu lực"
   của TẤT CẢ entry bị ảnh hưởng, không xóa entry — chuyển trạng thái "Hết
   hiệu lực" kèm tên văn bản thay thế, để vẫn truy vết được lịch sử.

---

## QUY TRÌNH KHI NHẬN VĂN BẢN MỚI

1. Xác nhận với người dùng: số hiệu, ngày ban hành, cơ quan ban hành, có
   bãi bỏ văn bản nào không.
2. Đối chiếu danh mục nền tảng/CSDL trong văn bản với danh mục hiện có:
   - Nền tảng mới hoàn toàn → thêm entry mới
   - Nền tảng đã có nhưng thông tin thay đổi → sửa đúng trường thay đổi
   - Nền tảng bị bãi bỏ/thay thế → chuyển "Hết hiệu lực"
3. Ghi tóm tắt thay đổi vào `data/lich-su-cap-nhat.md`
4. Báo lại người dùng những entry nào đã thêm/sửa để xác nhận

---

## TRIGGER TRA CỨU

| Người dùng hỏi | Hành động |
|---|---|
| "Nền tảng X có căn cứ văn bản nào?" | Mở file tương ứng (`quoc-gia.md`/`thanh-pho.md`) → tìm entry → trả lời kèm căn cứ |
| "Đơn vị nào chủ trì CSDL Y?" | Tìm entry → trả lời đơn vị chủ trì |
| "Cập nhật danh mục theo văn bản [số hiệu]" | Theo QUY TRÌNH KHI NHẬN VĂN BẢN MỚI |
| "Liệt kê nền tảng cấp Thành phố" | Mở `data/thanh-pho.md` → liệt kê |
| "Có nền tảng/CSDL nào liên quan [lĩnh vực] không?" | Tìm trong cả 2 file theo nội dung mục tiêu dùng chung |

---

## LIÊN KẾT SKILL KHÁC

- `cdso-kehoach` → khi soạn căn cứ kế hoạch CĐS có đề cập nền tảng dùng chung
- `bao-cao-hanh-chinh` → khi báo cáo DTI cần dẫn chiếu nền tảng quốc gia
- `quy-tac-chung` → văn bản căn cứ chung khác của xã (không trùng với danh mục này)
