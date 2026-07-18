# WORKFLOW BÓC TÁCH VĂN BẢN VÀ CẬP NHẬT DỮ LIỆU — NEXUS Gov v2.1

> ⚠️ **ĐÃ CHUYỂN SANG SUPABASE (19/07/2026)** — Đọc [`MIGRATION-NOTICE.md`](./MIGRATION-NOTICE.md) TRƯỚC khi dùng file này. Chi tiết Airtable bên dưới chỉ còn giá trị lịch sử/khái niệm.


> **Phiên bản:** 2.1 — 25/05/2026
> **Thay đổi so với v2.0:** Gộp gán SL vào Bước 2+3 (bóc đến đâu gán đến đó), Bước 4 mở rộng ma trận CT↔NV↔SL, Bước 5 thành rà soát tổng hợp SL.
> **Phụ thuộc:** Đọc `01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md` trước khi thực hiện.

---

## NGUYÊN TẮC BẮT BUỘC

1. **Tuần tự tuyệt đối** — Bước trước xong mới bước sau. Không nhảy, không gộp.
2. **Đề xuất trước, cập nhật sau** — Hiển thị đầy đủ dự kiến → chờ "OK" → mới ghi vào CSDL (trước đây Airtable, nay Supabase).
3. **Từng cái một** — Mỗi lần chỉ tạo 1 record. Hiện kết quả rồi mới tiếp.
4. **Không tự suy diễn** — Thiếu thông tin thì hỏi. Không tự điền DonViChuTri, MocThoiGian, GiaTriMucTieu...
5. **Linked record = array** — Luôn truyền `["recordId"]`, không phải string.
6. **Liên kết đồng bộ** — Sửa CT phải kiểm tra NV. Sửa NV phải kiểm tra CT. Không sửa riêng lẻ.
7. **Không tự bịa** — Không tự tạo DonVi, LinhVuc, số liệu, kết quả. Chỉ dùng danh mục có sẵn.
8. **Trục số liệu đúng cấp** — Không lấy SL quốc gia/TP áp cho xã nếu chưa có VB giao.
9. **Bóc đến đâu, gán SL đến đó** — Không chờ bóc xong hết mới gán. CT có SL → gán ngay. NV có SL → gán ngay.
10. **SL là trục độc lập** — SL không gắn trực tiếp với VB. SL phát sinh qua CT và NV.

---

## KẾT NỐI AIRTABLE

- **Project ID (Supabase):** `zkgtrdrvlppyxusgzjnz`
- **MCP Server:** Supabase MCP
- *(Base ID Airtable cũ, không còn dùng: `appJhjI3TCfnmkpeo`)*

---

## SCHEMA TÓM TẮT

> Chi tiết đầy đủ xem file `03_SCHEMA_REFERENCE.md`

| Bảng | Table ID | Vai trò |
|---|---|---|
| VanBan | `tblW7UZRpEiTBxc4E` | Văn bản gốc |
| ChiTieu | `tblvztIhs31hNk9jn` | Chỉ tiêu đo lường → gán SL ngay |
| NhiemVu | `tblajLASODeiV758B` | Nhiệm vụ thực hiện → gán SL + CT ngay |
| SoLieu | `tblbkdViU3KqHPZLR` | Chỉ số theo dõi (thành phần / tổng hợp / công thức) |
| CapNhatSoLieu | `tblJeI9a8kcHjnOhM` | Giá trị SL theo kỳ |
| KetQua_NV | `tbljPMeqJXs2O3S1M` | Kết quả thực hiện NV |
| CongViecCon | `tbloWEDQpZkO5YXcn` | Phân rã NV thành CV con |
| DonVi | `tblstThg4J3fegFej` | Danh mục đơn vị |
| LinhVuc | `tblUjw90FODA5q5gG` | Danh mục lĩnh vực |
| NhomSoLieu | `tbl4oDPkKxT2BXNFh` | Nhóm gom/lọc/hiển thị SL |
| NguoiDung | `tblfMU8Fkx42D37hq` | Người dùng hệ thống |

