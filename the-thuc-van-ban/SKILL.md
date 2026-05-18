---
name: the-thuc-van-ban
description: >
  Định dạng, thể thức, code docx-js cho văn bản hành chính xã An Thới Đông.

---

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
| `templates/` | **Bộ template 7 loại VB** (CV/BC/KH/TTr/QĐ/TB/GM) — modular, sửa 1 chỗ cập nhật mọi mẫu | **Ưu tiên dùng** khi xuất văn bản |

---

## QUY TẮC NỀN TẢNG CHUNG (mọi loại văn bản)

**Font:** Times New Roman — toàn bộ văn bản
**Cỡ chữ thân:** 14pt (28 half-points)
**Thụt đầu dòng:** firstLine 720 DXA (~1.27cm)
**Dấu gạch ngang:** `-` (hyphen), KHÔNG dùng `–` (en-dash)
**Ngoặc kép:** `"` mở (\u201c) và `"` đóng (\u201d), KHÔNG dùng dấu thẳng
**Dấu divider:** ký tự `-` lặp lại, size 8pt, căn giữa — KHÔNG dùng border

---

## PHÂN BIỆT THEO LOẠI VĂN BẢN — ĐỌC TRƯỚC KHI CODE

| Thuộc tính | Báo cáo (BC) | Kế hoạch / QĐ / CV (KH) |
|---|---|---|
| Line spacing | **240** (dòng đơn) | **276** (~1.15 lines) |
| Lề phải | **900 DXA** | **1080 DXA** |
| Lề trên/dưới | **1000 DXA** | **1134 DXA** |
| Para spacing | **before=120, after=120** | **before=0, after=100** |
| Heading spacing | **120/120 đều** | **Bất đối xứng 160/80...** |
| Số trang | **FOOTER** | **HEADER** |
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

**Cơ chế "sửa 1 chỗ → cập nhật tất cả":**
- Đổi cán bộ, cơ quan, quốc hiệu → sửa `templates/config/config.js`
- Đổi định dạng theo loại → sửa `DINH_DANG` trong cùng file
- Đổi bảng tiêu đề, nơi nhận, chữ ký → sửa file trong `templates/partials/`

Đọc `templates/README.md` để biết API đầy đủ và ví dụ sử dụng.

Khi người dùng yêu cầu xuất văn bản mới, ưu tiên import từ `templates/all.js`
thay vì viết code docx-js từ đầu:

```javascript
const { mauKeHoach } = require('./templates/templates/all');
const { Packer } = require('docx');
// ... fill params, pack, save
```
