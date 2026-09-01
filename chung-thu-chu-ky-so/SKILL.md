---
name: chung-thu-chu-ky-so
description: >
  Quy trình soạn công văn đề nghị liên quan chứng thư chữ ký số chuyên dùng
  công vụ (Ban Cơ yếu Chính phủ) cho UBND xã An Thới Đông và các đơn vị trực
  thuộc: cấp mới cho đơn vị (lần đầu), cấp mới cho cá nhân, gia hạn/thay đổi
  thông tin, thu hồi, khôi phục thiết bị lưu khóa bí mật. Kích hoạt khi Hiếu
  nói "chứng thư chữ ký số", "chữ ký số chuyên dùng công vụ", "xin cấp chữ ký
  số", "gia hạn chữ ký số", "thu hồi chữ ký số", "khôi phục USB token/thiết bị
  lưu khóa bí mật", hoặc nhắc "Mẫu số 01/02/04/05/06" của Ban Cơ yếu. Tuân
  theo 4 nguyên tắc vận hành trong tao-skill.
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: biểu mẫu Ban Cơ yếu Chính phủ · ra_soat_lai: 2026-12-01 · rui_ro: cao

# Skill: Chứng thư chữ ký số chuyên dùng công vụ

## BỐI CẢNH

**Căn cứ pháp lý:** Nghị định số 68/2024/NĐ-CP ngày 25/6/2024 của Chính phủ
quy định về chữ ký số chuyên dùng công vụ (hiệu lực từ 15/8/2024). Nghị định
ban hành kèm 9 biểu mẫu; skill này xử lý 4/9 mẫu Hiếu đang dùng: **Mẫu 01,
02, 04, 05, 06** (không xử lý Mẫu 03 - chứng thư cho thiết bị/dịch vụ/phần
mềm, và Mẫu 07 - thông báo bàn giao thiết bị, vì chưa có mẫu gốc).

**Nơi tiếp nhận (Kính gửi cố định mọi loại công văn):**
Cục Chứng thực số và Bảo mật thông tin, Ban Cơ yếu Chính phủ.

**"Cơ quan, tổ chức quản lý trực tiếp"** theo Nghị định 68 = cơ quan có tư
cách pháp nhân, có con dấu riêng, trực tiếp quản lý thuê bao. Đối với xã An
Thới Đông, đó là **Ủy ban nhân dân xã An Thới Đông** (không phải Phòng
VH-XH) → người ký công văn đề nghị là **người đứng đầu UBND xã**, không mặc
định là Trưởng phòng VH-XH Nguyễn Văn Chính như các văn bản nội bộ khác.

## HAI NHÓM QUY TRÌNH — phân biệt trước khi soạn

### Nhóm A — CẤP MỚI LẦN ĐẦU CHO ĐƠN VỊ (Mẫu 02)

Áp dụng khi **UBND xã An Thới Đông CHƯA từng có chứng thư chữ ký số chuyên
dùng công vụ** (trường hợp khởi tạo ban đầu). Vì đơn vị chưa có chữ ký số nên
công văn đề nghị **PHẢI ký tay + đóng dấu mực (dấu ướt)** của UBND xã, không
thể ký số (chưa có gì để ký số bằng).

- Người ký: **Chủ tịch UBND xã Trần Hoàng Vũ** (`nguoiKy: 'chuTich'`), ký
  tay và đóng dấu.
- Xuất file .docx → in ra → trình Chủ tịch ký, đóng dấu → gửi bản giấy (hoặc
  scan theo hướng dẫn của Cục nếu có).

### Nhóm B — CÁC TRƯỜNG HỢP CÒN LẠI (Mẫu 01, 04, 05, 06)

Áp dụng **SAU KHI** UBND xã (hoặc đơn vị trực thuộc có tư cách pháp nhân
riêng) **ĐÃ CÓ** chữ ký số. Các công văn này là đề xuất nội bộ do đơn vị tự
soạn, sẽ được **ký số** trực tiếp (không cần dấu ướt, không cần in giấy)
trước khi gửi qua trục liên thông văn bản hoặc kênh do Cục hướng dẫn.

