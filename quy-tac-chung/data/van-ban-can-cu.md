# Danh mục văn bản căn cứ thường dùng — Xã An Thới Đông

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: cấp Trung ương do file này giữ; cấp Thành phố và cấp xã do Nexus `van_ban` giữ · ra_soat_lai: 2026-12-01 · rui_ro: cao

> **Chủ sở hữu dữ liệu — đọc trước khi dùng:**
> - **Cấp Trung ương:** Nexus KHÔNG có. File này là chủ sở hữu.
> - **Cấp Thành phố và cấp xã:** **Nexus `van_ban` là chủ sở hữu** — tra trực
>   tiếp, KHÔNG chép số hiệu vào file này. Tính đến 01/9/2026, Nexus có 27 văn
>   bản cấp Thành phố và 63 văn bản cấp xã.

---

## Cấp Trung ương — file này giữ

### Nghị quyết của Đảng

| Số hiệu | Ngày ban hành | Cơ quan ban hành | Về việc |
|---|---|---|---|
| **NQ 57-NQ/TW** | 22/12/2024 | Bộ Chính trị | Đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia |
| NQ 52-NQ/TW | 27/9/2019 | Bộ Chính trị | Chủ động tham gia cuộc Cách mạng công nghiệp lần thứ tư |

> NQ 57 là căn cứ trung tâm của lĩnh vực Hiếu phụ trách — xã đã có ít nhất 4
> văn bản triển khai (`2410/KH-UBND`, `2468/KH-UBND`, `2924/BC-UBND`,
> `03-BC/BCĐ`). Tra Nexus để lấy đúng số hiệu và ngày.

### Quyết định của Thủ tướng Chính phủ

| Số hiệu | Ngày ban hành | Về việc |
|---|---|---|
| QĐ 749/QĐ-TTg | 03/6/2020 | Chương trình Chuyển đổi số quốc gia đến năm 2025, định hướng đến 2030 |
| QĐ 942/QĐ-TTg | 15/6/2021 | Chiến lược phát triển Chính phủ điện tử hướng tới Chính phủ số |
| QĐ 411/QĐ-TTg | 31/3/2022 | Chiến lược quốc gia phát triển kinh tế số và xã hội số |

> **Lưu ý mốc thời gian:** cả ba quyết định trên đặt mốc đến 2025. Nay đã sang
> 2026 — vẫn dẫn chiếu được với tư cách định hướng, nhưng **không dẫn chỉ tiêu
> của giai đoạn đã kết thúc** như thể còn hiệu lực phấn đấu.

---

## Cấp Thành phố Hồ Chí Minh

### Thành ủy

| Số hiệu | Ngày | Về việc | Tình trạng |
|---|---|---|---|
| NQ 10-NQ/TU | 06/12/2021 | Chuyển đổi số, xây dựng TP.HCM thành đô thị thông minh | **CẦN XÁC MINH** |

> Số hiệu NQ 10-NQ/TU chưa xác minh được. Văn bản Thành ủy về chủ đề này tìm
> thấy được là **Chỉ thị 17-CT/TU** (Bí thư Thành ủy ký, về đẩy mạnh chuyển
> đổi số và xây dựng TP.HCM thành đô thị thông minh). **Chưa xác minh xong thì
> không đưa vào phần căn cứ của văn bản chính thức** — hỏi Hiếu hoặc tra công
> báo Thành phố trước.

### UBND Thành phố → TRA NEXUS

Không chép số hiệu vào đây. 27 văn bản cấp Thành phố đã có trong Nexus.

```sql
SELECT so_hieu, ngay_ban_hanh, co_quan_ban_hanh, ten_van_ban, trang_thai
FROM van_ban
WHERE cap_ban_hanh = 'tp' AND trang_thai = 'dang_hieu_luc'
ORDER BY ngay_ban_hanh DESC;
```

---

## Cấp xã An Thới Đông → TRA NEXUS

Không chép số hiệu vào đây. 63 văn bản cấp xã đã có trong Nexus, gồm kế hoạch
CĐS, kế hoạch NQ57, quyết định thành lập và kiện toàn.

```sql
SELECT so_hieu, ngay_ban_hanh, co_quan_ban_hanh, ten_van_ban
FROM van_ban
WHERE cap_ban_hanh = 'xa' AND trang_thai = 'dang_hieu_luc'
ORDER BY ngay_ban_hanh DESC;
```

Tìm theo chủ đề:

```sql
SELECT so_hieu, ngay_ban_hanh, ten_van_ban
FROM van_ban
WHERE trang_thai = 'dang_hieu_luc'
  AND (ten_van_ban ILIKE '%chuyển đổi số%' OR ten_van_ban ILIKE '%NQ57%'
       OR ten_van_ban ILIKE '%khoa học%')
ORDER BY ngay_ban_hanh DESC;
```

---

## Quy tắc khi soạn phần "Căn cứ"

1. **Không dẫn văn bản chưa tra.** Không nhớ chắc số hiệu thì để `[...]` và
   hỏi — không suy ra từ văn bản gần giống.
2. **Đủ 4 thành phần:** số hiệu + ngày ban hành + cơ quan ban hành + trích yếu.
3. **Chuỗi căn cứ theo mô hình 2 cấp:** Trung ương → Thành phố → Xã. Không có
   cấp huyện.
4. **Kiểm `trang_thai = 'dang_hieu_luc'`** khi lấy văn bản từ Nexus.
5. Văn bản đánh dấu **CẦN XÁC MINH** trong file này: chưa được dùng làm căn cứ.
