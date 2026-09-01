/**
 * partials/document-builder.js - FACTORY TẠO DOCUMENT
 * =====================================================
 * Gộp page setup + headers/footers + styles vào 1 Document.
 */

const { Document } = require('docx');
const { pageProperties, pageNumbering } = require('./page-setup');
const { getDinhDang, TRANG, HEADING } = require('../config/config');
const { AlignmentType } = require('docx');

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
      // Sinh tự động 4 cấp heading từ HEADING + headingSpacing trong config.
      // ⚠️ KHÔNG viết tay từng style ở đây — sửa config/config.js là đủ.
      paragraphStyles: Object.keys(HEADING).map((cap) => {
        const h = HEADING[cap];
        const sp = (dd.headingSpacing && dd.headingSpacing[cap]) || { before: 120, after: 60 };
        return {
          id: `Heading${cap}`,
          name: `Heading ${cap}`,
          basedOn: "Normal",
          next: "Normal",
          run: {
            size: TRANG.BODY, bold: h.bold, italics: h.italics,
            font: "Times New Roman", color: "000000",
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: sp.before, after: sp.after, line: dd.lineSpacing },
            indent: { firstLine: TRANG.INDENT },
            outlineLevel: h.outlineLevel,
          },
        };
      }),
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
