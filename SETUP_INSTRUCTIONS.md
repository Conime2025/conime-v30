# 🚀 Conime Website - Setup Instructions

## 📋 Tech Stack

Website Conime menggunakan teknologi modern untuk performa dan pengalaman terbaik:

### Core Technologies
- **React 18** - UI Library untuk interaktivitas
- **TypeScript** - Type safety dan developer experience
- **Vite** - Build tool yang super cepat
- **Tailwind CSS v4** - Utility-first CSS framework

### UI & Styling
- **ShadCN/UI** - Component library yang customizable
- **Heroicons** - Icon library (MIT license, gratis)
- **Google Fonts** - Roboto (Instagram-style typography)

### Features
- **Bilingual Support** - Indonesia & English
- **Dark/Light Mode** - Theme switching
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Meta tags & structured data

## 🛠️ Requirements

### System Requirements
```bash
Node.js >= 18.0.0
npm >= 8.0.0 (atau yarn/pnpm)
```

### Check Your Versions
```bash
node --version
npm --version
```

## 📦 Installation

### 1. Clone atau Download Project
```bash
# Jika dari Git
git clone <repository-url>
cd conime-website

# Atau extract dari ZIP file
```

### 2. Install Dependencies
```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

### 3. Start Development Server
```bash
# Menggunakan npm
npm run dev

# Atau menggunakan yarn
yarn dev

# Atau menggunakan pnpm
pnpm dev
```

### 4. Open Browser
```
http://localhost:5173
```

## 🏗️ Build untuk Production

```bash
# Build project
npm run build

# Preview build hasil
npm run preview
```

## 📁 Project Structure

```
conime-website/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # ShadCN UI components
│   │   ├── Header.tsx      # Website header
│   │   ├── NewsCard.tsx    # Article cards
│   │   ├── Sidebar.tsx     # Sidebar content
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   └── useLanguage.tsx # Bilingual system
│   └── styles/
│       └── globals.css     # Tailwind + custom styles
├── App.tsx                 # Main app component
├── index.html             # HTML template
└── package.json           # Dependencies
```

## 🎨 Customization

### Colors
Brand colors sudah di-setup di `styles/globals.css`:
```css
--color-conime-500: #ff1545;  /* Primary red */
```

### Fonts
Instagram-style typography menggunakan Roboto:
```css
font-family: var(--font-roboto);
```

### Components
Semua UI components ada di folder `src/components/ui/` dan bisa di-customize sesuai kebutuhan.

## 📱 Features yang Tersedia

### ✅ Implemented
- [x] Responsive layout (mobile & desktop)
- [x] Dark/light mode toggle
- [x] Bilingual support (ID/EN)
- [x] Category filtering
- [x] SEO optimization
- [x] Modern card-based design
- [x] Interactive buttons (like, comment, share)

### 🔄 Ready for Integration
- [ ] Strapi CMS integration
- [ ] Real API endpoints
- [ ] User authentication
- [ ] Comment system
- [ ] Search functionality

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Traditional Hosting
```bash
npm run build
# Upload dist/ folder to hosting provider
```

## 🔧 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM rendering
- `typescript` - Type checking
- `vite` - Build tool

### UI & Styling
- `@heroicons/react` - Icons
- `tailwindcss` - CSS framework
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes

### Utilities
- `lucide-react` - Additional icons (for ShadCN)

## ❓ Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
npm run dev -- --port 3000
```

### Node Version Issues
```bash
# Install Node 18+
nvm install 18
nvm use 18
```

### Build Errors
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

Jika ada masalah dengan setup:
1. Pastikan Node.js version >= 18
2. Hapus `node_modules` dan install ulang
3. Check console untuk error messages
4. Pastikan semua dependencies ter-install dengan benar

---

**Conime** - Portal berita anime modern dengan teknologi terdepan! 🎌✨