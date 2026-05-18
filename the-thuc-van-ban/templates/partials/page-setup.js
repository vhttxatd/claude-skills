/**
 * partials/page-setup.js - CẤU HÌNH TRANG + SỐ TRANG
 * ======================================================
 * - page(loai): trả về properties.page cho section
 * - headers(loai): trả về headers/footers với số trang từ trang 2
 *
 * Quy tắc số trang:
 *   - titlePage: true → trang 1 (first) ẩn
 *   - Loại CV/KH/TTr/QĐ/TB/GM → số trang ở HEADER
 *   - Loại BC → số trang ở FOOTER
 */

const {
  Header, Footer, Paragraph, TextRun, AlignmentType, PageNumber,
} = require('docx');

const { getDinhDang, TRANG } = require('../config/config');
const { sp0 } = require('./base');

function pageProperties(loai) {
  const dd = getDinhDang(loai);
  return {
    titlePage: true,          // Cho phép trang 1 ẩn số trang
    page: {
      size: { width: TRANG.W, height: TRANG.H },
      margin: {
        top: dd.marginTop,
        bottom: dd.marginBottom,
        right: dd.marginRight,
        left: dd.marginLeft,
      },
    },
  };
}

/** TextRun hiển thị số trang */
function pageNumRun() {
  return new TextRun({
    children: [PageNumber.CURRENT],
    size: TRANG.SMALL,
    font: "Times New Roman",
  });
}

function pageNumParagraph() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: sp0,
    children: [pageNumRun()],
  });
}

/**
 * Trả về { headers, footers } cho section.
 * Tự chọn header hay footer tùy loại VB.
 */
function pageNumbering(loai) {
  const dd = getDinhDang(loai);
  const emptyHeader = new Header({ children: [new Paragraph({ children: [] })] });
  const emptyFooter = new Footer({ children: [new Paragraph({ children: [] })] });

  if (dd.pageNumberPosition === 'footer') {
    // BC: số trang ở footer, trang 1 ẩn
    return {
      headers: { default: emptyHeader, first: emptyHeader },
      footers: {
        default: new Footer({ children: [pageNumParagraph()] }),
        first: emptyFooter,
      },
    };
  }

  // Mặc định: số trang ở header, trang 1 ẩn
  return {
    headers: {
      default: new Header({ children: [pageNumParagraph()] }),
      first: emptyHeader,
    },
    footers: { default: emptyFooter, first: emptyFooter },
  };
}

module.exports = { pageProperties, pageNumbering };
