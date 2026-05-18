# Biểu mẫu: QĐ Phê duyệt Dự toán mua sắm và KHLCNT

> Căn cứ: Mẫu 02B — Thông tư 79/BTC
> Giai đoạn: II.4
> Cập nhật: 08/04/2026 — Áp dụng thống nhất cho MỌI trường hợp

---

## PHÂN BIỆT THEO QUY MÔ

### Dưới 500tr — 1 QĐ duy nhất
- **Đơn vị ký:** Chủ đầu tư (Phòng VH-XH)
- **Ký hiệu:** .../QĐ-VHXH
- **Nội dung:** Phê duyệt cả Dự toán mua sắm VÀ KHLCNT trong 1 QĐ
- **Phụ lục:** 2 phụ lục ở 2 trang riêng (section mới)

### Từ 500tr trở lên — 2 QĐ riêng biệt

**QĐ 1 — UBND xã phê duyệt Dự toán mua sắm:**
- **Đơn vị ký:** UBND xã — ký hiệu .../QĐ-UBND
- **Phụ lục 1:** Dự toán chi tiết (trang đứng riêng)

**QĐ 2 — Chủ đầu tư phê duyệt KHLCNT:**
- **Đơn vị ký:** Phòng VH-XH — ký hiệu .../QĐ-VHXH
- **Căn cứ thêm:** QĐ 1 của UBND xã về phê duyệt dự toán
- **Phụ lục 2:** Bảng KHLCNT (trang ngang riêng)

---

## CẤU TRÚC VĂN BẢN — BẮT BUỘC ÁP DỤNG THỐNG NHẤT

### Phần QĐ chính (Section 1 — trang đứng)

```
[Tiêu đề — theo the-thuc-van-ban]
Ký hiệu: .../QĐ-VHXH

QUYẾT ĐỊNH
Về phê duyệt Dự toán mua sắm và Kế hoạch lựa chọn nhà thầu
"[Tên gói thầu]"
————————————————————————————————
TRƯỞNG PHÒNG VĂN HÓA - XÃ HỘI XÃ AN THỚI ĐÔNG

Căn cứ ...;
[Căn cứ pháp lý theo thứ tự chuẩn]
Căn cứ QĐ phê duyệt NV & DT số .../QĐ-VHXH ngày ...;
Theo đề nghị của Công chức phụ trách lĩnh vực được giao,

QUYẾT ĐỊNH:

Điều 1. Phê duyệt Dự toán mua sắm "[Tên gói thầu]" với nội dung như sau:
    1. Tên gói thầu: [...]
    2. Chủ đầu tư: Phòng Văn hóa - Xã hội xã An Thới Đông.
    3. Giá gói thầu: [...] đồng ([...] đồng).
    4. Nguồn vốn: [...]
    5. Thời gian thực hiện: [...]
    (Chi tiết dự toán theo Phụ lục 1 đính kèm.)    ← căn giữa, in nghiêng

Điều 2. Phê duyệt Kế hoạch lựa chọn nhà thầu gói thầu "[Tên gói thầu]".
    (Chi tiết Kế hoạch lựa chọn nhà thầu theo Phụ lục 2 đính kèm.)  ← căn giữa, in nghiêng

Điều 3. Quyết định này có hiệu lực kể từ ngày ký. Phòng Văn hóa - Xã hội xã An Thới Đông chịu trách nhiệm tổ chức thực hiện lựa chọn nhà thầu theo đúng Kế hoạch được phê duyệt và các quy định pháp luật hiện hành. Công chức được giao phụ trách, bộ phận tài chính kế toán và các đơn vị liên quan chịu trách nhiệm thi hành Quyết định này./.

Nơi nhận:                          TRƯỞNG PHÒNG
- Như Điều 3;
- Thường trực UBND xã (để B/c);         [Ký, đóng dấu]
- Lãnh đạo phòng; Kế toán;
- Lưu: VT, Hiếu.                   Nguyễn Văn Chính
```

> **Lưu ý Điều 1:** Các khoản 1-5 thụt đầu dòng chuẩn (firstLine 720), KHÔNG dùng indent left.
> **Lưu ý nơi nhận:** KHÔNG có Phòng Kinh tế trong QĐ phê duyệt KHLCNT.

---

### Phụ lục 1 — Dự toán chi tiết (Section 2 — trang đứng MỚI)

**Tiêu đề:**
```
PHỤ LỤC 1
DỰ TOÁN CHI TIẾT GÓI THẦU
"[Tên gói thầu]"
(Đính kèm Quyết định số     /QĐ-VHXH ngày     tháng     năm 2026
của Phòng Văn hóa - Xã hội xã An Thới Đông)
```

**Bảng dự toán — 6 cột, tổng = contentW (9026 DXA):**

