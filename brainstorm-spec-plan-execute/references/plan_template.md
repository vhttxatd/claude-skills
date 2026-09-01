# <Tên tính năng> — Implementation Plan

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quy ước nội bộ do Hiếu chốt · ra_soat_lai: 2027-09-01 · rui_ro: thap (bổ sung META 01/9/2026, nội dung CHƯA rà)

Spec: docs/specs/YYYY-MM-DD-ten-tinh-nang-design.md

## Task 1: <việc nhỏ, tự đứng được>
- File sẽ sửa / tạo mới
- Việc cụ thể cần làm
- Cách xác minh xong (build sạch, test, kiểm tra quyền truy cập...)
  — KHÔNG được để trống mục này; nếu chưa nghĩ ra cách kiểm tức là Task
  chưa đủ rõ để giao.

## Task 2: <việc kế tiếp>
- ...

## Task N: cập nhật tài liệu + version
- Cập nhật nhật ký phiên làm việc
- Bump số phiên bản ứng dụng

---
Nguyên tắc chia Task:
- Mỗi Task phải để lại hệ thống ở trạng thái CHẠY ĐƯỢC — không dừng giữa
  chừng làm ứng dụng gãy.
- Thứ tự thường đi từ hạ tầng dữ liệu → hàm/API xử lý → giao diện → tài
  liệu và version.
- Đánh số tuần tự rõ ràng, vì bước Execute sẽ bám sát đúng thứ tự này.
