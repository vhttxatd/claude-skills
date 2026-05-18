/**
 * partials/title-block.js - TÊN LOẠI VB + TRÍCH YẾU
 * ====================================================
 * Dùng cho BC, KH, TTr, QĐ, TB, GM (không dùng cho CV).
 *
 * Cấu trúc:
 *   [DÒNG TRỐNG]
 *   TÊN LOẠI VĂN BẢN  (in hoa, đậm, căn giữa, 14pt)
 *   Trích yếu (thường, đậm, căn giữa, 14pt)
 *   [DÒNG TRỐNG]
 */

const { Paragraph, AlignmentType, LineRuleType } = require('docx');
const { r, emp } = require('./base');
const { TEN_LOAI, TRANG } = require('../config/config');

/**
 * @param {string} loai - BC | KH | TTr | QD | TB | GM
 * @param {string} trichYeu - Nội dung trích yếu (ví dụ "công tác KHCN-CĐS Q1/2026")
 * @param {object} opts
 * @param {string} opts.prefix - Tiền tố trích yếu (mặc định tự động theo loại)
 */
function titleBlock(loai, trichYeu, opts = {}) {
  const tenLoai = TEN_LOAI[loai];
  if (!tenLoai) {
    throw new Error(`titleBlock: loại "${loai}" không hợp lệ (phải là BC/KH/TTr/QD/TB/GM)`);
  }

  // Tiền tố trích yếu mặc định theo loại
  const prefixMap = {
    BC:  "Về",
    KH:  "",
    TTr: "Về việc",
    QD:  "Về việc",
    TB:  "Về",
    GM:  "",
  };
  const prefix = opts.prefix ?? prefixMap[loai];
  const trichYeuFull = prefix ? `${prefix} ${trichYeu}` : trichYeu;

  const spTitle = { before: 0, after: 0, line: 276, lineRule: LineRuleType.AUTO };

  return [
    ...emp(1),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60, line: 276 },
      children: [r(tenLoai, { bold: true, size: TRANG.BODY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 240, line: 276 },
      children: [r(trichYeuFull, { bold: true, size: TRANG.BODY })],
    }),
  ];
}

module.exports = { titleBlock };
