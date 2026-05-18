---
name: tri-thuc-dia-phuong
description: >
  Tri thức nền về xã An Thới Đông — hiện trạng, định hướng, tiềm năng theo
  lĩnh vực. Dùng chung cho mọi hội thoại cần số liệu, chỉ tiêu, đặc điểm
  địa phương. Phân biệt với quy-tac-chung (dữ liệu tác nghiệp: cán bộ, viết
  tắt, căn cứ pháp lý).
---

# Tri thức địa phương — Xã An Thới Đông

Skill này cung cấp **tri thức nền** về xã: hiện trạng KT-XH, định hướng phát
triển, tiềm năng lĩnh vực. Không chứa quy trình, không chứa biểu mẫu — chỉ
dữ liệu để các skill khác tra cứu.

---

## PHÂN BIỆT VỚI SKILL KHÁC

| Skill | Chứa gì |
|---|---|
| `quy-tac-chung` | Cán bộ, ấp, viết tắt, căn cứ pháp lý — **dữ liệu tác nghiệp** |
| `tri-thuc-dia-phuong` | Chỉ tiêu, hiện trạng lĩnh vực, tiềm năng — **tri thức nền** |
| `the-thuc-van-ban` | Định dạng, code docx-js — **kỹ thuật soạn thảo** |

Khi cần tên người ký, số hiệu văn bản căn cứ → đọc `quy-tac-chung`.
Khi cần số liệu 8,4%/năm, diện tích nuôi tôm CNC → đọc `tri-thuc-dia-phuong`.

---

## CẤU TRÚC 3 LỚP

```
L1 — Cấp xã (vĩ mô)
└── L1-tong-quan-xa.md

L2 — Cấp Phòng
├── L2-phong-vh-xh.md       ← Phòng của Hiếu
├── L2-phong-kinh-te.md
└── L2-vp-ubnd.md

L3 — Theo lĩnh vực chuyên môn
├── L3-linh-vuc-ha-tang.md        ← Quy hoạch, giao thông
├── L3-linh-vuc-nong-nghiep.md
├── L3-linh-vuc-thuy-san.md
├── L3-linh-vuc-muoi.md
├── L3-linh-vuc-du-lich.md
├── L3-linh-vuc-thuong-mai.md
├── L3-linh-vuc-tieu-thu-cn.md
├── L3-linh-vuc-cds-khcn.md       ← Lĩnh vực Hiếu phụ trách
└── L3-linh-vuc-nhan-luc.md
```

**Quy tắc đọc để tiết kiệm context:**
- Chỉ đọc file cần thiết cho câu hỏi hiện tại, không đọc hết.
- Báo cáo CĐS → L1 + L3-cds-khcn (không cần L2).
- Báo cáo tổng thể Phòng VH-XH → L1 + L2-phong-vh-xh.
- Tra cứu nhanh 1 chỉ tiêu → chỉ file L3 tương ứng.

---

## PHÂN LOẠI THEO TRẠNG THÁI (bắt buộc trong mỗi file L3)

Mỗi file L3 chia 3 phần cố định:

| Nhãn | Ý nghĩa | Ví dụ |
|---|---|---|
| `[A] HIỆN TRẠNG` | Sự kiện, số liệu đã xảy ra — kiểm chứng được | "12 ấp, 43 thành viên Tổ CNSCĐ" |
| `[B] ĐỊNH HƯỚNG` | Chỉ tiêu đã văn bản hóa (NQ, KH) | "Tăng trưởng 8,4%/năm" |
| `[C] TIỀM NĂNG` | Cơ hội, đề xuất chưa văn bản hóa | "Nuôi Geloina expansa" |

**Không trộn lẫn 3 nhóm.** Khi Claude trả lời, phải nêu rõ nhóm:
- "Theo định hướng KH 1583, xã phấn đấu đạt 8,4%/năm" (KHÔNG viết "xã đang đạt 8,4%").

---

## QUY TẮC METADATA NGUỒN

Mỗi dòng dữ liệu quan trọng gắn footnote `^[MÃ-NGUỒN]`.
Cuối mỗi file có khối `<!-- NGUỒN -->` tập trung mọi trích dẫn.

Xem chi tiết: `data/_metadata.md`

---

## NGUYÊN TẮC SỬ DỤNG

1. **Không ghi nhớ cứng** — mỗi lần cần dữ liệu, đọc lại file (vì có thể đã cập nhật).
2. **Ưu tiên file này** hơn training data của Claude về An Thới Đông.
3. **Thiếu dữ liệu** — để `[...]` và hỏi, không tự bịa.
4. **Khi Hiếu cung cấp số liệu mới** — đề xuất cập nhật file nào, chờ xác nhận rồi mới sửa.
5. **Phải ghi nguồn** — không thêm dữ liệu mới nếu không biết nguồn. Nếu là ghi chú nội bộ của Hiếu, dùng mã `[HIẾU-NOTE-YYYYMM]`.

---

## QUY TRÌNH CẬP NHẬT

Khi có văn bản mới (KH, NQ, BC...):

1. Xác định file L3 nào liên quan (có thể nhiều file).
2. Tạo mã nguồn mới: `[KH<số>]`, `[NQ<số>]`, `[BC<số>]`...
3. Trích xuất dữ liệu → phân vào `[A]/[B]/[C]` tương ứng.
4. Thêm dòng mới vào file L3 kèm `^[mã nguồn]`.
5. Bổ sung mục ở `<!-- NGUỒN -->` với đầy đủ: số hiệu, ngày, trích yếu, ngày cập nhật vào hệ thống.
6. Cập nhật dòng "Cập nhật gần nhất" ở đầu file.

---

## ĐÓNG GÓI

Sau khi sửa bất kỳ file nào trong skill này, đóng gói lại `.skill` và xuất ra
`/mnt/user-data/outputs/` để Hiếu cập nhật vào hệ thống.
Không cần đóng gói skill khác vì skill này độc lập với các skill soạn thảo.
