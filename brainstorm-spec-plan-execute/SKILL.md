---
name: brainstorm-spec-plan-execute
description: Quy trình 4 giai đoạn (Brainstorm → Design Spec → Implementation Plan → Execute) kết hợp kỷ luật Fable Mode để giao tính năng lập trình cho Claude một cách an toàn — tách "quyết định làm gì" khỏi "viết code thế nào", có điểm chốt duyệt trước khi code, chia nhỏ thành Task tự đứng được, và để lại vết bằng văn bản (spec/plan/progress log) để phiên sau đọc lại là bắt kịp ngay. LUÔN dùng skill này khi Hiếu giao một tính năng/thay đổi lập trình có từ 2 bước xử lý trở lên (thêm tính năng mới, đổi cấu trúc dữ liệu, refactor nhiều file...), kể cả khi không gọi thẳng tên "brainstorm/spec/plan". Việc nhỏ (sửa 1 dòng, 1 lỗi rõ ràng, 1 file) thì BỎ QUA skill này và làm thẳng.
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu · ra_soat_lai: 2027-09-01 · rui_ro: thap

# Brainstorm → Spec → Plan → Execute + Fable Mode

Quy trình dùng khi giao một tính năng lập trình có độ phức tạp thật sự
(≥ 2 bước xử lý). Mục tiêu: sai lầm về **phạm vi** (làm nhầm cái không
cần, quên cái cần) bị bắt ở bước mô tả bằng văn bản — rẻ để sửa — thay
vì bị bắt sau khi đã có hàng trăm dòng code.

**Việc nhỏ (sửa 1 dòng, lỗi rõ ràng, 1 file) → bỏ qua toàn bộ quy trình
này, làm thẳng.** Chỉ cần giữ 2 câu tự kiểm số 1 và số 3 ở phần Fable
Mode bên dưới.

## Tổng quan 4 giai đoạn

```
Brainstorm  →  Design Spec  →  Implementation Plan  →  Execute
(hỏi/chốt)     (đóng băng,      (chia Task tuần tự)     (vòng lặp
                chờ duyệt)                                từng Task)
```

Fable Mode không phải giai đoạn thứ 5 — là kỷ luật chạy xuyên suốt cả 4
giai đoạn trên (xem mục cuối).

---

## Giai đoạn 1 — Brainstorm

Mục tiêu: đi từ yêu cầu còn mơ hồ đến ý tưởng đủ rõ để viết Spec —
**trước khi gõ bất kỳ dòng code nào**.

1. **Hỏi trước khi đoán.** Nếu yêu cầu thiếu ràng buộc quan trọng (dữ
   liệu lấy từ đâu, có lặp lại theo kỳ không, ai được thao tác), hỏi
   thẳng thay vì tự suy đoán rồi code sai.
2. **Có yếu tố giao diện/bố cục** → dựng vài phương án dưới dạng HTML
   tĩnh (mockup, chưa nối backend) để so sánh trực quan thay vì mô tả
   bằng lời.
3. **Ghi lại các mốc quyết định** ngay trong lúc trao đổi (tên trường,
   tách bảng hay dùng chung enum có sẵn, tái dùng component nào) — đây
   là nguyên liệu viết Spec.
4. **Chốt ranh giới phạm vi**: "trong phạm vi v1" vs "ngoài phạm vi, ghi
   nhận lại" — để không phình yêu cầu giữa chừng, không mất ý tưởng tốt.

(Fable Mode ở bước này: trả lời được 4 câu ở mục cuối trước khi đề xuất
cách làm; mở file/dữ liệu thật ra xem, không thiết kế từ trí nhớ.)

## Giai đoạn 2 — Design Spec

Đóng băng kết quả brainstorm thành 1 file duy nhất tại
`docs/specs/YYYY-MM-DD-ten-tinh-nang-design.md`, dùng
`references/spec_template.md` làm khung. **Không viết code ở giai đoạn
này** — chỉ mô tả sẽ làm gì và vì sao.

Trước khi gửi Spec đi duyệt, tự phản biện (Fable Mode): điều gì khiến
cách làm này sai? khái niệm nào dễ nhầm? có cách hiểu khác hợp lý hơn
không? — đưa thẳng kết quả vào mục "Câu hỏi mở / rủi ro" của Spec, không
giấu đi.

Gửi file cho người yêu cầu đọc. **Chỉ khi được xác nhận rõ ràng** mới
đổi `Trạng thái` thành "đã duyệt, chờ viết plan" và đi tiếp — không tự ý
coi im lặng là đồng ý.

## Giai đoạn 3 — Implementation Plan

Từ Spec đã duyệt, tách việc thành các **Task tuần tự**, đặt tại
`docs/plans/YYYY-MM-DD-ten-tinh-nang.md`, dùng
`references/plan_template.md` làm khung. Đây là lúc duy nhất "cách làm"
được quyết định — Spec nói *làm gì*, Plan nói *làm theo thứ tự nào*.

Nguyên tắc chia Task:
- Mỗi Task để lại hệ thống ở trạng thái **chạy được** — không dừng giữa
  chừng làm ứng dụng gãy.
- Thứ tự thường đi từ hạ tầng dữ liệu → hàm/API xử lý → giao diện → tài
  liệu và version.
