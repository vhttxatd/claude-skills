# WORKFLOW BÓC TÁCH VĂN BẢN VÀ CẬP NHẬT DỮ LIỆU — NEXUS Gov v2

> ⚠️ **File này đã được thay thế bởi `02_WORKFLOW_BOCTACH_VB_v2.1.md`.** Đồng thời đọc [`MIGRATION-NOTICE.md`](./MIGRATION-NOTICE.md) — hệ thống đã chuyển từ Airtable sang Supabase (19/07/2026). Giữ lại chỉ để tham khảo lịch sử.


> **Phiên bản:** 2.0 — 24/05/2026
> **Dùng cho:** Mọi AI assistant khi đọc văn bản hành chính, bóc tách thành dữ liệu có cấu trúc và cập nhật vào Airtable.
> **Phụ thuộc:** Đọc `01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md` trước khi thực hiện workflow này.

---

## NGUYÊN TẮC BẮT BUỘC

1. **Tuần tự tuyệt đối** — Bước trước xong mới bước sau. Không nhảy, không gộp.
2. **Đề xuất trước, cập nhật sau** — Hiển thị đầy đủ dự kiến → chờ "OK" → mới ghi Airtable.
3. **Từng cái một** — Mỗi lần chỉ tạo 1 record. Hiện kết quả rồi mới tiếp.
4. **Không tự suy diễn** — Thiếu thông tin thì hỏi. Không tự điền DonViChuTri, MocThoiGian, GiaTriMucTieu...
5. **Linked record = array** — Luôn truyền `["recordId"]`, không phải string.
6. **Liên kết đồng bộ** — Sửa CT phải kiểm tra NV. Sửa NV phải kiểm tra CT. Không sửa riêng lẻ.
7. **Không tự bịa** — Không tự tạo DonVi, LinhVuc, số liệu, kết quả. Chỉ dùng danh mục có sẵn.
8. **Trục số liệu đúng cấp** — Không lấy SL quốc gia/TP áp cho xã nếu chưa có VB giao.

---

## KẾT NỐI AIRTABLE

- **Base ID**: `appJhjI3TCfnmkpeo`
- **MCP Server**: Airtable MCP (kết nối sẵn)

---

## SCHEMA TÓM TẮT

> Chi tiết đầy đủ xem file `03_SCHEMA_REFERENCE.md`

| Bảng | Table ID | Vai trò |
|---|---|---|
| VanBan | `tblW7UZRpEiTBxc4E` | Văn bản gốc |
| ChiTieu | `tblvztIhs31hNk9jn` | Chỉ tiêu đo lường |
| NhiemVu | `tblajLASODeiV758B` | Nhiệm vụ thực hiện |
| SoLieu | `tblbkdViU3KqHPZLR` | Chỉ số theo dõi |
| CapNhatSoLieu | `tblJeI9a8kcHjnOhM` | Giá trị SL theo kỳ |
| KetQua_NV | `tbljPMeqJXs2O3S1M` | Kết quả thực hiện NV |
| CongViecCon | `tbloWEDQpZkO5YXcn` | Phân rã NV thành CV con |
| DonVi | `tblstThg4J3fegFej` | Danh mục đơn vị |
| LinhVuc | `tblUjw90FODA5q5gG` | Danh mục lĩnh vực |
| NhomSoLieu | `tbl4oDPkKxT2BXNFh` | Nhóm phân loại SL |
| NguoiDung | `tblfMU8Fkx42D37hq` | Người dùng hệ thống |

---

## QUY TRÌNH 7 BƯỚC

### Tổng quan

```
Bước 0: Phân tích sơ bộ (MỚI — đánh giá tổng thể VB trước khi bóc)
Bước 1: Nhập văn bản
Bước 2: Bóc tách chỉ tiêu
Bước 3: Bóc tách nhiệm vụ
Bước 4: Kiểm tra liên kết CT ↔ NV (MỚI — ma trận kiểm chứng)
Bước 5: Gán số liệu
Bước 6: Cập nhật định kỳ
```

