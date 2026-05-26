# Cài đặt trang và định dạng cơ bản

## Trang A4

```
Khổ giấy : A4 — width: 11906 DXA, height: 16838 DXA
contentW : 11906 - marginL - marginR = 9026 DXA
```

## Lề theo loại văn bản

| Loại văn bản | Lề trái | Lề phải | Lề trên | Lề dưới |
|---|---:|---:|---:|---:|
| **Báo cáo (BC)** | 1800 DXA (3.17cm) | 900 DXA (1.59cm) | 1000 DXA (~1.76cm) | 1000 DXA |
| **Kế hoạch (KH), QĐ, CV, TTr** | 1800 DXA (3.17cm) | 1080 DXA (1.9cm) | 1134 DXA (~2cm) | 1134 DXA |

> Báo cáo dùng lề phải hẹp hơn và lề trên/dưới nhỏ hơn để vừa trang.

## Font và cỡ chữ

| Vị trí | Font | Cỡ | Half-points |
|---|---|---:|---:|
| Toàn bộ thân văn bản | Times New Roman | 14pt | 28 |
| Tiêu đề "KẾ HOẠCH" / "BÁO CÁO"... | Times New Roman | 16pt | 32 |
| Trích yếu / tiêu đề phụ | Times New Roman | 14pt | 28 |
| Heading cấp I, II, III trong thân văn bản | Times New Roman | 14pt | 28 |
| Nơi nhận — dòng header "Nơi nhận:" | Times New Roman | 12pt | 24 |
| Nơi nhận — dòng đơn vị | Times New Roman | 11pt | 22 |
| Dấu gạch ngang divider | Times New Roman | 8pt | 16 |
| Số trang | Times New Roman | 12pt | 24 |
| Tiêu đề phụ lục một dòng | Times New Roman | 14pt | 28 |
| Dòng kèm theo phụ lục | Times New Roman | 13pt | 26 |
| Bảng phụ lục — header | Times New Roman | 13pt | 26 |
| Bảng phụ lục — dữ liệu | Times New Roman | 13pt | 26 |

## Line spacing và paragraph spacing theo loại văn bản

### Báo cáo hành chính (BC)
```javascript
// Thân văn bản
spacing: { line: 240, before: 120, after: 120 }  // dòng đơn, 6pt trên/dưới

// Tiêu đề, chữ ký, nơi nhận
spacing: { line: 240, before: 0, after: 0 }

// Heading các cấp
spacing: { line: 240, before: 120, after: 120 }
```

### Kế hoạch, Quyết định, Công văn, Tờ trình (KH/QĐ/CV/TTr)
```javascript
// Thân văn bản
spacing: { before: 0, after: 100, line: 276 }  // ~1.15 lines

// Tiêu đề, chữ ký — sp0
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT }

// Heading 1
spacing: { before: 160, after: 80, line: 276 }
// Heading 2
spacing: { before: 120, after: 60, line: 276 }
// Heading 3
spacing: { before: 100, after: 60, line: 276 }

// Phụ lục, bảng phụ lục
spacing: { before: 0, after: 0, line: 240 }  // single
```

## Thụt đầu dòng (dùng cho cả 2 loại)

```javascript
indent: { firstLine: 720 }  // ~1.27cm — thân văn bản, căn cứ, heading, gạch đầu dòng
// KHÔNG dùng { left: 360, hanging: 360 } — dòng gạch đầu dòng dùng firstLine:720 giống thân văn bản
```

## Heading (paragraphStyles)

> **QUY TẮC CHUNG cho mọi heading trong thân văn bản:**
> - Phải dùng đúng **Heading Level** để Word/AI nhận diện cấu trúc văn bản.
> - `alignment: AlignmentType.JUSTIFIED` — căn đều hai bên như đoạn văn thường, không căn giữa.
> - `indent: { firstLine: 720 }` — thụt đầu dòng 720 DXA đồng bộ với thân văn bản.
> - `bold: true` — đậm cho tất cả level.
> - Heading 3, 4 của KH/QĐ/CV/TTr thêm `italics: true` nếu là mục con dạng a), b), c).
>
> **Quy tắc cấp heading trong kế hoạch:**
> - `I. MỤC ĐÍCH, YÊU CẦU`, `II. MỤC TIÊU`, `III. NHIỆM VỤ...` → **Heading Level 1**.
> - `1. Mục đích`, `2. Yêu cầu`, `1. Mục tiêu tổng quát` → **Heading Level 2**.
> - `a) ...`, `b) ...` hoặc mục con sâu hơn → **Heading Level 3** hoặc thấp hơn.
> - Không dùng paragraph thường để giả lập heading.

### Dùng cho Báo cáo (line=240, spacing đều 120/120)
```javascript
paragraphStyles: [
  { id:'Heading1', run:{ bold:true, size:28, font:'Times New Roman' },
    paragraph:{ spacing:{line:240,before:120,after:120}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:0 }},
  { id:'Heading2', run:{ bold:true, size:28, font:'Times New Roman' },
    paragraph:{ spacing:{line:240,before:120,after:120}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:1 }},
  { id:'Heading3', run:{ bold:true, size:28, font:'Times New Roman' },
    paragraph:{ spacing:{line:240,before:120,after:120}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:2 }},
  { id:'Heading4', run:{ bold:true, italics:true, size:28, font:'Times New Roman' },
    paragraph:{ spacing:{line:240,before:120,after:120}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:3 }},
]
```

### Dùng cho Kế hoạch (line=276, spacing bất đối xứng)
```javascript
paragraphStyles: [
  { id:'Heading1', run:{ bold:true, size:28, font:'Times New Roman', color:'000000' },
    paragraph:{ spacing:{line:276,before:160,after:80}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:0 }},
  { id:'Heading2', run:{ bold:true, size:28, font:'Times New Roman', color:'000000' },
    paragraph:{ spacing:{line:276,before:120,after:60}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:1 }},
  { id:'Heading3', run:{ bold:true, italics:true, size:28, font:'Times New Roman', color:'000000' },
    paragraph:{ spacing:{line:276,before:100,after:60}, indent:{firstLine:720},
                alignment: AlignmentType.JUSTIFIED, outlineLevel:2 }},
]
```

### Ví dụ dùng docx-js cho Heading trong kế hoạch

```javascript
new Paragraph({
  heading: HeadingLevel.HEADING_1,
  alignment: AlignmentType.JUSTIFIED,
  indent: { firstLine: 720 },
  spacing: { before: 160, after: 80, line: 276 },
  children: [new TextRun({ text: 'I. MỤC ĐÍCH, YÊU CẦU', bold: true, size: 28, font: 'Times New Roman' })]
})

new Paragraph({
  heading: HeadingLevel.HEADING_2,
  alignment: AlignmentType.JUSTIFIED,
  indent: { firstLine: 720 },
  spacing: { before: 120, after: 60, line: 276 },
  children: [new TextRun({ text: '1. Mục đích', bold: true, size: 28, font: 'Times New Roman' })]
})
```
