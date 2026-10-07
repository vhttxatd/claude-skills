# Nơi nhận và chữ ký

> **META** · cap_nhat: 2026-10-07 · nguon_su_that: quy ước thể thức văn bản hành chính của xã An Thới Đông · ra_soat_lai: 2027-10-06 · rui_ro: thap (bổ sung META 01/9/2026, nội dung CHƯA rà)

## Bảng 2 cột không viền

```
Tỉ lệ: 52% (trái — Nơi nhận) / 48% (phải — Chữ ký)
colSL = Math.round(contentW * 0.52)
colSR = contentW - colSL
(contentW = contentWidth(loai) — đã áp sẵn trong partials/signature.js)
Toàn bộ dùng sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.AUTO }  // AUTO, KHÔNG EXACT
```

---

## Cột trái — Nơi nhận

```
"Nơi nhận:"  — nghiêng đậm, 12pt (24 half-points), sp0
Các dòng     — 12pt, thụt trái 120 DXA, sp0
Mỗi dòng bắt đầu bằng "- "
Spacing mỗi dòng: after 40
```

### NƠI NHẬN VĂN BẢN DO UBND XÃ BAN HÀNH — QUY TẮC CHỐT 07/10/2026 (áp dụng mọi loại VB của UBND)

Dòng cố định, theo đúng thứ tự (code: `noiNhanUBND()` trong `partials/signature.js`; chữ lấy từ `NOI_NHAN_UBND` trong config):

| # | Dòng | Quy tắc |
|---|---|---|
| 1 | `- Như trên;` | VB có "Kính gửi" ở đầu (CV, TTr...). VB KHÔNG có "Kính gửi" → **đơn vị yêu cầu thực hiện VB này**, vd BC do Sở KHCN yêu cầu: `- Sở Khoa học và Công nghệ Thành phố (để báo cáo);`. VB chủ động, không ai yêu cầu → bỏ dòng 1 |
| 2 | `- Chủ tịch, các PCT UBND xã;` | Mặc định khi Hiếu không nói. Hiếu nói "Thường trực" → `- Thường trực UBND xã;` |
| 3 | cơ quan/đơn vị khác | Nếu có (vd `- Ban Chỉ đạo xã (để báo cáo);`) |
| 4 | `- Phòng Văn hóa - Xã hội;` | Đơn vị tham mưu; đổi theo đơn vị tham mưu thực tế |
| 5 | `- VP: CVP, PVP/TH;` | BẮT BUỘC, ngay trên dòng Lưu |
| 6 | `- Lưu: VT, VHXH-Hiếu.` | Luôn là dòng CUỐI (ký hiệu đơn vị soạn + người soạn) |

- Cơ quan/đơn vị nêu ở "Kính gửi" được **ưu tiên** ở đầu Nơi nhận qua dòng "Như trên" — không liệt kê lại từng đơn vị.
- Dùng code: `signatureBlock({ ..., noiNhan: [] })` (mặc định) hoặc `noiNhan: { donViYeuCau, lanhDao: 'thuongTruc', coQuanKhac: [...], thamMuu }`. Template tự truyền `ubnd` và `coKinhGui`.
- VB do Phòng/đơn vị trực thuộc ban hành (có `donViBanHanh`) KHÔNG áp bảng này, giữ quy ước riêng.

### Thứ tự nơi nhận cũ (chỉ còn giá trị tham khảo cho văn bản Đảng/liên cơ quan)
1. Cấp trên trực tiếp (Thường trực Đảng ủy xã, HĐND xã...)
2. Lãnh đạo cùng cấp (Thường trực UBND xã...)
3. Cơ quan ngang cấp liên quan (UBMTTQ Việt Nam xã...)
4. Đơn vị thực hiện (các phòng, trung tâm, đơn vị...)
5. Lưu: VT, [ký hiệu đơn vị soạn].

**Mẫu nơi nhận chuẩn (Kế hoạch UBND xã):**
```
- Thường trực Đảng ủy xã;
- Thường trực Hội đồng nhân dân xã;
- Ủy ban MTTQ Việt Nam xã;
- Thường trực Ủy ban nhân dân xã;
- Phòng Văn hóa - Xã hội;
- Phòng Kinh tế;
- Trung tâm Phục vụ HCC;
- Trung tâm Cung ứng DVC;
- Công an xã; Trạm Y tế xã;
- Các trường học trên địa bàn;
- Trưởng các ấp; Tổ CNSCĐ;
- VP: CVP, PVP/TH;
- Lưu: VT, VHXH.
```

---

## Cột phải — Chữ ký theo thẩm quyền

### UBND xã — Chủ tịch ký trực tiếp
```
TM. ỦY BAN NHÂN DÂN XÃ   ← đậm, 14pt, căn giữa, sp0
CHỦ TỊCH                  ← đậm, 14pt, căn giữa, sp0
[4 dòng trống]             ← sp0
Trần Hoàng Vũ             ← đậm, 14pt, căn giữa, sp0
```