---

### ━━━ BƯỚC 0: PHÂN TÍCH SƠ BỘ ━━━

> **Bước mới** — Đánh giá tổng thể VB trước khi bóc tách từng phần.

**Input**: Người dùng cung cấp file VB hoặc paste nội dung.

**AI thực hiện**:

1. Đọc toàn bộ nội dung VB
2. Xác định:
   - VB thuộc cấp nào (TW / TP / Xã)?
   - Loại VB (NQ / KH / QĐ / TB)?
   - VB này là căn cứ hay VB triển khai?
   - Phạm vi áp dụng?
3. Phân tích cấu trúc VB:
   - Có mục tiêu chung không?
   - Có chỉ tiêu định lượng không? Bao nhiêu?
   - Có nhiệm vụ/giải pháp cụ thể không? Bao nhiêu?
   - Có phụ lục không?
4. **Kiểm tra trùng lặp** (deduplication):
   - Tìm VB đã có trong hệ thống có cùng chủ đề
   - Tìm CT/NV đã có có nội dung tương tự
   - Nếu phát hiện trùng → đề xuất GÁN LINK thay vì tạo mới
5. Hiển thị bản phân tích sơ bộ:

```
📋 PHÂN TÍCH SƠ BỘ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Văn bản:       KH 2326/KH-UBND ngày 09/12/2025
  Loại:          Kế hoạch
  Cấp:           Xã (triển khai từ KH cấp TP)
  Lĩnh vực:      Chuyển đổi số / Nhân lực số

  📊 Dự kiến bóc tách:
  - Chỉ tiêu:    5 chỉ tiêu định lượng
  - Nhiệm vụ:    26 nhiệm vụ (7 nhóm)
  - Số liệu:     ~8 SL cần theo dõi

  🔍 Kiểm tra trùng lặp:
  - VB cùng chủ đề: KH 140/KH-UBND (đã có)
  - CT có thể trùng: 3/5 CT trùng với NQ57
  - NV có thể trùng: 9/26 NV đã có trong hệ thống

  📌 Đề xuất:
  - 🔴 Bỏ qua (đã có đủ): 4 mục
  - 🟡 Gắn link + bổ sung: 9 mục
  - 🟢 Tạo mới: 6 NV + 2 CT + 5 SL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Tiếp tục bóc tách? (OK / Xem chi tiết trùng lặp / Dừng)
```

6. Chờ xác nhận → chuyển Bước 1.

---

### ━━━ BƯỚC 1: NHẬP VĂN BẢN ━━━

**Input**: Kết quả phân tích từ Bước 0.

**Quy trình**:
1. Trích xuất: Số ký hiệu, Loại VB, Cơ quan BH, Ngày BH, Trích yếu
2. Tạo MaVB: `yymmdd_LoaiVB+SốVB_CQBH` (VD: `241222_NQ57-TW`)
3. **Kiểm tra trùng**: search VanBan có MaVB hoặc SoKyHieu giống không
4. Hiển thị dự kiến:

```
📄 VĂN BẢN DỰ KIẾN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MaVB:           241222_NQ57-TW
  TenVB:          Thực hiện Nghị quyết 57
  SoKyHieu:       57-NQ/TW
  LoaiVB:         Nghị quyết
  CapBanHanh:     Trung ương
  CoQuanBanHanh:  Ban chấp hành TW
  NgayBanHanh:    2024-12-22
  TrichYeu:       Về đột phá phát triển KHCN, đổi mới sáng tạo
  TrangThai:      Đang hiệu lực
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa [field=giá trị mới] / Bỏ qua)
```

5. Chờ "OK" → Tạo record VanBan → Lưu recordId
6. Thông báo: `✅ Đã tạo: {MaVB} — ID: {recordId}`

---

### ━━━ BƯỚC 2: BÓC TÁCH CHỈ TIÊU ━━━

**Input**: Nội dung VB từ Bước 1.

