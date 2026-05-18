# Quy trình cập nhật skill

> Đọc khi: người dùng yêu cầu sửa, cập nhật, cải tiến bất kỳ skill nào.

---

## AI CÓ THỂ CẬP NHẬT

**Mọi phiên chat** đều có thể cập nhật skill khi người dùng yêu cầu.
Không cần phiên chuyên biệt.

---

## QUY TRÌNH BẮT BUỘC

Khi người dùng yêu cầu cập nhật BẤT KỲ skill nào, Claude phải:

1. **Đọc nội dung hiện tại** của skill được yêu cầu cập nhật
2. **Kiểm tra tác động** — xem xét các skill liên quan có bị ảnh hưởng không
3. **Đề xuất đồng bộ** — liệt kê rõ những skill khác cần cập nhật theo
4. **Chờ xác nhận** từ người dùng trước khi thực hiện
5. **Cập nhật đồng bộ** tất cả skill liên quan trong cùng một lần
6. **Đóng gói lại** tất cả file `.skill` đã thay đổi

---

## BẢN ĐỒ LIÊN KẾT GIỮA CÁC SKILL

```
quy-tac-chung          ← Dữ liệu thực tế (cán bộ, ấp, văn bản, viết tắt)
    ↑ được đọc bởi tất cả skill bên dưới

the-thuc-van-ban       ← Định dạng, thể thức, code docx-js
    ↑ được đọc bởi tất cả skill soạn thảo

cdso-kehoach           → đọc quy-tac-chung + the-thuc-van-ban
bao-cao-hanh-chinh     → đọc quy-tac-chung + the-thuc-van-ban
quan-ly-du-an          → đọc quy-tac-chung + the-thuc-van-ban
nhan-su-danh-gia       → đọc quy-tac-chung
tri-thuc-dia-phuong    → độc lập (chỉ là kho dữ liệu nền)
```

---

## KHI NÀO CẦN ĐỒNG BỘ

| Cập nhật skill | Kiểm tra thêm |
|---|---|
| `quy-tac-chung` (cán bộ, viết tắt...) | Tất cả skill soạn thảo có dùng thông tin đó không |
| `the-thuc-van-ban` (định dạng, code) | `bao-cao-hanh-chinh`, `cdso-kehoach`, `quan-ly-du-an` |
| `bao-cao-hanh-chinh` (quy trình BC) | `the-thuc-van-ban` nếu có thay đổi định dạng mới |
| `cdso-kehoach` (quy trình KH) | `the-thuc-van-ban` nếu có thay đổi định dạng mới |
| `quan-ly-du-an` (quy trình, biểu mẫu) | `the-thuc-van-ban` nếu có thay đổi định dạng mới |

---

## LƯU Ý KHI ĐỌC VÀ GHI FILE SKILL

- **Đọc:** Tự do, không cần xác nhận
- **Ghi/Sửa:** Luôn đề xuất danh sách thay đổi → chờ xác nhận → thực hiện
- **Đóng gói:** Sau khi sửa file → đóng gói lại thành `.skill` → xuất ra `/mnt/user-data/outputs/`

**Đóng gói đồng bộ:** Sau mỗi lần cập nhật, đóng gói **tất cả skill có liên quan** để đảm bảo đồng bộ. Ví dụ: cập nhật quy tắc phân công → đóng gói cả `quy-tac-chung`, `cdso-kehoach`, `bao-cao-hanh-chinh`. Không để skill bị lệch phiên bản giữa các file.
