---
name: kho-luu-tru
description: >
  Bản đồ tổng quan TẤT CẢ kho lưu trữ dữ liệu của Hiếu: 2 kho văn bản Notion
  (kho cũ Văn bản CPĐT chỉ tra cứu vs kho hiện hành Tbl_QLVB_ATĐ để cập nhật
  văn bản mới), Notion TodoListATĐ, và toàn bộ database Nexus/Supabase
  (nexus-gov-atd). Dùng khi cần tra cứu "dữ liệu này nằm ở kho nào", "bảng
  nào lưu cái gì", quyết định ghi dữ liệu mới vào đâu, hoặc khi Hiếu hỏi tổng
  quan/khác biệt giữa các kho. KHÔNG thay thế chi tiết quy trình từng bước
  (xem skill `xu-ly-van-ban-den` cho quy trình xử lý văn bản đến cụ thể).
---


> **META** · cap_nhat: 2026-09-01 · nguon_su_that: schema Supabase nexus-gov-atd + Notion CĐS ATĐ · ra_soat_lai: 2026-12-01 · rui_ro: cao

# Bản đồ kho lưu trữ dữ liệu — Hiếu / An Thới Đông

Tuân theo 4 nguyên tắc vận hành trong `tao-skill`. Đặc biệt quan trọng ở skill
này: **đây là dữ liệu nền để TRA CỨU đúng kho, không phải quy trình thao tác**
— khi cần thao tác cụ thể (lưu văn bản đến, tạo việc...), luôn kết hợp với
`xu-ly-van-ban-den`. Danh mục giá trị enum/lookup dưới đây lấy trực tiếp từ
schema Supabase (`list_tables`) — nếu nghi ngờ đã đổi, kiểm tra lại bằng
`Supabase:list_tables` thay vì tin cứng vào skill này.

---

## KHÔNG GHI SỐ LƯỢNG BẢN GHI VÀO FILE NÀY

File này mô tả **cấu trúc** kho dữ liệu — bảng nào chứa gì, ghi mới khi nào.
Nó **không phải nơi lưu số lượng bản ghi**. Số lượng là dữ liệu do Nexus sở
hữu, chép vào đây là chắc chắn lệch.

> Bằng chứng: bản trước ghi `don_vi` 34 đơn vị, `linh_vuc` 98, `profiles` 50
> người, `so_lieu` 189. Thực tế ngày 01/9/2026: **42 · 104 · 137 · 237**.
> Sai cả 4, không ai phát hiện. Đã bỏ toàn bộ số đếm khỏi file.

Cần số lượng thật thì đếm trực tiếp:

```sql
SELECT 'don_vi' t, count(*) n FROM don_vi
UNION ALL SELECT 'linh_vuc', count(*) FROM linh_vuc
UNION ALL SELECT 'profiles', count(*) FROM profiles
UNION ALL SELECT 'so_lieu', count(*) FROM so_lieu
UNION ALL SELECT 'theo_doi_cd', count(*) FROM theo_doi_cd
UNION ALL SELECT 'van_ban', count(*) FROM van_ban;
```

---

## TỔNG QUAN — 3 hệ thống, việc gì đi kho nào

| Hệ thống | Vai trò | Ghi mới khi nào |
|---|---|---|
| **Notion — Tbl_QLVB_ATĐ** | Kho văn bản **hiện hành, chính thức** | MỌI văn bản đến mới (công văn, KH, QĐ...) |
| **Notion — "Văn bản CPĐT"** | Kho văn bản **CŨ, đã lỗi thời** | KHÔNG BAO GIỜ ghi mới — chỉ tra cứu lịch sử nếu cần |
| **Notion — TodoListATĐ** | Việc cần theo dõi + đánh giá KPI quý | Việc phát sinh từ văn bản hoặc Hiếu giao trực tiếp |
| **Nexus (Supabase `nexus-gov-atd`)** | App quản lý điều hành công việc toàn xã — nhiệm vụ/chỉ tiêu, kết quả thực hiện, số liệu, báo cáo, truyền thông số, dự toán kinh phí | Chỉ khi Hiếu xác nhận đồng ý + xác nhận nội dung cụ thể |

