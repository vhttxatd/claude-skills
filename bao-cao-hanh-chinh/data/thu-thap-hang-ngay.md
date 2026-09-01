# Kho thu thập hàng ngày — nền dùng chung cho mọi báo cáo NQ57

> Đây KHÔNG phải một báo cáo. Đây là kho ghi nhận liên tục các nội dung,
> số liệu, kết quả liên quan đến khoa học, công nghệ, đổi mới sáng tạo và
> chuyển đổi số (KHCN3/NQ57) mà Hiếu làm việc hàng ngày. Khi tới kỳ cần
> xuất MỘT báo cáo cụ thể (KHCN-CĐS, DTI, KQTH NQ57 gửi Công an TP, đột
> xuất...) → Claude LỌC lại từ kho này theo tiêu chí của báo cáo đó, KHÔNG
> thu thập lại từ đầu.
>
> Cập nhật lần cuối: 18/08/2026

---

## PHẦN A — KHUNG PHÂN NHÓM (dùng chung mọi báo cáo NQ57)

10 nhóm gốc (trùng với ma trận Excel `2026_NoiDungBC_KHCN3.xlsx`, dùng cho
BC KHCN-CĐS) + 3 nhóm mở rộng (nằm ngoài ma trận, chỉ dùng cho BC KQTH NQ57
tổng hợp hoặc BC đột xuất theo yêu cầu riêng):

| Mã | Tên nhóm | Nguồn dữ liệu chính |
|---|---|---|
| I | Công tác quán triệt, lãnh đạo chỉ đạo, điều hành | Ma trận Excel |
| II | Hoạt động quán triệt, lãnh đạo chỉ đạo, điều hành chung | Ma trận Excel |
| III | Xây dựng, hoàn thiện thể chế, quy định | Ma trận Excel |
| IV | Nhân lực số | Ma trận Excel |
| V | Nhận thức số | Ma trận Excel |
| VI | Xây dựng chính quyền số và đô thị thông minh | Ma trận Excel |
| VII | Hạ tầng thông tin và truyền thông | Ma trận Excel |
| VIII | Kinh tế số | Ma trận Excel |
| IX | Xã hội số + Ứng dụng KHCN, đổi mới sáng tạo | Ma trận Excel |
| X | An toàn thông tin | Ma trận Excel |
| XI | Công tác chỉ đạo của Đảng ủy/Ban Chỉ đạo (BCĐ.ĐUX) | Văn bản cấp ủy — xem `quy-tac-chung` mục văn bản B (NQ, CTr, QĐ, KH, QC, TB...) |
| XII | Kế hoạch "100 ngày điểm nghẽn CĐS" (cấp xã 06-KH/BCĐ + cấp TP KH40-BCĐTP) | Nexus: `theo_doi_cd` (chỉ tiêu), nhiệm vụ, `giao_muc`, `cong_viec_con` (điểm nghẽn) |
| XIII | Việc khác phát sinh liên quan NQ57 (chưa xếp được vào nhóm nào ở trên) | Chat / văn bản đến |

**Nguyên tắc chọn nhóm:** khi ghi 1 việc mới, chỉ cần xác định đúng 1 mã
nhóm trong bảng trên. Nếu Hiếu không chắc → hỏi 1 câu ngắn, không tự đoán.

---

## PHẦN B — CÁCH GHI 1 "VIỆC CON" VÀO KHO

Dùng đúng định dạng mã `[yymmdd]` như ma trận Excel đang dùng, để sau này
lọc theo kỳ báo cáo bằng chung 1 quy tắc (xem `mau/mau-khcn-cds.md` —
mục "Quy tắc lọc mã [yymmdd]").

**Định dạng 1 dòng ghi:**
```
[yymmdd] Nhóm <mã I-XIII> | <nội dung ngắn gọn, văn xuôi, có số liệu nếu có>
  Nguồn: <số VB đầy đủ, hoặc Nexus id, hoặc Notion page id>
  Trạng thái: Hoàn thành / Đang thực hiện / Tiếp tục duy trì / Chưa thực hiện
```

**Ví dụ:**
```
[260812] Nhóm XII | Tổ CNSCĐ 12 ấp phối hợp khảo sát thực tế tuyến đường
  thí điểm thanh toán số, ghi nhận hiện trạng hạ tầng phục vụ triển khai.
  Nguồn: Nexus ket_qua id 07b29d4b-86cc-4507-b21e-348ee820325b (gắn
  NV-XAHOISO-MOHINH)
  Trạng thái: Hoàn thành
```

**Tránh trùng lặp:** nếu nội dung ĐÃ có trong Nexus `ket_qua` (đã duyệt)
hoặc Notion `TodoListATĐ` → KHÔNG chép lại nguyên văn ở đây, chỉ ghi 1 dòng
tham chiếu (nhóm + id) vào mục NHẬT KÝ bên dưới. Kho này bổ sung cho Nexus/
Notion, không thay thế.

