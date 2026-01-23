#!/usr/bin/env python3
import argparse
import json
import os
from pathlib import Path

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}


def is_image(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in IMAGE_EXTS


def sort_by_mtime(paths):
    return sorted(paths, key=lambda p: p.stat().st_mtime, reverse=True)


def to_rel(path: Path, root: Path) -> str:
    return str(path.relative_to(root).as_posix())


def build_featured(featured_dir: Path, root: Path):
    images = sort_by_mtime([p for p in featured_dir.iterdir() if is_image(p)])
    items = []
    for img in images:
        items.append(
            {
                "title": img.stem,
                "location": "",
                "year": "",
                "url": to_rel(img, root),
            }
        )
    return items


def build_series(series_root: Path, root: Path):
    series_items = []
    for series_dir in sorted([p for p in series_root.iterdir() if p.is_dir()]):
        images = sort_by_mtime([p for p in series_dir.iterdir() if is_image(p)])
        if not images:
            continue
        cover = images[0]
        series_items.append(
            {
                "name": series_dir.name,
                "description": "",
                "cover": to_rel(cover, root),
            }
        )
    return series_items


def pick_cover(root: Path, featured_items):
    cover = root / "cover.jpg"
    if cover.exists():
        return to_rel(cover, root)
    cover = root / "cover.jpeg"
    if cover.exists():
        return to_rel(cover, root)
    if featured_items:
        return featured_items[0]["url"]
    return "cover.jpg"


def main():
    parser = argparse.ArgumentParser(description="Generate index.json for photo gallery.")
    parser.add_argument("--root", default=".", help="Photo root directory (default: current).")
    parser.add_argument("--output", default="index.json", help="Output JSON filename.")
    args = parser.parse_args()

    root = Path(args.root).resolve()
    featured_dir = root / "featured"
    series_dir = root / "series"

    featured_items = build_featured(featured_dir, root) if featured_dir.exists() else []
    series_items = build_series(series_dir, root) if series_dir.exists() else []

    payload = {
        "hero": {
            "cover": pick_cover(root, featured_items),
            "updateCount": str(len(featured_items)),
        },
        "featured": featured_items,
        "series": series_items,
    }

    output_path = root / args.output
    output_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {output_path}")


if __name__ == "__main__":
    main()
