# L3 — Lĩnh vực Tiểu thủ Công nghiệp & Chế biến

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì)

---

## [A] HIỆN TRẠNG

- Có các cơ sở sản xuất, chế biến quy mô hộ gia đình trên địa bàn ^[KH1583]
- Có sản phẩm chế biến đặc trưng liên quan đến nông nghiệp, thủy sản, muối ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-tieu-thu-cn.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-TTCN';
```


### Định hướng phát triển
- Phát triển tiểu thủ công nghiệp & chế biến theo hướng **bền vững, hiệu quả, thân thiện môi trường** ^[KH1583]
- Nâng cao **giá trị gia tăng** cho sản phẩm nông nghiệp, thủy sản, đặc trưng địa phương ^[KH1583]
- Hỗ trợ doanh nghiệp, cơ sở sản xuất, hộ kinh doanh đầu tư **đổi mới công nghệ, mở rộng quy mô sản xuất** ^[KH1583]
- Nâng cao năng suất, chất lượng, sức cạnh tranh ^[KH1583]
- Góp phần chuyển dịch cơ cấu kinh tế, giải quyết việc làm, tăng thu nhập người lao động ^[KH1583]

### Ngành nghề ưu tiên phát triển
- **Chế biến thủy sản** ^[KH1583]
- **Chế biến muối** ^[KH1583]
- **Sơ chế tổ yến** ^[KH1583]
- **Đóng gói nông sản đặc trưng** ^[KH1583]

---

## [C] TIỀM NĂNG

- Ứng dụng **công nghệ sạch, tiết kiệm năng lượng, giảm phát thải** trong sản xuất và chế biến ^[KH1583]
- Chuỗi liên kết **sản xuất — thu mua — chế biến — tiêu thụ** ^[KH1583]
- Đăng ký nhãn hiệu, sở hữu trí tuệ cho sản phẩm chế biến đặc trưng (muối, thủy sản, tổ yến) ^[KH1583]
- Thiết kế logo, mô hình chế biến hiệu quả với hỗ trợ của **Sở KHCN Thành phố** ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-tieu-thu-cn.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-TTCN'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24
