# L3 — Lĩnh vực Thủy sản

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì) | Phối hợp: Phòng VH-XH (phần KHCN, IoT)

---

## [A] HIỆN TRẠNG

- Nuôi trồng & chế biến thủy sản là một trong các thế mạnh kinh tế của xã ^[KH1583]
- Có hoạt động khai thác thủy sản trên các tuyến sông địa phương ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-thuy-san.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-THUSAN';
```


### Định hướng phát triển
- Phát triển nuôi trồng thủy sản theo hướng **công nghệ cao, tuần hoàn**, sử dụng tiết kiệm nước, giảm thiểu ô nhiễm môi trường, thích ứng biến đổi khí hậu ^[KH1583]
- Hình thành các **vùng nuôi thủy sản tập trung** ^[KH1583]
- Xây dựng mô hình điểm, nhân rộng HTX nông nghiệp, **chuỗi liên kết sản xuất — tiêu thụ** ^[KH1583]
- Hỗ trợ xây dựng **thương hiệu sản phẩm địa phương** ^[KH1583]
- Tăng cường **phòng chống dịch bệnh**, kiểm soát chất lượng con giống, thức ăn, vật tư ^[KH1583]
- Bảo vệ và tái tạo **nguồn lợi thủy sản** ^[KH1583]

### Chuyển đổi nghề khai thác
- Xây dựng phương án **chuyển đổi cơ cấu nghề khai thác từ lạm sát sang nghề thân thiện môi trường** ^[KH1583]
- Giảm nghề gây hại đến nguồn lợi thủy sản theo **Thông tư 01/2022/TT-BNNPTNT** ngày 18/01/2022 ^[TT01-2022]
- Tăng cường phối hợp địa bàn giáp ranh, xử lý nghiêm hành vi khai thác lạm sát ^[KH1583]

---

## [C] TIỀM NĂNG

- Nuôi **Geloina expansa, Magallana ariakensis** — đề xuất nhiệm vụ KHCN ^[HIẾU-NOTE-202603]
- Ứng dụng **IoT, tự động hóa** trong giám sát môi trường nuôi, quản lý ao, ghi chép nhật ký điện tử ^[KH1583]
- Mô hình **nông nghiệp tuần hoàn, nông nghiệp thông minh** ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-thuy-san.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-THUSAN'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24

[TT01-2022]: Thông tư số 01/2022/TT-BNNPTNT ngày 18/01/2022 của Bộ NN&PTNT (nay Bộ Nông nghiệp & Môi trường) về chuyển đổi nghề khai thác thủy sản | Cập nhật vào hệ thống: 2026-04-24

[HIẾU-NOTE-202603]: Ghi chú nội bộ của Hiếu — đề xuất nhiệm vụ KHCN thủy sản (nuôi Geloina expansa, Magallana ariakensis) | Cập nhật vào hệ thống: 2026-03
