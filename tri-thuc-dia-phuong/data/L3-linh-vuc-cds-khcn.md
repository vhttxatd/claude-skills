# L3 — Lĩnh vực Chuyển đổi số & Khoa học Công nghệ

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: KH 1583/KH-UBND · ra_soat_lai: 2026-12-01 · rui_ro: cao
> Nguồn chính: KH 1583/KH-UBND (đã đăng ký trong Nexus `van_ban`)
> Phòng phụ trách: **Phòng Văn hóa – Xã hội** (chủ trì phần CĐS, viễn thông) | Phòng Kinh tế (chủ trì phần KHCN nông nghiệp, giao thông xanh)
> **Chuyên viên phụ trách trực tiếp: Phan Trung Hiếu**

---

## [A] HIỆN TRẠNG

- **Tổ Công nghệ số cộng đồng: 43 thành viên** phủ đều 12 ấp ^[QTC]
- Xã vận hành theo **mô hình 2 cấp** — đã đẩy mạnh CĐS quản lý hành chính ^[QTC]
- Đang triển khai dịch vụ công trực tuyến, chữ ký số, trao đổi văn bản điện tử ^[QTC]
- **NEXUS Gov** — dự án quản lý hành chính cấp xã đang xây dựng (Airtable + Supabase/PostgreSQL) ^[HIẾU-NOTE-202604]

---

## [B] ĐỊNH HƯỚNG (Giai đoạn 2026–2030)

### Mục tiêu chung
- Đẩy mạnh ứng dụng **KHCN, CĐS và chuyển đổi xanh** trong quản lý nhà nước, sản xuất — kinh doanh và đời sống xã hội ^[KH1583]
- Nâng cao hiệu quả quản lý, điều hành của chính quyền ^[KH1583]
- Tăng năng suất lao động, giảm chi phí sản xuất, nâng cao chất lượng sản phẩm, dịch vụ ^[KH1583]
- Góp phần bảo vệ môi trường, sử dụng hiệu quả tài nguyên, hướng tới **kinh tế xanh, bền vững** ^[KH1583]

### Chỉ tiêu CĐS liên quan
- **100%** HTX, tổ hợp tác được hướng dẫn áp dụng CĐS trong sản xuất — kinh doanh ^[KH1583]
- **100%** sản phẩm chủ lực nông nghiệp được truy xuất nguồn gốc ^[KH1583]

### Chỉ tiêu chuyển đổi xanh (đến 2030)
- **80%** xe công tại cơ quan nhà nước trên địa bàn sử dụng **nhiên liệu sạch** ^[KH1583]
- **100%** trụ sở cơ quan, đơn vị đủ điều kiện được lắp đặt **điện năng lượng mặt trời áp mái** ^[KH1583]
- Thúc đẩy chuyển đổi phương tiện giao thông cá nhân & công vụ sang **nhiên liệu sạch, thân thiện môi trường** ^[KH1583]

### Nhiệm vụ trọng tâm CĐS
- Phát triển **hạ tầng thông tin, viễn thông hiện đại** ^[KH1583]
- Bảo đảm kết nối Internet ổn định phục vụ quản lý, sản xuất và đời sống Nhân dân ^[KH1583]
- Đẩy mạnh ứng dụng CNTT, CĐS trong quản lý **quy hoạch, sử dụng đất, xây dựng, kinh tế — xã hội** ^[KH1583]
- Triển khai đồng bộ **các hệ thống thông tin dùng chung, dịch vụ công trực tuyến** — nâng cao chất lượng phục vụ người dân, doanh nghiệp ^[KH1583]

---

## [C] TIỀM NĂNG

### Ứng dụng KHCN trong nông nghiệp — thủy sản
- **IoT, tự động hóa** trong giám sát môi trường nuôi trồng, quản lý ao nuôi, nhật ký điện tử ^[KH1583]
- Chuyển giao, ứng dụng mô hình **sản xuất nông nghiệp CNC, chế biến sản phẩm nông nghiệp** ^[KH1583]
- Tiếp cận tiến bộ kỹ thuật, **công nghệ sinh học, chế phẩm sinh học** trong sản xuất an toàn, bền vững ^[KH1583]

### Ứng dụng KHCN trong nghề muối
- Nghiên cứu ứng dụng KHCN vào sản xuất, chế biến muối ^[KH1583]
- Phát triển sản phẩm OCOP chế biến từ muối gắn với du lịch trải nghiệm ^[KH1583]

### Chính sách ưu đãi
- Triển khai chính sách ưu đãi, khuyến khích doanh nghiệp **đầu tư cho CĐS, ứng dụng khoa học, đổi mới công nghệ** ^[KH1583]

### Nền tảng số du lịch
- Nền tảng quảng bá du lịch số, bản đồ số du lịch xã ^[KH1583]
- Hệ thống nhận diện thương hiệu du lịch **"An Thới Đông — sắc xanh rừng ngập mặn"** ^[KH1583]

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
WHERE t.ghi_chu LIKE '%L3-linh-vuc-cds-khcn.md%' AND t.loai = 'nhiem_vu' AND lv.ma_linh_vuc = 'M-KHCN'
ORDER BY t.ma_tdcd;
```

> Ghi kết quả thực hiện vào `ket_qua` như thường lệ — nay nối được về đúng
> nhiệm vụ và đúng văn bản căn cứ.


## [Z] LỊCH SỬ / GHI CHÚ

*(chưa có)*

---

<!-- NGUỒN -->

[KH1583]: KH số 1583/KH-UBND ngày 21/4/2026 của UBND xã An Thới Đông — Phát triển kinh tế trên địa bàn xã giai đoạn 2026–2030 | Cập nhật vào hệ thống: 2026-04-24

[QTC]: Dữ liệu nền trong skill `quy-tac-chung` — đã xác nhận trước đó | Cập nhật vào hệ thống: 2026-04-24

[HIẾU-NOTE-202604]: Ghi chú nội bộ Hiếu — NEXUS Gov dự án quản lý hành chính cấp xã (Airtable + Supabase/PostgreSQL) đang xây dựng | Cập nhật vào hệ thống: 2026-04-24
