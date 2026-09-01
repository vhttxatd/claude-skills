# Quy trình cập nhật skill

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu · ra_soat_lai: 2027-03-01 · rui_ro: cao

> Đọc khi: người dùng yêu cầu sửa, cập nhật, cải tiến bất kỳ skill nào.

---

## AI CÓ THỂ CẬP NHẬT

**Mọi phiên chat** đều có thể cập nhật skill khi người dùng yêu cầu.
Không cần phiên chuyên biệt.

---

## QUY TRÌNH BẮT BUỘC

Khi người dùng yêu cầu cập nhật BẤT KỲ skill nào, Claude phải:

1. **Đọc nội dung hiện tại** của skill được yêu cầu cập nhật
2. **Kiểm tra tác động** — xem xét các skill liên quan có bị ảnh hưởng không
3. **Đề xuất đồng bộ** — liệt kê rõ những skill khác cần cập nhật theo
4. **Chờ xác nhận** từ người dùng trước khi thực hiện
5. **Cập nhật đồng bộ** tất cả skill liên quan trong cùng một lần
6. **Cập nhật dòng META** — bắt buộc sửa `cap_nhat` và tính lại `ra_soat_lai`
   theo mức `rui_ro` (xem `quy-tac-tri-nho.md`). Sửa nội dung mà không sửa
   META coi như chưa sửa xong.
7. **Đóng gói lại** tất cả file `.skill` đã thay đổi

---

## BẢN ĐỒ 16 SKILL — 4 LỚP

```
LỚP NỀN (luôn có hiệu lực, không cần gọi tên)
  fable-mode            ← kỷ luật tư duy, mặc định mọi nhiệm vụ
  quy-tac-chung         ← dữ liệu tác nghiệp: cán bộ, đơn vị, viết tắt, căn cứ
  the-thuc-van-ban      ← định dạng đầu ra, code docx-js

LỚP TRA CỨU (mở khi cần dữ kiện, không tự kích hoạt)
  tri-thuc-dia-phuong          ← hiện trạng/tiềm năng xã theo lĩnh vực
  danh-muc-nen-tang-dung-chung ← nền tảng & CSDL dùng chung QG/TP
  kho-luu-tru                  ← bản đồ Notion + Nexus, bảng nào chứa gì

LỚP NGHIỆP VỤ (kích hoạt theo loại việc)
  bao-cao-hanh-chinh    → nền + tra cứu
  cdso-kehoach          → nền + danh-muc-nen-tang-dung-chung
  quan-ly-du-an         → nền
  nhan-su-danh-gia      → quy-tac-chung
  sinh-hoat-chi-bo      → quy-tac-chung + Notion Tbl_PhanCongCBo
  chung-thu-chu-ky-so   → nền
  xin-mail-cong-vu      → quy-tac-chung
  xu-ly-van-ban-den     → kho-luu-tru + Notion + Nexus

LỚP META (chỉ chạy khi gọi tên)
  tao-skill                    ← tạo/sửa skill
  brainstorm-spec-plan-execute ← việc lập trình ≥2 bước
```

**Quy tắc lớp:** lớp dưới được đọc lớp trên, lớp trên **không** phụ thuộc
lớp dưới. Nếu phát hiện một skill nghiệp vụ đang bị skill khác cùng lớp
nghiệp vụ đọc vào — đó là dấu hiệu cần tách phần dùng chung lên lớp nền.

---

## KHI NÀO CẦN ĐỒNG BỘ

| Cập nhật skill | Kiểm tra thêm |
|---|---|
| `quy-tac-chung` (cán bộ, viết tắt, căn cứ...) | Tất cả skill lớp nghiệp vụ |
| `the-thuc-van-ban` (định dạng, code) | `bao-cao-hanh-chinh`, `cdso-kehoach`, `quan-ly-du-an`, `chung-thu-chu-ky-so`, `sinh-hoat-chi-bo`, `nhan-su-danh-gia` |
| `kho-luu-tru` (schema Nexus, bảng Notion) | `xu-ly-van-ban-den`, `bao-cao-hanh-chinh` |
| `quy-tac-tri-nho` (phân vai dữ liệu) | Toàn bộ — đây là quy tắc gốc |
| `danh-muc-nen-tang-dung-chung` | `cdso-kehoach`, `bao-cao-hanh-chinh` |
| `tri-thuc-dia-phuong` (số liệu nền) | `bao-cao-hanh-chinh`, `cdso-kehoach` |
| Bất kỳ skill nghiệp vụ nào | `the-thuc-van-ban` nếu có định dạng đầu ra mới |

---

## LƯU Ý KHI ĐỌC VÀ GHI FILE SKILL

- **Đọc:** Tự do, không cần xác nhận
- **Ghi/Sửa:** Luôn đề xuất danh sách thay đổi → chờ xác nhận → thực hiện
- **Đóng gói:** Sau khi sửa file → đóng gói lại thành `.skill` → xuất ra `/mnt/user-data/outputs/`
- **Diacritic:** file skill dùng tiếng Việt có dấu — khi dùng `str_replace`,
  luôn `view` đúng khoảng dòng trước, không gõ lại từ trí nhớ

**Đóng gói đồng bộ:** Sau mỗi lần cập nhật, đóng gói **tất cả skill có liên quan**
để đảm bảo đồng bộ. Không để skill bị lệch phiên bản giữa các file.

---

## BA BẢN SAO — QUY TẮC CHỐNG LỆCH

Skill tồn tại ở ba nơi. Vai trò phải rõ:

| Nơi | Vai trò | Ai sửa |
|---|---|---|
| **Claude.ai Settings** | Bản **đang chạy** — là bản duy nhất Claude thực sự đọc | Hiếu upload thủ công |
| **GitHub `vhttxatd/claude-skills`** | Bản **gốc có lịch sử** — nguồn sự thật khi hai bản lệch | Hiếu sửa qua web |
| **`D:\claude-skills`** | Bản sao tiện dụng, **không có thẩm quyền** | — |

**Quy tắc:** mỗi lần sửa skill, phải cập nhật **cả Settings và GitHub trong
cùng ngày**. Nếu chỉ kịp một nơi → ghi ngay vào Notion trang bàn giao là nơi
nào chưa đồng bộ. Claude phải nhắc điều này sau mỗi lần xuất file skill.

---

## Việc đã đóng — đừng đi tìm lại

**Quy tắc TRANG-THAI-HIEN-TAI (fetch file trạng thái từ GitHub trước khi làm
việc): ĐÃ KHÔNG CÒN TỒN TẠI.** Xác minh ngày 01/9/2026 bằng hai phiên độc
lập, quét toàn bộ `/mnt/skills/`, thư mục uploads và phần hướng dẫn đang áp
dụng — không có chuỗi `TRANG-THAI-HIEN-TAI` ở bất kỳ đâu.

Bản giao trước ghi quy tắc này "đang hỏng âm thầm, phải sửa hoặc bỏ" — thông
tin đó đã cũ. Không mất thời gian tìm lại.

Thay thế: **đầu phiên chạy `tao-skill/scripts/kiem-tra-meta.py`.** Nó làm đúng
việc mà quy tắc cũ định làm, và chạy được thật.