**Nguyên tắc chọn kho khi có văn bản mới:** LUÔN Notion Tbl_QLVB_ATĐ trước
(kho lưu trữ chính). Nexus là lớp **theo dõi tiến độ/điều hành** phía trên,
chỉ thêm khi văn bản có tính chỉ đạo/theo dõi tích cực — không phải mọi văn
bản đều cần vào Nexus.

---

## PHẦN 1 — Notion

### 1.1 Tbl_QLVB_ATĐ (kho hiện hành)

- Workspace: **CĐS ATĐ**
- Collection ID: `2134aaf2-6213-81cd-ba93-000bbb6fe99e`
- Vai trò: kho lưu **chính thức, duy nhất** cho văn bản đến. Mọi thao tác lưu
  mới, gắn link Drive, kiểm tra trùng lặp đều nhắm vào kho này.
- Tổ chức: phân cấp bằng quan hệ Parent item/Sub-item + cột Lĩnh vực. Danh
  mục/Tiểu mục chỉ set ở trang gộp nhóm cấp cao ("COT ..."), không set ở văn
  bản lá.
- Quy trình lưu chi tiết (tên file, trường thông tin, Ngày BH...): xem skill
  `xu-ly-van-ban-den`.

**Không có trường "Số ký hiệu" riêng.** Số hiệu nằm trong tiêu đề `Nội dung VB`.
Kiểm trùng vì vậy chỉ so được chuỗi tiêu đề — và **các trang tên `DuThao/...`
nằm ở nhiều vị trí nên trùng tên là bình thường, không dùng để kiểm trùng.**

**Đang dư, cần xử lý (Hiếu xác nhận 01/9/2026):** `2448/QĐ-UBND` (3 trang) và
`1751/UBND` (3 trang) — trùng thật, giữ 1 xóa phần dư.

**Trường `Lĩnh vực` thiếu mã 13** (có 1–12, rồi 14, 15). Hiếu xác nhận đây là
thiếu sót, không phải cố ý.

**9 trang không có tiêu đề** — Hiếu quyết định để nguyên, không cần xử lý.

**Dữ liệu "Cấp huyện" (4 dòng) chỉ để THAM KHẢO** — có từ trước 01/02/2025.
Không dùng làm căn cứ cho văn bản hiện hành, không sửa, không xóa.

**Mức lấp đầy (01/9/2026, 1089 dòng):** trong đó **648 dòng là văn bản thật**
(có `Loại VB`), phần còn lại là trang gộp nhóm "COT ..." nên trống số hiệu và
ngày là đúng thiết kế. Trong 648 văn bản thật: thiếu Ngày BH **5**, thiếu CQBH
**1**, **thiếu Link file 188 (29%)**. Đếm gộp cả 1089 dòng sẽ ra "thiếu 361 —
581 dòng" và đó là con số sai — **luôn lọc `Loại VB IS NOT NULL` trước khi
đánh giá độ đầy đủ của kho này.**

### 1.2 "Văn bản CPĐT" (kho cũ — CHỈ TRA CỨU)

- Xuất hiện đôi khi trong kết quả `notion-search` cùng workspace.
- **TUYỆT ĐỐI KHÔNG** ghi dữ liệu mới, không dùng làm căn cứ kiểm tra trùng
  lặp cho văn bản mới. Nếu `notion-search` trả cả 2 kho, luôn ưu tiên và chỉ
  tin `Tbl_QLVB_ATĐ`.
- Chỉ mở/tra cứu khi Hiếu chủ động hỏi về văn bản lịch sử không có trong
  Tbl_QLVB_ATĐ.

### 1.3 TodoListATĐ

