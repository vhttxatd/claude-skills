#!/usr/bin/env python3
"""
so-sanh-voi-ban-chot.py - SO SÁNH ĐỊNH DẠNG file xuất với BẢN CHỐT do Hiếu hoàn thiện.
Cách dùng:  python3 so-sanh-voi-ban-chot.py ban_xuat.docx ban_chot.docx
Mục đích: mỗi khi Hiếu sửa tay một bản rồi gửi lên, chạy script này để thấy MỌI khác biệt định dạng
(lề, khổ giấy, bảng tiêu đề, Kính gửi, thân văn bản, chữ ký, bảng) → đưa thẳng vào config/partials,
không để lỗi lặp lại. Chỉ so định dạng, KHÔNG so nội dung chữ.
Lưu ý: bản chốt qua Google Docs sẽ khác ở rsid, lineRule exact→auto: bỏ qua các khác biệt đó.
"""
import sys, zipfile
from lxml import etree

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
ns = {'w': W}
q = lambda t: '{%s}%s' % (W, t)


def txt(e):
    return ''.join(t.text or '' for t in e.iter(q('t')))


def val(e, path, attr='val'):
    x = e.find(path, ns)
    v = None if x is None else x.get(q(attr))
    try:                      # làm tròn: Google Docs đổi 2551 → 2551.18 (nhiễu, không phải khác biệt thật)
        return str(round(float(v))) if v is not None and v.replace('.', '', 1).lstrip('-').isdigit() else v
    except ValueError:
        return v


def flag(e, path):
    x = e.find(path, ns)
    if x is None:
        return False
    v = x.get(q('val'))
    return v not in ('0', 'false')


def fp_para(p):
    runs = [r for r in p.findall('w:r', ns) if txt(r).strip()]
    szs = sorted({val(r, 'w:rPr/w:sz') for r in runs if val(r, 'w:rPr/w:sz')})
    return {
        'jc': val(p, 'w:pPr/w:jc'),
        'line': val(p, 'w:pPr/w:spacing', 'line'),
        'after': val(p, 'w:pPr/w:spacing', 'after'),
        'indL': val(p, 'w:pPr/w:ind', 'left'),
        'indF': val(p, 'w:pPr/w:ind', 'firstLine'),
        'bold': any(flag(r, 'w:rPr/w:b') for r in runs),
        'ital': any(flag(r, 'w:rPr/w:i') for r in runs),
        'sz': ','.join(szs),
    }


def load(path):
    d = etree.fromstring(zipfile.ZipFile(path).read('word/document.xml'))
    return d, d.find('w:body', ns)


def sections(d):
    out = []
    for sp in d.iter(q('sectPr')):
        m = sp.find('w:pgMar', ns); s = sp.find('w:pgSz', ns)
        if m is None or s is None:
            continue
        out.append({'orient': val(sp, 'w:pgSz', 'orient') or ('landscape' if int(s.get(q('w'))) > int(s.get(q('h'))) else 'portrait'),
                    'top': m.get(q('top')), 'bottom': m.get(q('bottom')), 'left': m.get(q('left')), 'right': m.get(q('right'))})
    return out


def header_table(body):
    t = body.find('w:tbl', ns)
    res = []
    for p in t.iter(q('p')):
        t_ = txt(p)
        kind = ('divider' if t_ and set(t_.strip()) <= set('-—') else 'V/v' if t_.startswith('V/v') else t_[:14])
        f = fp_para(p); f['chars'] = ''.join(sorted(set(t_))) if kind == 'divider' else ''
        f['n'] = len(t_) if kind == 'divider' else ''
        res.append((kind, f))
    return res


def kinh_gui(body):
    res = []
    for p in body.findall('w:p', ns):
        t = txt(p).strip()
        if t.startswith('Kính gửi') or (res and t.startswith('- ') and len(res) < 12):
            res.append((t[:12], fp_para(p)))
        elif res:
            break
    return res


def main(a, b):
    da, ba = load(a); db, bb = load(b)
    diffs = []

    sa, sb = sections(da), sections(db)
    for i in range(max(len(sa), len(sb))):
        x = sa[i] if i < len(sa) else None; y = sb[i] if i < len(sb) else None
        if x != y:
            diffs.append(f'Section {i+1}: xuất={x}  |  chốt={y}')

    ha, hb = header_table(ba), header_table(bb)
    for (ka, fa), (kb, fb) in zip(ha, hb):
        for k in fa:
            if k in ('after', 'line', 'sz'):   # Google Docs đổi exact→auto, bỏ sz run rỗng: không so
                continue
            if fa[k] != fb[k]:
                diffs.append(f'Bảng tiêu đề [{ka}]: {k}: xuất={fa[k]!r}  chốt={fb[k]!r}')

    ka_, kb_ = kinh_gui(ba), kinh_gui(bb)
    for (na, fa), (nb, fb) in list(zip(ka_, kb_))[:3]:
        for k in ('indL', 'bold'):
            if fa[k] != fb[k]:
                diffs.append(f'Kính gửi [{na}]: {k}: xuất={fa[k]!r}  chốt={fb[k]!r}')

    # Thân văn bản: so tập vân tay (jc, line, indF, sz) của các đoạn dài
    def body_fp(b_):
        s = set()
        for p in b_.findall('w:p', ns):
            if len(txt(p)) > 80:
                f = fp_para(p); s.add((f['jc'], f['line'], f['indF'], f['sz'], f['bold'], f['ital']))
        return s
    fa_, fb_ = body_fp(ba), body_fp(bb)
    if fa_ != fb_:
        diffs.append(f'Thân văn bản (jc, line, firstLine, sz, bold, ital): xuất={sorted(map(str, fa_))}  chốt={sorted(map(str, fb_))}')

    ta, tb = ba.findall('w:tbl', ns), bb.findall('w:tbl', ns)
    if len(ta) != len(tb):
        diffs.append(f'Số bảng: xuất={len(ta)} chốt={len(tb)}')
    if len(ta) >= 3 and len(tb) >= 3:
        wa = [c.get(q('w')) for c in ta[2].find('w:tblGrid', ns).findall('w:gridCol', ns)]; wb = [c.get(q('w')) for c in tb[2].find('w:tblGrid', ns).findall('w:gridCol', ns)]
        if len(wa) != len(wb):
            diffs.append(f'Phụ lục: số cột xuất={len(wa)} chốt={len(wb)}')

    print(f'SO SÁNH ĐỊNH DẠNG\n  xuất: {a}\n  chốt: {b}')
    if diffs:
        for d in diffs:
            print('  ≠', d)
        print(f'\n  → {len(diffs)} khác biệt. Mỗi điểm khác biệt có chủ đích phải được đưa vào config/partials.')
        return 1
    print('  ✓ Định dạng khớp bản chốt.')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1], sys.argv[2]))
