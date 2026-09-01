# L3 — Lĩnh vực Muối (nghề truyền thống)

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì)

---

## [A] HIỆN TRẠNG

- **Làng nghề muối Lý Nhơn** — làng nghề truyền thống của xã ^[KH1583]
- **100% hộ dân** sản xuất muối kết tinh trên **ruộng trải bạt** ^[KH1583]
- Sản phẩm đặc sản địa phương: muối hạt, muối ớt tôm, muối ớt ruốc — đang trong quá trình đăng ký nhãn hiệu ^[HIẾU-NOTE-BG]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-muoi.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-TTCN';
```


### Định hướng phát triển
- Bảo tồn và phát huy giá trị **Làng nghề muối An Thới Đông** ^[KH1583]
- Nâng cao năng suất, chất lượng sản phẩm muối ^[KH1583]
- Phát triển sản phẩm **OCOP chế biến từ muối** gắn với du lịch trải nghiệm ^[KH1583]

---

## [C] TIỀM NĂNG

- Ứng dụng KHCN vào sản xuất, chế biến muối ^[KH1583]
- Phát triển các sản phẩm **OCOP muối** (muối hạt, muối gia vị) ^[KH1583] ^[HIẾU-NOTE-BG]
- Du lịch trải nghiệm **nghề làm muối** — kết hợp với tuyến du lịch sinh thái rừng ngập mặn ^[KH1583]
- Thương hiệu muối gắn với nhận diện **"An Thới Đông — sắc xanh rừng ngập mặn"** ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-muoi.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-TTCN'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24

[HIẾU-NOTE-BG]: Ghi chú nội bộ Hiếu — thông tin nền về sản phẩm đặc sản xã đang đăng ký nhãn hiệu (muối hạt, muối ớt tôm, muối ớt ruốc) | Cập nhật vào hệ thống: 2026-04-24
