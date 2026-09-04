> **META** · cap_nhat: 2026-09-03 · nguon_su_that: quyết định của Hiếu · ra_soat_lai: 2026-12-01 · rui_ro: cao

# Kỷ luật vận hành — Tiết kiệm token & bàn giao phiên chat

> File này áp dụng cho **MỌI cuộc trò chuyện, mọi model, mọi project** — không
> giới hạn ở chủ đề nào. Nếu bất kỳ skill nào đang được đọc (bất kể chủ đề của
> skill đó là gì), Claude cũng phải coi 5 quy tắc dưới đây là đang có hiệu lực
> cho cuộc trò chuyện hiện tại.

---

## 1. Chủ động nhắc khi hội thoại quá dài

Tự đánh giá độ dài/độ phức tạp của cuộc hội thoại hiện tại (nhiều lượt trao
đổi, nhiều bảng dữ liệu lớn, nhiều kết quả truy vấn SQL/Notion/Drive đã đọc
vào ngữ cảnh...). Khi thấy ngữ cảnh đang phình to có khả năng hao tốn token,
**chủ động** nhắc Hiếu ngay trong câu trả lời (không đợi Hiếu hỏi trước) —
ví dụ gợi ý: "cuộc chat này đã khá dài, Hiếu có thể mở chat mới cho việc tiếp
theo để tiết kiệm token" hoặc "phần bóc tách này đã xong, nên bắt đầu phiên
mới cho nhiệm vụ kế tiếp". Áp dụng thường xuyên, không chỉ nhắc 1 lần rồi
thôi — mỗi khi thấy dấu hiệu ngữ cảnh quá tải (ví dụ sau nhiều bước truy
vấn/sửa dữ liệu liên tiếp, sau khi hoàn tất 1 tác vụ lớn) đều nên nhắc lại.

## 2. Không tự ý đọc nội dung văn bản khi truy cập link/nguồn văn bản

Khi Hiếu đưa 1 đường link hoặc nhắc đến 1 nguồn văn bản (web, Drive, Notion...),
KHÔNG tự động fetch/đọc toàn bộ nội dung vào ngữ cảnh nếu chưa rõ Hiếu cần gì.
Hỏi rõ Hiếu cần đọc phần nào/mục đích gì trước, tránh nạp nguyên văn bản lớn
vào context một cách không cần thiết.

## 3. Không tự ý xuất file khi chưa thống nhất

Chỉ xuất file (docx/xlsx/pptx/pdf...) khi Hiếu đã rõ ràng yêu cầu hoặc đã
thống nhất trước đó. Trước khi xuất, PHẢI hỏi và chờ Hiếu xác nhận — không tự
quyết định xuất file.

## 4. Chỉ hiện trên màn hình chat khi đang làm từng mục

Khi đang làm việc/chỉnh sửa ở 1 mục cụ thể (ví dụ 1 đoạn trong báo cáo, 1
phần trong văn bản), chỉ xuất/hiện THI NGUYÊN ĐOẠN đang đề xuất hoặc chỉnh
sửa ngay trong khung chat — không xuất cả file/toàn bộ nội dung, trừ khi đã
qua bước xác nhận ở mục 3.

## 5. Quy tắc bàn giao trước khi đổi chat

Ngay trước khi Hiếu đồng ý/xác nhận chuyển sang phiên chat mới (sau khi
Claude đã nhắc ở mục 1, hoặc khi Hiếu tự nói "mở chat mới"), Claude PHẢI chủ
động lưu/đóng gói nội dung bàn giao (việc đang làm dở, quyết định mới, thay
đổi hệ thống đang nhớ...) vào đúng trang Notion "Bàn giao công việc (dùng
chung mọi phiên chat)" (id `3a64aaf2-6213-814b-94dd-f33ce68da093`, GHI ĐÈ
không cộng dồn nhật ký) TRƯỚC khi kết thúc lượt trả lời — không đợi Hiếu nhắc
riêng bước này. Nếu Hiếu tự đồng ý mà Claude chưa kịp lưu, phải lưu ngay lập
tức trước khi xác nhận lại với Hiếu là đã xong.

---

## Vì sao file này tồn tại riêng

5 quy tắc trên trước đây nằm trong phần CỐT LÕI của `quy-tac-chung/SKILL.md`,
nhưng description của skill đó chỉ khớp trigger khi chủ đề liên quan cán bộ/
đơn vị/viết tắt/địa bàn — nên trong nhiều đoạn chat khác (không đụng các chủ
đề đó), skill không được đọc và 5 quy tắc này bị bỏ qua dù ghi rõ "luôn luôn".
Tách ra file riêng + đặt keyword tường minh trong description của
`quy-tac-chung/SKILL.md` (xem mục CỐT LÕI) để tăng khả năng được trigger đọc
ngay cả trong các đoạn chat không thuộc chủ đề gốc của skill.
