# Chỉ dẫn sử dụng và danh mục viết tắt — Xã An Thới Đông

## CHỈ DẪN THỰC HIỆN

| Khi trao đổi, thảo luận | Khi dự thảo văn bản chính thức |
|---|---|
| Mô hình chính quyền 2 cấp | UBND xã An Thới Đông trực thuộc UBND Thành phố — không còn cấp huyện |
| Cơ quan chuyên môn thuộc UBND xã | Văn phòng HĐND và UBND; Phòng Kinh tế; Phòng Văn hóa – Xã hội |
| Đoàn thể | Các tổ chức Chính trị – Xã hội |
| Ký hiệu văn bản | Khi trao đổi: chỉ cần loại văn bản và số (vd: Công văn 22); Khi dự thảo: ghi đầy đủ số hiệu, ký hiệu, ngày tháng năm |
| Ngày tháng rút gọn (12/02/2025) | Ghi đầy đủ: ngày 12 tháng 02 năm 2025 |
| Sở KHCN | Sở Khoa học và Công nghệ (thay thế Sở Thông tin và Truyền thông) |
| Sử dụng # Markdown | Dấu # đầu dòng = Tiêu đề đề mục lớn — chỉ dùng khi thảo luận, không dùng trong văn bản chính thức |

---

### Quy tắc ký tên, đóng dấu xác nhận trong biểu mẫu / phụ lục

**KHÔNG đưa phần ký tên, đóng dấu vào trong ô bảng của biểu mẫu.**

Thay vào đó, đặt khối chữ ký **bên dưới bảng**, theo đúng định dạng chữ ký văn bản hành chính chuẩn — nhưng **chỉ giữ phần chức danh và tên người ký**, bỏ toàn bộ "Nơi nhận" và các thông tin xung quanh.

**Cấu trúc khối chữ ký phụ lục/biểu mẫu (căn phải hoặc bảng 2 cột không viền):**

```
                              An Thới Đông, ngày     tháng     năm 2026
                              CHỦ TỊCH ỦY BAN NHÂN DÂN XÃ
                              (Ký tên, đóng dấu)



                              Trần Hoàng Vũ
```

**Quy tắc nội dung chức danh:** Lấy theo yêu cầu của văn bản/biểu mẫu gốc:
- Nếu biểu mẫu ghi "Thủ trưởng đơn vị" → dùng chức danh thực tế: `CHỦ TỊCH ỦY BAN NHÂN DÂN XÃ`
- Nếu biểu mẫu ghi "Người đại diện" → dùng chức danh thực tế tương ứng
- Nếu ký thay → thêm `KT.` phía trên và ghi chức danh ký thay bên dưới

**Ví dụ code docx-js:**
```javascript
// Khối chữ ký phụ lục — căn phải, không có Nơi nhận
const sigPhuLuc = new Table({
  width: { size: contentW, type: WidthType.DXA },
  columnWidths: [Math.round(contentW*0.52), contentW - Math.round(contentW*0.52)],
  borders: noBorders,
  rows: [new TableRow({ children: [
    new TableCell({ borders: noBorders, children: [new Paragraph({ children: [] })] }),
    new TableCell({ borders: noBorders, children: [
      cellP('An Thới Đông, ngày     tháng     năm 2026', { italic: true }),
      cellP('CHỦ TỊCH ỦY BAN NHÂN DÂN XÃ', { bold: true }),
      cellP('(Ký tên, đóng dấu)', { italic: true }),
      ...emp(3),
      cellP('Trần Hoàng Vũ', { bold: true }),
    ]}),
  ]})]
});
```

> **Lưu ý:** Dòng ngày tháng trong khối chữ ký phụ lục cũng chừa trống nếu là dự thảo.

---

### Quy tắc dòng "(Đính kèm theo...)" trong phụ lục

Dòng đính kèm nằm ngay dưới tiêu đề của phụ lục, in nghiêng, cỡ chữ nhỏ (12pt), căn giữa.
**Luôn dẫn chiếu về văn bản của đơn vị soạn thảo** — không dẫn chiếu về văn bản cấp trên.

**Công thức:**
```
(Đính kèm [Loại VB] số [Ký hiệu] ngày [dd] tháng [mm] năm [yyyy] của [Đơn vị soạn thảo])
```

