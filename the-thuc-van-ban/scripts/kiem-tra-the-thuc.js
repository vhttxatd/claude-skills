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
 *
 * BẮT BUỘC chạy script này trước khi giao file (xem quy trình trong SKILL.md).
 * Không cần cài thêm thư viện — chỉ dùng `unzip` có sẵn.
 */

const { execSync } = require('child_process');
const path = require('path');

const file = process.argv[2];
const chiTiet = process.argv.includes('--chi-tiet');

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
  return { text, style: st ? st[1] : 'Body' };
}).filter((p) => p.text);

const laDeMuc = (p) => /^Heading\d/.test(p.style);
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
  if (laDeMuc(p)) return;
  if (!coTienTo(p.text)) return;

  // Có tiền tố → phải có câu dẫn ngay phía trên, hoặc nằm trong danh sách đã mở
  let hopLe = false;
  for (let j = i - 1; j >= 0; j--) {
    const tr = than[j];
    if (laDeMuc(tr)) break;                 // chạm đề mục mà chưa gặp câu dẫn
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

if (loi.length) {
  console.log(`\n  ✗ PHÁT HIỆN ${loi.length} LỖI THỂ THỨC:`);
  loi.forEach((l) => console.log(`    - ${l}`));
  console.log('\n  → Đoạn văn thường KHÔNG được tự đánh số / gạch đầu dòng.');
  console.log('  → Chỉ liệt kê khi có câu dẫn kết thúc bằng ":" — dùng lietKe({ cauDan, muc }).');
  console.log('  → KHÔNG GIAO FILE cho đến khi sửa xong.\n');
  process.exit(1);
}

console.log('\n  ✓ Không phát hiện lỗi đánh số / gạch đầu dòng sai chỗ.\n');
