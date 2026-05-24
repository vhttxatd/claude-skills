# NEXUS Gov — Bộ quy tắc AI cho hệ thống quản lý thông tin số

> **Xã An Thới Đông, huyện Cần Giờ, TP.HCM**
> **Tác giả:** Phan Trung Hiếu — Chuyên viên KHCN-CĐS
> **Phiên bản:** 1.0 — 24/05/2026

---

## Giới thiệu

NEXUS Gov là hệ thống quản lý thông tin số cấp xã, sử dụng Airtable làm cơ sở dữ liệu nền. Repo này chứa bộ quy tắc và hướng dẫn để **mọi AI assistant** (Claude, ChatGPT, Gemini, Copilot...) có thể tham gia vận hành hệ thống một cách nhất quán.

### Mục tiêu

- Quản lý từ **văn bản chỉ đạo** → bóc tách **nhiệm vụ** → theo dõi **tiến độ** → cập nhật **số liệu** → đánh giá **kết quả**
- Bảo đảm logic liên kết: chỉ tiêu ↔ nhiệm vụ ↔ số liệu ↔ minh chứng
- AI không được viết kế hoạch rời rạc, không tự bịa số liệu, đơn vị, kết quả

---

## Cấu trúc repo

```
nexus-gov-rules/
├── README.md                                          ← File này
├── 01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md     ← Quy tắc nền tảng
├── 02_WORKFLOW_BOCTACH_VB_v2.md                       ← Quy trình 7 bước bóc tách VB
└── 03_SCHEMA_REFERENCE.md                             ← Schema Airtable
```

### Mô tả từng file

| File | Nội dung | AI đọc khi nào |
|---|---|---|
| `01_QUY_TAC_...` | Nguyên tắc liên kết CT↔NV↔SL, trục số liệu 5 cấp, ma trận kiểm tra, quy tắc viết | **Luôn đọc trước** khi xây dựng, chỉnh sửa, rà soát kế hoạch |
| `02_WORKFLOW_...` | Quy trình 7 bước bóc tách VB thành dữ liệu Airtable | Khi được yêu cầu **nạp văn bản** vào hệ thống |
| `03_SCHEMA_...` | Cấu trúc 11 bảng Airtable, field types, quy tắc kỹ thuật | Khi cần **tra cứu** tên bảng, field, table ID |

---

## Cách sử dụng

### Với ChatGPT (Custom GPT hoặc chat thường)

1. Upload cả 3 file markdown vào cuộc trò chuyện
2. Prompt: *"Đọc 3 file quy tắc NEXUS Gov. Tôi sẽ gửi văn bản cần bóc tách."*
3. Gửi nội dung văn bản → ChatGPT sẽ theo workflow 7 bước

### Với Claude (Project hoặc chat thường)

1. Tạo Project, upload 3 file vào Project Knowledge
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
  Bước 0: Phân tích sơ bộ        ← Đánh giá VB, kiểm tra trùng lặp
  Bước 1: Nhập văn bản           ← Tạo record VanBan
  Bước 2: Bóc tách chỉ tiêu     ← Từng CT, 6 câu hỏi kiểm tra
  Bước 3: Bóc tách nhiệm vụ     ← Từng NV, phân 7 nhóm
  Bước 4: Kiểm tra liên kết     ← Ma trận CT↔NV
  Bước 5: Gán số liệu           ← Đúng cấp, đúng nguồn
  Bước 6: Cập nhật định kỳ      ← Theo kỳ báo cáo
```

---

## Nguyên tắc cốt lõi (tóm tắt)

| Nguyên tắc | Mô tả |
|---|---|
| Chỉ tiêu = đích đến | Kết quả cần đạt, đo lường được |
| Nhiệm vụ = cách làm | Đầu việc lớn để đạt chỉ tiêu |
| Mỗi CT phải có NV | Không có CT mồ côi |
| Mỗi NV phải gắn CT | Không có NV lạc |
| Trục SL đúng cấp | QG → TP → Xã → ĐV → Địa bàn |
| Không tự bịa | SL, VB, đơn vị, kết quả — thiếu thì hỏi |
| Đề xuất trước | Hiển thị dự kiến → chờ OK → mới ghi |
| Sửa 1 = rà soát tất cả | Sửa CT → kiểm tra NV, SL, PL tương ứng |

---

## Lịch sử phiên bản

| Ngày | Phiên bản | Thay đổi |
|---|---|---|
| 24/05/2026 | 1.0 | Khởi tạo: tách quy tắc nền tảng + workflow v2 (7 bước) + schema ref |

---

## Liên hệ

- **Phan Trung Hiếu** — Chuyên viên KHCN-CĐS, UBND xã An Thới Đông
- Hệ thống: NEXUS Gov trên Airtable
- Dự án thuộc: Phòng Văn hóa - Xã hội, UBND xã An Thới Đông, huyện Cần Giờ, TP.HCM
