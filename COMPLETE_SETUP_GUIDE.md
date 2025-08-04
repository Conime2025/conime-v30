# 🚀 Conime Website - Complete Setup Guide

## 📁 Project Structure (Simplified)

```
conime-website/
├── src/
│   ├── App.tsx                    # Main app
│   ├── main.tsx                   # Entry point
│   ├── index.html                 # HTML template
│   ├── components/
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Logo.tsx               # Your actual Conime logo
│   │   ├── CategoryFilter.tsx     # Filter buttons
│   │   ├── HeroSection.tsx        # Hero banner
│   │   ├── NewsCard.tsx           # Article cards
│   │   ├── Sidebar.tsx            # Sidebar content
│   │   ├── LanguageToggle.tsx     # ID/EN switcher
│   │   └── ui/                    # ShadCN components
│   ├── hooks/
│   │   └── useLanguage.tsx        # Language hook
│   └── styles/
│       └── globals.css            # All styles
├── package.json                   # Dependencies
├── tailwind.config.js             # Tailwind config
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite config
└── README.md                      # This guide
```

---

## 🛠️ Step 1: Create New Project

### Option A: Using Vite (Recommended)
```bash
# Create new React + TypeScript project
npm create vite@latest conime-website -- --template react-ts

# Enter project directory
cd conime-website

# Install dependencies
npm install
```

### Option B: Using Create React App
```bash
# Create new React + TypeScript project
npx create-react-app conime-website --template typescript

# Enter project directory
cd conime-website
```

---

## 📦 Step 2: Install Dependencies

Copy the `package.json` file below, then run:

```bash
# Remove old package-lock.json (if exists)
rm -f package-lock.json

# Install all dependencies
npm install

# Install additional dependencies
npm install @heroicons/react @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-slot class-variance-authority clsx tailwind-merge

# Install Tailwind CSS
npm install -D tailwindcss@next postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

---

## ⚙️ Step 3: Configuration Files

### Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Create `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

---

## 📁 Step 4: Create Folder Structure

```bash
# Create all necessary folders
mkdir -p src/components/ui
mkdir -p src/hooks
mkdir -p src/styles
mkdir -p src/components/figma

# Create main files
touch src/main.tsx
touch src/App.tsx
touch src/styles/globals.css
touch src/hooks/useLanguage.tsx
```

---

## 🎨 Step 5: Copy All Files

Now copy all the provided files into your project:

1. **Copy `globals.css`** → `src/styles/globals.css`
2. **Copy `App.tsx`** → `src/App.tsx`  
3. **Copy all components** → `src/components/`
4. **Copy `useLanguage.tsx`** → `src/hooks/`
5. **Copy UI components** → `src/components/ui/`

---

## 🚀 Step 6: Run Development Server

```bash
# Start development server
npm run dev

# Your website will be available at:
# http://localhost:5173
```

---

## 🔧 Troubleshooting Common Errors

### Error: "Module not found"
```bash
# Solution: Install missing dependencies
npm install @heroicons/react @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

### Error: "Tailwind classes not working"
```bash
# Solution: Import globals.css in main.tsx
# Add this line: import './styles/globals.css'
```

### Error: "TypeScript errors"
```bash
# Solution: Install type definitions
npm install -D @types/react @types/react-dom
```

### Error: "Build fails"
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Solution: Use different port
npm run dev -- --port 3001
```

---

## 📱 Testing Your Website

### ✅ Features to Test:
- [ ] **Language Toggle** - Switch between Indonesian/English
- [ ] **Dark Mode** - Toggle dark/light theme
- [ ] **Category Filter** - Filter news by category
- [ ] **Responsive Design** - Test on mobile/tablet/desktop
- [ ] **Logo Display** - Check both mobile and desktop logos
- [ ] **Navigation** - All menu items work
- [ ] **Pagination** - Next/previous pages work
- [ ] **Performance** - Fast loading and smooth animations

---

## 🎯 Quick Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check code quality

# Deployment
npm run build && npm run preview  # Test production build locally
```

---

## 🌐 Deployment Options

### Vercel (Recommended - FREE)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts, website will be live in minutes!
```

### Netlify (Alternative - FREE)
```bash
# Build project
npm run build

# Drag & drop 'dist' folder to netlify.com
```

---

## 💡 Pro Tips

### 1. **Font Loading Optimization**
Your Google Fonts are already optimized in `globals.css`:
- Roboto for body text (Instagram-style)
- Poppins for branding
- Noto Sans JP for Japanese text

### 2. **Performance**
Website is already optimized:
- Tree-shaking enabled
- Code splitting automatic
- Images lazy loaded
- CSS purged

### 3. **SEO Ready**
Built-in SEO features:
- Meta tags
- Structured data
- Sitemap ready
- Social media cards

---

## 🎨 Customization Guide

### Change Colors:
Edit `globals.css` → Search for `--color-conime-500` and modify values

### Add New Pages:
1. Create new component in `components/`
2. Add route in `App.tsx`
3. Update navigation in `Header.tsx`

### Modify Content:
Edit `newsData` array in `App.tsx` to change articles

---

## 📞 Need Help?

### Common Issues:
1. **Node.js version** - Use Node.js 18+ 
2. **NPM cache** - Run `npm cache clean --force`
3. **Port conflicts** - Kill other processes using port 5173
4. **Permissions** - Run with `sudo` if needed (Linux/Mac)

### Debug Mode:
```bash
# Enable verbose logging
npm run dev -- --debug

# Check dependency tree
npm ls
```

---

## ✅ Final Checklist

Before considering setup complete:

- [ ] `npm run dev` works without errors
- [ ] Website loads at `http://localhost:5173`
- [ ] Conime logo displays correctly
- [ ] Language toggle works (ID/EN)
- [ ] Dark mode toggle works
- [ ] Category filtering works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] All fonts loading properly

**If all boxes are checked - congratulations! Your Conime website is ready! 🎉**

---

*Ready to build your anime news empire! 🚀*