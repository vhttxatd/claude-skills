---
name: sinh-hoat-chi-bo
description: >
  Quy trình lên lịch + xuất Thông báo sinh hoạt định kỳ/đột xuất của Chi bộ
  Phòng Văn hóa - Xã hội, xã An Thới Đông. Kích hoạt khi Hiếu nói "tạo thông
  báo sinh hoạt chi bộ", "lịch sinh hoạt chi bộ tháng...", "phân công chi bộ
  tháng...", hoặc khi cần tra cứu/ghi lịch họp chi bộ trong Notion
  (Tbl_PhanCongCBo).
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: Notion Tbl_PhanCongCBo + Điều lệ Đảng · ra_soat_lai: 2027-03-01 · rui_ro: trung

> **Nhắc kỷ luật vận hành:** Nếu phiên chat này CHƯA đọc `quy-tac-chung/data/ky-luat-van-hanh.md` (5 quy tắc tiết kiệm token & bàn giao), đọc trước khi tiếp tục — quy tắc đó áp dụng bất kể skill nào đang chạy.

# Sinh hoạt Chi bộ Phòng VHXH — lên lịch & xuất thông báo

Tuân theo 4 nguyên tắc vận hành trong `tao-skill`. Đặc biệt nguyên tắc 1
(Nghĩ trước khi làm): nếu dữ liệu Notion không đủ để xác định người phân
công hoặc số văn bản tiếp theo, PHẢI hỏi lại, không tự bịa.

---

## BỐI CẢNH — nơi lưu trữ

Trang gốc: **"🔖 Họp Chi bộ Phòng VHXH"**
(`https://app.notion.com/p/2a04aaf2621380d8b3a8c44e9aaeb276`) — 1 task trong
**TodoListATĐ**, chứa 2 database con:

| Database | data-source URL | Vai trò |
|---|---|---|
| **Tbl_PhanCongCBo** | `collection://2a04aaf2-6213-8149-9fbe-000b083d0d99` | **Bảng lịch + phân công xoay vòng** — mỗi dòng = 1 kỳ họp. Đây là nguồn dữ liệu chính của skill này. |
| Tbl_VBCBo | `collection://2a04aaf2-6213-80bb-884e-000becb25f59` | Văn bản liên quan chi bộ (công văn Ban XDĐ gửi tài liệu sinh hoạt...) — KHÔNG phải nơi lưu thông báo họp, chỉ tra cứu khi cần. |

### Schema Tbl_PhanCongCBo
`Kỳ Họp` (title, mã `YYMMDD_TMM`) · `Ngày Họp` (date) · `Ký hiệu VB` (text,
vd "16-TB/CB") · `Trích yếu` (text) · `Thời Sự` / `SHTP` / `Phê bình`
(select, tên người phụ trách — đây là 3 mục **xoay vòng**, tương ứng mục 1,
5, 7 trong thông báo).

---

## QUY LUẬT XOAY VÒNG (đã suy ra từ lịch sử thực tế 06/2025 → 08/2026)

Danh sách quay vòng cố định gồm **7 người**, xoay theo đúng thứ tự này mỗi
tháng cho vai trò "Thời Sự" (mục 1):

```
K. Anh → Hiếu → K. Liên → Thúy → Bích → Như → Chính → (quay lại K. Anh)
```

Quy luật liên hệ giữa 3 cột (đã kiểm chứng khớp 100% với 10 kỳ họp gần nhất):

- **Thời Sự(tháng N+1) = SHTP(tháng N) = Phê bình(tháng N)**
  (người sẽ làm "Thời Sự" tháng sau chính là người làm SHTP+Phê bình tháng này)
- **SHTP(tháng N) = Phê bình(tháng N)** — luôn cùng 1 người
- Suy ra: **SHTP(tháng N) = người kế tiếp trong vòng quay sau Thời Sự(tháng N)**

→ Khi cần tạo kỳ họp MỚI (tháng N+1) mà Notion CHƯA có dòng:
1. `Thời Sự(N+1)` = SHTP/Phê bình của dòng gần nhất đã có (tháng N).
2. `SHTP(N+1) = Phê bình(N+1)` = người kế tiếp sau `Thời Sự(N+1)` trong vòng
   quay 7 người ở trên.
