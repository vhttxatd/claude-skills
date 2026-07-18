# NEXUS Gov — SCHEMA REFERENCE

> ⚠️ **SCHEMA CŨ (AIRTABLE) — KHÔNG CÒN ĐÚNG.** Hệ thống đã chuyển sang Supabase (19/07/2026). Đọc [`MIGRATION-NOTICE.md`](./MIGRATION-NOTICE.md) để biết danh sách 39 bảng Supabase hiện tại. File này giữ lại chỉ để tham khảo khái niệm phân cấp (không dùng tên bảng/field bên dưới để thao tác thật).


> **Phiên bản:** V5 — 25/05/2026
> **Base ID:** `appJhjI3TCfnmkpeo`
> **Thay đổi so với V4:** SoLieu phân cấp (thành phần/tổng hợp/công thức), NhiemVu thêm ChiTieu_LK, CongViecCon.MaNhiemVu chuyển linked, NhomSoLieu thêm LinhVuc+MoTa.

---

## TỔNG QUAN QUAN HỆ DỮ LIỆU

```
                    ┌───────────┐
                    │  VanBan   │
                    │  (gốc)    │
                    └─────┬─────┘
                          │ 1:N
                ┌─────────┼─────────┐
                ▼                   ▼
          ┌──────────┐        ┌──────────┐
          │ ChiTieu  │◄──────►│ NhiemVu  │  ← ChiTieu_LK (MỚI)
          │ (đo KQ)  │        │ (việc)   │
          └────┬─────┘        └────┬─────┘
               │                   │
               │ N:N               │ 1:N
               ▼                   ▼
          ┌──────────┐        ┌──────────┐
          │ SoLieu   │        │CongViecCon│
          │ (chỉ số) │        │(phân rã)  │  ← NhiemVu_LK (MỚI, linked)
          └────┬─────┘        └──────────┘
               │
          ┌────┼────────┐
          │    │        │
          ▼    ▼        ▼
     ┌────────┐  ┌──────────┐  ┌──────────┐
     │SoLieu  │  │CapNhatSL │  │KetQua_NV │
     │(SL con)│  │(giá trị) │  │(BC kết quả)│
     └────────┘  └──────────┘  └──────────┘

  Danh mục: DonVi | LinhVuc | NhomSoLieu | NguoiDung
```

**Quan hệ mới so với V4:**
- `NhiemVu.ChiTieu_LK` → linked → ChiTieu (N:N, lưu ma trận CT↔NV)
- `CongViecCon.NhiemVu_LK` → linked → NhiemVu (thay thế field text cũ)
- `SoLieu.SoLieuCha` → linked → SoLieu (self-ref, phân cấp SL)
- `SoLieu.LoaiSoLieu` → singleSelect (Thành phần / Tổng hợp / Công thức)
- `SoLieu.CongThuc` → text (mô tả cách tính nếu SL tổng hợp/công thức)

---

## BẢNG DỮ LIỆU CHÍNH

### 1. VanBan (`tblW7UZRpEiTBxc4E`)

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaVB | text | ✅ | Format: `yymmdd_LoaiVB+SốVB_CQBH` |
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
| ChuTriPhu | text | | ĐV chủ trì phụ (**text**) |
| DonViPhoiHop | text | | ĐV phối hợp (**text**) |
| NguoiPhuTrach | linked → NguoiDung | | |
| LucLuongHoTro | multiSelect | | |
| LinhVuc | linked → LinhVuc | | |
| MaSoLieu_LK | linked → SoLieu | | SL theo dõi CT — gán ngay khi bóc CT |
| MoTa | text | | |
| GhiChu | text | | |

