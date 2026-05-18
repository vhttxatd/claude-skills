# Phần tiêu đề văn bản

## Cấu trúc bảng tiêu đề 2 cột không viền

Tỉ lệ: **48% (trái) / 52% (phải)**
Toàn bộ dùng `sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT }`

```
colL = Math.round(9026 * 0.48) = 4332 DXA  (~7.64cm)
colR = 9026 - 4332             = 4694 DXA  (~8.28cm)
```

> **Lý do:** Cột trái phải đủ rộng để "ỦY BAN NHÂN DÂN / XÃ AN THỚI ĐÔNG" không bị rớt chữ xuống dòng thêm. Tỉ lệ 48/52 đảm bảo cả 2 cột vừa đẹp.

### Cột trái (căn giữa)

| Dòng | Nội dung | Định dạng |
|---|---|---|
| 1 | ỦY BAN NHÂN DÂN | Đậm, 14pt, sp0 |
| 2 | XÃ AN THỚI ĐÔNG | Đậm, 14pt, sp0 |
| 3 | Số:      /KH-UBND | 14pt, sp0 |
| 4 | ——————————————— | Đậm, 6pt, sp0 |

⚠️ KHÔNG gộp dòng 1+2 thành 1 dòng. KHÔNG dùng `\n`.

**Ký hiệu số theo loại văn bản:**
| Loại | Ký hiệu |
|---|---|
| Kế hoạch UBND | /KH-UBND |
| Báo cáo UBND | /BC-UBND |
| Công văn UBND | /CV-UBND |
| Tờ trình UBND | /TTr-UBND |
| Quyết định UBND | /QĐ-UBND |
| Thông báo UBND | /TB-UBND |
| Kế hoạch Đảng ủy | /KH-ĐU |
| Kế hoạch Ban Chỉ đạo | /KH-BCĐ |

### Cột phải (căn giữa)

| Dòng | Nội dung | Định dạng |
|---|---|---|
| 1 | CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM | Đậm, 14pt, sp0 |
| 2 | Độc lập - Tự do - Hạnh phúc | Đậm, 14pt, sp0 |
| 3 | ——————————————— | Đậm, 6pt, sp0 |
| 4 | An Thới Đông, ngày     tháng     năm 20.. | Nghiêng, 14pt, sp0 |

---

## Tên loại văn bản (căn giữa, sau bảng tiêu đề)

```
"KẾ HOẠCH"    — đậm, 16pt (32 half-points), căn giữa
"BÁO CÁO"     — đậm, 16pt
"CÔNG VĂN"    — đậm, 16pt
"TỜ TRÌNH"    — đậm, 16pt
"QUYẾT ĐỊNH"  — đậm, 16pt
"THÔNG BÁO"   — đậm, 16pt
```

## Trích yếu (tên văn bản đầy đủ)

- Căn giữa, đậm, 14pt
- Có thể xuống nhiều dòng
- Kết thúc bằng dấu chấm (.) — **chỉ với Kế hoạch**; không dấu với các loại khác

## Dấu gạch ngang "———"

Dùng ký tự `———————————————` (15 dấu), font Times New Roman, **6pt**, **đậm**, căn giữa.

Xuất hiện tại 3 vị trí:
1. Dưới "Số: /KH-UBND" (cột trái)
2. Dưới "Độc lập - Tự do - Hạnh phúc" (cột phải)
3. Dưới trích yếu — dùng `—————————————` (13 dấu, ngắn hơn ~2 ký tự)

Spacing dấu gạch dưới trích yếu: `after: 160` (khoảng cách trước phần căn cứ)
