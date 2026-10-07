# Phần nội dung văn bản

> **META** · cap_nhat: 2026-10-07 · nguon_su_that: quy ước thể thức văn bản hành chính của xã An Thới Đông · ra_soat_lai: 2027-09-01 · rui_ro: thap (bổ sung META 01/9/2026, nội dung CHƯA rà)

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

## Chú thích cuối trang (footnote) — quy ước Hiếu

- Số hiệu/chi tiết văn bản dẫn chiếu phụ và danh sách TỪ 4 MỤC TRỞ LÊN: thân văn bản chỉ nêu ý chung, chi tiết dồn xuống footnote.
- Code: `chuThich(1, 'Kế hoạch số ... ; Nghị quyết số ...')` rồi viết `[^1]` ngay sau chữ cần chú thích (vd "...từ 12 ấp.[^1]"). Thiếu `chuThich` → báo lỗi.
- Trích yếu của văn bản luôn kết thúc bằng dấu chấm (`titleBlock` tự thêm).
- ⚠️ Khi đọc Google Doc để dựng lại/soạn tiếp: `read_file_content` KHÔNG hiện footnote. Phải đọc thêm bản
  `download_file_content` với `exportMimeType: text/markdown` (nội dung trả về dạng base64, giải mã UTF-8) để thấy `[^n]:`.

## Mở đầu báo cáo (không có "Kính gửi") — Hiếu chốt 07/10/2026

```
Thực hiện Công văn số 10613/SKHCN-KTSXHS ngày 28 tháng 9 năm 2026 của Sở Khoa học và Công nghệ về [trích yếu].   ← 1 VB: dấu chấm
(nhiều VB: mỗi VB một đoạn, kết thúc ";" — VB cuối kết thúc ".")
Ủy ban nhân dân xã An Thới Đông báo cáo ..., cụ thể như sau:                                                   ← xuống dòng, đoạn riêng
```
Code: `...moDauBaoCao({ canCu: [...], noiDung: 'báo cáo ..., cụ thể như sau:', guiNgoai: true })`.
Quy tắc ghi văn bản dẫn chiếu (lần đầu đủ, lần sau rút gọn) và tên "xã An Thới Đông" vs "xã": `quy-tac-chung/data/quy-tac-soan-thao.md` mục 1, 1b.

## Văn bản chỉ có MỘT cấp mục — dùng chữ thường + số in đậm (Hiếu chốt 07/10/2026)

Khi nội dung chỉ cần 1 cấp mục (công văn chỉ đạo của UBND, thông báo, giấy mời, tờ trình ngắn...) thì KHÔNG dùng
Heading (h1/h2). Dùng đoạn văn thường, số thứ tự in đậm (code: `mucSo()`, `gach()` trong `partials/base.js`):

```
**1. Giao Phòng Văn hóa - Xã hội:**          ← mucSo(1, '...:', { kieu: 'tieuDe' }) — cả dòng đậm, tiêu đề kết thúc ":"
- nội dung 1;                                 ← gach('...')
- nội dung 2.
**2.** Giao Công an xã thực hiện ... (cả đoạn)  ← mucSo(2, '...')  — chỉ số "2." đậm, nội dung nối liền
```
- Mục có nhiều ý con → kiểu `tieuDe` + gạch đầu dòng; mục chỉ 1 đoạn văn → kiểu `doan`.
- Văn bản có từ 2 cấp mục trở lên (KH, BC, QĐ, TTr dài) giữ h1..h4 như trên.

## Dẫn chiếu văn bản: GẮN LINK VÀO SỐ KÝ HIỆU (Hiếu chốt 07/10/2026)

Mọi lần nhắc một văn bản trong thân (căn cứ, câu mở, nội dung giao việc, "Kính gửi") phải gắn hyperlink tới file Drive
của văn bản đó, **chỉ vào phần SỐ**, giữ nguyên chữ để in giấy không mất nội dung:
`Kế hoạch số [63](https://drive.google.com/...)/KHPH-MTTQ-UBND ngày 28/9/2026` (cùng quy ước với cột Nội dung VB ở Notion).
- Lấy link: tra `Tbl_QLVB_ATĐ` (Notion) theo số ký hiệu, lấy trường `Link` (chỉ lấy đường dẫn, không đọc nội dung file).
- Chưa tìm thấy file/link: để nguyên chữ, truyền `{ noLink: true }`, và BÁO Hiếu văn bản nào chưa có link.
- Code tự nhận cú pháp `[số](url)` trong `bp`, `canCuBlock`, `kinhGuiBlock`, `mucSo`, `lietKe`; tự cảnh báo khi gặp "số X/KÝ-HIỆU" chưa có link;
  `scripts/kiem-tra-the-thuc.js` cũng cảnh báo trên file đã xuất. Số ký hiệu trong bảng tiêu đề: dùng `soLink` (chỉ khi đã có số chính thức).

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
