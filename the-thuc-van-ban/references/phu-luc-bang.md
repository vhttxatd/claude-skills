# Phụ lục và bảng phân công

## 1. Tiêu đề phụ lục

### 1.1. Quy tắc chung

Tiêu đề phụ lục phải trình bày **trên một đoạn văn**, dùng dấu chấm để nối mã phụ lục với tên phụ lục, không tách `PHỤ LỤC I` và tên phụ lục thành 2 dòng riêng.

```text
PHỤ LỤC I. HỆ THỐNG CHỈ TIÊU TRIỂN KHAI THỰC HIỆN NGHỊ QUYẾT SỐ 57-NQ/TW TRÊN ĐỊA BÀN XÃ AN THỚI ĐÔNG GIAI ĐOẠN 2026 - 2030, TẦM NHÌN ĐẾN NĂM 2045
(Kèm theo Kế hoạch số        /KH-UBND ngày      tháng      năm 2026 của Ủy ban nhân dân xã An Thới Đông)
```

### 1.2. Định dạng tiêu đề phụ lục

| Thành phần | Định dạng |
|---|---|
| Dòng tiêu đề phụ lục | Times New Roman, 14pt, đậm, căn giữa, line spacing single |
| Cách nối | `PHỤ LỤC I. HỆ THỐNG...` dùng dấu chấm sau số phụ lục, không xuống dòng sau `PHỤ LỤC I` |
| Dòng kèm theo | Times New Roman, 13pt, nghiêng, căn giữa, đặt trong cặp ngoặc đơn `(...)` |
| Khoảng cách | Tiêu đề phụ lục after=0; dòng kèm theo after khoảng 120 DXA trước bảng |

### 1.3. Code mẫu docx-js

```javascript
new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 0, line: 240 },
  children: [new TextRun({
    text: 'PHỤ LỤC I. HỆ THỐNG CHỈ TIÊU...',
    bold: true,
    size: 28,
    font: 'Times New Roman'
  })]
})

new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 120, line: 240 },
  children: [new TextRun({
    text: '(Kèm theo Kế hoạch số        /KH-UBND ngày      tháng      năm 2026 của Ủy ban nhân dân xã An Thới Đông)',
    italics: true,
    size: 26,
    font: 'Times New Roman'
  })]
})
```

---

## 2. Bảng phụ lục — quy tắc định dạng

### 2.1. Màu sắc và cỡ chữ

| Hàng | Nền | Chữ | Cỡ | Ghi chú |
|---|---|---|---:|---|
| Header (tiêu đề cột) | Không bắt buộc màu; nếu dùng màu thì ưu tiên #1F4E79 | Đậm, căn giữa | 13pt (26) | Căn giữa, line single |
| Group row (nhóm nhiệm vụ) | #D9D9D9 nếu cần phân nhóm | Đen, đậm | 13pt (26) | Căn trái hoặc căn đều |
| Dữ liệu — cột STT | Trắng | Đen thường | 13pt (26) | Căn giữa |
| Dữ liệu — cột nội dung | Trắng | Đen thường | 13pt (26) | Căn đều 2 bên (JUSTIFIED) |

### 2.2. Spacing nội dung ô bảng

```javascript
// Tất cả ô bảng phụ lục: Before=0pt, After=0pt, Line=Single, KHÔNG indent
spacing: { before: 0, after: 0, line: 240 }

// Không dùng indent (Special: none)
// Cột nội dung: căn đều hai bên
alignment: AlignmentType.JUSTIFIED

// Cột STT: căn giữa
alignment: AlignmentType.CENTER
```

> **Quy tắc bắt buộc:** Bảng trong phụ lục dùng cỡ chữ 13pt, line spacing single. Không để line 1.15 trong ô bảng.

### 2.3. Border và margin

```javascript
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
margins: { top: 50, bottom: 50, left: 60, right: 60 }
```

### 2.4. Code mẫu ô bảng

```javascript
const tablePara = (text, opts = {}) => new Paragraph({
  alignment: opts.align || AlignmentType.JUSTIFIED,
  spacing: { before: 0, after: 0, line: 240 },
  children: [new TextRun({
    text,
    bold: opts.bold,
    italics: opts.italics,
    size: 26,
    font: 'Times New Roman'
  })]
})

const tableCell = (text, width, opts = {}) => new TableCell({
  width: { size: width, type: WidthType.PERCENTAGE },
  verticalAlign: VerticalAlign.CENTER,
  borders: solidBorders,
  margins: { top: 50, bottom: 50, left: 60, right: 60 },
  children: [tablePara(text, opts)]
})
```

---

## 3. Cấu trúc cột chuẩn

### 3.1. Quy tắc cột giải trình trong bản trình lãnh đạo và bản phát hành

Khi lập phụ lục kế hoạch phục vụ **trình lãnh đạo xem xét, góp ý, cho chủ trương**, phải có cột giải trình để chứng minh vì sao đề xuất chỉ tiêu, nhiệm vụ hoặc phân công.