3. Mục 11 (phần "Phân công nhiệm vụ" cuối thông báo, dự kiến kỳ SAU) =
   người kế tiếp sau `SHTP(N+1)` trong vòng quay — tức `Thời Sự(N+2)`.

**LUÔN kiểm tra Notion Tbl_PhanCongCBo trước** — nếu dòng của kỳ họp đã tồn
tại sẵn (Hiếu có thói quen tạo trước), DÙNG THẲNG dữ liệu có sẵn, không tính
lại. Chỉ tự đề xuất khi Notion chưa có dòng tương ứng, và luôn nói rõ đây là
đề xuất để Hiếu xác nhận trước khi ghi vào Notion (không tự ý ghi khi tự suy
luận — nhưng KHÔNG cần hỏi lại nếu chỉ dùng để xuất file thông báo do Hiếu
đã yêu cầu "cứ làm khi đủ thông tin").

### Bảng ánh xạ tên hiển thị trong văn bản (Notion → chữ trong thông báo)

| Giá trị Notion | Hiển thị trong thông báo |
|---|---|
| K. Anh | Kim Anh |
| Hiếu | Hiếu |
| K. Liên | Liên |
| Thúy | Thúy |
| Bích | Bích |
| Như | Như |
| Chính / A. Chính | Chính |

---

## PHẦN CỐ ĐỊNH — không xoay vòng, giữ nguyên mỗi tháng

| Mục | Nội dung | Người |
|---|---|---|
| 2 | Phổ biến, quán triệt các văn bản | Chính |
| 3 | Đánh giá tình hình tư tưởng đảng viên, quần chúng | Chính |
| 4 | Đánh giá học tập và làm theo tư tưởng HCM (KL 21-KL/TW) | Kim Anh |
| 6 | Đánh giá kết quả nhiệm vụ chính trị + xây dựng chi bộ 6 tháng | Chính |
| 8 | Công tác quản lý đảng viên | Như |
| 9 | Giải quyết ý kiến, kiến nghị đảng viên | Chính |
| 10 | Các nội dung khác | Như |
| 11 | Kết thúc sinh hoạt (chủ trì kết luận) | Chính (Bí thư) |
| — | Người chủ trì cuộc họp | Nguyễn Văn Chính - Bí thư chi bộ |
| — | Địa điểm | Phòng họp - Phòng Văn hóa - Xã hội |
| — | Chữ ký (T/M CHI BỘ - BÍ THƯ) | Nguyễn Văn Chính |

Nếu tương lai các mục cố định này đổi người (đổi bí thư, đổi phân công),
cập nhật trực tiếp bảng trên — không cần tạo skill mới.

---

## QUY TRÌNH TẠO THÔNG BÁO — làm ngay, không hỏi nếu đủ dữ liệu

**Bước 1 — Xác định kỳ họp cần tạo.** Hiếu nói tháng nào → xác định mã
`Kỳ Họp` dự kiến (`YYMMDD_TMM`).

**Bước 2 — Truy vấn Tbl_PhanCongCBo** (Notion:notion-query-data-sources,
SQL `SELECT * FROM "collection://2a04aaf2-6213-8149-9fbe-000b083d0d99"
ORDER BY datetime("date:Ngày Họp:start") DESC LIMIT 5`):
- Nếu dòng của kỳ họp cần tạo **đã tồn tại và đủ dữ liệu** → dùng thẳng,
  sang Bước 4.
- Nếu **chưa có** → áp dụng Quy luật xoay vòng ở trên để tự đề xuất
  `Thời Sự`, `SHTP`, `Phê bình`, và số văn bản tiếp theo (số dòng gần nhất
  + 1, giữ nguyên hậu tố `-TB/CB`). Nêu rõ đây là đề xuất, hỏi Hiếu xác
  nhận TRƯỚC KHI ghi dòng mới vào Notion — nhưng vẫn có thể xuất file nháp
  ngay để Hiếu xem trước.

