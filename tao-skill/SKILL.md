---
name: tao-skill
description: >
  Sử dụng skill này khi người dùng muốn TẠO MỚI, CHỈNH SỬA hoặc CẢI TIẾN một
  skill (bộ hướng dẫn) cho Claude. Kích hoạt khi người dùng nói "tạo skill",
  "viết skill", "xây dựng skill", "cập nhật skill", "cải thiện skill", "skill
  mới cho...", hoặc muốn Claude học cách làm một việc lặp đi lặp lại.
  Đây là skill dùng để tạo ra các skill khác — ví dụ skill soạn công văn,
  skill theo dõi tiến độ, skill phân tích văn bản pháp lý, v.v.
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu · ra_soat_lai: 2027-09-01 · rui_ro: thap

# Skill: Tạo và Cải Tiến Skill

Skill này giúp Hiếu xây dựng các bộ hướng dẫn (skill) để Claude thực hiện
các nhiệm vụ lặp lại một cách nhất quán và chính xác.

---

## Skill là gì?

Một skill là **file hướng dẫn** (SKILL.md) mà Claude đọc trước khi thực hiện
nhiệm vụ. File này chứa: quy trình xử lý, quy tắc đầu vào/đầu ra, mẫu cố định,
và các lưu ý đặc thù. Skill giúp Claude làm đúng ngay từ lần đầu, không cần
giải thích lại mỗi lần.

---

## 4 NGUYÊN TẮC VẬN HÀNH BẮT BUỘC (áp dụng cho mọi skill)

Lấy cảm hứng từ ghi chú của Andrej Karpathy về vận hành AI agent. Đây là 4
nguyên tắc nền mà **mọi skill** (đã có và sẽ tạo mới) phải tuân theo khi
Claude thực thi:

1. **Nghĩ trước khi làm (Think before doing)**
   Trước khi soạn văn bản/báo cáo, nếu thiếu số liệu, căn cứ pháp lý, tên
   người ký, ngày tháng... → Claude PHẢI hỏi lại, KHÔNG tự giả định rồi
   chạy luôn. Sai giả định trong văn bản hành chính hậu quả nặng hơn code.

2. **Đơn giản là ưu tiên (Simplicity first)**
   Làm đúng-đủ theo yêu cầu, không thêm bớt nội dung/bước dư thừa. Văn bản
   hành chính cần đúng khuôn mẫu, không "viết dài cho có vẻ đầy đủ".

3. **Sửa như phẫu thuật (Surgical change)**
   Khi người dùng yêu cầu sửa một phần (đoạn văn, mục, dòng), CHỈ sửa đúng
   phần đó. Giữ nguyên toàn bộ phần còn lại, thể thức, font, cấu trúc. Không
   viết lại nguyên văn bản trừ khi được yêu cầu rõ.

4. **Thực thi theo mục tiêu (Goal-driven execution)**
   Mỗi skill cần định nghĩa rõ "thế nào là đạt" (checklist/Definition of
   Done) trước khi báo hoàn thành. Tự kiểm tra lại kết quả so với checklist
   đó, không báo "xong" khi chưa thực sự đạt.

> Khi soạn SKILL.md mới, không cần chép lại 4 nguyên tắc này — chỉ cần ghi
> 1 dòng tham chiếu: *"Tuân theo 4 nguyên tắc vận hành trong tao-skill."*

---

## QUY TRÌNH TẠO SKILL MỚI

### Bước 1 — Hiểu mục tiêu

Hỏi người dùng:
1. Skill này giúp Claude làm việc gì cụ thể?
2. Khi nào cần dùng skill này? (từ khóa kích hoạt)
3. Dữ liệu đầu vào thường là gì? (file, văn bản, yêu cầu...)
4. Kết quả đầu ra mong muốn là gì? (file Word, bảng, văn bản...)
5. Có ví dụ mẫu nào về kết quả tốt không?

### Bước 2 — Thu thập ngữ cảnh

Nếu người dùng có:
- **File mẫu** (báo cáo cũ, công văn cũ) → đọc và học phong cách
- **Quy trình có sẵn** → hệ thống hóa thành các bước rõ ràng
- **Yêu cầu đặc thù** (từ viết tắt, văn phong, định dạng) → ghi vào skill

