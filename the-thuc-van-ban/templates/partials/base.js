/**
 * partials/base.js - HÀM TIỆN ÍCH CỐT LÕI
 * =========================================
 * Mọi partials khác và templates đều import từ đây.
 */

const {
  Paragraph, TextRun, AlignmentType, BorderStyle, LineRuleType,
  HeadingLevel,
} = require('docx');

const { TRANG } = require('../config/config');

const { BODY, SMALL, INDENT } = TRANG;

// Spacing = 0 tuyệt đối (dùng trong bảng tiêu đề, chữ ký)
const sp0 = { before: 0, after: 0, line: 240, lineRule: LineRuleType.EXACT };

// Border
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder, bottom: noBorder, left: noBorder,
  right: noBorder, insideH: noBorder, insideV: noBorder,
};
const solidBorder = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const solidBorders = {
  top: solidBorder, bottom: solidBorder,
  left: solidBorder, right: solidBorder,
  insideH: solidBorder, insideV: solidBorder,
};

/** TextRun cơ bản — font TNR mặc định */
function r(text, opts = {}) {
  return new TextRun({
    text,
    font: "Times New Roman",
    bold: opts.bold || false,
    italics: opts.italic || false,
    size: opts.size || BODY,
    color: opts.color || undefined,
  });
}

/** Paragraph thân văn bản (có thụt đầu dòng, justify) */
function bp(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.JUSTIFIED,
    spacing: {
      before: opts.before ?? 0,
      after: opts.after ?? 100,
      line: opts.line || 276,
    },
    indent: opts.noIndent ? undefined : { firstLine: INDENT },
    pageBreakBefore: opts.pageBreak || false,
    children: typeof text === 'string'
      ? [r(text, { size: BODY, bold: opts.bold, italic: opts.italic })]
      : text,
  });
}

/** Paragraph trong ô bảng tiêu đề (spacing = 0, căn giữa) */
function cellP(text, opts = {}) {
  return new Paragraph({
    alignment: opts.align || AlignmentType.CENTER,
    spacing: sp0,
    children: typeof text === 'string'
      ? [r(text, {
          bold: opts.bold, italic: opts.italic,
          size: opts.size || BODY,
        })]
      : text,
  });
}

/** Dòng trống */
function emp(n = 1) {
  return Array(n).fill(null).map(() =>
    new Paragraph({
      spacing: { before: 0, after: 0, line: 200 },
      children: [r("", { size: BODY })],
    })
  );
}

/** Divider ký tự `-` lặp (theo quy-tac-chung và the-thuc-van-ban) */
function divider(length = 20, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: opts.after ?? 0, line: 240, lineRule: LineRuleType.EXACT },
    children: [r("-".repeat(length), { bold: true, size: 16 })],  // 8pt = 16 half-points
  });
}

/** Heading cấp 1 (I., II., III.) */
function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [r(text, { bold: true, size: BODY })],
  });
}

/** Heading cấp 2 (1., 2., 3.) */
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [r(text, { bold: true, size: BODY })],
  });
}

/** Heading cấp 3 (a), b), c) - in nghiêng) */
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [r(text, { bold: true, italic: true, size: BODY })],
  });
}

/** Điều khoản trong Quyết định: "Điều X. ..." */
function dieu(soDieu, noiDung) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 120, after: 100, line: 276 },
    indent: { firstLine: INDENT },
    children: [
      r(`Điều ${soDieu}. `, { bold: true, size: BODY }),
      r(noiDung, { size: BODY }),
    ],
  });
}

module.exports = {
  sp0, noBorder, noBorders, solidBorder, solidBorders,
  r, bp, cellP, emp, divider,
  h1, h2, h3, dieu,
};