### UBND xã — Phó Chủ tịch ký thay (KT.)
```
KT. CHỦ TỊCH              ← đậm, 14pt, căn giữa, sp0
PHÓ CHỦ TỊCH              ← đậm, 14pt, căn giữa, sp0
[4 dòng trống]
Nguyễn Minh Kha           ← đậm, 14pt (hoặc Phan Kim Anh tùy lĩnh vực)
```
⚠️ KHÔNG dùng "TL." (thừa lệnh) cho văn bản kế hoạch của UBND xã.

### Đảng ủy xã
```
T/M BAN CHẤP HÀNH ĐẢNG ỦY
BÍ THƯ
[4 dòng trống]
Cổ Thị Ngọc Điệp
```

### Ban Chỉ đạo xã
```
T/M BAN CHỈ ĐẠO
TRƯỞNG BAN
[4 dòng trống]
Cổ Thị Ngọc Điệp
```

### Hội đồng nhân dân xã
```
TM. HỘI ĐỒNG NHÂN DÂN XÃ
CHỦ TỊCH
[4 dòng trống]
Cổ Thị Ngọc Điệp
```

---

## Phân công ký theo lĩnh vực

| Văn bản về lĩnh vực | Người ký thay (KT.) |
|---|---|
| Kinh tế, hạ tầng, hành chính công | Phan Kim Anh |
| VH-XH, KH&CN, CĐS, giáo dục, y tế | Nguyễn Minh Kha |
| Chủ tịch ký trực tiếp | Trần Hoàng Vũ |

### Ký kế hoạch chuyên môn về KH&CN - ĐMST - CĐS

Các kế hoạch chuyên môn về lĩnh vực khoa học công nghệ, đổi mới sáng tạo và chuyển đổi số do **Phó Chủ tịch Nguyễn Minh Kha** ký thay. Mẫu chữ ký:

```
KT. CHỦ TỊCH
PHÓ CHỦ TỊCH
[4 dòng trống]
Nguyễn Minh Kha
```

> Không dùng "TM. ỦY BAN NHÂN DÂN XÃ / CHỦ TỊCH" cho các kế hoạch chuyên môn lĩnh vực này trừ khi có chỉ đạo khác.

---

## Chữ ký nhiều bên - vị trí cơ quan phát hành

> **QUY TẮC CỨNG (quyết định của Hiếu, 30/9/2026): cơ quan phát hành văn bản
> LUÔN Ở CỘT PHẢI CUỐI, trong mọi tình huống.**

Áp dụng cho biên bản và mọi văn bản có khối ký từ 2 cột trở lên. Một người ký
(công văn, kế hoạch, quyết định...) đã đúng quy tắc vì chữ ký nằm cột phải.

**Thứ tự cột từ trái sang phải:**

| Cột | Nội dung | Ví dụ (biên bản bàn giao) |
|---|---|---|
| Đầu (nếu có) | Người lập | NGƯỜI LẬP BIÊN BẢN / CHUYÊN VIÊN |
| Giữa | Các bên ký nhận, theo thứ tự truyền vào | ĐẠI DIỆN BÊN NHẬN / TRƯỞNG PHÒNG |
| **Cuối, bên phải** | **Cơ quan phát hành** | ĐẠI DIỆN BÊN GIAO / TRƯỞNG PHÒNG |

```
NGƯỜI LẬP BIÊN BẢN     ĐẠI DIỆN BÊN NHẬN      ĐẠI DIỆN BÊN GIAO
CHUYÊN VIÊN            TRƯỞNG PHÒNG           TRƯỞNG PHÒNG
[4 dòng trống]         [4 dòng trống]         [4 dòng trống]
Phan Trung Hiếu        Nguyễn Thị Linh Phương Nguyễn Văn Chính
```

**Kỹ thuật (đã có sẵn, không viết lại):**
- Gọi `chuKyNhieuBen({ nguoiLap, cacBenKy, coQuanPhatHanh })` trong
  `templates/partials/signature.js`. Hàm tự xếp `coQuanPhatHanh` vào cột cuối,
  người gọi không đảo được thứ tự. Thiếu `coQuanPhatHanh` → hàm ném lỗi.
- Các cột chia đều bề rộng. Bảng được nới ra ngoài lề 2 bên
  (`CHU_KY_NHIEU_BEN.moRongMoiBen` trong `config/config.js`) để nhãn 14pt như
  "NGƯỜI LẬP BIÊN BẢN" không vỡ dòng.
- Nhãn các cột có số dòng khác nhau (vd "KT. GIÁM ĐỐC / PHÓ GIÁM ĐỐC" 3 dòng so
  với 2 dòng) được đệm để họ tên các cột thẳng hàng.
- Hợp đồng và biên bản với nhà thầu: cơ quan (chủ đầu tư, Bên A) ở cột phải,
  nhà thầu (Bên B) ở cột trái.