- Mỗi Task phải ghi rõ **cách xác minh xong** ngay khi viết Plan (Fable
  Mode: bằng chứng trước suy luận) — nếu chưa nghĩ ra cách kiểm nghĩa là
  Task đó chưa đủ rõ để giao, phải tách nhỏ/làm rõ thêm.

## Giai đoạn 4 — Execute (vòng lặp theo từng Task)

Với mỗi Task trong Plan, lặp đúng trình tự, không gộp tắt:

1. Đọc kỹ nội dung Task hiện tại trong Plan.
2. Code đúng và **chỉ đúng** phạm vi Task này — không tranh thủ làm luôn
   Task kế tiếp.
3. Tự soát lại thay đổi bằng **hành động kiểm chứng thật** (mở trang
   xem, chạy lại build/test, đối chiếu số liệu bằng đường tính khác) —
   không chỉ tự nhận "đã kiểm tra kỹ" mà không nói kiểm bằng cách nào.
   Tốt nhất nhờ một phiên/model độc lập đóng vai người review.
4. Nếu sạch: tạo **1 commit riêng cho Task này**, ghi 1 dòng vào
   `docs/sdd/progress.md` (dùng `references/progress_template.md` làm
   khung). Không gộp nhiều Task vào 1 commit.
5. Nếu Task phức tạp: viết thêm bản tóm tắt ngắn quyết định/đánh đổi
   riêng của Task đó.
6. Sang Task kế tiếp — lặp lại từ bước 1.

Sau Task cuối cùng: cập nhật nhật ký phiên làm việc, bump version — và
**chỉ khi người yêu cầu đồng ý** mới commit/push lên kho chung.

---

## Fable Mode — kỷ luật chạy xuyên suốt cả 4 giai đoạn

| Giai đoạn | Tác vụ Fable | Hành động cụ thể |
|---|---|---|
| 1 · Brainstorm | Xác định phạm vi + Bằng chứng trước suy luận | Trả lời 4 câu trước khi đề xuất cách làm: xong là gì? cái gì bắt buộc đúng? kiểm bằng cách nào? giả định nào sai sẽ hỏng cả hướng đi? Mở file/dữ liệu thật để xem, không thiết kế từ trí nhớ. |
| 2 · Design Spec | Tự phản biện trước khi tin | Trước khi gửi Spec đi duyệt, tự đóng vai người khó tính: điều gì khiến cách làm này sai? khái niệm nào dễ nhầm? cách hiểu khác nào hợp lý hơn? → đưa vào "Câu hỏi mở / rủi ro", không giấu. |
| 3 · Plan | Bằng chứng trước suy luận | Mỗi Task ghi rõ "cách xác minh xong" ngay khi viết — không để trống. |
| 4 · Execute | Kiểm chứng trước khi nói + Báo cáo có căn cứ | Trước khi ghi 1 Task là "xong", phải có hành động kiểm chứng thật, không chỉ tự nhận đã kiểm tra kỹ. |

**5 câu tự kiểm — chạy trước khi đóng mỗi Task / mỗi giai đoạn:**

1. Đang trả lời đúng yêu cầu thật, hay chỉ đúng câu chữ?
2. Nếu kết luận/Task này sai, nó sai ở mắt xích nào trước tiên — đã kiểm
   mắt xích đó chưa?
3. Trong kết quả, cái nào là đã-xác-minh, cái nào là giả định chưa nói
   ra?
4. Một người giỏi và khó tính sẽ tấn công kết luận này vào đâu — có đỡ
   được không?
5. Người đọc nắm được kết luận trong 5 giây đầu, và biết rủi ro trước
   khi hành động không?

**Linh hoạt theo rủi ro**: việc nhỏ chỉ cần câu 1 và câu 3. Việc rủi ro
cao (số liệu quan trọng, căn cứ pháp lý, đổi cấu trúc dữ liệu đang chạy
thật) bắt buộc chạy đủ cả 4 hàng của bảng trên và cả 5 câu tự kiểm; báo
cáo bàn giao phải tách rõ 3 lớp: **đã xác minh** — **đang giả định** —
**rủi ro còn lại**.

---

## Thiết lập thư mục khi bắt đầu dùng skill trong 1 dự án

Nếu dự án chưa có, tạo:
- `docs/specs/` — chứa các Design Spec
- `docs/plans/` — chứa các Implementation Plan
- `docs/sdd/progress.md` — sổ tiến độ chung (hoặc 1 file progress riêng
  theo từng tính năng nếu dự án lớn)

## Vì sao giữ nguyên quy trình này

- **Rẻ khi sửa sai**: hiểu sai yêu cầu bị bắt ở bước Spec (sửa vài dòng
  mô tả) thay vì sau khi đã có hàng trăm dòng code.
- **Có nguồn sự thật bằng văn bản**: Spec + Plan đọc lại được ở mọi
  phiên/máy/tài khoản, không phụ thuộc trí nhớ 1 phiên chat.
- **Review từng mảnh nhỏ dễ bắt lỗi hơn** so với soát 1 khối diff lớn
  dồn ở cuối.
- **Không mất dấu khi bị gián đoạn**: sổ tiến độ cho biết chính xác
  đang dừng ở Task nào để tiếp tục.
