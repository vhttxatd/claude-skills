# Bộ mẫu văn bản docx-js — 7 loại văn bản hành chính

## Cách dùng nhanh

```javascript
const { mauCongVan, mauBaoCao, mauKeHoach } = require('./templates/all');
const { Packer } = require('docx');
const fs = require('fs');

// Công văn tối giản (dùng giá trị mặc định)
const doc = mauCongVan();
Packer.toBuffer(doc).then(buf => fs.writeFileSync('cv.docx', buf));

// Công văn đầy đủ tham số
const doc2 = mauCongVan({
  so: "125",
  nam: "2026",
  ngay: "15",
  thang: "4",
  trichYeu: "phối hợp tổ chức lớp tập huấn CĐS",
  kinhGui: ["Sở Khoa học và Công nghệ Thành phố Hồ Chí Minh"],
  noiDung: [
    "Thực hiện Kế hoạch số 100/KH-UBND ngày 10/01/2026 của UBND xã về...",
    "Ủy ban nhân dân xã An Thới Đông kính đề nghị Sở Khoa học và Công nghệ...",
    "Trân trọng./."
  ],
  nguoiKy: 'chuTich',  // chuTich | pctKinhTe | pctVHXH | truongPhongVHXH
  noiNhan: [
    "- Như trên;",
    "- Chủ tịch, các PCT UBND xã;",
  ],
  tenDonViSoan: "VHXH",
});
```

## 7 hàm có sẵn

| Hàm | Loại VB | Ký hiệu tự sinh |
|---|---|---|
| `mauCongVan(opts)` | Công văn | Số: .../UBND |
| `mauBaoCao(opts)` | Báo cáo | Số: .../BC-UBND |
| `mauKeHoach(opts)` | Kế hoạch | Số: .../KH-UBND |
| `mauToTrinh(opts)` | Tờ trình | Số: .../TTr-UBND |
| `mauQuyetDinh(opts)` | Quyết định | Số: .../QĐ-UBND |
| `mauThongBao(opts)` | Thông báo | Số: .../TB-UBND |
| `mauGiayMoi(opts)` | Giấy mời | Số: .../GM-UBND |

## Tham số chung (áp dụng mọi hàm)

| Param | Kiểu | Mặc định | Mô tả |
|---|---|---|---|
| `so` | string | `""` | Số văn bản |
| `nam` | string | `"2026"` | Năm |
| `ngay` | string | `""` | Ngày |
| `thang` | string | `""` | Tháng |
| `trichYeu` | string | placeholder | Trích yếu |
| `nguoiKy` | enum | `'chuTich'` | `chuTich` / `pctKinhTe` / `pctVHXH` / `truongPhongVHXH` |
| `noiNhan` | string[] | từ config | Danh sách nơi nhận |
| `tenDonViSoan` | string | `"VHXH"` | Ký hiệu đơn vị - tự thay vào "Lưu: VT, XXX" |

## Tham số đặc thù theo loại

- **CV, TTr:** `kinhGui: string[]`
- **KH, TTr, QĐ:** `canCu: string[]` (QĐ tự thêm căn cứ Luật 72/2025)
- **CV, BC, KH, TB:** `noiDung: (string | Paragraph)[]`
- **QĐ:** `dsDieu: [{so, noiDung}, ...]`
- **GM:** `nguoiDuoc, thoiGian, diaDiem, noiDungHop`

## Sửa toàn cục

- **Cán bộ, cơ quan, quốc hiệu:** sửa `config/config.js`
- **Định dạng theo loại** (line spacing, margin, vị trí số trang): sửa `DINH_DANG` trong `config.js`
- **Bảng tiêu đề:** sửa `partials/header-table.js`
- **Nơi nhận, chữ ký:** sửa `partials/signature.js`
- **Số trang từ trang 2:** sửa `partials/page-setup.js` (dùng `titlePage: true`)

## Chạy xuất 7 mẫu

```bash
cd templates && node index.js
```

Output trong thư mục `output/`.

## Kiến trúc

```
config/config.js          ← biến trung tâm (sửa 1 chỗ, cập nhật mọi mẫu)
partials/
  base.js                 ← r, bp, cellP, emp, divider, dieu, h1/h2/h3
  header-table.js         ← quốc hiệu + cơ quan + số ký hiệu
  title-block.js          ← TÊN LOẠI VB + trích yếu (không dùng cho CV)
  can-cu.js               ← khối căn cứ pháp lý
  kinh-gui.js             ← khối "Kính gửi"
  signature.js            ← nơi nhận + chữ ký
  page-setup.js           ← số trang từ trang 2, margin theo loại
  document-builder.js     ← factory Document
templates/all.js          ← 7 mẫu tổ hợp từ partials
```
