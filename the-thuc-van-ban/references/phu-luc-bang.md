# Phụ lục và bảng phân công

## 1. Tiêu đề phụ lục

### 1.1. Quy tắc chung

Tiêu đề phụ lục phải trình bày trên một đoạn văn, dùng dấu chấm để nối mã phụ lục với tên phụ lục, không tách `PHỤ LỤC I` và tên phụ lục thành 2 dòng riêng.

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

## 2. Bảng phụ lục - quy tắc định dạng

### 2.1. Màu sắc và cỡ chữ

| Hàng/cột | Nền | Chữ | Cỡ | Ghi chú |
|---|---|---|---:|---|
| Header (tiêu đề cột) | Có thể dùng xanh nhạt/xanh đậm theo mẫu | Đậm, căn giữa | 13pt (26) | Căn giữa, line single |
| Dòng nhóm nhiệm vụ | Không nền hoặc xám nhạt | Đen, đậm | 13pt (26) | Gộp ngang toàn bảng, căn trái |
| Dữ liệu - cột STT | Trắng | Đen thường | 13pt (26) | Căn giữa |
| Dữ liệu - cột nội dung | Trắng | Đen thường | 13pt (26) | Căn đều hai bên |
| Cột giải trình | Trắng | Đỏ, đậm ở tiêu đề; đỏ thường ở nội dung | 13pt (26) | Chỉ dùng ở bản trình, không phát hành |

### 2.2. Spacing nội dung ô bảng

```javascript
// Tất cả ô bảng phụ lục: Before=0pt, After=0pt, Line=Single, không indent
spacing: { before: 0, after: 0, line: 240 }

// Cột nội dung: căn đều hai bên
alignment: AlignmentType.JUSTIFIED

// Cột STT: căn giữa
alignment: AlignmentType.CENTER
```

Quy tắc bắt buộc: Bảng trong phụ lục dùng cỡ chữ 13pt, line spacing single. Không để line 1.15 trong ô bảng.

### 2.3. Border và margin

```javascript
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
margins: { top: 50, bottom: 50, left: 60, right: 60 }
```

---

## 3. Quy tắc về cột giải trình trong phụ lục

### 3.1. Nguyên tắc sử dụng

Khi lập phụ lục kế hoạch để trình lãnh đạo xem xét, góp ý, cho chủ trương, phải có cột giải trình để chứng minh vì sao đề xuất chỉ tiêu, nhiệm vụ hoặc phân công.

Cột giải trình chỉ dùng cho **bản trình lãnh đạo, bản xin ý kiến, bản rà soát nội bộ**. Khi kế hoạch đã thống nhất và phát hành chính thức, phải xóa cột này, trừ khi người dùng yêu cầu giữ lại.

### 3.2. Tên cột chuẩn

| Loại phụ lục/bảng | Tên cột giải trình trong bản trình lãnh đạo |
|---|---|
| Phụ lục chỉ tiêu | `Căn cứ/lý do đề xuất chỉ tiêu - Cột này để giải trình, không phát hành` |
| Phụ lục nhiệm vụ | `Căn cứ/lý do đề xuất nhiệm vụ - Cột này để giải trình, không phát hành` |
| Bảng phân công nhiệm vụ | `Căn cứ/lý do đề xuất nhiệm vụ - Cột này để giải trình, không phát hành` |
| Bảng tiến độ hoặc bảng rà soát | `Căn cứ/lý do thực hiện - Cột này để giải trình, không phát hành` |

### 3.3. Vị trí và màu sắc

- Cột giải trình luôn đặt **phía bên phải cùng của bảng**.
- Không đặt cột giải trình ở giữa các cột nghiệp vụ chính.
- Tiêu đề cột và nội dung trong cột giải trình dùng **màu đỏ** để nhận biết đây là cột nội bộ, không phát hành.
- Khi xuất bản trình lãnh đạo, được sử dụng viết tắt riêng trong cột giải trình để nội dung ngắn gọn, dễ in, dễ đọc.
- Các cột còn lại vẫn tuân thủ quy tắc văn bản chính thức: nếu người dùng chưa cho phép viết tắt thì viết đầy đủ.

