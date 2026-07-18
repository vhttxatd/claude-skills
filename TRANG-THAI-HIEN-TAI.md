# Trạng thái hiện tại — Bộ nhớ chuyển giao công việc

> **Chủ sở hữu:** Phan Trung Hiếu — Chuyên viên KHCN-CĐS, UBND xã An Thới Đông
> **Cập nhật lần cuối:** 19/07/2026
> **Mục đích:** File này là NGUỒN SỰ THẬT DUY NHẤT về trạng thái công việc hiện tại — ghi đè mỗi khi có cập nhật đáng kể. Lịch sử thay đổi xem qua `git log TRANG-THAI-HIEN-TAI.md`, không cần giữ nhiều bản snapshot.
>
> **Quy ước đồng bộ (áp dụng cho mọi AI, mọi máy):**
> - **Đầu phiên làm việc** liên quan đến xử lý văn bản đến / theo dõi công việc / NEXUS Gov: đọc file này trước (qua raw URL hoặc git pull) để nắm trạng thái mới nhất, tránh làm trùng/sai lệch giữa các máy (Hiếu dùng 3 máy: PC cơ quan, PC nhà, laptop).
> - **Cuối phiên** khi có cập nhật đáng kể (văn bản mới xử lý xong, việc mới hoàn thành, quy tắc mới chốt): cập nhật lại file này và push lên repo `vhttxatd/claude-skills`. Đây là cơ chế đồng bộ thay thế cho scheduled task cục bộ (vốn KHÔNG đồng bộ được giữa các máy).

---

## 0. NGUYÊN TẮC VẬN HÀNH AI — ÁP DỤNG MỌI MODEL, MỌI PHIÊN

- **Luôn áp dụng kỷ luật `fable-mode`** (xác định phạm vi → bằng chứng trước suy luận → tự phản biện → kiểm chứng trước khi nói → báo cáo 3 lớp Fact/Assumption/Risk) cho MỌI tác vụ phân tích, soạn thảo, số liệu, quyết định — bất kể đang chạy trên model nào (Haiku, Sonnet, Opus, hay AI khác ngoài Claude). Không được xem đây là tùy chọn chỉ dùng khi người dùng gõ "fable mode" — đây là mặc định, đặc biệt bắt buộc với việc rủi ro cao: số liệu gửi lãnh đạo, căn cứ pháp lý, chi tiêu, ghi dữ liệu vào Notion/Supabase/TodoList.
- **Không bao giờ ghi dữ liệu** (Notion / TodoListATĐ / Supabase NEXUS Gov) khi chưa đề xuất đầy đủ nội dung từng trường và chờ Hiếu xác nhận rõ ràng. Đồng ý "làm việc X" KHÔNG có nghĩa là đã xác nhận nội dung cụ thể.
- Khi đề xuất nhiều mục đánh số (1, 2, 3...) trong 1 tin nhắn: mục nào Hiếu KHÔNG nhắc đến trong phản hồi = KHÔNG thực hiện; mục nào được nhắc (kể cả "ok" ngắn gọn) = thực hiện đúng như đề xuất ban đầu.
- Luôn kiểm tra trùng lặp trong Notion/Supabase trước khi đề xuất tạo bản ghi mới (Hiếu dùng 3 máy độc lập, dễ tạo trùng).
- Không thiết kế/suy luận từ trí nhớ hội thoại khi có công cụ để kiểm tra trực tiếp (đọc file thật, truy vấn SQL thật, tra Notion thật).

## 1. Kiến trúc hệ thống hiện tại

- **Notion** — database `Tbl_QLVB_ATĐ`: sổ văn bản đến chính thức, có cột Link (Google Drive). `TodoListATĐ`: việc cần theo dõi, phân loại có/không tính KPI.
- **NEXUS Gov (Supabase)** — project_id `zkgtrdrvlppyxusgzjnz`, 39 bảng. **Đã chuyển hẳn từ Airtable sang Supabase (xác nhận 19/07/2026).** Chi tiết đầy đủ, danh sách bảng đã/chưa xác minh: xem [`nexus-gov-rules/MIGRATION-NOTICE.md`](./nexus-gov-rules/MIGRATION-NOTICE.md).
- **Google Drive** — tìm file theo số hiệu (chỉ phần số, không gồm dấu "/").
- **Skill `xu-ly-van-ban-den`** — quy trình xử lý văn bản đến hàng ngày, hiện **cài trong Cowork nhưng CHƯA có trong repo này** (khoảng trống cần vá — xem mục 6).