**Quy tắc bắt buộc về vị trí cột:**
- Cột **Căn cứ/lý do đề xuất chỉ tiêu** luôn đặt **phía bên phải cùng của bảng**, không đặt ở giữa bảng.
- Cột **Căn cứ/lý do đề xuất nhiệm vụ** hoặc các cột giải trình tương tự cũng ưu tiên đặt **phía bên phải cùng của bảng**.
- Khi kế hoạch đã được thống nhất và chuyển sang bản phát hành chính thức, phải **xóa cột giải trình** này khỏi phụ lục, trừ khi người dùng yêu cầu giữ lại.

Mục đích: bản trình lãnh đạo có đủ cơ sở giải trình; bản phát hành chính thức gọn, đúng tính chất văn bản ban hành.

### 3.2. Phụ lục chỉ tiêu

#### Bản trình lãnh đạo - có cột giải trình bên phải

Khi lập phụ lục chỉ tiêu để trình lãnh đạo, bắt buộc có cột **Căn cứ/lý do đề xuất chỉ tiêu** và cột này đặt bên phải cùng.

| STT | Chỉ tiêu | Mức phấn đấu | Đơn vị chủ trì theo dõi | Đơn vị phối hợp | Nguồn số liệu/minh chứng | Thời hạn | Ghi chú | Căn cứ/lý do đề xuất chỉ tiêu |
|---|---|---|---|---|---|---|---|---|

Có thể tách `Mức phấn đấu` thành nhiều cột theo mốc thời gian, ví dụ:

| STT | Chỉ tiêu | Đến hết năm 2026 | Đến năm 2030 | Tầm nhìn đến năm 2045 | Đơn vị chủ trì | Đơn vị phối hợp, cung cấp số liệu | Căn cứ/lý do đề xuất chỉ tiêu |
|---|---|---|---|---|---|---|---|

#### Bản phát hành chính thức - xóa cột giải trình

Khi kế hoạch đã thống nhất và phát hành, bỏ cột **Căn cứ/lý do đề xuất chỉ tiêu**, trừ khi người dùng yêu cầu giữ lại.

| STT | Chỉ tiêu | Đến hết năm 2026 | Đến năm 2030 | Tầm nhìn đến năm 2045 | Đơn vị chủ trì | Đơn vị phối hợp, cung cấp số liệu |
|---|---|---|---|---|---|---|

### 3.3. Phụ lục nhiệm vụ

#### Bản trình lãnh đạo - có cột giải trình bên phải

Khi lập phụ lục nhiệm vụ để trình lãnh đạo, bắt buộc có cột **Căn cứ/lý do đề xuất nhiệm vụ** và cột này đặt bên phải cùng.

| STT | Nhóm nhiệm vụ | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Lực lượng hỗ trợ | Thời gian thực hiện | Kết quả/sản phẩm | Chỉ tiêu liên quan | Ghi chú | Căn cứ/lý do đề xuất nhiệm vụ |
|---|---|---|---|---|---|---|---|---|---|---|

#### Bản phát hành chính thức - xóa cột giải trình

| STT | Nhóm nhiệm vụ | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Lực lượng hỗ trợ | Thời gian thực hiện | Kết quả/sản phẩm | Chỉ tiêu liên quan | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|

### 3.4. Phụ lục phân công, tiến độ

Tùy ngữ cảnh, dùng một trong các cột sau và đặt phía bên phải cùng khi là bản trình lãnh đạo:

| Loại bảng | Cột giải trình cần có trong bản trình lãnh đạo | Khi phát hành chính thức |
|---|---|---|
| Bảng chỉ tiêu | Căn cứ/lý do đề xuất chỉ tiêu | Xóa cột này, trừ khi có yêu cầu giữ lại |
| Bảng nhiệm vụ | Căn cứ/lý do đề xuất nhiệm vụ | Xóa cột này, trừ khi có yêu cầu giữ lại |
| Bảng phân công | Căn cứ/lý do phân công | Xóa cột này, trừ khi có yêu cầu giữ lại |
| Bảng tiến độ | Căn cứ/lý do thực hiện | Xóa cột này, trừ khi có yêu cầu giữ lại |

---

## 4. Viết tắt tên cơ quan trong bảng

**ĐƯỢC** viết tắt tên cơ quan trong bản nháp hoặc khi người dùng cho phép; **KHÔNG ĐƯỢC** viết tắt các từ thông thường như cán bộ, công chức, thủ tục hành chính, cơ sở dữ liệu.

> Khi xuất file Word/văn bản chính thức, phải tuân thủ quy tắc bắt buộc về viết tắt tại `quy-tac-chung/data/quy-tac-viet-tat-bat-buoc.md`.

| Tên đầy đủ | Viết tắt dùng trong bảng khi được phép |
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
| Các đơn vị liên quan | các đơn vị liên quan |
| Các doanh nghiệp viễn thông | Các DN viễn thông |
| Các trường học trên địa bàn | Các trường học |
| Xã đoàn (Đoàn TNCS HCM xã) | Xã đoàn |

---

## 5. Quy tắc phân công cơ quan — Kế hoạch UBND xã

