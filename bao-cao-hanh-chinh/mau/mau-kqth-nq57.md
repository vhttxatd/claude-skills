# Mẫu báo cáo tổng hợp — Kết quả thực hiện Nghị quyết 57-NQ/TW (KQTH NQ57)

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: cấu trúc báo cáo theo yêu cầu của Sở/UBND Thành phố, Hiếu chốt · ra_soat_lai: 2027-03-01 · rui_ro: trung (bổ sung META 01/9/2026, nội dung CHƯA rà)

> Mẫu này là bản TỔNG HỢP TOÀN DIỆN nhất trong skill — phủ đủ 13 nhóm nội
> dung ở `data/thu-thap-hang-ngay.md` (Phần A), không giới hạn trong ma
> trận KHCN-CĐS như `mau/mau-khcn-cds.md`. Dùng khi báo cáo cần thể hiện
> BỨC TRANH CHUNG về triển khai NQ57 tại xã (chỉ đạo cấp ủy/BCĐ + kết quả
> chuyên đề + KH 100 ngày điểm nghẽn), thay vì chỉ riêng phần CĐS.

---

## THÔNG TIN CĂN BẢN

| Thuộc tính | Giá trị |
|---|---|
| Ký hiệu | /BC-UBND |
| Tiêu đề | Báo cáo kết quả thực hiện Nghị quyết số 57-NQ/TW ngày 22 tháng 12 năm 2024 của Bộ Chính trị về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia trên địa bàn xã An Thới Đông [kỳ] |
| Kính gửi | **LINH HOẠT — xem mục "XÁC ĐỊNH KÍNH GỬI" bên dưới, hỏi Hiếu mỗi lần** |
| Đơn vị soạn | Phòng Văn hóa - Xã hội (đầu mối) |
| Nguồn dữ liệu | `data/thu-thap-hang-ngay.md` (Phần D — tổng hợp theo kỳ, nhóm I-XIII) |
| Ký hiệu lưu | Lưu: VT, VHXH(Hi). |

---

## XÁC ĐỊNH KÍNH GỬI — HỎI TRƯỚC KHI SOẠN

Khác với `mau-khcn-cds.md` (Kính gửi cố định Sở KH&CN), mẫu này dùng cho
nhiều đầu mối khác nhau tùy đợt yêu cầu. BẮT BUỘC hỏi:

> *"Báo cáo KQTH NQ57 lần này gửi cho ai? (VD: Công an Thành phố - Tổ Công
> tác 57 theo CV yêu cầu cụ thể / Sở Khoa học và Công nghệ / Ban Chỉ đạo
> Thành phố / khác) — và có Công văn/yêu cầu nào làm căn cứ không?"*

Nếu có CV căn cứ → dùng đúng mẫu câu mở đầu:
> "Thực hiện Công văn số [...] ngày [...] của [...] về việc [...], Ủy ban
> nhân dân xã An Thới Đông báo cáo kết quả thực hiện Nghị quyết số
> 57-NQ/TW như sau:"

Nếu là báo cáo định kỳ đã có tiền lệ (VD: BC tháng gửi Công an TP theo CV
5722/CQTT — xem Notion `TodoListATĐ`, định kỳ hàng tháng) → nhắc lại đúng
số CV căn cứ đã dùng kỳ trước, hỏi xác nhận còn hiệu lực không.

---

## CẤU TRÚC BÁO CÁO — KẾT HỢP KIỂU 1 + KIỂU 2 (mặc định cho mẫu này)

Thân báo cáo NGẮN (không chia nhỏ theo từng nhóm I-X như `mau-khcn-cds.md`
Kiểu 2 đầy đủ), gồm 4 phần văn xuôi + phụ lục bảng chi tiết ở cuối liệt kê
đủ mọi nhóm:

