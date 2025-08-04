# Conime Assets Directory

This directory contains all static assets for the Conime website including:

## Folders Structure

- `/images/` - Article images, thumbnails, and hero images
- `/icons/` - Custom SVG icons and graphics
- `/videos/` - Video thumbnails and promotional materials
- `/thumbnails/` - Generated thumbnails for articles
- `/user-avatars/` - User profile pictures and avatars

## Usage

To add images to articles, place them in the appropriate subfolder and reference them like:

```tsx
import heroImage from '../assets/images/anime/chainsaw-man-hero.jpg';
```

## Image Guidelines

- **Article images**: 800x450px (16:9 ratio)
- **Thumbnails**: 400x300px (4:3 ratio) 
- **User avatars**: 150x150px (1:1 ratio)
- **Format**: JPG for photos, PNG for graphics with transparency
- **Optimization**: Keep file sizes under 500KB for optimal loading

## Adding New Assets

1. Create appropriate subfolder if needed
2. Use descriptive filenames with kebab-case
3. Include alt text descriptions in a separate `.txt` file if needed
4. Update this README when adding new categories