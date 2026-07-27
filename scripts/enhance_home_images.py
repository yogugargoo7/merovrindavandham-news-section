"""Re-render the home/gallery photos from the pristine originals at higher
quality (WebP q=90, up to 2560px wide). Sources live in _originals-backup/,
outputs overwrite the served files in public/vrindavan-material/."""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, '_originals-backup')
OUT_DIR = os.path.join(ROOT, 'public', 'vrindavan-material')

MAX_W = 2560
QUALITY = 90

# original filename -> served webp name
PHOTOS = [
    'drone-view-mvd-3d.png',
    'site-3d-view.png',
    'commercial-view.png',
    'entry-view-01.png',
    'entry-view-02.png',
    'entry-view-03.png',
    'project-photo-03.png',
    'mvd-3-photos.jpeg',
    'mvd-photo-1.jpeg',
]


def human(n):
    return f"{n/1024:.0f} KB" if n < 1024 * 1024 else f"{n/1024/1024:.2f} MB"


for name in PHOTOS:
    src = os.path.join(SRC_DIR, name)
    if not os.path.exists(src):
        print(f"SKIP missing {name}")
        continue
    img = Image.open(src).convert('RGB')
    if img.width > MAX_W:
        img = img.resize((MAX_W, round(img.height * MAX_W / img.width)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, os.path.splitext(name)[0] + '.webp')
    before = os.path.getsize(out) if os.path.exists(out) else 0
    img.save(out, 'WEBP', quality=QUALITY, method=6)
    after = os.path.getsize(out)
    print(f"{name}: {img.width}px  {human(before)} -> {os.path.basename(out)}: {human(after)}")
