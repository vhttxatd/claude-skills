# THÔNG BÁO: NEXUS Gov đã chuyển từ Airtable sang Supabase

> **Ngày xác nhận chuyển đổi:** 19/07/2026 (do Phan Trung Hiếu xác nhận trực tiếp)
> **File này là nguồn tham chiếu chính** cho mọi AI khi làm việc với hệ thống NEXUS Gov hiện tại. Các file `01_`, `02_`, `03_` trong thư mục này mô tả **hệ thống Airtable cũ** — nguyên tắc nghiệp vụ (liên kết chỉ tiêu ↔ nhiệm vụ ↔ số liệu ↔ minh chứng) về khái niệm vẫn còn giá trị tham khảo, nhưng **mọi chi tiết kỹ thuật Airtable (Base ID, linked record dạng array, tên bảng/field) KHÔNG còn đúng.**

## Hệ thống hiện tại

- **Nền tảng:** Supabase (Postgres)
- **Project ID:** `zkgtrdrvlppyxusgzjnz`
- **MCP Server:** Supabase MCP (không phải Airtable MCP)
- **Cách truy vấn:** SQL qua `execute_sql`, không dùng cú pháp "linked record = array" của Airtable — quan hệ giữa các bảng là khóa ngoại (foreign key uuid), nối bằng `JOIN`.

## Đã xác minh (verified 19/07/2026, bằng `list_tables`)

Hệ thống Supabase có **39 bảng** trong schema `public` — nhiều hơn đáng kể so với 11 bảng Airtable V5 mô tả trong `03_SCHEMA_REFERENCE.md`. Danh sách đầy đủ (tên, số dòng tại thời điểm kiểm tra):

`don_vi`(34) · `profiles`(40) · `linh_vuc`(95) · `nhom_so_lieu`(57) · `so_lieu`(186) · `cap_nhat_so_lieu`(147) · `van_ban`(43) · `theo_doi_cd`(35) · `giao_muc`(28) · `khoi_co_quan`(8) · `loai_van_ban`(7) · `cap_ban_hanh`(3) · `cong_viec_con`(2) · `bao_cao`(6) · `bao_cao_muc`(61) · `bao_cao_item`(10) · `ket_qua`(12) · `bao_cao_phien_ban`(2) · `theo_doi_cd_so_lieu`(72) · `so_lieu_cong_thuc_bien`(35) · `so_lieu_don_vi`(431) · `vai_tro_chuc_nang`(164) · `vai_tro_pham_vi_mac_dinh`(11) · `phan_cong_cap_nhat`(75) · `theo_doi_cd_lien_ket`(8) · `ai_cau_hinh`(4) · `van_ban_theo_doi`(9) · `ttso_kenh_config`(2) · `ttso_ket_qua`(8) · `ttso_noi_dung`(1) · `ttso_linh_vuc`(3) · `ttso_noi_dung_phien_ban`(2) · `ket_qua_minh_chung`(2) · `cau_hinh_he_thong`(2) · `dt_cau_hinh`(1) · `dt_don_vi`(18) · `dt_khoan_muc_pl1`(0) · `dt_nhiem_vu_pl2`(0) · `ket_qua_minh_chung_ngoai`(2) · `huong_dan`(14)

Trong đó, **8 bảng sau đã được thao tác trực tiếp và xác minh cột/công dụng** trong phiên làm việc 17–19/07/2026 (quy trình xử lý văn bản đến):

| Bảng | Vai trò (đã xác minh qua sử dụng thực tế) |
|---|---|
| `van_ban` | Kho văn bản gốc — cột `id`, `so_hieu` đã dùng |
| `theo_doi_cd` | Nhiệm vụ/chỉ tiêu theo dõi — cột `id`, `ma_tdcd`, `ten_noi_dung` đã dùng |
| `cong_viec_con` | Việc con thuộc một `theo_doi_cd` |
| `ket_qua` | Kết quả thực hiện theo kỳ báo cáo — cột `id`, `theo_doi_cd_id`, `noi_dung`, `ky_bao_cao`, `ky_so`, `nam_bao_cao`, `created_at` đã dùng |
| `ket_qua_minh_chung` | Minh chứng = văn bản trong kho `van_ban` — cột `ket_qua_id`, `van_ban_id` |
| `ket_qua_minh_chung_ngoai` | Minh chứng = link ngoài + mô tả — cột `ket_qua_id`, `noi_dung`, `link` |
| `so_lieu` / `cap_nhat_so_lieu` | Số liệu và giá trị theo kỳ — `cap_nhat_so_lieu.ghi_chu` phải luôn ghi đầy đủ, tự giải thích (dùng làm input soạn báo cáo AI) |
| `don_vi` | Danh mục đơn vị |

**30 bảng còn lại** (`profiles`, `linh_vuc`, `nhom_so_lieu`, `giao_muc`, `khoi_co_quan`, `loai_van_ban`, `cap_ban_hanh`, `bao_cao*`, `theo_doi_cd_so_lieu`, `so_lieu_cong_thuc_bien`, `so_lieu_don_vi`, `vai_tro_*`, `phan_cong_cap_nhat`, `theo_doi_cd_lien_ket`, `ai_cau_hinh`, `van_ban_theo_doi`, `ttso_*`, `cau_hinh_he_thong`, `dt_*`, `huong_dan`) — **CHƯA được đối chiếu cột/quan hệ chi tiết**. Không suy đoán cấu trúc các bảng này từ tên gọi; luôn `list_tables`/truy vấn `information_schema` để xác minh trước khi thao tác.

## Việc còn thiếu (chưa làm, cần một phiên riêng)

- Viết lại đầy đủ `03_SCHEMA_REFERENCE.md` theo đúng schema Supabase (39 bảng, kiểu dữ liệu, khóa ngoại) — hiện tại file đó vẫn mô tả schema Airtable V5 cũ, chỉ mang tính lịch sử.
- Rà soát `01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md` và `02_WORKFLOW_BOCTACH_VB_v2.1.md` để thay thuật ngữ/cơ chế Airtable (linked record array, Base ID) bằng cơ chế Supabase (foreign key, SQL JOIN) — nguyên tắc nghiệp vụ giữ nguyên, chỉ cơ chế kỹ thuật cần đổi.

## Rủi ro nếu bỏ qua thông báo này

Nếu một AI khác đọc trực tiếp `01_`/`02_`/`03_` mà không thấy file này trước, có thể cố gắng gọi Airtable MCP (không tồn tại) hoặc dùng sai cú pháp linked-record, dẫn đến lỗi hoặc — nguy hiểm hơn — tự bịa ra công cụ/ID không có thật. **Luôn đọc file này trước khi dùng `nexus-gov-rules/`.**
