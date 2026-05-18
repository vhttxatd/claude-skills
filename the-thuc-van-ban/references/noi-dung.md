# Phần nội dung văn bản

## Phần căn cứ

```
Font      : Times New Roman, 14pt
Chữ       : Thường (không đậm, không nghiêng)
Căn lề    : Căn đều 2 bên (JUSTIFIED)
Thụt đầu  : firstLine 720 DXA
Spacing   : after 80 (giữa các căn cứ)
            after 200 (sau câu kết "...như sau:")
```

**Quy tắc dấu câu phần căn cứ:**
- Mỗi căn cứ kết thúc bằng dấu `;`
- Căn cứ CUỐI CÙNG kết thúc bằng dấu `,`
- Câu kết: `"...[Tên đơn vị] ban hành [Loại văn bản]... như sau:"`

**Thứ tự căn cứ (từ cao xuống thấp):**
1. Luật, Nghị quyết Quốc hội
2. Nghị quyết, Chỉ thị của Đảng (Bộ Chính trị, BCH TW)
3. Nghị định, Quyết định Chính phủ / Thủ tướng
4. Văn bản cấp Bộ
5. Văn bản Thành ủy / UBND Thành phố
6. Văn bản Ban Chỉ đạo Thành phố
7. Văn bản Đảng ủy xã / Ban Chỉ đạo xã (căn cứ trực tiếp nhất)

---

## Thân văn bản

```javascript
// Đoạn văn thông thường
{
  alignment: AlignmentType.JUSTIFIED,
  spacing: { before: 0, after: 100, line: 276 },
  indent: { firstLine: 720 },
}
```

**Hệ thống số thứ tự 4 tầng:**
```
I. TÊN PHẦN LỚN         ← Heading 1, La Mã, IN HOA, đậm
   1. Tên mục           ← Heading 2, số Ả Rập, đậm
      1.1. Tên mục con  ← Heading 3, số thập phân, đậm nghiêng
           a) Tiểu mục  ← Paragraph thường, chữ thường
```

**Nguyên tắc văn xuôi:** Nhiều nội dung tương đồng → gom 1 đoạn văn, KHÔNG liệt kê dấu chấm đầu dòng.

**Quy tắc gạch đầu dòng (khi buộc phải liệt kê):**
Khi liệt kê bằng gạch đầu dòng (dấu `-`), dòng bắt đầu bằng `-` cũng phải **thụt đầu dòng firstLine 720 DXA** như đoạn văn xuôi, để đồng bộ định dạng toàn văn bản. KHÔNG để dấu `-` sát lề trái.

```javascript
// Đoạn gạch đầu dòng - CÙNG indent với văn xuôi
{
  alignment: AlignmentType.JUSTIFIED,
  spacing: { before: 0, after: 100, line: 276 },
  indent: { firstLine: 720 },  // ← GIỮ NGUYÊN như đoạn văn
}
```

Áp dụng cho mọi loại văn bản: CV, BC, KH, TTr, QĐ, BB, GM.

---

## Đoạn kết văn bản

Kết thúc bằng `./.` ở cuối câu cuối cùng:
> `"...để xem xét, giải quyết./."`

Spacing: `after: 200` trước bảng nơi nhận + chữ ký.

---

## Ghi chú phụ lục (nghiêng, cuối Phần II)

```
"(Chi tiết phân công thực hiện các nhiệm vụ trên được trình bày tại Phụ lục đính kèm Kế hoạch này)"
```
Font: nghiêng, 14pt, thụt đầu dòng.


### QUY TẮC DẪN CHIẾU VĂN BẢN — THÔNG TIN ĐẦY ĐỦ

Khi cần dẫn chiếu một văn bản mà thiếu bất kỳ thông tin nào trong 4 yếu tố:
**(1) Số/ký hiệu — (2) Ngày ban hành — (3) Cơ quan ban hành — (4) Trích yếu**

Dừng lại, hỏi người dùng ngay:
> "Văn bản [tên] thiếu [thông tin còn thiếu]. Anh/chị cung cấp để tôi điền vào luôn,
> hoặc tôi để trống với dấu [...] để cập nhật sau?"

KHÔNG được tự bịa hoặc để trống mà không báo.
Nếu người dùng chọn để sau: dùng ký hiệu [...] thay cho phần thiếu.

Ví dụ dung:
- Đầy đủ: Công văn số 4800/SKHCN-KTSXHS ngày 15 tháng 10 năm 2025 của Sở Khoa học
  và Công nghệ về kiện toàn Tổ Công nghệ số cộng đồng.
- Thiếu ngày: Công văn số 4800/SKHCN-KTSXHS ngày [...] của Sở Khoa học và Công nghệ
  về kiện toàn Tổ Công nghệ số cộng đồng.