**Dự thảo — chưa có số và ngày:** Chừa trống các ô chưa biết, dùng khoảng cách (spaces):
```
(Đính kèm Công văn số          /CV-UBND ngày     tháng     năm 2026
của Ủy ban nhân dân xã An Thới Đông)
```

**Đã ban hành — điền đầy đủ:**
```
(Đính kèm Công văn số 45/CV-UBND ngày 28 tháng 3 năm 2026
của Ủy ban nhân dân xã An Thới Đông)
```

> **Lưu ý:** Đây là văn bản của đơn vị mình ban hành — KHÔNG dùng số của văn bản cấp trên.
> Ví dụ sai: `(Đính kèm Công văn số 2292/SKHCN-QLCN...)` — đây là văn bản của Sở, không phải của UBND xã.

---

### Quy tắc dẫn chiếu thông tin đã có trong phụ lục

Khi thông tin chi tiết (thông tin đầu mối, thông tin tài khoản, danh sách...) đã được trình bày đầy đủ trong phụ lục đính kèm thì **KHÔNG nhập lại thông tin đó vào thân văn bản**. Thay vào đó dùng câu dẫn chiếu ngắn gọn.

**Các câu dẫn chiếu chuẩn:**

| Nội dung | Câu dùng trong thân văn bản |
|---|---|
| Thông tin người đầu mối | `Thông tin đầu mối tiếp nhận tài khoản chi tiết theo Phụ lục đính kèm.` |
| Thông tin tài khoản dùng chung | `Thông tin tài khoản dùng chung của đơn vị chi tiết theo Phụ lục đính kèm.` |
| Danh sách người | `Danh sách [nội dung] chi tiết theo Phụ lục đính kèm.` |
| Nhiều loại thông tin cùng lúc | `Thông tin đầu mối tiếp nhận tài khoản và thông tin tài khoản dùng chung của đơn vị chi tiết theo Phụ lục đính kèm.` |

**Ví dụ đúng — thân văn bản:**
> Ủy ban nhân dân xã An Thới Đông cử đầu mối tiếp nhận tài khoản và đề nghị Sở cấp 01 tài khoản dùng chung. Thông tin đầu mối tiếp nhận tài khoản và thông tin tài khoản dùng chung của đơn vị chi tiết theo Phụ lục đính kèm.

**Ví dụ sai — KHÔNG làm:**
> Ủy ban nhân dân xã cử ông Phan Trung Hiếu, Chuyên viên phụ trách KH&CN - CĐS, SĐT: 0978 184 475, email: pthieu.atdong@tphcm.gov.vn... Tên tài khoản: anthoiddong@trolyso-hcmc.vn...

> **Nguyên tắc:** Phụ lục là nơi chứa dữ liệu chi tiết — thân văn bản chỉ nêu mục đích và dẫn về phụ lục.

---

### Quy tắc trình bày danh sách người trong văn bản

**Trường hợp 1 người — liệt kê nhiều dòng ngay trong thân văn bản:**
```
Họ và tên: Phan Trung Hiếu
Chức vụ: Chuyên viên phụ trách KH&CN - CĐS
Đơn vị công tác: Phòng Văn hóa - Xã hội, UBND xã An Thới Đông
Số điện thoại: 0978 184 475
Email công vụ: pthieu.atdong@tphcm.gov.vn
```

**Trường hợp từ 2 người trở lên — KHÔNG liệt kê trong thân văn bản, thay bằng:**
- Ghi trong thân: `(Đính kèm danh sách)`
- Tạo bảng riêng ở section/trang mới (pageBreakBefore: true)
- Bảng có đủ cột: STT / Họ và tên / Chức vụ / Đơn vị / SĐT / Email
- Tiêu đề bảng: `DANH SÁCH [NỘI DUNG] KÈM THEO [LOẠI VĂN BẢN]`

> **Quy tắc áp dụng cho:** danh sách cán bộ đầu mối, danh sách người tham gia, danh sách phân công, danh sách đăng ký...

---

### Quy tắc dẫn chiếu văn bản trong thân văn bản

#### Lần đầu nhắc đến — ghi ĐẦY ĐỦ (ký hiệu + ngày + cơ quan ban hành + trích yếu)

Dùng cho: phần căn cứ đầu văn bản, câu "Thực hiện...", câu "Căn cứ..." — lần xuất hiện đầu tiên.

