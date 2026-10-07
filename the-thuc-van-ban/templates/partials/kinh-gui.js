/**
 * partials/kinh-gui.js - KHỐI KÍNH GỬI
 * =======================================
 * Dùng cho Công văn và Tờ trình.
 * Bố cục chốt 06/10/2026 (bản Hiếu hoàn thiện), thông số ở KINH_GUI trong config:
 *   - "Kính gửi:" đậm, căn TRÁI, thụt 4,5cm
 *   - Danh sách thụt 6,5cm, mỗi dòng "- ...;" — dòng cuối kết thúc bằng "."
 *   - Giãn dòng đơn (240 AUTO)
 */

const { Paragraph, AlignmentType, LineRuleType } = require('docx');
const { r, runsCoLink } = require('./base');
const { TRANG, KINH_GUI } = require('../config/config');

const K = KINH_GUI;
const dongDon = (before, after) => ({ before, after, line: K.lineSpacing, lineRule: LineRuleType.AUTO });
const boDauCuoi = (s) => s.trim().replace(/[;.,]+$/, '');

/**
 * @param {string|string[]} guiDen - Nơi nhận (1 hoặc nhiều dòng; không cần gõ dấu `;`/`.` cuối dòng)
 */
function kinhGuiBlock(guiDen) {
  const list = (Array.isArray(guiDen) ? guiDen : [guiDen]).map(boDauCuoi);
  const paras = [];

  if (list.length === 1) {
    // 1 nơi nhận: "Kính gửi: ..." trên cùng 1 dòng
    paras.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: dongDon(K.beforeKinhGui, K.afterCuoi),
      indent: { left: K.thutKinhGui },
      children: [
        r('Kính gửi: ', { bold: true, size: TRANG.BODY }),
        ...runsCoLink(`${list[0]}.`, { size: TRANG.BODY }),
      ],
    }));
    return paras;
  }

  // Nhiều nơi nhận: "Kính gửi:" đứng riêng, mỗi dòng "- ...;"
  paras.push(new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: dongDon(K.beforeKinhGui, K.afterKinhGui),
    indent: { left: K.thutKinhGui },
    children: [r('Kính gửi:', { bold: true, size: TRANG.BODY })],
  }));
  list.forEach((gd, i) => {
    const isLast = i === list.length - 1;
    const content = `${gd.startsWith('-') ? gd : `- ${gd}`}${isLast ? '.' : ';'}`;
    paras.push(new Paragraph({
      alignment: AlignmentType.LEFT,
      spacing: dongDon(0, isLast ? K.afterCuoi : 0),
      indent: { left: K.thutDanhSach },
      children: runsCoLink(content, { size: TRANG.BODY }),
    }));
  });
  return paras;
}

module.exports = { kinhGuiBlock };
