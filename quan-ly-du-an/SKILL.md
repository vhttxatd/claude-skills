---
name: quan-ly-du-an
description: >
  Quy trình và biểu mẫu mua sắm chi thường xuyên (nhánh A/B/C, dưới/trên 500tr).

---

> **Đọc tối thiểu:** SKILL.md này + `quy-tac-chung/SKILL.md` (phần cốt lõi). Chỉ mở thêm khi cần:
> - `data/can-cu-phap-ly.md` — khi soạn căn cứ pháp lý mua sắm
> - `quy-tac-chung/data/quy-tac-soan-thao.md` — khi xuất file, dẫn chiếu
> - `quy-trinh/duoi-500tr.md` HOẶC `quy-trinh/tren-500tr.md` — chỉ đọc nhánh phù hợp
> - `bieu-mau/...` — chỉ mở biểu mẫu cụ thể đang cần
> - `the-thuc-van-ban/` — khi xuất .docx

# Skill: Quản lý quy trình mua sắm thường xuyên

Skill này hỗ trợ toàn bộ quy trình mua sắm từ nguồn chi thường xuyên,
từ giai đoạn chuẩn bị kinh phí đến nghiệm thu thanh toán.

---

## KHỞI TẠO DỰ ÁN MỚI

Khi bắt đầu hội thoại mới trong Project QLDA:
1. **Nhận diện tên dự án/gói mua sắm** — người dùng thường đặt tên ngay khi mở đầu
2. **Xác định chế độ** — Đi từ đầu (Trường hợp 1) hay Đi ngang (Trường hợp 2)?
   → Xem mục **"CHẾ ĐỘ VÀO DỰ ÁN"** bên dưới
3. **Đọc `data/can-cu-phap-ly.md`** — căn cứ pháp lý dùng chung
4. Nếu người dùng đính kèm file → tự trích xuất thông tin, chỉ hỏi phần còn thiếu

---

## CHẾ ĐỘ VÀO DỰ ÁN — 2 TRƯỜNG HỢP

### Nguyên tắc chung

Mỗi phiên chat trong Project QLDA, người dùng sẽ **đặt tên dự án hoặc gói mua sắm**
để tách biệt với các dự án khác. Claude phải nhận diện tên này và dùng xuyên suốt phiên.

Ví dụ: *"Dự án mua sắm máy tính 2026"*, *"Gói thuê Internet quý II"*, *"Trang trí Tết Bính Ngọ"*

---

### TRƯỜNG HỢP 1 — Đi từ đầu (toàn bộ quy trình)

**Nhận diện:** Người dùng nói "bắt đầu dự án mới", "làm hồ sơ mua sắm", "tạo dự án" hoặc chưa đề cập bước cụ thể.

**Quy trình:**
1. Hỏi tên dự án/gói mua sắm (nếu chưa đặt)
2. Đọc `data/khoi-tao-du-an.md` → hỏi đầy đủ 4 bước thu thập thông tin
3. Nếu người dùng đính kèm file → tự đọc, chỉ hỏi phần còn thiếu
4. Tóm tắt xác nhận → xác định quy trình → hỏi bước muốn bắt đầu

---

### TRƯỜNG HỢP 2 — Đi ngang (vào thẳng bước cụ thể)

**Nhận diện:** Người dùng yêu cầu ngay một văn bản/bước cụ thể
(VD: "soạn biên bản họp xét giá", "làm hợp đồng", "soạn QĐ phê duyệt KHLCNT"...)
mà chưa cung cấp đầy đủ thông tin dự án.

**Quy trình — BẮT BUỘC:**

**Bước A — Xác định bước đang yêu cầu và thông tin CẦN NGAY:**
- Xác định bước trong quy trình (I, II.1, II.2, II.3, II.4, III, IV)
- Liệt kê các trường thông tin BẮT BUỘC cho bước đó
- Hỏi tập trung, gọn — chỉ hỏi những gì cần cho bước này

