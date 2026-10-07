/**
 * partials/bang-du-lieu.js - BẢNG DỮ LIỆU (biên bản, phụ lục)
 * ==============================================================
 * Định dạng theo references/phu-luc-bang.md; mọi thông số lấy từ BANG_DU_LIEU
 * trong config/config.js (nguồn duy nhất).
 *   - Header: nền #1F4E79, chữ trắng đậm, căn giữa, spacing 120/120
 *   - Dữ liệu: 13pt, spacing 0/0 line 240 (AUTO), cột STT căn giữa,
 *     cột nội dung căn đều 2 bên
 */

const {
  Table, TableRow, TableCell, WidthType, AlignmentType, Paragraph,
  ShadingType, VerticalAlign,
} = require('docx');
const { r, runsCoLink, solidBorders } = require('./base');
const { BANG_DU_LIEU, contentWidth } = require('../config/config');

const CAN = {
  giua: AlignmentType.CENTER,
  deu: AlignmentType.JUSTIFIED,
  trai: AlignmentType.LEFT,
};

/**
 * @param {object} o
 * @param {string}   [o.loai]     - loại VB để lấy bề rộng thân trang (mặc định MAC_DINH)
 * @param {string[]} o.tieuDe     - tiêu đề các cột
 * @param {number[]} o.tiLeCot    - tỉ lệ bề rộng các cột (tự quy về contentWidth)
 * @param {string[]} [o.canCot]   - 'giua' | 'deu' | 'trai' cho từng cột (mặc định: cột 1 giữa, còn lại đều)
 * @param {string[][]} o.hang     - các hàng dữ liệu (mảng chuỗi, đúng số cột)
 * @param {boolean}  [o.coMau=true] - false: bỏ tô màu tiêu đề (không nền, chữ đen đậm). Mặc định true theo phu-luc-bang.md.
 * @param {boolean}  [o.hangCuoiDam=false] - true: hàng cuối (Tổng cộng) in đậm
 * @param {number}   [o.noiRong=0] - nới bảng ra ngoài lề mỗi bên (DXA) khi bảng nhiều cột số
 * @param {number}   [o.rongTong]  - ghi đè tổng bề rộng bảng (DXA) — dùng cho phụ lục khổ ngang (partials/phu-luc.js)
 * HÀNG NHÓM: phần tử của `hang` dạng { nhom: 'Tên đơn vị' } → 1 dòng gộp hết cột (nền xám BANG_DU_LIEU.fillNhom, chữ đậm).
 */
function bangDuLieu({ loai = 'MAC_DINH', tieuDe, tiLeCot, canCot, hang, coMau = true, hangCuoiDam = false, noiRong = 0, rongTong }) {
  const B = BANG_DU_LIEU;
  const W = rongTong || (contentWidth(loai) + noiRong * 2);
  const tong = tiLeCot.reduce((a, b) => a + b, 0);
  const colW = tiLeCot.map((t) => Math.round((W * t) / tong));
  colW[colW.length - 1] += W - colW.reduce((a, b) => a + b, 0);
  const can = (canCot || tieuDe.map((_, i) => (i === 0 ? 'giua' : 'deu'))).map((c) => CAN[c]);

  const cell = (text, i, isHead, dam = false) => new TableCell({
    borders: solidBorders,
    verticalAlign: VerticalAlign.CENTER,
    width: { size: colW[i], type: WidthType.DXA },
    margins: B.margins,
    shading: (isHead && coMau) ? { type: ShadingType.CLEAR, fill: B.fillTieuDe, color: 'auto' } : undefined,
    children: [new Paragraph({
      alignment: isHead ? AlignmentType.CENTER : can[i],
      spacing: isHead ? B.spacingTieuDe : B.spacingDuLieu,
      // Ô dữ liệu: hỗ trợ [số](url)/ký-hiệu để gắn link vào số ký hiệu; ô tiêu đề giữ nguyên run thường (có màu)
      children: isHead ? [r(text, { size: B.size, bold: true, color: coMau ? B.chuTieuDe : undefined })]
                       : runsCoLink(text, { size: B.size, bold: dam }),
    })],
  });

  const head = new TableRow({ tableHeader: true, children: tieuDe.map((t, i) => cell(t, i, true)) });
  const nhomRow = (text) => new TableRow({ cantSplit: true, children: [new TableCell({
    columnSpan: tieuDe.length, borders: solidBorders, verticalAlign: VerticalAlign.CENTER,
    width: { size: W, type: WidthType.DXA }, margins: B.margins,
    shading: { type: ShadingType.CLEAR, fill: B.fillNhom, color: 'auto' },
    children: [new Paragraph({ alignment: AlignmentType.LEFT, keepNext: true, spacing: B.spacingDuLieu, children: [r(text, { size: B.size, bold: true })] })],
  })] });
  const body = hang.map((h, k) => (h && h.nhom !== undefined)
    ? nhomRow(h.nhom)
    : new TableRow({ cantSplit: true, children: h.map((t, i) => cell(String(t), i, false, hangCuoiDam && k === hang.length - 1)) }));
  return new Table({
    width: { size: W, type: WidthType.DXA },
    indent: noiRong ? { size: -noiRong, type: WidthType.DXA } : undefined,
    columnWidths: colW,
    borders: solidBorders,
    rows: [head, ...body],
  });
}

module.exports = { bangDuLieu };
