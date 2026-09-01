# L3 — Lĩnh vực Hạ tầng & Quy hoạch

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: Phòng Kinh tế (chủ trì)

---

## [A] HIỆN TRẠNG

- Xã có hệ thống đường trục xã, đường liên ấp, đường nội ấp ^[KH1583]
- Kết nối với **đường Rừng Sác** và các tuyến đường vành đai tới xã **Cần Giờ, Bình Khánh** ^[KH1583]
- Hệ thống sông: **Soài Rạp, Vàm Sát – Lò Rèn – Dinh Bà** — có tiềm năng giao thông thủy nội địa ^[KH1583]
- Có chợ xã An Thới Đông đang hoạt động ^[KH1583]

---

## [B] ĐỊNH HƯỚNG (Giai đoạn 2026–2030)

### Mục tiêu thực hiện
- Hoàn thành lập, điều chỉnh và quản lý **Quy hoạch chung xã An Thới Đông** làm cơ sở pháp lý cho quản lý đất đai, đầu tư xây dựng và phát triển KT-XH ^[KH1583]
- Tập trung đầu tư, nâng cấp hệ thống kết cấu hạ tầng giao thông, thương mại — dịch vụ và hạ tầng thủy nội địa ^[KH1583]
- Tạo điều kiện thuận lợi cho phát triển sản xuất, lưu thông hàng hóa, thu hút đầu tư và phát triển du lịch ^[KH1583]
- Tăng cường **liên kết vùng** giữa xã An Thới Đông với các xã lân cận ^[KH1583]

### Định hướng quy hoạch
- Xây dựng **Quy hoạch chung xã An Thới Đông giai đoạn 2025–2030, tầm nhìn đến 2045** ^[KH1583]
- Bảo đảm phù hợp Quy hoạch chung TP.HCM và quy hoạch ngành liên quan ^[KH1583]
- Xây dựng **Kế hoạch sử dụng đất 5 năm giai đoạn 2026–2030** — xác định rõ quỹ đất dành cho:
  - Nông nghiệp CNC ^[KH1583]
  - Thương mại — dịch vụ ^[KH1583]
  - Du lịch sinh thái ^[KH1583]
  - Các công trình hạ tầng thiết yếu ^[KH1583]

### Ưu tiên đầu tư hạ tầng giao thông
- Lập danh mục ưu tiên đầu tư các công trình giao thông trọng điểm: đường trục xã, liên ấp, nội ấp ^[KH1583]
- Các tuyến đường kết nối trung tâm xã với **đường Rừng Sác** và các tuyến đường vành đai kết nối xã **Cần Giờ, Bình Khánh** ^[KH1583]
- Đề xuất **nâng cấp, mở rộng và nâng tải trọng** các tuyến đường phục vụ vận chuyển nông sản, thủy sản, vật tư sản xuất và phát triển du lịch ^[KH1583]

### Hạ tầng thủy nội địa
- Nghiên cứu, đề xuất các dự án đầu tư hạ tầng giao thông thủy nội địa trên **sông Soài Rạp, sông Vàm Sát – Lò Rèn – Dinh Bà** ^[KH1583]
- Hình thành **các bến thủy nội địa, điểm dừng chân** phục vụ du lịch sinh thái, du lịch đường sông ^[KH1583]

### Hạ tầng thương mại
- Đề xuất đầu tư xây dựng, nâng cấp **chợ xã An Thới Đông** đáp ứng nhu cầu giao thương ^[KH1583]
- Khuyến khích phát triển cửa hàng tiện ích, cửa hàng giới thiệu và trưng bày sản phẩm OCOP ^[KH1583]
- Hình thành các điểm dịch vụ phục vụ du lịch ^[KH1583]

---

## [C] TIỀM NĂNG

- **Khu nông nghiệp ứng dụng CNC** quy mô ~**300 ha** — tạo vùng sản xuất tập trung, hiện đại, hiệu quả ^[KH1583]
- **Hệ thống giao thông công cộng** phù hợp điều kiện địa phương ^[KH1583]
- Phát triển các đề án, chương trình, kế hoạch thực hiện **NQ 12-NQ/TU** theo **QĐ 2435/QĐ-UBND** của UBND Thành phố ^[KH1583]
- Lồng ghép Chương trình MTQG xây dựng nông thôn mới, Chương trình phát triển KT-XH của TP vào kế hoạch hằng năm ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-ha-tang.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'M-HTCS'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24
