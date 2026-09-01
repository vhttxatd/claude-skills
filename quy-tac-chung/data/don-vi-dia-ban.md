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

### Diện tích — số hộ — nhân khẩu

> Nexus `don_vi` chưa có 3 cột này nên tạm giữ tại đây.
> Số liệu gốc: dân số 01/01/2026, cộng dồn theo bảng hình thành ở trên.

| Ấp | Diện tích (ha) | Số hộ | Nhân khẩu |
|---|---|---|---|
| Quảng Xuyên | 60,68 | 725 | 2.479 |
| An Bình | 70,55 | 798 | 2.363 |
| An Đông | 2.480,26 | 812 | 4.431 |
| Rạch Lá | 801,05 | 834 | 3.092 |
| Doi Lầu | 6.450,33 | 802 | 3.034 |
| Lý Hòa Hiệp | 2.219,49 | 770 | 2.588 |
| Lý Thái Bửu | **chưa có** | **chưa có** | **chưa có** |
| Lý Nhơn | **chưa có** | **chưa có** | **chưa có** |

> **Không tự suy đoán 2 dòng trống.** Ấp Lý Thái Bửu (cũ) — 386,30 ha /
> 416 hộ / 1.482 khẩu — bị chia cho hai ấp mới, tỉ lệ chia không có trong
> bất kỳ nguồn nào. Khi cần số của 2 ấp này, hỏi Hiếu, không ước lượng.
> Tổng toàn xã cũng chưa cộng lại được vì lý do trên.

---

## Danh mục trường học (sau sắp xếp, hiệu lực 01/9/2026)

Từ 10 trường còn **6 trường**:

| STT | Trường | Cấp | Hình thành từ |
|---|---|---|---|
| 1 | Mầm non An Thới Đông | Mầm non | giữ nguyên |
| 2 | Mầm non Lý Nhơn | Mầm non | MN Lý Nhơn + MN Doi Lầu |
| 3 | Tiểu học An Thới Đông | Tiểu học | TH An Thới Đông + TH Doi Lầu |
| 4 | Tiểu học Lý Nhơn | Tiểu học | TH Lý Nhơn + TH Vàm Sát |
| 5 | THCS An Thới Đông | THCS | THCS An Thới Đông + một phần THCS Doi Lầu |
| 6 | THCS Lý Nhơn | THCS | THCS Lý Nhơn + một phần THCS Doi Lầu |

**Trường giải thể từ 01/9/2026:** MN Doi Lầu, TH Doi Lầu, TH Vàm Sát, THCS Doi Lầu.

> **Chưa có trong file này, cần bổ sung khi có nguồn văn bản:**
> - Địa bàn ấp và phạm vi phục vụ của 6 trường (bảng cũ dùng tên ấp cũ,
>   đã bỏ vì không ánh xạ được sau khi 4 trường giải thể)
> - Danh sách hiệu trưởng / phó hiệu trưởng — thuộc dữ liệu nhân sự,
>   nơi lưu đúng là Nexus `profiles`, không phải file này
>
> **Trạng thái trong Nexus:** `don_vi` mới có 3 trường THCS (C2ATD, C2DL,
> C2LN), chưa có mầm non và tiểu học; C2DL đã giải thể nhưng bảng `don_vi`
> chưa có cột trạng thái để đánh dấu. Khi Nexus đủ 6 trường, chuyển bảng
> trên thành con trỏ giống phần ấp.
