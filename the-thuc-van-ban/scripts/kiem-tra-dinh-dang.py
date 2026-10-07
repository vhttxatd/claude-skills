#!/usr/bin/env python3
"""
kiem-tra-dinh-dang.py - KIỂM TRA ĐỊNH DẠNG file .docx đã xuất (bổ sung cho kiem-tra-the-thuc.js vốn chỉ bắt lỗi đánh số).
Cách dùng:  python3 kiem-tra-dinh-dang.py file.docx
Bắt các lỗi LẶP LẠI đã từng phải sửa tay (06/10/2026):
  1. Giãn dòng EXACT nhỏ hơn cỡ chữ  → chữ chồng dòng / cụt dấu
  2. Lề trang ngoài khoảng NĐ 30 (trên/dưới 20-25mm, trái 30-35mm, phải 15-20mm)
  3. Giãn dòng thân văn bản ngoài khoảng NĐ 30 (đơn → 1,5)
  4. Divider (cỡ 4pt) dùng `-` thay vì `—` (ra đường chấm đứt)
  5. Trích yếu công văn "V/v ..." in nghiêng hoặc thiếu dấu chấm cuối
  6. "Kính gửi:" căn giữa (phải căn trái)
Thoát mã 1 nếu có LỖI. SAU KHI chạy: BẮT BUỘC render ≥150 dpi và xem crop đầu trang + chữ ký (xem SKILL.md).
"""
import sys, zipfile
from lxml import etree

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W}
q = lambda t: '{%s}%s' % (W, t)
# Khoảng NĐ 30/2020 (DXA) — khớp NGHI_DINH_30 trong config/config.js
ND30 = {'top': (1134, 1417), 'bottom': (1134, 1417), 'left': (1701, 1985), 'right': (850, 1134)}
TOL = 20  # dung sai làm tròn DXA


def txt(p):
    return ''.join(t.text or '' for t in p.iter(q('t')))


def run_sz(p, default=28):
    szs = []
    for r in p.findall('w:r', ns):
        s = r.find('w:rPr/w:sz', ns)
        if s is not None and txt(r):
            szs.append(int(s.get(q('val'))))
    return max(szs) if szs else default


def main(path):
    z = zipfile.ZipFile(path)
    doc = etree.fromstring(z.read('word/document.xml'))
    loi, canh_bao = [], []

    # 2. Lề từng section
    for i, sp in enumerate(doc.iter(q('sectPr'))):
        m = sp.find('w:pgMar', ns)
        if m is None:
            continue
        for k, key in (('top', 'top'), ('bottom', 'bottom'), ('left', 'left'), ('right', 'right')):
            v = float(m.get(q(key)))
            lo, hi = ND30[k]
            if v < lo - TOL or v > hi + TOL:
                loi.append(f'Section {i+1}: lề {k} = {v:.0f} DXA ({v/56.7:.1f}mm) ngoài khoảng NĐ 30 [{lo}-{hi}]')

    paras = list(doc.iter(q('p')))
    # 1. EXACT nhỏ hơn cỡ chữ
    n_exact = 0
    for p in paras:
        sp = p.find('w:pPr/w:spacing', ns)
        if sp is not None and sp.get(q('lineRule')) == 'exact' and txt(p).strip():
            line = int(sp.get(q('line')))
            sz = run_sz(p)
            if line < sz * 10:  # sz half-point → twips = sz*10
                n_exact += 1
                if n_exact <= 3:
                    loi.append(f'Giãn dòng EXACT {line} < cỡ chữ {sz/2:.0f}pt → chồng dòng/cụt dấu: "{txt(p)[:40]}"')
    if n_exact > 3:
        loi.append(f'... và {n_exact-3} đoạn EXACT khác')

    # 3. Giãn dòng thân văn bản (đoạn dài, ngoài bảng)
    body = doc.find('w:body', ns)
    for p in body.findall('w:p', ns):
        t = txt(p)
        if len(t) > 80:
            sp = p.find('w:pPr/w:spacing', ns)
            if sp is not None and sp.get(q('line')) and sp.get(q('lineRule')) in (None, 'auto'):
                line = int(sp.get(q('line')))
                if line < 240 or line > 360:
                    canh_bao.append(f'Giãn dòng thân VB {line} ngoài [240-360]: "{t[:40]}"')
                    break

    # 4. Divider
    for p in paras:
        t = txt(p).strip()
        if t and set(t) <= set('-—') and len(t) >= 10 and run_sz(p) == 8:
            if '-' in t:
                loi.append(f'Divider dùng "-" ({len(t)} ký tự) → phải dùng "—" (đường liền nét)')
                break

    # 5. Trích yếu CV
    for p in paras:
        t = txt(p).strip()
        if t.startswith('V/v'):
            def _nghieng(r):
                x = r.find('w:rPr/w:i', ns)
                return x is not None and x.get(q('val')) not in ('0', 'false')
            if any(_nghieng(r) and txt(r) for r in p.findall('w:r', ns)):
                loi.append('Trích yếu "V/v ..." đang in NGHIÊNG → phải kiểu chữ đứng (NĐ 30)')
            if not t.endswith('.'):
                loi.append('Trích yếu "V/v ..." thiếu dấu chấm cuối')
            break

    # 6. Kính gửi
    for p in paras:
        if txt(p).strip().startswith('Kính gửi'):
            jc = p.find('w:pPr/w:jc', ns)
            if jc is not None and jc.get(q('val')) == 'center':
                loi.append('"Kính gửi:" đang căn GIỮA → phải căn trái, thụt 4,5cm')
            break

    print(f'KIỂM TRA ĐỊNH DẠNG: {path}')
    for c in canh_bao:
        print('  ⚠ ', c)
    if loi:
        for l in loi:
            print('  ✗ ', l)
        print(f'\n  → {len(loi)} LỖI. Sửa trong config/partials rồi xuất lại (KHÔNG sửa tay file).')
        return 1
    print('  ✓ Không phát hiện lỗi định dạng.')
    print('  ⚠ Nhắc: render ≥150 dpi (pdftoppm -r 150) và xem crop đầu trang + chữ ký trước khi giao file.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1]))
