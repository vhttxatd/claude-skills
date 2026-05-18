# Nơi nhận và chữ ký

## Bảng 2 cột không viền

```
Tỉ lệ: 52% (trái — Nơi nhận) / 48% (phải — Chữ ký)
colSL = Math.round(9026 * 0.52) = 4694 DXA
colSR = 9026 - 4694 = 4332 DXA
Toàn bộ dùng sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT }
```

---

## Cột trái — Nơi nhận

```
"Nơi nhận:"  — nghiêng đậm, 12pt (24 half-points), sp0
Các dòng     — 12pt, thụt trái 120 DXA, sp0
Mỗi dòng bắt đầu bằng "- "
Spacing mỗi dòng: after 40
```

**Thứ tự nơi nhận (từ trên xuống):**
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
