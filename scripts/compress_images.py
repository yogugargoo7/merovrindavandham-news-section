"""One-off asset compression: photos -> WebP (max 1920px), OG JPG, logo optimization."""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAT = os.path.join(ROOT, 'public', 'vrindavan-material')
LOGOS = os.path.join(ROOT, 'src', 'assets', 'siteImages')

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
    return f"{n/1024:.0f} KB" if n < 1024*1024 else f"{n/1024/1024:.2f} MB"

for name in PHOTOS:
    src = os.path.join(MAT, name)
    if not os.path.exists(src):
        print(f"SKIP missing {name}")
        continue
    img = Image.open(src).convert('RGB')
    if img.width > 1920:
        img = img.resize((1920, round(img.height * 1920 / img.width)), Image.LANCZOS)
    out = os.path.join(MAT, os.path.splitext(name)[0] + '.webp')
    img.save(out, 'WEBP', quality=78, method=6)
    print(f"{name}: {human(os.path.getsize(src))} -> {os.path.basename(out)}: {human(os.path.getsize(out))}")

# OG/social preview image (JPG for maximum compatibility)
drone = Image.open(os.path.join(MAT, 'drone-view-mvd-3d.png')).convert('RGB')
drone = drone.resize((1200, round(drone.height * 1200 / drone.width)), Image.LANCZOS)
og_path = os.path.join(MAT, 'og-preview.jpg')
drone.save(og_path, 'JPEG', quality=80, optimize=True, progressive=True)
print(f"og-preview.jpg: {human(os.path.getsize(og_path))}")

# Logos (keep alpha, shrink dimensions)
for name, max_h in [('VrindavanLogo.png', 480), ('VrindavanLogoSmall.png', 160)]:
    src = os.path.join(LOGOS, name)
    img = Image.open(src)
    if img.height > max_h:
        img = img.resize((round(img.width * max_h / img.height), max_h), Image.LANCZOS)
    out = os.path.join(LOGOS, os.path.splitext(name)[0] + '.webp')
    img.save(out, 'WEBP', quality=85, method=6)
    print(f"{name}: {human(os.path.getsize(src))} -> {os.path.basename(out)}: {human(os.path.getsize(out))}")
