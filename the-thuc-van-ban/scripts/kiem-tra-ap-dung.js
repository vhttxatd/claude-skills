// KIEM TRA AP DUNG SKILL the-thuc-van-ban (ban 07/10/2026). Chi ghi file tam trong thu muc nay, khong dung outputs.
const T='/mnt/skills/plugins/the-thuc-van-ban/templates/';
const { Packer } = require('docx'); const fs=require('fs'); const { execSync } = require('child_process');
const all=require(T+'templates/all'); const B=require(T+'partials/base'); const { phuLuc }=require(T+'partials/phu-luc');
const { buildDocument }=require(T+'partials/document-builder'); const { headerTable }=require(T+'partials/header-table');
const { titleBlock }=require(T+'partials/title-block'); const { signatureBlock }=require(T+'partials/signature');
const res=[]; const ok=(ten,cond)=>res.push((cond?'PASS ':'FAIL ')+ten);
const xml=(f,p)=>{try{return execSync(`unzip -p ${f} ${p}`,{maxBuffer:1e8}).toString('utf8')}catch(e){return ''}};
const txt=(x)=>x.replace(/<\/w:p>/g,'\n').replace(/<[^>]+>/g,'');
(async()=>{
  B.chuThich(1,'Chu thich thu.');
  const L='https://drive.google.com/file/d/TEST/view';
  // ---- 1. Cong van UBND ----
  const cv=all.mauCongVan({ thang:'10', trichYeu:'thu nghiem', kinhGui:['Phòng A','Phòng B'], nguoiKy:'pctVHXH', noiNhan:[],
    noiDung:[ B.bp(`Căn cứ Kế hoạch số [63](${L})/KHPH-MTTQ-UBND ngày 28 tháng 9 năm 2026.`),
      B.mucSo(1,'Giao Phòng A:',{kieu:'tieuDe'}), B.gach('Việc 1.'), B.mucSo(2,'Giao Phòng B làm việc B.') ] });
  fs.writeFileSync('cv.docx', await Packer.toBuffer(cv));
  let d=xml('cv.docx','word/document.xml'), t=txt(d);
  ok('CV: noi nhan co "Nhu tren"', /- Như trên;/.test(t));
  ok('CV: noi nhan co "Chu tich, cac PCT UBND xa"', /- Chủ tịch, các PCT UBND xã;/.test(t));
  ok('CV: noi nhan co dong Phong VHXH + VP', /- Phòng Văn hóa - Xã hội;/.test(t) && /- VP: CVP, PVP\/TH;/.test(t));
  ok('CV: dong cuoi la "Luu: VT, VHXH-Hieu."', /- Lưu: VT, VHXH-Hiếu\.\s*$/m.test(t.split('Nơi nhận:')[1]||'' ) || /- Lưu: VT, VHXH-Hiếu\./.test(t));
  ok('CV: co hyperlink gan vao so ky hieu', (d.match(/<w:hyperlink/g)||[]).length>=1);
  const hl=(d.match(/<w:hyperlink[\s\S]*?<\/w:hyperlink>/)||[''])[0];
  ok('CV: link mau xanh dam 1F3864, khong gach chan', /1F3864/.test(hl) && !/<w:u /.test(hl));
  ok('CV: muc so in dam ("1. Giao Phong A:")', /<w:b\/>[\s\S]{0,200}1\. Giao Phòng A:/.test(d));
  // ---- 2. Bao cao ngoai xa + footnote + phu luc ----
  const pl=phuLuc({ loai:'BC', tenPhuLuc:'THU NGHIEM', kemTheo:'(Kem theo)', tieuDe:['STT','A','B','C','D','E'], tiLeCot:[5,20,15,20,20,20], hang:[['1','a','b','c','d','e']], huong:'ngang' });
  const bc=buildDocument('BC',[ headerTable({loai:'BC',thang:'10'}), ...titleBlock('BC','thu nghiem trich yeu'),
    ...B.moDauBaoCao({ canCu:[`Công văn số [10613](${L})/SKHCN-KTSXHS ngày 28 tháng 9 năm 2026 của Sở Khoa học và Công nghệ về thu nghiệm`], noiDung:'báo cáo thử nghiệm, cụ thể như sau:' }),
    B.bp('Ủy ban nhân dân xã đã làm.[^1]',{noLink:true}),
    signatureBlock({ noiNhan:{donViYeuCau:'Sở Khoa học và Công nghệ Thành phố'}, nguoiKy:'pctVHXH', loai:'BC', ubnd:true }) ], pl);
  fs.writeFileSync('bc.docx', await Packer.toBuffer(bc));
  d=xml('bc.docx','word/document.xml'); t=txt(d);
  ok('BC: trich yeu ket thuc bang dau cham', /thu nghiem trich yeu\./.test(t));
  ok('BC: mo dau "Thuc hien ... ." + doan "Ủy ban nhân dân xã An Thới Đông báo cáo"', /Thực hiện Công văn số 10613[\s\S]*?\.\n[\s\S]*Ủy ban nhân dân xã An Thới Đông báo cáo/.test(t));
  ok('BC: dong 1 noi nhan co "(de bao cao)"', /- Sở Khoa học và Công nghệ Thành phố \(để báo cáo\);/.test(t));
  ok('BC: co footnote that su (footnotes.xml + tham chieu)', /Chu thich thu/.test(xml('bc.docx','word/footnotes.xml')) && /footnoteReference/.test(d));
  ok('PL: tieu de "PHU LUC. ..." chung 1 dong', /PHỤ LỤC\. THU NGHIEM/.test(t));
  ok('PL: dong cuoi bang viet hoa day du', /ỦY BAN NHÂN DÂN XÃ AN THỚI ĐÔNG/.test(t));
  const out=execSync('node /mnt/skills/plugins/the-thuc-van-ban/scripts/kiem-tra-the-thuc.js bc.docx --ngoai || true').toString();
  ok('Script --ngoai bat duoc "Ủy ban nhân dân xã" thieu An Thới Đông', /thiếu "An Thới Đông"/.test(out));
  const fn=xml('bc.docx','word/footnotes.xml');
  ok('FN: file tu skill co dong ke footnote (separator day du)', /<w:separator\/>/.test(fn) && /<w:continuationSeparator\/>/.test(fn));
  execSync('rm -rf tmpfn && mkdir tmpfn && cd tmpfn && unzip -q ../bc.docx && sed -i "s#<w:separator/>##g;s#<w:continuationSeparator/>##g" word/footnotes.xml && zip -qr ../loi-fn.docx . && cd .. && rm -rf tmpfn');
  const o2=execSync('node /mnt/skills/plugins/the-thuc-van-ban/scripts/kiem-tra-the-thuc.js loi-fn.docx || true').toString();
  ok('FN: script bat duoc separator rong (kieu file Google Docs)', /separator rỗng/.test(o2));
  console.log(res.join('\n')); console.log(res.some(r=>r.startsWith('FAIL'))?'\n=> CO LOI: skill chua ap dung day du':'\n=> TAT CA PASS: skill da ap dung day du');
})();
