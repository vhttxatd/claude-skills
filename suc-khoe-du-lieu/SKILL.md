---
name: suc-khoe-du-lieu
description: >
  Routine rà soát sức khỏe dữ liệu định kỳ cho Nexus và Notion. Chạy một bộ
  truy vấn cố định, so với mốc chuẩn 01/9/2026, rồi xuất BẢN NHÁP báo cáo.
  Kích hoạt khi Hiếu nói "kiểm tra sức khỏe dữ liệu", "rà soát định kỳ",
  "chạy sức khỏe kho", "so với mốc chuẩn". CHỈ ĐỌC — không ghi, không sửa,
  không xóa bất cứ thứ gì.
---

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: kết quả 4 vòng kiểm ngày 01/9/2026 · ra_soat_lai: 2026-12-01 · rui_ro: trung

# Skill: Sức khỏe dữ liệu — routine định kỳ

Tuân theo 4 nguyên tắc vận hành trong `tao-skill`.

Đây là **routine tự động đầu tiên** của hệ thống (mức L5). Nó được chọn vì
thỏa cả 6 điều kiện trong `quy-tac-chung/data/an-toan-du-lieu.md`: chỉ đọc,
chỉ sinh nháp, có người duyệt, phạm vi hẹp, có vết, và dừng được bất cứ lúc
nào bằng cách không gọi nó.

## RANH GIỚI — đọc trước khi chạy

- **Không `INSERT`, không `UPDATE`, không `DELETE`.** Routine này chỉ chạy
  `SELECT`. Phát hiện lỗi thì **báo**, không tự sửa.
- **Không tự chạy.** Chỉ chạy khi Hiếu gọi. Không nhắc, không tự đề xuất chạy
  giữa một công việc khác.
- **Kết quả là BẢN NHÁP.** Hiếu đọc, quyết định, rồi mới có ai đó sửa dữ liệu.
- Nếu Notion báo hết hạn mức truy vấn: **ghi rõ mục nào không kiểm được**,
  không đoán, không bỏ qua im lặng.

---

## BƯỚC 1 — Chạy 8 truy vấn cố định (Nexus)

Chạy đúng thứ tự này. Mỗi truy vấn kèm **mốc chuẩn 01/9/2026** để thấy xu hướng.

**1.1 Số bảng và dung lượng**
```sql
SELECT count(*) AS so_bang, sum(n_live_tup) AS tong_dong
FROM pg_stat_user_tables WHERE schemaname='public';
```
*Mốc: 79 bảng.* Số bảng tăng → có mô-đun mới chưa vào `kho-luu-tru`.

**1.2 Số liệu thiếu nguồn**
```sql
SELECT count(*) AS tong, count(*) FILTER (WHERE nguon IS NULL OR btrim(nguon)='') AS thieu_nguon
FROM cap_nhat_so_lieu;
```
*Mốc: 324 bản ghi, 258 thiếu nguồn.* Thiếu nguồn tăng → nhập liệu đang bỏ qua cột này.

**1.3 Mâu thuẫn giá trị**
```sql
SELECT count(*) FROM (
  SELECT so_lieu_id, nam, ky, don_vi_id FROM cap_nhat_so_lieu
  GROUP BY so_lieu_id, nam, ky, don_vi_id
  HAVING count(*)>1 AND count(DISTINCT gia_tri)>1) x;
```
*Mốc: 0.* **Khác 0 là phải xử lý ngay** — có chỉ số hai giá trị cho cùng một kỳ.
Nhớ nhóm theo `don_vi_id`, bỏ cột này ra sẽ báo động giả khoảng 90%.

**1.4 Dòng trùng y hệt**
```sql
SELECT count(*) AS nhom, coalesce(sum(n-1),0) AS dong_thua FROM (
  SELECT so_lieu_id, nam, ky, don_vi_id, count(*) AS n, count(DISTINCT gia_tri) AS gt
  FROM cap_nhat_so_lieu GROUP BY so_lieu_id, nam, ky, don_vi_id) x
WHERE n>1 AND gt=1;
```
*Mốc: 5 nhóm, 10 dòng thừa.* Vô hại khi đọc từng dòng, sai khi `SUM`.

**1.5 Liên kết chỉ tiêu ↔ nhiệm vụ**
```sql
SELECT
 (SELECT count(*) FROM theo_doi_cd WHERE loai='chi_tieu') AS chi_tieu,
 (SELECT count(*) FROM theo_doi_cd WHERE loai='nhiem_vu') AS nhiem_vu,
 (SELECT count(*) FROM theo_doi_cd t WHERE t.loai='nhiem_vu'
    AND NOT EXISTS (SELECT 1 FROM theo_doi_cd_lien_ket l WHERE l.nhiem_vu_id=t.id)) AS nv_khong_gan_ct,
 (SELECT count(*) FROM theo_doi_cd t WHERE t.loai='chi_tieu'
    AND NOT EXISTS (SELECT 1 FROM theo_doi_cd_so_lieu s WHERE s.theo_doi_cd_id=t.id)) AS ct_khong_co_so_lieu,
 (SELECT count(*) FROM theo_doi_cd WHERE don_vi_chu_tri_id IS NULL) AS thieu_chu_tri;
```
*Mốc: 37 chỉ tiêu · 85 nhiệm vụ · 74 chưa gắn chỉ tiêu · 29 chưa có số liệu · 55 thiếu chủ trì.*
Các con số sau **cần giảm dần**. Tăng nghĩa là dữ liệu mới vào mà không nối.

