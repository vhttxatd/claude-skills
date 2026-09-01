# L3 — Lĩnh vực Nông nghiệp

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì) | Phối hợp: Phòng VH-XH (phần KHCN, CĐS)

---

## [A] HIỆN TRẠNG

- Xã An Thới Đông có thế mạnh về kinh tế nông nghiệp, nuôi trồng và chế biến thủy sản, nghề muối truyền thống ^[KH1583]
- Có Làng nghề muối Lý Nhơn — được định hướng bảo tồn, phát huy giá trị ^[KH1583]
- Hệ sinh thái rừng ngập mặn là lợi thế đặc thù của địa phương ^[KH1583]
- Hiện 100% hộ dân sản xuất muối kết tinh trên ruộng trải bạt ^[KH1583]

---

## [B] ĐỊNH HƯỚNG (Giai đoạn 2026–2030)

### Chỉ tiêu tăng trưởng
- Tốc độ tăng trưởng ngành nông nghiệp ≥ **8,4%/năm** ^[KH1583]

### Chỉ tiêu chuyển đổi sản xuất
- 100% sản phẩm chủ lực nông nghiệp được **truy xuất nguồn gốc** ^[KH1583]
- **35–40%** diện tích nuôi tôm ứng dụng công nghệ cao trên tổng diện tích nuôi tôm toàn xã ^[KH1583]
- Nâng chất theo tiêu chuẩn **VietGAP/GlobalGAP** ^[KH1583]

### Chỉ tiêu nghề muối
- Duy trì **100%** hộ dân sản xuất muối kết tinh trên ruộng trải bạt ^[KH1583]
- Phấn đấu nhân rộng **≥ 20%** mô hình thu giữ nước chạt trong sản xuất muối ^[KH1583]

### Định hướng phát triển
- Phát triển nông nghiệp theo hướng **bền vững, hiện đại, sinh thái**; ứng dụng KHCN và CĐS ^[KH1583]
- Chuyển dịch cơ cấu giá trị sản xuất: giảm mô hình truyền thống, tăng mô hình nuôi trồng công nghệ cao, tuần hoàn, thân thiện môi trường ^[KH1583]
- Hình thành nền nông nghiệp hiện đại, sinh thái, ứng dụng KHCN và CĐS; nâng cao năng suất, chất lượng, giá trị gia tăng ^[KH1583]

### Phát triển kinh tế tập thể
- Phát triển thêm **ít nhất 01 hợp tác xã** và **10 tổ hợp tác** hoạt động hiệu quả ^[KH1583]
- **100%** HTX, tổ hợp tác được hướng dẫn áp dụng CĐS trong sản xuất — kinh doanh ^[KH1583]
- Hỗ trợ HTX xây dựng đăng ký chứng nhận nhãn hiệu, thương hiệu sản phẩm ^[KH1583]

---

## [C] TIỀM NĂNG

- **Đề án Trung tâm sản xuất giống nông nghiệp** trên địa bàn xã An Thới Đông ^[KH1583]
- **Khu nông nghiệp ứng dụng công nghệ cao** quy mô khoảng **300 ha** — tạo vùng sản xuất tập trung, hiện đại, hiệu quả ^[KH1583]
- **Đề án phát triển kinh tế bền vững và liên kết vùng** giữa xã An Thới Đông với các tỉnh Đồng Tháp, Tây Ninh và các xã Bình Khánh, Cần Giờ, Thạnh An giai đoạn 2025–2030 ^[KH1583]
- Nuôi **Geloina expansa, Magallana ariakensis** — đề xuất nhiệm vụ KHCN thủy sản ^[HIẾU-NOTE-202603]
- Chuỗi liên kết sản xuất — chế biến — tiêu thụ nông sản, thủy sản với địa phương lân cận ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-nong-nghiep.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-NONGNG'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã An Thới Đông giai đoạn 2026–2030 | Người ký: Chủ tịch Trần Hoàng Vũ | Căn cứ: NQ 13-NQ/ĐU ngày 25/12/2025 của Đảng ủy xã | Cập nhật vào hệ thống: 2026-04-24

[HIẾU-NOTE-202603]: Ghi chú nội bộ của Hiếu — đề xuất nhiệm vụ KHCN thủy sản (nuôi Geloina expansa, Magallana ariakensis) | Cập nhật vào hệ thống: 2026-03
