---
name: kiem-chuan
description: >
  Lớp kiểm chứng độc lập cho bản thảo trước khi gửi đi. Dùng khi Hiếu nói
  "kiểm chuẩn", "rà soát bản thảo", "soát trước khi gửi", "check giúp bản
  này", "kiểm theo checklist", hoặc dán một bản thảo vào đoạn chat mới và
  yêu cầu kiểm tra. Skill này KHÔNG soạn văn bản — chỉ kiểm và chỉ ra chỗ
  sai. Bắt buộc dùng cho văn bản gửi lãnh đạo, gửi cấp trên, và mọi báo cáo
  có số liệu hoặc căn cứ pháp lý.
---

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu (thang 5 level, mức L4) · ra_soat_lai: 2027-03-01 · rui_ro: trung

# Skill: Kiểm chuẩn độc lập

Tuân theo 4 nguyên tắc vận hành trong `tao-skill`.

## Vì sao cần lớp này

Trong phiên 01/9/2026, Claude đưa ra **3 dự đoán sai liên tiếp**: Nexus thiếu
trường học (thực ra đủ 10) · giảm 35 KB (thực ra tăng 42 KB) · `so_lieu` là
đích đến của dữ liệu L3 (thực ra không hợp). Cả ba đều do chính Claude phát
hiện khi đi kiểm chứng — **không có lớp nào khác bắt được**.

Người soạn không kiểm được chính mình vì đã bị neo vào lập luận lúc soạn.
Vì vậy: **kiểm phải chạy ở ngữ cảnh sạch.**

---

## QUY TẮC NỀN — không được vi phạm

1. **Đoạn chat mới.** Không kiểm trong cùng đoạn chat đã soạn ra bản thảo.
   Claude thấy quá trình soạn thì sẽ bênh kết quả của mình.
2. **Không sửa hộ.** Vai của skill này là chỉ ra chỗ sai, không viết lại.
   Hiếu quyết định sửa thế nào. Sửa hộ là trộn lại hai vai vừa tách ra.
3. **Không đoán nguồn.** Không tìm được nguồn của một con số thì ghi
   `KHÔNG KIỂM ĐƯỢC`, không suy ra từ con số gần giống ở chỗ khác.
4. **Không được nói "nhìn chung ổn".** Mỗi mục checklist phải có phán quyết
   riêng. Im lặng về một mục = coi như chưa kiểm.
5. **Liệt kê đủ mục không kiểm được.** Đó là thông tin quan trọng nhất của
   bản kiểm — nó cho biết bản thảo đang dựa vào cái gì chưa ai xác nhận.

---

## BƯỚC 1 — Nhận đủ đầu vào

Trước khi kiểm, phải có:

| Cần | Vì sao |
|---|---|
| Bản thảo đầy đủ (dán vào chat hoặc đính file) | Kiểm từng phần dễ bỏ sót mâu thuẫn giữa các phần |
| **Gửi cho ai** (lãnh đạo xã / Sở, ngành Thành phố / nội bộ phòng) | Quyết định mức chặt của thể thức và có cột giải trình hay không |
| **Bản trình hay bản phát hành** | Bản phát hành phải xóa cột giải trình |

Thiếu ý 2 hoặc ý 3 thì **hỏi trước, đừng đoán**.

---

## BƯỚC 2 — Chạy checklist 6 nhóm

Kiểm theo đúng thứ tự này. Nhóm A và B là nhóm gây hậu quả nặng nhất.

### A. Số liệu

- [ ] Mỗi con số trong bản thảo **truy được về một nguồn cụ thể** (bảng Nexus,
      văn bản số hiệu, báo cáo đơn vị) — không phải "theo tôi nhớ".
- [ ] Mỗi con số có **thời điểm** (quý / 6 tháng / năm / đến ngày cụ thể).
- [ ] Tỷ lệ, phần trăm có đủ **tử số, mẫu số, đơn vị cung cấp**. Không nội suy.
- [ ] **Con số nào chép từ file skill mà đáng lẽ phải tra Nexus?** Danh sách
      cán bộ, đơn vị, ấp, số điện thoại, email công vụ — chủ sở hữu là Nexus.
      Skill chỉ giữ con trỏ. Xem `quy-tac-chung/data/quy-tac-tri-nho.md`.
- [ ] Số liệu lặp lại ở nhiều mục có **khớp nhau** không; tổng có bằng tổng
      các thành phần không.

### B. Căn cứ pháp lý

- [ ] Mỗi căn cứ đủ **số hiệu + ngày ban hành + cơ quan ban hành + trích yếu**.
- [ ] Văn bản **còn hiệu lực**, chưa bị thay thế. Đối chiếu
      `quy-tac-chung/data/van-ban-can-cu.md` và bảng `van_ban` trong Nexus.
- [ ] Không có căn cứ nào **tự bịa** — không tìm được thì ghi `[...]` và hỏi.
- [ ] Chuỗi căn cứ đúng mô hình 2 cấp: Trung ương → Thành phố → Xã.
      **Không có cấp huyện.** Xuất hiện chữ "huyện Cần Giờ" là lỗi.