| Cột | Tên | Độ rộng | Căn chỉnh |
|---|---|---|---|
| 1 | STT | 400 | CENTER |
| 2 | Hàng hóa - Dịch vụ và Thông số kỹ thuật | 4026 | LEFT (có thụt 40) |
| 3 | ĐVT | 800 | CENTER |
| 4 | Số lượng | 600 | CENTER |
| 5 | Đơn giá | 1200 | RIGHT |
| 6 | Thành tiền | 2000 | RIGHT |

**Dòng cuối bảng:**
- Dòng tổng: colspan 5 → "Tổng cộng:" căn phải + ô thành tiền
- Dòng bằng chữ: colspan 6 → "(Bằng chữ: [Số tiền bằng chữ].)" — in nghiêng, chữ số tiền in đậm nghiêng

**Ký tên phụ lục:** Căn phải — "PHÒNG VĂN HÓA - XÃ HỘI XÃ AN THỚI ĐÔNG" (không ký tên cá nhân)

---

### Phụ lục 2 — KHLCNT (Section 3 — trang NGANG MỚI)

> **BẮT BUỘC theo mẫu quy định** — Phụ lục 2 Kế hoạch lựa chọn nhà thầu
> Trang ngang: width=16838, height=11906, margin 1134 DXA 4 phía
> contentW phụ lục ngang = 14570 DXA

**Tiêu đề:**
```
PHỤ LỤC 2
KẾ HOẠCH LỰA CHỌN NHÀ THẦU
Dự toán "[Tên gói thầu]"
(Đính kèm Quyết định số     /QĐ-VHXH ngày     tháng     năm 2026
của Phòng Văn hóa - Xã hội xã An Thới Đông)
```

**Bảng KHLCNT — 11 cột, tổng = 14570 DXA:**

| Cột | Tên | Độ rộng |
|---|---|---|
| 1 | STT | 500 |
| 2 | Chủ đầu tư | 1900 |
| 3 | Tên gói thầu + Tóm tắt công việc chính | 2900 |
| 4 | Giá gói thầu | 2200 |
| 5 | Nguồn vốn | 1500 |
| 6 | Hình thức lựa chọn nhà thầu | 1200 |
| 7 | Phương thức lựa chọn nhà thầu | 1200 |
| 8 | Thời gian tổ chức lựa chọn nhà thầu | 1000 |
| 9 | Thời gian bắt đầu tổ chức lựa chọn nhà thầu | 1000 |
| 10 | Loại hợp đồng | 800 |
| 11 | Thời gian thực hiện gói thầu | 370 |

**Cột 3 — Tên gói thầu:** Dòng 1 in đậm (tên gói), dòng 2 bình thường (tóm tắt công việc)
**Cột 4 — Giá gói thầu:** Căn phải, định dạng số có dấu chấm phân cách hàng nghìn

**Dòng cuối bảng:**
- colspan 3 → "Tổng giá gói thầu" căn phải
- Cột 4: tổng số tiền, in đậm
- colspan 7 → "(Bằng chữ: [...])" in nghiêng

**Ký tên phụ lục:** Căn phải — "PHÒNG VĂN HÓA - XÃ HỘI XÃ AN THỚI ĐÔNG"

---

## THÔNG TIN BẮT BUỘC

| Trường | Nguồn dữ liệu | Ghi chú |
|---|---|---|
| Tên gói thầu | `thong-tin-du-an.md` | — |
| Giá gói thầu | Kết quả TĐG (nhánh A/B) hoặc báo giá nhà cung cấp (nhánh C) | — |
| Hình thức LCNT | Chỉ định thầu rút gọn | Dưới 500tr |
| Nguồn vốn | `thong-tin-du-an.md` | — |
| Thời gian thực hiện HĐ | Người dùng cung cấp | — |
| Thời gian tổ chức LCNT | Mặc định 15 ngày | Theo quy định |
| Thời gian bắt đầu LCNT | Tháng/năm thực hiện | — |
| Loại hợp đồng | Trọn gói | Mặc định |
| Số QĐ phê duyệt NV & DT | `thong-tin-du-an.md` | Căn cứ II.1 |
| Danh mục hàng hóa chi tiết | Người dùng cung cấp | → Phụ lục 1 |

---

## NƠI NHẬN CHUẨN

```
- Như Điều 3;
- Thường trực UBND xã (để B/c);
- Lãnh đạo phòng; Kế toán;
- Lưu: VT, Hiếu.
```
> **KHÔNG có Phòng Kinh tế** trong QĐ phê duyệt KHLCNT.

---

## ĐĂNG CỔNG ĐẤU THẦU QUỐC GIA

Sau khi ký QĐ → đăng trên Cổng đấu thầu quốc gia trong **5 ngày làm việc**.
URL: https://muasamcong.mpi.gov.vn


### Căn cứ bổ sung bắt buộc
Căn cứ Luật Tổ chức chính quyền địa phương số 72/2025/QH16 ngày 15 tháng 6 năm 2025;
