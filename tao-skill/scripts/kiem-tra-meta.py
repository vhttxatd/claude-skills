#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Quet toan bo skill, bao cao tinh trang dong META.
Chay: python3 kiem-tra-meta.py [thu_muc]
Khong truyen tham so -> tu do tim thu muc skill cua Hieu.
Thoat ma 1 neu co file thieu META hoac qua han.
"""
import re
import sys
from datetime import date
from pathlib import Path

UNG_VIEN = ["/mnt/skills/plugins", "/mnt/skills/user"]
# Bo qua plugin cua Anthropic, khong phai skill cua Hieu
BO_QUA = ("cowork-plugin-management",)

def chon_thu_muc():
    if len(sys.argv) > 1:
        p = Path(sys.argv[1])
        if not p.is_dir():
            sys.exit(f"LOI: '{p}' khong ton tai hoac khong phai thu muc. "
                     f"Thu mot trong: {', '.join(UNG_VIEN)}")
        return p
    for c in UNG_VIEN:
        p = Path(c)
        if p.is_dir() and any(p.glob("*/SKILL.md")):
            return p
    sys.exit(f"LOI: khong tim thay thu muc skill. Da thu: {', '.join(UNG_VIEN)}. "
             f"Truyen duong dan lam tham so.")

GOC = chon_thu_muc()
HOM_NAY = date.today()

META = re.compile(
    r"\*\*META\*\*.*?cap_nhat:\s*(\d{4}-\d{2}-\d{2}).*?"
    r"ra_soat_lai:\s*(\d{4}-\d{2}-\d{2}).*?"
    r"rui_ro:\s*(cao|trung|thap)",
    re.IGNORECASE | re.DOTALL,
)

thieu, qua_han, on = [], [], []

for f in sorted(GOC.rglob("*.md")):
    rel = f.relative_to(GOC)
    if rel.parts and rel.parts[0].startswith(BO_QUA):
        continue
    try:
        noi_dung = f.read_text(encoding="utf-8")
    except Exception as e:
        thieu.append((str(rel), f"khong doc duoc (loi ma hoa?): {e}"))
        continue
    m = META.search(noi_dung[:1500])
    if not m:
        thieu.append((str(rel), "khong co dong META"))
        continue
    han = date.fromisoformat(m.group(2))
    if han < HOM_NAY:
        qua_han.append((str(rel), m.group(3), str(han), (HOM_NAY - han).days))
    else:
        on.append((str(rel), m.group(3), str(han)))

tong = len(thieu) + len(qua_han) + len(on)
if tong == 0:
    sys.exit(f"LOI: khong tim thay file .md nao trong '{GOC}'. Kiem tra lai duong dan.")

print(f"Quet: {GOC}   Ngay: {HOM_NAY}")
print(f"Tong file .md (da bo qua plugin Anthropic): {tong}\n")

print(f"[QUA HAN RA SOAT] {len(qua_han)} file — KHONG dung lam can cu")
for r, rr, h, d in sorted(qua_han, key=lambda x: -x[3]):
    print(f"  - {r}  (rui_ro={rr}, han {h}, tre {d} ngay)")

print(f"\n[THIEU META] {len(thieu)} file")
for r, ly_do in thieu:
    print(f"  - {r}  ({ly_do})")

print(f"\n[CON HAN] {len(on)} file")
for r, rr, h in on:
    print(f"  - {r}  (rui_ro={rr}, han {h})")

if thieu or qua_han:
    print("\nKet luan: CAN XU LY")
    sys.exit(1)
print("\nKet luan: SACH")