**Bước 3 — Xác định ngày/giờ họp.**
- Ngày: lấy theo `Ngày Họp` đã có trong Notion nếu có; nếu chưa có, dùng
  ngày Hiếu chỉ định khi yêu cầu tạo.
- Giờ: mặc định **11 giờ 00**, trừ khi Notion đã lưu giờ khác hoặc Hiếu nêu
  giờ khác trong yêu cầu.

**Bước 4 — Sinh docx.** Dùng script
`/mnt/skills/user/sinh-hoat-chi-bo/scripts/generate.js`:

```bash
node scripts/generate.js params.json output.docx
```

`params.json` gồm các trường (xem chú thích đầy đủ trong đầu file
`generate.js`): `so, ngay, thang, nam, ngayHop, thangHop, namHop,
thangSinhHoat, namSinhHoat, gio, phut, thoiSu, shtp, pheBinh, previewNguoi,
biThu`. `thoiSu/shtp/pheBinh` dùng **tên hiển thị** theo bảng ánh xạ ở trên
(không dùng nguyên giá trị Notion "K. Anh"/"K. Liên").

`previewNguoi` (mục 11 - dự kiến kỳ họp SAU) = người kế tiếp sau `shtp`
trong vòng quay 7 người.

**Bước 5 — Đặt tên file:** `{YYMMDD}_TB{so}CBO_Thang_{MM}-{YYYY}.docx`
(vd: `260803_TB16CBO_Thang_08-2026.docx`), theo đúng quy ước file gốc Hiếu
đã dùng.

**Bước 6 — Kiểm tra hình ảnh trước khi giao** (bắt buộc theo skill `docx`):
convert PDF + `pdftoppm`, xem lại đúng thể thức (2 trang là bình thường,
khớp với file gốc tháng 7/2026).

**Bước 7 — Nếu dòng Notion cho kỳ họp này CHƯA có** (tức Bước 2 phải tự đề
xuất): sau khi Hiếu xác nhận số liệu đúng, ghi 1 dòng mới vào
Tbl_PhanCongCBo qua `Notion:notion-create-pages` (parent =
`data_source_id: 2a04aaf2-6213-8149-9fbe-000b083d0d99`), điền đủ `Kỳ Họp,
Ngày Họp, Ký hiệu VB, Trích yếu, Thời Sự, SHTP, Phê bình`.

---

## ĐỊNH DẠNG VĂN BẢN — LƯU Ý QUAN TRỌNG

Thông báo sinh hoạt chi bộ dùng **thể thức văn bản Đảng**, KHÁC với thể
thức UBND trong skill `the-thuc-van-ban`:
- Font **Arial** toàn văn bản (không phải Times New Roman).
- Tiêu đề 2 cột: trái = "ĐẢNG BỘ UỶ BAN NHÂN DÂN XÃ / CHI BỘ PHÒNG VĂN HÓA -
  XÃ HỘI"; phải = "ĐẢNG CỘNG SẢN VIỆT NAM" (có gạch chân) + ngày tháng in
  nghiêng.
- Ký hiệu: `Số-TB/CB` (không phải `/TB-UBND`).
- Chữ ký: "T/M CHI BỘ - BÍ THƯ" (không phải lãnh đạo UBND).

→ **KHÔNG dùng `mauThongBao` trong `the-thuc-van-ban/templates`** cho loại
văn bản này — luôn dùng script riêng `generate.js` của skill này.

---

## VIỆC KHÁC LIÊN QUAN (đột xuất)

Nếu Hiếu yêu cầu thông báo sinh hoạt **đột xuất** (không theo lịch định kỳ
hàng tháng), quy trình tương tự nhưng:
- Không áp dụng quy luật xoay vòng tự động — hỏi rõ ai phụ trách từng mục.
- Tiêu đề đổi "định kỳ tháng X năm Y" → "đột xuất" hoặc nội dung cụ thể
  Hiếu nêu.
- Vẫn ghi 1 dòng vào Tbl_PhanCongCBo để không phá vỡ chuỗi lịch sử phân
  công (nếu Hiếu đồng ý).
