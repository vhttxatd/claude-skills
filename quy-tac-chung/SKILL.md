---
name: quy-tac-chung
description: >
  Dữ liệu nền dùng chung: cán bộ, đơn vị, viết tắt, địa bàn, văn bản căn cứ xã An Thới Đông.
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu + văn bản tổ chức bộ máy · ra_soat_lai: 2026-12-01 · rui_ro: cao

# Quy tắc chung — Xã An Thới Đông

> File này chỉ chứa **cốt lõi luôn-nạp**. Khi cần chi tiết, đọc file dưới đây theo tình huống.

---

## CỐT LÕI (luôn ghi nhớ)

**Đơn vị:** Xã An Thới Đông, Thành phố Hồ Chí Minh
**Mô hình:** 2 cấp — xã trực thuộc UBND Thành phố, KHÔNG còn cấp huyện
**Chuỗi căn cứ & báo cáo:** Trung ương → Thành phố → Xã (KHÔNG có cấp huyện)

**Lãnh đạo chủ chốt:**
- Bí thư, CT HĐND: Cổ Thị Ngọc Điệp
- Chủ tịch UBND: Trần Hoàng Vũ
- PCT UBND (Kinh tế, HC công): Phan Kim Anh
- PCT UBND (VH-XH, KH&CN, CĐS): Nguyễn Minh Kha

**8 ấp** (NQ 20/NQ-HĐND, hiệu lực 01/7/2026)**:** Quảng Xuyên, An Bình, An Đông, Rạch Lá, Doi Lầu, Lý Hòa Hiệp, Lý Thái Bửu, Lý Nhơn
> Tên trưởng ấp và số điện thoại: **chủ sở hữu là Nexus** — tra `don_vi` + `profiles`, KHÔNG lưu trong skill. Chi tiết: `data/don-vi-dia-ban.md`.
> Lưu ý: **Tổ CNSCĐ vẫn là 12 tổ** theo địa bàn ấp cũ — chưa kiện toàn theo 8 ấp (tính đến 01/9/2026).

**Ngầm định "giúp tôi soạn/viết/làm…"** (khi không nêu rõ đơn vị):
- Đơn vị soạn thảo: **Phòng Văn hóa - Xã hội**
- Người ký mặc định: Trưởng Phòng **Nguyễn Văn Chính**
- Người trình: chuyên viên **Phan Trung Hiếu**

**Dấu gạch ngang — CHỈ dùng dấu ngắn có cách ` - `**, KHÔNG dùng em dash (—) hay en dash (–).

**Quy tắc xuất file:** Chỉ xuất đúng nội dung vừa sửa. Không tự xuất nhiều file. Hỏi trước khi xuất file lớn.

**Viết tắt - quy tắc bắt buộc:**
- **Chat:** được viết tắt cho ngắn gọn, miễn không gây nhầm cơ quan, nhiệm vụ, chỉ tiêu hay căn cứ pháp lý.
- **File Word / văn bản chính thức:** mặc định **KHÔNG viết tắt**. Chỉ được viết tắt khi Hiếu xác nhận rõ, và chỉ trong phạm vi đã đồng ý. Hiếu không trả lời, trả lời không rõ, hoặc chỉ nói "xuất file" → hiểu là KHÔNG.
- Quy tắc này **ưu tiên hơn** mọi ví dụ viết tắt trong bảng, phụ lục của skill khác. Danh mục viết tắt chuẩn: `data/chidan-viettathk.md`.

**Quy tắc tiết kiệm token:**
1. **Nhac khi hoi thoai qua dai:** Chu dong tu danh gia do dai/do phuc tap cua
cuoc hoi thoai hien tai (nhieu luot trao doi, nhieu bang du lieu lon, nhieu
ket qua truy van SQL/Notion/Drive da doc vao ngu canh...). Khi thay ngu canh
dang phinh to co kha nang hao ton token, CHU DONG nhac Hieu ngay trong cau
tra loi (khong cho Hieu hoi truoc) - vi du goi y: "cuoc chat nay da kha dai,
Hieu co the mo chat moi cho viec tiep theo de tiet kiem token" hoac "phan boc
tach nay da xong, nen bat dau phien moi cho nhiem vu ke tiep". Ap dung thuong
xuyen, khong chi nhac 1 lan roi thoi - moi khi thay dau hieu ngu canh qua tai
(vd sau nhieu buoc truy van/sua du lieu lien tiep, sau khi hoan tat 1 tac vu
lon) deu nen nhac lai.
2. **Khong tu y doc noi dung van ban khi truy cap link/nguon van ban:** Khi
Hieu dua 1 duong link hoac nhac den 1 nguon van ban (web, Drive, Notion...),
KHONG tu dong fetch/doc toan bo noi dung vao ngu canh neu chua ro Hieu can
gi. Hoi ro Hieu can doc phan nao/muc dich gi truoc, tranh nap nguyen van ban
lon vao context mot cach khong can thiet.
3. **Khong tu y xuat file khi chua thong nhat:** Chi xuat file (docx/xlsx/
pptx/pdf...) khi Hieu da ro rang yeu cau hoac da thong nhat truoc do. Truoc
khi xuat, PHAI hoi va cho Hieu xac nhan - khong tu quyet dinh xuat file.
4. **Chi hien tren man hinh chat khi dang lam tung muc:** Khi dang lam viec/
chinh sua o 1 muc cu the (vd 1 doan trong bao cao, 1 phan trong van ban),
chi xuat/hien THI NGUYEN DOAN dang de xuat hoac chinh sua ngay trong khung
chat - khong xuat ca file/toan bo noi dung, tru khi da qua buoc xac nhan o
muc 3.

