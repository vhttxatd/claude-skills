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

> **NGUYÊN TẮC:** Dùng ký tự `-` lặp lại, font Times New Roman, **size 8pt (16 half-points)**,
> căn giữa. KHÔNG dùng `BorderStyle` hay `border bottom` của paragraph.

```javascript
const divider = (width = 28, align = AlignmentType.CENTER) =>
  new Paragraph({
    children: [new TextRun({ text: '-'.repeat(width), size: 16, font: 'Times New Roman' })],
    alignment: align,
    spacing: { line: 240, before: 0, after: 0 },
  });

// Các độ rộng thường dùng:
// Cột trái (dưới tên đơn vị): width ≈ 26
// Cột phải (dưới "Độc lập - Tự do - Hạnh phúc"): width ≈ 34
// Dưới dòng cuối tiêu đề BÁO CÁO / KẾ HOẠCH: width ≈ 40
```

---

## Số trang

### Quy tắc chung — áp dụng MỌI loại văn bản (CV, BC, KH, TTr, QĐ, BB, GM...)

| Quy tắc | Giá trị |
|---|---|
| Bắt đầu đếm từ | **Trang 1** (trang đầu tiên của văn bản) |
| Hiển thị từ | **Trang 2** trở đi (trang 1 KHÔNG hiển thị số trang) |
| Vị trí | Header (KH/QĐ/CV/TTr/BB) hoặc Footer (BC) — xem bảng bên dưới |
| Căn | Căn giữa |
| Cỡ chữ | 12pt (24 half-points) |
| Reset | Mỗi session (file văn bản mới) bắt đầu lại từ 1 |

**Kỹ thuật BẮT BUỘC:** `titlePage: true` trong section properties để trang 1 dùng header/footer riêng (rỗng).

> **ÁP DỤNG KHÔNG NGOẠI LỆ:** Mọi loại văn bản bao gồm cả Biên bản họp, Giấy mời, và bất kỳ văn bản nội bộ nào đều phải có `titlePage: true` — ngay cả khi văn bản chỉ 1 trang. Quy tắc này đảm bảo khi văn bản sang trang 2, số trang hiện đúng.

### Vị trí số trang theo loại văn bản

| Loại | Vị trí | Ghi chú |
|---|---|---|
| Báo cáo (BC) | **FOOTER** | |
| Kế hoạch (KH) | **HEADER** | |
| Quyết định (QĐ) | **HEADER** | |
| Công văn (CV) | **HEADER** | Chỉ khi >1 trang |
| Tờ trình (TTr) | **HEADER** | Chỉ khi >1 trang |
| Biên bản (BB) | **HEADER** | Chỉ khi >1 trang |
| Giấy mời (GM) | **HEADER** | Chỉ khi >1 trang |
| Phiếu trình (PTr) | Không có | Thường 1 trang |

### Code mẫu — Báo cáo (BC) — số trang ở FOOTER
```javascript
const pageFooter = new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 240, before: 0, after: 0 },
    children: [new TextRun({ children: [PageNumber.CURRENT], size: 24, font: 'Times New Roman' })],
  })]
});
const emptyFooter = new Footer({ children: [] });

// Trong section — BẮT BUỘC titlePage: true
properties: {
  titlePage: true,   // ← trang 1 dùng footer riêng (rỗng)
  page: { pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } }
}
footers: { first: emptyFooter, default: pageFooter }
headers: { first: new Header({ children: [] }), default: new Header({ children: [] }) }
```

### Code mẫu — Kế hoạch/QĐ/CV/TTr — số trang ở HEADER
```javascript
const pageHeader = new Header({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 240, before: 0, after: 0 },
    children: [new TextRun({ children: [PageNumber.CURRENT], size: 24, font: 'Times New Roman' })],
  })]
});
const emptyHeader = new Header({ children: [new Paragraph({ children: [] })] });

// Trong section — BẮT BUỘC titlePage: true
properties: {
  titlePage: true,   // ← trang 1 dùng header riêng (rỗng)
  page: { pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } }
}
headers: { first: emptyHeader, default: pageHeader }
footers: { first: new Footer({ children: [] }), default: new Footer({ children: [] }) }
```

### Văn bản có nhiều section (công văn kèm phụ lục, biểu mẫu...)

Khi văn bản chính + phụ lục nằm trong **cùng 1 file docx**, có 2 cách xử lý số trang:

**Cách A — Đánh số liên tục toàn file** (dùng khi phụ lục là phần không thể tách):
```javascript
// Tất cả section dùng chung header/footer, không reset số trang
// Section 1: titlePage:true, pageNumbers.start:1
// Section 2+: titlePage:true, KHÔNG set pageNumbers.start (tiếp nối)
```

**Cách B — Reset số trang ở mỗi section** (dùng khi phụ lục là tài liệu riêng):
```javascript
// Mỗi section khai báo pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL }
// → Trang đầu mỗi section = trang 1 (nhưng không hiện do titlePage:true)
// → Trang 2 mỗi section = hiện số "2"
```

> **Thực tế xã An Thới Đông:** Hầu hết văn bản dùng Cách A (phụ lục liền mạch).
> Chỉ dùng Cách B khi phụ lục cần đánh số trang độc lập.

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
