# 🗂️ Conime Website - Proper File Structure

## 📁 Target Structure (Sesuai Gambar)

```
conime-website/
├── src/                          # ← Semua source code di sini
│   ├── App.tsx                   # ← Main app component
│   ├── main.tsx                  # ← Entry point
│   ├── components/               # ← Semua React components
│   │   ├── Header.tsx
│   │   ├── Logo.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── HeroSection.tsx
│   │   ├── NewsCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── SEOHead.tsx
│   │   ├── StructuredData.tsx
│   │   ├── PerformanceOptimizer.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/                   # ← ShadCN UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── ... (semua UI components)
│   ├── hooks/                    # ← Custom React hooks
│   │   └── useLanguage.tsx
│   └── styles/                   # ← CSS & styling
│       └── globals.css
├── public/                       # ← Static assets (opsional)
├── index.html                    # ← HTML template
├── package.json                  # ← Dependencies
├── tailwind.config.js            # ← Tailwind config
├── tsconfig.json                 # ← TypeScript config
├── vite.config.ts                # ← Vite config
└── README.md                     # ← Project documentation
```

---

## 🔄 Step-by-Step Restructuring

### Step 1: Create `src` Directory
```bash
mkdir src
mkdir src/components
mkdir src/components/ui
mkdir src/components/figma
mkdir src/hooks
mkdir src/styles
```

### Step 2: Move Files to Correct Locations

#### Move Main Files
```bash
# Move main app files ke src/
mv App.tsx src/App.tsx
mv main.tsx src/main.tsx

# Move styles
mv styles/globals.css src/styles/globals.css
```

#### Move Components
```bash
# Move semua components ke src/components/
mv components/Header.tsx src/components/Header.tsx
mv components/Logo.tsx src/components/Logo.tsx
mv components/CategoryFilter.tsx src/components/CategoryFilter.tsx
mv components/HeroSection.tsx src/components/HeroSection.tsx
mv components/NewsCard.tsx src/components/NewsCard.tsx
mv components/Sidebar.tsx src/components/Sidebar.tsx
mv components/LanguageToggle.tsx src/components/LanguageToggle.tsx
mv components/SEOHead.tsx src/components/SEOHead.tsx
mv components/StructuredData.tsx src/components/StructuredData.tsx
mv components/PerformanceOptimizer.tsx src/components/PerformanceOptimizer.tsx

# Move UI components
mv components/ui/* src/components/ui/

# Move figma components
mv components/figma/* src/components/figma/
```

#### Move Hooks
```bash
# Move hooks
mv hooks/useLanguage.tsx src/hooks/useLanguage.tsx
```

### Step 3: Clean Up Root Directory
```bash
# Remove unnecessary documentation files
rm Attributions.md
rm COMPLETE_SETUP_GUIDE.md
rm EASY_INSTALL.md
rm FontAnalysis.md
rm FontFallbackDemo.tsx
rm Guidelines.md
rm HEROICONS_REFERENCE.md
rm ICON_COMPARISON.md
rm INSTAGRAM_FONT_EXPLANATION.md
rm LICENSE_CONFIRMATION.md
rm MONETIZATION_GUIDE.md
rm SETUP_GUIDE.md

# Remove old empty directories
rmdir components/ui
rmdir components/figma
rmdir components
rmdir hooks
rmdir styles
```

---

## 📝 Update Import Paths

Setelah memindahkan files, update import paths di semua files:

### In `src/main.tsx`:
```tsx
import './styles/globals.css'  // ← Updated path
```

### In `src/App.tsx`:
```tsx
// Update semua imports
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { Sidebar } from "./components/Sidebar";
// ... etc
```

### In Components:
```tsx
// Update UI imports
import { Button } from "./ui/button";  // ← Relative path tetap sama

// Update hook imports
import { useLanguage } from "../hooks/useLanguage";  // ← Add '../'
```

---

## ✅ Final Clean Structure

```
conime-website/
├── src/                     ✅ All source code
│   ├── App.tsx             ✅ Main app
│   ├── main.tsx            ✅ Entry point  
│   ├── components/         ✅ Components directory
│   ├── hooks/              ✅ Hooks directory
│   └── styles/             ✅ Styles directory
├── index.html              ✅ HTML template
├── package.json            ✅ Dependencies
├── tailwind.config.js      ✅ Tailwind config
├── tsconfig.json           ✅ TypeScript config
├── vite.config.ts          ✅ Vite config
└── README.md               ✅ Documentation
```

---

## 🚀 Commands to Execute

```bash
# 1. Create directory structure
mkdir -p src/components/ui src/components/figma src/hooks src/styles

# 2. Move main files
mv App.tsx src/
mv main.tsx src/

# 3. Move styles
mv styles/globals.css src/styles/

# 4. Move all components
mv components/*.tsx src/components/
mv components/ui/*.tsx src/components/ui/
mv components/figma/*.tsx src/components/figma/

# 5. Move hooks
mv hooks/*.tsx src/hooks/

# 6. Clean up
rm -rf components hooks styles
rm *.md (except README.md)
rm FontFallbackDemo.tsx

# 7. Test
npm run dev
```

---

## 🎯 Benefits of This Structure

### ✅ Proper Organization:
- **src/** contains all source code
- **Clear separation** between components, hooks, styles
- **Standard Vite structure** yang familiar

### ✅ Better Development:
- **Easier imports** dengan predictable paths
- **Better IDE support** dengan proper structure
- **Scalable** untuk project yang berkembang

### ✅ Clean Root:
- **Only config files** di root directory
- **No clutter** dari documentation files
- **Professional appearance**

---

## 🔧 Updated vite.config.ts

Make sure vite config points to correct structure:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // ← Correct path
    },
  },
})
```

---

## ✅ Verification Checklist

After restructuring:

- [ ] `npm install` works
- [ ] `npm run dev` starts without errors
- [ ] Website loads at `http://localhost:5173`
- [ ] All components render correctly
- [ ] No import errors in browser console
- [ ] Logo displays properly
- [ ] Language toggle works
- [ ] Dark mode works

**If all checkboxes ✅ → Perfect structure achieved!** 🎉