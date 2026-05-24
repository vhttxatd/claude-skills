# NEXUS Gov — SCHEMA REFERENCE

> **Phiên bản:** Schema V4 (dọn sạch 23/05/2026)
> **Base ID:** `appJhjI3TCfnmkpeo`
> **Dùng cho:** AI assistant tra cứu nhanh cấu trúc bảng khi thao tác Airtable MCP.

---

## TỔNG QUAN

```
┌─────────────┐     ┌──────────┐     ┌──────────┐
│   VanBan    │◄────│ ChiTieu  │     │ SoLieu   │
│  (VB gốc)   │◄────│ (đo KQ)  │────►│ (chỉ số) │
└──────┬──────┘     └──────────┘     └────┬─────┘
       │                                   │
       │            ┌──────────┐     ┌─────┴──────┐
       ├───────────►│ NhiemVu  │     │CapNhatSL   │
       │            │ (việc)   │     │(giá trị/kỳ)│
       │            └────┬─────┘     └────────────┘
       │                 │
       │            ┌────┴─────┐     ┌──────────┐
       │            │CongViecCon│     │KetQua_NV │
       │            │(phân rã)  │◄────│(BC kết quả)│
       │            └──────────┘     └──────────┘
       │
  ┌────┴────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐
  │ DonVi   │   │LinhVuc  │   │NhomSoLieu│   │NguoiDung │
  │(danh mục)│   │(danh mục)│   │(danh mục) │   │(tài khoản)│
  └─────────┘   └─────────┘   └──────────┘   └──────────┘
```

---

## BẢNG DỮ LIỆU CHÍNH

### 1. VanBan (`tblW7UZRpEiTBxc4E`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaVB | text | ✅ | Format: `yymmdd_LoaiVB+SốVB_CQBH`. VD: `241222_NQ57-TW` |
| TenVB | text | ✅ | Tên gợi nhớ |
| SoKyHieu | text | ✅ | Số ký hiệu gốc |
| LoaiVB | singleSelect | ✅ | Nghị quyết / Kế hoạch / Quyết định / Thông báo / Khác |
| CapBanHanh | singleSelect | ✅ | Trung ương / Tỉnh/TP / Xã / Cấp khác |
| CoQuanBanHanh | singleSelect | | VD: Ban chấp hành TW, UBND TP, UBND Xã... |
| NgayBanHanh | date | | YYYY-MM-DD |
| NgayHetHieuLuc | date | | Để trống nếu chưa có |
| TrichYeu | text | ✅ | Nội dung trích yếu |
| TrangThai | singleSelect | | Đang hiệu lực / Hết hiệu lực / Tạm dừng |
| FileVanBan | url | | Link Google Drive |
| MoTa | text | | Ghi chú thêm |
| ChiTieu | linkedRecord (reverse) | — | Tự sinh |
| NhiemVu | linkedRecord (reverse) | — | Tự sinh |

### 2. ChiTieu (`tblvztIhs31hNk9jn`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaChiTieu | formula | — | Tự sinh, KHÔNG nhập |
| TenChiTieu | text | ✅ | Nội dung chỉ tiêu |
| MaVanBan | linked → VanBan | ✅ | `["recordId"]` |
| GiaTriMucTieu | number | | Giá trị số cần đạt |
| DonViMucTieu | text | | %, trạm, người... |
| MocThoiGian | date | | Deadline |
| LoaiMocThoiGian | singleSelect | | Cụ thể / Trong năm / Đến năm... |
| MucDoUuTien | singleSelect | | Cao / Trung bình / Thấp |
| TrangThai | singleSelect | | Đang TH / Đạt / Chưa đạt / Đã hủy |
| ChuTriChinh | linked → DonVi | | Đơn vị chủ trì |
| ChuTriPhu | text | | Đơn vị chủ trì phụ (**text**, không linked) |
| DonViPhoiHop | text | | Đơn vị phối hợp (**text**, không linked) |
| NguoiPhuTrach | linked → NguoiDung | | |
| LucLuongHoTro | multiSelect | | |
| LinhVuc | linked → LinhVuc | | |
| MaSoLieu_LK | linked → SoLieu | | Gán ở Bước 5 |
| MoTa | text | | |
| GhiChu | text | | |

### 3. NhiemVu (`tblajLASODeiV758B`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaNhiemVu | text | ✅ | Format: `NV-{VB viết gọn}-{số}` |
| TenNhiemVu | text | ✅ | Nội dung nhiệm vụ |
| MaVanBan | linked → VanBan | ✅ | `["recordId"]` |
| DonViChuTri | linked → DonVi | | |
| DonViPhoiHop | linked → DonVi | | |
| ThoiHan | date | | |
| MucDoUuTien | singleSelect | | Cao / Trung bình / Thấp |
| TrangThai | singleSelect | | Chưa BĐ / Đang TH / Hoàn thành / Tạm dừng / Đã hủy |
| TienDo | number | | 0-100 |
| LinhVuc | linked → LinhVuc | | |
| SoLieu | linked (reverse) | — | Tự sinh |
| CongViecCon | linked → CongViecCon | | |
| KetQua_NV | linked (reverse) | — | Tự sinh |
| MoTa | text | | |
| GhiChu | text | | |

