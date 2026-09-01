# Phần tiêu đề văn bản

## Cấu trúc bảng tiêu đề 2 cột không viền

Tỉ lệ cột và spacing được cài đặt sẵn trong `templates/partials/header-table.js`
— không cấu hình lại ở nơi khác. Toàn bộ ô dùng
`sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT }`.

### Cột trái (căn giữa)

| Dòng | Nội dung | Định dạng |
|---|---|---|
| 1 | ỦY BAN NHÂN DÂN | Đậm, 14pt, sp0 |
| 2 | XÃ AN THỚI ĐÔNG | Đậm, 14pt, sp0 |
| 3 | Số:      /KH-UBND | 14pt, sp0 |
| 4 | divider('coQuan') | Thông số lấy từ `DIVIDER` trong config |

⚠️ KHÔNG gộp dòng 1+2 thành 1 dòng. KHÔNG dùng `\n`.

**Khi đơn vị trực thuộc tự ban hành văn bản** (Phòng VH-XH, Phòng Kinh tế...):
dòng 1 là tên chủ quản dạng **VIẾT TẮT** `UBND XÃ AN THỚI ĐÔNG`, dòng 2 là tên
đơn vị. KHÔNG viết đầy đủ "ỦY BAN NHÂN DÂN XÃ AN THỚI ĐÔNG" (vỡ dòng ở 14pt).
Cách gọi đúng — truyền mã đơn vị, không gõ tay tên cơ quan:

```javascript
mauBaoCao({ donViBanHanh: 'VHXH', ... })   // tự lấy tên + ký hiệu từ config
```

**Ký hiệu số theo loại văn bản:**
| Loại | Ký hiệu |
|---|---|
| Kế hoạch UBND | /KH-UBND |
| Báo cáo UBND | /BC-UBND |
| Công văn (mọi cấp) | /[Đơn vị] — **KHÔNG có chữ CV**, VD: `15/VHXH`, `3085/UBND`, `5722/CQTT` |
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
| 3 | divider('quocHieu') | Thông số lấy từ `DIVIDER` trong config |
| 4 | An Thới Đông, ngày     tháng     năm 20.. | Nghiêng, 14pt, sp0 |

---

## Tên loại văn bản (căn giữa, sau bảng tiêu đề)

Đậm, **14pt (TRANG.BODY)**, in hoa, căn giữa — do `partials/title-block.js`
dựng tự động từ `TEN_LOAI` trong config. KHÔNG đặt cỡ chữ khác cho tên loại.

## Trích yếu (tên văn bản đầy đủ)

- Căn giữa, đậm, 14pt
- Có thể xuống nhiều dòng
- Kết thúc bằng dấu chấm (.) — **chỉ với Kế hoạch**; không dấu với các loại khác

## Dấu gạch ngang divider

> Nguồn duy nhất: khối `DIVIDER` trong `templates/config/config.js`.
> Xem `references/dau-cau.md` mục "Dấu gạch ngang divider" để biết cách gọi.