### 3.4. Quy tắc viết nội dung cột giải trình

- Không mở đầu ô bằng chữ `Căn cứ...` lặp lại nhiều lần.
- Viết ngắn, rõ điểm neo: chỉ tiêu số mấy, phụ lục nào, mục nào trong thân kế hoạch, hoặc nhiệm vụ cụ thể nào trong văn bản cấp trên/xã.
- Không ghi căn cứ chung chung như: `Theo Kế hoạch 48, Chương trình 24, Kế hoạch 02...` nếu không chỉ rõ chỉ tiêu, nhiệm vụ, mục, phần hoặc nội dung liên quan.
- Ưu tiên công thức ngắn: `CT số ... PL I; P.III, mục ... về ...; ...`
- Có thể nêu thêm lý do thực tiễn địa phương nếu nhiệm vụ xuất phát từ đặc thù xã.

Ví dụ đúng:

```text
CT số 1 PL I về DTI cấp xã; P.III, mục 9 về kiểm tra, giám sát, đánh giá.
CT số 17 PL I về Tổ CNSCĐ 12 ấp; phù hợp thực tế xã có 12 ấp cần lực lượng hỗ trợ tại cơ sở.
CT số 19 PL I về 5G, xóa lõm sóng; xuất phát từ nhu cầu kết nối vùng sản xuất, nuôi trồng thủy hải sản.
```

Ví dụ không dùng:

```text
Căn cứ Kế hoạch số 48/KH-UBND; Chương trình số 24-CTr/ĐU; Kế hoạch số 02-KH/BCĐ...
```

---

## 4. Quy tắc gộp nhóm nội dung trong phụ lục nhiệm vụ

### 4.1. Khi nào gộp nhóm

Khi bảng phụ lục nhiệm vụ hoặc bảng phân công có nhiều nhiệm vụ thuộc các nhóm lớn, phải gộp nhóm để dễ đọc, dễ in và dễ trình lãnh đạo.

### 4.2. Cách gộp nhóm

- Bỏ cột `Nhóm nhiệm vụ` nếu bảng đã có dòng nhóm riêng.
- Tạo dòng nhóm riêng, gộp ngang toàn bộ bảng bằng `columnSpan`.
- Dòng nhóm đặt trước các nhiệm vụ thuộc nhóm đó.
- Dòng nhóm dùng số La Mã và tên nhóm, ví dụ: `I. Chỉ đạo, điều hành`; `II. Tuyên truyền, nâng cao nhận thức`; `III. Hạ tầng số, dữ liệu số và nền tảng số`.
- Dòng nhóm in đậm, cỡ 13pt, căn trái, line spacing single.
- STT nhiệm vụ vẫn đánh số liên tục từ đầu đến cuối phụ lục, không đánh lại từ 1 trong từng nhóm, trừ khi người dùng yêu cầu.

### 4.3. Mẫu bảng phụ lục nhiệm vụ đã gộp nhóm

| STT | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Sản phẩm/kết quả | Chỉ tiêu liên quan | Căn cứ/lý do đề xuất nhiệm vụ - Cột này để giải trình, không phát hành |
|---|---|---|---|---|---|---|
| I. Chỉ đạo, điều hành |||||||
| 1 | ... | ... | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... | ... |
| II. Tuyên truyền, nâng cao nhận thức |||||||
| 3 | ... | ... | ... | ... | ... | ... |

### 4.4. Code mẫu dòng nhóm docx-js

```javascript
const groupRow = (text, columnSpan) => new TableRow({
  children: [new TableCell({
    columnSpan,
    borders: solidBorders,
    margins: { top: 50, bottom: 50, left: 60, right: 60 },
    children: [new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 0, line: 240 },
      children: [new TextRun({ text, bold: true, size: 26, font: 'Times New Roman' })]
    })]
  })]
})
```

---

## 5. Cấu trúc cột chuẩn

### 5.1. Phụ lục chỉ tiêu - bản trình lãnh đạo

