# Cài đặt trang và định dạng cơ bản

## Trang A4

```
Khổ giấy : A4 — width: 11906 DXA, height: 16838 DXA
contentW : lấy bằng contentWidth(loai) trong config — KHÔNG gõ số cứng,
           vì Báo cáo có lề phải hẹp hơn Kế hoạch/Công văn
```

## Lề theo loại văn bản

| Loại văn bản | Lề trái | Lề phải | Lề trên | Lề dưới |
|---|---|---|---|---|
| **Báo cáo (BC)** | 1800 DXA (3.17cm) | 900 DXA (1.59cm) | 1000 DXA (~1.76cm) | 1000 DXA |
| **Kế hoạch (KH), QĐ, CV, TTr** | 1800 DXA (3.17cm) | 1080 DXA (1.9cm) | 1134 DXA (~2cm) | 1134 DXA |

> Báo cáo dùng lề phải hẹp hơn và lề trên/dưới nhỏ hơn để vừa trang.

## Font và cỡ chữ

| Vị trí | Font | Cỡ | Half-points |
|---|---|---|---|
| Toàn bộ thân văn bản | Times New Roman | 14pt | 28 |
| Tiêu đề "KẾ HOẠCH" / "BÁO CÁO"... | Times New Roman | 14pt | 28 |
| Trích yếu / tiêu đề phụ | Times New Roman | 14pt | 28 |
| Nơi nhận — dòng header "Nơi nhận:" | Times New Roman | 12pt | 24 |
| Nơi nhận — dòng đơn vị | Times New Roman | 11pt | 22 |
| Dấu gạch ngang divider | Times New Roman | 4pt | 8 (`DIVIDER.size`) |
| Số trang (luôn ở đầu trang) | Times New Roman | 12pt | 24 |
| Bảng phụ lục — header | Times New Roman | 13pt | 26 |
| Bảng phụ lục — dữ liệu | Times New Roman | 13pt | 26 |

## Line spacing và paragraph spacing theo loại văn bản

### Báo cáo hành chính (BC)
```javascript
// Thân văn bản
spacing: { line: 240, before: 120, after: 120 }  // dòng đơn, 6pt trên/dưới

// Tiêu đề, chữ ký, nơi nhận
spacing: { line: 240, before: 0, after: 0 }

// Heading các cấp
spacing: { line: 240, before: 120, after: 120 }
```

### Kế hoạch, Quyết định, Công văn, Tờ trình (KH/QĐ/CV/TTr)
```javascript
// Thân văn bản
spacing: { before: 0, after: 100, line: 276 }  // ~1.15 lines

// Tiêu đề, chữ ký — sp0
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT }

// Heading 1
spacing: { before: 160, after: 80, line: 276 }
// Heading 2
spacing: { before: 120, after: 60, line: 276 }
// Heading 3
spacing: { before: 100, after: 60, line: 276 }
```

## Thụt đầu dòng (dùng cho cả 2 loại)

```javascript
indent: { firstLine: 720 }  // ~1.27cm — thân văn bản, căn cứ, heading, gạch đầu dòng
// KHÔNG dùng { left: 360, hanging: 360 } — gạch đầu dòng cũng firstLine:720 như thân văn bản
```

## Phân cấp đề mục (Heading)

> **KHÔNG chép `paragraphStyles` ra đây.** Toàn bộ 4 cấp heading được sinh tự
> động trong `templates/partials/document-builder.js` từ 2 khối trong
> `config/config.js`: `HEADING` (đậm/nghiêng/outlineLevel) và
> `DINH_DANG[loai].headingSpacing` (giãn cách theo loại văn bản).

| Hàm | Cấp | Dùng cho | Định dạng |
|---|---|---|---|
| `h1("I. ...")` | Level 1 | Phần lớn nhất | Đậm |
| `h2("1. ...")` | Level 2 | Mục | Đậm |
| `h3("1.1. ...")` | Level 3 | Tiểu mục | Đậm |
| `h4("a) ...")` | Level 4 | Mục nhỏ | Đậm + nghiêng |

Quy tắc chung cho cả 4 cấp: căn đều 2 bên, thụt đầu dòng `firstLine: 720` —
**bằng đúng đoạn văn thường**, để mép trái toàn văn bản thẳng hàng.

### Nội dung bên trong tiểu mục — QUY TẮC CỨNG

Là các **đoạn văn liền mạch, thụt đầu dòng chuẩn**. Tuyệt đối KHÔNG tự gắn
tiền tố `1.` `2.` `a)` hay `-` vào đoạn văn — đánh số chỉ dành cho ĐỀ MỤC.

```javascript
// ĐÚNG — mỗi ý là một đoạn văn, mép trái thẳng hàng
h2("1. Thể chế"),
bp("Sau khi Ban Chỉ đạo được kiện toàn..., tại xã còn các vướng mắc sau:"),
bp("Xã chưa thành lập Tổ công tác hợp nhất các mảng về khoa học công nghệ..."),
bp("Cơ chế phối hợp và đầu mối chuyển đổi số chưa được xác lập..."),

// SAI — sẽ bị bp() ném lỗi ngay khi build
bp("1. Chưa thành lập Tổ công tác hợp nhất..."),
bp("- Thành lập Tổ công tác hợp nhất..."),
```

`bp()` tự chặn hai lỗi trên (xem `chanTuDanhDau` trong `partials/base.js`), nên
sai thể thức bị phát hiện lúc chạy script, không lọt ra file Word.

### Liệt kê danh sách — chỉ khi có câu dẫn

Nhiều đoạn văn đứng cạnh nhau trong một đề mục **không phải** là danh sách.
Chúng là đoạn văn thường — viết bằng `bp()`, không đánh số, không gạch đầu dòng.

Chỉ dùng `lietKe()` khi có **câu dẫn mở danh sách** kết thúc bằng dấu hai chấm.
Hàm tự áp quy tắc chung: **1 mục** → viết tiếp thành đoạn văn thường;
**2 mục** → gạch đầu dòng `-`; **từ 3 mục** → đánh số `1.` `2.` `3.`.
Ngưỡng ở `LIET_KE` trong `config/config.js`.

```javascript
...lietKe({
  cauDan: "Kết quả giải quyết thủ tục hành chính trong kỳ như sau:",
  muc: [
    "Tỷ lệ hồ sơ xử lý trực tuyến đạt 74,75% (5.233/7.001 hồ sơ).",
    "Tỷ lệ số hóa hồ sơ đầu vào đạt 99,99% (6.738/6.739 hồ sơ).",
  ],
}),
```

Thiếu câu dẫn, hoặc câu dẫn không kết thúc bằng `:` → `lietKe()` ném lỗi ngay
lúc build, buộc phải xem lại đó có thật sự là liệt kê hay không.