**Bước B — Thu thập thông tin dự án nền (có thể bỏ qua tạm nếu không cần ngay):**
- Thông tin về các bước trước (đã làm những gì, văn bản nào đã ban hành)
- Thông tin về các bước sau (thu thập dần khi đến bước đó)

**Bước C — Thực hiện bước được yêu cầu:**
- Soạn thảo và xác nhận trước khi xuất file

**Bước D — Sau khi hoàn thành, hỏi tiếp:**
> *"Bước tiếp theo trong quy trình là [tên bước]. Anh/chị muốn thực hiện luôn không?"*

---

### MA TRẬN THÔNG TIN THEO TỪNG BƯỚC

Khi vào ngang, đối chiếu bảng này để biết hỏi gì trước, gì sau:

| Bước | Thông tin BẮT BUỘC hỏi ngay | Thông tin thu thập dần |
|---|---|---|
| I.1 — CV đề xuất kinh phí | Tên gói, ước tính kinh phí, nguồn vốn | Căn cứ chuyên ngành |
| II.1 — QĐ/TTr phê duyệt NV&DT | Tên gói, dự toán, nguồn vốn, CV chấp thuận UBND | Căn cứ chuyên ngành đầy đủ |
| II.2 — BB họp xét giá | Tên gói/hàng hóa, ngày họp, 3 người ký, ≥3 báo giá | Thông tin các bước trước |
| II.4 — QĐ phê duyệt KHLCNT | Tên gói, dự toán sau TĐG, hình thức, thời gian | CV thẩm định giá |
| III — Hợp đồng | Tên gói, nhà thầu được chọn, giá HĐ, thời gian | QĐ chỉ định thầu |
| IV — Nghiệm thu | Tên gói, nhà thầu, số HĐ, nội dung nghiệm thu | Biên bản xác nhận KL |

---

### CÁCH HỎI KHI VÀO NGANG — MẪU CÂU

```
"Để soạn [tên văn bản] cho dự án [tên dự án], tôi cần biết thêm:

[Chỉ liệt kê những thông tin CẦN cho bước này]

Anh/chị cung cấp hoặc đính kèm file liên quan nếu có."
```

Sau đó xử lý tiếp theo Trường hợp 1 từ Bước 4.


---

## XÁC ĐỊNH QUY TRÌNH

| Giá trị dự toán | Quy trình áp dụng |
|---|---|
| Dưới 500 triệu đồng | `quy-trinh/duoi-500tr.md` |
| Từ 500 triệu đồng trở lên | `quy-trinh/tren-500tr.md` |

**Điểm khác biệt chính giữa 2 quy trình:**

| Bước | Dưới 500tr | Trên 500tr |
|---|---|---|
| QĐ phê duyệt NV & DT (II.1) | Chủ đầu tư (VHXH) ký | UBND xã ký |
| QĐ phê duyệt DT mua sắm & KHLCNT (II.4) | 1 QĐ — Chủ đầu tư ký | 2 QĐ: UBND xã phê duyệt DT → Chủ đầu tư phê duyệt KHLCNT |

---

## NHẬN DIỆN NHÁNH C — BỎ QUA THẨM ĐỊNH GIÁ

**Kích hoạt tự động khi người dùng mô tả gói thầu có ĐẦY ĐỦ các đặc điểm sau:**

| Đặc điểm | Câu hỏi xác nhận |
|---|---|
| Tiếp tục thực hiện trên hệ thống/hạ tầng đã có | "Đây là tiếp tục hay mua mới hoàn toàn?" |
| Chỉ nhà cung cấp hiện tại mới làm được | "Có thể thay nhà cung cấp mà không ảnh hưởng hệ thống không?" |
| Thay nhà cung cấp sẽ gây gián đoạn/xáo trộn | "Lý do kỹ thuật bất khả kháng là gì?" |

