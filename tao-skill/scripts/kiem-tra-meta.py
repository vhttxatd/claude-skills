#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Quet toan bo skill, bao cao tinh trang dong META.
Claude chay truc tiep trong phien: python3 kiem-tra-meta.py [thu_muc]
Mac dinh quet /mnt/skills/user
"""
import re
import sys
from datetime import date
from pathlib import Path

GOC = Path(sys.argv[1] if len(sys.argv) > 1 else "/mnt/skills/user")
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
    try:
        noi_dung = f.read_text(encoding="utf-8")
    except Exception as e:
        thieu.append((str(rel), f"khong doc duoc: {e}"))
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

print(f"Quet: {GOC}   Ngay: {HOM_NAY}")
print(f"Tong file .md: {len(thieu) + len(qua_han) + len(on)}\n")

print(f"[QUA HAN RA SOAT] {len(qua_han)} file — KHONG dung lam can cu")
for r, rr, h, d in sorted(qua_han, key=lambda x: -x[3]):
    print(f"  - {r}  (rui_ro={rr}, han {h}, tre {d} ngay)")

print(f"\n[THIEU META] {len(thieu)} file")
for r, ly_do in thieu:
    print(f"  - {r}  ({ly_do})")

print(f"\n[CON HAN] {len(on)} file")
for r, rr, h in on:
    print(f"  - {r}  (rui_ro={rr}, han {h})")

print("\nKet luan:", "CAN XU LY" if (thieu or qua_han) else "SACH")