```
Công văn số 2292/SKHCN-QLCN ngày 19 tháng 3 năm 2026 của Sở Khoa học và Công nghệ
Thành phố Hồ Chí Minh về việc triển khai tài khoản chatbot trí tuệ nhân tạo có bản
quyền cho cơ quan, tổ chức, đơn vị trên địa bàn Thành phố năm 2026
```

**Công thức đầy đủ:**
`[Loại VB] số [Ký hiệu] ngày [dd] tháng [mm] năm [yyyy] của [Cơ quan ban hành] về việc [Trích yếu]`

#### Từ lần thứ 2 trở đi — viết tắt (chỉ giữ ký hiệu + ngày + cơ quan, BỎ trích yếu)

```
Công văn số 2292/SKHCN-QLCN ngày 19 tháng 3 năm 2026 của Sở Khoa học và Công nghệ
Thành phố Hồ Chí Minh
```

**Công thức viết tắt:**
`[Loại VB] số [Ký hiệu] ngày [dd] tháng [mm] năm [yyyy] của [Cơ quan ban hành]`

#### Ví dụ so sánh

| Vị trí | Cách viết |
|---|---|
| Phần "Thực hiện..." (đầu CV) | `Thực hiện Công văn số 2292/SKHCN-QLCN ngày 19 tháng 3 năm 2026 của Sở Khoa học và Công nghệ Thành phố Hồ Chí Minh **về việc triển khai tài khoản chatbot trí tuệ nhân tạo có bản quyền cho cơ quan, tổ chức, đơn vị trên địa bàn Thành phố năm 2026**,` |
| Nhắc lại trong thân văn bản | `...theo Công văn số 2292/SKHCN-QLCN ngày 19 tháng 3 năm 2026 của Sở Khoa học và Công nghệ Thành phố Hồ Chí Minh,...` |

#### Trường hợp đặc biệt — văn bản nội bộ xã

Văn bản do UBND xã hoặc Đảng ủy xã ban hành: từ lần thứ 2 có thể rút gọn hơn, bỏ cả tên cơ quan nếu đã rõ ngữ cảnh:

```
...theo Kế hoạch số 71-KH/BCĐ ngày 27 tháng 02 năm 2026...
(lần đầu: ...theo Kế hoạch số 71-KH/BCĐ ngày 27 tháng 02 năm 2026 của Ban Chỉ đạo về phát triển
khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số xã An Thới Đông về thực hiện
Nghị quyết số 57-NQ/TW trên địa bàn xã năm 2026)
```

---

### Quy tắc phân công trong văn bản do UBND xã ban hành

Khi UBND xã ban hành kế hoạch, công văn, quyết định... toàn bộ việc phân công, giao nhiệm vụ phải tuân theo phân cấp sau:

#### Nhóm 1 — Đơn vị trực thuộc UBND xã: GIAO và CHỦ TRÌ

Các đơn vị này do UBND xã quản lý trực tiếp → dùng từ **"giao"**, **"chủ trì"**, **"triển khai"**, **"chỉ đạo thực hiện"**:

| Loại | Đơn vị cụ thể |
|---|---|
| Cơ quan chuyên môn | Văn phòng HĐND và UBND; Phòng Văn hóa - Xã hội; Phòng Kinh tế |
| Đơn vị sự nghiệp | Trung tâm PVHCC; Trung tâm Cung ứng DVC; Trạm Y tế xã |
| Trường học | 10 trường học trên địa bàn (Mầm non, Tiểu học, THCS) |
| Lực lượng khác | Công an xã |
| Cấp ấp | Trưởng các ấp; Tổ CNSCĐ 12 ấp *(nòng cốt: Trưởng ấp và Đoàn Thanh niên)* |

**Ví dụ dùng đúng:**
> "Phòng Văn hóa - Xã hội **chủ trì** tham mưu..."
> "Trưởng các ấp **phối hợp** Tổ Công nghệ số cộng đồng **triển khai thực hiện**..."

#### Nhóm 2 — UBMTTQ và các tổ chức CT-XH: ĐỀ NGHỊ PHỐI HỢP

UBMTTQ và các tổ chức chính trị - xã hội (Xã đoàn, Hội Phụ nữ, Hội Cựu chiến binh, Hội Nông dân...) hoạt động độc lập theo điều lệ riêng — UBND xã không có thẩm quyền chỉ đạo trực tiếp → **chỉ dùng "đề nghị phối hợp"**.

