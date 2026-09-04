---
name: xu-ly-van-ban-den
description: >
  Xử lý văn bản đến hàng ngày cho Hiếu (KHCN-CĐS, UBND xã An Thới Đông): từ nội dung
  Hiếu dán vào chat (trích yếu, số ký hiệu, đơn vị ban hành, ngày đến từ hệ thống
  QLVBĐH TP.HCM) → đề xuất tên lưu trữ file → đề xuất đầy đủ thông tin lưu vào Notion
  "Tbl_QLVB_ATĐ" → sau khi Hiếu xác nhận thì lưu → tự tìm file trên Google Drive và
  gắn link → hỏi có tạo việc theo dõi trong "TodoListATĐ" và có lưu song song vào
  Nexus không. Kích hoạt khi Hiếu dán thông tin văn bản (Trích yếu/Số ký hiệu/Đơn vị
  ban hành/Ngày đến), hoặc gõ "gắn link", "lưu đi", "tạo việc".
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quy trình nghiệp vụ của Hiếu · ra_soat_lai: 2026-12-01 · rui_ro: cao

> **Nhắc kỷ luật vận hành:** Nếu phiên chat này CHƯA đọc `quy-tac-chung/data/ky-luat-van-hanh.md` (5 quy tắc tiết kiệm token & bàn giao), đọc trước khi tiếp tục — quy tắc đó áp dụng bất kể skill nào đang chạy.

# Xử lý văn bản đến — QLVB_ATĐ

Tuân theo 4 nguyên tắc vận hành trong tao-skill (nghĩ trước khi làm, đơn giản là ưu
tiên, sửa như phẫu thuật, thực thi theo mục tiêu). Đặc biệt quan trọng với skill này:
**KHÔNG tự ý bỏ qua thông tin còn thiếu (Ngày ban hành, Parent item...) — luôn hỏi
rõ trước khi lưu.**