- Collection ID: `2134aaf2-6213-8102-8c1e-000bfd9d91dd`, cùng workspace CĐS ATĐ.
- Vai trò: **thay thế hoàn toàn WorkBoard cũ** — todo-list + đánh giá KPI quý.
  Đồng bộ online, dùng được mọi máy/điện thoại.
- **Nguồn mặc định** khi Hiếu ra lệnh liệt kê/cập nhật/tra cứu việc mà không
  nói rõ nguồn — hiểu là TodoListATĐ, không phải Nexus.
- Trường chính: Công việc, Loại CV, Lĩnh vực, Tình trạng Xly, Ph. Công, Chủ
  trì, Thời gian, Thời hạn, Văn bản CĐ, Ghi chú, KQ Công việc, Định kỳ, Độ
  khẩn, Địa điểm, Danh mục BC (gắn "Đánh giá Quý" nếu tính KPI).
- **`Văn bản CĐ` là trường VĂN BẢN THƯỜNG, không phải link Drive** — muốn có
  link thì dán nguyên URL vào đó. Đừng chờ nó tự nối sang Drive.
- Mức lấp đầy (đếm 01/9/2026, 276 dòng): `Loại CV` trống 47 dòng · `Lĩnh vực`
  trống 203 dòng (74%) · `Chủ trì` trống 253 dòng (92%). Nghĩa là **không lọc
  theo hai trường sau mà tin là đủ** — phần lớn việc sẽ rơi ra ngoài bộ lọc.

**Việc tạo trước 01/7/2025: GIỮ NGUYÊN.** Đó là giai đoạn trước mô hình 2 cấp
— chức danh, tên phòng, tên đơn vị ghi trong đó là **đúng tại thời điểm ghi**.
Không sửa ngược, không chuẩn hóa lại, không xóa. Hiện có 6 dòng như vậy
(18–24/6/2025, đều về công tác chuẩn bị sáp nhập). Cùng nguyên tắc với ánh xạ
tên ấp cũ: dữ liệu lịch sử là dữ kiện, không phải lỗi.

**Tên phòng họp không phải chức danh.** `Địa điểm` có "Phòng họp VHTT" (21 việc),
"Phòng họp PKT", "Phòng họp TCKH". Nghe như tên phòng ban cấp huyện cũ, nhưng
đó là **tên gọi phòng họp đang dùng hằng ngày**. Đừng đổi, đừng xóa — cùng loại
bẫy với "Vàm Sát" vừa là tên ấp đã bỏ vừa là địa danh còn tồn tại.

**Khi Hiếu thêm việc mới mà không nói rõ Loại CV / Lĩnh vực:**
1. Tự phân loại theo nội dung việc, rồi **báo lại** — "Tôi gán Loại CV = X,
   Lĩnh vực = Y, đổi không?". Hiếu im lặng thì hiểu là đồng ý.
2. Nếu tên Hiếu gõ **gần giống** một lựa chọn đã có → hỏi lại cho chắc, đừng
   đoán. Nếu là **ý nghĩa mới hoàn toàn** → hỏi: thêm lựa chọn mới, gán vào
   "Khác", hay chọn cái khác.
3. **Không tự thêm lựa chọn mới** vào trường select của Notion. Phải xin phép.
4. Danh sách lựa chọn của `Loại CV` và `Lĩnh vực` **do Notion sở hữu** — đọc
   trực tiếp từ trường select, không chép bản sao vào skill. Bản sao cũ trong
   skill `cong-viec-giao-ban` (nghỉ hưu 01/9/2026) đã mục: còn ghi "Tổ CNSCĐ
   43 thành viên, 12 ấp" và ấp Cá Cháy đã bỏ.

---

## PHẦN 2 — Nexus (Supabase)