**Quy trình**:
1. Tìm chỉ tiêu định lượng:
   - Có con số mục tiêu cụ thể (100%, 50 trạm, 80% hồ sơ...)
   - Có mốc thời gian (đến 2025, trong năm 2026...)
2. **Mỗi CT phải trả lời 6 câu hỏi** (xem Quy tắc 3.2):
   - Đo cái gì? Mức cần đạt? Ai theo dõi? Nguồn SL? Minh chứng? Khi nào?
3. Liệt kê tất cả → xử lý **từng cái**:

```
🎯 CHỈ TIÊU 1/3:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TenChiTieu:      100% CB-CC có chữ ký số
  GiaTriMucTieu:   100
  DonViMucTieu:    %
  MocThoiGian:     2025-12-31
  LoaiMocThoiGian: Đến năm
  MucDoUuTien:     Cao
  TrangThai:       Đang TH
  MaVanBan:        ["recXXXXXXXXXXXXX"] ← VB Bước 1

  — Thông tin liên kết (Quy tắc mới) —
  ChuTriChinh:     ❓ Cần xác nhận
  NguonSoLieu:     ❓ Cần xác nhận (ai cung cấp SL?)
  MinhChung:       ❓ (danh sách CKS? báo cáo?)
  LinhVuc:         ❓ Cần xác nhận
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa / Bỏ qua)
```

4. Chờ "OK" → Tạo → Thông báo → Tiếp CT tiếp theo
5. Kết thúc: `✅ Đã tạo 3/3 chỉ tiêu cho VB {MaVB}`
6. Nếu không có chỉ tiêu: thông báo → chuyển Bước 3

---

### ━━━ BƯỚC 3: BÓC TÁCH NHIỆM VỤ ━━━

**Input**: Nội dung VB + ChiTieu đã tạo ở Bước 2.

**Quy trình**:
1. Tìm nhiệm vụ/giải pháp/hành động cụ thể
2. **Phân nhóm NV** theo 7 nhóm khuyến nghị (xem Quy tắc mục 8):
   - Nhóm 1: Tuyên truyền
   - Nhóm 2: Cơ chế chỉ đạo
   - Nhóm 3: Hạ tầng, nền tảng
   - Nhóm 4: Nhân lực, kỹ năng
   - Nhóm 5: Ứng dụng QLNN
   - Nhóm 6: Kinh tế số, xã hội số
   - Nhóm 7: ATTT, an ninh mạng
3. Tạo MaNhiemVu: `NV-{VB viết gọn}-{số}`. VD: `NV-NQ57-01`
4. **Mỗi NV phải gắn với CT** — nếu không xác định được → hỏi người dùng
5. NV là đầu việc **lớn**, không quá vụn vặt (1 buổi họp, 1 bài viết = quá nhỏ)
6. Hiển thị từng NV:

```
📋 NHIỆM VỤ 1/5 (Nhóm 4: Nhân lực, kỹ năng):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MaNhiemVu:     NV-NQ57-01
  TenNhiemVu:    Triển khai đào tạo kỹ năng số cho CB-CC
  MaVanBan:      ["recXXXXXXXXXXXXX"]
  DonViChuTri:   ❓ Cần xác nhận
  DonViPhoiHop:  ❓
  ThoiHan:       2025-06-30
  MucDoUuTien:   Cao
  TrangThai:     Chưa BĐ
  TienDo:        0

  — Liên kết (Quy tắc mới) —
  PhucVuChiTieu: CT "100% CB-CC có CKS" ← gắn ở Bước 4
  KetQua_DuKien: Danh sách CB-CC hoàn thành đào tạo
  MinhChung:     Danh sách, chứng chỉ, báo cáo tập huấn
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa / Bỏ qua)
```

7. Tạo từng NV → tiếp NV tiếp theo
8. Kết thúc: `✅ Đã tạo 5/5 nhiệm vụ cho VB {MaVB}`

---

