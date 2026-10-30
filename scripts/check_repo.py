#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1]/'project/legacy-static'
PAGES = sorted(ROOT.glob("*.html"))
FAIL = []

class Parser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.sources = []
        self.ids = set()
        self.title = False
        self.h1 = 0
        self.main = 0
        self.lang = None
        self.description = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self.title = True
        if tag == "h1": self.h1 += 1
        if tag == "main": self.main += 1
        if a.get("id"): self.ids.add(a["id"])
        if tag == "meta" and a.get("name") == "description" and a.get("content"):
            self.description = True
        if tag in ("a", "use") and a.get("href"):
            self.links.append(a["href"])
        if a.get("src"):
            self.sources.append(a["src"])

parsed = {}
for page in PAGES:
    p = Parser()
    p.feed(page.read_text(encoding="utf-8"))
    parsed[page.name] = p
    if p.lang != "en": FAIL.append(f"{page.name}: missing lang=en")
    if not p.title: FAIL.append(f"{page.name}: missing title")
    if p.h1 != 1: FAIL.append(f"{page.name}: expected 1 h1, found {p.h1}")
    if p.main != 1: FAIL.append(f"{page.name}: expected 1 main, found {p.main}")
    if not p.description: FAIL.append(f"{page.name}: missing meta description")

for page in PAGES:
    p = parsed[page.name]
    for raw in p.sources:
        if raw.startswith(("http://", "https://", "//", "data:")):
            continue
        path = (ROOT / unquote(urlsplit(raw).path)).resolve()
        if not path.exists(): FAIL.append(f"{page.name}: missing asset {raw}")
    for raw in p.links:
        if raw.startswith(("mailto:", "tel:", "javascript:")):
            continue
        u = urlsplit(raw)
        if u.scheme or raw.startswith("//"):
            continue
        target = unquote(u.path) or page.name
        target_name = Path(target).name
        if target.startswith("/"):
            target_name = target.lstrip("/")
        if target_name and target_name.endswith(".html"):
            if target_name not in parsed:
                FAIL.append(f"{page.name}: missing page {raw}")
            elif u.fragment and u.fragment not in parsed[target_name].ids:
                FAIL.append(f"{page.name}: missing fragment {raw}")
        elif u.fragment and not u.path and u.fragment not in p.ids:
            FAIL.append(f"{page.name}: missing local fragment {raw}")

required = [
    ROOT / "index.html",
    ROOT / "404.html",
    ROOT / "assets/styles.css",
    ROOT / "assets/main.js",
    ROOT / "assets/gmg-config.js",
    ROOT / "robots.txt",
    ROOT / "sitemap.xml",
]
for path in required:
    if not path.exists(): FAIL.append(f"missing required file: {path.relative_to(ROOT)}")

if FAIL:
    print("Repository validation FAILED")
    for item in FAIL: print(" -", item)
    sys.exit(1)
print(f"Repository validation PASSED: {len(PAGES)} HTML pages checked.")