**Nếu đủ 3 điều kiện → thông báo:**
> *"Trường hợp này thuộc Nhánh C — tiếp tục thực hiện trên hạ tầng/dịch vụ hiện hữu.
> Bỏ qua giai đoạn thẩm định giá (II.2 và II.3).
> Chỉ cần Đề xuất của chuyên viên phụ trách → Duyệt → QĐ phê duyệt KHLCNT (II.4)."*

**Ví dụ điển hình của Nhánh C:**
- Gia hạn thuê dịch vụ Internet (cùng nhà mạng đang cung cấp, thiết bị đầu cuối đã cấu hình sẵn)
- Tiếp tục bảo trì phần mềm đang vận hành
- Gia hạn bản quyền phần mềm đang dùng
- Duy trì/gia hạn hợp đồng dịch vụ kỹ thuật chuyên biệt gắn với thiết bị đã lắp đặt

**Căn cứ bổ sung vào QĐ phê duyệt KHLCNT khi dùng Nhánh C:**
> *Căn cứ Đề xuất ngày [...] của Công chức phụ trách lĩnh vực [...] về việc tiếp tục thực hiện [tên dịch vụ/nhiệm vụ] trên cơ sở hạ tầng/hệ thống hiện hữu.*

---

## ĐIỀU PHỐI BIỂU MẪU

Mỗi bước trong quy trình sẽ phát sinh 1 hoặc nhiều văn bản/biểu mẫu.
Khi soạn thảo, đọc file biểu mẫu tương ứng và kết hợp:
- **`the-thuc-van-ban`** — định dạng, thể thức, chữ ký, nơi nhận
- **`quy-tac-chung`** — thông tin cán bộ, cơ quan, viết tắt
- **`data/thong-tin-du-an.md`** — thông tin cụ thể của gói thầu

### Bảng biểu mẫu theo bước

| Bước | Văn bản phát sinh | File biểu mẫu |
|---|---|---|
| I.1.2 | Công văn đề xuất kinh phí | `bieu-mau/cong-van-de-xuat-kinh-phi.md` |
| II.1 (< 500tr) — bước chuẩn bị | Tờ trình VH-XH trình Trưởng phòng | *(soạn nội bộ, chưa có mẫu riêng)* |
| II.1 (≥ 500tr) — bước 1 | Tờ trình VH-XH trình UBND xã | `bieu-mau/to-trinh/ttr-phe-duyet-nv-dt-tren500.md` |
| II.1 (< 500tr) — bước 2 | QĐ phê duyệt Nhiệm vụ và Dự toán | `bieu-mau/quyet-dinh/qd-phe-duyet-nv-dt.md` |
| II.1 (≥ 500tr) | QĐ phê duyệt Nhiệm vụ và Dự toán | `bieu-mau/quyet-dinh/qd-phe-duyet-nv-dt-tren500.md` |
| II.2.2 | Biên bản họp xét giá (nội bộ) | `bieu-mau/bien-ban/bb-hop-xet-gia.md` |
| II.2C | Đề xuất chuyên viên (Nhánh C — tiếp tục HT hiện hữu) | *(văn bản nội bộ, không có mẫu riêng — soạn theo yêu cầu)* |
| II.3.1 | QĐ phê duyệt dự toán thẩm định giá | `bieu-mau/quyet-dinh/qd-phe-duyet-dt-tdg.md` |
| II.3.2 | Hợp đồng tư vấn thẩm định giá | `bieu-mau/hop-dong/hd-tu-van-tdg.md` |
| II.3.2 | BB thương thảo HĐ tư vấn TĐG | `bieu-mau/bien-ban/bb-thuong-thao-hd-tuvan.md` |
| II.3.2 | QĐ chỉ định thầu rút gọn (tư vấn) | `bieu-mau/quyet-dinh/qd-chi-dinh-thau-tuvan.md` |
| II.3.2 | BB nghiệm thu tư vấn TĐG | `bieu-mau/bien-ban/bb-nghiem-thu-tuvan.md` |
| II.3.2 | BB xác nhận khối lượng | `bieu-mau/bien-ban/bb-xac-nhan-kl.md` |
| II.3.2 | BB thanh lý HĐ tư vấn | `bieu-mau/bien-ban/bb-thanh-ly-hd.md` |
| II.4 | QĐ phê duyệt DT mua sắm và KHLCNT | `bieu-mau/quyet-dinh/qd-phe-duyet-khlcnt.md` |
| III | BB Thương thảo Hợp đồng kinh tế (mẫu đơn giản, dùng chung) | `bieu-mau/bien-ban/bb-thuong-thao-hd-kinh-te.md` |
| III | QĐ Phê duyệt kết quả lựa chọn nhà thầu **= QĐ chỉ định thầu = QĐ chỉ định thầu rút gọn** | `bieu-mau/quyet-dinh/qd-phe-duyet-kqlcnt.md` |
| III | QĐ chỉ định thầu rút gọn (gói chính) | `bieu-mau/quyet-dinh/qd-chi-dinh-thau-chinh.md` |
| III | Hợp đồng kinh tế | `bieu-mau/hop-dong/hop-dong-kinh-te.md` |
| IV | BB nghiệm thu | `bieu-mau/bien-ban/bb-nghiem-thu-chinh.md` |
| IV | BB xác nhận khối lượng | `bieu-mau/bien-ban/bb-xac-nhan-kl-chinh.md` |
| IV | BB thanh lý hợp đồng | `bieu-mau/bien-ban/bb-thanh-ly-hd-chinh.md` |

