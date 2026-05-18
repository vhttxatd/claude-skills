# Quy trình xử lý báo cáo đột xuất

---

## NHẬN DIỆN BÁO CÁO ĐỘT XUẤT

BC đột xuất phát sinh khi:
- Nhận được CV yêu cầu từ Sở KH&CN / UBND TP / BCĐ xã
- Có sự kiện bất thường cần báo cáo ngay (sự cố ATTT, thiên tai, dịch bệnh...)
- Cấp trên yêu cầu số liệu cụ thể ngoài lịch định kỳ

---

## QUY TRÌNH XỬ LÝ

### Bước 1 — Đọc CV yêu cầu, xác định:
- **Nội dung yêu cầu:** BC về vấn đề gì?
- **Phạm vi thời gian:** Từ ngày nào đến ngày nào?
- **Hạn nộp:** Ngày giờ cụ thể
- **Nơi gửi:** Cơ quan nào nhận?
- **Hình thức:** Văn bản giấy / Email / Hệ thống phần mềm

### Bước 2 — Xác định nguồn dữ liệu:
- Từ ma trận Excel KHCN-CĐS → dùng logic lọc của `mau/mau-khcn-cds.md`
- Từ số liệu thực tế → người dùng cung cấp trực tiếp
- Kết hợp cả hai

### Bước 3 — Soạn theo cấu trúc đột xuất:
```
[Căn cứ CV yêu cầu]
[Câu mở: "Ủy ban nhân dân xã An Thới Đông báo cáo..."]
I.  TÌNH HÌNH CHUNG
II. NỘI DUNG BÁO CÁO (theo yêu cầu cụ thể)
III. ĐÁNH GIÁ VÀ ĐỀ XUẤT (nếu có)
[Câu kết ./.] 
```

### Bước 4 — Xác nhận + xuất file

### Bước 5 — Ghi nhận vào theo dõi tiến độ
Thêm vào `data/theo-doi-tien-do.md` mục "Đột xuất"

---

## MẪU CĂN CỨ CHUẨN CHO BC ĐỘT XUẤT

```
Thực hiện [Công văn số .../... ngày ... của ...] về việc [trích yếu],
Ủy ban nhân dân xã An Thới Đông báo cáo [nội dung] như sau:
```