**Dùng đúng:**
> "**Đề nghị** Ủy ban Mặt trận Tổ quốc Việt Nam xã và các tổ chức Chính trị - Xã hội **phối hợp** tuyên truyền, vận động..."

**KHÔNG dùng:**
> ~~"Giao UBMTTQ triển khai..."~~  ~~"UBMTTQ chủ trì..."~~

#### Sơ đồ phân cấp

```
UBND xã ban hành văn bản
    │
    ├── GIAO / CHỈ ĐẠO (trực thuộc UBND xã)
    │   ├── Phòng VH-XH / Phòng Kinh tế / VP HĐND-UBND
    │   ├── TT PVHCC / TT CUDVC / Trạm Y tế
    │   ├── Công an xã / 10 trường học
    │   └── Trưởng 12 ấp / Tổ CNSCĐ 12 ấp
    │
    └── ĐỀ NGHỊ PHỐI HỢP (độc lập, theo điều lệ)
        └── UBMTTQ / Xã đoàn / Hội Phụ nữ / Hội CCB / Hội Nông dân...
```

#### Lưu ý về Trưởng ấp và Tổ CNSCĐ

- Trưởng ấp được UBND xã công nhận → thuộc nhóm được **giao việc**
- Tổ CNSCĐ do Trưởng ấp điều phối, lực lượng **nòng cốt là Đoàn Thanh niên**
- Ghi trong văn bản: *"Trưởng các ấp chỉ đạo Tổ Công nghệ số cộng đồng..."*
  hoặc *"Tổ Công nghệ số cộng đồng (nòng cốt Trưởng ấp và Đoàn Thanh niên) thực hiện..."*

---

- Dùng từ **chỉ đạo, điều hành** (không dùng "lãnh đạo") đối với các cơ quan chuyên môn
- Dùng từ **đề nghị phối hợp** đối với UBMTTQ và các tổ chức chính trị – xã hội

### Văn bản do Đảng ủy xã ban hành
- Dùng từ **lãnh đạo, định hướng** đối với UBND xã, UBMTTQ, các tổ chức chính trị – xã hội

### Lĩnh vực phụ trách của các phòng ban UBND xã

| Đơn vị | Lĩnh vực phụ trách |
|---|---|
| Phòng Văn hóa – Xã hội | Nội vụ; Giáo dục và đào tạo; Văn hóa; Khoa học, công nghệ và thông tin; CĐS; Lao động – TBXH; Y tế |
| Phòng Kinh tế | Tài chính – Kế hoạch; Đầu tư công; Thống kê; Kinh doanh; Nông nghiệp; Xây dựng; Môi trường |
| Văn phòng HĐND và UBND | Tư pháp và đối ngoại |

---

## DANH MỤC VIẾT TẮT

### Khi soạn văn bản chính thức — dùng tên đầy đủ

| Viết tắt (trao đổi) | Tên đầy đủ dùng trong văn bản |
|---|---|
| BCĐĐU | Ban Chỉ đạo về phát triển Khoa học, Công nghệ, Đổi mới sáng tạo và Chuyển đổi số Đảng ủy xã |
| BCĐUB | Ban Chỉ đạo về phát triển Khoa học, Công nghệ, Đổi mới sáng tạo và Chuyển đổi số Ủy ban nhân dân xã |
| VPĐU | Văn phòng Đảng ủy |
| CKS | Chữ ký số |
| CCHC | Cải cách hành chính |
| HTTT1C | Hệ thống thông tin Giải quyết thủ tục hành chính |
| KHCN | Khoa học, công nghệ |
| ĐMST | Đổi mới sáng tạo |
| KHCN3 | Khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số |
| KHCN4 | Khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số và Đề án 06 |
| KHCN5 | Khoa học, công nghệ, đổi mới sáng tạo, chuyển đổi số, Đề án 06 và cải cách hành chính |
| SKHCN | Sở Khoa học và Công nghệ |
| MTTQ | Ủy ban Mặt trận Tổ quốc Việt Nam xã |
| CBCC | Cán bộ, công chức |
| CBCCVC | Cán bộ, công chức, viên chức |
| CBCC4 | Cán bộ, công chức, viên chức và người lao động |
| DNVVN | Doanh nghiệp vừa và nhỏ |
| FXDK | Phường, xã đặc khu |

### Hashtag và ký hiệu nội dung (dùng khi trao đổi, không dùng trong văn bản)

