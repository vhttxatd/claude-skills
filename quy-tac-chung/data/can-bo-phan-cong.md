# Danh sách cán bộ và phân công — Xã An Thới Đông

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: khối Đảng/đoàn thể — quyết định phân công của Đảng ủy xã; khối UBND — Nexus `profiles` · ra_soat_lai: 2026-12-01 · rui_ro: cao

> Tên người ký văn bản: không tự điền, hỏi người dùng xác nhận trước khi đưa vào văn bản chính thức.

## CHỦ SỞ HỮU DỮ LIỆU TRONG FILE NÀY

Nexus `profiles` **chỉ phủ khối UBND và đơn vị trực thuộc** (137 người). Khối
Đảng, đoàn thể, công an **không có trong Nexus** — nên file này là chủ sở hữu
cho phần đó. Chia vai như sau:

| Nội dung | Chủ sở hữu | Khi mâu thuẫn |
|---|---|---|
| Số điện thoại, email công vụ (mọi khối) | **Nexus `profiles`** | Nexus thắng |
| Họ tên, chức vụ — khối UBND | **Nexus `profiles`** | Nexus thắng |
| Họ tên, chức vụ — khối Đảng, đoàn thể, công an | **File này** | File này thắng |
| Lĩnh vực phụ trách, ký tắt hồ sơ | **File này** | Nexus không có cột |
| Cơ cấu BCĐ, Tổ giúp việc, nguyên tắc phân công | **File này** | Nexus không có bảng |

> Sửa tên hoặc chức vụ người khối UBND ở file này là **sai quy trình** — sửa
> trong Nexus, file này chỉ chép lại.

---

## THÔNG TIN LIÊN LẠC CÁN BỘ — TRA NEXUS

> **KHÔNG lưu số điện thoại, email công vụ trong file này.** Đã chuyển toàn bộ
> sang Nexus `profiles` ngày 01/9/2026 để chỉ còn một nơi giữ dữ liệu.

Khi cần điền số điện thoại hoặc email vào biểu mẫu, công văn, phiếu trình:

```sql
select p.ho_ten, p.chuc_vu, p.dien_thoai, p.mail_cv, d.ten_don_vi
from profiles p left join don_vi d on d.id = p.don_vi_id
where p.ho_ten = '<họ tên đầy đủ>';
```

Nếu Nexus chưa có người cần tra: **hỏi Hiếu, rồi ghi vào Nexus** — không chép
ngược trở lại file này.

### Trường Nexus không có — file này giữ

| Người | Chức vụ diễn giải đầy đủ | Ký tắt hồ sơ lưu |
|---|---|---|
| Phan Trung Hiếu | Chuyên viên phụ trách KH&CN - CĐS | VHXH-Hiếu |
| Nguyễn Văn Chính | Trưởng phòng Văn hóa - Xã hội | — |

> Nexus lưu `chuc_vu` ở dạng rút gọn ("Chuyên viên", "Trưởng phòng") để phục vụ
> phân quyền. Cột trên là **diễn giải để đưa vào văn bản**, không mâu thuẫn.

---

## Đảng ủy xã

| Cơ quan, đơn vị | Họ và tên | Chức vụ |
|---|---|---|
| Thường trực Đảng ủy | Cổ Thị Ngọc Điệp | Bí thư, Chủ tịch HĐND |
| Thường trực Đảng ủy | Phan Lê Hoài Phòng | Phó Bí thư |
| Văn phòng Đảng ủy | Võ Hoàng Tâm | Chánh Văn phòng |
| Ban Xây dựng Đảng | Nguyễn Thị Đẹp | Trưởng ban |
| Ủy ban Kiểm tra | Nguyễn Văn Thanh | Chủ nhiệm |

## Hội đồng nhân dân xã

| Cơ quan, đơn vị | Họ và tên | Chức vụ |
|---|---|---|
| Thường trực HĐND | Cổ Thị Ngọc Điệp | Chủ tịch HĐND |
| Thường trực HĐND | Lê Văn Được | Phó Chủ tịch HĐND |

## Ủy ban nhân dân xã

| Cơ quan, đơn vị | Họ và tên | Chức vụ | Lĩnh vực phụ trách |
|---|---|---|---|
| Thường trực UBND | Trần Hoàng Vũ | Chủ tịch UBND | |
| Thường trực UBND | Phan Kim Anh | Phó Chủ tịch UBND | Kinh tế, Hành chính công |
| Thường trực UBND | Nguyễn Minh Kha | Phó Chủ tịch UBND | Văn hóa – Xã hội, KH&CN – ĐMST và CĐS |
| Văn phòng HĐND và UBND | Nguyễn Thành Phương | Chánh Văn phòng | Tư pháp và đối ngoại |
| Phòng Kinh tế | Nguyễn Thị Linh Phương | Trưởng phòng | Tài chính – Kế hoạch; Đầu tư công; Thống kê; Kinh doanh |
| Phòng Văn hóa – Xã hội | Nguyễn Văn Chính | Trưởng phòng | Nội vụ; Giáo dục và đào tạo; Văn hóa, KH&CN; Thông tin truyền thông; CĐS |
| Trung tâm PVHCC | Phan Kim Anh | Giám đốc (kiêm Phó CT UBND) | Kinh tế, Hành chính công |
| Trung tâm PVHCC | Văn Công Quan | Phó Giám đốc | |

## Lực lượng vũ trang