### Bước 3 — Soạn SKILL.md

Cấu trúc file SKILL.md:

```
---
name: ten-skill-khong-dau
description: >
  Mô tả NGẮN GỌN khi nào dùng skill này.
  Liệt kê các từ khóa kích hoạt.
---

> **META** · cap_nhat: YYYY-MM-DD · nguon_su_that: <nguồn> · ra_soat_lai: YYYY-MM-DD · rui_ro: cao|trung|thap

# Tên Skill

## BỐI CẢNH (nếu cần)
## BƯỚC 1 — ...
## BƯỚC 2 — ...
## LƯU Ý ĐẶC BIỆT
```

### Dòng META — BẮT BUỘC, không có ngoại lệ

Mọi file `.md` trong skill (kể cả `data/`, `references/`, `bieu-mau/`,
`mau/`, `templates/`) phải có dòng META đặt **ngay sau tiêu đề H1**, trong
1.500 ký tự đầu file — nếu đặt sâu hơn thì script quét sẽ không thấy.

| Trường | Ghi gì |
|---|---|
| `cap_nhat` | Ngày **nội dung** được cập nhật lần cuối, KHÔNG phải ngày sửa chính tả |
| `nguon_su_that` | Số hiệu văn bản, tên file gốc, hoặc "quyết định của Hiếu". **Không bịa căn cứ pháp lý** |
| `ra_soat_lai` | `cap_nhat` + chu kỳ theo rủi ro |
| `rui_ro` | `cao` = số liệu/căn cứ pháp lý · `trung` = quy trình, biểu mẫu · `thap` = quy ước định dạng |

Chu kỳ rà soát: **cao = 3 tháng · trung = 6 tháng · thấp = 12 tháng.**

Khi chỉ thêm META mà chưa đọc lại nội dung, ghi thêm đuôi
`(bổ sung META <ngày>, nội dung CHƯA rà)` để người sau biết dòng này chưa
được kiểm chứng.

**Kiểm tra:** chạy `python3 tao-skill/scripts/kiem-tra-meta.py`. Skill chưa
đạt nếu script còn báo thiếu META hoặc file rủi ro cao quá hạn.

**Nguyên tắc viết skill tốt:**
- Mỗi bước phải cụ thể, có thể làm được ngay
- Dùng ví dụ ĐÚNG và SAI để Claude học phong cách
- Ghi rõ những điều TUYỆT ĐỐI KHÔNG làm
- Phần `description` phải đủ rõ để Claude tự biết khi nào cần dùng
- Thừa hưởng **4 nguyên tắc vận hành** ở trên (chỉ cần ghi 1 dòng tham chiếu,
  không cần chép lại toàn bộ)

### Bước 4 — Thử nghiệm

Sau khi soạn xong:
1. Chạy thử với 2-3 tình huống thực tế
2. Đánh giá kết quả: đúng không? thiếu gì? thừa gì?
3. Chỉnh sửa skill dựa trên phản hồi
4. Lặp lại cho đến khi đạt yêu cầu

### Bước 5 — Đóng gói và cài đặt

```bash
# Đóng gói NGUYÊN thư mục skill, từ thư mục cha
zip -rq ten-skill.zip ten-skill/

# Cài vào Claude.ai: Settings → Skills → Upload
```

**Ba lỗi đóng gói đã từng xảy ra — đừng lặp lại:**

1. **Xuất gói chỉ có `SKILL.md`.** Upload lên là **xóa sạch** `data/`,
   `references/`, `bieu-mau/` của bản đang chạy. Luôn đóng gói cả thư mục.
2. **Gộp nhiều skill vào 1 file nén.** Nhiều `SKILL.md` trùng tên trong các
   thư mục lồng nhau làm trình tải về lỗi. **Mỗi skill một file nén riêng.**
3. **Copy-paste thủ công qua web GitHub.** Đã làm hỏng mã hóa UTF-8 của
   `bao-cao-hanh-chinh/mau/mau-khcn-cds.md` (mất 1 byte, chữ "Mốc" thành ký
   tự hỏng). Sửa xong phải kiểm tra đọc lại được bằng UTF-8.

