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
  Header, Footer, Paragraph, TextRun, AlignmentType, PageNumber, NumberFormat, PageOrientation,
} = require('docx');

const { getDinhDang, TRANG, SO_TRANG, PHU_LUC } = require('../config/config');
const { sp0 } = require('./base');

/**
 * @param {string} loai
 * @param {object} [opts]
 * @param {boolean} [opts.ngang=false] - khổ NGANG (phụ lục nhiều cột). Theo PHU_LUC.resetSoTrang (mặc định true):
 *        số trang RESET về 1 và trang đầu của phụ lục ẩn số (đúng quy tắc số trang như văn bản chính).
 *        Đặt resetSoTrang=false nếu muốn đánh số liên tục toàn file.
 */
function pageProperties(loai, { ngang = false } = {}) {
  const dd = getDinhDang(loai);
  return {
    titlePage: ngang ? PHU_LUC.resetSoTrang : true,   // trang đầu của section ẩn số trang (phụ lục: theo resetSoTrang)
    page: {
      // docx-js: truyền width/height DỌC rồi đặt orientation LANDSCAPE → thư viện tự hoán đổi
      size: ngang
        ? { width: TRANG.W, height: TRANG.H, orientation: PageOrientation.LANDSCAPE }
        : { width: TRANG.W, height: TRANG.H },
      margin: {
        top: dd.marginTop,
        bottom: dd.marginBottom,
        right: dd.marginRight,
        left: dd.marginLeft,
      },
      // BẮT BUỘC — thiếu dòng này khiến số trang không ổn định / không reset
      // đúng về 1 ở mỗi file mới (xem dau-cau.md mục "Số trang").
      pageNumbers: (!ngang || PHU_LUC.resetSoTrang)
        ? { start: 1, formatType: NumberFormat.DECIMAL }
        : { formatType: NumberFormat.DECIMAL },
    },
  };
}

/** TextRun hiển thị số trang */
function pageNumRun() {
  return new TextRun({
    children: [PageNumber.CURRENT],
    size: SO_TRANG.size,
    font: "Times New Roman",
  });
}

function pageNumParagraph() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    // Giãn cách phía dưới để số trang không dính vào dòng đầu thân văn bản.
    spacing: { before: 0, after: SO_TRANG.after, line: 240 },
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
