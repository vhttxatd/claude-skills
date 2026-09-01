# L3 — Lĩnh vực Thương mại — Dịch vụ

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì)

---

## [A] HIỆN TRẠNG

- **Chợ xã An Thới Đông** đang hoạt động, phục vụ nhu cầu giao thương của Nhân dân ^[KH1583]
- Có các cửa hàng bán lẻ truyền thống trên địa bàn xã ^[KH1583]

---

## [B] ĐỊNH HƯỚNG (Giai đoạn 2026–2030)

### Chỉ tiêu → TRA NEXUS

> Đã bóc tách vào Nexus ngày 01/9/2026. **Không chép chỉ tiêu vào file này.**

```sql
SELECT t.ma_tdcd, t.ten_noi_dung, t.trang_thai
FROM theo_doi_cd t
JOIN giao_muc g ON g.theo_doi_cd_id = t.id
JOIN van_ban v ON v.id = g.van_ban_id AND v.so_hieu = '1583/KH-UBND'
JOIN linh_vuc lv ON lv.id = t.linh_vuc_id
WHERE t.ghi_chu LIKE '%L3-linh-vuc-thuong-mai.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-TMDVDL';
```


### Định hướng phát triển
- Phát triển thương mại, dịch vụ trở thành **ngành kinh tế quan trọng**, từng bước giữ vai trò chủ lực ^[KH1583]
- Lập quy hoạch, đầu tư xây dựng **chợ truyền thống mới xã An Thới Đông** đáp ứng nhu cầu giao thương ^[KH1583]
- Kêu gọi đầu tư xây dựng **siêu thị, cửa hàng tiện ích** trên địa bàn xã ^[KH1583]
- Khuyến khích phát triển cửa hàng tiện ích, **cửa hàng giới thiệu và trưng bày sản phẩm OCOP** ^[KH1583]
- Hình thành các điểm dịch vụ phục vụ du lịch ^[KH1583]

### Chương trình triển khai
- Chương trình **kết nối Ngân hàng — Doanh nghiệp** — tổ chức tiếp xúc doanh nghiệp, nắm bắt khó khăn, phát triển thương mại điện tử ^[KH1583]
- Chương trình **bình ổn thị trường** ^[KH1583]
- Chương trình **xúc tiến thương mại** sản phẩm chủ lực nông nghiệp và sản phẩm OCOP ^[KH1583]

---

## [C] TIỀM NĂNG

- Phát triển **thương mại điện tử** cho sản phẩm OCOP, sản phẩm đặc trưng ^[KH1583]
- Hội chợ, triển lãm, xúc tiến thương mại tiêu thụ sản phẩm muối, nông nghiệp đặc trưng, OCOP ^[KH1583]
- Liên kết tiêu thụ sản phẩm với **Đồng Tháp, Tây Ninh, các xã Bình Khánh, Cần Giờ, Thạnh An** ^[KH1583]

---

## [D] NHIỆM VỤ ĐƯỢC GIAO → TRA NEXUS

> Đã bóc tách vào Nexus ngày 01/9/2026 (`theo_doi_cd` + `giao_muc`, gắn với
> văn bản `1583/KH-UBND`). **Không chép nhiệm vụ vào file này.**
>
> Lý do: file markdown không có trạng thái, không có hạn, không nối được với
> `ket_qua` — nên 95 nhiệm vụ nằm đây là 95 nhiệm vụ không ai theo dõi được.

```sql
SELECT t.ma_tdcd, t.ten_noi_dung, t.trang_thai, dv.ten_don_vi AS chu_tri
FROM theo_doi_cd t
JOIN giao_muc g ON g.theo_doi_cd_id = t.id
JOIN van_ban v ON v.id = g.van_ban_id AND v.so_hieu = '1583/KH-UBND'
JOIN linh_vuc lv ON lv.id = t.linh_vuc_id
LEFT JOIN don_vi dv ON dv.id = t.don_vi_chu_tri_id
WHERE t.ghi_chu LIKE '%L3-linh-vuc-thuong-mai.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-TMDVDL'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24
