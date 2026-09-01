#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Doi chieu ban skill DANG CHAY (Settings) voi ban goc tren GitHub.
Chay: python3 kiem-tra-lech.py [thu_muc_skill]

Can mang toi github.com. Repo cong khai nen khong can token.
Thoat ma 1 neu phat hien lech.

Ba loai lech:
  KHAC NOI DUNG  - cung duong dan, noi dung khac nhau
  THIEU O SETTINGS - co tren GitHub, khong co trong ban dang chay
  CHI CO O SETTINGS - co trong ban dang chay, khong co tren GitHub
"""
import subprocess
import sys
import tempfile
import filecmp
from pathlib import Path

REPO = "https://github.com/vhttxatd/claude-skills.git"
UNG_VIEN = ["/mnt/skills/plugins", "/mnt/skills/user"]
BO_QUA_THU_MUC = ("cowork-plugin-management",)
# File nam o thu muc goc repo, khong bao gio nap thanh skill
BO_QUA_GOC = ("INDEX.md", "README.md", "TRANG-THAI-HIEN-TAI.md", ".gitignore")


def chon_thu_muc():
    if len(sys.argv) > 1:
        p = Path(sys.argv[1])
        if not p.is_dir():
            sys.exit(f"LOI: '{p}' khong phai thu muc.")
        return p
    for c in UNG_VIEN:
        p = Path(c)
        if p.is_dir() and any(p.glob("*/SKILL.md")):
            return p
    sys.exit(f"LOI: khong tim thay thu muc skill. Da thu: {', '.join(UNG_VIEN)}")


def liet_ke(goc):
    """Duong dan tuong doi cua moi file, bo qua .git va thu muc khong phai skill."""
    ds = set()
    for p in goc.rglob("*"):
        if not p.is_file():
            continue
        rel = p.relative_to(goc)
        if rel.parts[0] == ".git" or rel.parts[0] in BO_QUA_THU_MUC:
            continue
        if len(rel.parts) == 1 and rel.name in BO_QUA_GOC:
            continue
        ds.add(rel)
    return ds


def main():
    settings = chon_thu_muc()
    with tempfile.TemporaryDirectory() as tmp:
        clone = Path(tmp) / "repo"
        r = subprocess.run(["git", "clone", "-q", "--depth", "1", REPO, str(clone)],
                           capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit("LOI: khong clone duoc repo. Kiem tra mang.\n" + r.stderr.strip())

        ds_git = liet_ke(clone)
        ds_set = liet_ke(settings)

        khac, thieu, thua = [], sorted(ds_git - ds_set), sorted(ds_set - ds_git)
        for rel in sorted(ds_git & ds_set):
            if not filecmp.cmp(clone / rel, settings / rel, shallow=False):
                khac.append(rel)

        print(f"Settings: {settings}   GitHub: {REPO}")
        print(f"File doi chieu: {len(ds_git & ds_set)}\n")
        print("LUU Y: ban Settings nap trong phien la BAN CHUP luc phien bat dau. "
              "Neu vua upload giua phien thi ket qua lech la binh thuong - "
              "mo phien moi roi chay lai.\n")

        for nhan, ds, giai_thich in [
            ("KHAC NOI DUNG", khac,
             "Hai ban lech nhau. Xac dinh ban nao moi hon roi dong bo NGAY."),
            ("THIEU O SETTINGS", thieu,
             "Co tren GitHub, khong co trong ban dang chay. Thuong do dong goi "
             "thieu thu muc con (loi zip chi co SKILL.md) hoac skill da nghi huu."),
            ("CHI CO O SETTINGS", thua,
             "Chua day len GitHub. Day len de co lich su."),
        ]:
            print(f"[{nhan}] {len(ds)} file")
            if ds:
                print(f"  -> {giai_thich}")
                for rel in ds:
                    print(f"  - {rel}")
            print()

        if khac or thieu or thua:
            print("Ket luan: CO LECH - xu ly truoc khi lam viec tiep.")
            sys.exit(1)
        print("Ket luan: DONG BO.")


if __name__ == "__main__":
    main()
