# Liên kết Chỉ tiêu ↔ Nhiệm vụ ↔ Số liệu ↔ Minh chứng

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: chắt lọc từ `nexus-gov-rules/01_QUY_TAC_LIEN_KET_CHITIEU_NHIEMVU_SOLIEU.md` (skill đã nghỉ hưu 01/9/2026) · ra_soat_lai: 2027-03-01 · rui_ro: trung

Áp dụng khi soạn, sửa hoặc rà soát kế hoạch, chương trình, đề án — và khi lập
phụ lục chỉ tiêu, phụ lục nhiệm vụ trình lãnh đạo.

Phần kỹ thuật Airtable trong file gốc đã bỏ (hệ thống chuyển sang Supabase từ
19/7/2026). Chỉ giữ nguyên tắc nghiệp vụ.

---

## 1. Phân biệt khái niệm

| Khái niệm | Định nghĩa | Ví dụ |
|---|---|---|
| **Chỉ tiêu** | Kết quả cần đạt, đo lường được | 100% cán bộ, công chức có chữ ký số |
| **Nhiệm vụ** | Việc phải làm để đạt chỉ tiêu | Triển khai cấp chữ ký số cho cán bộ, công chức |
| **Giải pháp** | Cách tổ chức thực hiện nhiệm vụ | Phối hợp đơn vị cung cấp triển khai tập trung |
| **Căn cứ / lý do đề xuất** | Cơ sở hình thành chỉ tiêu, nhiệm vụ: văn bản cấp trên, văn bản của xã, việc đã giao, điều kiện thực tế, yêu cầu quản lý | Xuất phát từ nhu cầu kết nối vùng nuôi trồng thủy sản |
| **Đơn vị chủ trì** | Đơn vị chịu trách nhiệm chính | Phòng Văn hóa - Xã hội |
| **Đơn vị phối hợp** | Tham gia, cung cấp số liệu, hỗ trợ chuyên môn | Văn phòng HĐND-UBND xã, Công an xã |
| **Lực lượng hỗ trợ** | Tổ cộng đồng, cộng tác viên, đoàn thể | Tổ Công nghệ số cộng đồng, Đoàn Thanh niên |
| **Minh chứng** | Tài liệu chứng minh đã thực hiện | Danh sách, báo cáo, trích xuất hệ thống, hình ảnh |

> Tên đơn vị và phạm vi chức năng: tra `quy-tac-chung/data/don-vi-chuc-nang.md`,
> không chép cứng vào kế hoạch từ trí nhớ.

---

## 2. Hai chiều liên kết bắt buộc

**2.1. Mỗi chỉ tiêu phải có nhiệm vụ tương ứng.** Không đưa chỉ tiêu vào kế
hoạch nếu chưa xác định được việc phải làm để đạt nó.

**2.2. Mỗi nhiệm vụ phải phục vụ ít nhất một chỉ tiêu.** Nhiệm vụ điều kiện
(kinh phí, kiểm tra, báo cáo) thì ghi rõ là phục vụ triển khai toàn bộ kế hoạch.

**2.3. Sửa một phần → rà soát các phần liên quan.** Khi thêm/bớt/sửa chỉ tiêu,
kiểm tra lần lượt: nhiệm vụ nào liên quan · đơn vị chủ trì còn phù hợp không ·
phụ lục chỉ tiêu và phụ lục nhiệm vụ có phải sửa không · kết quả, sản phẩm,
minh chứng có phải cập nhật không · căn cứ đề xuất còn đúng không.

Khi sửa nhiệm vụ: thêm thì phải xác định gắn với chỉ tiêu nào; bỏ thì phải kiểm
tra có chỉ tiêu nào mất nhiệm vụ thực hiện hay không.

---

## 3. Cột giải trình trong bản trình lãnh đạo

- Bảng chỉ tiêu, nhiệm vụ, phân công, tiến độ trình lãnh đạo **phải có cột
  giải trình căn cứ / lý do đề xuất** — để chứng minh nội dung không phải liệt
  kê cơ học.
- Đặt **bên phải cùng**, tiêu đề cột có ghi rõ "Cột này để giải trình, không
  phát hành". Khi xuất Word thì để màu đỏ.
- Nội dung ô giải trình **không mở đầu bằng "Căn cứ..."**, phải chỉ rõ chỉ tiêu,
  phụ lục, mục hoặc phần liên quan.
- **Bản phát hành chính thức: xóa cột này**, trừ khi Hiếu yêu cầu giữ.

---

## 4. Trục số liệu — không nhầm cấp, không nhầm nguồn

```
Cấp quốc gia (căn cứ, định hướng)
  → Cấp Thành phố (cụ thể hóa thành kế hoạch, chương trình, tiêu chí)
    → Cấp xã (tổ chức thực hiện, chỉ tiêu xã)
      → Đơn vị chuyên môn (phát sinh số liệu gốc)
        → Địa bàn, đối tượng (triển khai trực tiếp)
          → Minh chứng cụ thể
```

- Không trộn số liệu cấp trên với số liệu địa phương khi chưa có căn cứ.
- Không dùng số liệu quốc gia hoặc Thành phố thay cho số liệu xã, trừ khi văn
  bản giao trực tiếp.
- Mỗi đơn vị chuyên môn chỉ cung cấp số liệu thuộc chức năng của mình — không
  mặc định một đơn vị có tất cả số liệu.

---

## 5. Quy tắc số liệu

**5.1. Ba loại số liệu, không được lẫn:**

| Loại | Ý nghĩa | Cách viết |
|---|---|---|
| Mục tiêu / chỉ tiêu | Số cần phấn đấu đạt | "phấn đấu đạt...", "mục tiêu..." |
| Kết quả thực hiện | Số đã đạt tại thời điểm báo cáo | "đã đạt...", "kết quả..." |
| Nhận định tiến độ | Đánh giá khả năng hoàn thành | "khả năng đạt...", "cần phấn đấu..." |

