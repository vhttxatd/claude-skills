# Kho tri thức & Skill — Phan Trung Hiếu (KHCN-CĐS xã An Thới Đông)

Repo này lưu trữ toàn bộ tri thức nền và skill làm việc của tôi với AI assistants (Claude, ChatGPT, Gemini).

## Mục đích

- **Backup**: Lưu giữ vĩnh viễn các quy trình, mẫu văn bản, dữ liệu nền.
- **Versioning**: Theo dõi lịch sử thay đổi của từng skill.
- **Đa nền tảng**: Dùng được với Claude (qua skill system), ChatGPT, Gemini (qua paste URL raw).

## Cấu trúc

Mỗi thư mục là một skill độc lập, gồm:
- `SKILL.md` — Hướng dẫn chính, mô tả khi nào dùng và cách dùng.
- `data/`, `references/`, `bieu-mau/`, `mau/`, `templates/`, `quy-trinh/` — Tài nguyên hỗ trợ.

## Danh sách skill

Xem [INDEX.md](./INDEX.md) để có mô tả chi tiết từng skill.

| Skill | Mô tả ngắn |
|---|---|
| `quy-tac-chung` | Dữ liệu nền: cán bộ, đơn vị, viết tắt, căn cứ pháp lý |
| `tri-thuc-dia-phuong` | Tri thức về xã An Thới Đông theo lĩnh vực |
| `the-thuc-van-ban` | Thể thức và code docx-js cho văn bản hành chính |
| `bao-cao-hanh-chinh` | Soạn báo cáo định kỳ, đột xuất, KHCN-CĐS, DTI |
| `cdso-kehoach` | Soạn kế hoạch chuyển đổi số cấp xã |
| `quan-ly-du-an` | Quy trình mua sắm chi thường xuyên |
| `nhan-su-danh-gia` | Hồ sơ và đánh giá quý cán bộ |
| `cong-viec-giao-ban` | Danh sách công việc giao ban hàng tuần |
| `workboard` | Bảng theo dõi tiến độ công việc |
| `tao-skill` | Hướng dẫn tạo skill mới |

## Cách sử dụng với AI khác (ChatGPT/Gemini)

1. Mở skill cần dùng trên GitHub.
2. Bấm nút **Raw** ở góc trên phải file `SKILL.md`.
3. Copy URL (dạng `https://raw.githubusercontent.com/...`).
4. Paste vào prompt với cú pháp:
   > "Đọc nội dung từ URL này và áp dụng làm hướng dẫn cho yêu cầu sau: [URL]. Yêu cầu của tôi: ..."

## Ghi chú

- Output mặc định: file `.docx` qua Node.js docx lib, font Times New Roman.
- Giao tiếp bằng tiếng Việt.
- Chỉ xuất file khi được yêu cầu rõ ràng.

---

Cập nhật lần cuối: 18/05/2026
