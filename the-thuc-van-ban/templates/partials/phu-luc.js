/**
 * partials/phu-luc.js - PHỤ LỤC BẢNG (tự chọn khổ ngang / khổ dọc)
 * ==================================================================
 * Gói tiêu đề phụ lục + bảng dữ liệu. Truyền kết quả vào mauCongVan({ phuLuc }) hoặc
 * buildDocument(loai, children, phuLuc).
 *
 * Khổ NGANG khi: số cột > PHU_LUC.soCotToiDa, HOẶC (số dòng dữ liệu > soDongToiDa VÀ có ô dài
 * hơn doDaiOChu ký tự). Ép tay bằng huong: 'ngang' | 'doc'. Mọi ngưỡng ở PHU_LUC (config).
 * Tiêu đề bảng KHÔNG tô màu (coMau=false); dòng nhóm nền xám nhạt.
 */
const { Paragraph, AlignmentType } = require('docx');
const { r } = require('./base');
const { bangDuLieu } = require('./bang-du-lieu');
const { TRANG, getDinhDang, PHU_LUC } = require('../config/config');

function chonHuong({ tieuDe, hang, huong = 'auto' }) {
  if (huong === 'ngang') return true;
  if (huong === 'doc') return false;
  const dong = hang.filter((h) => Array.isArray(h));
  const oDai = dong.some((h) => h.some((c) => String(c).length > PHU_LUC.doDaiOChu));
  return tieuDe.length > PHU_LUC.soCotToiDa || (dong.length > PHU_LUC.soDongToiDa && oDai);
}

/**
 * @param {object} o
 * @param {string} [o.loai='CV']
 * @param {string} o.tenPhuLuc - VD "BẢNG PHÂN CÔNG NHIỆM VỤ TỔ CHỨC NGÀY HỘI ..." (in hoa, đậm)
 * @param {string} [o.kemTheo]  - VD "(Kèm theo Công văn số        /UBND ngày      tháng 10 năm 2026 của Ủy ban nhân dân xã An Thới Đông)"
 * @param {string[]} o.tieuDe, {number[]} o.tiLeCot, {string[]} [o.canCot], {Array} o.hang
 * @param {string} [o.huong='auto']
 * @param {string|false} [o.dongCuoi] - chữ ở cuối bảng; mặc định PHU_LUC.dongCuoi.text ("ỦY BAN NHÂN DÂN xã An Thới Đông"); false = tắt
 */
function phuLuc({ loai = 'CV', tenPhuLuc, kemTheo, tieuDe, tiLeCot, canCot, hang, huong = 'auto', dongCuoi }) {
  const ngang = chonHuong({ tieuDe, hang, huong });
  const dd = getDinhDang(loai);
  const rong = ngang
    ? TRANG.H - dd.marginLeft - dd.marginRight        // khổ ngang: chiều rộng = cạnh dài A4
    : TRANG.W - dd.marginLeft - dd.marginRight;
  const S = PHU_LUC.tieuDeSize;
  const p = (text, o) => new Paragraph({
    alignment: AlignmentType.CENTER,
    pageBreakBefore: !!o.break,
    spacing: { before: 0, after: o.after || 0 },
    children: [r(text, { bold: !!o.bold, italic: !!o.italic, size: o.size })],
  });
  const children = [
    // "PHỤ LỤC. TÊN PHỤ LỤC" nằm CHUNG 1 DÒNG (Hiếu chốt 07/10/2026); khổ ngang: section mới đã sang trang
    p(`PHỤ LỤC. ${tenPhuLuc}`, { bold: true, size: S.tenPhuLuc, break: !ngang, after: kemTheo ? 0 : 160 }),
    ...(kemTheo ? [p(kemTheo, { italic: true, size: S.phuDe, after: 160 })] : []),
    bangDuLieu({ loai, tieuDe, tiLeCot, canCot, hang, coMau: false, rongTong: rong }),
  ];
  // Dòng cuối bảng — LUÔN thêm (PHU_LUC.dongCuoi); truyền dongCuoi:false để tắt cho trường hợp đặc biệt.
  const dc = PHU_LUC.dongCuoi;
  if (dongCuoi !== false && dc) {
    children.push(new Paragraph({
      alignment: ({ right: AlignmentType.RIGHT, center: AlignmentType.CENTER, left: AlignmentType.LEFT })[dc.align] || AlignmentType.RIGHT,
      spacing: { before: dc.before, after: 0 },
      keepLines: true,
      children: [r(dongCuoi || dc.text, { bold: dc.bold, size: dc.size })],
    }));
  }
  return { ngang, children };
}

module.exports = { phuLuc, chonHuong };