| Ký hiệu | Ý nghĩa |
|---|---|
| [VideoClip] | Loại nội dung là Video Clip |
| [TinTuc] | Loại nội dung là tin tức, bài viết |
| #ATTT | Hashtag về An toàn thông tin và an ninh mạng |
| #BDHVS | Hashtag về Bình dân học vụ số |

---

### Quy tắc viết tắt trong bảng phân công nhiệm vụ

**KHÔNG được viết tắt** các từ thông thường trong cột "Tên nhiệm vụ", "Kết quả/Sản phẩm":

| Viết tắt SAI | Viết đầy đủ ĐÚNG |
|---|---|
| CB-CC | cán bộ, công chức |
| CBCCVC | cán bộ, công chức, viên chức |
| HTX | hợp tác xã |
| SXKD | sản xuất kinh doanh |
| NTTS | nuôi trồng thủy sản |
| ATTP | an toàn thực phẩm |
| ANTT | an ninh trật tự |
| DN | doanh nghiệp |
| DV số / DVCTT | dịch vụ số / dịch vụ công trực tuyến |
| TTHC | thủ tục hành chính |
| TMĐT | thương mại điện tử |
| CSDL | cơ sở dữ liệu |
| KH&CN | khoa học và công nghệ |
| CNTT | công nghệ thông tin |
| HC | hành chính |
| SX | sản xuất |
| KD | kinh doanh |
| LQ (các đơn vị LQ) | các đơn vị liên quan |

**ĐƯỢC viết tắt** (theo danh mục cơ quan đã có):
- Tên cơ quan: `Phòng VH-XH`, `TT PVHCC`, `TT CUDVC`, `VP HĐND-UBND`, `Tổ CNSCĐ 12 ấp`, `UBMTTQ`...
- Ký hiệu văn bản: `QĐ 82-QĐ/ĐU`, `QĐ 4585/QĐ-BKHCN`, `QĐ 3496/QĐ-UBND` (chỉ loại + số hiệu, không cần ngày và trích yếu)
- Chỉ số đo lường: `DTI`, `VNeID`, `AI`, `IoT`, `STEM/STEAM`
- Phong trào/chương trình đã thành tên riêng: `Đề án 06`

**Cột Ghi chú:** Nếu dùng để dẫn chiếu văn bản — chỉ ghi ký hiệu ngắn: `QĐ 82-QĐ/ĐU`, không ghi ngày và trích yếu.

---

### Quy tắc dấu gạch ngang trong đoạn văn bản

**KHÔNG dùng dấu gạch ngang dài** (en-dash `–`, em-dash `—`) giữa các từ hoặc số trong câu văn.

**DÙNG dấu gạch ngắn có dấu cách** ở cả 2 bên:

| Sai | Đúng |
|---|---|
| `giai đoạn 2026–2030` | `giai đoạn 2026 - 2030` |
| `kinh tế–xã hội` | `kinh tế - xã hội` |
| `Độc lập–Tự do–Hạnh phúc` | `Độc lập - Tự do - Hạnh phúc` |

> **Ngoại lệ:** Dấu gạch dài chỉ dùng ở đầu dòng liệt kê (gạch đầu dòng `- nội dung`), không dùng giữa câu.

---

### Quy tắc giao việc cho UBMTTQ và các tổ chức CT-XH trong phần Tổ chức thực hiện

Trong phần **III. Tổ chức thực hiện** (hoặc các phần phân công, giao việc tương đương), khi đề cập đến Ủy ban Mặt trận Tổ quốc và các tổ chức chính trị - xã hội:

**KHÔNG dùng:** "Giao...", "Chỉ đạo...", "Yêu cầu...", "Triển khai..."
**PHẢI dùng:** "Đề nghị phối hợp...", "Phối hợp...", "Đề nghị..."

**Ví dụ đúng:**
> "Đề nghị Ủy ban Mặt trận Tổ quốc Việt Nam xã và các tổ chức chính trị - xã hội phối hợp tuyên truyền, vận động..."

**Ví dụ sai:**
> ~~"Giao Ủy ban Mặt trận Tổ quốc triển khai..."~~

> Quy tắc này áp dụng cho mọi loại văn bản UBND xã ban hành (kế hoạch, công văn, quyết định...) vì UBMTTQ và các tổ chức CT-XH hoạt động độc lập theo điều lệ riêng.