## 2. Việc đã hoàn thành gần nhất (phiên 17–19/07/2026)

| Văn bản/việc | Trạng thái | Ghi chú |
|---|---|---|
| CV 5722/CQTT — chế độ báo cáo NQ57 (Công an TP) | Hoàn tất | Lưu Notion + link Drive; tạo việc báo cáo tháng/quý/6th/9th/năm trong TodoListATĐ (KPI trừ báo cáo tháng); scheduled task `nq57-bao-cao-dinh-ky` (08:00 ngày 25 hàng tháng — **chỉ chạy trên máy tạo ra nó**, xem mục 5). |
| KH 3068/KH-UBND — dự toán KHCN/ĐMST/CĐS năm 2027 | Hoàn tất | Lưu Notion + Supabase (`van_ban`); `ket_qua` gắn nhiệm vụ `theo_doi_cd` mã `TDCD-1784272609873` "Công tác lập dự toán ngân sách KHCN, ĐMST và CĐS" (nhiệm vụ mới, lặp lại hàng năm); minh chứng = chính `van_ban` 3068/KH-UBND. **Đã xác minh lại bằng SQL ngày 19/7: đúng, không nhầm lẫn.** |
| KH 19/KH-TTCĐS — đào tạo QLVB dùng chung lần 2 | Hoàn tất | Lưu Supabase (`van_ban`); `ket_qua` gắn nhiệm vụ `TDCD-1784275213315` "Đào tạo, nâng cao chất lượng đội ngũ CBCCVC"; `ghi_chú` số liệu 17 người đã ghi chi tiết theo đơn vị (VPUBND 3, PKT 2, PVHXH 2, TTPVHCC 2, TTCUDVC 2, TYT 2, QS 2, CA 2); minh chứng ngoài trỏ đúng về 19/KH-TTCĐS. **Đã xác minh lại bằng SQL ngày 19/7: đúng, không nhầm lẫn.** Không lưu TodoListATĐ theo yêu cầu Hiếu. |

Sửa lỗi hệ thống: view Notion "Đánh giá quý" (id `29b4aaf2-6213-807f-9614-000c607526e7`) bị lọc theo khoảng ngày cứng của quý cũ nên ẩn việc mới gắn KPI quý 3 — đã sửa filter. Đã thêm option "Hoạt động BCĐ" vào thuộc tính "Tiểu mục" của Notion.

## 3. Danh sách công việc Quý III/2026 của Hiếu (từ file "BẢNG THEO DÕI TIẾN ĐỘ CÔNG VIỆC QUÝ III.2026.docx")

Đã lọc các dòng có "Người thực hiện" chứa "Hiếu". Kết quả tra cứu văn bản nguồn trong Notion/Drive (**thực hiện phiên trước, CHƯA re-verify trong phiên 19/7 — coi là ASSUMPTION, kiểm lại trước khi dùng**):

- **Sẵn sàng xử lý ngay** (đã có văn bản khớp trong kho): STT9; CV 2782/SKHCN-KHTC (rà soát dự toán phường xã).
- **Cần Hiếu xác minh thêm:** STT7 (Tổ Công tác — chưa rõ văn bản khớp).
- **Có vẻ đã soạn nhưng chưa log vào Notion:** STT11 (báo cáo 6 tháng NQ57).
- **Chưa tìm thấy văn bản nguồn trong Notion/Drive, cần Hiếu cung cấp:** STT10, STT15, STT16, STT23, và dự toán ISO 9001 năm 2027.

## 4. Skill `xu-ly-van-ban-den` — quy tắc bắt buộc (tóm tắt)

Bước 1.5: luôn kiểm tra trùng lặp trước khi đề xuất văn bản mới. Quy trình Supabase khi lưu văn bản: (a) đề xuất + xác nhận insert `van_ban`; (b) sau khi lưu, LUÔN hỏi có cập nhật `ket_qua`/`so_lieu` không — không tự suy đoán; (c) nếu có, tìm cả `theo_doi_cd` (nhiệm vụ cha) lẫn `cong_viec_con` (việc con) để chọn đúng nơi gắn; (d) minh chứng: tự động tìm trong `van_ban` trước theo số ký hiệu, nếu không có mới tìm Notion `Tbl_QLVB_ATĐ` (cột Link) và dùng `ket_qua_minh_chung_ngoai`; (e) cột `ghi_chu` trong `cap_nhat_so_lieu` phải luôn đầy đủ, tự giải thích (dùng làm input soạn báo cáo AI). Thời hạn báo cáo định kỳ = trước ngày 10 của tháng cuối kỳ báo cáo.