---

## QUY TRÌNH 7 BƯỚC

### Tổng quan

```
Bước 0: Phân tích sơ bộ           ← Đánh giá VB, kiểm tra trùng lặp
Bước 1: Nhập văn bản              ← Tạo record VanBan
Bước 2: Bóc CT + gán SL cho CT    ← Bóc đến đâu gán đến đó
Bước 3: Bóc NV + gán CT + gán SL  ← NV gắn CT nào, SL nào
Bước 4: Ma trận liên kết CT↔NV↔SL ← Kiểm chứng toàn bộ
Bước 5: Rà soát tổng hợp SL       ← Kiểm tra trùng, phân cấp, phân nhóm
Bước 6: Cập nhật định kỳ          ← SL + Kết quả NV
```

---

### ━━━ BƯỚC 0: PHÂN TÍCH SƠ BỘ ━━━

> Đánh giá tổng thể VB trước khi bóc tách từng phần.

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
   - Dự kiến bao nhiêu SL cần theo dõi?
4. **Kiểm tra trùng lặp** (deduplication):
   - Tìm VB đã có trong hệ thống có cùng chủ đề
   - Tìm CT/NV/SL đã có có nội dung tương tự
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
  - Chỉ tiêu:    5 CT định lượng → ~5 SL đo lường
  - Nhiệm vụ:    12 NV (7 nhóm) → ~4 SL theo dõi NV
  - Số liệu:     ~9 SL (có thể trùng với SL đã có)

  🔍 Kiểm tra trùng lặp:
  - VB cùng chủ đề: KH 140/KH-UBND (đã có)
  - CT có thể trùng: 3/5 CT
  - SL có thể dùng lại: 4/9 SL đã có trong hệ thống

  📌 Đề xuất:
  - 🔴 Bỏ qua (đã có đủ): 4 mục
  - 🟡 Gắn link + bổ sung: 5 mục
  - 🟢 Tạo mới: 3 CT + 6 NV + 5 SL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Tiếp tục bóc tách? (OK / Xem chi tiết trùng lặp / Dừng)
```

6. Chờ xác nhận → chuyển Bước 1.

---

### ━━━ BƯỚC 1: NHẬP VĂN BẢN ━━━

*(Giữ nguyên v2.0)*

**Quy trình**:
1. Trích xuất: Số ký hiệu, Loại VB, Cơ quan BH, Ngày BH, Trích yếu
2. Tạo MaVB: `yymmdd_LoaiVB+SốVB_CQBH`
3. Kiểm tra trùng: search VanBan có MaVB hoặc SoKyHieu giống không
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

### ━━━ BƯỚC 2: BÓC CHỈ TIÊU + GÁN SỐ LIỆU ━━━

> **Thay đổi so với v2.0:** Khi bóc CT, đồng thời xác định và gán SL theo dõi CT ngay.

**Input**: Nội dung VB từ Bước 1.

**Quy trình**:
1. Tìm chỉ tiêu định lượng trong VB
2. Mỗi CT phải trả lời 6 câu hỏi: Đo cái gì? Mức cần đạt? Ai theo dõi? Nguồn SL? Minh chứng? Khi nào?
3. **Xác định SL cho CT ngay:**
   - Tìm SoLieu hiện có (search_records)
   - Nếu có → đề xuất gán link
   - Nếu chưa có → đề xuất tạo SL mới (xác định LoaiSoLieu: Thành phần / Tổng hợp / Công thức)
4. Hiển thị từng CT kèm SL:

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
  MaVanBan:        ["recXXXXXXXXXXXXX"]

  — Đơn vị / Liên kết —
  ChuTriChinh:     ❓ Cần xác nhận
  LinhVuc:         ❓ Cần xác nhận

  — Số liệu theo dõi CT —
  📊 SL đo lường:  🔍 Tìm thấy "Tỷ lệ CB-CC có CKS" (SL-PPR)
                   → LoaiSoLieu: Công thức (= SL1/SL2 × 100)
                   → Gán vào ChiTieu.MaSoLieu_LK? (OK / Tạo mới / Bỏ qua)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận CT + SL? (OK / Sửa / Bỏ qua)
```

