/**
 * partials/can-cu.js - KHỐI CĂN CỨ PHÁP LÝ
 * ==========================================
 * Dùng cho KH, TTr, QĐ, BC, CV, TB, GM (khi có căn cứ).
 * Mỗi căn cứ in nghiêng, có thụt đầu dòng, kết thúc bằng dấu `;`
 * Dòng cuối kết thúc bằng dấu `.`
 *
 * ⚠️ QUY TẮC opts.batBuoc:
 * - CHỈ set batBuoc=true khi soạn QUYẾT ĐỊNH HÀNH CHÍNH (QĐ).
 * - KHÔNG set batBuoc=true cho KH, BC, CV, TTr, TB, GM.
 * - Vi phạm sẽ chèn Luật TCCQĐP 72/2025/QH16 vào sai loại văn bản.
 */

const { Paragraph, AlignmentType } = require('docx');
const { r } = require('./base');
const { CANCU_BAT_BUOC_QD, TRANG } = require('../config/config');

/**
 * @param {string[]} dsCanCu - Mảng các câu "Căn cứ..."
 * @param {object} opts
 * @param {boolean} opts.batBuoc - CHỈ true khi loại văn bản là QĐ. Các loại khác để false/bỏ trống.
 */
function canCuBlock(dsCanCu = [], opts = {}) {
  let list = [...dsCanCu];

  if (opts.batBuoc) {
    // Chỉ chèn khi là QĐ — tránh trùng lặp
    const alreadyHas = list.some(c => c.includes("Luật Tổ chức chính quyền địa phương"));
    if (!alreadyHas) {
      list = [...CANCU_BAT_BUOC_QD, ...list];
    }
  }

  if (list.length === 0) return [];

  return list.map((text, idx) => {
    const isLast = idx === list.length - 1;
    // Đảm bảo kết thúc đúng dấu
    let content = text.trim();
    if (content.endsWith(",") || content.endsWith(".") || content.endsWith(";")) {
      content = content.slice(0, -1);
    }
    content += isLast ? "." : ";";

    return new Paragraph({
      alignment: AlignmentType.JUSTIFIED,
      spacing: { before: 0, after: 80, line: 276 },
      indent: { firstLine: TRANG.INDENT },
      children: [r(content, { italic: true, size: TRANG.BODY })],
    });
  });
}

module.exports = { canCuBlock };
