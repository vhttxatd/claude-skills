# NEXUS Gov — Quy tắc bóc tách văn bản và quản lý kế hoạch

> ⚠️ **ĐÃ CHUYỂN SANG SUPABASE (19/07/2026)** — Đọc [`MIGRATION-NOTICE.md`](./MIGRATION-NOTICE.md) TRƯỚC khi dùng file này. Chi tiết Airtable bên dưới chỉ còn giá trị lịch sử/khái niệm.


> **Trigger:** Khi người dùng yêu cầu bóc tách văn bản hành chính, nạp dữ liệu kế hoạch, xây dựng/chỉnh sửa/rà soát kế hoạch, hoặc cập nhật chỉ tiêu/nhiệm vụ/số liệu vào hệ thống NEXUS Gov.
> **Mục đích:** Bảo đảm AI tuân thủ nguyên tắc liên kết chỉ tiêu ↔ nhiệm vụ ↔ số liệu ↔ minh chứng, không bóc tách rời rạc, không tự bịa dữ liệu.

---

## Khi nào dùng skill này

- Nhận được văn bản hành chính cần bóc tách thành dữ liệu có cấu trúc
- Xây dựng hoặc chỉnh sửa kế hoạch (KH, NQ, QĐ, CT...)
- Nạp chỉ tiêu, nhiệm vụ, số liệu vào Supabase (NEXUS Gov)
- Rà soát liên kết giữa chỉ tiêu và nhiệm vụ trong kế hoạch
- Cập nhật số liệu, kết quả thực hiện định kỳ
- Kiểm tra trùng lặp dữ liệu trước khi tạo mới

## Các file tham chiếu

| File | Nội dung | Đọc khi nào |
|---|---|---|
| `01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md` | Nguyên tắc nền tảng: liên kết CT↔NV↔SL, trục số liệu 5 cấp, ma trận kiểm tra, 7 nhóm NV, quy tắc viết | **Luôn đọc trước** khi bắt đầu |
| `02_WORKFLOW_BOCTACH_VB_v2.1.md` | Quy trình 7 bước: bóc CT+SL đồng thời, ma trận 3 chiều CT↔NV↔SL, rà soát SL phân cấp | Khi **nạp văn bản** vào hệ thống |
| `03_SCHEMA_REFERENCE.md` | Schema V5: 11 bảng, SL phân cấp (Thành phần/Tổng hợp/Công thức), NV↔CT linked | Khi cần **tra cứu** bảng, field, ID |

## Nguyên tắc tóm tắt

```
Chỉ tiêu = đích đến
Nhiệm vụ = cách làm
Đơn vị chủ trì = nơi chịu trách nhiệm chính
Nguồn số liệu = nơi chứng minh kết quả
Minh chứng = căn cứ để báo cáo
Sửa 1 phần = rà soát các phần liên quan
KHÔNG tự bịa số liệu, văn bản, đơn vị, kết quả
```

## Kết nối Supabase (từ 19/07/2026)

- **Project ID:** `zkgtrdrvlppyxusgzjnz`
- **MCP Server:** Supabase MCP
- Xem [`MIGRATION-NOTICE.md`](./MIGRATION-NOTICE.md) cho danh sách đầy đủ 39 bảng và bảng nào đã xác minh cột.
- *(Base ID Airtable cũ, không còn dùng: `appJhjI3TCfnmkpeo`)*