| STT | Chỉ tiêu | Mức phấn đấu | Đơn vị chủ trì theo dõi | Đơn vị phối hợp | Nguồn số liệu/minh chứng | Thời hạn | Ghi chú | Căn cứ/lý do đề xuất chỉ tiêu - Cột này để giải trình, không phát hành |
|---|---|---|---|---|---|---|---|---|

Có thể tách `Mức phấn đấu` thành nhiều cột theo mốc thời gian, nhưng cột giải trình vẫn đặt bên phải cùng:

| STT | Chỉ tiêu | Đến hết năm 2026 | Đến năm 2030 | Tầm nhìn đến năm 2045 | Đơn vị chủ trì | Đơn vị phối hợp, cung cấp số liệu | Căn cứ/lý do đề xuất chỉ tiêu - Cột này để giải trình, không phát hành |
|---|---|---|---|---|---|---|---|

### 5.2. Phụ lục chỉ tiêu - bản phát hành chính thức

| STT | Chỉ tiêu | Đến hết năm 2026 | Đến năm 2030 | Tầm nhìn đến năm 2045 | Đơn vị chủ trì | Đơn vị phối hợp, cung cấp số liệu |
|---|---|---|---|---|---|---|

### 5.3. Phụ lục nhiệm vụ - bản trình lãnh đạo, có gộp nhóm

| STT | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Sản phẩm/kết quả | Chỉ tiêu liên quan | Căn cứ/lý do đề xuất nhiệm vụ - Cột này để giải trình, không phát hành |
|---|---|---|---|---|---|---|

### 5.4. Phụ lục nhiệm vụ - bản phát hành chính thức

| STT | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Sản phẩm/kết quả | Chỉ tiêu liên quan |
|---|---|---|---|---|---|

---

## 6. Viết tắt tên cơ quan trong bảng

Được viết tắt tên cơ quan trong bản nháp hoặc khi người dùng cho phép; không được viết tắt các từ thông thường như cán bộ, công chức, thủ tục hành chính, cơ sở dữ liệu trong văn bản chính thức.

Khi xuất file Word/văn bản chính thức, phải tuân thủ quy tắc bắt buộc về viết tắt tại `quy-tac-chung/data/quy-tac-viet-tat-bat-buoc.md`.

Riêng cột giải trình màu đỏ trong bản trình lãnh đạo được phép dùng viết tắt nếu người dùng yêu cầu để nội dung ngắn gọn.

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
| Xã đoàn | Xã đoàn |

---

## 7. Quy tắc phân công cơ quan - Kế hoạch UBND xã

Xem chi tiết tại `quy-tac-chung/data/don-vi-chuc-nang.md`.

Đây là kế hoạch do UBND xã ban hành nên cơ quan chủ trì và phối hợp phải là đơn vị trực thuộc UBND xã hoặc đơn vị được UBND xã giao/phối hợp theo đúng thẩm quyền.

Không đưa `UBND xã` vào cột phối hợp. Ngoại lệ: `UBND xã` chủ trì khi nhiệm vụ mang tính chỉ đạo liên ngành, không thuộc riêng một đơn vị cụ thể.

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

## 8. Quy tắc bảng phụ lục - cột đánh giá

Trong cột `Đánh giá` của bảng phụ lục, tuyệt đối không dùng biểu tượng/emoji.

Dùng chữ thuần túy, cụ thể:

| Không dùng | Dùng |
|---|---|
| biểu tượng hoàn thành | Hoàn thành |
| biểu tượng đang thực hiện | Đang thực hiện |
| biểu tượng tiếp tục duy trì | Tiếp tục duy trì |
| biểu tượng đạt | Đạt |
| biểu tượng tiếp tục thực hiện | Tiếp tục thực hiện |
| biểu tượng đang xây dựng | Đang xây dựng |
| biểu tượng chưa thực hiện | Chưa thực hiện |

Quy tắc này áp dụng cho mọi bảng phụ lục trong tất cả loại báo cáo, kế hoạch. Trong phần thân văn bản cũng không dùng emoji.
