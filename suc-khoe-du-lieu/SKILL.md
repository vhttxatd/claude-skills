---
name: suc-khoe-du-lieu
description: >
  Routine rà soát sức khỏe dữ liệu định kỳ cho Nexus và Notion. Chạy một bộ
  truy vấn cố định, so với mốc chuẩn 02/9/2026, rồi xuất BẢN NHÁP báo cáo.
  Kích hoạt khi Hiếu nói "kiểm tra sức khỏe dữ liệu", "rà soát định kỳ",
  "chạy sức khỏe kho", "so với mốc chuẩn". CHỈ ĐỌC — không ghi, không sửa,
  không xóa bất cứ thứ gì.
---

> **META** · cap_nhat: 2026-09-02 · nguon_su_that: lần chạy thật đầu tiên ngày 02/9/2026 · ra_soat_lai: 2026-12-01 · rui_ro: trung

> **Nhắc kỷ luật vận hành:** Nếu phiên chat này CHƯA đọc `quy-tac-chung/data/ky-luat-van-hanh.md` (5 quy tắc tiết kiệm token & bàn giao), đọc trước khi tiếp tục — quy tắc đó áp dụng bất kể skill nào đang chạy.

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

## LỊCH SỬ CHẠY

| Lần | Ngày | Kết quả |
|---|---|---|
| 1 | 02/9/2026 | Không vượt ngưỡng nào. Nhưng lộ 5 lỗi trong chính bộ truy vấn — đã sửa ở bản này. |

---

## BƯỚC 1 — Chạy 8 truy vấn cố định (Nexus)

Chạy đúng thứ tự này. Mỗi truy vấn kèm **mốc chuẩn 02/9/2026**.

**1.1 Số bảng và dung lượng**
```sql
SELECT count(*) AS so_bang, sum(n_live_tup) AS tong_dong
FROM pg_stat_user_tables WHERE schemaname='public';
```
*Mốc: 79 bảng · 3.640 dòng.* Số bảng tăng → có mô-đun mới chưa vào `kho-luu-tru`.

**1.2 Số liệu thiếu nguồn**
```sql
SELECT count(*) AS tong, count(*) FILTER (WHERE nguon IS NULL OR btrim(nguon)='') AS thieu_nguon,
       count(DISTINCT so_lieu_id) FILTER (WHERE nguon IS NULL OR btrim(nguon)='') AS so_chi_so
FROM cap_nhat_so_lieu;
```
*Mốc: 324 bản ghi · 256 thiếu nguồn · thuộc 110 chỉ số.*
Thiếu nguồn tăng → nhập liệu đang bỏ qua cột này.

> Mốc cũ ghi "258 thiếu nguồn" là **sai**: con số đó chụp trước khi phiên 01/9
> xóa 2 dòng mâu thuẫn (khi đó tổng là 326). 324 và 258 chưa bao giờ cùng tồn tại.

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
 (SELECT count(*) FROM theo_doi_cd
    WHERE don_vi_chu_tri_id IS NULL
      AND coalesce(array_length(don_vi_chu_tri_ids,1),0)=0) AS thieu_chu_tri;
```
*Mốc: 37 chỉ tiêu · 85 nhiệm vụ · 74 chưa gắn chỉ tiêu · 29 chưa có số liệu ·
**12** thiếu chủ trì.* Các con số sau cần giảm dần.

> ⚠️ **Bẫy đã mắc một lần.** Bảng `theo_doi_cd` có **hai** cột chủ trì:
> `don_vi_chu_tri_id` (một đơn vị) và `don_vi_chu_tri_ids` (mảng). Bản cũ chỉ
> đọc cột thứ nhất và báo 55 thiếu, trong khi 43 dòng đã có chủ trì ở cột mảng.
> **Phải kiểm cả hai cột.** Số thật là 12.

**1.6 Đơn vị đang hoạt động**
```sql
SELECT coalesce(loai::text,'(chua ghi loai)') AS loai, trang_thai::text AS trang_thai,
       count(*) AS n, string_agg(left(ten_don_vi,25), ' | ' ORDER BY ten_don_vi) AS ds
FROM don_vi GROUP BY 1,2 ORDER BY 1,2;
```
*Mốc: 28 `co_quan_nha_nuoc` đang hoạt động · 4 `co_quan_nha_nuoc` đã giải thể ·
10 đơn vị chưa ghi `loai` (8 ấp + Đảng ủy xã + HĐND xã).*
Trong nhóm đang hoạt động phải đọc được: **8 ấp, 6 trường** (MN/TH/THCS An Thới
Đông và Lý Nhơn). 4 trường đã giải thể: MN Doi Lầu, TH Doi Lầu, TH Vàm Sát,
THCS Doi Lầu.

> Bản cũ chỉ `GROUP BY trang_thai` — trả về 2 dòng, **không đủ để kiểm** mốc
> "8 ấp / 6 trường" mà chính nó phát biểu. Phải nhóm theo `loai` và đọc tên.

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
SELECT v.so_hieu, to_char(v.ngay_ban_hanh,'YYYY-MM-DD') AS ngay, left(v.ten_van_ban,60) AS ten
FROM van_ban v
WHERE v.cap_ban_hanh::text='xa' AND v.loai::text ILIKE '%k%ho%ch%'
  AND NOT EXISTS (SELECT 1 FROM giao_muc g WHERE g.van_ban_id=v.id)
ORDER BY v.ngay_ban_hanh DESC;
```
*Mốc: **36 kế hoạch**.* Ba kế hoạch ưu tiên cao nhất: `2469/KH-UBND`,
`2470/KH-UBND`, `2410/KH-UBND`.