- Cấp mới cho **cá nhân** cán bộ, công chức, viên chức (Mẫu 01)
- **Gia hạn / thay đổi thông tin** chứng thư đã cấp (Mẫu 04)
- **Thu hồi** chứng thư (Mẫu 05)
- **Khôi phục** thiết bị lưu khóa bí mật — USB token (Mẫu 06)

Người ký mặc định vẫn là Chủ tịch UBND xã (Trần Hoàng Vũ) nếu đề nghị đứng
tên UBND xã; nếu là đơn vị trực thuộc có con dấu/chữ ký số riêng (trường
học, đơn vị sự nghiệp...) → hỏi Hiếu ai là người đứng đầu ký.

---

## BƯỚC 1 — Xác định loại yêu cầu

Hỏi hoặc suy luận từ ngữ cảnh, chọn đúng 1 trong 5:
1. Cấp mới lần đầu cho đơn vị (Mẫu 02) — Nhóm A
2. Cấp mới cho cá nhân (Mẫu 01) — Nhóm B
3. Gia hạn / thay đổi thông tin (Mẫu 04) — Nhóm B
4. Thu hồi (Mẫu 05) — Nhóm B
5. Khôi phục thiết bị lưu khóa bí mật (Mẫu 06) — Nhóm B

## BƯỚC 2 — Thu thập thông tin

Đọc `data/mau-bieu-goc.md` để lấy đúng danh sách trường dữ liệu và bảng danh
sách của từng mẫu (đã trích từ file gốc Cục Cơ yếu cung cấp). Đọc
`data/thong-tin-mac-dinh.md` để lấy thông tin cố định của UBND xã/Hiếu.

**Nguyên tắc bắt buộc:** trường nào không có trong 2 file trên và Hiếu chưa
cung cấp trong hội thoại → để trống dạng `[cần bổ sung: tên trường]` và HỎI
Hiếu, **KHÔNG tự bịa** (đặc biệt: mã số thuế, mã quan hệ ngân sách, số định
danh cá nhân/CCCD, ngày cấp/nơi cấp CCCD, địa chỉ trụ sở, email công vụ đơn
vị — đây đều là dữ liệu chưa có sẵn trong hệ thống).

Nếu nhiều người/nhiều chứng thư trong 1 yêu cầu → thu thập dạng bảng (STT +
đúng cột theo mẫu tương ứng).

## BƯỚC 3 — Soạn công văn

Dùng template `mauCongVan` từ skill `the-thuc-van-ban`
(`templates/templates/all.js`), KHÔNG viết code docx-js từ đầu:

```javascript
const { mauCongVan } = require('/mnt/skills/user/the-thuc-van-ban/templates/templates/all');
const { taoBangDanhSach } = require('./scripts/tao-bang');
const { Packer } = require('docx');
const fs = require('fs');

const bangDanhSach = taoBangDanhSach(headers, rows); // xem scripts/tao-bang.js

const doc = mauCongVan({
  trichYeu: "đề nghị cấp chứng thư chữ ký số chuyên dùng công vụ cho cơ quan, tổ chức",
  kinhGui: ["Cục Chứng thực số và Bảo mật thông tin, Ban Cơ yếu Chính phủ"],
  noiDung: [
    "1. Thông tin người tiếp nhận thiết bị lưu khóa bí mật: ...",
    "2. Số lượng và danh sách đăng ký: 01, gồm:",
    bangDanhSach,   // Table object chèn thẳng, không phải string
  ],
  nguoiKy: 'chuTich',
  tenDonViSoan: 'VHXH',
});
Packer.toBuffer(doc).then(buf => fs.writeFileSync('/mnt/user-data/outputs/...docx', buf));
```

**Trích yếu theo từng loại** (điền đúng `trichYeu`, lấy nguyên văn từ mẫu
gốc để đúng thể thức hành chính):
| Loại | Trích yếu |
|---|---|
| Mẫu 02 | đề nghị cấp chứng thư chữ ký số chuyên dùng công vụ cho cơ quan, tổ chức |
| Mẫu 01 | đề nghị cấp chứng thư chữ ký số chuyên dùng công vụ cho cá nhân |
| Mẫu 04 | đề nghị gia hạn, thay đổi nội dung thông tin chứng thư chữ ký số chuyên dùng công vụ |
| Mẫu 05 | đề nghị thu hồi chứng thư chữ ký số chuyên dùng công vụ |
| Mẫu 06 | đề nghị khôi phục thiết bị lưu khóa bí mật |

