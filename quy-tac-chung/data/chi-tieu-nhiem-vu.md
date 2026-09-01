# Chỉ tiêu, nhiệm vụ — tra ở đâu

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: Nexus `dti_chi_tieu`, `theo_doi_cd`, `giao_muc` · ra_soat_lai: 2026-12-01 · rui_ro: cao

> **File này KHÔNG lưu chỉ tiêu.** Chủ sở hữu là Nexus. File chỉ giữ con trỏ
> và ghi rõ chỗ nào Nexus chưa có, để không ai đi bịa số.

---

## 1. Chỉ tiêu DTI — nguồn đầy đủ nhất, dùng trước tiên

**Bộ chỉ số đánh giá chuyển đổi số TP.HCM** — căn cứ **QĐ 3336/QĐ-UBND ngày
05/6/2026**, thay thế QĐ 3117/QĐ-UBND ngày 10/12/2025 (áp dụng năm 2025).

Trong Nexus: **100 chỉ tiêu + 34 đề mục**, chia 9 nhóm, có đánh dấu bắt buộc.

```sql
SELECT ct.nhom_tab, ct.ma_chi_tieu, ct.ten_chi_tieu, ct.loai_du_lieu, ct.bat_buoc,
       sl.ten_so_lieu AS so_lieu_da_noi, dv.ten_don_vi AS don_vi_cung_cap
FROM dti_chi_tieu ct
LEFT JOIN dti_mapping m ON m.chi_tieu_id = ct.id
LEFT JOIN so_lieu sl ON sl.id = m.so_lieu_id
LEFT JOIN don_vi dv ON dv.id = m.don_vi_cung_cap_id
WHERE ct.la_de_muc IS NOT TRUE
ORDER BY ct.nhom_tab, ct.thu_tu;
```

**Cảnh báo khi dùng (đếm 01/9/2026):**
- 66/100 chỉ tiêu đã nối được với `so_lieu`; **34 chỉ tiêu còn lại chưa có
  đường lấy số**.
- Nhóm **"Thể chế số" chưa nối được mục nào** (0/7).
- **`da_lien_he` = chưa ở cả 116/116 dòng mapping** — chưa liên hệ đơn vị cung
  cấp nào. Số lấy ra chỉ là số đã có sẵn trong Nexus, không phải số đơn vị vừa
  xác nhận.

---

## 2. Chỉ tiêu, nhiệm vụ giao theo văn bản

```sql
SELECT v.so_hieu, t.loai, t.ma_tdcd, t.ten_noi_dung, t.trang_thai,
       dv.ten_don_vi AS chu_tri
FROM theo_doi_cd t
JOIN giao_muc g ON g.theo_doi_cd_id = t.id
JOIN van_ban v ON v.id = g.van_ban_id
LEFT JOIN don_vi dv ON dv.id = t.don_vi_chu_tri_id
WHERE v.so_hieu = '<số hiệu>'
ORDER BY t.loai, t.ma_tdcd;
```

**Văn bản đã bóc tách vào Nexus (01/9/2026):**

| Số hiệu | Chỉ tiêu | Nhiệm vụ |
|---|---|---|
| `06-KH/BCĐ` — 100 ngày xử lý điểm nghẽn CĐS | 16 | 33 |
| `2468/KH-UBND` — NQ57 xã năm 2026 | 20 | 24 |
| `02-KH/BCĐ` — NQ57 năm 2026 | 19 | 9 |
| `2326/KH-UBND` — Bình dân học vụ số | 5 | 26 |

**Cảnh báo:** 16 chỉ tiêu của `06-KH/BCĐ` **chưa có đơn vị chủ trì và chưa gắn
số liệu nào** — trong khi kế hoạch này đang phải báo cáo hằng tuần.

---

## 3. Ba kế hoạch CHƯA bóc tách — đây là khoảng trống thật

| Số hiệu | Tên | Trong Nexus |
|---|---|---|
| `2469/KH-UBND` | Kế hoạch CĐS và phát triển ĐTTM trên địa bàn xã **năm 2026** | **0 chỉ tiêu, 0 nhiệm vụ** |
| `2470/KH-UBND` | Kế hoạch triển khai hoạt động KHCN, ĐMST & CĐS năm 2026 | **0** |
| `2410/KH-UBND` | KH thực hiện NQ57 giai đoạn 2026–2030 | **0** |

Ba văn bản này **đã có trong `van_ban`** nhưng phần chỉ tiêu, nhiệm vụ chưa
được bóc tách. Cần chỉ tiêu của kế hoạch CĐS năm 2026 thì **không có trong hệ
thống** — phải mở văn bản gốc. **Không suy ra từ kế hoạch khác, không ước
lượng.**

---

## 4. Số liệu thực hiện

Tra `so_lieu` + `cap_nhat_so_lieu`. Xem cảnh báo trong
`data/an-toan-du-lieu.md` và checklist nhóm A của skill `kiem-chuan`:
`trang_thai` không phân biệt được, phải nhóm theo `don_vi_id`, và 141 bản ghi
còn trống cột `nguon`.
