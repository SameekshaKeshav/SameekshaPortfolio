#!/usr/bin/env python3
"""
build-hero-assets.py

The original brief asked for a short intro *video* to be turned into a
seamless looping hero clip via ffmpeg. For this build, a single still
portrait image was supplied instead of a video, so this script implements
the equivalent *image* pipeline with Pillow (no ffmpeg/numpy dependency,
since there is no audio/video track to loop or cross-fade):

  1. Detect the subject against the plain light backdrop and crop tightly,
     head to toe, re-centering the subject horizontally.
  2. Whiten the backdrop (push near-white tones to pure #ffffff) so it
     blends into the page background when composited with mix-blend-mode:
     multiply, exactly like the video pipeline's colorlevels step would.
  3. Export the hero portrait (768 wide, 768:960 aspect) as WebP.
  4. Export a head-to-shirt "bust" crop at 480x600 as WebP (used on the
     ID card in the About section).
  5. Export a 1200x630 Open Graph image on a paper-colored canvas.

Usage:
    python3 scripts/build-hero-assets.py <source-image> [--out-dir public]
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

PAPER = (244, 242, 238)  # --paper token from the design system
BG_WHITEN_THRESHOLD = 210  # channels above this are considered "backdrop"
BG_WHITEN_TARGET = 0.98  # mirrors colorlevels rimax/gimax/bimax=0.98


def whiten_background(im: Image.Image) -> Image.Image:
    """Push near-white backdrop tones to pure white (ffmpeg colorlevels equivalent)."""
    im = im.convert("RGB")
    lut = []
    for _ in range(3):
        channel_lut = [
            min(255, round(v / BG_WHITEN_TARGET)) if v >= BG_WHITEN_THRESHOLD else v
            for v in range(256)
        ]
        lut.extend(channel_lut)
    return im.point(lut)


def subject_bbox(im: Image.Image, pad_ratio: float = 0.06) -> tuple[int, int, int, int]:
    """Bounding box of non-background pixels, with padding, clamped to image bounds."""
    gray = im.convert("L")
    w, h = im.size
    px = gray.load()
    rgb = im.load()

    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            r, g, b = rgb[x, y]
            is_bg = min(r, g, b) > 205 and (max(r, g, b) - min(r, g, b)) < 12
            if not is_bg:
                found = True
                min_x, min_y = min(min_x, x), min(min_y, y)
                max_x, max_y = max(max_x, x), max(max_y, y)
    if not found:
        return 0, 0, w, h

    pad_x = int((max_x - min_x) * pad_ratio)
    pad_y = int((max_y - min_y) * pad_ratio)
    return (
        max(0, min_x - pad_x),
        max(0, min_y - pad_y),
        min(w, max_x + pad_x),
        min(h, max_y + pad_y),
    )


def crop_centered(im: Image.Image, bbox: tuple[int, int, int, int], target_ratio: float) -> Image.Image:
    """Crop im to target_ratio (w/h), centered on the subject bbox, as large as possible."""
    w, h = im.size
    bx0, by0, bx1, by1 = bbox
    cx = (bx0 + bx1) / 2

    # Start from full image height (keeps head-to-toe), derive width from ratio.
    crop_h = h
    crop_w = crop_h * target_ratio
    if crop_w > w:
        crop_w = w
        crop_h = crop_w / target_ratio

    left = cx - crop_w / 2
    left = max(0, min(w - crop_w, left))
    top = (h - crop_h) / 2
    return im.crop((int(left), int(top), int(left + crop_w), int(top + crop_h)))


def build(source: Path, out_dir: Path) -> None:
    original = Image.open(source)
    original = ImageOps.exif_transpose(original).convert("RGB")

    whitened = whiten_background(original)
    bbox = subject_bbox(whitened)

    # 1-2-3: hero portrait, 768 wide, 768:960 aspect, head to toe, centered.
    hero_crop = crop_centered(whitened, bbox, target_ratio=768 / 960)
    hero = hero_crop.resize((768, 960), Image.LANCZOS)
    hero_dir = out_dir / "hero"
    hero_dir.mkdir(parents=True, exist_ok=True)
    hero.save(hero_dir / "portrait.webp", "WEBP", quality=92)
    hero.save(hero_dir / "portrait.jpg", "JPEG", quality=90)

    # 4: bust crop — head-to-shirt, 480x600 (4:5), tighter + higher than the hero crop.
    bx0, by0, bx1, by1 = bbox
    subject_h = by1 - by0
    bust_top = by0 - subject_h * 0.04
    bust_bottom = by0 + subject_h * 0.42
    bust_cx = (bx0 + bx1) / 2
    bust_h = bust_bottom - bust_top
    bust_w = bust_h * (480 / 600)
    bust_box = (
        int(max(0, bust_cx - bust_w / 2)),
        int(max(0, bust_top)),
        int(min(whitened.width, bust_cx + bust_w / 2)),
        int(min(whitened.height, bust_bottom)),
    )
    bust = whitened.crop(bust_box).resize((480, 600), Image.LANCZOS)
    bust.save(out_dir / "portrait-bust.webp", "WEBP", quality=92)

    # 5: Open Graph image, 1200x630. Canvas is pure white (not --paper) so the
    # already-whitened portrait composites with no visible seam.
    og = Image.new("RGB", (1200, 630), (255, 255, 255))
    og_h = 760
    og_w = int(og_h * (768 / 960))
    og_person = hero.resize((og_w, og_h), Image.LANCZOS)
    og.paste(og_person, (1200 - og_w - 60, 630 - og_h + 40))
    og.save(out_dir / "og.jpg", "JPEG", quality=90)

    print(f"Wrote {hero_dir / 'portrait.webp'} ({hero.size[0]}x{hero.size[1]})")
    print(f"Wrote {out_dir / 'portrait-bust.webp'} ({bust.size[0]}x{bust.size[1]})")
    print(f"Wrote {out_dir / 'og.jpg'} (1200x630)")
    print(f"Subject bbox detected at {bbox} in a {whitened.size} source image.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, help="Path to the source portrait image")
    parser.add_argument("--out-dir", type=Path, default=Path("public"))
    args = parser.parse_args()

    if not args.source.exists():
        print(f"Source image not found: {args.source}", file=sys.stderr)
        return 1

    build(args.source, args.out_dir)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
