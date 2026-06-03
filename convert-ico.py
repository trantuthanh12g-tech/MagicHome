#!/usr/bin/env python3
"""Convert logo.png to proper ICO format with 48x48 as primary size"""
from PIL import Image
import os

# Path to logo
logo_path = "public/logo/logo.png"
ico_output = "public/favicon.ico"

# Open the image
img = Image.open(logo_path)

# Convert to RGB if necessary (ICO format may not support RGBA in some cases)
if img.mode != 'RGB':
    img = img.convert('RGB')

# Create favicon.ico with multiple sizes (48x48 as primary/largest)
sizes = [(48, 48), (32, 32), (16, 16)]
ico_images = []

for size in sizes:
    resized = img.resize(size, Image.Resampling.LANCZOS)
    ico_images.append(resized)

# Save as ICO file with 48x48 as primary
ico_images[0].save(
    ico_output,
    format='ICO',
    sizes=sizes
)

print(f"✓ Created ICO file with 48x48px primary: {ico_output}")

# Also copy to dist folder
dist_ico = "dist/favicon.ico"
os.makedirs("dist", exist_ok=True)
ico_images[0].save(
    dist_ico,
    format='ICO',
    sizes=sizes
)
print(f"✓ Copied to dist: {dist_ico}")

# Also ensure favicon.png exists in both locations
png_output = "public/favicon.png"
img_png = Image.open(logo_path)
if img_png.mode in ('RGBA', 'LA', 'P'):
    img_png.save(png_output, 'PNG')
else:
    img_png.save(png_output, 'PNG')
print(f"✓ Ensured favicon.png exists: {png_output}")

dist_png = "dist/favicon.png"
img_png.save(dist_png, 'PNG')
print(f"✓ Copied to dist: {dist_png}")

print("\n✅ Favicon conversion complete with 48x48px!")