- Project: **nexus-gov-atd**, project_id `zkgtrdrvlppyxusgzjnz`
- PostgreSQL 17, khu vực Singapore, toàn bộ bảng nghiệp vụ ở schema `public`
- Vai trò: app điều hành công việc riêng của Hiếu (không phải kho lưu văn
  bản gốc) — Claude **không tự tạo/ghi dữ liệu vào Nexus**, chỉ ghi sau khi
  Hiếu xác nhận đồng ý và cung cấp/duyệt nội dung cụ thể (xem quy tắc xác
  nhận trong `xu-ly-van-ban-den`).
- Chuỗi quan hệ lõi: `van_ban → giao_muc → theo_doi_cd → cong_viec_con →
  ket_qua → ket_qua_minh_chung`, cộng nhánh `so_lieu` và `bao_cao`.

### 2.1 Nhóm danh mục nền (lookup — hiếm khi ghi mới, chủ yếu tham chiếu)

| Bảng | Nội dung |
|---|---|
| `don_vi` | Danh sách Đơn vị/phòng ban (loại: co_quan_nha_nuoc/don_vi_su_nghiep/to_chuc_chinh_tri; cấp: cap_xa/cap_tp) |
| `khoi_co_quan` | Khối cơ quan (nhóm cha của `don_vi`), có phân cấp cha-con |
| `linh_vuc` | Lĩnh vực, phân cấp 3 tầng qua `path` (ltree): mang → linh_vuc → linh_vuc_con |
| `loai_van_ban` | Loại văn bản chuẩn |
| `cap_ban_hanh` | Cấp ban hành chuẩn |
| `profiles` | Người dùng hệ thống — họ tên, chức vụ, vai_tro_he_thong (super_admin/admin/lanh_dao/chuyen_vien/truong_dv/boc_tach_NV/nhap_lieu/tong_hop_bc/van_thu/lanh_dao_chinh_quyen/truyen_thong_so), phạm vi xem/sửa |
| `vai_tro_chuc_nang`, `vai_tro_pham_vi_mac_dinh` | Ma trận phân quyền theo vai trò (dòng chức năng x quyền xem/thêm/sửa/xóa) |

### 2.2 Nhóm văn bản (kho văn bản Nexus — song song Notion, không thay thế)

| Bảng | Nội dung |
|---|---|
| **`van_ban`** | Văn bản đưa vào theo dõi Nexus. Cột quan trọng: `ma_van_ban` (unique), `so_hieu`, `loai` (ke_hoach/quyet_dinh/cong_van/nghi_quyet/chi_thi/thong_bao), `cap_ban_hanh` (xa/tp/tinh/trung_uong), `trang_thai` (dang_hieu_luc/het_hieu_luc/cho_hieu_luc), **`phan_loai`** (`theo_doi` = đang chỉ đạo/theo dõi tích cực, `tra_cuu` = chỉ lưu tham khảo), `nien_han` (hang_nam/giai_doan/dot_xuat), `van_ban_cha_id` (văn bản gốc nếu là VB phái sinh) |
| `van_ban_file` | File đính kèm 1 văn bản (loai: chinh/file_mem/phu_luc/khac) |
| `van_ban_lien_quan` | Quan hệ nhiều-nhiều giữa các văn bản liên quan nhau |
| `van_ban_theo_doi` | Người dùng đang "theo dõi" 1 văn bản (thông báo cá nhân, không phải phan_loai) |
| **`giao_muc`** | Từng mục/chỉ tiêu cụ thể được **giao trong 1 văn bản** — cầu nối `van_ban` → `theo_doi_cd`, có mục tiêu số (`gia_tri_muc_tieu`), thời hạn riêng, sản phẩm KQ (`san_pham_kq`) |

### 2.3 Nhóm nhiệm vụ/chỉ tiêu (lõi điều hành)

