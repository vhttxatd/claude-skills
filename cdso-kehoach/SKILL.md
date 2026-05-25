---
name: cdso-kehoach
description: Soạn kế hoạch chuyển đổi số hành chính cấp xã.
---

> **Đọc tối thiểu:** SKILL.md này + `quy-tac-chung/SKILL.md` (phần cốt lõi). Chỉ mở thêm khi cần:
> - `quy-tac-chung/data/quy-tac-soan-thao.md` — khi soạn căn cứ, dẫn chiếu, xuất file
> - `quy-tac-chung/data/van-ban-can-cu.md` — khi soạn phần căn cứ
> - `quy-tac-chung/data/don-vi-chuc-nang.md` — khi phân công nhiệm vụ
> - `the-thuc-van-ban/` — khi tới bước xuất .docx (đọc đúng file con cần dùng)
> - `references/` — chỉ mở reference của loại kế hoạch đang soạn

# Skill: Lập kế hoạch chuyển đổi số cấp xã

Skill này hỗ trợ soạn thảo kế hoạch chuyển đổi số (CĐS) cấp xã/phường theo quy trình tương tác từng bước, đảm bảo nội dung nhất quán, đúng văn phong hành chính nhà nước Việt Nam.

## Ngữ cảnh sử dụng

**Mô hình chính quyền địa phương 2 cấp:** Xã An Thới Đông trực thuộc Ủy ban nhân dân Thành phố Hồ Chí Minh — không còn cấp huyện. Chuỗi căn cứ pháp lý chỉ đi từ Trung ương → Thành phố → Xã. Tuyệt đối không nhắc đến cấp huyện trong bất kỳ văn bản nào.

**Các loại kế hoạch được hỗ trợ:**
- Kế hoạch của Đảng ủy xã
- Kế hoạch của Ban Chỉ đạo về phát triển Khoa học, Công nghệ, Đổi mới sáng tạo và Chuyển đổi số xã
- Kế hoạch của UBND xã triển khai theo kế hoạch cấp trên (Thành phố, Đảng ủy xã, Ban Chỉ đạo xã)
- Chương trình hành động của Đảng ủy xã
- Kế hoạch hàng năm hoặc giai đoạn đa năm

---

## QUY TRÌNH THỰC HIỆN (7 BƯỚC)

### BƯỚC 1 — Tiếp nhận và đọc kế hoạch đầu vào

Khi nhận yêu cầu, xác định loại đầu vào và xử lý tương ứng:

| Dạng đầu vào | Cách xử lý |
|---|---|
| File Word (.docx) đính kèm | Dùng skill `file-reading` để đọc nội dung |
| Copy-paste văn bản vào chat | Đọc trực tiếp từ nội dung chat |
| Mô tả bằng lời (không có file) | Hỏi thêm thông tin tối thiểu (xem bên dưới) |
| Không có đầu vào | Hỏi loại kế hoạch và năm thực hiện |

**Lưu ý:** Người dùng thường mô tả bằng lời hoặc kết hợp lời + file. Luôn linh hoạt, không yêu cầu bắt buộc phải có file.

**Thông tin tối thiểu cần xác nhận:**
```
- Tên đơn vị ban hành (Đảng ủy / Ban Chỉ đạo / UBND xã An Thới Đông)
- Loại kế hoạch (triển khai CĐS thường niên / giai đoạn / chuyên đề)
- Năm hoặc giai đoạn thực hiện
- Kế hoạch cấp trên làm căn cứ (nếu có)
```

---

### BƯỚC 2 — Phân tích và đề xuất cấu trúc

Sau khi đọc đầu vào, phân tích và đề xuất cấu trúc kế hoạch theo nguyên tắc:
1. Ưu tiên theo cấu trúc kế hoạch đầu vào (nếu có)
2. Trộn với cấu trúc chuẩn thường gặp của các kế hoạch CĐS cấp xã đã ban hành
3. Tham khảo cấu trúc mẫu tại `references/cautruc-mau.md`

**Trình bày cấu trúc đề xuất dưới dạng mục lục rõ ràng**, ví dụ:
```
TÊN KẾ HOẠCH
I. CĂN CỨ THỰC HIỆN
II. MỤC ĐÍCH, YÊU CẦU
   1. Mục đích
   2. Yêu cầu
III. MỤC TIÊU
   1. Mục tiêu chung
   2. Mục tiêu cụ thể
IV. NHIỆM VỤ TRỌNG TÂM
   1. ...
   2. ...
V. GIẢI PHÁP THỰC HIỆN (nếu có)
VI. PHÂN CÔNG THỰC HIỆN
VII. TỔ CHỨC THỰC HIỆN
```

Sau khi đề xuất, hỏi: **"Anh/chị có muốn điều chỉnh cấu trúc này không?"**

