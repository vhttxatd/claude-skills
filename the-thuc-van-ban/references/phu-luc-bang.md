# Phụ lục và bảng phân công

## Tiêu đề phụ lục

```
"PHỤ LỤC"                           ← đậm, 14pt, căn giữa
"BẢNG PHÂN CÔNG CHI TIẾT..."        ← đậm, 13pt (26), căn giữa
"(Ban hành kèm theo Kế hoạch số..." ← nghiêng, 12pt (24), căn giữa
"của Ủy ban nhân dân xã An Thới Đông)" ← nghiêng, 12pt (24), căn giữa
```

---

## Bảng phân công — quy tắc định dạng

### Màu sắc và cỡ chữ

| Hàng | Nền | Chữ | Cỡ | Ghi chú |
|---|---|---|---|---|
| Header (tiêu đề cột) | #1F4E79 (xanh đậm) | Trắng, đậm | 13pt (26) | Căn giữa |
| Group row (nhóm nhiệm vụ) | #D9D9D9 (xám nhạt) | Đen, đậm | 13pt (26) | Căn trái |
| Dữ liệu — cột STT | Trắng | Đen thường | 13pt (26) | Căn giữa |
| Dữ liệu — cột nội dung | Trắng | Đen thường | 13pt (26) | **Căn đều 2 bên (JUSTIFIED)** |

### Spacing nội dung ô bảng

```javascript
// Tất cả ô dữ liệu: Before=0pt, After=0pt, Line=Single, KHÔNG indent
spacing: { before: 0, after: 0, line: 240 }
// Không dùng indent (Special: none)

// Cột nội dung: căn đều 2 bên
alignment: AlignmentType.JUSTIFIED

// Cột STT: căn giữa
alignment: AlignmentType.CENTER
```

> **Nguồn:** Paragraph settings — Before/After: 0pt, Line: Single, Special: (none).

### Border và margin

```javascript
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
margins: { top: 60, bottom: 60, left: 100, right: 100 }
```

### Code mẫu đầy đủ

```javascript
const thCell = text => new TableCell({
  shading: { fill: '1F4E79', type: 'clear' },
  borders: solidBorders, verticalAlign: VerticalAlign.CENTER,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 120, after: 120, line: 240 },
    children: [new TextRun({ text, bold: true, size: 26, font: 'Times New Roman', color: 'FFFFFF' })]
  })]
});

const grpRow = text => new TableRow({ children: [new TableCell({
  columnSpan: 7, borders: solidBorders,
  shading: { fill: 'D9D9D9', type: 'clear' },
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 120, after: 120, line: 240 },
    children: [new TextRun({ text, bold: true, size: 26, font: 'Times New Roman' })]
  })]
})] });

const dRow = cols => new TableRow({ children: cols.map((c, i) => new TableCell({
  borders: solidBorders, verticalAlign: VerticalAlign.CENTER,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  width: { size: colW[i], type: WidthType.DXA },
  children: [new Paragraph({
    alignment: i === 0 ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    spacing: { before: 0, after: 0, line: 240 },
    children: [new TextRun({ text: c, size: 26, font: 'Times New Roman' })]
  })]
})) });
```

### Cấu trúc cột chuẩn (Kế hoạch UBND xã)

**Gợi ý columnWidths (DXA, tổng ~9026):**
```javascript
const colW = [360, 2400, 1200, 1700, 1500, 900, 966];
// STT | Tên nhiệm vụ | Cơ quan chủ trì | Cơ quan phối hợp | Kết quả/Sản phẩm | Thời gian | Ghi chú
```

---

## Viết tắt tên cơ quan trong bảng

**ĐƯỢC** viết tắt tên cơ quan; **KHÔNG ĐƯỢC** viết tắt các từ thông thường (cán bộ, công chức, thủ tục hành chính, cơ sở dữ liệu...).

