# NEXUS Gov — Bộ quy tắc AI cho hệ thống quản lý thông tin số

> **Xã An Thới Đông, huyện Cần Giờ, TP.HCM**
> **Tác giả:** Phan Trung Hiếu — Chuyên viên KHCN-CĐS
> **Phiên bản:** 1.1 — 25/05/2026

---

## Giới thiệu

NEXUS Gov là hệ thống quản lý thông tin số cấp xã, sử dụng Airtable làm cơ sở dữ liệu nền. Repo này chứa bộ quy tắc và hướng dẫn để **mọi AI assistant** (Claude, ChatGPT, Gemini, Copilot...) có thể tham gia vận hành hệ thống một cách nhất quán.

### Mục tiêu

- Quản lý từ **văn bản chỉ đạo** → bóc tách **chỉ tiêu + nhiệm vụ + số liệu** đồng thời → theo dõi **tiến độ** → cập nhật **kết quả** → đánh giá
- Bảo đảm logic liên kết: chỉ tiêu ↔ nhiệm vụ ↔ số liệu ↔ minh chứng
- Số liệu phân cấp: thành phần → tổng hợp → công thức (tự tính)
- AI không được viết kế hoạch rời rạc, không tự bịa số liệu, đơn vị, kết quả

---

## Cấu trúc repo

```
nexus-gov-rules/
├── README.md                                          ← File này
├── SKILL.md                                           ← Claude skill descriptor
├── 01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md     ← Quy tắc nền tảng
├── 02_WORKFLOW_BOCTACH_VB_v2.1.md                     ← Quy trình 7 bước (v2.1)
└── 03_SCHEMA_REFERENCE.md                             ← Schema Airtable V5
```

### Mô tả từng file

| File | Nội dung | AI đọc khi nào |
|---|---|---|
| `01_QUY_TAC_...` | Nguyên tắc liên kết CT↔NV↔SL, trục số liệu 5 cấp, ma trận kiểm tra, quy tắc viết | **Luôn đọc trước** khi xây dựng, chỉnh sửa, rà soát kế hoạch |
| `02_WORKFLOW_...` | Quy trình 7 bước: bóc VB, bóc CT+SL, bóc NV+CT+SL, ma trận 3 chiều, rà soát SL, cập nhật định kỳ | Khi được yêu cầu **nạp văn bản** vào hệ thống |
| `03_SCHEMA_...` | Schema V5: 11 bảng, SL phân cấp, NV↔CT linked, hướng dẫn migrate | Khi cần **tra cứu** bảng, field, table ID |

---

## Cách sử dụng

### Với ChatGPT (Custom GPT hoặc chat thường)

1. Upload cả 3 file markdown (01, 02, 03) vào cuộc trò chuyện
2. Prompt: *"Đọc 3 file quy tắc NEXUS Gov. Tôi sẽ gửi văn bản cần bóc tách."*
3. Gửi nội dung văn bản → ChatGPT sẽ theo workflow 7 bước

### Với Claude (Project hoặc chat thường)

1. Tạo Project, upload các file vào Project Knowledge
2. Hoặc đính kèm file khi bắt đầu chat
3. Claude sẽ tự đọc và áp dụng quy tắc

### Với Gemini

1. Upload 3 file vào cuộc trò chuyện
2. Prompt: *"Đây là bộ quy tắc quản lý kế hoạch. Đọc và xác nhận hiểu."*

### Với MCP (Airtable)

- Các AI hỗ trợ MCP (Claude, ChatGPT Plus) có thể kết nối trực tiếp Airtable
- Base ID: `appJhjI3TCfnmkpeo`
- Xem `03_SCHEMA_REFERENCE.md` để biết Table ID từng bảng

---

## Quy trình tổng thể

```
Người dùng cung cấp văn bản
        │
        ▼
  Bước 0: Phân tích sơ bộ          ← Đánh giá VB, kiểm tra trùng lặp
  Bước 1: Nhập văn bản             ← Tạo record VanBan
  Bước 2: Bóc CT + gán SL          ← Bóc đến đâu, gán SL đến đó
  Bước 3: Bóc NV + gán CT + gán SL ← NV gắn CT phục vụ + SL theo dõi
  Bước 4: Ma trận CT↔NV↔SL         ← Kiểm tra 3 chiều
  Bước 5: Rà soát tổng hợp SL      ← Trùng, phân cấp, phân nhóm
  Bước 6: Cập nhật định kỳ         ← Nhập SL Thành phần → tự tính SL Công thức
```

---

## Thay đổi chính so với v1.0

| Hạng mục | v1.0 | v1.1 |
|---|---|---|
| Workflow | 7 bước, gán SL tách riêng (Bước 5) | 7 bước, gán SL ngay khi bóc CT/NV |
| Ma trận | CT↔NV (2 chiều) | CT↔NV↔SL (3 chiều) |
| SoLieu | Flat, không phân cấp | Phân cấp: Thành phần / Tổng hợp / Công thức |
| NhiemVu↔ChiTieu | Không link trực tiếp | ChiTieu_LK (linked) |
| CongViecCon↔NhiemVu | Text field | Linked field |
| Bước 5 | Gán SL | Rà soát tổng hợp SL (trùng, phân cấp, phân nhóm) |
| Cập nhật định kỳ | Nhập thủ công | Nhập SL Thành phần → đề xuất tự tính SL Công thức |

---

## Lịch sử phiên bản

| Ngày | Phiên bản | Thay đổi |
|---|---|---|
| 24/05/2026 | 1.0 | Khởi tạo: quy tắc nền tảng + workflow v2 (7 bước) + schema V4 |
| 25/05/2026 | 1.1 | Schema V5 (SL phân cấp, NV↔CT linked, CVC linked), workflow v2.1 (gán SL inline, ma trận 3 chiều, rà soát SL) |

---

## Liên hệ

- **Phan Trung Hiếu** — Chuyên viên KHCN-CĐS, UBND xã An Thới Đông
- Hệ thống: NEXUS Gov trên Airtable
- Dự án thuộc: Phòng Văn hóa - Xã hội, UBND xã An Thới Đông, huyện Cần Giờ, TP.HCM
