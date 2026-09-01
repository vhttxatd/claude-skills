# Code docx-js mẫu hoàn chỉnh

## Setup chuẩn

```javascript
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, VerticalAlign, HeadingLevel,
  Header, PageNumber, LineRuleType
} = require('docx');

// Hằng số trang A4
const W = 11906, marginL = 1800, marginR = 1080;
const { contentWidth } = require('./config/config');
const contentW = contentWidth(loai);   // tự đúng theo lề của từng loại VB
const BODY = 28;   // 14pt
const SMALL = 24;  // 12pt
const INDENT = 720; // Thụt đầu dòng

// Spacing = 0 tuyệt đối (tiêu đề, chữ ký)
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT };

// Border
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder,
                    right: noBorder, insideH: noBorder, insideV: noBorder };
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const solidBorders = { top: solidBorder, bottom: solidBorder,
                       left: solidBorder, right: solidBorder };
```

---

## Hàm tiện ích

```javascript
// TextRun cơ bản
function r(text, opts = {}) {
  return new TextRun({
    text, font: "Times New Roman",
    bold: opts.bold || false,
    italics: opts.italic || false,
    size: opts.size || BODY,
    color: opts.color || undefined,
  });
}

// Paragraph thân văn bản (có thụt đầu dòng)
function bp(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: { before: opts.before || 0, after: opts.after || 100, line: 276 },
    indent: opts.noIndent ? undefined : { firstLine: INDENT },
    pageBreakBefore: opts.pageBreak || false,
    children: typeof text === 'string'
      ? [r(text, { size: BODY, bold: opts.bold, italic: opts.italic })]
      : text
  });
}

// Paragraph trong bảng tiêu đề (spacing = 0)
function cellP(text, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: sp0,
    children: typeof text === 'string'
      ? [new TextRun({ text, bold: opts.bold||false, italics: opts.italic||false,
          size: opts.size || BODY, font: "Times New Roman" })]
      : text
  });
}

// Dòng trống
function emp(n = 1) {
  return Array(n).fill(null).map(() =>
    new Paragraph({ spacing: { before: 0, after: 0, line: 200 },
                    children: [r("", { size: BODY })] })
  );
}

// Dấu gạch ngang ———
function dash(short = false) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 20, after: short ? 160 : 20, line: 240 },
    children: [r(short ? "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014"
                       : "\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014",
               { bold: true, size: 12 })]
  });
}

// Heading
function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1,
    children: [r(text, { bold: true, size: BODY })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2,
    children: [r(text, { bold: true, size: BODY })] });
}
function h3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3,
    children: [r(text, { bold: true, italic: true, size: BODY })] });
}
```

---

## Bảng tiêu đề đầu văn bản

> **KHÔNG viết lại code bảng tiêu đề ở đây.** Dùng
> `headerTable()` trong `templates/partials/header-table.js`.
>
> Bảng này được nới rộng ra ngoài lề 2 bên (thụt âm) để dòng
> "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" nằm trọn 1 dòng ở cỡ chữ 14pt.
> Bề rộng nới thêm và tỷ lệ 2 cột lấy từ khối `BANG_TIEU_DE` trong
> `config/config.js` (`moRongMoiBen`, `tyLeCotTrai`) — muốn chỉnh thì sửa
> đúng 1 chỗ đó, mọi loại văn bản tự cập nhật.

```javascript
headerTable({ loai: 'BC', so, nam, ngay, thang })                 // UBND xã ban hành
headerTable({ loai: 'BC', so, nam, ngay, thang, donViBanHanh: 'VHXH' })  // Phòng ban hành
```

## Template nơi nhận + chữ ký

```javascript
const colSL = Math.round(contentW * 0.52); // 4694
const colSR = contentW - colSL;             // 4332

// Danh sách nơi nhận (tùy chỉnh theo văn bản)
const noiNhan = [
  "- Thường trực Đảng ủy xã;",
  "- Thường trực Hội đồng nhân dân xã;",
  "- Ủy ban MTTQ Việt Nam xã;",
  "- Thường trực Ủy ban nhân dân xã;",
  "- [Các đơn vị thực hiện];",
  "- VP: CVP, PVP/TH;",
  "- Lưu: VT, [Ký hiệu đơn vị soạn].",
];

const sigTable = new Table({
  width: { size: contentW, type: WidthType.DXA },
  columnWidths: [colSL, colSR],
  borders: noBorders,
  rows: [new TableRow({ children: [
    new TableCell({ borders: noBorders, children: [
      new Paragraph({ alignment: AlignmentType.LEFT, spacing: sp0,
        children: [r("Nơi nhận:", { bold: true, italic: true, size: SMALL })] }),
      ...noiNhan.map(l => new Paragraph({
        alignment: AlignmentType.LEFT, spacing: { ...sp0, after: 40 },
        indent: { left: 120 },
        children: [r(l, { size: SMALL })]
      }))
    ]}),
    new TableCell({ borders: noBorders, children: [
      // Chọn 1 trong 2 mẫu bên dưới:

      // --- Chủ tịch ký ---
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
        children: [r("TM. ỦY BAN NHÂN DÂN XÃ", { bold: true })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
        children: [r("CHỦ TỊCH", { bold: true })] }),

      // --- KT. Chủ tịch ký thay ---
      // new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
      //   children: [r("KT. CHỦ TỊCH", { bold: true })] }),
      // new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
      //   children: [r("PHÓ CHỦ TỊCH", { bold: true })] }),

      ...emp(4),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
        children: [r("Trần Hoàng Vũ", { bold: true })] }),
        // Hoặc: "Nguyễn Minh Kha" / "Phan Kim Anh"
    ]}),
  ]})]
});
```