**QUY TẮC TUYỆT ĐỐI — áp dụng cho MỌI nơi ghi dữ liệu (Notion Tbl_QLVB_ATĐ,
TodoListATĐ, VÀ Nexus/Supabase — không riêng gì Notion):** trước khi gọi bất kỳ
lệnh ghi/tạo/sửa dữ liệu nào (notion-create-pages, notion-update-page,
execute_sql insert/update, apply_migration...), LUÔN đề xuất đầy đủ nội dung
dự kiến ghi (từng trường/giá trị cụ thể) cho Hiếu xem trước, chờ Hiếu xác nhận
hoặc sửa đổi. CHỈ thực thi khi Hiếu xác nhận rõ ràng (VD: "lưu đi", "ok", "xác
nhận", "đúng rồi"). Việc Hiếu đồng ý "có làm việc X" (VD "có lưu Nexus") KHÔNG
đồng nghĩa với việc đã xác nhận NỘI DUNG cụ thể — vẫn phải đề xuất nội dung chi
tiết trước khi ghi, trừ khi Hiếu đã tự cung cấp đủ nội dung cụ thể trong câu trả
lời đó.

**QUY TẮC PHẢN HỒI KHI ĐỀ XUẤT NHIỀU MỤC ĐÁNH SỐ (1, 2, 3...):** khi Claude đề
xuất gộp nhiều việc thành các mục đánh số, Hiếu có thể trả lời ngắn gọn theo số
(VD "1 không lưu; 2 - thêm vào nhiệm vụ TDCD-xxx; 3 ok; 4 bỏ"). Quy tắc suy luận:
- Mục nào Hiếu **không nhắc đến** trong câu trả lời → mặc định KHÔNG thực hiện
  (không tự suy đoán là đồng ý).
- Mục nào Hiếu **có nhắc đến** (kể cả chỉ "ok", "được") → hiểu là đồng ý thực hiện
  ĐÚNG theo nội dung cụ thể đã đề xuất cho mục đó, không cần Hiếu gõ lại toàn bộ.
- Nếu Hiếu sửa 1 phần của mục (VD đổi nhiệm vụ đích), chỉ áp dụng đúng phần sửa
  đó, các phần còn lại của đề xuất gốc cho mục đó vẫn giữ nguyên.

---

## BỐI CẢNH

- Hiếu nhận văn bản đến qua hệ thống QLVBĐH TP.HCM (qlvb.tphcm.gov.vn). Trang này bị
  chính sách mạng cơ quan chặn, Claude không tự động lướt được — Hiếu tự mở, copy nội
  dung (Trích yếu, Số ký hiệu, Đơn vị ban hành, Ngày đến, Sổ văn bản) dán vào chat.
- Hiếu **không tải file lên chat** (tốn token) — chỉ tải file gốc về máy khi cần,
  lưu vào thư mục cục bộ tự đồng bộ Google Drive (ví dụ: `D:\Online Backup\VHXHATD\
  Văn bản tham mưu\Văn bản chỉ đạo tạm` cho văn bản tạm/góp ý). Claude tìm file trên
  Drive bằng tên/số hiệu, không cần Hiếu upload.
- Notion workspace "CĐS ATĐ": database chính `Tbl_QLVB_ATĐ` (collection
  `2134aaf2-6213-81cd-ba93-000bbb6fe99e`) lưu văn bản; database `TodoListATĐ`
  (collection `2134aaf2-6213-8102-8c1e-000bfd9d91dd`) lưu việc cần theo dõi/KPI quý
  — **thay thế hoàn toàn WorkBoard cũ** (file cục bộ), vì TodoListATĐ đồng bộ online,
  truy cập được từ mọi máy/điện thoại.
  - **QUAN TRỌNG — phân biệt kho khi ghi/tra cứu Notion:** `Tbl_QLVB_ATĐ` (QLVB_ATĐ)
    là **kho lưu chính, chính thức** — MỌI thao tác lưu văn bản đến, gắn link Drive,
    kiểm tra trùng lặp (Bước 1.5) đều phải nhắm vào kho này. Ngược lại, database/kho
    **"Văn bản CPĐT"** (nếu xuất hiện trong kết quả `notion-search`) là **kho tra cứu
    cũ, đã lỗi thời** — KHÔNG dùng làm căn cứ, KHÔNG ghi dữ liệu mới vào đó, KHÔNG
    dùng để kiểm tra trùng lặp. Nếu `notion-search` trả về kết quả từ cả hai kho,
    luôn ưu tiên và chỉ tin `Tbl_QLVB_ATĐ`; nếu nghi ngờ nhầm kho, báo Hiếu xác nhận
    trước khi ghi.
- Nexus: app riêng của Hiếu, Supabase project `nexus-gov-atd` (project_id
  `zkgtrdrvlppyxusgzjnz`). Claude **không tự tạo/ghi dữ liệu vào Nexus** — chỉ làm
  sau khi Hiếu xác nhận đồng ý và cung cấp thông tin cụ thể.

---

## QUY TRÌNH XỬ LÝ MỘT VĂN BẢN

### Bước 1 — Nhận nội dung

Hiếu dán: Trích yếu, Số ký hiệu, Đơn vị ban hành, Ngày đến (và đôi khi Sổ văn bản).
Đôi khi Hiếu dán thêm ảnh chụp/đoạn trích nội dung chi tiết (đối tượng, thời gian,
địa điểm...) hoặc phân công xử lý ("trưởng phòng phân công Hiếu dự") — ghi nhận đưa
vào Ghi chú.

### Bước 1.5 — Luôn kiểm tra trùng lặp trước khi đề xuất

Trước khi đề xuất tên file hay thông tin Notion, luôn dùng `notion-search` (query =
số ký hiệu, data_source_url = `collection://2134aaf2-6213-81cd-ba93-000bbb6fe99e`)
để kiểm tra văn bản đã có trong Tbl_QLVB_ATĐ chưa.
- Nếu ĐÃ TỒN TẠI: báo ngay cho Hiếu, không đề xuất tạo mới, hỏi Hiếu muốn xem lại
  trang cũ, cập nhật bổ sung, hay đây thực sự là văn bản khác trùng số hiệu (hiếm
  nhưng đã từng gặp — xem "Trùng lặp 3270/QĐ-UBND" ở mục Việc tồn đọng).
- Nếu chưa có: tiếp tục quy trình bình thường từ Bước 2.
Áp dụng bước này cho MỌI văn bản, không chỉ khi nghi ngờ trùng.

### Bước 2 — Đề xuất tên lưu trữ file

Định dạng: `{YYMMDD}_{LoạiVB viết tắt}{Số hiệu}{CQBH viết tắt} {Mô tả ngắn không dấu}`

- **YYMMDD**: lấy từ **Ngày ban hành** (không phải ngày đến — xem quy tắc Ngày BH
  bên dưới). Nếu Ngày BH khác Ngày đến, phải dùng Ngày BH và nói rõ cho Hiếu biết đã
  đổi.
- **CQBH viết tắt trong tên file**: UBND Thành phố → `UBTP`; UBND xã → `UBX`; các đơn
  vị khác dùng viết tắt hợp lý theo hậu tố ký hiệu (VD 6643/SKHCN-CĐS → `SKHCN`;
  801/TĐC-ĐL → `TDC`).
- **Loại VB viết tắt**: Công văn → `CV`; Kế hoạch → `KH`; Giấy mời → `GM`; Quyết định
  → `QD`; Báo cáo → `BC`... (suy ra hợp lý theo loại, hỏi lại nếu không chắc).
- **Mô tả ngắn không dấu**: tóm trích yếu, không dấu tiếng Việt, ưu tiên viết tắt
  tối đa có thể (VD "Che do BC NQ57" thay vì viết đầy đủ "Thuc hien bao cao dinh ky
  NQ57 va phan cong dau moi phoi hop") — Hiếu ưu tiên tên file ngắn gọn.
- **KHÔNG dùng dấu gạch ngang "-"** trong mô tả (dễ gây lỗi tên file) — thay bằng
  gạch dưới "_". Ví dụ "2026-2030" → "2026_2030".
- Ví dụ: `260710_CV6643SKHCN Gop y du thao HD CDS cap xa`,
  `260630_KH336UBTP KH ptrien HTKT vien thong thu dong 2026_2030`

**QUY TẮC — hiển thị tên file kèm nút copy:** khi đề xuất tên file cho Hiếu, LUÔN
render bằng widget (công cụ `show_widget`/`visualize`) dạng ô code kèm nút copy
(icon `ti-copy`, bấm đổi sang `ti-check` khi copy xong), không chỉ dán tên file trơn
trong text — để Hiếu bấm 1 nút copy được ngay, không phải bôi đen. Áp dụng cho mọi
lần đề xuất tên file ở Bước 2 (kể cả khi đề xuất lại do Hiếu yêu cầu sửa).

### Bước 3 — Đề xuất đầy đủ thông tin Notion (Tbl_QLVB_ATĐ)

Đề xuất giá trị cho: **Nội dung VB** (= số ký hiệu, KHÔNG kèm tiền tố loại VB, ví dụ
`6643/SKHCN-CĐS` chứ không phải `CV6643...`), **Trích yếu**, **Loại VB**, **CQBH**,
**Cấp CQ**, **Ng BH**, **Lĩnh vực**, **Bộ Th.kê**, **Parent item**, **Ghi chú**.

**QUY TẮC — KHÔNG set Danh mục/Tiểu mục ở văn bản lá:** hai trường `Danh mục` và
`Tiểu mục` CHỈ được set trên các trang gộp nhóm cấp cao (trang "COT ...", ví dụ "COT
Chỉ đạo, điều hành", "COT Lãnh đạo, quán triệt Cấp ủy") — set trên chính trang đó,
KHÔNG lan xuống văn bản lá. Văn bản lá (từng số ký hiệu cụ thể) chỉ cần **Parent
item** trỏ đúng tới trang con phù hợp (vd "Hoạt động Lãnh đạo, quán triệt" cho khối
Đảng, "COT Chỉ đạo, điều hành" hoặc trang con của nó cho khối chính quyền) — phân
cấp bằng quan hệ Parent item/Sub-item, không set thêm Danh mục/Tiểu mục trực tiếp.
Trước khi chọn Parent item, LUÔN kiểm tra bằng `notion-search`/`notion-fetch` xem văn
bản thuộc khối nào (chính quyền/Đảng/đoàn thể...) để chọn đúng nhánh — sai nhánh đã
từng xảy ra thật (xem "Việc tồn đọng": 277-CV/VPĐU bị gắn nhầm vào nhánh chính quyền
"COT Chỉ đạo, điều hành" thay vì đúng nhánh Đảng "Hoạt động Lãnh đạo, quán triệt").

**Quy tắc Ngày ban hành (Ng BH):**
- Mặc định = Ngày đến, trừ khi Hiếu cung cấp ngày khác.
- Nếu nội dung file gốc (khi tìm thấy trên Drive) tiết lộ ngày ban hành thật, cập
  nhật lại và báo cho Hiếu.
- Khi Hiếu dán Sổ văn bản kèm ghi chú ngày dạng "(dd/mm)" (ví dụ "Sổ VB đến PVHXH
  (14/7)") — đây LÀ Ngày ban hành, Hiếu cố ý cung cấp sẵn. Dùng luôn, chỉ BÁO CHO
  BIẾT đã dùng Ng BH này (nếu khác Ngày đến), KHÔNG hỏi lại xác nhận — hỏi lại xác
  nhận một thông tin Hiếu đã chủ động cung cấp là thừa.

**Quy tắc CQBH khi đơn vị cụ thể không có trong danh sách có sẵn:** dùng option cấp
trên gần nhất phù hợp nhất (VD Chi cục trực thuộc Sở → chọn "Sở ..." tương ứng), ghi
rõ tên đơn vị cụ thể vào Ghi chú.

**Quy tắc Lĩnh vực cho văn bản tập huấn/đào tạo cán bộ:** mặc định = "3. Nhân lực số"
(bất kể chủ đề tập huấn cụ thể là gì).

**Quy tắc gán Parent item tự động (không cần hỏi lại):**
| Loại văn bản | Parent item |
|---|---|
| Lấy ý kiến góp ý dự thảo | "Góp ý dự thảo VB" |
| Kế hoạch/Chương trình/Chiến lược dài hạn, giai đoạn của UBND các cấp | "KHCN - Chương trình, Chiến lược, KH dài hạn UBND các cấp" (hoặc parent con theo Lĩnh vực nếu đã tách — xem mục "Group theo Lĩnh vực") |
| Tập huấn/đào tạo nâng cao chuyên môn cán bộ | "Nâng cao chất lượng chuyên môn" |

Nếu văn bản không khớp mục nào ở trên, hỏi Hiếu: để trống, gán vào nhóm có sẵn, hay
tạo nhóm mới?

**Những gì PHẢI hỏi rõ trước khi lưu (không tự ý bỏ qua):**
- Ngày ban hành nếu nghi ngờ khác Ngày đến.
- Parent item nếu không khớp rõ ràng với bảng trên.
- Bất kỳ trường nào Hiếu có thể biết rõ hơn Claude (thông tin không có trong đoạn
  dán ban đầu).

### Bước 4 — Xác nhận rồi mới lưu

Hỏi: "Xác nhận lưu không?" Chỉ gọi `notion-create-pages` vào data source
`Tbl_QLVB_ATĐ` sau khi Hiếu đồng ý hoặc nói "lưu đi"/"ok".

### Bước 5 — Gắn link Drive

**Mặc định LUÔN tự động thực hiện bước này ngay sau khi lưu Notion (Bước 4) — không
chờ Hiếu gõ "gắn link".** Nếu tìm trên Drive không thấy file khớp, báo ngay cho Hiếu
biết (không lưu link ẩu, không bỏ qua im lặng) — Hiếu sẽ tự tải file lên Drive sau
rồi báo lại.
1. `search_files` trên Google Drive, tìm theo **số hiệu riêng lẻ** (VD `'6643'` hoặc
   `'KH336'`) — KHÔNG dùng nguyên ký hiệu có dấu "/" đầy đủ khi search.
2. Lấy `viewUrl` của file mới nhất khớp.
3. Cập nhật trang Notion:
   - **Link** = URL Drive đầy đủ.
   - **Nội dung VB** = gắn markdown link CHỈ vào phần số của ký hiệu, ví dụ:
     `[6643](driveLink)/SKHCN-CĐS` (giữ nguyên phần CQBH phía sau, không link).

### Bước 6 — Hai câu hỏi bắt buộc sau khi lưu Notion (gắn link xong)

**Thứ tự cố định: hỏi TodoListATĐ TRƯỚC, Nexus SAU** (đổi từ thứ tự cũ theo yêu cầu
Hiếu — không đảo lại nữa).

1. "Có tạo công việc đưa vào TodoListATĐ không?" — nếu có, hỏi thêm: có tính KPI quý
   không? (gắn tag "Đánh giá Quý" vào cột **Danh mục BC** nếu có; không gắn nếu chỉ
   theo dõi). Đề xuất đầy đủ các trường (Công việc, Loại CV, Lĩnh vực, Tình trạng Xly,
   Thời hạn, Văn bản CĐ...) và chờ Hiếu xác nhận/sửa trước khi `notion-create-pages`.
2. "Có lưu song song vào Nexus không (phan_loai = theo_dõi)?" — chỉ áp dụng cho văn
   bản có tính chỉ đạo/theo dõi tích cực. Mặc định KHÔNG (chỉ Notion) trừ khi Hiếu
   đồng ý. Nexus gồm 3 việc, làm tuần tự:
   (a) Ghi vào bảng `van_ban` (kho văn bản) — đề xuất đầy đủ giá trị từng cột dự
   kiến ghi (ma_van_ban, so_hieu, ten_van_ban, tom_tat, loai, cap_ban_hanh,
   co_quan_ban_hanh, ngay_ban_hanh, trang_thai, link_goc, phan_loai,
   thoi_gian_thuc_hien) và CHỜ XÁC NHẬN trước khi `execute_sql`/`apply_migration`.
   (b) Sau khi đã lưu văn bản vào `van_ban`, LUÔN hỏi thêm: "Văn bản này có nên cập
   nhật thành 1 kết quả thực hiện nhiệm vụ (bảng `ket_qua`/`theo_doi_cd`) hoặc số
   liệu (bảng `so_lieu`/`cap_nhat_so_lieu`) nào không?" — không tự suy đoán có hay
   không, luôn hỏi.
   (c) Nếu Hiếu xác nhận có, Claude tự tìm nhiệm vụ/số liệu liên quan trong Nexus —
   tìm cả ở `theo_doi_cd` (nhiệm vụ/chỉ tiêu cấp cha) LẪN `cong_viec_con` (công việc
   con) theo tên/lĩnh vực/đơn vị, không chỉ tìm ở bảng cha. Rồi ĐỀ XUẤT rõ nội dung
   cập nhật cụ thể (nhiệm vụ/số liệu nào, giá trị mới là gì, kết quả gì) để Hiếu xem
   và CHỈNH SỬA trước — chỉ `execute_sql` update/insert sau khi Hiếu xác nhận nội
   dung cuối cùng. Không tự ý suy đoán giá trị số liệu/kết quả rồi ghi thẳng.
   (d) Khi ghi kết quả (`ket_qua`) có gắn minh chứng là văn bản: LUÔN tự động tìm
   văn bản trong bảng `van_ban` (kho văn bản Nexus) trước theo số ký hiệu — nếu có,
   lấy `id` để insert vào `ket_qua_minh_chung` (van_ban_id). Nếu KHÔNG có trong kho
   văn bản Nexus (VD Hiếu chọn không lưu Nexus ở bước 1), tìm tiếp trong Notion
   Tbl_QLVB_ATĐ và dùng `Link` (Google Drive) của trang đó, ghi vào
   `ket_qua_minh_chung_ngoai` (noi_dung + link) thay vì `ket_qua_minh_chung`. Không
   hỏi lại Hiếu tìm ở đâu — tự động thử `van_ban` trước rồi mới tới Notion.
   (e) Khi ghi/cập nhật `cap_nhat_so_lieu`, cột `ghi_chu` LUÔN phải viết đầy đủ,
   chi tiết, tự-giải-thích được nội dung số liệu đó là gì (bối cảnh, đối tượng,
   phân rã theo đơn vị/thành phần nếu có...) — KHÔNG viết tắt gọn kiểu chỉ ghi tên
   văn bản căn cứ. Lý do: ghi chú này sẽ được dùng làm dữ liệu đầu vào cho AI soạn
   thảo văn bản/báo cáo sau này, nên phải đủ ngữ cảnh để hiểu mà không cần tra lại
   nguồn gốc. Dùng chính nội dung đã thống nhất với Hiếu cho `ket_qua`/`ghi_chu`
   liên quan (thường trùng với nội dung `ket_qua.noi_dung` nếu có).

---

## TẠO VIỆC TRONG TodoListATĐ

Database: collection `2134aaf2-6213-8102-8c1e-000bfd9d91dd`, thuộc workspace CĐS ATĐ.
Thay thế hoàn toàn WorkBoard cũ (không dùng file `data/danh-sach.md` cục bộ nữa).

Đề xuất trước khi lưu, gồm: **Công việc** (title, bắt đầu bằng động từ), **Loại CV**,
**Lĩnh vực**, **Tình trạng Xly**, **Ph. Công** (mặc định "Hiếu" nếu không nói khác),
**Thời gian**, **Thời hạn**, **Văn bản CĐ** (số ký hiệu liên quan), **Ghi chú** (kèm
link ngược về trang Tbl_QLVB_ATĐ tương ứng), **Danh mục BC** (gắn "Đánh giá Quý" nếu
Hiếu xác nhận tính KPI).

**QUY TẮC — luôn gắn link vào "Văn bản CĐ":** trường `Văn bản CĐ` KHÔNG được để dạng
chữ thường trơn (vd "277-CV/VPĐU") — LUÔN viết dạng markdown link trỏ về file Drive
của văn bản đó, đúng định dạng đã dùng ở `Nội dung VB` bên Tbl_QLVB_ATĐ, ví dụ:
`[277](https://drive.google.com/...)-CV/VPĐU`. Áp dụng ngay lúc tạo việc (không chờ
Hiếu nhắc), lấy link Drive từ bước tìm/gắn link đã làm ở Tbl_QLVB_ATĐ (Bước 5) — nếu
văn bản chưa có link Drive lúc tạo việc, tạo trước bằng text thường rồi cập nhật lại
ngay khi có link.

Nếu việc có deadline liên quan sự kiện tương lai cần theo dõi kết quả sau đó (ví dụ
kết thúc khóa học), ghi rõ vào Ghi chú và đề xuất đặt nhắc nhở lịch (scheduled task)
để hỏi lại kết quả và xin phép cập nhật Nexus — không tự cập nhật Nexus khi chưa có
xác nhận.

---

## GROUP THEO LĨNH VỰC (parent/sub-parent trong Tbl_QLVB_ATĐ)

Hệ thống Tbl_QLVB_ATĐ tổ chức phân cấp bằng quan hệ Parent item / Sub-item, và nhóm
theo cột **Lĩnh vực**.

- Khi một trang Parent có nhiều văn bản con thuộc **cùng một Lĩnh vực** với số lượng
  đáng tách (≥2), đề xuất tạo **parent con** riêng cho Lĩnh vực đó, gom các văn bản
  con vào, rồi gán parent con này làm Parent item mới cho chúng (parent con này có
  Parent item = parent chính).
- Nhóm chỉ có 1 văn bản: để nguyên dưới parent chính, không tách.
- **QUY TẮC BẮT BUỘC:** mọi trang parent/parent con mới tạo PHẢI được gán giá trị
  **Lĩnh vực** trùng với nhóm mà nó đại diện — tránh "mồ côi" (không lọc được) trong
  hệ thống group-by-Lĩnh vực.
- Luôn hỏi xác nhận trước khi tái cấu trúc (tạo parent con + gán lại Parent item cho
  các văn bản con) — đây là thay đổi cấu trúc, không tự ý làm.

---

## BÓC TÁCH VĂN BẢN (chỉ tiêu/nhiệm vụ ở Phụ lục vào Nexus)

Kích hoạt khi Hiếu yêu cầu "bóc tách" một văn bản kế hoạch có Phụ lục chỉ
tiêu/nhiệm vụ (ví dụ Kế hoạch NQ57, chương trình chuyển đổi số...) để đưa
vào Nexus. Không tự chạy quy trình này khi Hiếu chỉ hỏi đọc/tóm tắt văn bản
— chỉ chạy khi Hiếu nói rõ "bóc tách", "đưa vào Nexus", "boc tach van ban".

**Nguyên tắc cốt lõi: KHÔNG tạo trùng lặp.** Văn bản kế hoạch cấp dưới
thường "cụ thể hóa" lại đúng các chỉ tiêu/nhiệm vụ đã có sẵn trong văn bản
cấp trên (đã có trong Nexus từ trước) — việc bóc tách không phải lúc nào
cũng là tạo `theo_doi_cd` mới, phần lớn là **nối văn bản mới vào các
`theo_doi_cd` đã có** qua `giao_muc`.

### Bước 1 — Đọc văn bản gốc

Ưu tiên file mềm (Google Doc) nếu Hiếu cung cấp link, thay vì bản PDF/scan
— file mềm có Phụ lục dạng bảng rõ ràng, dễ bóc tách chính xác hơn. Đọc đủ:
Mục chỉ tiêu (thường ở Mục II) và các Phụ lục chi tiết (chỉ tiêu, nhiệm vụ).

### Bước 2 — Kiểm tra văn bản đã có trong Nexus `van_ban` chưa

`execute_sql` tìm theo `so_hieu` (và `ma_van_ban` phòng trường hợp gõ khác
định dạng) TRƯỚC khi đề xuất tạo mới. Nếu ĐÃ CÓ (kể cả `trang_thai_boc_tach
= 'dang_boc_tach'` — nghĩa là đã tạo văn bản nhưng chưa gán chỉ tiêu/nhiệm
vụ): dùng luôn `id` có sẵn, KHÔNG tạo lại. Nếu Hiếu báo "đã có trong kho"
mà Claude chưa tự phát hiện — dừng ngay, kiểm tra lại bằng SQL, xin lỗi
ngắn gọn nếu đã lỡ đề xuất tạo mới, không tranh luận.

### Bước 3 — Đối chiếu từng chỉ tiêu/nhiệm vụ trong Phụ lục với Nexus

Với TOÀN BỘ `theo_doi_cd` hiện có (không giới hạn theo văn bản nào), so
khớp nội dung từng dòng Phụ lục — theo ý nghĩa, không chỉ theo câu chữ.
Phân 3 nhóm:
- **TRÙNG/GẦN TRÙNG** — nội dung, đơn vị tính, giá trị mục tiêu khớp rõ ràng
  → không tạo `theo_doi_cd` mới, chỉ tạo `giao_muc` nối văn bản mới với
  `theo_doi_cd` cũ.
- **GẦN GIỐNG nhưng không khớp hẳn** — cùng chủ đề nhưng khác đối tượng,
  phạm vi, hoặc chi tiết hơn hẳn (ví dụ 1 dòng Nexus cũ chung chung, dòng
  Phụ lục mới cụ thể hơn nhiều) → KHÔNG tự quyết là trùng hay mới. Liệt kê
  riêng, hỏi Hiếu: cập nhật/mở rộng dòng cũ, hay tách dòng mới.
- **MỚI HOÀN TOÀN** — không có nội dung tương ứng nào trong Nexus → đề xuất
  tạo `theo_doi_cd` mới (kèm `giao_muc`).

### Bước 4 — Đề xuất đầy đủ, chờ xác nhận trước khi ghi

Trình bày bảng đối chiếu đủ 3 nhóm ở Bước 3 cho Hiếu duyệt (đây LÀ nội dung
"đề xuất đầy đủ" theo quy tắc xác nhận chung ở đầu skill này). Chỉ
`execute_sql`/`apply_migration` sau khi Hiếu xác nhận rõ — có thể xác nhận
từng nhóm riêng (ví dụ: nhóm TRÙNG làm trước, nhóm MỚI/GẦN GIỐNG xử lý sau).

### Bước 5 — Luôn lưu STT gốc trong Phụ lục vào `giao_muc.stt_trong_vb`

Mỗi dòng `giao_muc` (cả loại chỉ tiêu lẫn nhiệm vụ) PHẢI ghi kèm
`stt_trong_vb` (cột integer trong bảng `giao_muc`, tự thêm bằng
`apply_migration` nếu văn bản Nexus chưa có cột này) — lấy đúng số thứ tự
của dòng đó trong Phụ lục gốc (I hay II). Lưu ý: Phụ lục I (chỉ tiêu) và
Phụ lục II (nhiệm vụ) đánh số ĐỘC LẬP, nên STT có thể trùng số giữa 2 loại
— khi tra cứu/báo cáo sau này luôn lọc kèm theo `theo_doi_cd.loai`
(chi_tieu/nhiem_vu) để không nhầm STT của phụ lục nào.

### Bước 6 — Xác nhận đổi trạng thái + hoàn tất

Sau khi đã đề xuất và Hiếu xác nhận ghi xong CẢ chỉ tiêu (Phụ lục loại chỉ
tiêu) LẪN nhiệm vụ (Phụ lục loại nhiệm vụ) của văn bản, KHÔNG tự động đổi
`trang_thai_boc_tach` — luôn hỏi lại Hiếu trước, kèm số liệu cụ thể của
đúng văn bản đang xử lý. Ví dụ hỏi: "Đã ghi xong 19 chỉ tiêu + 25 nhiệm vụ
của [số hiệu văn bản] vào Nexus — xác nhận chuyển trang_thai_boc_tach sang
da_boc_tach?". Chỉ `execute_sql` UPDATE sau khi Hiếu xác nhận rõ. Nếu chỉ
mới xong 1 phần (ví dụ chỉ tiêu xong, nhiệm vụ chưa), không hỏi bước này —
giữ nguyên `'dang_boc_tach'`.

**TODO — chưa hoàn thiện, cần hỏi Hiếu khi có dịp:** sau khi bóc tách xong,
có thể cần lưu thêm danh sách chỉ tiêu/nhiệm vụ/nội dung chỉ đạo vào 1 tab
"Danh sách nhiệm vụ" (ngoài Nexus) với cột STT trong VB gốc, Đơn vị chủ
trì, Thời gian thực hiện, Kết quả — nhưng CHƯA XÁC ĐỊNH: (a) tab này nằm
trong file Google Sheets nào hay cần tạo mới, (b) mỗi văn bản có tab riêng
hay dùng chung 1 tab tích lũy nhiều văn bản. KHÔNG tự suy đoán và tạo tab —
hỏi Hiếu rõ trước khi thêm bước này vào quy trình chính thức.

---

## VIỆC TỒN ĐỌNG CẦN NHỚ GIỮA CÁC PHIÊN

- Rất nhiều việc trong TodoListATĐ đã lỗi thời, chưa cập nhật trạng thái — cần rà
  soát dọn dẹp khi Hiếu yêu cầu.
- Việc cũ còn nằm ở WorkBoard cần di chuyển sang TodoListATĐ.
- Phát hiện 2 trang trùng số hiệu "3270/QĐ-UBND" (khác Lĩnh vực) dưới nhóm KHCN —
  cần rà soát gộp khi dọn dẹp.
- 277-CV/VPĐU từng bị gắn Parent item sai nhánh (chính quyền "COT Chỉ đạo, điều
  hành" thay vì đúng nhánh Đảng "Hoạt động Lãnh đạo, quán triệt") — đã sửa. Cũng lỡ
  set thừa Danh mục/Tiểu mục trên văn bản lá — đã xóa (xem quy tắc ở Bước 3).
- 3085/UBND từng có Danh mục="COT CĐ-ĐH", Tiểu mục="Hoạt động BCĐ" set thừa trên văn
  bản lá — Hiếu đã xác nhận dọn, đã xóa 2 trường này (Parent item giữ nguyên, đúng).

---

## LƯU Ý ĐẶC BIỆT

- Không cần Hiếu tải file lên chat — tiết kiệm token là ưu tiên.
- Khi báo lỗi "file name invalid", kiểm tra lại ký tự đặc biệt trong tên đề xuất
  (đặc biệt dấu gạch ngang) trước khi hỏi Hiếu.
- Đây là skill đang hoàn thiện dần trong quá trình làm việc thực tế — khi Hiếu chỉnh
  sửa/thêm quy tắc mới, cập nhật trực tiếp vào SKILL.md này (không tạo skill riêng
  cho từng quy tắc nhỏ).