### ━━━ BƯỚC 4: KIỂM TRA LIÊN KẾT CT ↔ NV ━━━

> **Bước mới** — Ma trận kiểm chứng để đảm bảo không có CT mồ côi hoặc NV lạc.

**Input**: Danh sách CT + NV đã tạo ở Bước 2, 3.

**AI thực hiện**:

1. Lập ma trận liên kết:

```
🔗 MA TRẬN LIÊN KẾT CT ↔ NV:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Chỉ tiêu                        Nhiệm vụ phục vụ
  ─────────────────────────────    ────────────────────
  CT1: 100% CB-CC có CKS          NV-01, NV-03
  CT2: 100% HS có kỹ năng số      NV-04
  CT3: 80% người dân trưởng thành NV-04, NV-05
  CT4: ≥5 mô hình CĐS            NV-06
  CT5: 100% NLĐ DN/HTX            NV-05

  Nhiệm vụ                        Phục vụ chỉ tiêu
  ─────────────────────────────    ────────────────────
  NV-01: Đào tạo KNS CB-CC        CT1
  NV-02: Tuyên truyền CĐS         (điều kiện chung)
  NV-03: Cấp CKS CB-CC            CT1
  NV-04: Phổ cập KNS người dân    CT2, CT3
  NV-05: Hỗ trợ DN/HTX            CT3, CT5
  NV-06: Triển khai mô hình CĐS   CT4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Không có CT nào thiếu NV
  ✅ Không có NV nào lạc (không gắn CT)
  ⚠️ NV-02 là NV điều kiện → OK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận ma trận? (OK / Sửa / Bổ sung)
```

2. Nếu phát hiện vấn đề:
   - CT không có NV → đề xuất tạo NV bổ sung
   - NV không gắn CT → hỏi người dùng gắn vào CT nào hoặc đánh dấu "NV điều kiện"
3. Chờ xác nhận → chuyển Bước 5.

---

### ━━━ BƯỚC 5: GÁN SỐ LIỆU ━━━

**Input**: Danh sách CT + NV đã kiểm tra liên kết.

**Quy trình**:
1. Với mỗi CT, xác định cần theo dõi SL gì
2. **Kiểm tra nguồn SL theo trục cấp** (Quy tắc mục 5):
   - SL này thuộc cấp nào? (quốc gia / TP / xã / đơn vị / địa bàn)
   - Đơn vị nào cung cấp SL gốc?
   - Có cần minh chứng gì?
3. **Tìm SoLieu hiện có** trước (dùng search_records)
4. Nếu tìm thấy → đề xuất gán link
5. Nếu chưa có → đề xuất tạo SoLieu mới

```
📊 GÁN SỐ LIỆU cho ChiTieu "100% CB-CC có CKS":
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔍 Tìm thấy: "Số CB-CC-VC có CKS" (SL-PPR)
  → Cấp SL: Đơn vị chuyên môn (VPUB cung cấp)
  → Minh chứng: Danh sách CKS đã cấp
  → Gán vào ChiTieu.MaSoLieu_LK? (OK / Bỏ qua)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 GÁN SỐ LIỆU cho NhiemVu "NV-NQ57-01":
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔍 Không tìm thấy phù hợp
  → Đề xuất tạo mới:
    TenSoLieu:     Số CB-CC hoàn thành đào tạo KNS
    DVT:           người
    KyDoMacDinh:   Quý
    NguonDuLieu:   PVHXH tổng hợp từ DS tập huấn
    MinhChung:     Danh sách tham gia, chứng chỉ
    DonViChuTri:   ❓
    NhomSoLieu:    ❓
  → Tạo mới và gán? (OK / Sửa / Bỏ qua)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### ━━━ BƯỚC 6: CẬP NHẬT ĐỊNH KỲ ━━━

> Thực hiện **định kỳ theo kỳ báo cáo**, không phải ngay khi bóc tách.

**6a. Cập nhật số liệu (CapNhatSoLieu)**:

```
✍️ CẬP NHẬT SỐ LIỆU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SoLieu:            ["recXXX"] → Số CB-CC-VC có CKS
  KyBaoCao:          Quý
  KySo:              1
  NamBaoCao:         2026
  GiaTri:            45
  NgayCapNhat:       2026-03-31
  NguoiCapNhat:      ["recXXX"] → Hiếu
  TrangThaiKiemDinh: Chờ duyệt

  — Kiểm tra (Quy tắc mới) —
  NguonSoLieu:       VPUB cung cấp
  MinhChung:         Danh sách CKS đã cấp Q1/2026
  LoaiSoLieu:        Kết quả thực hiện (không phải mục tiêu)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa / Bỏ qua)