| Tên đầy đủ | Viết tắt dùng trong bảng |
|---|---|
| Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã | VP HĐND-UBND |
| Phòng Văn hóa - Xã hội | Phòng VH-XH |
| Phòng Kinh tế | Phòng Kinh tế |
| Trung tâm Phục vụ hành chính công | TT PVHCC |
| Trung tâm Cung ứng dịch vụ công | TT CUDVC |
| Công an xã | Công an xã |
| Trạm Y tế xã | Trạm Y tế |
| Ủy ban Mặt trận Tổ quốc Việt Nam xã | UBMTTQ |
| Tổ Công nghệ số cộng đồng 12 ấp | Tổ CNSCĐ 12 ấp |
| Các đơn vị liên quan | **các đơn vị liên quan** (KHÔNG viết tắt LQ) |
| Các trường học trên địa bàn | Các trường học |
| Xã đoàn (Đoàn TNCS HCM xã) | Xã đoàn |

---

## Quy tắc phân công cơ quan — Kế hoạch UBND xã

> Xem chi tiết tại `quy-tac-chung/data/don-vi-chuc-nang.md`

**KHÔNG** đưa "UBND xã" vào cột phối hợp.
**Ngoại lệ:** "UBND xã" chủ trì khi nhiệm vụ mang tính chỉ đạo liên ngành.

| Nhóm nhiệm vụ | Chủ trì | Phối hợp chính |
|---|---|---|
| Tuyên truyền, sự kiện đến người dân | TT CUDVC | Phòng VH-XH |
| Xây dựng kế hoạch, tham mưu, chỉ số CĐS | Phòng VH-XH | TT CUDVC |
| Dịch vụ công trực tuyến, số hóa hồ sơ, đơn giản hóa TTHC | TT PVHCC | TT CUDVC; các phòng |
| Hạ tầng viễn thông, kinh tế số, nông nghiệp số | Phòng Kinh tế | các đơn vị liên quan |
| Chữ ký số, nền tảng điều hành | VP HĐND-UBND | Các phòng; TT PVHCC |
| Đề án 06, VNeID, cơ sở dữ liệu dân cư | Công an xã | TT PVHCC; Tổ CNSCĐ 12 ấp |
| An toàn thông tin, an ninh mạng | Công an xã | Phòng VH-XH; VP HĐND-UBND |
| STEM/STEAM, Maker Space | Các trường học | Phòng VH-XH |
| Phổ cập công nghệ số cho người dân | TT CUDVC | Phòng VH-XH; UBMTTQ; Tổ CNSCĐ 12 ấp |
| Y tế số, hồ sơ sức khỏe điện tử | Trạm Y tế | Phòng VH-XH |


---

## Bảng phân công — quy tắc định dạng

### Màu sắc và cỡ chữ

| Hàng | Nền | Chữ | Cỡ | Ghi chú |
|---|---|---|---|---|
| Header (tiêu đề cột) | #1F4E79 (xanh đậm) | Trắng, đậm | 13pt (26) | Căn giữa |
| Group row (nhóm nhiệm vụ) | #D9D9D9 (xám nhạt) | Đen, đậm | 13pt (26) | Căn trái |
| Dữ liệu | Trắng | Đen thường | 13pt (26) | Căn trái |
| Cột STT | Trắng | Đen thường | 13pt (26) | Căn giữa |

### Border và margin

```javascript
// Border đơn màu đen
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };

// Cell margins
margins: { top: 60, bottom: 60, left: 100, right: 100 }
```

### Cấu trúc cột chuẩn (Kế hoạch UBND xã)

| STT | Tên nhiệm vụ | Cơ quan chủ trì | Cơ quan phối hợp | Kết quả/Sản phẩm | Thời gian | Ghi chú |
|---|---|---|---|---|---|---|
| Rộng nhỏ | Rộng nhất | Trung bình | Rộng | Trung bình | Hẹp | Hẹp |

**Gợi ý columnWidths (DXA, tổng ~9026):**
```javascript
const colW = [360, 2300, 1300, 1800, 1500, 950, 816];
// Tổng: 9026 DXA
```

---

## Viết tắt tên cơ quan trong bảng