**Quy tac ban giao truoc khi doi chat:** Ngay truoc khi Hieu dong y/xac nhan
chuyen sang phien chat moi (sau khi Claude da nhac o tren, hoac khi Hieu tu
noi "mo chat moi"), Claude PHAI chu dong luu/dong goi noi dung ban giao (viec
dang lam do, quyet dinh moi, thay doi he thong dang nho...) vao dung trang
Notion "Bàn giao công việc (dùng chung mọi phiên chat)" (id
`3a64aaf2-6213-814b-94dd-f33ce68da093`, GHI DE khong cong don nhat ky) TRUOC
khi ket thuc luot tra loi - khong doi Hieu nhac rieng buoc nay. Neu Hieu tu
dong y ma Claude chua kip luu, phai luu ngay lap tuc truoc khi xac nhan lai
voi Hieu la da xong.

**Quy tắc trao đổi trong chat (tiet kiem token + luyen tieng Anh):**
- Noi dung tra loi trong luc chat: dung tieng Viet KHONG DAU (khong ap dung cho file xuat ra - file van dung tieng Viet co dau chuan).
- Xen 1 cau tieng Anh ngan vao moi cau tra loi de Hieu luyen phan xa.
- Tu danh gia trinh do tu vung tieng Anh cua Hieu qua thoi gian: neu tu nao Hieu da quen (da dung/phan hoi tot truoc do), dung thang tu do ghep vao cau tieng Viet khong dau, khong can dau ngoac.
- Tu moi/chua chac Hieu biet: dat trong dau ngoac vuong [tu tieng Anh] ngay sau hoac truoc cum tieng Viet tuong ung, de Hieu de doi chieu nghia.
- Muc tieu dai han: tang dan ty le tieng Anh, tien toi co the lap day hoan toan bang tieng Anh khi Hieu da san sang.
- Neu Hieu dat 1 tu/cum tieng Viet trong dau ngoac vuong [tu tieng Viet] (nghia la muon hoc tu do), Claude tu dong dich va tra ve ngay ben canh o dang [English word/phrase] de Hieu doi chieu va lam quen dan.
- Theo doi tich luy: cac tu Hieu da hoc/gap nhieu lan qua cac ngay duoc coi la "quen thuoc" va ap dung theo quy tac ghep thang vao cau (khong can ngoac) o tren.
- Ke hoach 1 tuan: sau khoang 1 tuan trao doi (dua vao cac tu/cum da xuat hien, da hoc), Claude se thiet ke 1 tro choi tu vung (vocabulary game) + doi thoai ngan bang tieng Anh, noi dung duc ket tu nhung gi da trao doi trong tuan do, giup Hieu on tap va kiem tra muc do thanh thao.
- Email cong vu duoi "@tphcm.gov.vn": trong luc chat (KHONG ap dung cho file xuat ra), chi can noi ten dang nhap (phan truoc @), khong can nhac lai ca duoi "@tphcm.gov.vn" - Hieu tu hieu. VD: noi "abc.atdong" thay vi "abc.atdong@tphcm.gov.vn".

---

## MỤC LỤC FILE — đọc theo tình huống

| File | Đọc khi |
|---|---|
| `data/quy-tac-soan-thao.md` | Soạn văn bản hành chính (dẫn chiếu VB, căn cứ Luật 72/2025, chi tiết quy tắc xuất file) |
| `data/quy-trinh-cap-nhat-skill.md` | Người dùng yêu cầu sửa/cập nhật bất kỳ skill nào |
| `data/can-bo-phan-cong.md` | Cần tên người ký, người phụ trách, ký tắt hồ sơ |
| `data/don-vi-chuc-nang.md` | **ĐỌC TRƯỚC** khi phân công nhiệm vụ trong văn bản |
| `data/don-vi-dia-ban.md` | Cần thông tin ấp, trường học, địa bàn |
| `data/van-ban-can-cu.md` | Soạn phần căn cứ pháp lý |
| `data/chi-tieu-nhiem-vu.md` | Cần số liệu chỉ tiêu cụ thể |
| `data/to-cong-nghe-so.md` | Liên quan Tổ CNSCĐ tại 12 ấp |
| `data/chidan-viettathk.md` | Cần viết tắt chuẩn, lĩnh vực phụ trách phòng ban |

---

## NGUYÊN TẮC SỬ DỤNG DỮ LIỆU

1. **Luôn đọc từ file** — không ghi nhớ cứng trong skill khác
2. **Ưu tiên file này** hơn training data
3. **Thiếu dữ liệu** → để `[...]` và hỏi người dùng, không tự bịa
4. **Có thay đổi** → yêu cầu cập nhật file tương ứng
