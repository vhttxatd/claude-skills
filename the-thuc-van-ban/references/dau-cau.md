# Dấu câu và quy tắc trình bày

## Dấu câu chuẩn

| Loại dấu | Dùng | KHÔNG dùng |
|---|---|---|
| Gạch ngang giữa câu | - (hyphen, U+002D) | – (en-dash), — (em-dash) |
| Ngoặc kép mở | " (U+201C, \u201c) | " (thẳng) |
| Ngoặc kép đóng | " (U+201D, \u201d) | " (thẳng) |
| Gạch đầu dòng Nơi nhận | - (gạch ngắn + dấu cách) | • * |
| Dấu kết căn cứ (giữa) | ; | . |
| Dấu kết căn cứ cuối | , | ; hoặc . |

**Ví dụ đúng:**
- `Độc lập - Tự do - Hạnh phúc`
- `"rõ người - rõ việc - rõ trách nhiệm - rõ thời hạn - rõ kết quả"`
- `"Bình dân học vụ số"`

**Trong code docx-js:** dùng `\u201c` (mở) và `\u201d` (đóng), KHÔNG dùng `\"`.

---

## Dấu gạch ngang divider (đường kẻ ngang)

> **KHÔNG có thông số ở đây.** Độ rộng và giãn cách của cả 3 divider được khai
> báo tại **`templates/config/config.js` → khối `DIVIDER`** (nguồn duy nhất).
> Code gọi bằng tên vị trí, không truyền số:
>
> ```javascript
> divider('coQuan')     // dưới tên cơ quan ban hành
> divider('quocHieu')   // dưới "Độc lập - Tự do - Hạnh phúc"
> divider('trichYeu')   // dưới trích yếu văn bản
> ```
>
> Muốn đổi độ dài hay giãn cách sau → sửa `DIVIDER` trong `config.js`, mọi loại
> văn bản tự cập nhật. Nguyên tắc bất biến: ký tự `-` lặp lại, đậm, căn giữa,
> KHÔNG dùng `BorderStyle` / `border bottom`.

---

## Số trang

> **Quy tắc thống nhất cho MỌI loại văn bản (không ngoại lệ):**

| Quy tắc | Giá trị |
|---|---|
| Vị trí | **HEADER — đầu trang**, căn giữa (kể cả Báo cáo) |
| Trang 1 | **KHÔNG hiển thị** số trang |
| Hiển thị từ | Trang 2 trở đi |
| Bắt đầu đếm | Trang 1 — mỗi file mới reset về 1 |
| Cỡ chữ | 12pt (24 half-points) |

Thực thi tại `templates/partials/page-setup.js`; bật/tắt theo loại đọc từ
`DINH_DANG[...].pageNumberPosition` trong `config.js`. Hai điều kiện kỹ thuật
bắt buộc (đã có sẵn trong partial, không cần viết lại):
`titlePage: true` để trang 1 dùng header rỗng, và
`pageNumbers: { start: 1 }` để số trang reset đúng ở mỗi file.

> Khi văn bản có nhiều section (kèm phụ lục): mặc định đánh số liên tục toàn
> file — chỉ section đầu khai `pageNumbers.start`. Nếu phụ lục cần đánh số độc
> lập thì mỗi section khai lại `start: 1`.

---

## Ngày tháng

**Trong văn bản chính thức:**
```
"ngày 12 tháng 02 năm 2026"   ← đầy đủ
```
KHÔNG dùng: `12/02/2026`, `12-02-2026`

Khi chưa có ngày: `"ngày     tháng     năm 20.."`

---

## Viết số trong văn bản

| Loại | Cách viết | Ví dụ |
|---|---|---|
| Tỉ lệ phần trăm | >= hoặc ≥ | `>=85%` hoặc `≥85%` |
| Số thứ tự | 01, 02... | `01 mô hình`, `03 sản phẩm` |
| Năm | Viết đủ 4 số | `năm 2026` |
| Số tiền | Bằng số + bằng chữ | `1.500.000 đồng (Một triệu năm trăm nghìn đồng)` |


### QUY TẮC DẤU GẠCH NGANG

Trong toàn bộ văn bản hành chính, CHỈ dùng một loại dấu gạch ngang duy nhất:

**ĐÚNG:** Dấu gạch ngang ngắn có khoảng cách 2 bên: ` - `
- Ví dụ: "Khối Đảng - Mặt trận Tổ quốc"
- Ví dụ: "Nhóm VI - Nhóm VIII"
- Ví dụ: "Độc lập - Tự do - Hạnh phúc"

**SAI — TUYỆT ĐỐI KHÔNG dùng:**
- Dấu gạch ngang dài (em dash): — (U+2014)
- Dấu gạch ngang trung (en dash): – (U+2013)
- Dấu gạch liền không cách: từ-đến, nhóm—nhóm

Áp dụng cho MỌI trường hợp trong văn bản:
- Nối cụm từ: "Khoa học công nghệ - Đổi mới sáng tạo"
- Nối nhóm/phạm vi: "Nhóm I - Nhóm III", "tháng 1 - tháng 3"
- Tiêu đề mục: "6. Nhóm VI - Nhóm VIII - Kinh tế số"
- Tên tổ chức: "Hội đồng nhân dân - Ủy ban nhân dân"
- Mọi vị trí khác trong văn bản
