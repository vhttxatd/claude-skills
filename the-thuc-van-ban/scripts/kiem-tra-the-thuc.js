#!/usr/bin/env node
/**
 * scripts/kiem-tra-the-thuc.js — SOI CẤU TRÚC THẬT BÊN TRONG FILE .DOCX
 * ======================================================================
 * Chạy:  node kiem-tra-the-thuc.js <duong-dan.docx> [--chi-tiet]
 *
 * Mục đích: bắt các lỗi thể thức KHÔNG nhìn ra khi đọc code, chỉ lộ khi mở
 * file thật. Đặc biệt là lỗi đã lặp nhiều lần:
 *   - Đoạn văn thân bài tự đánh số "1." "2." hoặc tự gạch đầu dòng "-"
 *     mà phía trên KHÔNG có câu dẫn mở danh sách (kết thúc bằng ":")
 *   - Đề mục bị viết thành đoạn văn thường (không gắn Heading style)
 *   - Dẫn chiếu "số 63/KHPH-..." trong thân văn bản mà CHƯA gắn hyperlink vào số ký hiệu (cảnh báo)
 *   - Mục đánh số kiểu đơn giản (mucSo: số in đậm đầu đoạn) được nhận diện, không coi là tự đánh số
 *
 * BẮT BUỘC chạy script này trước khi giao file (xem quy trình trong SKILL.md).
 * Không cần cài thêm thư viện — chỉ dùng `unzip` có sẵn.
 */

const { execSync } = require('child_process');
const path = require('path');

const file = process.argv[2];
const chiTiet = process.argv.includes('--chi-tiet');
const guiNgoai = process.argv.includes('--ngoai');   // VB gửi đơn vị ngoài xã → thân VB phải ghi "xã An Thới Đông"

if (!file) {
  console.error('Cách dùng: node kiem-tra-the-thuc.js <duong-dan.docx> [--chi-tiet]');
  process.exit(2);
}

let xml;
try {
  xml = execSync(`unzip -p ${JSON.stringify(file)} word/document.xml`, {
    maxBuffer: 64 * 1024 * 1024,
  }).toString('utf8');
} catch (e) {
  console.error(`Không đọc được file: ${file}`);
  process.exit(2);
}

// Bóc từng paragraph kèm style
const paras = (xml.match(/<w:p[ >][\s\S]*?<\/w:p>/g) || []).map((p) => {
  const text = (p.match(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g) || [])
    .map((t) => t.replace(/<[^>]+>/g, ''))
    .join('')
    .trim();
  const st = p.match(/w:pStyle w:val="([^"]+)"/);
  // mucSo(): đoạn mở đầu bằng run ĐẬM chứa số thứ tự "1." (mục đánh số kiểu đơn giản — hợp lệ, không cần câu dẫn)
  const run1 = (p.match(/<w:r[ >][\s\S]*?<\/w:r>/) || [''])[0];
  const dauDam = /<w:b\/>|<w:b w:val="(?:true|1)"\/>/.test(run1) && /^\s*\d+\.(\s|$)/.test((run1.match(/<w:t[^>]*>([\s\S]*?)<\/w:t>/) || ['', ''])[1] || '');
  return { text, style: st ? st[1] : 'Body', coLink: p.includes('<w:hyperlink'), mucSo: dauDam };
}).filter((p) => p.text);

const laDeMuc = (p) => /^Heading\d/.test(p.style);
const laMucSo = (p) => p.mucSo === true;
const coTienTo = (t) => /^\s*(\d+[.)]|[a-zA-Zđ][).])\s+/.test(t) || /^\s*[-•*]\s+/.test(t);
const laCauDan = (t) => t.trim().endsWith(':');

const loi = [];
const canhBao = [];

// Bỏ qua phần đầu (bảng tiêu đề) và phần cuối (nơi nhận, chữ ký)
const iDauThan = paras.findIndex(laDeMuc);
const iNoiNhan = paras.findIndex((p) => /^Nơi nhận:/.test(p.text));
const than = paras.slice(
  iDauThan >= 0 ? iDauThan : 0,
  iNoiNhan >= 0 ? iNoiNhan : paras.length
);

than.forEach((p, i) => {
  if (laDeMuc(p) || laMucSo(p)) return;
  if (!coTienTo(p.text)) return;

  // Có tiền tố → phải có câu dẫn ngay phía trên, hoặc nằm trong danh sách đã mở
  let hopLe = false;
  for (let j = i - 1; j >= 0; j--) {
    const tr = than[j];
    if (laDeMuc(tr) || laMucSo(tr)) { if (laCauDan(tr.text)) hopLe = true; break; }   // chạm đề mục / mục số: hợp lệ nếu tiêu đề kết thúc ':'
    if (laCauDan(tr.text)) { hopLe = true; break; }
    if (!coTienTo(tr.text)) break;          // gặp đoạn văn thường → danh sách không liền mạch
  }
  if (!hopLe) {
    loi.push(`Đoạn tự đánh dấu nhưng KHÔNG có câu dẫn mở danh sách:\n      "${p.text.slice(0, 90)}..."`);
  }
});

