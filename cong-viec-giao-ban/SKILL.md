---
name: cong-viec-giao-ban
description: >
  Danh sách công việc cho họp giao ban hàng tuần với lãnh đạo. Theo dõi tiến độ, cập nhật trạng thái, đồng bộ với các nội dung làm việc khác. CHỈ truy cập file dữ liệu khi người dùng gọi đúng trigger để tiết kiệm token.
---

# Công việc giao ban hàng tuần

> **Nguyên tắc tiết kiệm token:** File này chỉ là chỉ dẫn. Dữ liệu thực tế nằm ở `data/danh-sach.md` — chỉ đọc khi người dùng gọi đúng trigger.

---

## TRIGGER TRUY CẬP (BẮT BUỘC)

Chỉ mở file `data/danh-sach.md` khi người dùng gõ một trong các trigger sau:

| Trigger (mẫu) | Hành động |
|---|---|
| "mở/xem danh sách giao ban", "danh sách công việc", "xem việc tuần này" | Đọc file → hiển thị bảng |
| "thêm việc: [nội dung]", "có việc mới: [nội dung]" | Đọc file → thêm dòng → ghi lại |
| "cập nhật [mã việc / tên việc]: [nội dung]" | Đọc file → sửa dòng → ghi lại |
| "đánh dấu [mã việc] hoàn thành/đang làm/tạm hoãn" | Đọc file → đổi trạng thái → ghi lại |
| "xóa việc [mã việc]" | Đọc file → xóa dòng → ghi lại (HỎI XÁC NHẬN trước khi xóa) |
| "báo cáo giao ban tuần này", "soạn báo cáo giao ban" | Đọc file → tổng hợp theo nhóm trạng thái |
| "xem việc loại [số/tên]", "lọc loại..." | Đọc file → hiển thị chỉ những việc thuộc loại đó |
| "xem việc nhóm [số/tên]", "lọc nhóm..." | Đọc file → hiển thị chỉ những việc thuộc nhóm đó |
| "mở giao diện giao ban", "dashboard công việc" | Tạo file HTML standalone (xem mục GIAO DIỆN WEB) |

**KHÔNG tự ý mở file** khi người dùng không gọi trigger. Kể cả khi đang làm việc liên quan đến báo cáo, kế hoạch.

---

## ĐỒNG BỘ NGẦM (cần xin phép)

Khi đang xử lý tác vụ khác (soạn báo cáo, soạn kế hoạch, xuất file...) và phát hiện công việc đó có thể liên quan đến danh sách giao ban (ví dụ: vừa hoàn thành 1 báo cáo có trong danh sách, vừa nhận chỉ đạo mới), Claude **HỎI** người dùng:

> "Việc [...] có cần cập nhật vào danh sách giao ban không?"

→ Chỉ mở file sau khi người dùng đồng ý. KHÔNG tự mở.

---

## ĐỊNH DẠNG FILE `data/danh-sach.md`

Bảng Markdown 8 cột:

| Mã | Việc | Loại | Nhóm | Trạng thái | Deadline | Cập nhật gần nhất | Ghi chú |
|----|------|------|------|-----------|----------|-------------------|---------|

**Quy tắc cột:**

- **Mã**: `[YYMMDD-NN]` — YYMMDD là ngày tạo, NN là số thứ tự trong ngày (01, 02...).
- **Việc**: Tên ngắn gọn (≤15 từ), bắt đầu bằng động từ (Soạn, Trình, Báo cáo, Triển khai...).
- **Loại**: Tên Tiếng Việt đầy đủ (xem bảng "Loại công việc" bên dưới). KHÔNG ghi số.
- **Nhóm**: Tên Tiếng Việt đầy đủ (xem bảng "Nhóm hồ sơ" bên dưới). KHÔNG ghi số.
- **Trạng thái**: Một trong 5 giá trị:
  - `Chưa làm` — chưa khởi động
  - `Đang làm` — đang xử lý
  - `Chờ phản hồi` — đã trình/gửi, đang đợi
  - `Hoàn thành` — đã xong
  - `Tạm hoãn` — dừng có lý do
- **Deadline**: `dd/mm/yyyy` hoặc `[Chưa rõ]`
- **Cập nhật gần nhất**: `dd/mm/yyyy: 1 câu mô tả ngắn` (≤20 từ)
- **Ghi chú**: Thông tin bổ sung — người phối hợp, số văn bản, link... (≤30 từ)