### 3. NhiemVu (`tblajLASODeiV758B`) — CÓ THAY ĐỔI

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaNhiemVu | text | ✅ | Format: `NV-{VB viết gọn}-{số}` |
| TenNhiemVu | text | ✅ | Nội dung nhiệm vụ |
| MaVanBan | linked → VanBan | ✅ | `["recordId"]` |
| **ChiTieu_LK** | **linked → ChiTieu** | | **🆕 NV phục vụ CT nào (N:N)** |
| DonViChuTri | linked → DonVi | | |
| DonViPhoiHop | linked → DonVi | | |
| ThoiHan | date | | |
| MucDoUuTien | singleSelect | | Cao / Trung bình / Thấp |
| TrangThai | singleSelect | | Chưa BĐ / Đang TH / Hoàn thành / Tạm dừng / Đã hủy |
| TienDo | number | | 0-100 |
| LinhVuc | linked → LinhVuc | | |
| **SoLieu_LK** | **linked → SoLieu** | | **🆕 SL theo dõi NV — gán ngay khi bóc NV** |
| CongViecCon | linked → CongViecCon | | |
| KetQua_NV | linked (reverse) | — | Tự sinh |
| SoLieu | linked (reverse) | — | Tự sinh (từ SoLieu.NhiemVu cũ, nếu giữ) |
| MoTa | text | | |
| GhiChu | text | | |

### 4. SoLieu (`tblbkdViU3KqHPZLR`) — CÓ THAY ĐỔI LỚN

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaSL | formula | — | Tự sinh |
| TenSoLieu | text | ✅ | |
| **LoaiSoLieu** | **singleSelect** | | **🆕 Thành phần / Tổng hợp / Công thức** |
| **SoLieuCha** | **linked → SoLieu** | | **🆕 Self-ref: SL con link về SL cha** |
| **CongThuc** | **text** | | **🆕 Mô tả cách tính (nếu Tổng hợp/Công thức)** |
| **SoLieuThanhPhan** | **linked (reverse)** | — | **🆕 Tự sinh: DS các SL con link về SL này** |
| NhomSoLieu | linked → NhomSoLieu | | Nhóm để gom/lọc/hiển thị |
| DVT | text | | Đơn vị tính |
| KyDoMacDinh | singleSelect | | Tháng / Quý / Năm / Đột xuất |
| DonViChuTri | linked → DonVi | | |
| LinhVuc | linked → LinhVuc | | |
| NguonDuLieu | text | | |
| TrangThai | singleSelect | | Đang dùng / Ngừng theo dõi |
| ChiTieu | linked (reverse) | — | Từ ChiTieu.MaSoLieu_LK |
| CapNhatSoLieu | linked (reverse) | — | |
| NhiemVu | linked (reverse) | — | Từ NhiemVu.SoLieu_LK |
| GhiChu | text | | |
| MoTa | text | | |

#### Phân loại SoLieu:

```
Ví dụ thực tế:

SL tổng hợp: "Tỷ lệ CB-CC có CKS" (= SL1 / SL2 × 100)
  ├── SL thành phần 1: "Số CB-CC đã có CKS"      ← nhập trực tiếp
  └── SL thành phần 2: "Tổng số CB-CC"            ← nhập trực tiếp

SL tổng hợp: "Số cuộc tuyên truyền CĐS năm"
  ├── SL con Q1: "Số cuộc TT Q1"
  ├── SL con Q2: "Số cuộc TT Q2"
  ├── SL con Q3: "Số cuộc TT Q3"
  └── SL con Q4: "Số cuộc TT Q4"
```

| LoaiSoLieu | Ý nghĩa | CongThuc | SoLieuCha |
|---|---|---|---|
| **Thành phần** | SL gốc, nhập trực tiếp | Trống | Link về SL cha (nếu có) |
| **Tổng hợp** | Gom từ nhiều SL thành phần | VD: "Tổng SL con" | Trống (đây là SL cha) |
| **Công thức** | Tính từ SL khác theo công thức | VD: "SL1/SL2 × 100" | Trống |

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

### 7. CongViecCon (`tbloWEDQpZkO5YXcn`) — CÓ THAY ĐỔI

| Field | Type | Bắt buộc | Mô tả |
|---|---|---|---|
| MaCongViec | formula | — | Tự sinh |
| TenCongViec | text | ✅ | |
| ~~MaNhiemVu~~ | ~~text~~ | | ~~Mã NV gốc (text)~~ **→ XÓA, thay bằng NhiemVu_LK** |
| **NhiemVu_LK** | **linked → NhiemVu** | | **🆕 Thay thế field text cũ** |
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

### DonVi (`tblstThg4J3fegFej`)
Tra cứu: `list_records_for_table(baseId, tableId, pageSize=50)`

### LinhVuc (`tblUjw90FODA5q5gG`)
Tra cứu: `list_records_for_table(baseId, tableId, pageSize=100)`