---

## ÁNH XẠ TÊN GỌI — NHẬN DIỆN YÊU CẦU

Người dùng có thể dùng nhiều cách gọi khác nhau cho cùng một văn bản.
Claude phải nhận diện và dùng đúng mẫu tương ứng:

| Người dùng nói | Mẫu sử dụng |
|---|---|
| "QĐ chỉ định thầu" | `qd-phe-duyet-kqlcnt.md` |
| "QĐ chỉ định thầu rút gọn" | `qd-phe-duyet-kqlcnt.md` |
| "QĐ phê duyệt KQLCNT" | `qd-phe-duyet-kqlcnt.md` |
| "QĐ phê duyệt kết quả lựa chọn nhà thầu" | `qd-phe-duyet-kqlcnt.md` |
| "QĐ phê duyệt KHLCNT" | `qd-phe-duyet-khlcnt.md` |
| "QĐ phê duyệt kế hoạch lựa chọn nhà thầu" | `qd-phe-duyet-khlcnt.md` |
| "QĐ phê duyệt dự toán mua sắm" | `qd-phe-duyet-khlcnt.md` |
| "BBTT hợp đồng" / "BB thương thảo" | `bb-thuong-thao-hd-kinh-te.md` |
| "Hợp đồng" / "HĐ mua sắm" / "HĐ kinh tế" | `hop-dong-kinh-te.md` |
| "BB họp xét giá" / "BB xét giá" | `bb-hop-xet-gia.md` |
| "BB nghiệm thu" | `bb-nghiem-thu-chinh.md` |
| "QĐ phê duyệt NV&DT" / "QĐ phê duyệt dự toán" | `qd-phe-duyet-nv-dt.md` hoặc `qd-phe-duyet-nv-dt-tren500.md` |


---

## THAM CHIẾU SKILL KHÁC

- **`the-thuc-van-ban`** — thể thức, định dạng, code docx-js
- **`quy-tac-chung`** — cán bộ, viết tắt, văn bản căn cứ
- **`cdso-kehoach`** — KHÔNG dùng (không liên quan)

---

## CĂN CỨ PHÁP LÝ