---

### BƯỚC 3 — Gợi ý nội dung tóm tắt từng phần

Sau khi người dùng xem cấu trúc, trình bày **tóm tắt nội dung dự kiến** cho từng mục (2–4 dòng mỗi mục), ví dụ:

```
TÊN KẾ HOẠCH
→ "Kế hoạch thực hiện chuyển đổi số xã An Thới Đông năm [năm]"

I. CĂN CỨ THỰC HIỆN
→ Nghị quyết/Quyết định cấp Trung ương,
  Kế hoạch/Chương trình của Thành ủy hoặc UBND Thành phố,
  Kế hoạch của Ban Chỉ đạo Thành phố (nếu có),
  Kế hoạch/Chương trình của Đảng ủy xã hoặc Ban Chỉ đạo xã
  (KHÔNG có căn cứ cấp huyện — mô hình 2 cấp)

II. MỤC ĐÍCH, YÊU CẦU
→ Mục đích: Triển khai đồng bộ các nhiệm vụ CĐS trên địa bàn xã...
  Yêu cầu: Đảm bảo tiến độ, phân công rõ ràng, có kiểm tra giám sát...
```

**Lưu ý quan trọng về tính liên đới:**
Khi người dùng yêu cầu thay đổi bất kỳ mục nào (ví dụ: thêm mục tiêu cụ thể), Claude phải:
- Ghi nhận thay đổi đó
- Chủ động cập nhật các mục có liên quan (nhiệm vụ, phân công, chỉ tiêu)
- Thông báo ngắn gọn những mục nào sẽ thay đổi theo

---

### BƯỚC 4 — Hỏi bổ sung nội dung

Sau khi trình bày tóm tắt, hỏi:

> "Anh/chị có muốn bổ sung nội dung nào ngoài các phần trên không? Có thể:
> - Nhập trực tiếp nội dung muốn thêm
> - Tải lên văn bản/tài liệu tham khảo để tôi gợi ý các nội dung phù hợp"

Nếu người dùng cung cấp thêm tài liệu → đọc và trích xuất các nội dung liên quan, đề xuất thêm vào mục nào phù hợp.

---

### BƯỚC 5 — Liệt kê cấu trúc đầy đủ + tóm tắt khái quát

Khi đã thống nhất cấu trúc và nội dung bổ sung, trình bày:

1. **MỤC LỤC ĐẦY ĐỦ** — tất cả phần, mục, tiểu mục đã được thống nhất
2. **TÓM TẮT KHÁI QUÁT** — 1 đoạn ngắn (5–8 câu) mô tả tổng thể kế hoạch: mục tiêu chính, số lượng nhiệm vụ, cơ quan/đơn vị thực hiện chính

Hỏi: **"Anh/chị xác nhận để bắt đầu soạn thảo không, hay cần điều chỉnh gì thêm?"**

---

### BƯỚC 6 — Soạn thảo từng phần, từ trên xuống dưới

Khi người dùng xác nhận, bắt đầu soạn từng phần theo thứ tự từ đầu đến cuối:

**Quy tắc soạn thảo:**
- Dùng văn phong hành chính nhà nước chuẩn (xem `references/van-phong.md`)
- Đánh số thứ tự đúng quy cách (I, II; 1, 2; a, b...)
- Các số liệu, chỉ tiêu: để trống hoặc đánh dấu `[...]` nếu chưa có, kèm ghi chú rõ cần bổ sung
- Tên văn bản căn cứ: dùng đúng tên nếu biết, nếu không chắc để `[số văn bản]` và hỏi người dùng
- Phần phân công: luôn hỏi người dùng về tên cán bộ/bộ phận cụ thể nếu chưa rõ

**Sau mỗi phần, hỏi:**
> "Phần [tên mục] đã ổn chưa? Anh/chị muốn chỉnh sửa gì không hay qua mục tiếp theo?"

Chờ xác nhận trước khi soạn phần tiếp theo.

---

### BƯỚC 7 — Hoàn thiện và tùy chọn xuất

Sau khi soạn và xác nhận xong toàn bộ các phần, hỏi người dùng:

> "Kế hoạch đã hoàn thành toàn bộ. Anh/chị muốn làm gì tiếp theo?
> 1. Xuất ra file Word (.docx) để lưu và in ấn
> 2. Xem lại toàn bộ kế hoạch trong chat một lần nữa
> 3. Chỉnh sửa thêm một phần nào đó"

**Xử lý từng lựa chọn:**
- Chọn 1 → dùng skill `docx` tạo file Word đúng định dạng văn bản hành chính (tiêu đề căn giữa, nội dung căn đều, đánh số trang)
- Chọn 2 → in lại toàn bộ kế hoạch trong chat theo thứ tự từ đầu đến cuối
- Chọn 3 → hỏi người dùng muốn chỉnh phần nào và xử lý theo quy trình Bước 6