> Bản cũ có hai lỗi. `v.loai ILIKE` **báo lỗi và không chạy** — `loai` là kiểu
> `enum`, phải ép `::text`. Và `LIMIT 15` che mất quy mô thật: 36 chứ không
> phải 3. Khi báo cáo, tách rõ kế hoạch **cần bóc tách** với kế hoạch **tra
> cứu** (`1583/KH-UBND` đã chốt là tra cứu — có mặt trong danh sách là bình thường).

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

## ĐÃ KIỂM — KHÔNG PHẢI LỖI, ĐỪNG BÁO LẠI

Ba mục dưới đây trông như lỗi, đã kiểm tận nơi ngày 02/9 và kết luận là bình
thường. Lần sau gặp lại thì **bỏ qua**, đừng đưa vào phần "việc cần xử lý".

| Hiện tượng | Vì sao không phải lỗi |
|---|---|
| 6 nhiệm vụ trong `2326/KH-UBND` bị gắn 2–8 lần trong `giao_muc` | Mỗi dòng có `stt_trong_vb` và `ten_trong_vb` **khác nhau**. Một nhiệm vụ khung nhận nhiều đầu việc cụ thể — đúng thiết kế. |
| 15 chỉ tiêu `TDCD-260813-*` của `06-KH/BCĐ` báo thiếu chủ trì | Chủ trì ghi ở cột mảng `don_vi_chu_tri_ids`. Đủ cả 15. |
| `1583/KH-UBND` nằm trong danh sách chưa bóc tách | Đã chốt là văn bản **tra cứu**, không theo dõi tiến độ. |

Riêng `TDCD-260813-08` **thật sự không tồn tại** — mã nhảy từ 07 sang 09. Chỉ
tiêu của `06-KH/BCĐ` là **15**, không phải 16. Cần đối chiếu bản gốc xem có bỏ sót.

---

## BƯỚC 3 — Xuất bản nháp

Xuất một file `.md` tên `suc-khoe-du-lieu-<YYYY-MM-DD>.md`, gồm đúng 4 phần:

1. **Bảng so sánh** — mỗi chỉ số: mốc chuẩn · lần này · chênh · nhận định
   (tốt lên / xấu đi / không đổi).
2. **Việc cần xử lý** — chỉ những mục xấu đi hoặc vượt ngưỡng. Mỗi mục 3 dòng:
   vị trí · vấn đề · cần làm. Không gộp, không diễn giải dài.
3. **Không kiểm được** — mục nào không chạy được và vì sao.
4. **Không có gì đổi** — liệt kê ngắn các chỉ số giữ nguyên.

Cuối bản nháp ghi **bảng mốc chuẩn mới** để lần sau so.

**Ngưỡng báo động — vượt là phải nói ngay ở đầu bản nháp:**

| Chỉ số | Ngưỡng |
|---|---|
| Mâu thuẫn giá trị (1.3) | **khác 0** |
| Số liệu thiếu nguồn (1.2) | tăng so với lần trước |
| Chỉ tiêu thiếu chủ trì (1.5) | tăng |
| Kế hoạch chưa bóc tách (1.8) | có kế hoạch **mới** trong danh sách |
| Số bảng Nexus (1.1) | tăng mà `kho-luu-tru` chưa cập nhật |

---

## TRƯỚC KHI KẾT LUẬN BẤT KỲ CON SỐ NÀO

Bài học rút từ lần chạy 1 — ba trong năm lỗi của bộ truy vấn cũ đều cùng một
nguyên nhân: **đọc sai cột hoặc nhóm sai cột**.

1. Cột này có cột "anh em" nào không? (`don_vi_chu_tri_id` ↔ `don_vi_chu_tri_ids`)
2. Truy vấn có thật sự chứng minh được điều mốc chuẩn phát biểu không?
3. Có `LIMIT` nào đang che mất quy mô thật không?
4. Kiểu dữ liệu có phải `enum` không? (`enum` không dùng được `ILIKE` nếu không ép `::text`)
5. Con số này có kiểm chéo được bằng một phép cộng độc lập không?

**Lớp kiểm sai còn tệ hơn không kiểm** — nó tạo việc giả và làm mất niềm tin
vào chính nó.

---

## LƯU VẾT

Bản nháp mỗi lần chạy là vết. Hiếu lưu vào Google Drive theo tên file đã đặt.
**Không ghi kết quả vào Nexus hay Notion** — routine này không được phép ghi.

Lần chạy sau, đọc bản nháp gần nhất để so, thay vì chỉ so với mốc trong skill.

## ĐỊNH NGHĨA "CHẠY XONG"

- Đủ 8 truy vấn Nexus, có kết quả hoặc có lý do không chạy được.
- Hai truy vấn Notion đã chạy, hoặc đã ghi rõ là hết hạn mức.
- Bản nháp đủ 4 phần, phần 3 không bỏ trống nếu có mục không kiểm được.
- Có bảng mốc chuẩn mới ở cuối.
- **Không có thao tác ghi nào được thực hiện.**

Thiếu bất kỳ điều nào ở trên thì chưa được báo là chạy xong.

## NHỊP CHẠY ĐỀ XUẤT

Hàng tháng, hoặc trước mỗi kỳ báo cáo quý. Không cần chạy hằng tuần — dữ liệu
không đổi nhanh đến thế, và chạy quá dày sẽ làm bản nháp thành thứ không ai đọc.
