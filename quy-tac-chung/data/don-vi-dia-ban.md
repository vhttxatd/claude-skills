# Thông tin đơn vị và địa bàn — Xã An Thới Đông

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: NQ 20/NQ-HĐND ngày 22/6/2026 (8 ấp, hiệu lực 01/7/2026) + QĐ sắp xếp trường học hiệu lực 01/9/2026 · ra_soat_lai: 2026-12-01 · rui_ro: cao

## Thông tin đơn vị

| Thông tin | Nội dung |
|---|---|
| Tên đơn vị đầy đủ | Xã An Thới Đông, Thành phố Hồ Chí Minh |
| Cấp hành chính | Xã trực thuộc UBND Thành phố Hồ Chí Minh (mô hình 2 cấp — không còn cấp huyện) |
| Địa chỉ trụ sở | [Số nhà, tên đường, xã An Thới Đông, TP.HCM] |
| Điện thoại | [Số điện thoại UBND xã] |
| Email công vụ | [Email chính thức] |

---

## Danh mục 8 ấp

> **KHÔNG lưu tên trưởng ấp và số điện thoại trong file này.**
> Chủ sở hữu dữ liệu là Nexus (xem `quy-tac-tri-nho.md`, lớp D).
> Tra bằng:
> ```sql
> SELECT dv.thu_tu, dv.ten_don_vi, p.ho_ten, p.dien_thoai
> FROM don_vi dv
> JOIN profiles p ON p.don_vi_id = dv.id AND p.chuc_vu ILIKE '%Trưởng ấp%'
> WHERE dv.ten_don_vi ILIKE 'Ấp %'
> ORDER BY dv.thu_tu;
> ```
> Project Supabase: `zkgtrdrvlppyxusgzjnz`.
> Lý do tách: bản sao danh sách trưởng ấp giữ trong skill đã sai 4/8 người
> và tồn tại suốt tháng 7–8/2026 mà không ai phát hiện.

Thứ tự và mã đơn vị theo Nexus `don_vi`:

| STT | Ấp | Mã | Hình thành từ (NQ 20, 01/7/2026) |
|---|---|---|---|
| 1 | Quảng Xuyên | QX | giữ nguyên |
| 2 | An Bình | AB | giữ nguyên |
| 3 | An Đông | AD | giữ nguyên |
| 4 | Rạch Lá | RL | Tắc Ráng + Rạch Lá (cũ) |
| 5 | Doi Lầu | DL | Doi Lầu + Cá Cháy (cũ) |
| 6 | Lý Hòa Hiệp | LHH | Vàm Sát + Lý Hòa Hiệp (cũ) |
| 7 | Lý Thái Bửu | LTB | Dương Văn Hạnh + một phần Lý Thái Bửu (cũ) |
| 8 | Lý Nhơn | LN | phần còn lại Lý Thái Bửu (cũ) + Lý Nhơn (cũ) |

**Ấp không còn tồn tại từ 01/7/2026:** Tắc Ráng, Cá Cháy, Vàm Sát, Dương Văn Hạnh.
Nếu gặp 4 tên này trong văn bản cũ, ánh xạ theo bảng trên.

### Diện tích — số hộ — nhân khẩu → TRA NEXUS

> Đã chuyển sang Nexus `don_vi` ngày 01/9/2026 (cột `dien_tich_ha`, `so_ho`,
> `nhan_khau`). **Không chép ngược số liệu vào file này.**

```sql
SELECT ten_don_vi, dien_tich_ha, so_ho, nhan_khau
FROM don_vi WHERE ten_don_vi ILIKE 'Ấp %' ORDER BY thu_tu;
```

> **Ấp Lý Thái Bửu và Lý Nhơn đang NULL trong Nexus — đó là cố ý.** Ấp Lý
> Thái Bửu (cũ) — 386,30 ha / 416 hộ / 1.482 khẩu — bị chia cho hai ấp mới,
> tỉ lệ chia không có trong bất kỳ nguồn nào. Gặp NULL thì **hỏi Hiếu, không
> ước lượng**. Tổng toàn xã cũng chưa cộng lại được vì lý do trên.

---

## Danh mục trường học → TRA NEXUS

> Nexus `don_vi` đã có đủ 10 trường và đã đánh dấu trạng thái ngày 01/9/2026.
> **Không lưu danh sách trường trong file này.**

```sql
SELECT ma_don_vi, ten_don_vi FROM don_vi
WHERE ten_don_vi ILIKE 'Trường%' AND trang_thai = 'dang_hoat_dong'
ORDER BY ma_don_vi;
```

> **LUÔN lọc `trang_thai = 'dang_hoat_dong'`.** Bỏ điều kiện này sẽ trả về
> 10 trường thay vì 6 — 4 trường đã giải thể vẫn nằm trong bảng để giữ lịch
> sử, không xóa.

### Ánh xạ khi gặp tên trường cũ trong văn bản

Giữ tại đây vì là dữ kiện lịch sử cố định, Nexus không có cột tương ứng:

| Trường đã giải thể (01/9/2026) | Sáp nhập về |
|---|---|
| MN Doi Lầu | MN Lý Nhơn |
| TH Doi Lầu | TH An Thới Đông |
| TH Vàm Sát | TH Lý Nhơn |
| THCS Doi Lầu | chia đôi cho THCS An Thới Đông và THCS Lý Nhơn |

> **Còn thiếu, bổ sung khi có nguồn văn bản:**
> - Số hiệu quyết định sắp xếp → ghi vào `don_vi.can_cu_sap_xep`
> - Địa bàn ấp và phạm vi phục vụ của 6 trường
> - Hiệu trưởng / phó hiệu trưởng → thuộc Nexus `profiles`, không phải file này
