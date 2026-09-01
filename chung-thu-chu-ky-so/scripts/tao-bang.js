/**
 * scripts/tao-bang.js
 * Helper dựng bảng danh sách (Table docx-js) dùng chung cho công văn
 * chứng thư chữ ký số (Mẫu 01/02/04/05/06 - Ban Cơ yếu Chính phủ).
 *
 * Dùng khi noiDung của mauCongVan cần chèn 1 Table thay vì đoạn văn.
 * Tuân theo gotcha của skill docx: width DXA trên cả Table lẫn từng Cell,
 * ShadingType.CLEAR (không dùng SOLID).
 */

const {
  Table, TableRow, TableCell, Paragraph, TextRun,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} = require('docx');

// Cỡ chữ lấy từ NGUỒN DUY NHẤT `the-thuc-van-ban` — KHÔNG khai báo lại ở đây.
// Nếu cần đổi cỡ chữ, sửa trong the-thuc-van-ban/templates/config/config.js.
const { TRANG } = require('../../the-thuc-van-ban/templates/config/config');
const BODY = TRANG.BODY;    // 14pt thân văn bản
const SMALL = TRANG.TINY;   // 11pt cho bảng nhiều cột, tránh tràn trang

const border = { style: BorderStyle.SINGLE, size: 4, color: '000000' };
const borders = {
  top: border, bottom: border, left: border, right: border,
  insideH: border, insideV: border,
};

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 1000, type: WidthType.DXA },
    shading: opts.header
      ? { type: ShadingType.CLEAR, fill: 'D9D9D9' }
      : undefined,
    children: [
      new Paragraph({
        alignment: opts.align || AlignmentType.CENTER,
        children: [
          new TextRun({
            text: text ?? '',
            font: 'Times New Roman',
            bold: !!opts.header,
            size: opts.size || SMALL,
          }),
        ],
      }),
    ],
  });
}

/**
 * taoBangDanhSach(headers, rows, opts)
 * @param {string[]} headers - đúng tên cột theo mẫu gốc (xem data/mau-bieu-goc.md)
 * @param {string[][]} rows - dữ liệu; luôn có ít nhất 1 dòng trống mẫu "01","02","…"
 *                             nếu chưa có dữ liệu thật (giữ đúng thể thức mẫu gốc)
 * @param {object} opts - { colWidths: number[] } tổng phải khớp width bảng (DXA)
 */
function taoBangDanhSach(headers, rows, opts = {}) {
  const soCot = headers.length;
  const TONG_WIDTH = 9000; // ~ chiều rộng thân trang (DXA), điều chỉnh theo lề thực tế
  const colWidths = opts.colWidths || headers.map(() => Math.floor(TONG_WIDTH / soCot));

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, { header: true, width: colWidths[i] })),
  });

  const dataRows = rows.map(row =>
    new TableRow({
      children: row.map((val, i) => cell(val, { width: colWidths[i] })),
    })
  );

  return new Table({
    width: { size: TONG_WIDTH, type: WidthType.DXA },
    columnWidths: colWidths,
    borders,
    rows: [headerRow, ...dataRows],
  });
}

module.exports = { taoBangDanhSach };
