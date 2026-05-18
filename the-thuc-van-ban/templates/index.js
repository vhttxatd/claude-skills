/**
 * index.js - XUẤT 7 MẪU VĂN BẢN
 * =================================
 * Chạy: node index.js
 * Output: output/01-cong-van.docx, 02-bao-cao.docx, ... 07-giay-moi.docx
 */

const fs = require('fs');
const path = require('path');
const { Packer } = require('docx');

const {
  mauCongVan, mauBaoCao, mauKeHoach, mauToTrinh,
  mauQuyetDinh, mauThongBao, mauGiayMoi,
} = require('./templates/all');

const OUT_DIR = path.join(__dirname, 'output');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

async function save(doc, filename) {
  const buf = await Packer.toBuffer(doc);
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, buf);
  console.log(`OK  ${filename}  (${(buf.length / 1024).toFixed(1)} KB)`);
}

(async () => {
  try {
    await save(mauCongVan(), '01-mau-cong-van.docx');
    await save(mauBaoCao(), '02-mau-bao-cao.docx');
    await save(mauKeHoach(), '03-mau-ke-hoach.docx');
    await save(mauToTrinh(), '04-mau-to-trinh.docx');
    await save(mauQuyetDinh(), '05-mau-quyet-dinh.docx');
    await save(mauThongBao(), '06-mau-thong-bao.docx');
    await save(mauGiayMoi(), '07-mau-giay-moi.docx');
    console.log('\nXuất 7 mẫu thành công.');
  } catch (err) {
    console.error('LỖI:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
