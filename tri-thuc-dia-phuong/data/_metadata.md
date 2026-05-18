# Schema & Quy tắc metadata

File này quy định cách ghi dữ liệu và nguồn trong tất cả file L1/L2/L3.
**Luôn đọc file này trước khi thêm/sửa dữ liệu vào bất kỳ file nào khác.**

---

## CẤU TRÚC CHUẨN CỦA MỘT FILE L3

```markdown
# L3 — [Tên lĩnh vực]
> Cập nhật gần nhất: YYYY-MM-DD | Nguồn chính: [tên văn bản]
> Phòng phụ trách: [tên phòng] | Chuyên viên: [nếu có]

## [A] HIỆN TRẠNG
- Điểm dữ liệu 1 ^[MÃ-NGUỒN]
- Điểm dữ liệu 2 ^[MÃ-NGUỒN]

## [B] ĐỊNH HƯỚNG (giai đoạn ... )
- Chỉ tiêu 1 ^[MÃ-NGUỒN]
- Chỉ tiêu 2 ^[MÃ-NGUỒN]

## [C] TIỀM NĂNG
- Đề xuất 1 ^[MÃ-NGUỒN]
- Đề xuất 2 ^[MÃ-NGUỒN]

## [D] NHIỆM VỤ ĐƯỢC GIAO (tùy chọn — chỉ nếu Phòng của Hiếu chủ trì)
- Nhiệm vụ cụ thể ^[MÃ-NGUỒN]

<!-- NGUỒN -->
[MÃ-NGUỒN]: Mô tả đầy đủ văn bản | Cập nhật vào hệ thống: YYYY-MM-DD
```

---

## QUY TẮC ĐẶT MÃ NGUỒN

| Loại nguồn | Mã | Ví dụ |
|---|---|---|
| Kế hoạch | `[KH<số>]` | `[KH1583]` |
| Nghị quyết | `[NQ<số>]` | `[NQ13-DU]`, `[NQ12-TU]` |
| Quyết định | `[QD<số>]` | `[QD2435]` |
| Báo cáo | `[BC<số>]` | `[BC05-Q1-26]` |
| Công văn | `[CV<số>]` | `[CV4800-SKHCN]` |
| Thông tư, NĐ | `[TT<số>]`, `[ND<số>]` | `[TT01-2022]`, `[ND15-2020]` |
| Ghi chú nội bộ Hiếu | `[HIẾU-NOTE-YYYYMM]` | `[HIẾU-NOTE-202603]` |
| Chỉ đạo miệng, cuộc họp | `[HỌP-YYYYMMDD]` | `[HỌP-20260415]` |

**Nguyên tắc:** Mã phải **ngắn, duy nhất, dễ nhớ**. Ưu tiên số hiệu gốc của
văn bản. Tránh trùng — nếu có 2 KH cùng số, thêm năm: `[KH1583-2026]`.

---

## NỘI DUNG BẮT BUỘC CỦA MỤC NGUỒN

Mỗi mã nguồn trong khối `<!-- NGUỒN -->` phải đủ 4 yếu tố:

1. **Số/ký hiệu**
2. **Ngày ban hành**
3. **Cơ quan ban hành**
4. **Trích yếu** (tóm tắt ngắn)

Thêm 1 trường quản trị:
- **Cập nhật vào hệ thống:** YYYY-MM-DD (ngày dữ liệu này được đưa vào file)

Ví dụ chuẩn:

```
[KH1583]: KH 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông —
Phát triển kinh tế trên địa bàn xã GĐ 2026-2030 | Người ký: CT Trần Hoàng Vũ
| Cập nhật vào hệ thống: 2026-04-24
```

Ví dụ ghi chú nội bộ:

```
[HIẾU-NOTE-202603]: Ghi chú nội bộ của Hiếu — đề xuất nhiệm vụ KHCN
thủy sản (Geloina expansa, Magallana ariakensis) | Cập nhật: 2026-03-15
```

---