---

## LOẠI CÔNG VIỆC (7 loại)

| Số | Tên Tiếng Việt | Phạm vi |
|---|---|---|
| 1 | `Tham mưu VB` | Soạn công văn, tờ trình, thông báo, quyết định trình lãnh đạo ký |
| 2 | `Tham mưu KH` | Soạn kế hoạch, đề án, chương trình hành động |
| 3 | `Báo cáo` | Báo cáo định kỳ tuần/tháng/quý/năm, báo cáo đột xuất |
| 4 | `Phối hợp Htr` | Phối hợp phòng ban khác, hỗ trợ ấp, hỗ trợ người dân |
| 5 | `Họp` | Họp giao ban, hội nghị, tập huấn (chuẩn bị + tham dự) |
| 6 | `Theo dõi VB` | Theo dõi tiến độ thực hiện văn bản đã ban hành |
| 7 | `Khác` | Việc không thuộc các loại trên |
| 8 | `Thực hiện CĐ` | Triển khai, thực hiện các chương trình, dự án, chỉ thị về chuyển đổi số |

**Cách Hiếu gõ — chấp nhận cả số và tên:**
- Gõ `loại: 1` → Claude tự đổi thành `Tham mưu VB` trước khi ghi
- Gõ `loại: Tham mưu VB` → ghi nguyên
- Gõ `loại: tham mưu` (không rõ 1 hay 2) → Claude hỏi lại

---

## NHÓM HỒ SƠ (5 nhóm, có thể mở rộng)

| Số | Tên Tiếng Việt | Phạm vi nội dung |
|---|---|---|
| 1 | `CĐS` | Kế hoạch CĐS, DTI, dịch vụ công trực tuyến, dữ liệu số, nền tảng số |
| 2 | `KHCN` | Khoa học công nghệ, đổi mới sáng tạo, sở hữu trí tuệ, Nghị quyết 57 |
| 3 | `Tổ CNSCĐ` | Tổ Công nghệ số cộng đồng — 43 thành viên, hoạt động 12 ấp |
| 4 | `Hạ tầng số` | Mạng, thiết bị, phần mềm dùng chung, an toàn thông tin |
| 5 | `Bình dân học vụ số` | Phong trào bình dân học vụ số trên địa bàn xã, 2025-2026 |
| 6 | `Đề án 06` | Đề án 06 về thành lập Tổ Công tác KHCN4 |
| 7 | `Liên thông VB` | Liên thông văn bản, liên kết dữ liệu giữa các hệ thống |
| 8 | `Mua sắm - Dự án` | Mua sắm, dự án, hạng mục chi thường xuyên của phòng VH-XH |

**Cách Hiếu gõ — chấp nhận cả số và tên:**
- Gõ `nhóm: 2` → Claude tự đổi thành `KHCN`
- Gõ `nhóm: KHCN` → ghi nguyên
- Gõ `nhóm: khcn` (viết thường) → tự chuẩn hóa

---

## QUY TẮC XÁC NHẬN KHI NHẬP MỚI

**A. Khi Hiếu nhập một LOẠI/NHÓM không khớp danh sách hiện tại:**

1. So sánh tên Hiếu nhập với các tên trong bảng (cả số và tên Tiếng Việt).
2. Nếu không khớp:
   - **Nếu trùng ý nghĩa với mục có sẵn** (ví dụ "soạn KH" ≈ "Tham mưu KH"): HỎI lại — "Ý Hiếu là `Tham mưu KH` (số 2) phải không?"
   - **Nếu là ý nghĩa mới** (ví dụ "Đào tạo" — không có trong 7 loại): HỎI — "Tên này chưa có trong danh sách. Hiếu muốn (a) thêm mới làm loại 8, (b) gán vào `Khác` (số 7), hay (c) chọn loại khác?"
3. KHÔNG tự ý thêm mới. Luôn xin phép trước.
4. Khi Hiếu chốt thêm mới → cập nhật bảng trong SKILL.md, đồng bộ dropdown trong HTML dashboard.

**B. Quy tắc chuẩn hóa khi ghi vào file:**

