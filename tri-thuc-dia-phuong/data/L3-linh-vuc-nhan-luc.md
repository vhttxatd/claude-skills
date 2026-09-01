# L3 — Lĩnh vực Nguồn nhân lực & Đào tạo nghề

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: **Phòng Văn hóa – Xã hội** (chủ trì)

---

## [A] HIỆN TRẠNG

*(chưa có dữ liệu cụ thể về tỷ lệ lao động qua đào tạo hiện tại — cần bổ sung từ BC năm 2025)*

- Có lao động nông thôn có nhu cầu học nghề ^[KH1583]
- Có các doanh nghiệp, HTX, cơ sở sản xuất kinh doanh trên địa bàn có nhu cầu tuyển dụng lao động ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-nhan-luc.md%' AND t.loai = 'chi_tieu' AND lv.ma_linh_vuc = 'LV-LDVL';
```


### Định hướng phát triển
- Nâng cao **chất lượng nguồn nhân lực** trên địa bàn xã, đáp ứng yêu cầu phát triển KT-XH ^[KH1583]
- Ưu tiên các lĩnh vực: **nông nghiệp CNC, nuôi trồng, chế biến thủy sản, thương mại, dịch vụ, du lịch sinh thái** ^[KH1583]
- Gắn **đào tạo nghề với nhu cầu thực tế** của thị trường lao động và định hướng phát triển kinh tế xã ^[KH1583]
- Tạo việc làm bền vững, nâng cao thu nhập cho người lao động ^[KH1583]
- **Thu hút và sử dụng hiệu quả nguồn nhân lực có trình độ chuyên môn, kỹ thuật cao** phục vụ phát triển lâu dài ^[KH1583]

### Ngành nghề đào tạo ưu tiên
- **Kỹ thuật nuôi trồng thủy sản công nghệ cao** ^[KH1583]
- **Chế biến thủy sản — thực phẩm** ^[KH1583]
- **Hướng dẫn viên du lịch** ^[KH1583]
- **Dịch vụ lưu trú, ẩm thực, thương mại — dịch vụ** ^[KH1583]

---

## [C] TIỀM NĂNG

- Liên kết với các đơn vị đào tạo:
  - **Trường Cao đẳng Nông nghiệp Nam Bộ — phân hiệu TP.HCM** ^[KH1583]
  - **Trường Trung kỹ thuật cấp nông nghiệp Thành phố** ^[KH1583]
  - **Ban Quản lý Khu Nông nghiệp CNC Thành phố** ^[KH1583]
  - Các **Trường trung cấp nghề** ^[KH1583]
- Tổ chức **sàn giao dịch việc làm** kết nối cung — cầu lao động ^[KH1583]
- **Xuất khẩu lao động có thời hạn ở nước ngoài theo hợp đồng** ^[KH1583]
- Đề xuất bổ sung **danh mục nghề đặc thù** của xã lên Sở Nội vụ TP ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-nhan-luc.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'LV-LDVL'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24

[QD46-2015]: Quyết định số 46/2015/QĐ-TTg của Thủ tướng Chính phủ — dẫn chiếu trong KH 1583 về chính sách hỗ trợ đào tạo nghề cho lao động nông thôn | Thiếu ngày ban hành & trích yếu đầy đủ | Cập nhật vào hệ thống: 2026-04-24 | **Cần bổ sung khi tra cứu**
