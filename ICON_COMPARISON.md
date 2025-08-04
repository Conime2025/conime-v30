# 🎨 Icon Libraries Comparison untuk Conime

## 🆚 Head-to-Head Comparison

| Feature | Heroicons | **Tabler Icons** | Boxicons | Lucide React |
|---------|-----------|------------------|----------|--------------|
| **Total Icons** | 300+ | **4000+** ⭐ | 1500+ | 1000+ |
| **License** | MIT ✅ | **MIT ✅** | MIT ✅ | MIT ✅ |
| **Bundle Size** | Small | **Medium** | Medium | Small |
| **Customization** | Limited | **High** ⭐ | Medium | Medium |
| **TypeScript** | ✅ | **✅** | ✅ | ✅ |
| **Tree Shaking** | ✅ | **✅** | ✅ | ✅ |
| **Maintenance** | Active | **Very Active** ⭐ | Active | Active |

## 🏆 Rekomendasi: **Tabler Icons**

### Mengapa Tabler Icons?

1. **Paling Lengkap**: 4000+ icons vs 300+ Heroicons
2. **100% Gratis**: MIT License tanpa batasan komersial
3. **Stroke Customizable**: Bisa atur ketebalan garis
4. **Konsisten**: Semua icon punya style yang sama
5. **Vue.js Friendly**: Anda familiar dengan ecosystem ini

### Installation & Usage

```bash
# Remove existing icon library (optional)
npm uninstall @heroicons/react

# Install Tabler Icons
npm install @tabler/icons-react
```

```tsx
// Import icons
import { 
  IconHome, 
  IconUser, 
  IconBell,
  IconSun,
  IconMoon,
  IconSearch,
  IconMenu2,
  IconX
} from "@tabler/icons-react";

// Usage with customization
<IconHome 
  size={24}           // Icon size
  stroke={1.5}        // Stroke width
  className="text-primary" 
/>
```

## 🔄 Migration Guide

### Find & Replace untuk Header.tsx

```tsx
// OLD (Heroicons)
import { 
  BellIcon, 
  SunIcon, 
  MoonIcon, 
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// NEW (Tabler Icons)
import { 
  IconBell, 
  IconSun, 
  IconMoon, 
  IconMenu2,
  IconX
} from "@tabler/icons-react";
```

```tsx
// OLD Usage
<BellIcon className="h-4 w-4" />
<SunIcon className="h-4 w-4" />

// NEW Usage  
<IconBell size={16} stroke={1.5} />
<IconSun size={16} stroke={1.5} />
```

## 🎯 Icon Mapping untuk Conime

### Navigation Icons
```tsx
import {
  IconHome,        // Beranda
  IconDeviceTv,    // Anime  
  IconBook,        // Komik
  IconMovie,       // Film
  IconDeviceGamepad2, // Game
  IconStar,        // Ulasan
  IconBell,        // Notifications
  IconSun,         // Light mode
  IconMoon,        // Dark mode
  IconWorld,       // Language
} from "@tabler/icons-react";
```

### Category Icons
```tsx
import {
  IconFlame,          // Trending/Semua
  IconNews,           // Berita
  IconStarFilled,     // Ulasan
  IconThumbUp,        // Rekomendasi
  IconChevronLeft,    // Previous
  IconChevronRight,   // Next
} from "@tabler/icons-react";
```

### Social Media Icons
```tsx
import {
  IconBrandTwitter,   // Twitter
  IconBrandInstagram, // Instagram  
  IconBrandYoutube,   // YouTube
  IconBrandDiscord,   // Discord
  IconBrandTiktok,    // TikTok
} from "@tabler/icons-react";
```

## 🔧 Advanced Customization

### Stroke Width Variations
```tsx
// Thin icons for subtle elements
<IconHome size={20} stroke={1} />

// Normal icons for regular use
<IconHome size={20} stroke={1.5} />

// Bold icons for emphasis
<IconHome size={20} stroke={2} />
```

### Color Variations
```tsx
// Use Tailwind classes
<IconHome className="text-primary" stroke={1.5} />
<IconHome className="text-muted-foreground" stroke={1.5} />

// Or use CSS custom properties
<IconHome style={{ color: 'var(--primary)' }} stroke={1.5} />
```

## 🎨 Icon Consistency Guidelines

### Size Standards
- **Small**: 16px (sidebar, inline text)
- **Medium**: 20px (buttons, nav items)  
- **Large**: 24px (headers, prominent actions)

### Stroke Standards
- **Subtle**: stroke={1} (secondary elements)
- **Normal**: stroke={1.5} (primary elements)
- **Bold**: stroke={2} (emphasis, active states)

## 💡 Pro Tips

1. **Use consistent sizing** across similar elements
2. **Match stroke weight** dengan font weight
3. **Consider icon semantics** - gunakan icon yang intuitif
4. **Test accessibility** - pastikan icon readable di semua theme
5. **Optimize imports** - import specific icons, bukan entire library

## 🚀 Next Steps

1. Install Tabler Icons: `npm install @tabler/icons-react`
2. Update imports di semua component files
3. Customize stroke width sesuai design system
4. Test semua icons di light/dark mode
5. Enjoy 4000+ beautiful icons! 🎉

**Tabler Icons = Best choice untuk Conime project! 🏆**