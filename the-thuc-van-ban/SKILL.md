---
name: "the-thuc-van-ban"
description: "Định dạng, thể thức, code docx-js cho văn bản hành chính xã An Thới Đông.\n"
---


> **META** · cap_nhat: 2026-10-07 · nguon_su_that: Nghị định 30/2020/NĐ-CP về công tác văn thư · ra_soat_lai: 2027-04-07 · rui_ro: trung

> **Đọc tối thiểu:** SKILL.md này + `quy-tac-chung/SKILL.md` (phần cốt lõi). Skill này tự đủ — chỉ mở các file `references/...` khi đến bước cụ thể (xem mục lục bên dưới).

# Thể thức văn bản hành chính — Xã An Thới Đông

---

## MỤC LỤC

| File | Nội dung | Khi nào đọc |
|---|---|---|
| `references/cai-dat-trang.md` | Trang A4, font, lề, spacing **theo từng loại VB**, heading | Mọi loại văn bản |
| `references/tieu-de.md` | Quốc hiệu, tiêu đề 2 cột, dấu gạch, trích yếu | Tạo phần đầu văn bản |
| `references/noi-dung.md` | Căn cứ, heading, văn bản thân, đoạn kết | Soạn thảo nội dung |
| `references/noi-nhan-chu-ky.md` | Nơi nhận, chữ ký theo từng loại cơ quan | Tạo phần cuối văn bản |
| `references/phu-luc-bang.md` | Phụ lục, bảng phân công, size chữ, màu sắc | Tạo phụ lục, bảng |
| `references/dau-cau.md` | Dấu câu, ngoặc kép, gạch ngang, **số trang (footer vs header)** | Mọi loại văn bản |
| `references/loai-van-ban.md` | Đặc thù từng loại: KH, BC, CV, TTr, QĐ, TB | Khi soạn loại cụ thể |
| `references/code-docxjs.md` | Code mẫu docx-js hoàn chỉnh | Khi xuất file Word |
| `scripts/` | `kiem-tra-the-thuc.js` (đánh số), `kiem-tra-dinh-dang.py` (định dạng), `so-sanh-voi-ban-chot.py` (so với bản Hiếu hoàn thiện), `kiem-tra-ap-dung.js` (kiểm tra skill đã áp dụng đủ — chỉ chạy, không đọc) | Trước khi giao file |
| `templates/` | **Bộ template 7 loại VB** (CV/BC/KH/TTr/QĐ/TB/GM) — modular, sửa 1 chỗ cập nhật mọi mẫu | **Ưu tiên dùng** khi xuất văn bản |

---

## QUY TẮC MỚI 07/10/2026 (đã vào code — tra đúng chỗ, không tự nhớ)
1. **Nơi nhận VB do UBND**: 6 dòng cố định (Như trên / đơn vị yêu cầu → CT, các PCT UBND xã → cơ quan khác → Phòng VHXH → VP → Lưu: VT, VHXH-Hiếu) — `references/noi-nhan-chu-ky.md`.
2. **Dẫn chiếu văn bản = gắn link vào SỐ ký hiệu**: `[63](url)/KHPH-MTTQ-UBND` — `references/noi-dung.md`; thiếu link → code và script cảnh báo.
3. **Văn bản chỉ 1 cấp mục**: dùng `mucSo()` (số in đậm, chữ thường), không dùng Heading — `references/noi-dung.md`.
4. **Mở đầu báo cáo**: "Thực hiện <VB>;/." rồi đoạn riêng "UBND xã [An Thới Đông] báo cáo ..., cụ thể như sau:" — `moDauBaoCao()`.
5. **Dẫn chiếu VB**: lần đầu đủ (số, ngày, cơ quan, trích yếu), từ lần 2 chỉ số, ngày, cơ quan. **Tên xã**: gửi ngoài xã → "xã An Thới Đông", nội bộ → "xã" (chỉ trong thân VB) — `quy-tac-soan-thao.md` mục 1, 1b.

## ⚠️ SKILL NÀY LÀ NGUỒN DUY NHẤT VỀ THỂ THỨC — QUY TẮC BẮT BUỘC