**Nội dung (`noiDung`)** dựng theo đúng cấu trúc 2 mục của mẫu gốc (mục 1 =
thông tin người tiếp nhận/đầu mối phối hợp, mục 2 = bảng danh sách) — chi
tiết từng mục xem `data/mau-bieu-goc.md`. Riêng Mẫu 06 không có mục "người
tiếp nhận thiết bị" mà là "người phối hợp thực hiện khôi phục" — cấu trúc hơi
khác, đọc kỹ file gốc trước khi soạn.

**Bảng danh sách:** dùng `scripts/tao-bang.js` (`taoBangDanhSach(headers,
rows)`) để tạo Table đúng chuẩn docx-js (DXA width, ShadingType.CLEAR),
tránh viết lại từ đầu mỗi lần. Cột đúng theo từng mẫu — copy nguyên văn
header từ `data/mau-bieu-goc.md`, không tự đặt tên cột khác.

## BƯỚC 4 — Kiểm tra trước khi xuất (Definition of Done)

- [ ] Kính gửi đúng: "Cục Chứng thực số và Bảo mật thông tin, Ban Cơ yếu
      Chính phủ."
- [ ] Trích yếu đúng nguyên văn theo loại (bảng ở Bước 3)
- [ ] Nhóm A (Mẫu 02): `nguoiKy: 'chuTich'`, có ghi chú "ký tay + đóng dấu",
      KHÔNG ghi chú ký số
- [ ] Nhóm B (Mẫu 01/04/05/06): xác nhận với Hiếu người ký (UBND xã hay đơn
      vị trực thuộc), ghi chú văn bản sẽ ký số trước khi gửi
- [ ] Không còn trường nào bị bịa — mọi ô thiếu dữ liệu đều ở dạng
      `[cần bổ sung: ...]` và đã hỏi Hiếu
- [ ] Bảng danh sách đúng cột theo mẫu, không tự thêm/bớt cột
- [ ] Ghi chú cuối văn bản (nếu mẫu gốc có phần "Ghi chú") — cân nhắc giữ lại
      dưới dạng ghi chú nhỏ cuối công văn nếu liên quan trực tiếp (VD: quy
      ước SIM PKI ở Mẫu 01) để người ký/Cục dễ đối chiếu

## BƯỚC 5 — Xuất file & báo cáo

- Tên file gợi ý: `CV-de-nghi-<loai>-chung-thu-cks-<ten-doi-tuong>-<ngayxuat>.docx`
  (VD: `CV-de-nghi-cap-moi-chungthu-donvi-UBNDxaAnThoiDong.docx`)
- Sau khi xuất, báo Hiếu:
  1. File đã tạo, thuộc Nhóm A hay B
  2. Nhóm A → nhắc trình Chủ tịch ký tay + đóng dấu trước khi gửi
  3. Nhóm B → nhắc ký số trước khi gửi qua kênh phù hợp
  4. Liệt kê rõ những trường Hiếu cần tự bổ sung/kiểm tra (MST, mã QHNS,
     CCCD, địa chỉ, email công vụ...)

## LƯU Ý ĐẶC BIỆT

- Không tự bịa số hiệu văn bản, mã số thuế, mã quan hệ ngân sách, số định
  danh cá nhân, ngày/nơi cấp CCCD.
- Người ký Mẫu 02 luôn là **người đứng đầu UBND xã** (đại diện pháp nhân, con
  dấu), không phải Trưởng phòng VH-XH — dù đơn vị soạn thảo/tham mưu vẫn là
  Phòng VH-XH.
- Không tự ý đổi thứ tự hay tên cột trong bảng danh sách so với mẫu gốc.
- Nếu Hiếu chưa xác định rõ Nhóm A hay B (VD: không chắc UBND xã đã có chữ ký
  số hay chưa) → hỏi trước khi soạn, vì ảnh hưởng trực tiếp cách ký (tay/dấu
  hay ký số).