**Ba bản sao — quy tắc chống lệch:**

| Bản | Vai trò |
|---|---|
| Settings Claude.ai | **bản đang chạy** |
| GitHub `vhttxatd/claude-skills` | **bản gốc có lịch sử** |
| `D:\claude-skills` | bản sao, **không có thẩm quyền** |

Sửa skill là phải cập nhật **cả Settings và GitHub trong cùng ngày**.

**Kiểm lệch:** chạy `python3 tao-skill/scripts/kiem-tra-lech.py` để đối chiếu
bản đang chạy với bản trên GitHub. Repo công khai, đọc được không cần token.
Script báo 3 loại lệch: khác nội dung · có trên GitHub mà thiếu ở Settings
(dấu hiệu của lỗi đóng gói số 1) · có ở Settings mà chưa đẩy lên GitHub.
Nhớ là bản Settings trong phiên là **bản chụp lúc phiên bắt đầu** — vừa upload
giữa phiên thì script báo lệch là bình thường, mở phiên mới rồi chạy lại.

> **Skill nạp trong phiên là bản chụp lúc phiên bắt đầu.** Upload giữa chừng
> KHÔNG làm mới phiên đang chạy. Muốn kiểm tra kết quả upload phải **mở
> phiên mới**.

---

## QUY TRÌNH CẢI TIẾN SKILL ĐÃ CÓ

Khi người dùng muốn cập nhật skill:

1. **Đọc skill hiện tại** — xác định phần nào cần sửa
2. **Hỏi vấn đề cụ thể** — kết quả nào chưa đúng ý?
3. **Chỉnh sửa có mục tiêu** — không sửa những phần đang hoạt động tốt
4. **Cập nhật dòng META** — sửa `cap_nhat`, tính lại `ra_soat_lai`. Sửa nội
   dung mà không sửa META coi như **chưa sửa xong**
5. **Tìm nơi dẫn chiếu chéo** — một con số thường nằm ở nhiều file. Trước khi
   báo xong, `grep` lại toàn bộ skill để không sót bản sao
6. **Kiểm tra lại** — chạy `kiem-tra-meta.py`; đọc lại được bằng UTF-8
7. **Đóng gói lại** — xem Bước 5

### TUYỆT ĐỐI KHÔNG find-replace hàng loạt

Tên cũ thường vẫn là tên thật ở nơi khác. Ví dụ có thật: `Vàm Sát` và
`Dương Văn Hạnh` vừa là **tên ấp đã bỏ**, vừa là **địa danh còn tồn tại**
(sông Vàm Sát – Lò Rèn – Dinh Bà, Khu du lịch sinh thái Vàm Sát, Đình Dương
Văn Hạnh — di tích cấp thành phố). Thay hàng loạt là phá hỏng dữ liệu du
lịch và hạ tầng. **Đọc ngữ cảnh từng chỗ rồi sửa từng chỗ.**

### Dữ liệu nào KHÔNG được để trong skill

Theo `quy-tac-chung/data/quy-tac-tri-nho.md`: dữ liệu do Nexus/Notion sở hữu
(nhân sự, số điện thoại, đơn vị, nhiệm vụ) thì skill **chỉ giữ con trỏ**,
không giữ bản sao. Lý do có thật: bản sao danh sách trưởng ấp trong skill đã
sai 4/8 người và tồn tại suốt tháng 7–8/2026 mà không ai phát hiện.

Thứ tự ưu tiên khi mâu thuẫn: **Nexus = Notion > skill > memory Claude.**

---

## GỢI Ý SKILL NÊN TẠO TIẾP

Dựa trên công việc tại xã An Thới Đông, các skill hữu ích:

| Skill nên tạo | Mô tả |
|--------------|-------|
| `soan-cong-van` | Soạn công văn, thông báo, tờ trình theo mẫu hành chính |
| `phan-tich-van-ban` | Đọc và tóm tắt văn bản pháp lý, bóc tách nhiệm vụ |
| `theo-doi-tien-do` | Cập nhật và tổng hợp tiến độ từ NEXUS Gov |
| `tra-loi-phieu-khao-sat` | Tổng hợp và phân tích kết quả khảo sát |