| Bảng | Nội dung |
|---|---|
| **`theo_doi_cd`** | Bảng trung tâm — mỗi dòng là 1 **nhiệm vụ hoặc chỉ tiêu** cần theo dõi. `loai` (chi_tieu/nhiem_vu), `phan_loai` (dinh_ky/dot_xuat/hang_nam/thuong_xuyen), `trang_thai` (chua_bat_dau/dang_th/hoan_thanh/tre_han/tam_dung), `muc_do_uu_tien`, `thoi_han`, `parent_id` (nhiệm vụ cha-con), hỗ trợ nhiều đơn vị chủ trì/phối hợp (mảng uuid) |
| `theo_doi_cd_lien_ket` | Liên kết 1 chỉ tiêu với 1 nhiệm vụ liên quan (không phải cha-con) |
| `theo_doi_cd_so_lieu` | Chỉ tiêu/nhiệm vụ nào dùng số liệu nào (nhiều-nhiều với `so_lieu`) |
| **`cong_viec_con`** | Công việc con cụ thể tách ra từ 1 `theo_doi_cd` (người thực hiện, thời hạn, trạng thái riêng) |

### 2.4 Nhóm kết quả thực hiện

| Bảng | Nội dung |
|---|---|
| **`ket_qua`** | Ghi nhận kết quả gắn vào `theo_doi_cd` hoặc `cong_viec_con`. **`loai_ket_qua`** có 3 loại: `ket_qua` (đã làm — mặc định), `ke_hoach` (sắp làm/phương hướng), `kho_khan` (vướng mắc). `trang_thai_duyet` (cho_duyet/da_duyet/tu_choi) — **lưu ý**: Zalo MiniApp từng không hiển thị do `trang_thai_duyet = cho_duyet`, xem mục "Việc tồn đọng" trang bàn giao khi ghi kết quả mới. |
| `ket_qua_minh_chung` | Minh chứng là văn bản **có sẵn trong Nexus `van_ban`** (liên kết `van_ban_id`) |
| `ket_qua_minh_chung_ngoai` | Minh chứng **KHÔNG có trong Nexus** — ghi nội dung + link Drive trực tiếp (lấy từ Notion Tbl_QLVB_ATĐ) |

### 2.5 Nhóm số liệu

| Bảng | Nội dung |
|---|---|
| `nhom_so_lieu` | Nhóm số liệu (gắn 1 lĩnh vực) |
| **`so_lieu`** | Định nghĩa chỉ số/số liệu — `loai` (thanh_phan/cong_thuc/tong_hop), `ky_bao_cao` (thang/quy/nam/ngay_co_dinh/giai_doan/6_thang/thuong_xuyen), `cong_thuc` (nếu là số liệu tính từ số liệu khác), `muc_tieu` |
| `so_lieu_cong_thuc_bien` | Biến trong công thức của 1 số liệu tổng hợp (trỏ tới các `so_lieu` thành phần) |
| `so_lieu_don_vi` | Số liệu nào áp dụng cho đơn vị nào (nhiều-nhiều) |
| **`cap_nhat_so_lieu`** | Giá trị số liệu thực tế theo kỳ/năm — `trang_thai` (cho_duyet/da_duyet/tu_choi/nhap), `gia_tri`, `gia_tri_luy_ke`. **`ghi_chu` LUÔN phải viết đầy đủ, tự-giải-thích** (dùng làm input cho AI soạn thảo sau này — xem quy tắc chi tiết ở `xu-ly-van-ban-den` Bước 6.e) |
| `phan_cong_cap_nhat` | Ai chịu trách nhiệm cập nhật số liệu nào, deadline nào |
| `so_lieu_theo_doi` | Người dùng "theo dõi" 1 số liệu (cá nhân, không phải nghiệp vụ) |

### 2.6 Nhóm báo cáo

