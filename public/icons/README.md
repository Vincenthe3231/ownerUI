# PWA Icons

This directory should contain the following icon sizes for the Progressive Web App:

- icon-72x72.png (72x72 pixels)
- icon-96x96.png (96x96 pixels)
- icon-128x128.png (128x128 pixels)
- icon-144x144.png (144x144 pixels)
- icon-152x152.png (152x152 pixels)
- icon-192x192.png (192x192 pixels)
- icon-384x384.png (384x384 pixels)
- icon-512x512.png (512x512 pixels)

## How to Generate Icons

### Option 1: Online Tools
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload your app logo/icon (at least 512x512px)
3. Download the generated icons
4. Place them in this directory

### Option 2: Using ImageMagick (if installed)
```bash
# Create a base icon (replace icon.png with your source image)
convert icon.png -resize 512x512 public/icons/icon-512x512.png
convert icon.png -resize 384x384 public/icons/icon-384x384.png
convert icon.png -resize 192x192 public/icons/icon-192x192.png
convert icon.png -resize 152x152 public/icons/icon-152x152.png
convert icon.png -resize 144x144 public/icons/icon-144x144.png
convert icon.png -resize 128x128 public/icons/icon-128x128.png
convert icon.png -resize 96x96 public/icons/icon-96x96.png
convert icon.png -resize 72x72 public/icons/icon-72x72.png
```

### Option 3: Manual Creation
Create square PNG images with transparent backgrounds in the sizes listed above.

## Temporary Solution
If you don't have icons yet, you can temporarily use a single icon file for all sizes. The PWA will still work, but may not display optimally on all devices.

