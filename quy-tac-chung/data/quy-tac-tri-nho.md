# Quy tắc trí nhớ — mỗi dữ kiện chỉ có MỘT chủ

> **META** · cap_nhat: 2026-09-01 · nguon_su_that: quyết định của Hiếu · ra_soat_lai: 2027-03-01 · rui_ro: cao

> Đọc khi: nghi ngờ "thông tin này lấy ở đâu mới đúng", trước khi ghi dữ liệu
> mới vào bất kỳ kho nào, hoặc khi hai nguồn nói khác nhau.

---

## VẤN ĐỀ CẦN GIẢI

Cùng một dữ kiện (ví dụ: danh sách 8 trưởng ấp + SĐT) hiện đang nằm ở **ba
nơi**: memory của Claude, file skill `quy-tac-chung/data/`, và bảng Nexus
`profiles`/`don_vi`. Khi sửa một nơi, hai nơi kia lập tức thành sai — nhưng
không ai báo lỗi. Đây là dạng hỏng âm thầm, nguy hiểm hơn hỏng ồn ào.

Quy tắc dưới đây có đúng một mục tiêu: **mỗi dữ kiện có đúng một chủ sở hữu.**

---

## BỐN LỚP TRÍ NHỚ

| Lớp | Là gì | Chứa gì | Có được dùng làm căn cứ nghiệp vụ không? |
|---|---|---|---|
| **A. Memory Claude**<br>(`/profile`, `/topics`, `/areas`, `/people`) | Ghi nhớ mềm, Claude tự sinh sau mỗi phiên | Cách Hiếu muốn làm việc, bối cảnh nghề nghiệp ổn định, việc đang làm dở | **KHÔNG.** Chỉ để cá nhân hóa hội thoại. Tuyệt đối không trích vào văn bản, báo cáo, hay lệnh ghi dữ liệu. |
| **B. Skill files**<br>(Claude.ai Settings ← GitHub `vhttxatd/claude-skills`) | Tri thức có thẩm quyền, Hiếu kiểm soát, có phiên bản | Quy trình, thể thức, căn cứ pháp lý, danh mục ổn định, biểu mẫu | **CÓ** — nếu dòng META còn trong hạn rà soát. |
| **C. Notion**<br>(workspace CĐS ATĐ) | Sổ tác nghiệp hàng ngày | Văn bản đến, việc theo dõi, lịch chi bộ | **CÓ** — luôn tra trực tiếp, không sao chép vào skill. |
| **D. Nexus / Supabase**<br>(`nexus-gov-atd`) | CSDL điều hành + số liệu | Nhiệm vụ/chỉ tiêu, kết quả, số liệu, báo cáo, nhân sự hệ thống | **CÓ** — tra bằng SQL. Schema có thể đổi, nghi ngờ thì `list_tables` lại. |

Chi tiết bảng biểu của C và D: xem skill `kho-luu-tru`.

---

## QUY TẮC 1 — Ai làm chủ dữ kiện nào

| Loại dữ kiện | Chủ sở hữu | Ba lớp kia làm gì |
|---|---|---|
| Sở thích làm việc, cách trình bày, giọng văn | **A** | B có thể ghi lại nếu đã ổn định thành nguyên tắc |
| Quy trình, thể thức, biểu mẫu, căn cứ pháp lý | **B** | A không giữ bản sao |
| Danh sách cán bộ, đơn vị, ấp, SĐT | **D** (`profiles`, `don_vi`) | B chỉ giữ **con trỏ** ("xem Nexus `don_vi`"), không giữ danh sách. A không giữ. |
| Văn bản đến, tình trạng xử lý | **C** (`Tbl_QLVB_ATĐ`) | D chỉ giữ văn bản có `phan_loai = theo_doi` |
| Việc cần làm, KPI quý | **C** (`TodoListATĐ`) | — |
| Số liệu, chỉ tiêu, kết quả thực hiện | **D** | Không cache số liệu vào B |
| Tri thức nền địa phương (hiện trạng, tiềm năng) | **B** (`tri-thuc-dia-phuong`) | Số liệu có kỳ báo cáo thì thuộc D, không thuộc B |

