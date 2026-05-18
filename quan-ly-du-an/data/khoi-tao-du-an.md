# Khởi tạo dự án mới — Bộ câu hỏi thu thập thông tin

> Đọc file này KHI BẮT ĐẦU hội thoại mới trong dự án "Mua sắm".
> Mục tiêu: thu thập đủ thông tin để soạn thảo toàn bộ hồ sơ mua sắm.

---

## BƯỚC 1 — XÁC ĐỊNH LOẠI HÌNH VÀ QUY MÔ

Hỏi ngay khi bắt đầu (có thể hỏi gộp 1 lần):

```
Để hỗ trợ anh/chị soạn hồ sơ mua sắm, tôi cần thu thập một số thông tin.
Anh/chị có thể đính kèm file (QĐ giao kinh phí, văn bản chủ trương...)
hoặc trả lời lần lượt các câu hỏi sau:

1. Tên gói thầu / nội dung mua sắm là gì?
2. Giá trị dự toán ước tính là bao nhiêu?
   (dưới 500 triệu → quy trình A; từ 500 triệu → quy trình B)
3. Loại hình mua sắm thuộc nhóm nào?
   - Mua sắm hàng hóa, trang thiết bị
   - Thuê dịch vụ (tư vấn, in ấn, sự kiện...)
   - Sửa chữa, cải tạo công trình
   - Mua sắm phần mềm, bản quyền
   - Loại khác (nêu rõ)
```

---

## BƯỚC 2 — THU THẬP VĂN BẢN CĂN CỨ

Sau khi xác định loại hình, hỏi tiếp:

```
4. Văn bản giao kinh phí:
   - Số và ngày của QĐ giao kinh phí (hoặc dự toán được phân bổ)?
   - Cơ quan ban hành QĐ đó là ai?

5. Chủ trương thực hiện:
   - Có văn bản chủ trương của UBND xã hoặc cấp trên không?
     Nếu có: số, ngày, trích yếu?

6. Văn bản hướng dẫn chuyên ngành:
   - Có thông tư, quyết định hướng dẫn về tiêu chuẩn kỹ thuật,
     định mức, danh mục... liên quan đến gói thầu này không?
     Nếu có: số, ngày, cơ quan ban hành, trích yếu ngắn?
```

> Nếu người dùng đính kèm file → tự đọc và trích xuất các thông tin trên,
> chỉ hỏi lại những mục còn thiếu.

---

## BƯỚC 3 — THU THẬP THÔNG TIN KỸ THUẬT GÓI THẦU

```
7. Đơn vị thực hiện (Chủ đầu tư): Phòng VH-XH hay đơn vị khác?

8. Hình thức thẩm định giá:
   - Tự thẩm định nội bộ (Nhánh A)?
   - Thuê đơn vị tư vấn độc lập (Nhánh B)?

9. Mô tả sơ bộ nội dung/yêu cầu kỹ thuật của gói thầu
   (để điền vào phần mô tả nhiệm vụ trong QĐ)?

10. Thời gian dự kiến thực hiện (bắt đầu và hoàn thành)?
```

---

## BƯỚC 4 — XÁC NHẬN VÀ TẠO HỒ SƠ

Sau khi thu thập đủ thông tin:

1. **Tóm tắt lại** toàn bộ thông tin đã thu thập để người dùng xác nhận
2. **Xác định quy trình** áp dụng (dưới/từ 500tr; Nhánh A/B)
3. **Kiểm tra căn cứ chuyên ngành**: so sánh với `data/can-cu-phap-ly.md`
   - Nếu người dùng cung cấp căn cứ mới → hỏi xác nhận tích lũy
4. **Tạo file thông tin dự án** (ghi vào `data/thong-tin-du-an.md`)
5. **Hỏi bước tiếp theo**: *"Anh/chị muốn bắt đầu từ văn bản nào trước?
   Tờ trình, QĐ phê duyệt nhiệm vụ và dự toán, hay văn bản khác?"*

---

## MẪU FILE THÔNG TIN DỰ ÁN (lưu khi hoàn tất thu thập)

```markdown
# Thông tin dự án/dự toán mua sắm

## Thông tin cơ bản
- Tên gói thầu: [...]
- Loại hình: [...]
- Giá trị dự toán: [... triệu đồng]
- Quy trình áp dụng: [Dưới 500tr / Từ 500tr] — [Nhánh A / Nhánh B]
- Chủ đầu tư: [...]
- Thời gian thực hiện: từ [...] đến [...]

## Văn bản căn cứ dự án
- QĐ giao kinh phí: số [...] ngày [...] của [...]
- Văn bản chủ trương: số [...] ngày [...] (nếu có)
- Văn bản chuyên ngành: [...]

## Nội dung/yêu cầu kỹ thuật
[Mô tả sơ bộ...]

## Tiến độ hồ sơ
- [ ] Tờ trình đề xuất
- [ ] QĐ phê duyệt nhiệm vụ và dự toán
- [ ] Biên bản họp xét giá / HĐ tư vấn TĐG
- [ ] QĐ phê duyệt dự toán mua sắm + KHLCNT
- [ ] BB thương thảo + QĐ chỉ định thầu + Hợp đồng
- [ ] BB nghiệm thu + BB xác nhận KL + BB thanh lý + Hóa đơn
```

---

## CHẾ ĐỘ 2 — ĐI NGANG (vào thẳng bước cụ thể)

Khi người dùng yêu cầu thực hiện ngay một bước cụ thể, KHÔNG hỏi toàn bộ 10 câu
mà chỉ hỏi những gì cần thiết cho bước đó. Dùng ma trận sau:

### Thông tin tối thiểu theo từng bước

**II.2 — Biên bản họp xét giá:**
- Tên hàng hóa/dịch vụ cần xét giá
- Ngày họp, địa điểm
- Danh sách 3 người tham dự (họ tên, chức vụ)
- Ít nhất 3 báo giá (đơn vị báo giá, ngày, số tiền)

**II.4 — QĐ phê duyệt KHLCNT:**
- Tên gói thầu, giá sau thẩm định giá
- CV/kết quả thẩm định giá (số, ngày)
- Hình thức lựa chọn nhà thầu, thời gian thực hiện

**III — Hợp đồng kinh tế:**
- Tên gói, nhà thầu (tên, địa chỉ, MST, người đại diện)
- Giá hợp đồng, thời gian thực hiện
- QĐ chỉ định thầu (số, ngày)

**IV — Biên bản nghiệm thu:**
- Tên gói, số hợp đồng, nhà thầu
- Nội dung đã nghiệm thu, khối lượng, kết quả
- Thành phần hội đồng nghiệm thu (≥3 người)

### Câu mở đầu chuẩn khi vào ngang

> "Để soạn [tên văn bản] cho dự án '[tên dự án]', tôi cần biết thêm:
> [liệt kê thông tin cần ngay]
> Anh/chị cung cấp hoặc đính kèm file liên quan nếu có."

Sau khi hoàn thành bước được yêu cầu, hỏi:
> "Bước tiếp theo trong quy trình là [tên bước]. Anh/chị muốn tiếp tục không?"
