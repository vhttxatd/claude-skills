---
name: bao-cao-hanh-chinh
description: Soạn báo cáo hành chính: định kỳ, đột xuất, KHCN-CĐS, DTI, thư điện tử.
---

> **Đọc tối thiểu:** SKILL.md này + `quy-tac-chung/SKILL.md` (phần cốt lõi). Chỉ mở thêm khi cần:
> - `quy-tac-chung/data/quy-tac-soan-thao.md` — khi xuất file hoặc dẫn chiếu văn bản
> - `quy-tac-chung/data/can-bo-phan-cong.md` — khi cần tên người ký
> - `the-thuc-van-ban/` — khi tới bước xuất .docx (đọc đúng file con cần dùng)
> - `mau/mau-...md` — chỉ mở mẫu của loại báo cáo đang soạn

## CẤU TRÚC SKILL

```
bao-cao-hanh-chinh/
  SKILL.md                   ← File này — tổng điều phối
  data/
    danh-muc-bao-cao.md      ← Danh mục + lịch tất cả loại BC
    quy-trinh-dot-xuat.md    ← Quy trình xử lý BC đột xuất
    theo-doi-tien-do.md      ← Trạng thái nộp BC các kỳ (cập nhật thủ công)
  mau/
    mau-khcn-cds.md          ← Mẫu + logic lọc BC KHCN-CĐS
    mau-dti.md               ← Mẫu BC DTI
    mau-thu-dien-tu.md       ← Mẫu BC tình hình thư điện tử
```

---

## QUY TRÌNH KHI NHẬN YÊU CẦU BÁO CÁO

### Bước 1 — Xác định loại báo cáo
Đọc `data/danh-muc-bao-cao.md` → xác định:
- Loại báo cáo (KHCN-CĐS / DTI / Thư điện tử / Đột xuất / Khác)
- Kỳ báo cáo (Quý I/II/III/IV / 6 tháng / 9 tháng / Năm)
- Nơi gửi (BCĐ xã + UBND TP / Sở KH&CN / ...)
- Hạn nộp

Nếu không rõ → hỏi: *"Báo cáo này thuộc loại nào và gửi cho ai?"*

### Bước 2 — Xác định chế độ lọc thời gian
Hỏi nếu chưa rõ:
> *"Báo cáo theo kỳ (riêng quý đó) hay lũy kế (cộng dồn từ đầu năm)?"*

| Chế độ | Ngày bắt đầu lọc | Ngày kết thúc |
|---|---|---|
| Kỳ báo cáo | Ngày đầu kỳ | Ngày cuối kỳ |
| Lũy kế | 01/01/năm | Ngày cuối kỳ |

### Bước 3 — Đọc mẫu tương ứng
- BC KHCN-CĐS → `mau/mau-khcn-cds.md`
- BC DTI → `mau/mau-dti.md`
- BC Thư điện tử → `mau/mau-thu-dien-tu.md`
- BC Đột xuất → `data/quy-trinh-dot-xuat.md`

### Bước 4 — Thu thập dữ liệu
Người dùng cung cấp dữ liệu qua:
- File Excel (ma trận theo dõi `2026_NoiDungBC_KHCN3.xlsx`)
- Dữ liệu nhập tay trong chat
- File đính kèm khác


### Bước 5 — Xác nhận định dạng báo cáo (BẮT BUỘC) → Soạn nội dung → Xác nhận chỉnh sửa

Trước khi bắt đầu soạn nội dung, hỏi người dùng:

---

**"Báo cáo này anh/chị muốn xuất theo định dạng nào?"**

**A. Định dạng có sẵn trong skill:**

| # | Tên | Mô tả ngắn | Phù hợp khi |
|---|---|---|---|
| 1 | Kiểu 1 — Phụ lục bảng | Thân ngắn 1-2 đoạn + bảng phụ lục nhiệm vụ/kết quả | BC tháng, BC nhanh, BC theo kế hoạch cụ thể |
| 2 | Kiểu 2 — Văn xuôi theo lĩnh vực | Thân là đoạn văn xuôi phân theo 5 lĩnh vực + phụ lục bảng | BC quý, 6T, 9T, năm; BC tổng hợp gửi cấp trên |
| 3 | Kiểu 3 — DTI | Theo bộ chỉ số DTI + bảng so sánh chỉ tiêu | BC DTI quý/năm gửi Sở KH&CN |
| 4 | Kiểu 4 — Thư điện tử | Thống kê hộp thư + bảng theo đơn vị | BC tình hình sử dụng thư điện tử công vụ |

**B. Theo đề cương riêng:**
> Anh/chị cung cấp đề cương (mục lục) → tôi đọc, liệt kê lại mục lục đầy đủ → anh/chị xác nhận hoặc bổ sung → mới bắt đầu soạn.

---

**Quy tắc xử lý câu trả lời:**

- Nếu chọn A (1/2/3/4) → đọc file mẫu tương ứng → soạn ngay
- Nếu chọn B → yêu cầu đề cương → sau khi nhận:
  1. Liệt kê lại mục lục đã hiểu
  2. Hỏi: *"Anh/chị xác nhận mục lục này chưa? Có mục nào cần thêm/bỏ/điều chỉnh không?"*
  3. Chờ xác nhận → mới bắt đầu soạn nội dung từng phần
- Nếu không rõ loại BC → gợi ý Kiểu 2 (phổ biến nhất cho BC quý/năm)


### Bước 6 — Xuất file Word
Chỉ xuất khi được xác nhận. Đọc `the-thuc-van-ban` trước khi code.
Lưu: `/mnt/user-data/outputs/BC-[loai]-[ky]-[nam].docx`

### Bước 7 — Cập nhật theo dõi tiến độ
Sau khi xuất → nhắc: *"Anh/chị đã nộp báo cáo chưa? Tôi cập nhật vào theo dõi."*
Cập nhật `data/theo-doi-tien-do.md`

---

## LIÊN KẾT SKILL KHÁC

- `quy-tac-chung` → cán bộ, đơn vị, viết tắt, văn bản căn cứ + **tất cả quy tắc chung**
- `the-thuc-van-ban` → định dạng, thể thức, code docx-js

**Phát sinh loại BC mới:**
Khi gặp yêu cầu BC chưa có trong danh mục → hỏi xác nhận → đề xuất thêm vào
`data/danh-muc-bao-cao.md` và tạo file mẫu mới trong `mau/`

---

### QUY TẮC BẢNG PHỤ LỤC — CỘT ĐÁNH GIÁ

Trong cột "Đánh giá" của bảng phụ lục, TUYỆT ĐỐI KHÔNG dùng biểu tượng/emoji:
❌ SAI: ✅ 🟡 ⏳ 🟢 🔄 ⚪ 🔴 ...

✔ ĐÚNG: Dùng chữ thuần túy, cụ thể:

| Thay vì | Dùng |
|---|---|
| ✅ Hoàn thành | Hoàn thành |
| 🟡 Đang thực hiện | Đang thực hiện |
| ⏳ Tiếp tục duy trì | Tiếp tục duy trì |
| 🟢 Đạt | Đạt |
| 🔄 Tiếp tục thực hiện | Tiếp tục thực hiện |
| ⚪ Đang xây dựng | Đang xây dựng |
| 🔴 Chưa thực hiện | Chưa thực hiện |

Quy tắc này áp dụng cho MỌI bảng phụ lục trong tất cả loại báo cáo.
Trong phần thân văn bản (không phải bảng), không dùng emoji ở bất kỳ đâu.
