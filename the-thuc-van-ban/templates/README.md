# Bộ mẫu văn bản docx-js — 7 loại văn bản hành chính

> **META** · cap_nhat: 2026-10-06 · nguon_su_that: quy ước thể thức văn bản hành chính của xã An Thới Đông · ra_soat_lai: 2027-10-06 · rui_ro: thap (bổ sung META 01/9/2026, nội dung CHƯA rà)

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
| `mauBienBan(opts)` | Biên bản (chữ ký nhiều bên) | Số: .../BB-VHXH |

## Biên bản - `mauBienBan`

Chữ ký nhiều bên: **cơ quan phát hành luôn ở cột phải cuối**, hàm không cho đảo cột.

```javascript
const { mauBienBan } = require('./templates/all');
const { bangDuLieu } = require('./partials/bang-du-lieu');
const { h1 } = require('./partials/base');

mauBienBan({
  ngay: '26', thang: '05', nam: '2026',
  trichYeu: 'Bàn giao thiết bị công nghệ thông tin',
  canCu: ['Căn cứ ...'],
  noiDung: ['Đoạn mở đầu...', h1('I. BÊN GIAO'), 'Phòng Văn hóa - Xã hội.',
            bangDuLieu({ tieuDe: [...], tiLeCot: [...], hang: [[...]] })],
  nguoiLap: { chucDanh: 'CHUYÊN VIÊN', hoTen: 'Phan Trung Hiếu' },      // cột đầu (trái)
  cacBenKy: [{ dong: ['ĐẠI DIỆN BÊN NHẬN', 'TRƯỞNG PHÒNG'], hoTen: '...' }], // cột giữa
  nguoiKy: 'truongPhongVHXH',                                           // cột cuối (phải) = cơ quan phát hành
});
```

Đoạn kết cuối thân bài dùng `bp(text, { keepNext: true, before: 120, after: 200 })` để khối chữ ký không tách khỏi đoạn kết; thêm `pageBreak: true` nếu muốn đoạn kết và chữ ký nằm riêng một trang.

Tham số bổ sung của `mauBienBan`:
- `tieuDeDayDu`: tiêu đề 1 dòng in hoa (vd Mẫu 02/TSC-BBGN: "BIÊN BẢN BÀN GIAO, TIẾP NHẬN TÀI SẢN CÔNG"), thay cho "BIÊN BẢN" + trích yếu.
- `dongPhuKy`: dòng nghiêng dưới chức danh cơ quan phát hành, vd "(Ký, ghi rõ họ tên, đóng dấu)". Trong `cacBenKy[].dong` mỗi dòng là chuỗi (in đậm) hoặc `{ text, bold, italic }`.
- `phuLuc`: các phần tử đặt sau khối chữ ký (phần tử đầu dùng `pageBreak` để sang trang mới).
- `h1/h2/h3/h4(text, { pageBreak: true })`: đề mục bắt đầu ở trang mới.
- `bangDuLieu({ ..., coMau: false, hangCuoiDam: true, noiRong: 500 })`: bỏ tô màu tiêu đề, in đậm hàng Tổng cộng, nới bảng ra ngoài lề mỗi bên (DXA) khi nhiều cột số.

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


---

## Cập nhật 06/10/2026 (chốt cùng Hiếu theo bản công văn KH 63 hoàn thiện)

- `sp0` và `divider()` dùng dòng đơn AUTO (bỏ EXACT) — hết chữ chồng dòng/cụt dấu.
- `DIVIDER`: ký tự `—` liền nét, độ dài 19 (cơ quan) / 43 (quốc hiệu) / 40 (trích yếu).
- `headerTable`: dòng 1 cơ quan ĐẬM khi UBND xã ban hành; trích yếu CV kiểu chữ đứng + tự thêm dấu chấm.
- `kinhGuiBlock`: bố cục theo `KINH_GUI` (căn trái, thụt 4,5cm / 6,5cm, `;` và `.`).
- `partials/phu-luc.js` → `phuLuc({ tenPhuLuc, kemTheo, tieuDe, tiLeCot, canCot, hang, huong })`: tự chọn khổ NGANG/DỌC theo `PHU_LUC`, số trang phụ lục RESET về 1 (`resetSoTrang`); `hang` hỗ trợ dòng nhóm `{ nhom: '...' }`. Dùng: `mauCongVan({ ..., phuLuc: phuLuc({...}) })`.
- `bangDuLieu`: thêm `rongTong`, dòng nhóm; `BANG_DU_LIEU.fillNhom`.
- `NGHI_DINH_30` (config): khoảng lề/giãn dòng cho phép — `scripts/kiem-tra-dinh-dang.py` dùng để kiểm tra.