5. Nếu tạo SL mới:

```
  📊 TẠO SỐ LIỆU MỚI cho CT:
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    TenSoLieu:     Tỷ lệ CB-CC có CKS
    LoaiSoLieu:    Công thức
    CongThuc:      Số CB-CC có CKS / Tổng CB-CC × 100
    DVT:           %
    KyDoMacDinh:   Quý
    NhomSoLieu:    ❓
    DonViChuTri:   ❓

    → SL thành phần cần tạo kèm:
      1. "Số CB-CC đã có CKS" (Thành phần, người)
      2. "Tổng số CB-CC"      (Thành phần, người)
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  👉 Tạo 3 SL (1 công thức + 2 thành phần)? (OK / Sửa / Bỏ qua)
```

6. Chờ "OK" → Tạo CT + SL → Thông báo → Tiếp CT tiếp theo
7. Kết thúc: `✅ Đã tạo 3/3 CT + 5 SL cho VB {MaVB}`

---

### ━━━ BƯỚC 3: BÓC NHIỆM VỤ + GÁN CHỈ TIÊU + GÁN SỐ LIỆU ━━━

> **Thay đổi so với v2.0:** Khi bóc NV, đồng thời gắn CT phục vụ (ChiTieu_LK) và SL theo dõi NV.

**Input**: Nội dung VB + CT đã tạo ở Bước 2.