### NhomSoLieu (`tbl4oDPkKxT2BXNFh`) — CÓ THAY ĐỔI

| Field | Type | Mô tả |
|---|---|---|
| TenNhom | text | Tên nhóm SL |
| **LinhVuc** | **linked → LinhVuc** | **🆕 Nhóm SL thuộc lĩnh vực nào** |
| **MoTa** | **text** | **🆕 Giải thích nhóm dùng để theo dõi gì** |

Tra cứu: `list_records_for_table(baseId, tableId, pageSize=50)`

### NguoiDung (`tblfMU8Fkx42D37hq`)
Tra cứu: `list_records_for_table(baseId, tableId, pageSize=20)`

---

## QUY TẮC KỸ THUẬT

1. **MaVB, MaNhiemVu** — UNIQUE, kiểm tra trùng trước khi tạo
2. **Formula fields** (MaChiTieu, MaCNSL, MaKetQua, MaCongViec, MaSL) — KHÔNG nhập
3. **PhanTramSauKhi** — percent type: `0.5 = 50%`, `1 = 100%`
4. **Linked record** — luôn truyền `["recordId"]`, không string
5. **singleSelect** — phân biệt hoa/thường, ghi đúng giá trị
6. **KHÔNG tự tạo** DonVi, LinhVuc mới — hỏi nếu không tìm thấy
7. **SoLieu phân cấp** — khi tạo SL Tổng hợp/Công thức, phải xác định SL thành phần trước
8. **ChiTieu.ChuTriPhu, DonViPhoiHop** — vẫn là text field
9. **NhiemVu.ChiTieu_LK** — bắt buộc gán khi bóc NV (trừ NV điều kiện)
10. **CongViecCon.NhiemVu_LK** — linked thay text, migrate dữ liệu cũ nếu có

---

## FIELD IDs CỦA CÁC FIELD MỚI (V5)

> Dùng khi gọi Airtable MCP API — cần field ID thay vì tên field.

| Bảng | Field | Field ID | Type |
|---|---|---|---|
| SoLieu | LoaiSoLieu | `fldVf8WOtxuJ7IdNc` | singleSelect |
| SoLieu | SoLieuCha | `fldWpfe2UpbIc7jdY` | multipleRecordLinks (self-ref) |
| SoLieu | SoLieuThanhPhan (reverse) | `fldAbmx1Ho7cuGfDg` | multipleRecordLinks (auto) |
| SoLieu | CongThuc | `fldw1iC9KRlMcHlnx` | singleLineText |
| SoLieu | NhiemVu_LK (reverse) | `fldMlxibIolYkaJNL` | multipleRecordLinks (auto) |
| NhiemVu | ChiTieu_LK | `fldyDSg3iBQLBqDf6` | multipleRecordLinks |
| NhiemVu | SoLieu_LK | `fldkblf5P7uNrVyNQ` | multipleRecordLinks |
| ChiTieu | NhiemVu_LK (reverse) | `fldtzLon1Wzwdwodj` | multipleRecordLinks (auto) |
| CongViecCon | NhiemVu_LK | `fldtdBmCQ8dpo5KmT` | multipleRecordLinks |
| NhiemVu | CongViecCon_LK (reverse) | `flddnKSZhhDuHw9Df` | multipleRecordLinks (auto) |

### Thêm field mới (không ảnh hưởng dữ liệu cũ):
1. **NhiemVu**: thêm `ChiTieu_LK` (linked → ChiTieu) + `SoLieu_LK` (linked → SoLieu)
2. **SoLieu**: thêm `LoaiSoLieu` (singleSelect), `SoLieuCha` (linked → SoLieu), `CongThuc` (text)
3. **NhomSoLieu**: thêm `LinhVuc` (linked → LinhVuc), `MoTa` (text)

### Migrate field (cần chuyển dữ liệu):
4. **CongViecCon**: tạo `NhiemVu_LK` (linked → NhiemVu), migrate từ `MaNhiemVu` text → linked, sau đó xóa field text cũ

### Dữ liệu nền giữ nguyên:
- DonVi, LinhVuc, NguoiDung — không thay đổi
- NhomSoLieu — thêm field nhưng dữ liệu cũ vẫn hoạt động