**Mặc định:** Nếu người dùng không chọn gì hoặc chỉ nói "xong rồi" → không tự động xuất file, chỉ thông báo hoàn thành và để người dùng chủ động yêu cầu tiếp.

---

## LƯU Ý QUAN TRỌNG

### Tính liên đới nội dung
Các phần trong kế hoạch có liên hệ chặt chẽ:
- Mục tiêu ← → Nhiệm vụ trọng tâm ← → Phân công thực hiện ← → Chỉ tiêu đánh giá
- Khi thay đổi 1 mục tiêu cụ thể → kiểm tra và cập nhật nhiệm vụ, phân công tương ứng
- Khi thêm căn cứ pháp lý mới → kiểm tra xem có nhiệm vụ mới phát sinh không

### Xử lý thông tin còn thiếu
- Số hiệu văn bản, ngày ban hành: để `[…]` nếu chưa có, hỏi người dùng
- Chỉ tiêu số lượng cụ thể: hỏi người dùng hoặc dùng con số ước tính và đánh dấu cần xác nhận
- Tên cán bộ phụ trách: không tự điền, luôn hỏi người dùng

### Văn phong
- Dùng từ ngữ hành chính chuẩn (xem `references/van-phong.md`)
- Không dùng từ thông tục, viết tắt không chuẩn
- Câu văn ngắn gọn, rõ ràng, có chủ ngữ – vị ngữ đầy đủ

**Hệ thống số thứ tự chuẩn trong kế hoạch:**
```
Phần I. (La Mã)
   1. Mục (số Ả Rập)
      1.1. Mục con (số thập phân)
           a) Tiểu mục (chữ thường có dấu ngoặc)
              * Nội dung nhóm (dấu sao — dùng khi cần gom nhóm nội dung)
```

**Nguyên tắc trình bày nội dung:**
- Nhiều nội dung tương đồng → gom thành 1 đoạn văn xuôi, không liệt kê dấu chấm đầu dòng
- Chỉ dùng dấu `*` khi cần thiết gom nhóm nội dung trong cùng một tiểu mục
- Không tạo cấp số thứ tự quá 4 tầng (I → 1 → 1.1 → a)
- Không dùng dấu gạch đầu dòng `-` trong văn bản chính thức

---

## ĐỌC THÊM — REFERENCES TRONG SKILL NÀY

- `references/cautruc-mau.md` — Cấu trúc mẫu chi tiết các loại kế hoạch CĐS cấp xã
- `references/van-phong.md` — Văn phong hành chính, hệ thống số thứ tự, quy tắc UBND vs Đảng ủy
- `references/can-cu-phap-ly.md` — Danh mục văn bản pháp lý cấp Trung ương và Thành phố

## THAM CHIẾU SKILL KHÁC

Khi cần các thông tin sau, đọc từ skill tương ứng:

**`quy-tac-chung` — Dữ liệu thực tế xã An Thới Đông:**
- `data/don-vi-dia-ban.md` — 12 ấp, 10 trường học
- `data/can-bo-phan-cong.md` — Cán bộ, chức vụ, người ký
- `data/van-ban-can-cu.md` — Số hiệu văn bản đã xác nhận
- `data/chi-tieu-nhiem-vu.md` — Chỉ tiêu, nhiệm vụ trọng tâm
- `data/to-cong-nghe-so.md` — Tổ CNSCĐ 12 ấp
- `data/chidan-viettathk.md` — Viết tắt, chỉ dẫn, phân công phòng ban

**`the-thuc-van-ban` — Định dạng và thể thức:**
- `references/cai-dat-trang.md` — Trang A4, font, lề, heading
- `references/tieu-de.md` — Tiêu đề 2 cột, dấu gạch, trích yếu
- `references/noi-dung.md` — Căn cứ, thân văn bản, đoạn kết
- `references/noi-nhan-chu-ky.md` — Nơi nhận, chữ ký các loại
- `references/phu-luc-bang.md` — Bảng phân công, viết tắt, màu sắc
- `references/dau-cau.md` — Dấu câu, ngoặc kép, số trang
- `references/loai-van-ban.md` — Đặc thù từng loại: KH, BC, CV...
- `references/code-docxjs.md` — Code mẫu docx-js tái sử dụng

**Thứ tự tham chiếu khi soạn văn bản:**
1. `quy-tac-chung` — lấy dữ liệu thực tế (cán bộ, số văn bản, chỉ tiêu...)
2. `the-thuc-van-ban` — áp dụng định dạng, thể thức
3. References trong skill này — quy trình, văn phong, cấu trúc
4. Hỏi người dùng nếu thông tin còn thiếu