| Bảng | Nội dung |
|---|---|
| `bao_cao` | Báo cáo tổng hợp (mẫu hoặc cá nhân) — kỳ/tháng/quý/năm, `trang_thai` (dang_soan/hoan_thanh/cho_duyet/da_duyet/tu_choi), có `noi_dung_ai` (nội dung AI hỗ trợ soạn) |
| `bao_cao_muc` | Mục/chương trong 1 báo cáo, phân cấp cha-con, gắn lĩnh vực |
| `bao_cao_item` | Từng dòng nội dung trong 1 mục — loại (chi_tieu/nhiem_vu/so_lieu/noi_dung_mem), trỏ tới `theo_doi_cd` hoặc `so_lieu` tương ứng |
| `bao_cao_phien_ban` | Lịch sử các phiên bản nội dung đã lưu của 1 báo cáo |

### 2.7 Nhóm Truyền thông số (TTSC — Zalo/Facebook)

| Bảng | Nội dung |
|---|---|
| `ttso_kenh_config` | Kênh Facebook/Zalo OA đã cấu hình (access token, chu kỳ chạy) |
| `ttso_ket_qua` | Số liệu kết quả (followers, post_count, zalo_followers) theo kỳ chạy tự động |
| `ttso_linh_vuc` | Lĩnh vực nội dung truyền thông số |
| `ttso_noi_dung` | Nội dung bài đăng — trạng thái (nhap/da_dang/loi), mô hình AI dùng soạn, kênh đăng |
| `ttso_noi_dung_phien_ban` | Lịch sử phiên bản nội dung 1 bài |

### 2.8 Nhóm dự toán kinh phí (dt_*)

| Bảng | Nội dung |
|---|---|
| `dt_cau_hinh` | Cấu hình chung (mã phường/xã, tên đơn vị hành chính) — chỉ 1 dòng |
| `dt_don_vi` | Đơn vị dự toán (hanh_chinh/su_nghiep/luc_luong_vu_trang/giao_duc), trạng thái thu thập dự toán |
| `dt_khoan_muc_pl1` | Chi tiết khoản mục chi thường xuyên theo Phụ lục 1 (nhóm hoạt động I-VII, mã lục ngân sách...) — hiện 0 dòng |
| `dt_nhiem_vu_pl2` | Nhiệm vụ đầu tư/chi theo Phụ lục 2 (chuyển tiếp/mở mới) — hiện 0 dòng |

### 2.9 Khác

| Bảng | Nội dung |
|---|---|
| `ai_cau_hinh` | Cấu hình model AI dùng trong Nexus (provider: gemini/openrouter/claude). ⚠ **`api_key` lưu dạng plain text** — cần migrate sang Supabase Vault hoặc cột chỉ service-role đọc được, chưa xử lý. |
| `cau_hinh_he_thong` | Cấu hình hệ thống dạng key-value (jsonb) |
| `huong_dan` | Nội dung hướng dẫn sử dụng app Nexus (phân cấp cha-con) |

---

## QUY TẮC GHI DỮ LIỆU — áp dụng mọi kho

Không lặp lại chi tiết ở đây — **luôn tuân theo quy tắc xác nhận trước khi
ghi** đã định nghĩa trong `xu-ly-van-ban-den` (đề xuất đầy đủ nội dung từng
trường, chờ Hiếu xác nhận rõ ràng, không tự suy đoán). Quy tắc đó áp dụng
đồng nhất cho Notion (Tbl_QLVB_ATĐ, TodoListATĐ) và Nexus (mọi bảng ở trên).

---

## LƯU Ý ĐẶC BIỆT

- Skill này là **bản đồ tra cứu**, không phải quy trình — khi thao tác thật
  (lưu văn bản, tạo việc, ghi kết quả Nexus), luôn dùng `xu-ly-van-ban-den`
  song song.
- Khi schema Nexus thay đổi (thêm/bớt bảng, đổi enum), cập nhật trực tiếp
  file này — không tạo skill riêng cho từng thay đổi nhỏ.
- Enum/lookup liệt kê ở đây chụp tại thời điểm 26/7/2026 — nếu nghi ngờ đã
  đổi, xác minh lại bằng `Supabase:list_tables` (project_id
  `zkgtrdrvlppyxusgzjnz`) trước khi tin.