**1.6 Đơn vị đang hoạt động**
```sql
SELECT trang_thai, count(*) FROM don_vi GROUP BY trang_thai;
```
*Mốc: 8 ấp và 6 trường đang hoạt động, 4 trường đã giải thể.*

**1.7 DTI — đường lấy số**
```sql
SELECT count(*) FILTER (WHERE ct.la_de_muc IS NOT TRUE) AS chi_tieu,
       count(*) FILTER (WHERE m.so_lieu_id IS NOT NULL) AS da_noi_so_lieu,
       count(*) FILTER (WHERE m.id IS NOT NULL AND m.da_lien_he IS NOT TRUE) AS chua_lien_he_don_vi
FROM dti_chi_tieu ct LEFT JOIN dti_mapping m ON m.chi_tieu_id=ct.id;
```
*Mốc: 100 chỉ tiêu · 66 đã nối · 116 chưa liên hệ đơn vị.*

**1.8 Kế hoạch chưa bóc tách**
```sql
SELECT v.so_hieu, left(v.ten_van_ban,50) AS ten
FROM van_ban v
WHERE v.cap_ban_hanh='xa' AND v.loai ILIKE '%k%ho%ch%'
  AND NOT EXISTS (SELECT 1 FROM giao_muc g WHERE g.van_ban_id=v.id)
ORDER BY v.ngay_ban_hanh DESC LIMIT 15;
```
*Mốc: `2469/KH-UBND`, `2470/KH-UBND`, `2410/KH-UBND` đều chưa bóc tách.*

---

## BƯỚC 2 — Hai truy vấn Notion (nếu còn hạn mức)

**2.1 Kho văn bản — độ đầy đủ**
```sql
SELECT count(*) AS van_ban_that,
  sum(CASE WHEN "date:Ng BH:start" IS NULL THEN 1 ELSE 0 END) AS thieu_ngay_bh,
  sum(CASE WHEN "Link" IS NULL OR "Link"='' THEN 1 ELSE 0 END) AS thieu_link
FROM "collection://2134aaf2-6213-81cd-ba93-000bbb6fe99e" WHERE "Loại VB" IS NOT NULL;
```
*Mốc: 648 văn bản thật · thiếu ngày BH 5 · thiếu link 188.*
**Bắt buộc lọc `Loại VB IS NOT NULL`** — không lọc thì trang gộp nhóm "COT ..."
sẽ bị đếm nhầm thành thiếu dữ liệu.

**2.2 TodoListATĐ — độ lấp đầy phân loại**
```sql
SELECT count(*) AS tong,
  sum(CASE WHEN "Loại CV" IS NULL THEN 1 ELSE 0 END) AS trong_loai,
  sum(CASE WHEN "Lĩnh vực" IS NULL THEN 1 ELSE 0 END) AS trong_linh_vuc
FROM "collection://2134aaf2-6213-8102-8c1e-000bfd9d91dd";
```
*Mốc: 276 việc · trống Loại 47 · trống Lĩnh vực 203.*

---

## BƯỚC 3 — Xuất bản nháp

Xuất một file `.md` tên `suc-khoe-du-lieu-<YYYY-MM-DD>.md`, gồm đúng 4 phần:

1. **Bảng so sánh** — mỗi chỉ số: mốc chuẩn · lần này · chênh · nhận định
   (tốt lên / xấu đi / không đổi).
2. **Việc cần xử lý** — chỉ những mục xấu đi hoặc vượt ngưỡng. Mỗi mục 3 dòng:
   vị trí · vấn đề · cần làm. Không gộp, không diễn giải dài.
3. **Không kiểm được** — mục nào không chạy được và vì sao (hết hạn mức
   Notion, bảng đã đổi tên, quyền truy cập).
4. **Không có gì đổi** — liệt kê ngắn các chỉ số giữ nguyên, để Hiếu biết đã
   kiểm chứ không phải bỏ qua.

**Ngưỡng báo động — vượt là phải nói ngay ở đầu bản nháp:**

| Chỉ số | Ngưỡng |
|---|---|
| Mâu thuẫn giá trị (1.3) | **khác 0** |
| Số liệu thiếu nguồn (1.2) | tăng so với lần trước |
| Chỉ tiêu thiếu chủ trì (1.5) | tăng |
| Kế hoạch chưa bóc tách (1.8) | có kế hoạch mới trong danh sách |

---

## LƯU VẾT

Bản nháp mỗi lần chạy là vết. Hiếu lưu vào Google Drive theo tên file đã đặt.
**Không ghi kết quả vào Nexus hay Notion** — routine này không được phép ghi.

Lần chạy sau, đọc bản nháp gần nhất để so, thay vì chỉ so với mốc 01/9/2026.

## ĐỊNH NGHĨA "CHẠY XONG"

- Đủ 8 truy vấn Nexus, có kết quả hoặc có lý do không chạy được.
- Hai truy vấn Notion đã chạy, hoặc đã ghi rõ là hết hạn mức.
- Bản nháp đủ 4 phần, phần 3 không bỏ trống nếu có mục không kiểm được.
- **Không có thao tác ghi nào được thực hiện.**

Thiếu bất kỳ điều nào ở trên thì chưa được báo là chạy xong.

## NHỊP CHẠY ĐỀ XUẤT

Hàng tháng, hoặc trước mỗi kỳ báo cáo quý. Không cần chạy hằng tuần — dữ liệu
không đổi nhanh đến thế, và chạy quá dày sẽ làm bản nháp thành thứ không ai đọc.
