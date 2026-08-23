#!/usr/bin/env python3
"""Clean extracted Squarespace HTML artifacts."""

import json
import re
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "content" / "extracted"

LINK_FIXES = {
    "/industry-notes": "/industry-articles",
    "/all-articles/foundation-problem-vs-normal-settling": "/all-articles/foundation-problem-vs-normal-settling-how-to-evaluate-what-youre-seeing",
}

STUB_PAGES = {
    "/all-articles/brick-and-block-movement": "Brick and Block Movement",
    "/all-articles/finish-materials-as-early-movement-indicators": "Finish Materials as Early Movement Indicators",
    "/all-articles/moisture-content-and-framing-shrinkage": "Moisture Content and Framing Shrinkage",
    "/all-articles/plaster-cracking-in-older-homes": "Plaster Cracking in Older Homes",
    "/all-articles/seasonal-interior-cracking": "Seasonal Interior Cracking",
    "/all-articles/shrinkage-curing-and-stress-relief": "Shrinkage, Curing, and Stress Relief in Residential Concrete",
    "/all-articles/truss-uplift-and-seasonal-movement": "Truss Uplift and Seasonal Movement",
    "/all-articles/what-reinforcing-steel-actually-does": "What Reinforcing Steel Actually Does",
    "/all-articles/why-concrete-cracks-even-when-nothing-is-wrong": "Why Concrete Cracks Even When Nothing Is Wrong",
    "/all-articles/why-drywall-cracks-before-structural-failure": "Why Drywall Cracks Before Structural Failure",
    "/all-articles/why-houses-continue-to-move": "Why Houses Continue to Move",
    "/all-articles/why-stucco-cracks-on-stable-homes": "Why Stucco Cracks on Stable Homes",
}


def clean_html(html: str) -> str:
    html = re.sub(r"<style[^>]*>.*?</style>", "", html, flags=re.DOTALL)
    html = re.sub(r'\s*style="[^"]*"', "", html)
    html = re.sub(r'\s*class=""', "", html)
    html = re.sub(r"<div>\s*</div>", "", html)
    html = re.sub(r"\s+", " ", html)
    html = re.sub(r">\s+<", "><", html)
    for old, new in LINK_FIXES.items():
        html = html.replace(f'href="{old}"', f'href="{new}"')
    return html.strip()


def stub_html(title: str) -> str:
    return f"""<div class="content-block under-construction">
<h2>{title}</h2>
<p><em>Under construction.</em> This article is planned as part of the MFRC knowledge library. Check back soon, or explore related published articles from the navigation above.</p>
</div>"""


def main():
    manifest = json.loads((OUT / "manifest.json").read_text())
    for entry in manifest:
        f = OUT / entry["file"]
        if f.exists():
            f.write_text(clean_html(f.read_text()), encoding="utf-8")

    stubs_manifest = []
    for path, title in STUB_PAGES.items():
        slug = path.replace("/all-articles/", "")
        fname = f"{slug}.html"
        (OUT / fname).write_text(stub_html(title), encoding="utf-8")
        stubs_manifest.append(
            {
                "url": path,
                "slug": slug,
                "title": f"{title} — My Foundation Repair Consultant",
                "description": f"{title} — article under construction at MFRC.",
                "type": "article",
                "file": fname,
                "status": "under-construction",
            }
        )

    manifest.extend(stubs_manifest)
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Cleaned {len(manifest) - len(stubs_manifest)} pages, added {len(stubs_manifest)} stubs")


if __name__ == "__main__":
    main()