### 4. SoLieu (`tblbkdViU3KqHPZLR`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaSL | formula | — | Tự sinh |
| TenSoLieu | text | ✅ | |
| NhomSoLieu | linked → NhomSoLieu | | |
| DVT | text | | Đơn vị tính |
| KyDoMacDinh | singleSelect | | Tháng / Quý / Năm / Đột xuất |
| DonViChuTri | linked → DonVi | | |
| LinhVuc | linked → LinhVuc | | |
| NguonDuLieu | text | | |
| TrangThai | singleSelect | | Đang dùng / Ngừng theo dõi |
| ChiTieu | linked (reverse) | — | |
| CapNhatSoLieu | linked (reverse) | — | |
| NhiemVu | linked (reverse) | — | |
| GhiChu | text | | |
| MoTa | text | | |

### 5. CapNhatSoLieu (`tblJeI9a8kcHjnOhM`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaCNSL | formula | — | Tự sinh |
| SoLieu | linked → SoLieu | ✅ | |
| KyBaoCao | singleSelect | | Tháng / Quý / Năm / Đột xuất |
| KySo | number | | 1-12 hoặc 1-4 |
| NamBaoCao | number | | 2026... |
| GiaTri | number | ✅ | Giá trị thực tế |
| NgayCapNhat | date | | |
| NguoiCapNhat | linked → NguoiDung | | |
| TrangThaiKiemDinh | singleSelect | | Chờ duyệt / Đã duyệt / Từ chối |
| NguoiDuyet | text | | |
| NgayDuyet | date | | |
| LyDoTuChoi | text | | Bắt buộc nếu Từ chối |
| GhiChu | text | | |
| MinhChung | url | | Link minh chứng |

### 6. KetQua_NV (`tbljPMeqJXs2O3S1M`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaKetQua | formula | — | Tự sinh |
| MaNhiemVu | linked → NhiemVu | | |
| MaCongViec | linked → CongViecCon | | |
| NgayThucHien | date | ✅ | |
| NoiDung | richText | ✅ | |
| TrangThaiSauKhi | singleSelect | | Chưa BĐ / Đang TH / Hoàn thành |
| PhanTramSauKhi | percent | | 0.5 = 50%, 1 = 100% |
| NguoiBaoCao | linked → NguoiDung | | |
| FileDinhKem | url | | |
| KyBaoCao | singleSelect | | |
| KySo | number | | |
| NamBaoCao | number | | |
| GhiChu | text | | |

### 7. CongViecCon (`tbloWEDQpZkO5YXcn`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaCongViec | formula | — | Tự sinh |
| TenCongViec | text | ✅ | |
| MaNhiemVu | text | | Mã NV gốc (**text**, không linked) |
| MaCongViecCha | linked → CongViecCon | | Self-ref, NULL nếu cấp 1 |
| CapDo | text | | 1, 2, 3... |
| NguoiThucHien | text | | |
| ThoiHan | date | | |
| TrangThai | singleSelect | | Chưa BĐ / Đang TH / Hoàn thành |
| TienDoPhanTram | number | | 0-100 |
| ThuTu | number | | Thứ tự trong cùng cấp |
| MoTa | text | | |
| GhiChu | text | | |

---

## BẢNG DANH MỤC THAM CHIẾU

| Bảng | Table ID | Tra cứu |
|---|---|---|
| DonVi | `tblstThg4J3fegFej` | `list_records_for_table(baseId, tableId, pageSize=50)` |
| LinhVuc | `tblUjw90FODA5q5gG` | `list_records_for_table(baseId, tableId, pageSize=100)` |
| NhomSoLieu | `tbl4oDPkKxT2BXNFh` | `list_records_for_table(baseId, tableId, pageSize=50)` |
| NguoiDung | `tblfMU8Fkx42D37hq` | `list_records_for_table(baseId, tableId, pageSize=20)` |

---

## QUY TẮC KỸ THUẬT

1. **MaVB, MaNhiemVu** — UNIQUE, kiểm tra trùng trước khi tạo
2. **Formula fields** (MaChiTieu, MaCNSL, MaKetQua, MaCongViec, MaSL) — KHÔNG nhập
3. **PhanTramSauKhi** — percent type: `0.5 = 50%`, `1 = 100%`
4. **Linked record** — luôn truyền `["recordId"]`, không string
5. **singleSelect** — phân biệt hoa/thường, ghi đúng giá trị
6. **KHÔNG tự tạo** DonVi, LinhVuc mới — hỏi nếu không tìm thấy
7. **CongViecCon.MaNhiemVu** — text field, nhập mã NV dạng string
8. **ChiTieu.ChuTriPhu, DonViPhoiHop** — text field, nhập tên đơn vị dạng string
