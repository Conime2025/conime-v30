# 🚀 Conime Website - Setup Guide

## 📋 Prerequisites
- **Node.js** (v18.0.0 atau lebih baru)
- **npm** atau **yarn** atau **pnpm**

## 🛠️ Installation Steps

### 1. Extract/Clone Project
```bash
# Download dan extract project ke folder
cd conime-website
```

### 2. Install Dependencies
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm (recommended untuk performa)
pnpm install
```

### 3. Setup Environment (Optional)
```bash
# Copy environment file (jika ada)
cp .env.example .env.local
```

### 4. Install Additional Dependencies
Project ini menggunakan beberapa package yang perlu diinstall:

```bash
# Core dependencies yang wajib
npm install react react-dom
npm install @types/react @types/react-dom
npm install typescript
npm install vite @vitejs/plugin-react
npm install tailwindcss autoprefixer postcss

# UI Components (ShadCN)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu  
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx tailwind-merge

# Icon Library - PILIH SALAH SATU:

# Option 1: Heroicons (current - 300+ icons)
npm install @heroicons/react

# Option 2: Boxicons (1500+ icons) - Mungkin yang Anda maksud?
npm install boxicons react-boxicons

# Option 3: Tabler Icons (4000+ icons) - Paling lengkap
npm install @tabler/icons-react

# Option 4: Lucide React (1000+ icons) - Clean design
npm install lucide-react
```

### 5. Run Development Server
```bash
# Start development server
npm run dev

# Atau
yarn dev

# Atau  
pnpm dev
```

Project akan berjalan di: `http://localhost:5173`

### 6. Build for Production
```bash
# Build project
npm run build

# Preview build
npm run preview
```

## 🎨 Icon Library Comparison

### 🏆 **Recommended: Tabler Icons** (4000+ icons)
```bash
npm install @tabler/icons-react
```
```tsx
import { IconHome, IconUser, IconSettings } from '@tabler/icons-react';

<IconHome size={24} stroke={1.5} />
```

**Keunggulan:**
- ✅ **4000+ icons** (paling lengkap)
- ✅ **100% FREE** MIT License
- ✅ **Konsisten design** - semua stroke-based
- ✅ **Customizable** stroke width
- ✅ **Tree-shakeable** - hanya import yang dipakai
- ✅ **TypeScript support** built-in

### 🥈 **Alternative: Boxicons** (1500+ icons)
```bash  
npm install react-boxicons
```
```tsx
import { BxHome, BxUser, BxCog } from 'react-boxicons';

<BxHome size="24px" color="#ff1545" />
```

**Keunggulan:**
- ✅ **1500+ icons** 
- ✅ **100% FREE** MIT License
- ✅ **Filled & Outline versions**
- ✅ **Popular in Vue ecosystem** (mungkin yang Anda kenal)

### 🥉 **Current: Heroicons** (300+ icons)
```bash
npm install @heroicons/react
```
```tsx
import { HomeIcon } from '@heroicons/react/24/outline';

<HomeIcon className="h-6 w-6" />
```

**Keunggulan:**
- ✅ **300+ icons** (cukup untuk most use cases)
- ✅ **100% FREE** MIT License  
- ✅ **Made by Tailwind team** - perfect integration
- ✅ **Outline & Solid versions**

## 🔄 Switching Icon Libraries

Jika Anda ingin ganti dari Heroicons ke Tabler Icons:

### 1. Install Tabler Icons
```bash
npm install @tabler/icons-react
npm uninstall @heroicons/react
```

### 2. Update imports di semua files
```tsx
// Dari Heroicons
import { BellIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

// Ke Tabler Icons  
import { IconBell, IconSun, IconMoon } from "@tabler/icons-react";
```

### 3. Update component usage
```tsx
// Heroicons style
<BellIcon className="h-4 w-4" />

// Tabler Icons style
<IconBell size={16} stroke={1.5} />
```

## 📦 Project Structure
```
conime-website/
├── src/
│   ├── App.tsx              # Main app component
│   ├── components/          # Reusable components
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global CSS
│   └── types/              # TypeScript types
├── public/                 # Static assets
├── package.json           # Dependencies
└── vite.config.ts         # Vite configuration
```

## 🌐 Integration dengan Strapi CMS

Ketika siap untuk integrate dengan Strapi:

### 1. Install Strapi Client
```bash
npm install @strapi/strapi axios
```

### 2. Setup API calls
```tsx
// lib/strapi.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const strapiApi = axios.create({
  baseURL: `${API_URL}/api`,
});

export const getArticles = async (locale = 'id') => {
  const response = await strapiApi.get('/articles', {
    params: { locale }
  });
  return response.data;
};
```

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔧 Development Tips

1. **Hot Reload**: Changes akan auto-reload
2. **TypeScript**: Semua files sudah typed
3. **Tailwind**: IntelliSense akan bekerja otomatis
4. **Icons**: Gunakan tree-shaking untuk optimasi bundle size

## ❓ Troubleshooting

### Error: Module not found
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors
```bash
# Check TypeScript
npx tsc --noEmit
```

### Tailwind tidak bekerja
```bash
# Pastikan globals.css di-import di main.tsx
# Check tailwind.config.js configuration
```

**Ready to go! 🎉**