```
[Căn cứ / mở đầu — xem "XÁC ĐỊNH KÍNH GỬI"]

I.   CÔNG TÁC LÃNH ĐẠO, CHỈ ĐẠO TRIỂN KHAI
     Gom từ Nhóm XI (Đảng ủy/BCĐ) + Nhóm I, II, III (UBND xã)
     — 1 đoạn văn xuôi, nêu các văn bản chỉ đạo chính đã ban hành trong kỳ.

II.  KẾT QUẢ NỔI BẬT
     Gom từ Nhóm IV - X (chuyên đề KHCN-CĐS) + Nhóm XII (100 ngày điểm nghẽn)
     — 2-3 đoạn văn xuôi, mỗi đoạn 1 trụ cột nổi bật nhất trong kỳ (không
     cần liệt kê hết — phần chi tiết đầy đủ nằm ở Phụ lục).

III. TỒN TẠI, HẠN CHẾ
     Gom các việc Trạng thái = Chưa thực hiện, hoặc điểm nghẽn từ Nexus
     `cong_viec_con` (Nhóm XII) còn `chua_bat_dau` — 1 đoạn ngắn.

IV.  PHƯƠNG HƯỚNG THỜI GIAN TỚI
     1 đoạn ngắn, dùng "Tiếp tục...", "Đẩy mạnh...".

[Câu kết ./.]
[Ký tên — theo `quy-tac-chung/data/can-bo-phan-cong.md`]

PHỤ LỤC — Bảng kết quả thực hiện chi tiết theo nhóm
STT | Nhóm | Nội dung/Nhiệm vụ | Kết quả thực hiện | Đánh giá
(Nhóm dùng đúng mã I-XIII ở data/thu-thap-hang-ngay.md Phần A, xếp theo
thứ tự I → XIII, đánh lại STT liên tục toàn bảng)
```

**Khi nào KHÔNG dùng đủ 4 phần trên:** nếu Hiếu chỉ định phạm vi hẹp hơn
(VD: "chỉ báo cáo phần 100 ngày điểm nghẽn thôi") → bỏ bớt các nhóm không
liên quan ở cả thân bài lẫn phụ lục, giữ nguyên khung 4 phần I-IV.

---

## QUY TẮC DÙNG CHUNG (không lặp lại — tham chiếu `mau/mau-khcn-cds.md`)

Mẫu này KẾ THỪA toàn bộ các quy tắc đã có ở `mau/mau-khcn-cds.md`, áp dụng
y hệt, không định nghĩa lại:
- Quy tắc lọc mã `[yymmdd]` theo kỳ/lũy kế
- Nguyên tắc văn phong "GOM — không LIỆT KÊ"
- Chủ ngữ trước, ngày tháng sau
- Liệt kê > 3 mục → dùng Footnote
- Quy tắc dẫn chiếu văn bản đầy đủ 4 yếu tố (số/ký hiệu, ngày, cơ quan, trích yếu)
- Quy tắc dấu gạch ngang (chỉ dùng ` - `)
- Quy tắc bảng phụ lục cột Đánh giá — KHÔNG dùng emoji, dùng chữ thuần túy
- Định dạng file Word (font, cỡ chữ, lề, giãn dòng) + phụ lục trang ngang
  khi bảng dài

**Riêng cho mẫu này — bổ sung:**
- Cột "Nhóm" trong phụ lục dùng đúng số La Mã (I, II, ... XIII), KHÔNG
  dùng tên đầy đủ để bảng gọn.
- Việc thuộc Nhóm XI (chỉ đạo Đảng ủy/BCĐ) khi dẫn chiếu văn bản, dùng
  đúng động từ theo chủ thể (xem `quy-tac-chung` — Đảng ủy "lãnh đạo",
  UBND xã "chỉ đạo", tuyệt đối không lẫn lộn 2 động từ này).
- Việc thuộc Nhóm XII (100 ngày điểm nghẽn) khi có điểm nghẽn còn tồn —
  luôn đưa vào mục III (Tồn tại), không đưa vào mục II (Kết quả) dù có
  tiến độ một phần.

---

## ĐỊNH DẠNG FILE WORD

> ⚠️ Xem `the-thuc-van-ban` — nguồn DUY NHẤT cho mọi thông số thể thức và
> kỹ thuật trình bày. KHÔNG ghi lại thông số ở đây.

Lưu: `/mnt/user-data/outputs/BC-KQTH-NQ57-[ky]-[nam].docx`