| Tên đầy đủ | Viết tắt dùng trong bảng |
|---|---|
| Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã | VP HĐND-UBND |
| Phòng Văn hóa - Xã hội | Phòng VH-XH |
| Phòng Kinh tế | Phòng Kinh tế |
| Trung tâm Phục vụ hành chính công | TT PVHCC |
| Trung tâm Cung ứng dịch vụ công | TT CUDVC |
| Công an xã | Công an xã |
| Trạm Y tế xã | Trạm Y tế |
| Ủy ban Mặt trận Tổ quốc Việt Nam xã | UBMTTQ |
| Tổ Công nghệ số cộng đồng | Tổ CNSCĐ |
| Tổ Công nghệ số cộng đồng 12 ấp | Tổ CNSCĐ 12 ấp |
| Các đơn vị liên quan | các đơn vị LQ |
| Các doanh nghiệp viễn thông | Các DN viễn thông |
| Các trường học trên địa bàn | Các trường học |
| Xã đoàn (Đoàn TNCS HCM xã) | Xã đoàn |

---

## Quy tắc phân công cơ quan — Kế hoạch UBND xã

Đây là kế hoạch do UBND xã ban hành → cơ quan chủ trì và phối hợp phải là **đơn vị trực thuộc UBND xã**.

**KHÔNG** đưa "UBND xã" vào cột phối hợp.
**Ngoại lệ:** "UBND xã" là chủ trì khi nhiệm vụ mang tính chỉ đạo liên ngành, không thuộc một đơn vị cụ thể.

**Thứ tự ưu tiên — Cơ quan chủ trì:**
1. Phòng chuyên môn (Phòng VH-XH, Phòng Kinh tế, VP HĐND-UBND)
2. Đơn vị sự nghiệp (TT PVHCC, TT CUDVC, Trạm Y tế)
3. Công an xã — chủ trì Đề án 06 và ATTT/an ninh mạng
4. Các trường học — chủ trì STEM/STEAM

**Phân công theo nhóm nhiệm vụ:**

| Nhóm nhiệm vụ | Chủ trì | Phối hợp chính |
|---|---|---|
| Tuyên truyền, sự kiện đến người dân | TT CUDVC | Phòng VH-XH |
| Xây dựng kế hoạch, tham mưu, chỉ số CĐS | Phòng VH-XH | TT CUDVC |
| DVCTT, số hóa hồ sơ TTHC | TT PVHCC | TT CUDVC; các phòng |
| Hạ tầng viễn thông, kinh tế số, TMĐT | Phòng Kinh tế | UBND xã; DN viễn thông |
| Chữ ký số, nền tảng điều hành | VP HĐND-UBND | Các phòng; TT PVHCC |
| Đề án 06, VNeID, CSDL dân cư | Công an xã | TT PVHCC; Tổ CNSCĐ |
| An toàn thông tin, an ninh mạng | Công an xã | Phòng VH-XH; VP HĐND-UBND |
| STEM/STEAM, Maker Space | Các trường học | Phòng VH-XH |
| Phổ cập công nghệ số cho dân | TT CUDVC | Phòng VH-XH; UBMTTQ; Tổ CNSCĐ |
| Y tế số, hồ sơ sức khỏe | Trạm Y tế | Phòng VH-XH |


### QUY TẮC BẢNG PHỤ LỤC — CỘT ĐÁNH GIÁ

Trong cột "Đánh giá" của bảng phụ lục, TUYỆT ĐỐI KHÔNG dùng biểu tượng/emoji:
❌ SAI: ✅ 🟡 ⏳ 🟢 🔄 ⚪ 🔴 ...

✔ ĐÚNG: Dùng chữ thuần túy, cụ thể:

| Thay vì | Dùng |
|---|---|
| ✅ Hoàn thành | Hoàn thành |
| 🟡 Đang thực hiện | Đang thực hiện |
| ⏳ Tiếp tục duy trì | Tiếp tục duy trì |
| 🟢 Đạt | Đạt |
| 🔄 Tiếp tục thực hiện | Tiếp tục thực hiện |
| ⚪ Đang xây dựng | Đang xây dựng |
| 🔴 Chưa thực hiện | Chưa thực hiện |

Quy tắc này áp dụng cho MỌI bảng phụ lục trong tất cả loại báo cáo.
Trong phần thân văn bản (không phải bảng), không dùng emoji ở bất kỳ đâu.