> **Đọc `data/can-cu-phap-ly.md`** trước khi soạn bất kỳ QĐ, TTr nào.
> File này chứa: căn cứ bắt buộc dùng chung + danh mục căn cứ theo loại hình (tích lũy dần).

**Quy tắc tích lũy căn cứ theo loại hình:**
- Khi người dùng cung cấp văn bản chuyên ngành mới → hỏi xác nhận → cập nhật `data/can-cu-phap-ly.md` → đóng gói lại skill
- Không tự ý thêm căn cứ khi chưa được xác nhận

---

## XÁC NHẬN THÔNG TIN TRƯỚC KHI XUẤT VĂN BẢN

**Bắt buộc áp dụng trước khi xuất MỌI QĐ trong quy trình mua sắm.**

Trước khi xuất file, Claude hiển thị bảng xác nhận gồm 2 phần:

### Phần 1 — Căn cứ pháp lý

| STT | Văn bản | Số/Ký hiệu | Ngày | Vai trò trong QĐ | Xác nhận |
|---|---|---|---|---|---|
| 1 | Luật Ngân sách + sửa đổi | — | 25/6/2015 + 29/11/2024 | Căn cứ bắt buộc | ✓ |
| 2 | Nghị định 98/2025/NĐ-CP | 98/2025 | 06/5/2025 | Căn cứ bắt buộc | ✓ |
| 3 | NQ 25/2025/NQ-HĐND | 25/2025 | 28/8/2025 | Thẩm quyền phê duyệt | ✓ |
| 4 | [Văn bản chuyên ngành] | ... | ... | [Nêu vai trò] | ⚠️ Xác nhận |
| 5 | [QĐ/CV giao kinh phí] | ... | ... | Nguồn vốn | ⚠️ Xác nhận |
| 6 | [CV chấp thuận UBND] | ... | ... | Chấp thuận | ⚠️ Xác nhận |

> **Quy tắc:** Chỉ đưa vào QĐ những văn bản **trực tiếp liên quan đến gói thầu cụ thể**.
> Ví dụ: QĐ 2003 giao kinh phí bầu cử → KHÔNG dùng cho gói thuê Internet.
> CV 664/UBND chấp thuận kinh phí duy trì mạng → DÙNG cho gói thuê Internet.

### Phần 2 — Nội dung chính QĐ

| Trường | Giá trị | Xác nhận |
|---|---|---|
| Tên gói thầu/nhiệm vụ | [...] | ⚠️ |
| Loại: mua sắm / thuê dịch vụ / sửa chữa | [...] | ⚠️ |
| Tổng dự toán | [...] đồng | ⚠️ |
| Nguồn vốn (tự chủ / không tự chủ / bầu cử...) | [...] | ⚠️ |
| Thời gian thực hiện | Năm 20... | ⚠️ |
| Thẩm quyền ký | Trưởng phòng VHXH / CT UBND | ⚠️ |
| Số QĐ | Để trống / [...] | ⚠️ |
| Ngày ký | Để trống / [...] | ⚠️ |

### Cách hiển thị

Claude trình bày 2 bảng trên dạng Markdown, kèm câu hỏi:
> *"Anh/chị xác nhận các thông tin trên để tôi xuất file chính thức không?
> Nếu có điều chỉnh, vui lòng nêu rõ mục cần sửa."*

Chỉ xuất file sau khi người dùng xác nhận (gõ "ok", "đúng", "xuất đi"...).
Nếu người dùng sửa → cập nhật bảng → xác nhận lại → mới xuất.

---

### QUY TẮC SPACING TIÊU ĐỀ QĐ

Trong tất cả mẫu QĐ — phần tiêu đề (trích yếu):
- Dòng "QUYẾT ĐỊNH": `spacing:sp(240,0)` — giữ khoảng cách trên để tách header
- Tất cả dòng còn lại trong tiêu đề (tên QĐ, gạch ngang, người ký): `spacing:sp0` (before=0, after=0)