- Số → tên Tiếng Việt (1 → `Tham mưu VB`)
- Viết thường/in hoa lẫn lộn → đúng dạng trong bảng (`khcn` → `KHCN`)
- Có dấu/không dấu → có dấu (`Cds` → `CĐS`)

---

## QUY TẮC TỰ PHÂN LOẠI KHI THÊM VIỆC MỚI

Khi người dùng thêm việc mới mà không gọi rõ Loại/Nhóm:

1. **Tự phân tích** dựa trên nội dung việc.
2. **Báo cho người dùng**: "Tôi gán Loại=`Tham mưu KH` (số 2), Nhóm=`CĐS` (số 1), đổi không?"
3. **Im lặng = OK**. Người dùng phản hồi → đổi theo yêu cầu.

**Ví dụ tự phân loại:**

| Tên việc | Loại | Nhóm |
|---|---|---|
| Soạn Kế hoạch CĐS 2026-2030 | Tham mưu KH (2) | CĐS (1) |
| Soạn Công văn đôn đốc Tổ CNSCĐ | Tham mưu VB (1) | Tổ CNSCĐ (3) |
| Báo cáo Quý II KHCN-CĐS | Báo cáo (3) | KHCN (2) |
| Tập huấn Tổ CNSCĐ ấp Lý Nhơn | Họp (5) | Tổ CNSCĐ (3) |
| Theo dõi tiến độ KH 129/KH-UBND | Theo dõi VB (6) | CĐS (1) |
| Trang bị wifi cho ấp Cá Cháy | Khác (7) | Hạ tầng số (4) |
| Kiện toàn thành viên Tổ CNSCĐ | Tham mưu VB (1) | Tổ CNSCĐ (3) |

---

## HIỂN THỊ BÁO CÁO GIAO BAN

Khi người dùng yêu cầu "báo cáo giao ban tuần này", tổng hợp theo cấu trúc:

```
1. ĐÃ HOÀN THÀNH (trong tuần)
   - [Mã] Tên việc — kết quả

2. ĐANG LÀM
   - [Mã] Tên việc — tiến độ — deadline

3. CHỜ PHẢN HỒI
   - [Mã] Tên việc — đợi gì, từ ai

4. KHÓ KHĂN / VƯỚNG MẮC (nếu có)
   - Nội dung — đề xuất hướng xử lý

5. KẾ HOẠCH TUẦN TỚI
   - [Mã] Tên việc — mục tiêu
```

Lọc:
- "Đã hoàn thành" chỉ lấy việc có "Cập nhật gần nhất" trong 7 ngày gần nhất
- "Đang làm" + "Chờ phản hồi" lấy tất cả
- "Tạm hoãn" KHÔNG đưa vào, trừ khi người dùng yêu cầu

**Tùy chọn nâng cao:** Nếu người dùng yêu cầu "báo cáo giao ban theo nhóm" hoặc "theo loại", nhóm các việc theo cột Nhóm/Loại trước rồi mới chia theo trạng thái.

---

## QUY TẮC GHI FILE

- Mỗi lần sửa: đọc file → sửa → ghi lại toàn bộ
- KHÔNG xuất file `.md` ra `/mnt/user-data/outputs/` (file này là dữ liệu nội bộ, không phải sản phẩm)
- Sau khi ghi xong, hiển thị lại bảng đầy đủ (hoặc dòng vừa sửa) cho người dùng xem để xác nhận
- Khi có ≥10 việc "Hoàn thành" tích lũy, hỏi người dùng có cần lưu trữ (chuyển sang `data/da-hoan-thanh.md`) để giữ file chính gọn không

---

## GIAO DIỆN WEB (file HTML standalone)

**QUY TẮC QUAN TRỌNG — TIẾT KIỆM TOKEN:** CHỈ tạo file HTML dashboard khi người dùng **gọi trực tiếp** trigger "mở giao diện giao ban" / "dashboard công việc". TUYỆT ĐỐI KHÔNG tự ý tạo file HTML sau các thao tác khác (thêm việc, cập nhật, đánh dấu hoàn thành, xóa). Lý do: file HTML rất dài (~13KB code), tạo tự động sau mỗi lần sửa sẽ tốn rất nhiều token một cách vô ích.