### C. Tên người, đơn vị, chức vụ

- [ ] Tên người ký, người trình, chức vụ khớp `profiles` trong Nexus và
      `quy-tac-chung/data/can-bo-phan-cong.md`.
- [ ] Tên đơn vị khớp `don_vi` — **luôn lọc `trang_thai = 'dang_hoat_dong'`**.
      Bỏ điều kiện này sẽ trả về cả đơn vị đã giải thể.
- [ ] Nhiệm vụ giao đúng chức năng đơn vị — đối chiếu
      `quy-tac-chung/data/don-vi-chuc-nang.md`. Không giao việc sai phòng.
- [ ] Số ấp: **8 ấp** từ 01/7/2026. Riêng **Tổ CNSCĐ vẫn 12 tổ** theo địa bàn
      ấp cũ vì chưa kiện toàn — con số 12 ở chỗ nói về Tổ CNSCĐ là **đúng**.

### D. Thể thức và cách viết

- [ ] Thể thức theo `the-thuc-van-ban` (căn lề, font, cỡ chữ, nơi nhận, ký).
- [ ] **Viết tắt:** file Word và văn bản chính thức mặc định **không viết tắt**,
      trừ khi Hiếu đã xác nhận rõ. Xem mục CỐT LÕI của `quy-tac-chung`.
- [ ] Dấu gạch ngang dùng dấu ngắn có cách ` - `, không dùng — hay –.
- [ ] Không có nội dung chung chung không giao được việc; không có nhiệm vụ
      thiếu đơn vị chủ trì.

### E. Liên đới nội dung

- [ ] Mỗi chỉ tiêu có nhiệm vụ tương ứng; mỗi nhiệm vụ phục vụ ít nhất một
      chỉ tiêu. Chi tiết: `cdso-kehoach/references/lien-ket-ct-nv-sl.md`.
- [ ] Sửa một phần đã kéo theo rà soát phần liên quan chưa (phụ lục, phân
      công, kết quả, minh chứng).
- [ ] **Cột giải trình:** bản trình lãnh đạo thì phải có; **bản phát hành
      chính thức thì phải đã xóa**.

### F. Tính nhất quán nội bộ

- [ ] Ngày tháng trong bản thảo nhất quán (ngày ký, ngày báo cáo, kỳ số liệu).
- [ ] Số hiệu văn bản dẫn chiếu lặp lại giữa các mục có khớp nhau.
- [ ] Tên gọi một đối tượng dùng thống nhất từ đầu đến cuối.
- [ ] Không còn chỗ giữ chỗ `[...]`, `XXX`, `(bổ sung sau)` sót lại.

---

## BƯỚC 3 — Xuất bản kiểm

Trả về đúng 3 phần, không thêm lời dẫn:

**Phần 1 — Bảng phán quyết**

| Nhóm | Phán quyết | Số điểm cần xử lý |
|---|---|---|
| A. Số liệu | ĐẠT / SỬA / KHÔNG KIỂM ĐƯỢC | ... |
| B. Căn cứ pháp lý | ... | ... |
| ... | | |

**Phần 2 — Chi tiết từng điểm**

Mỗi điểm ghi 3 dòng, không diễn giải dài:
```
Vị trí:  mục II.2, dòng "tỷ lệ hồ sơ trực tuyến đạt 87%"
Vấn đề:  không có nguồn và không có thời điểm
Cần làm: xác nhận nguồn (Nexus so_lieu hay báo cáo bộ phận HCC) + kỳ số liệu
```

**Phần 3 — Không kiểm được**

Liệt kê thẳng: kiểm được cái gì, không kiểm được cái gì, vì sao (thiếu quyền
truy cập, thiếu file gốc, Hiếu chưa cung cấp). **Không bỏ trống phần này** —
để trống nghĩa là mọi thứ đã kiểm được, phải đúng như vậy mới ghi.

---

## ĐỊNH NGHĨA "KIỂM XONG"

- Cả 6 nhóm A–F đều có phán quyết riêng, không nhóm nào bị bỏ qua.
- Mỗi điểm `SỬA` có đủ 3 dòng: vị trí, vấn đề, cần làm.
- Phần 3 đã liệt kê đúng những gì không kiểm được.
- Không tự sửa bất kỳ chữ nào trong bản thảo.

Chưa đủ 4 điều trên thì **chưa được báo là đã kiểm xong**.

---

## LƯU Ý

- Bản kiểm này không thay được người có thẩm quyền duyệt. Nó chỉ chặn lỗi
  máy móc và lỗi nguồn — không phán xét chủ trương.
- Nếu bản thảo quá dài, kiểm theo từng phần nhưng **phải kiểm nhóm F trên
  toàn văn**, vì mâu thuẫn nội bộ chỉ lộ ra khi đọc hết.
- Kiểm xong mà Hiếu sửa lại thì **bản sửa phải kiểm lại từ đầu** ở đoạn chat
  mới. Bản kiểm cũ không còn hiệu lực cho bản mới.