**5.2. Mỗi chỉ tiêu phải có nguồn số liệu.** Chưa xác định được thì để `[...]`
hoặc ghi "cần xác định nguồn số liệu" — không bỏ trống lặng lẽ.

**5.3. Không tự nội suy.** Muốn tính tỷ lệ phải có đủ: tử số, mẫu số, thời
điểm, đơn vị cung cấp, phương pháp tính.

**5.4. Số liệu phải có thời điểm:** quý / 6 tháng / năm / đến ngày cụ thể /
theo đợt / theo kế hoạch chuyên đề.

**5.5. Mọi số liệu báo cáo phải có minh chứng:** báo cáo, trích xuất hệ thống,
danh sách ký nhận, biên bản, hình ảnh, quyết định, sản phẩm số, văn bản xác
nhận của đơn vị phối hợp.

---

## 6. Bảy nhóm nhiệm vụ — dùng để kiểm tra bỏ sót

| Nhóm | Nội dung |
|---|---|
| 1. Tuyên truyền, nâng cao nhận thức | Chủ trương, chính sách, kỹ năng, phong trào, mô hình, truyền thông số |
| 2. Cơ chế chỉ đạo, điều hành | Kiện toàn tổ chức, phân công, phối hợp, kiểm tra, báo cáo |
| 3. Hạ tầng, nền tảng, dữ liệu | Thiết bị, đường truyền, nền tảng số, cơ sở dữ liệu, hệ thống thông tin |
| 4. Nhân lực và kỹ năng | Đào tạo cán bộ, bồi dưỡng kỹ năng số, phổ cập kỹ năng cho người dân |
| 5. Ứng dụng quản lý nhà nước, phục vụ người dân - doanh nghiệp | Dịch vụ công trực tuyến, số hóa, chữ ký số, dữ liệu dân cư, cải cách hành chính |
| 6. Kinh tế số, xã hội số, đổi mới sáng tạo | Hộ kinh doanh, hợp tác xã, doanh nghiệp, thương mại điện tử, thanh toán số, mô hình thí điểm |
| 7. An toàn thông tin, an ninh mạng | Bảo vệ hệ thống, phòng chống lừa đảo, bảo vệ thông tin cá nhân |

Không bắt buộc kế hoạch nào cũng đủ 7 nhóm. Nhưng kế hoạch thuộc lĩnh vực khoa
học, công nghệ, chuyển đổi số thì nên soát qua đủ 7 nhóm để tránh bỏ sót.

---

## 7. Ma trận gợi ý — chỉ tiêu thường gắn nhóm nào, số liệu lấy ở đâu

| Loại chỉ tiêu | Nhóm nhiệm vụ | Nguồn số liệu thường gặp |
|---|---|---|
| Chỉ số đánh giá tổng hợp (DTI...) | Tất cả nhóm | Đơn vị đầu mối tổng hợp |
| Thủ tục hành chính, dịch vụ công | 5 | Bộ phận hành chính công, hệ thống dịch vụ công |
| Văn bản điện tử, hồ sơ công việc | 3, 5 | Đơn vị quản lý văn bản, hệ thống QLVB |
| Nhân lực, đào tạo, kỹ năng | 4 | Danh sách tập huấn, khảo sát, báo cáo đào tạo |
| Người dân sử dụng dịch vụ số | 1, 4, 6 | Báo cáo đơn vị, hệ thống dịch vụ, khảo sát |
| Định danh, dữ liệu dân cư | 5 | Công an xã, cơ sở dữ liệu dân cư |
| Thanh toán số, tài khoản số | 1, 6 | Ngân hàng, báo cáo địa phương |
| Hộ kinh doanh, hợp tác xã, doanh nghiệp | 6 | Phòng Kinh tế, danh sách cơ sở |
| Hạ tầng số, viễn thông | 3 | Doanh nghiệp viễn thông, biên bản khảo sát |
| An toàn thông tin | 7 | Công an xã, báo cáo kiểm tra, sự cố |
| Tuyên truyền | 1 | Tin bài, hình ảnh, danh sách hoạt động |
| Kinh phí | 2 | Dự toán, phân bổ, quyết toán |

---

## 8. Cách viết — nên và tránh

**Ưu tiên cụm từ:** Chủ trì tham mưu... · Phối hợp triển khai... · Tổ chức thực
hiện... · Theo dõi, tổng hợp... · Định kỳ báo cáo... · Tăng cường hướng dẫn... ·
Rà soát, cập nhật... · Bảo đảm điều kiện... · Kết quả, sản phẩm gồm...

**Tránh:**
- Nội dung chung chung, không giao được việc
- Nội dung quá chi tiết, thành lịch công tác
- Nhiệm vụ không có đơn vị chủ trì
- Chỉ tiêu không có nguồn số liệu
- Chỉ tiêu, nhiệm vụ không có căn cứ trong bản trình lãnh đạo
- Số liệu không có thời điểm; kết quả không có minh chứng
- Giao việc không đúng chức năng đơn vị

---

## 9. Ghi nhớ nhanh

```
Chỉ tiêu = đích đến
Nhiệm vụ = cách làm
Giải pháp = cách tổ chức làm
Cột giải trình = vì sao đưa vào kế hoạch; bản phát hành thì xóa
Phụ lục chỉ tiêu = dùng để đo · Phụ lục nhiệm vụ = dùng để giao việc
Nguồn số liệu = nơi chứng minh kết quả · Minh chứng = căn cứ để báo cáo
Sửa 1 phần = rà soát các phần liên quan
KHÔNG tự bịa số liệu, văn bản, đơn vị, kết quả
```