**Quy trình đúng:**
- Hiếu gõ "thêm việc..." → Claude chỉ sửa `data/danh-sach.md` + đóng gói skill. KHÔNG tạo HTML.
- Hiếu gõ "cập nhật...", "đánh dấu xong..." → Claude chỉ sửa `data/danh-sach.md` + đóng gói skill. KHÔNG tạo HTML.
- Hiếu gõ "mở giao diện giao ban" → Claude mới tạo file HTML mới với dữ liệu hiện hành.

**Quy trình:**

1. Đọc `data/danh-sach.md`, parse bảng thành mảng JSON.
2. Tạo file HTML standalone tại `/mnt/user-data/outputs/dashboard-giao-ban.html` (KHÔNG dùng `visualize:show_widget` — artifact không hiển thị được trên app Claude điện thoại của Hiếu).
3. Gọi `present_files` để Hiếu tải file về.
4. KHÔNG ghi vào file dữ liệu. Giao diện chỉ để **xem - lọc - copy lệnh** — mọi thay đổi vẫn qua chat.

**Yêu cầu kỹ thuật file HTML:**
- Đầu file đầy đủ: `<!DOCTYPE html>`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, `<title>`
- KHÔNG dùng CDN nào — toàn bộ CSS/JS nhúng inline
- KHÔNG dùng Chart.js — vẽ biểu đồ thanh ngang bằng HTML/CSS thuần
- Hỗ trợ dark mode bằng `@media (prefers-color-scheme: dark)`
- Font: hệ thống (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- Padding body: 12px; mọi padding/font scale theo mobile (~380px)

**Thành phần bắt buộc:**
- 4 thẻ thống kê 2×2: Tổng / Đang làm / Chờ phản hồi / Quá hạn
- Bộ lọc: input tìm kiếm full-width, Loại+Nhóm 2 cột, Trạng thái full-width
- Dropdown Loại có **7 mục** (Tham mưu VB, Tham mưu KH, Báo cáo, Phối hợp Htr, Họp, Theo dõi VB, Khác)
- Dropdown Nhóm có **4 mục** (CĐS, KHCN, Tổ CNSCĐ, Hạ tầng số) — đồng bộ với bảng hiện hành
- **Khi thêm loại/nhóm mới qua chat → cập nhật dropdown trong HTML cùng lúc**
- Biểu đồ thanh ngang trong `<details>` (ẩn mặc định): Theo Loại + Theo Nhóm
- Danh sách card từng việc với badge trạng thái, Loại, Nhóm, deadline (đỏ nếu quá hạn ≤3 ngày), cập nhật gần nhất, ghi chú
- Nút mỗi card: "Đánh dấu xong" + "Copy lệnh sửa" — đều copy vào clipboard
- Nút cuối trang: "Copy lệnh soạn báo cáo giao ban" + "Copy lệnh thêm việc mới"

**Logic copy clipboard:** `navigator.clipboard.writeText` với fallback `document.execCommand('copy')`. Sau copy đổi text nút thành "✓ Đã copy" trong 1.5 giây.

**Quy tắc tính "Quá hạn":** deadline < hôm nay VÀ trạng thái != "Hoàn thành".

**Quy tắc tính "Sắp đến hạn":** 0 ≤ ngày còn lại ≤ 3 VÀ trạng thái != "Hoàn thành".

**Tính ngày hôm nay:** Dùng `new Date()` (lấy ngày máy người dùng, không hardcode).

---

## CHỌN MODEL CLAUDE PHÙ HỢP

Skill này có thể được gọi bởi nhiều cấp model. Khuyến nghị:

| Tình huống | Model |
|---|---|
| Thiết kế lại skill, debug logic, mở rộng tính năng | Opus 4.7 |
| Cập nhật danh sách (thêm/sửa/đánh dấu xong) | Haiku 4.5 |
| Soạn báo cáo giao ban tuần (tổng hợp + viết) | Sonnet 4.6 |
| Mở giao diện web (tạo file HTML từ template có sẵn) | Haiku 4.5 |
| Tự phân loại Loại/Nhóm cho việc mới | Haiku 4.5 |
| Thêm loại/nhóm mới, đồng bộ skill | Sonnet 4.6 hoặc Opus 4.7 |

Nguyên tắc: Việc lặp lại theo template → Haiku. Việc cần suy luận/viết văn bản → Sonnet. Việc thiết kế hệ thống → Opus.
