/**
 * partials/document-builder.js - FACTORY TẠO DOCUMENT
 * =====================================================
 * Gộp page setup + headers/footers + styles vào 1 Document.
 */

const { Document } = require('docx');
const { pageProperties, pageNumbering } = require('./page-setup');
const { getDinhDang, TRANG } = require('../config/config');

function buildDocument(loai, children) {
  const dd = getDinhDang(loai);
  const pageNum = pageNumbering(loai);

  return new Document({
    styles: {
      default: {
        document: {
          run: { font: "Times New Roman", size: TRANG.BODY },
        },
      },
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: { size: TRANG.BODY, bold: true, font: "Times New Roman", color: "000000" },
          paragraph: {
            spacing: { before: 160, after: 80, line: dd.lineSpacing },
            indent: { firstLine: TRANG.INDENT },
            outlineLevel: 0,
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: { size: TRANG.BODY, bold: true, font: "Times New Roman", color: "000000" },
          paragraph: {
            spacing: { before: 120, after: 60, line: dd.lineSpacing },
            indent: { firstLine: TRANG.INDENT },
            outlineLevel: 1,
          },
        },
        {
          id: "Heading3",
          name: "Heading 3",
          basedOn: "Normal",
          next: "Normal",
          run: { size: TRANG.BODY, bold: true, italics: true, font: "Times New Roman", color: "000000" },
          paragraph: {
            spacing: { before: 100, after: 60, line: dd.lineSpacing },
            indent: { firstLine: TRANG.INDENT },
            outlineLevel: 2,
          },
        },
      ],
    },
    sections: [{
      properties: pageProperties(loai),
      headers: pageNum.headers,
      footers: pageNum.footers,
      children,
    }],
  });
}

module.exports = { buildDocument };
