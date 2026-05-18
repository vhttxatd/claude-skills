/**
 * partials/kinh-gui.js - KHỐI KÍNH GỬI
 * =======================================
 * Dùng cho Công văn và Tờ trình.
 * Căn giữa, in đậm.
 */

const { Paragraph, AlignmentType } = require('docx');
const { r, emp } = require('./base');
const { TRANG } = require('../config/config');

/**
 * @param {string|string[]} guiDen - Nơi nhận (1 hoặc nhiều dòng)
 */
function kinhGuiBlock(guiDen) {
  const list = Array.isArray(guiDen) ? guiDen : [guiDen];

  const paras = [];

  // Dòng "Kính gửi:" đứng đầu
  if (list.length === 1) {
    // 1 dòng: "Kính gửi: ..." trên cùng 1 dòng
    paras.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 240, line: 276 },
      indent: { firstLine: TRANG.INDENT },
      children: [
        r("Kính gửi: ", { bold: true, size: TRANG.BODY }),
        r(list[0], { size: TRANG.BODY }),
      ],
    }));
  } else {
    // Nhiều dòng: "Kính gửi:" đứng riêng, sau đó mỗi dòng "- ..."
    paras.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60, line: 276 },
      children: [r("Kính gửi:", { bold: true, size: TRANG.BODY })],
    }));
    list.forEach((gd, i) => {
      const isLast = i === list.length - 1;
      const content = gd.startsWith("-") ? gd : `- ${gd}`;
      paras.push(new Paragraph({
        alignment: AlignmentType.LEFT,
        spacing: { before: 0, after: isLast ? 240 : 60, line: 276 },
        indent: { left: 2880 },   // Thụt trái khoảng 5cm
        children: [r(content, { size: TRANG.BODY })],
      }));
    });
  }

  return paras;
}

module.exports = { kinhGuiBlock };