**Nguyên tắc rút gọn:** dữ liệu *thay đổi theo thời gian* thuộc C/D. Dữ liệu
*mô tả cách làm việc* thuộc B. Dữ liệu *về Hiếu với tư cách người dùng*
thuộc A.

---

## QUY TẮC 2 — Khi hai nguồn mâu thuẫn

Thứ tự ưu tiên, cao xuống thấp:

```
D (Nexus)  =  C (Notion)   >   B (skill)   >   A (memory)
   dữ liệu sống                tri thức        ghi nhớ mềm
```

- **A không bao giờ thắng.** Nếu memory nói khác skill hoặc khác CSDL, memory sai.
- Khi B thua C/D: **sửa B ngay trong phiên đó**, đừng để lần sau vấp lại.
- Khi C và D lệch nhau (cùng một văn bản): tin **C** cho thông tin văn bản
  gốc, tin **D** cho tình trạng theo dõi/tiến độ.

---

## QUY TẮC 3 — Dòng META bắt buộc

Mọi file `SKILL.md` và mọi file trong `data/` chứa dữ kiện có thể hết hạn
phải có đúng **một dòng** ngay sau frontmatter:

```
> **META** · cap_nhat: YYYY-MM-DD · nguon_su_that: <nguồn> · ra_soat_lai: YYYY-MM-DD · rui_ro: cao|trung|thap
```

| Trường | Nghĩa |
|---|---|
| `cap_nhat` | Ngày nội dung được sửa lần cuối |
| `nguon_su_that` | Lấy từ đâu — số hiệu văn bản, tên bảng CSDL, hoặc "quyết định của Hiếu" |
| `ra_soat_lai` | Hạn phải xem lại. Quá hạn = **không dùng làm căn cứ** cho tới khi rà xong |
| `rui_ro` | cao / trung / thấp — xem bảng dưới |

**Chu kỳ rà soát theo mức rủi ro:**

| Mức | Tiêu chí | Chu kỳ |
|---|---|---|
| **cao** | Có trích dẫn căn cứ pháp lý, hoặc gây ra hành động ghi dữ liệu, hoặc chứa số liệu đưa vào báo cáo gửi lãnh đạo | 3 tháng |
| **trung** | Quy trình nội bộ, biểu mẫu, định dạng | 6 tháng |
| **thấp** | Kỷ luật tư duy, quy trình meta — không chứa dữ kiện hết hạn | 12 tháng |

**Phân loại 16 skill hiện có:**

- **cao:** `quy-tac-chung`, `quan-ly-du-an`, `danh-muc-nen-tang-dung-chung`,
  `cdso-kehoach`, `xu-ly-van-ban-den`, `kho-luu-tru`, `chung-thu-chu-ky-so`,
  `tri-thuc-dia-phuong`, `nhan-su-danh-gia`
- **trung:** `bao-cao-hanh-chinh`, `the-thuc-van-ban`, `sinh-hoat-chi-bo`,
  `xin-mail-cong-vu`
- **thấp:** `tao-skill`, `fable-mode`, `brainstorm-spec-plan-execute`

---

## QUY TẮC 4 — Claude phải làm gì trong mỗi phiên

1. Khi mở một skill để lấy dữ kiện: **đọc dòng META trước**. Nếu `ra_soat_lai`
   đã qua → báo Hiếu "dữ liệu này quá hạn rà soát ngày X, có chắc còn đúng
   không?" trước khi dùng, **không im lặng dùng tiếp**.
2. Khi định trích một con số, một tên người, một số hiệu văn bản vào bản
   thảo: hỏi "dữ kiện này chủ sở hữu là lớp nào?" — nếu là C/D thì tra trực
   tiếp, không lấy từ B hay A.
3. Khi phát hiện hai lớp mâu thuẫn: **dừng lại, báo, đề xuất sửa lớp thua** —
   không tự chọn bên rồi đi tiếp.
4. Không bao giờ đưa nội dung từ lớp A vào file xuất ra.

---

## KIỂM TRA ĐỊNH KỲ

Nhờ Claude chạy `scripts/kiem-tra-meta.py` (trong skill `tao-skill`) để quét
toàn bộ skill và liệt kê: file thiếu META, file quá hạn rà soát. Hiếu không
cần cài gì — Claude chạy được trực tiếp trong phiên.