```

**6b. Cập nhật kết quả nhiệm vụ (KetQua_NV)**:

```
📈 KẾT QUẢ THỰC HIỆN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MaNhiemVu:        ["recXXX"] → NV-NQ57-01
  NgayThucHien:      2026-03-15
  NoiDung:           Đã tổ chức 2 lớp tập huấn KNS, 45 CB-CC tham gia
  TrangThaiSauKhi:   Đang TH
  PhanTramSauKhi:    0.3  (= 30%)
  MinhChung:         Danh sách tham gia, hình ảnh, BC tập huấn
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa / Bỏ qua)
```

---

## LƯU Ý KỸ THUẬT AIRTABLE

1. **MaVB, MaNhiemVu** phải UNIQUE — kiểm tra trùng trước khi tạo
2. **MaChiTieu, MaCNSL, MaKetQua, MaCongViec, MaSL** là **formula tự sinh** — KHÔNG nhập
3. **PhanTramSauKhi** kiểu percent → `0.5 = 50%`, `1 = 100%`
4. **Linked record** luôn truyền `["recordId"]`
5. **singleSelect** phân biệt hoa/thường, ghi đúng giá trị
6. **KHÔNG tự tạo DonVi, LinhVuc mới** — chỉ dùng danh mục có sẵn
7. **CongViecCon.MaNhiemVu** hiện là **text** (không phải linked)
8. **ChiTieu.ChuTriPhu, DonViPhoiHop** hiện là **text**

---

## DANH MỤC THAM CHIẾU

| Bảng | Table ID | Tra cứu |
|---|---|---|
| DonVi | `tblstThg4J3fegFej` | `list_records_for_table(baseId, tableId, pageSize=50)` |
| LinhVuc | `tblUjw90FODA5q5gG` | `list_records_for_table(baseId, tableId, pageSize=100)` |
| NhomSoLieu | `tbl4oDPkKxT2BXNFh` | `list_records_for_table(baseId, tableId, pageSize=50)` |
| SoLieu | `tblbkdViU3KqHPZLR` | `search_records(baseId, table="SoLieu", query="từ khóa")` |
| NguoiDung | `tblfMU8Fkx42D37hq` | `list_records_for_table(baseId, tableId, pageSize=20)` |

---

## SƠ ĐỒ TỔNG THỂ WORKFLOW

```
Người dùng cung cấp VB
        │
        ▼
  ┌─────────────────┐
  │ BƯỚC 0: Phân    │   ← Đánh giá tổng thể, kiểm tra trùng lặp
  │ tích sơ bộ      │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 1: Nhập VB │   ← Tạo record VanBan
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 2: Bóc CT  │   ← Từng chỉ tiêu, 6 câu hỏi kiểm tra
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 3: Bóc NV  │   ← Từng nhiệm vụ, phân 7 nhóm
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 4: Ma trận │   ← Kiểm tra CT↔NV, không mồ côi
  │ liên kết        │
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 5: Gán SL  │   ← Đúng cấp, đúng nguồn, có minh chứng
  └────────┬────────┘
           │
           ▼
  ┌─────────────────┐
  │ BƯỚC 6: Cập     │   ← Định kỳ: SL + Kết quả NV
  │ nhật định kỳ    │
  └─────────────────┘
```