**Quy trình**:
1. Tìm nhiệm vụ/giải pháp/hành động cụ thể
2. Phân nhóm NV theo 7 nhóm khuyến nghị
3. Tạo MaNhiemVu: `NV-{VB viết gọn}-{số}`
4. **Gắn CT phục vụ** (ChiTieu_LK) — hỏi nếu không rõ
5. **Xác định SL cho NV** (nếu NV cần theo dõi SL riêng)
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

  — Liên kết CT —
  ChiTieu_LK:   ["recXXX"] → CT "100% CB-CC có CKS"

  — Số liệu theo dõi NV —
  📊 SL đo lường:  🔍 Không tìm thấy SL phù hợp
                   → Đề xuất tạo mới:
                     TenSoLieu:   Số CB-CC hoàn thành đào tạo KNS
                     LoaiSoLieu:  Thành phần
                     DVT:         người
                     KyDoMacDinh: Quý
                   → Tạo SL mới + gán? (OK / Sửa / Bỏ qua SL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận NV + CT + SL? (OK / Sửa / Bỏ qua)
```

7. Tạo từng NV → tiếp NV tiếp theo
8. Kết thúc: `✅ Đã tạo 5/5 NV + gán 5 CT + 3 SL mới cho VB {MaVB}`

---

### ━━━ BƯỚC 4: MA TRẬN LIÊN KẾT CT ↔ NV ↔ SL ━━━

> **Mở rộng so với v2.0:** Thêm cột SL vào ma trận, kiểm tra đủ 3 chiều.

**Input**: CT + NV + SL đã tạo ở Bước 2, 3.

**AI thực hiện**:

1. Lập ma trận liên kết 3 chiều:

```
🔗 MA TRẬN LIÊN KẾT CT ↔ NV ↔ SL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Chỉ tiêu                   NV phục vụ       SL đo lường
  ──────────────────────────  ──────────────   ─────────────────
  CT1: 100% CB-CC có CKS     NV-01, NV-03     Tỷ lệ CB-CC CKS (CT)
  CT2: 100% HS có KNS         NV-04            Tỷ lệ HS có KNS (CT)
  CT3: 80% ND trưởng thành   NV-04, NV-05     Tỷ lệ ND có KNS (CT)

  Nhiệm vụ                   Phục vụ CT       SL theo dõi NV
  ──────────────────────────  ──────────────   ─────────────────
  NV-01: Đào tạo KNS CB-CC   CT1              Số CB-CC đào tạo (TP)
  NV-02: Tuyên truyền CĐS    (điều kiện)      Số cuộc TT (TP)
  NV-03: Cấp CKS CB-CC       CT1              Số CKS đã cấp (TP)
  NV-04: Phổ cập KNS ND      CT2, CT3         Số ND hướng dẫn (TP)
  NV-05: Hỗ trợ DN/HTX       CT3              Số DN/HTX hỗ trợ (TP)

  Số liệu                    Loại             Gắn với
  ──────────────────────────  ──────────────   ─────────────────
  Tỷ lệ CB-CC CKS            Công thức        CT1
  Số CB-CC đã có CKS          Thành phần       ↳ thành phần CT trên
  Tổng số CB-CC               Thành phần       ↳ thành phần CT trên
  Số CB-CC đào tạo            Thành phần       NV-01
  Số cuộc TT                  Thành phần       NV-02
  Số CKS đã cấp               Thành phần       NV-03
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ✅ Không có CT nào thiếu NV
  ✅ Không có CT nào thiếu SL
  ✅ Không có NV nào lạc
  ⚠️ NV-02 là NV điều kiện → OK
  ⚠️ 2 SL thành phần chưa có NhomSoLieu → sẽ xử lý ở Bước 5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận ma trận? (OK / Sửa / Bổ sung)
```

2. Nếu phát hiện vấn đề:
   - CT thiếu NV hoặc SL → đề xuất bổ sung
   - NV không gắn CT → hỏi hoặc đánh dấu "NV điều kiện"
   - SL Công thức thiếu SL thành phần → đề xuất tạo
3. Chờ xác nhận → chuyển Bước 5.

---

### ━━━ BƯỚC 5: RÀ SOÁT TỔNG HỢP SỐ LIỆU ━━━

> **Bước mới** (thay thế "Gán SL" cũ). Rà soát toàn bộ SL đã tạo/gán trong Bước 2+3.

**Input**: Toàn bộ SL đã tạo + SL hiện có trong hệ thống.

**AI thực hiện**:

1. **Kiểm tra trùng lặp SL:**
   - SL vừa tạo có trùng với SL đã có không?
   - Nếu trùng → đề xuất merge (gộp, xóa SL mới, gán SL cũ)

2. **Kiểm tra phân cấp SL:**
   - SL Công thức có đủ SL thành phần chưa?
   - SL Tổng hợp có ghi CongThuc chưa?
   - Có SL lẻ (không gắn CT/NV nào) không?

3. **Phân nhóm SL:**
   - SL nào chưa có NhomSoLieu → đề xuất gán nhóm
   - Cần tạo NhomSoLieu mới không?

4. Hiển thị báo cáo tổng hợp:

```
📊 RÀ SOÁT SỐ LIỆU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Tổng SL trong phiên: 8
  - Tạo mới:    5
  - Dùng lại:   3 (đã có sẵn)

  Phân loại:
  - Thành phần: 5
  - Tổng hợp:   1
  - Công thức:  2

  Phân cấp:
  ├── Tỷ lệ CB-CC CKS (Công thức)
  │   ├── Số CB-CC đã có CKS (Thành phần)
  │   └── Tổng số CB-CC (Thành phần)
  ├── Tỷ lệ HS có KNS (Công thức)
  │   ├── Số HS có KNS (Thành phần)
  │   └── Tổng số HS (Thành phần) ← dùng lại SL có sẵn
  └── Số cuộc TT (Thành phần) — độc lập

  ⚠️ Cần xử lý:
  - 2 SL chưa gán NhomSoLieu
  - 1 SL Công thức chưa ghi CongThuc đầy đủ

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận + sửa? (OK / Sửa / Bổ sung nhóm)
```

5. Xử lý từng vấn đề → chuyển Bước 6.

---

### ━━━ BƯỚC 6: CẬP NHẬT ĐỊNH KỲ ━━━

> Thực hiện **định kỳ theo kỳ báo cáo**, không phải ngay khi bóc tách.

**6a. Cập nhật số liệu (CapNhatSoLieu)**:

- Chỉ cập nhật SL **Thành phần** (nhập trực tiếp)
- SL **Tổng hợp** và **Công thức** → tự tính từ SL thành phần (hoặc AI tính theo CongThuc và đề xuất)

```
✍️ CẬP NHẬT SỐ LIỆU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SoLieu:            ["recXXX"] → Số CB-CC đã có CKS
  LoaiSoLieu:        Thành phần (nhập trực tiếp)
  KyBaoCao:          Quý
  KySo:              1
  NamBaoCao:         2026
  GiaTri:            45
  NgayCapNhat:       2026-03-31
  NguoiCapNhat:      ["recXXX"] → Hiếu
  TrangThaiKiemDinh: Chờ duyệt
  MinhChung:         Danh sách CKS đã cấp Q1/2026

  📊 Tác động lên SL Công thức:
  → "Tỷ lệ CB-CC CKS" = 45/60 × 100 = 75%
  → Cập nhật CapNhatSoLieu cho SL công thức? (OK / Bỏ qua)
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

  📊 SL liên quan đã cập nhật:
  → "Số CB-CC đào tạo" = 45 (Q1/2026) ← đã ghi ở 6a
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👉 Xác nhận? (OK / Sửa / Bỏ qua)
```

---

## LƯU Ý KỸ THUẬT AIRTABLE

1. **MaVB, MaNhiemVu** phải UNIQUE — kiểm tra trùng trước khi tạo
2. **Formula fields** (MaChiTieu, MaCNSL, MaKetQua, MaCongViec, MaSL) — KHÔNG nhập
3. **PhanTramSauKhi** — percent type: `0.5 = 50%`, `1 = 100%`
4. **Linked record** — luôn truyền `["recordId"]`, không string
5. **singleSelect** — phân biệt hoa/thường, ghi đúng giá trị
6. **KHÔNG tự tạo** DonVi, LinhVuc mới — hỏi nếu không tìm thấy
7. **SoLieu phân cấp** — tạo SL Thành phần trước, rồi mới tạo SL Tổng hợp/Công thức link về
8. **ChiTieu.ChuTriPhu, DonViPhoiHop** — vẫn là text field
9. **NhiemVu.ChiTieu_LK** — bắt buộc gán khi bóc NV (trừ NV điều kiện)
10. **CongViecCon.NhiemVu_LK** — linked thay text

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
  ┌─────────────────────┐
  │ BƯỚC 0: Phân tích   │  ← Đánh giá VB, dự kiến CT/NV/SL, kiểm tra trùng
  │ sơ bộ               │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 1: Nhập VB     │  ← Tạo record VanBan
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 2: Bóc CT      │  ← Từng CT + gán SL ngay
  │ + gán SL cho CT     │     (tạo SL mới hoặc dùng SL có sẵn)
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 3: Bóc NV      │  ← Từng NV + gắn CT (ChiTieu_LK)
  │ + gán CT + gán SL   │     + gán SL cho NV
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 4: Ma trận     │  ← Kiểm tra 3 chiều: CT↔NV↔SL
  │ CT ↔ NV ↔ SL        │     Không mồ côi, không lạc, không thiếu SL
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 5: Rà soát     │  ← Kiểm tra trùng SL, phân cấp, phân nhóm
  │ tổng hợp SL         │     Merge SL trùng, gán NhomSoLieu
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │ BƯỚC 6: Cập nhật    │  ← Định kỳ: nhập SL Thành phần
  │ định kỳ             │     → tự tính SL Công thức/Tổng hợp
  └─────────────────────┘     + Kết quả NV
```
