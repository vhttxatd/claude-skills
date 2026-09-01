# L3 — Lĩnh vực Du lịch

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: **Phòng Văn hóa – Xã hội** (chủ trì) | Phối hợp: Phòng Kinh tế (phần thương mại, chợ)

---

## [A] HIỆN TRẠNG

### Tài nguyên du lịch
- **Rừng ngập mặn** — hệ sinh thái đặc trưng, lợi thế chính ^[KH1583]
- **Hệ thống sông ngòi:** Soài Rạp, Vàm Sát – Lò Rèn – Dinh Bà ^[KH1583]
- **Làng nghề muối Lý Nhơn** ^[KH1583]
- **Di tích lịch sử cấp thành phố:** Đình Dương Văn Hạnh, Đình An Thới Đông ^[KH1583]

### Khu du lịch hiện có
- **Khu du lịch sinh thái Dần Xây** ^[KH1583]
- **Khu du lịch sinh thái Vàm Sát** ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-du-lich.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-TMDVDL';
```


### Định hướng phát triển
- Phát triển **du lịch trở thành ngành kinh tế quan trọng**, từng bước giữ vai trò chủ lực ^[KH1583]
- Khai thác hiệu quả rừng ngập mặn, nghề muối truyền thống, sông ngòi, di tích văn hóa — lịch sử ^[KH1583]
- Đa dạng hóa sản phẩm, tạo việc làm, nâng cao thu nhập người dân ^[KH1583]
- Ứng dụng **CĐS, thương mại điện tử** trong hoạt động du lịch ^[KH1583]

### Loại hình du lịch cần phát triển
- **Du lịch sinh thái** (rừng ngập mặn, nông nghiệp) ^[KH1583]
- **Du lịch cộng đồng** (homestay, ẩm thực địa phương, làng nghề) ^[KH1583]
- **Du lịch trải nghiệm** (tham quan rừng ngập mặn, nghề muối, câu cá giải trí) ^[KH1583]
- **Du lịch đường sông** — gắn với trải nghiệm Làng nghề muối Lý Nhơn, di tích Đình Dương Văn Hạnh, Đình An Thới Đông ^[KH1583]

---

## [C] TIỀM NĂNG

- Thương hiệu nhận diện du lịch **"An Thới Đông — sắc xanh rừng ngập mặn"** ^[KH1583]
- Nền tảng **quảng bá du lịch số, bản đồ số du lịch xã** ^[KH1583]
- Tuyến du lịch đặc thù kết nối các điểm du lịch trên địa bàn thành **tour du lịch mang tính đặc thù của xã** ^[KH1583]
- Dịch vụ hỗ trợ: **vận chuyển thủy nội địa, nhà hàng sinh thái, dịch vụ lưu trú xanh** ^[KH1583]
- Bến thủy nội địa, điểm dừng chân phục vụ du lịch sinh thái đường sông ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-du-lich.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-TMDVDL'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24