---

## Template Document hoàn chỉnh

```javascript
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: BODY } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: BODY, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 160, after: 80, line: 276 },
                     indent: { firstLine: INDENT }, outlineLevel: 0 }},
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal",
        run: { size: BODY, bold: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 120, after: 60, line: 276 },
                     indent: { firstLine: INDENT }, outlineLevel: 1 }},
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal",
        run: { size: BODY, bold: true, italics: true, font: "Times New Roman", color: "000000" },
        paragraph: { spacing: { before: 100, after: 60, line: 276 },
                     indent: { firstLine: INDENT }, outlineLevel: 2 }},
    ]
  },
  sections: [{
    properties: {
      titlePage: true,
      page: {
        size: { width: W, height: 16838 },
        margin: { top: 1134, right: marginR, bottom: 1134, left: marginL }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: sp0,
          children: [new TextRun({ children: [PageNumber.CURRENT],
                                   size: SMALL, font: "Times New Roman" })]
        })]
      }),
      first: new Header({ children: [new Paragraph({ children: [] })] })
    },
    children: [
      headerTable,
      // ... nội dung văn bản
      sigTable,
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  require('fs').writeFileSync('output.docx', buf);
});
```

---

## Lưu ý quan trọng

- **WidthType.DXA** — luôn dùng, KHÔNG dùng PERCENTAGE (vỡ layout trong Google Docs)
- **Ngoặc kép** — dùng `\u201c` và `\u201d`, KHÔNG dùng `\"` (thành dấu thẳng)
- **Dấu gạch ngang** — dùng ký tự `\u2014` (em-dash dạng ngắn) khi tạo chuỗi "———"
- **Tên đơn vị** — KHÔNG gộp "ỦY BAN NHÂN DÂN XÃ AN THỚI ĐÔNG" thành 1 dòng
- **Tables** — luôn có cả `columnWidths` trên Table VÀ `width` trên từng Cell
- **PageBreak** — đặt `pageBreakBefore: true` trên Paragraph đầu tiên của trang mới

---

## Hàm tiện ích — Bảng trong Quyết định

> Dùng cho tất cả QĐ có bảng danh mục (Phòng VH-XH hoặc UBND xã).

```javascript
// Bảng QĐ luôn rộng bằng đúng contentWidth('QD')
const thinB = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const allB = { top: thinB, bottom: thinB, left: thinB, right: thinB, insideH: thinB, insideV: thinB };

// Ô tiêu đề cột (header)
const qd_th = (text, w) => new TableCell({
  borders: allB, width: { size: w, type: WidthType.DXA },
  verticalAlign: VerticalAlign.CENTER,
  shading: { fill: 'D9D9D9', type: ShadingType.CLEAR },
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp0,
    children: [r(text, { bold: true })] })]
});

// Ô dữ liệu (CENTER mặc định)
const qd_td = (children, w, align=AlignmentType.CENTER) => new TableCell({
  borders: allB, width: { size: w, type: WidthType.DXA },
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: Array.isArray(children) ? children
    : [new Paragraph({ alignment: align, spacing: sp0, children: [r(children)] })]
});

// Ô nội dung danh mục (LEFT, có indent nhỏ)
const qd_item = (text, w) => new TableCell({
  borders: allB, width: { size: w, type: WidthType.DXA },
  verticalAlign: VerticalAlign.CENTER,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [new Paragraph({ alignment: AlignmentType.LEFT, spacing: sp0,
    indent: { left: 60 }, children: [r(text)] })]
});

// Phân bổ cột chuẩn 5 cột (STT, Danh mục, ĐVT, SL, Ghi chú) — tổng = contentW
const QD_COL5 = { w1: 500, w2: 4526, w3: 1200, w4: 900, w5: 1900 };

// Phân bổ cột chuẩn 6 cột (STT, Danh mục, ĐVT, SL, Đơn giá, Thành tiền) — tổng = contentW
const QD_COL6 = { w1: 500, w2: 3500, w3: 1000, w4: 800, w5: 1500, w6: 1726 };
```