| Cơ quan, đơn vị | Họ và tên | Chức vụ |
|---|---|---|
| Công an xã | Nguyễn Văn Công | Trưởng Công an |

## Mặt trận Tổ quốc và các tổ chức chính trị – xã hội

| Cơ quan, đơn vị | Họ và tên | Chức vụ |
|---|---|---|
| MTTQ Việt Nam xã | Đặng Xuân Bình | Chủ tịch MTTQ |
| Xã đoàn | Lê Võ Đăng Khoa | Bí thư |
| Xã đoàn | Nguyễn Thị Yến Nhi | Phó Bí thư |

## Phân công phụ trách CĐS — hệ thống theodoinq.dcs.vn (Báo cáo Hệ thống 57)

| Đơn vị | Người phụ trách |
|---|---|
| Phòng Kinh tế | Nguyễn Thị Linh Phương |
| Phòng Văn hóa – Xã hội | Nguyễn Văn Chính |
| Trung tâm PVHCC | Phan Kim Anh |

---

## BAN CHỈ ĐẠO VỀ PHÁT TRIỂN KHOA HỌC, CÔNG NGHỆ, ĐỔI MỚI SÁNG TẠO VÀ CHUYỂN ĐỔI SỐ XÃ AN THỚI ĐÔNG

> QĐ thành lập: 82-QĐ/ĐU ngày 29/9/2025 của Ban Thường vụ Đảng ủy xã
> Cơ quan Thường trực: Văn phòng Đảng ủy xã

### Cơ cấu Ban Chỉ đạo

| Chức danh BCĐ | Họ và tên | Chức vụ chính quyền/Đảng |
|---|---|---|
| Trưởng Ban | Cổ Thị Ngọc Điệp | Bí thư ĐU, CT HĐND xã |
| Phó Trưởng Ban Thường trực | Phan Lê Hoài Phong | Phó Bí thư Thường trực ĐU xã |
| Phó Trưởng Ban | Trần Hoàng Vũ | PBT ĐU, CT UBND xã |
| Phó Trưởng Ban | Lê Văn Được | UVBTV ĐU, PCT HĐND xã |
| Phó Trưởng Ban | Đặng Xuân Bình | UVBTV ĐU, CT UBMTTQ xã |
| Ủy viên Thường trực | Võ Hoàng Tâm | CVP Đảng ủy xã |
| Ủy viên Thường trực | Nguyễn Văn Chính | TP Phòng Văn hóa - Xã hội |

### Tổ giúp việc Ban Chỉ đạo

> QĐ thành lập: 01-QĐ/BCĐ ngày 21/10/2025 của Ban Chỉ đạo xã

| Chức danh Tổ GV | Họ và tên | Chức vụ |
|---|---|---|
| Tổ trưởng | Phan Lê Hoài Phong | Phó Bí thư TT ĐU, PTB TT BCĐ |
| Tổ phó Thường trực | Võ Hoàng Tâm | CVP Đảng ủy xã |
| Tổ phó | Nguyễn Văn Chính | TP Phòng Văn hóa - Xã hội |
| Tổ phó | Nguyễn Thị Hồng Thanh | Phó Trưởng Công an xã |
| Thành viên | Nguyễn Thị Ngọc Giàu | PCVP HĐND và UBND xã |
| Thành viên | Võ Văn Phẳng | Phó TP Phòng Kinh tế |
| Thành viên | Văn Công Quan | PGĐ Trung tâm PVHCC |
| Thành viên | Trần Thị Mỹ Hạnh | PCT Hội Liên hiệp Phụ nữ xã |
| Thành viên | Trần Văn Duy | PCT Hội Nông dân xã |
| Thành viên | Nguyễn Thị Yến Nhi | Phó Bí thư Đoàn Thanh niên xã |
| Thành viên | Phan Trung Hiếu | CV Phòng Văn hóa - Xã hội |
| Thành viên | Nguyễn Thị Tuyết Phương | CV Văn phòng Đảng ủy xã |
| Thành viên | Bùi Lê Khoa | Cán bộ Công an xã |

### Nguyên tắc phân công khi liên quan đến BCĐ xã

**UBND xã KHÔNG thành lập Ban Chỉ đạo riêng.** Các chức danh lãnh đạo UBND xã đã là thành viên BCĐ của Đảng ủy xã:
- CT UBND Trần Hoàng Vũ = Phó Trưởng Ban BCĐ xã
- PCT UBND Nguyễn Minh Kha = Ủy viên BCĐ xã
- TP VH-XH Nguyễn Văn Chính = Ủy viên Thường trực BCĐ + Tổ phó Tổ GV

**Khi văn bản UBND xã nhắc đến BCĐ:** dùng đúng tên — *"Ban Chỉ đạo về phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số xã An Thới Đông"* (gọi tắt: Ban Chỉ đạo xã).

**Cơ quan Thường trực BCĐ = Văn phòng Đảng ủy** → Tổ giúp việc do Văn phòng Đảng ủy điều phối.

**Phòng VH-XH (UBND xã)** = Cơ quan tham mưu chuyên môn về CĐS cho UBND xã, đồng thời Trưởng phòng là Ủy viên TT BCĐ và Tổ phó Tổ GV.

### Viết tắt dùng trong văn bản

| Viết tắt | Tên đầy đủ |
|---|---|
| BCĐ xã | Ban Chỉ đạo về phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số xã An Thới Đông |
| Tổ GV | Tổ giúp việc Ban Chỉ đạo xã |
| TT BCĐ | Thường trực Ban Chỉ đạo xã |
