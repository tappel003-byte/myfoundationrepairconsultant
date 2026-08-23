#!/usr/bin/env python3
"""Extract MFRC content from live Squarespace site."""

import json
import re
import subprocess
import xml.etree.ElementTree as ET
from html import unescape
from pathlib import Path

BASE = "https://www.myfoundationrepairconsultant.com"
OUT = Path(__file__).resolve().parent.parent / "content" / "extracted"
OUT.mkdir(parents=True, exist_ok=True)

CUSTOM_HUB_PATHS = {
    "/micropiles",
    "/common-signs",
    "/foundation-repair-dictionary",
    "/foundation-types",
    "/material-behavior",
}


def fetch(url: str) -> str:
    return subprocess.check_output(["curl", "-s", "-L", url], text=True, timeout=60)


def get_sitemap_urls() -> list[str]:
    sm = fetch(f"{BASE}/sitemap.xml")
    root = ET.fromstring(sm)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    return [u.text for u in root.findall(".//sm:loc", ns)]


def extract_title(html: str) -> str:
    m = re.search(r"<title>([^<]+)</title>", html)
    return unescape(m.group(1).split("—")[0].strip()) if m else ""


def extract_meta_description(html: str) -> str:
    m = re.search(r'name="description"\s+content="([^"]*)"', html)
    return unescape(m.group(1)) if m else ""


def extract_custom_hub_body(html: str) -> str | None:
    """Extract content from Squarespace code block (micropiles-style pages)."""
    if "--bg-page" not in html:
        return None
    start = html.find('<div class="page"')
    if start == -1:
        return None
    # Find matching end - before script tag after page content
    script_start = html.find("<script>", start)
    if script_start == -1:
        script_start = html.find('<script ', start)
    body = html[start:script_start].strip() if script_start > start else html[start : start + 500000]
    return body


def extract_standard_body(html: str) -> str:
    """Extract main sqs-html-content blocks from standard pages."""
    blocks = re.findall(
        r'<div class="sqs-html-content"[^>]*>(.*?)</div>\s*</div>\s*</div>',
        html,
        re.DOTALL,
    )
    if not blocks:
        blocks = re.findall(
            r'<div class="sqs-block-content[^"]*">\s*<div class="sqs-html-content"[^>]*>(.*?)</div>',
            html,
            re.DOTALL,
        )
    combined = "\n".join(blocks)
    # Clean squarespace data attributes
    combined = re.sub(r'\s*data-rte-preserve-empty="true"', "", combined)
    combined = re.sub(r'\s*style="white-space:pre-wrap;"', "", combined)
    return combined.strip()


def path_to_slug(path: str) -> str:
    path = path.strip("/")
    return path or "index"


def main():
    urls = get_sitemap_urls()
    manifest = []

    for url in urls:
        path = url.replace(BASE, "")
        if path == "/page-not-found":
            continue

        print(f"Extracting {path}...")
        html = fetch(url)
        slug = path_to_slug(path)
        title = extract_title(html)
        description = extract_meta_description(html)

        custom = extract_custom_hub_body(html) if path in CUSTOM_HUB_PATHS else None
        if custom is None and path in CUSTOM_HUB_PATHS:
            custom = extract_custom_hub_body(html)

        body = custom if custom else extract_standard_body(html)
        page_type = "hub-custom" if custom else "page"

        if path.startswith("/all-articles/"):
            page_type = "article"
            slug = path.replace("/all-articles/", "")

        meta = {
            "url": path,
            "slug": slug,
            "title": title,
            "description": description,
            "type": page_type,
        }

        ext = "html" if page_type in ("hub-custom", "page") else "html"
        out_file = OUT / f"{slug.replace('/', '__')}.html"
        out_file.write_text(body, encoding="utf-8")
        meta["file"] = out_file.name
        manifest.append(meta)

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\nExtracted {len(manifest)} pages to {OUT}")


if __name__ == "__main__":
    main()