---

## PHẦN C — LỆNH NHANH "THÊM VÀO BÁO CÁO"

Kích hoạt ngay khi Hiếu gõ cụm này, ở bất kỳ đâu trong hội thoại.

### Quy trình:
1. Đọc lại nội dung đang trao đổi gần nhất (tin nhắn/tài liệu ngay trước)
   → xác định: việc gì, thuộc nhóm nào (I-XIII), trạng thái gì.
2. **Kiểm tra có phải việc có 2 mốc hoàn thành hay không:**
   - **Mốc 1 — Phiếu trình PVHXH:** thời điểm phiếu trình được lập/ký nội
     bộ tại Phòng Văn hóa - Xã hội, trình cấp trên duyệt. Đây là mốc NỘI
     BỘ, chưa phải kết quả chính thức → khi báo cáo, thể hiện dạng "Đang
     thực hiện" / "Đang trình duyệt", KHÔNG tính là hoàn thành.
   - **Mốc 2 — Số phát hành UBND:** thời điểm văn bản được UBND xã cấp số
     phát hành chính thức (ban hành). Đây mới là mốc dùng để tính "Hoàn
     thành" trong báo cáo, và là ngày dùng để lọc theo kỳ `[yymmdd]`.
   - Nếu nội dung Hiếu vừa trao đổi có cả 2 mốc (VD: "đã trình phiếu ngày
     ..., hôm nay có số ...") → ghi CẢ HAI dòng riêng biệt, cùng 1 việc
     nhưng khác `[yymmdd]` và khác Trạng thái.
   - Nếu chỉ có 1 mốc → hỏi rõ: *"Đây là mốc trình phiếu nội bộ hay đã có
     số phát hành chính thức?"* trước khi ghi Trạng thái.
3. Đề xuất dòng ghi theo định dạng Phần B → Hiếu xác nhận.
4. Sau xác nhận → ghi vào mục NHẬT KÝ ở cuối file này. Nếu việc liên quan
   văn bản đến/đi cụ thể → nhắc thêm quy trình `xu-ly-van-ban-den` (lưu
   Notion, gắn Nexus) nếu Hiếu chưa xử lý qua đó.

---

## PHẦN D — TỔNG HỢP THEO KỲ (khi soạn 1 báo cáo cụ thể)

Khi bắt đầu soạn báo cáo (Bước 4 trong `SKILL.md`) và Hiếu chọn "để tôi tự
tổng hợp":

1. Xác định khoảng ngày lọc theo chế độ (kỳ báo cáo / lũy kế — xem Bước 2
   `SKILL.md`) và **nhóm nào cần lấy** (xem Phần E — bảng mapping).
2. Gộp dữ liệu từ 3 nguồn, lọc theo khoảng ngày:
   - Mục NHẬT KÝ trong file này (lọc theo `[yymmdd]` + đúng nhóm)
   - Nexus `ket_qua` đã duyệt (lọc theo ngày thực hiện)
   - Notion `TodoListATĐ` (lọc theo `Hoàn thành`/`Thời hạn` trong khoảng)
3. Loại trùng (cùng 1 việc có thể vừa ở Nhật ký vừa ở Nexus — giữ 1 bản,
   ưu tiên bản có đủ số liệu/dẫn chiếu nhất).
4. **Luôn cho Hiếu xem lại danh sách đã gộp trước khi đưa vào bản soạn** —
   không tự ý đưa thẳng vào nội dung báo cáo.

---

## PHẦN E — MAPPING: NHÓM NÀO DÙNG CHO BÁO CÁO NÀO

| Báo cáo | Nhóm cần lấy | Mẫu soạn |
|---|---|---|
| BC KHCN-CĐS (quý/6T/9T/năm) | I - X | `mau/mau-khcn-cds.md` |
| BC DTI | VI, VII, VIII (đúng chỉ tiêu DTI liên quan) | `mau/mau-dti.md` |
| BC Thư điện tử | Riêng, không thuộc I-XIII (số liệu hộp thư) | `mau/mau-thu-dien-tu.md` |
| BC KQTH NQ57 (tổng hợp toàn diện, gửi Công an TP hoặc nơi khác) | I - XIII (TẤT CẢ) | `mau/mau-kqth-nq57.md` |
| BC đột xuất theo yêu cầu cụ thể | Tùy đúng nội dung CV yêu cầu (thường 1-2 nhóm) | `data/quy-trinh-dot-xuat.md` |

---

## NHẬT KÝ (thêm dòng mới ở cuối, không xóa dòng cũ trừ khi Hiếu yêu cầu)

*(Chưa có dòng nào — ghi theo định dạng Phần B khi Hiếu báo việc hoặc gõ
"thêm vào báo cáo")*