Bản `.skill` mới nhất đã đưa cho Hiếu qua Cowork (cần cài lại thủ công qua Settings > Capabilities) nhưng **chưa được commit vào repo này** — xem mục 6.

## 5. Lưu ý khi chuyển máy (PC cơ quan / PC nhà / laptop)

- **Scheduled task chạy CỤC BỘ, không đồng bộ giữa máy.** `nq57-bao-cao-dinh-ky` chỉ chạy khi app Claude/Cowork đang mở đúng trên máy đã tạo ra nó. Nếu chuyển hẳn sang máy khác làm việc chính, cần tạo lại task đó trên máy mới.
- **Skill cài trong Cowork cũng cục bộ theo máy** (Settings > Capabilities) — không tự đồng bộ qua GitHub. Sau khi sửa `xu-ly-van-ban-den` hoặc `nexus-gov-rules`, phải cài/re-đọc lại thủ công trên từng máy, hoặc trỏ AI đọc trực tiếp qua raw URL của repo này.
- **File này (`TRANG-THAI-HIEN-TAI.md`) và toàn bộ `nexus-gov-rules/`, `quy-tac-chung/`... đồng bộ qua GitHub** — đây là nguồn chung, đáng tin cậy nhất giữa 3 máy.
- Notion, Supabase, Google Drive là dịch vụ đám mây — tự đồng bộ sẵn, không cần thao tác gì thêm.

## 6. Việc còn thiếu / cần làm tiếp

- [ ] Re-verify lại danh sách văn bản nguồn ở mục 3 (đã hơi cũ, lập từ phiên trước).
- [ ] Xử lý STT9 và CV 2782/SKHCN-KHTC (đã có văn bản khớp).
- [ ] Xác minh nội dung/kỳ hạn STT7 trước khi xử lý.
- [ ] Kiểm tra và log báo cáo 6 tháng NQ57 (STT11) vào Notion nếu đã hoàn chỉnh.
- [ ] Xin Hiếu văn bản nguồn cho STT10, STT15, STT16, STT23, ISO 9001 2027.
- [ ] Viết lại đầy đủ `nexus-gov-rules/03_SCHEMA_REFERENCE.md` theo schema Supabase thật (39 bảng) — hiện chỉ mới có banner cảnh báo, chưa viết lại toàn bộ. Việc lớn, cần một phiên riêng có thời gian đối chiếu từng bảng.
- [ ] Commit skill `xu-ly-van-ban-den` vào repo này (hiện chỉ tồn tại dưới dạng file `.skill` đã gửi cho Hiếu qua Cowork, chưa có bản `SKILL.md` nguồn trong GitHub) — nên bổ sung để không bị mất nếu Hiếu đổi máy/cài lại Cowork.

## 7. Đã xác minh — Đang giả định — Rủi ro còn lại (19/07/2026)

**Đã xác minh trực tiếp:**
- Gắn kết `ket_qua` ↔ `theo_doi_cd` ↔ minh chứng cho cả 3068/KH-UBND và 19/KH-TTCĐS là chính xác (truy vấn SQL trực tiếp Supabase, không suy từ trí nhớ).
- Danh sách đầy đủ 39 bảng Supabase hiện tại (`list_tables`), và cột của 8 bảng đã thao tác thực tế trong phiên xử lý văn bản đến.
- Repo `vhttxatd/claude-skills` đọc/ghi được qua git (không cần Airtable/GitHub MCP, dùng PAT + git CLI).

**Đang giả định (chưa kiểm lại):**
- Danh sách văn bản nguồn cho từng STT ở mục 3 — lập từ phiên trước, chưa chạy lại truy vấn.
- 30/39 bảng Supabase còn lại chưa được đối chiếu cột — không suy đoán cấu trúc từ tên bảng.

**Rủi ro còn lại:**
- Nếu mở phiên trên máy chưa cài skill `xu-ly-van-ban-den` mới nhất, AI có thể quay lại hành vi cũ (ghi dữ liệu không xác nhận) — cần nhắc lại mục 0 và mục 4 ngay đầu phiên.
- `nexus-gov-rules/01_` và `02_WORKFLOW...v2.1` vẫn mô tả cơ chế Airtable (linked record array) ở phần thân — đã gắn banner cảnh báo đầu file nhưng CHƯA viết lại toàn bộ nội dung; nếu áp dụng máy móc phần thân có thể dùng sai cơ chế kỹ thuật (dù nguyên tắc nghiệp vụ vẫn đúng).