> Xem chi tiết tại `quy-tac-chung/data/don-vi-chuc-nang.md`.

Đây là kế hoạch do UBND xã ban hành → cơ quan chủ trì và phối hợp phải là đơn vị trực thuộc UBND xã hoặc đơn vị được UBND xã giao/phối hợp theo đúng thẩm quyền.

**Không** đưa "UBND xã" vào cột phối hợp.  
**Ngoại lệ:** "UBND xã" chủ trì khi nhiệm vụ mang tính chỉ đạo liên ngành, không thuộc riêng một đơn vị cụ thể.

| Nhóm nhiệm vụ | Chủ trì | Phối hợp chính |
|---|---|---|
| Tham mưu kế hoạch, văn bản chuyển đổi số | Phòng Văn hóa - Xã hội | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã; Trung tâm Phục vụ hành chính công |
| Theo dõi chỉ số chuyển đổi số, chấm điểm chuyển đổi số | Phòng Văn hóa - Xã hội | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã; các đơn vị liên quan |
| Tổ chức sự kiện, tuyên truyền trực tiếp | Trung tâm Cung ứng dịch vụ công | Phòng Văn hóa - Xã hội; Ủy ban Mặt trận Tổ quốc Việt Nam xã; Tổ Công nghệ số cộng đồng 12 ấp |
| Dịch vụ công trực tuyến, số hóa thủ tục hành chính | Trung tâm Phục vụ hành chính công | Trung tâm Cung ứng dịch vụ công; các đơn vị liên quan |
| Đơn giản hóa thủ tục hành chính | Trung tâm Phục vụ hành chính công | Phòng Văn hóa - Xã hội; Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã |
| Chữ ký số, thư điện tử công vụ, quản lý văn bản và hồ sơ công việc | Phòng Văn hóa - Xã hội | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã; các phòng chuyên môn; Trung tâm Phục vụ hành chính công |
| Hệ thống thông tin báo cáo, nền tảng số phục vụ chỉ đạo điều hành | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã | Phòng Văn hóa - Xã hội; các đơn vị liên quan |
| Hạ tầng viễn thông, kinh tế số | Phòng Kinh tế | Các doanh nghiệp viễn thông; Trung tâm Cung ứng dịch vụ công |
| Thương mại điện tử, thương hiệu số | Phòng Kinh tế | Phòng Văn hóa - Xã hội; Trung tâm Cung ứng dịch vụ công |
| Đề án 06, VNeID, cơ sở dữ liệu dân cư | Công an xã | Trung tâm Phục vụ hành chính công; Tổ Công nghệ số cộng đồng 12 ấp |
| An toàn thông tin, an ninh mạng | Công an xã | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã; Phòng Văn hóa - Xã hội |
| Nhân lực số, bồi dưỡng cán bộ | Phòng Văn hóa - Xã hội | Văn phòng Hội đồng nhân dân và Ủy ban nhân dân xã; các đơn vị liên quan |
| Phổ cập công nghệ số cho người dân | Trung tâm Cung ứng dịch vụ công | Phòng Văn hóa - Xã hội; Ủy ban Mặt trận Tổ quốc Việt Nam xã; Tổ Công nghệ số cộng đồng 12 ấp |
| Y tế số, hồ sơ sức khỏe điện tử | Trạm Y tế xã | Phòng Văn hóa - Xã hội; Công an xã |
| Giáo dục số, STEM/STEAM | Các trường học | Phòng Văn hóa - Xã hội |
| Nông nghiệp số, truy xuất nguồn gốc | Phòng Kinh tế | Phòng Văn hóa - Xã hội; Trung tâm Cung ứng dịch vụ công |
| An toàn thực phẩm số | Phòng Kinh tế | Phòng Văn hóa - Xã hội; Công an xã |
| Dữ liệu số, làm sạch dữ liệu | Công an xã | Phòng Văn hóa - Xã hội; các đơn vị liên quan |
| Mô hình thí điểm chuyển đổi số | Ủy ban nhân dân xã | Phòng Văn hóa - Xã hội; Phòng Kinh tế |

---

## 6. Quy tắc bảng phụ lục — cột đánh giá

Trong cột "Đánh giá" của bảng phụ lục, tuyệt đối không dùng biểu tượng/emoji.

Sai: `✅`, `🟡`, `⏳`, `🟢`, `🔄`, `⚪`, `🔴`.  
Đúng: dùng chữ thuần túy, cụ thể.

| Thay vì | Dùng |
|---|---|
| ✅ Hoàn thành | Hoàn thành |
| 🟡 Đang thực hiện | Đang thực hiện |
| ⏳ Tiếp tục duy trì | Tiếp tục duy trì |
| 🟢 Đạt | Đạt |
| 🔄 Tiếp tục thực hiện | Tiếp tục thực hiện |
| ⚪ Đang xây dựng | Đang xây dựng |
| 🔴 Chưa thực hiện | Chưa thực hiện |

Quy tắc này áp dụng cho mọi bảng phụ lục trong tất cả loại báo cáo, kế hoạch. Trong phần thân văn bản cũng không dùng emoji.