## QUY TẮC PHÂN LOẠI [A]/[B]/[C]/[D]

### [A] HIỆN TRẠNG — sự kiện đã xảy ra
- Có **con số cụ thể** đã được thống kê
- Hoặc **trạng thái hiện tại** có thể kiểm chứng bằng thực tế
- Động từ điển hình: "có", "gồm", "đang", "đã"

Ví dụ đúng:
- "Xã có 12 ấp" ✓
- "100% hộ sản xuất muối kết tinh trên ruộng trải bạt" ✓ (là trạng thái hiện tại)

Ví dụ SAI (phải chuyển sang [B]):
- "Đạt 8,4%/năm" — đây là chỉ tiêu → [B]

### [B] ĐỊNH HƯỚNG — đã văn bản hóa thành chỉ tiêu
- Có **văn bản phê duyệt** (NQ, KH, QĐ)
- Có **mốc thời gian** cụ thể
- Động từ điển hình: "phấn đấu", "đến năm...", "đạt", "duy trì"

Ví dụ đúng:
- "Phấn đấu đến 2030 đạt 8,4%/năm" ^[KH1583] ✓
- "Duy trì 100% hộ sản xuất muối trên ruộng trải bạt" ^[KH1583] ✓

### [C] TIỀM NĂNG — chưa văn bản hóa
- Đề xuất, ý tưởng, cơ hội **chưa có chỉ tiêu cứng**
- Có thể là từ nghiên cứu, họp, ghi chú cá nhân
- Động từ điển hình: "có thể", "đề xuất", "nghiên cứu"

Ví dụ đúng:
- "Đề xuất nuôi Geloina expansa" ^[HIẾU-NOTE-202603] ✓

### [D] NHIỆM VỤ ĐƯỢC GIAO — chỉ khi Phòng của Hiếu chủ trì
- Nhiệm vụ cụ thể mà **Phòng VH-XH** hoặc **chuyên viên KHCN-CĐS** được giao
- Giúp Hiếu tra cứu ngay "mình phải làm gì"

Ví dụ:
- "Phòng VH-XH chủ trì triển khai Kế hoạch phát triển du lịch sinh thái đến 2030" ^[KH1583] ✓

---

## KHI DỮ LIỆU THAY ĐỔI

**Không xóa dữ liệu cũ** — đánh dấu và chú thích:

```markdown
- ~~Tăng trưởng 7,5%/năm~^[NQ12-TU-CŨ]~~ → **Tăng trưởng 8,4%/năm** ^[KH1583]
```

Giúp giữ lịch sử điều chỉnh chỉ tiêu, quan trọng khi làm báo cáo tổng kết
giai đoạn cần đối chiếu chỉ tiêu cũ — mới.

Nếu dữ liệu cũ quá nhiều gây rối, tạo mục `## [Z] LỊCH SỬ` ở cuối file.

---

## XỬ LÝ DỮ LIỆU MÂU THUẪN

Khi 2 văn bản nói khác nhau về cùng một chỉ tiêu:

1. **Ưu tiên văn bản mới hơn** (theo ngày ban hành).
2. Giữ cả 2 dòng, văn bản cũ đưa xuống `[Z] LỊCH SỬ`.
3. Nếu cùng ngày — ưu tiên cấp cao hơn (TU > UBND TP > UBND xã).
4. Nếu không rõ — **dừng, hỏi Hiếu** trước khi chọn.

---

## CHECKLIST KHI THÊM DỮ LIỆU MỚI

Trước khi commit, kiểm tra:

- [ ] Đã gán đúng nhóm `[A]/[B]/[C]/[D]`?
- [ ] Có footnote `^[MÃ-NGUỒN]`?
- [ ] Mã nguồn đã có mục ở `<!-- NGUỒN -->`?
- [ ] Mục nguồn có đủ 4 yếu tố + ngày cập nhật?
- [ ] Đã cập nhật dòng "Cập nhật gần nhất" ở đầu file?
- [ ] Không mâu thuẫn với dữ liệu đã có?