Mọi thông số về **thể thức và kỹ thuật trình bày văn bản** (khổ giấy, lề,
font, cỡ chữ, giãn dòng, thụt đầu dòng, divider, số trang, bảng, phụ lục,
tiêu đề, chữ ký, nơi nhận...) CHỈ tồn tại ở skill này.

**Nghiêm cấm:**
- Ghi lại thông số định dạng ở bất kỳ skill/file nào khác (dù chỉ để "tham
  khảo nhanh") — dữ liệu trùng lặp sẽ lệch nhau và gây sai thể thức lặp lại.
- Tự viết code định dạng riêng khi xuất .docx — phải gọi hàm mẫu trong
  `templates/templates/all.js` (`mauBaoCao`, `mauCongVan`, `mauKeHoach`...).
- Sửa thể thức bằng cách patch riêng 1 file văn bản — phải sửa trong
  `templates/partials/` để áp dụng cho toàn hệ thống.

**Khi phát hiện sai thể thức:** sửa trong `templates/partials/` (code) VÀ
`references/` (tài liệu) cùng lúc, đảm bảo 2 nơi khớp nhau. Sau đó render
ảnh kiểm tra trước khi giao file.

**Các skill khác chỉ được TRỎ VỀ đây**, không được chép lại nội dung.

---

## QUY TẮC NỀN TẢNG CHUNG (mọi loại văn bản)

**Font:** Times New Roman — toàn bộ văn bản
**Cỡ chữ thân:** 14pt (28 half-points)
**Cỡ chữ tên cơ quan ban hành (cả 2 dòng):** 14pt — KHÔNG giảm cỡ để né vỡ dòng.
  Nếu tên cơ quan chủ quản dài, dùng dạng viết tắt (VD "UBND XÃ AN THỚI ĐÔNG").
**Thụt đầu dòng:** firstLine 720 DXA (~1.27cm)
**Dấu gạch ngang:** `-` (hyphen), KHÔNG dùng `–` (en-dash)
**Ngoặc kép:** `"` mở (\u201c) và `"` đóng (\u201d), KHÔNG dùng dấu thẳng
**Dấu divider:** ký tự `-` lặp lại, đậm, căn giữa — KHÔNG dùng border.
  Độ rộng và giãn cách sau: khối `DIVIDER` trong `templates/config/config.js`.
  Gọi `divider('coQuan'|'quocHieu'|'trichYeu')`, KHÔNG truyền số.
**Tên cơ quan khi đơn vị trực thuộc ban hành:** dòng 1 dùng dạng viết tắt
  `UBND XÃ AN THỚI ĐÔNG`. Truyền `donViBanHanh: 'VHXH'` để lấy từ config —
  KHÔNG gõ tay tên cơ quan.
**Số trang:** luôn ở **HEADER (đầu trang)**, căn giữa, trang 1 ẩn, reset về 1
  mỗi file. Áp dụng cho mọi loại văn bản, không ngoại lệ.

**Chữ ký nhiều bên:** cơ quan phát hành văn bản **LUÔN Ở CỘT PHẢI CUỐI, mọi
  tình huống** (1 người ký, 2 bên hay nhiều bên). Thứ tự cột từ trái sang phải:
  người lập (nếu có) → các bên ký nhận → cơ quan phát hành. Gọi
  `chuKyNhieuBen()` trong `partials/signature.js`, KHÔNG tự dựng bảng ký.
  Chi tiết: `references/noi-nhan-chu-ky.md`.
**Bảng dữ liệu (biên bản, phụ lục):** gọi `bangDuLieu()` trong
  `partials/bang-du-lieu.js`, thông số ở `BANG_DU_LIEU` (config) - khớp
  `references/phu-luc-bang.md`. KHÔNG tự viết code bảng.

### Phân cấp đề mục — QUY TẮC CỨNG

| Hàm | Cấp | Dùng cho |
|---|---|---|
| `h1("I. ...")` | Level 1 | Phần lớn nhất |
| `h2("1. ...")` | Level 2 | Mục |
| `h3("1.1. ...")` | Level 3 | Tiểu mục |
| `h4("a) ...")` | Level 4 | Mục nhỏ (nghiêng) |

Trong đề mục là các **đoạn văn liền mạch, thụt đầu dòng chuẩn**. TUYỆT ĐỐI
KHÔNG tự gõ tiền tố `1.` `2.` `a)` `-` vào đoạn văn — `bp()` sẽ **ném lỗi ngay
khi build** nếu phát hiện, nên lỗi không lọt ra file Word.

### Liệt kê danh sách — QUY TẮC CỨNG, dùng `lietKe()`

**Phân biệt trước khi viết** — đây là chỗ sai nhiều nhất:

| Tình huống | Cách viết |
|---|---|
| Nhiều đoạn văn độc lập trong cùng một đề mục | Từng đoạn `bp()`, **không đánh số, không gạch đầu dòng** |
| Có **câu dẫn mở danh sách** kết thúc bằng `:` | `lietKe({ cauDan, muc: [...] })` |

Nhiều ý cùng nằm dưới một đề mục **không tự động** thành danh sách liệt kê.
Chỉ khi có câu dẫn kiểu "…cụ thể như sau:", "…gồm:", "…còn các vướng mắc sau:"
thì phần đứng sau mới là liệt kê. `lietKe()` sẽ **ném lỗi** nếu thiếu câu dẫn
hoặc câu dẫn không kết thúc bằng dấu hai chấm.

Khi đã hợp lệ, hàm tự chọn định dạng theo số mục:

| Số mục | Định dạng tự áp |
|---|---|
| 1 | Viết tiếp thành đoạn văn thường, không đánh dấu |
| 2 | Gạch đầu dòng `-` |
| Từ 3 trở lên | Đánh số thứ tự `1.` `2.` `3.` |

Câu dẫn và mọi mục đều thụt đầu dòng 720 để mép trái thẳng hàng. Ngưỡng chuyển
sang đánh số nằm ở `LIET_KE.nguongDungSTT` trong `config.js`.

```javascript
h2("1. Thể chế"),
...lietKe({
  cauDan: "Sau khi Ban Chỉ đạo được kiện toàn, tại xã còn các vướng mắc sau:",
  muc: [
    "Chưa thành lập Tổ công tác hợp nhất các mảng về khoa học công nghệ...",
    "Cơ chế phối hợp, đầu mối chuyển đổi số chưa được xác lập...",
  ],
}),   // 2 mục → tự dùng gạch đầu dòng

h2("2. Nhận thức số"),
bp("Công tác phổ biến kiến thức về kỹ năng số... chưa phong phú, đa dạng."),
bp("Việc phổ biến kỹ năng số cho người dân... chưa thực hiện tốt."),
      // Không có câu dẫn → đoạn văn thường, KHÔNG đánh số
```

### Gạch đầu dòng và đánh số trong thân văn bản — QUY TẮC CỨNG

- **Đoạn văn thường trong các mục (I, II, III...): KHÔNG gạch đầu dòng,
  KHÔNG đánh số thứ tự 1./2./3.** Mỗi ý là một đoạn văn riêng, thụt đầu dòng
  chuẩn 720 DXA.
- **Chỉ dùng gạch đầu dòng khi liệt kê nhiều danh mục CÙNG LOẠI bên trong
  một ý cần liệt kê** (VD: liệt kê các mốc số liệu song song).
- Đánh số chỉ dùng cho **đề mục** (heading), không dùng cho đoạn văn nội dung.

---

## PHÂN BIỆT THEO LOẠI VĂN BẢN — ĐỌC TRƯỚC KHI CODE

| Thuộc tính | Báo cáo (BC) | Kế hoạch / QĐ / CV (KH) |
|---|---|---|
| Line spacing | **240** (dòng đơn) | **276** (~1.15 lines) |
| Lề phải | **900 DXA** | **1080 DXA** |
| Lề trên/dưới | **1000 DXA** | **1134 DXA** |
| Para spacing | **before=120, after=120** | **before=0, after=100** |
| Heading spacing | **120/120 đều** | **Bất đối xứng 160/80...** |
| Số trang | **HEADER** | **HEADER** |
| Nơi nhận dòng đơn vị | **11pt (22hp)** | **12pt (24hp)** |

> Chi tiết đầy đủ từng loại: `references/cai-dat-trang.md` và `references/loai-van-ban.md`

---

## BỘ TEMPLATE MODULAR — ƯU TIÊN DÙNG KHI XUẤT FILE

Thư mục `templates/` chứa bộ template docx-js đã xây sẵn cho 7 loại văn bản:
- **Công văn** (`mauCongVan`) — trích yếu nằm dưới ký hiệu, không có tên loại
- **Báo cáo** (`mauBaoCao`) — line spacing 240, số trang ở footer
- **Kế hoạch** (`mauKeHoach`) — có khối căn cứ
- **Tờ trình** (`mauToTrinh`) — Kính gửi + căn cứ (tùy chọn)
- **Quyết định** (`mauQuyetDinh`) — tự thêm căn cứ Luật 72/2025, dùng `Điều X.`
- **Thông báo** (`mauThongBao`), **Giấy mời** (`mauGiayMoi`)
- **Phiếu trình** (`mauPhieuTrinh`) — Kính gửi + khối nội dung **đóng khung**
  (bảng 1 hàng: nội dung + bảng ký lồng 2 cột: Chuyên viên / Ý kiến Trưởng Phòng)

- **Biên bản** (`mauBienBan`) — chữ ký nhiều bên (cơ quan phát hành luôn cột phải), thân bài nhận bảng từ `bangDuLieu()`

**Cơ chế "sửa 1 chỗ → cập nhật tất cả" — BẢNG TRA NHANH:**

| Muốn đổi | Sửa đúng 1 nơi |
|---|---|
| Cán bộ ký, tên cơ quan, quốc hiệu | `config/config.js` → `LANHDAO`, `COQUAN` |
| Đơn vị trực thuộc ban hành (Phòng...) | `config/config.js` → `DON_VI_TRUC_THUOC` |
| Độ dài / giãn cách dấu gạch divider | `config/config.js` → `DIVIDER` |
| Đậm-nghiêng, cấp outline của heading | `config/config.js` → `HEADING` |
| Giãn cách heading theo loại VB | `config/config.js` → `DINH_DANG[loai].headingSpacing` |
| Ngưỡng chuyển gạch đầu dòng → đánh số | `config/config.js` → `LIET_KE` |
| Lề, line spacing, vị trí số trang | `config/config.js` → `DINH_DANG` |
| Bề rộng bảng, phụ lục | `config/config.js` → `contentWidth(loai)` |
| Bảng tiêu đề, nơi nhận, chữ ký, khung Phiếu trình | `templates/partials/` |
| Nới bảng chữ ký nhiều bên, số dòng ký | `config/config.js` → `CHU_KY_NHIEU_BEN` |
| Màu, cỡ chữ, spacing, lề ô của bảng dữ liệu | `config/config.js` → `BANG_DU_LIEU` |

> Nếu phải sửa cùng một thông số ở **hơn một file** thì thiết kế đang sai —
> gom về `config.js` trước, rồi mới sửa.

Đọc `templates/README.md` để biết API đầy đủ và ví dụ sử dụng.

Khi người dùng yêu cầu xuất văn bản mới, ưu tiên import từ `templates/all.js`
thay vì viết code docx-js từ đầu:

```javascript
const { mauKeHoach } = require('./templates/templates/all');
const { Packer } = require('docx');
// ... fill params, pack, save
```


---

## KHI NÀO PHẢI MỞ SKILL NÀY — LIÊN KẾT SỬ DỤNG

Bắt buộc đọc skill này **trước khi viết bất kỳ dòng code docx-js nào**, trong
mọi tình huống sau:

| Tình huống | Việc cần làm |
|---|---|
| Soạn/xuất BC, CV, KH, TTr, QĐ, TB, GM, Phiếu trình | Gọi hàm mẫu trong `templates/templates/all.js` |
| Văn bản do Phòng/Trung tâm trực thuộc ban hành | Truyền `donViBanHanh: '<mã đơn vị>'` |
| Hiếu báo "sai thể thức", "lệch", "ngắn quá", "sai cỡ chữ" | Sửa `config.js` hoặc `partials/`, **không patch file văn bản** |
| Thêm loại văn bản mới | Khai `KY_HIEU` + `TEN_LOAI` + (nếu cần) `DINH_DANG`, rồi thêm mẫu vào `all.js` |
| Thêm bảng/phụ lục | Lấy bề rộng bằng `contentWidth(loai)` |
| Skill khác (`bao-cao-hanh-chinh`, `quan-ly-du-an`, `chung-thu-chu-ky-so`, `cdso-kehoach`, `sinh-hoat-chi-bo`, `xin-mail-cong-vu`, `nhan-su-danh-gia`) cần xuất file | Import từ đây, **không tự khai thông số** |

**Quy trình bắt buộc trước khi giao file cho Hiếu:**
1. Xuất `.docx` bằng hàm mẫu.
2. Chạy `node scripts/kiem-tra-the-thuc.js <file.docx>` — soi cấu trúc thật
   bên trong file, bắt lỗi đoạn văn tự đánh số / gạch đầu dòng sai chỗ.
2b. Chạy `python3 scripts/kiem-tra-dinh-dang.py <file.docx>` — bắt lỗi ĐỊNH DẠNG hay lặp lại:
   giãn dòng EXACT gây chồng dòng/cụt dấu, lề ngoài khoảng NĐ 30, divider `-` thay vì `—`,
   trích yếu CV in nghiêng/thiếu dấu chấm, "Kính gửi:" căn giữa. Có LỖI → sửa trong config/partials, xuất lại.
2c. `kiem-tra-the-thuc.js` tự soi cả **dòng kẻ ngăn cách footnote**: file nhận lại từ Google Docs có thể để mục `separator` / `continuationSeparator` trong `word/footnotes.xml` RỖNG → Word mất đường kẻ phía trên chú thích. Script báo LỖI; cách vá: thêm `<w:separator/>` vào mục `separator` và `<w:continuationSeparator/>` vào mục `continuationSeparator`, không đụng phần khác.
3. Chuyển PDF → render ảnh **≥150 dpi** (`pdftoppm -r 150`; 60-70 dpi KHÔNG đủ để thấy chồng dòng) →
   **xem bằng mắt**, tối thiểu: crop 30% đầu trang 1 (bảng tiêu đề + Kính gửi), trang có chữ ký, 1 trang phụ lục.
4. Đối chiếu: tên chủ quản, độ dài 3 divider, phân cấp đề mục, số trang ở đầu
   trang và trang 1 không có số.
5. Chỉ khi cả bước 2, 2b và 4 đều sạch mới gửi file.
6. Khi Hiếu gửi lại BẢN ĐÃ SỬA TAY: chạy `python3 scripts/so-sanh-voi-ban-chot.py <ban_xuat> <ban_chot>`;
   mỗi khác biệt có chủ đích phải được đưa vào `config/partials` + tài liệu `references/` NGAY trong phiên đó
   (file của Hiếu sửa qua Google Docs: bỏ qua nhiễu exact→auto, rsid). Không để lỗi lặp lại ở lần xuất sau.
7. Sau mỗi lần sửa skill này, chạy kiểm tra áp dụng từ thư mục tạm (KHÔNG chạy trong thư mục skill, KHÔNG đọc nội dung script):
   `mkdir -p /home/claude/kt && cd /home/claude/kt && NODE_PATH=/home/claude/.npm-global/lib/node_modules node /mnt/skills/plugins/the-thuc-van-ban/scripts/kiem-tra-ap-dung.js` — ra dòng "TẤT CẢ PASS" là đạt.

> Ngoại lệ đã biết: `sinh-hoat-chi-bo` dùng font **Arial** theo thể thức văn bản
> Đảng — khác biệt này ghi tại chính skill đó, không áp dụng ngược lại vào đây.