// Đề mục bị viết thành đoạn văn thường
than.forEach((p) => {
  if (laDeMuc(p)) return;
  if (/^(?:[IVX]+\.|PHẦN\s)/.test(p.text) && p.text.length < 90) {
    canhBao.push(`Có vẻ là đề mục nhưng chưa gắn Heading: "${p.text.slice(0, 70)}"`);
  }
});

// Dẫn chiếu số ký hiệu trong thân văn bản phải gắn link (Hiếu chốt 07/10/2026).
// Chỉ soi từ "Kính gửi"/Căn cứ/đề mục đầu tiên trở xuống (bỏ qua bảng tiêu đề + trích yếu).
const RE_SO = /(?:số|Số)\s+\d{1,6}\/[A-ZĐ][A-Za-zĐđ0-9-]*/;
const iBatDau = Math.max(0, paras.findIndex((p) => laDeMuc(p) || laMucSo(p) || /^(Kính gửi|Căn cứ)/.test(p.text)));
paras.slice(iBatDau, iNoiNhan >= 0 ? iNoiNhan : paras.length).forEach((p) => {
  const m = p.text.match(RE_SO);
  if (m && !p.coLink) canhBao.push(`Dẫn chiếu "${m[0]}" CHƯA gắn link vào số ký hiệu: "${p.text.slice(0, 60)}..."`);
});

// VB gửi ra ngoài xã (chạy với --ngoai): tên cơ quan gắn "xã" trong thân VB phải kèm "An Thới Đông". Không soi Nơi nhận, bảng tiêu đề.
if (guiNgoai) {
  const RE_XA = /(Ủy ban nhân dân|Công an|Đảng ủy|Hội đồng nhân dân|Ủy ban Mặt trận Tổ quốc Việt Nam|Thường trực Ủy ban nhân dân)\s+xã(?!\s+An Thới Đông)/g;
  paras.slice(iBatDau, iNoiNhan >= 0 ? iNoiNhan : paras.length).forEach((p) => {
    const m = p.text.match(RE_XA);
    if (m) canhBao.push(`VB gửi ngoài xã: thiếu "An Thới Đông" sau "${m[0]}" (${m.length} chỗ): "${p.text.slice(0, 50)}..."`);
  });
}

console.log(`\nKIỂM TRA THỂ THỨC: ${path.basename(file)}`);
console.log(`  Tổng số đoạn thân bài: ${than.length}`);
console.log(`  Đề mục: ${than.filter(laDeMuc).length}`);

if (chiTiet) {
  console.log('\n  --- Cấu trúc ---');
  than.forEach((p) => {
    const nhan = laDeMuc(p) ? p.style : (coTienTo(p.text) ? 'Liệt kê' : 'Đoạn văn');
    console.log(`  [${nhan.padEnd(9)}] ${p.text.slice(0, 70)}`);
  });
}

if (canhBao.length) {
  console.log('\n  CẢNH BÁO:');
  canhBao.forEach((c) => console.log(`    - ${c}`));
}

// Dòng kẻ ngăn cách vùng chú thích: file xuất từ Google Docs sang Word có thể để 2 mục separator RỖNG → Word không vẽ đường kẻ.
const loiNgan = [];
try {
  const fx = execSync(`unzip -p ${JSON.stringify(file)} word/footnotes.xml`, { maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8');
  [['separator', '<w:separator/>'], ['continuationSeparator', '<w:continuationSeparator/>']].forEach(([kieu, the]) => {
    const m = fx.match(new RegExp(`<w:footnote [^>]*w:type="${kieu}"[^>]*>[\\s\\S]*?</w:footnote>`));
    if (m && !m[0].includes(the)) loiNgan.push(`Footnote "${kieu}" rỗng (thiếu ${the}) — Word sẽ MẤT dòng kẻ ngăn cách phía trên chú thích`);
  });
} catch (e) { /* không có footnotes.xml → văn bản không có chú thích */ }
if (loiNgan.length) {
  console.log(`\n  ✗ DÒNG KẺ NGĂN CÁCH FOOTNOTE (separator rỗng): ${loiNgan.length} lỗi`);
  loiNgan.forEach((l) => console.log(`    - ${l}`));
  console.log('  → Vá word/footnotes.xml: thêm <w:separator/> / <w:continuationSeparator/> vào đúng 2 mục đó.\n');
}

if (loi.length) {
  console.log(`\n  ✗ PHÁT HIỆN ${loi.length} LỖI THỂ THỨC:`);
  loi.forEach((l) => console.log(`    - ${l}`));
  console.log('\n  → Đoạn văn thường KHÔNG được tự đánh số / gạch đầu dòng.');
  console.log('  → Chỉ liệt kê khi có câu dẫn kết thúc bằng ":" — dùng lietKe({ cauDan, muc }).');
  console.log('  → KHÔNG GIAO FILE cho đến khi sửa xong.\n');
  process.exit(1);
}

console.log('\n  ✓ Không phát hiện lỗi đánh số / gạch đầu dòng sai chỗ.\n');
if (loiNgan.length) process.exit(1);
