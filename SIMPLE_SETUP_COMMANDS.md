# 🚀 Conime Website - Simple Setup Commands

## 📁 Step 1: Create Proper Structure

```bash
# Create src directory and subdirectories
mkdir -p src/components/ui src/components/figma src/hooks src/styles

# Move main app files to src/
mv App.tsx src/App.tsx
mv main.tsx src/main.tsx

# Move styles
mv styles/globals.css src/styles/globals.css

# Move all components to src/components/
mv components/*.tsx src/components/ 2>/dev/null || true
mv components/ui/*.tsx src/components/ui/ 2>/dev/null || true
mv components/figma/*.tsx src/components/figma/ 2>/dev/null || true

# Move hooks
mv hooks/*.tsx src/hooks/ 2>/dev/null || true

# Clean up old directories
rm -rf components hooks styles

# Remove documentation files (keep only README.md)
rm -f *.md
rm -f FontFallbackDemo.tsx

# Keep only essential files in root
```

## 📋 Step 2: Update package.json (if needed)

```bash
# Install dependencies (if not already installed)
npm install
```

## ⚙️ Step 3: Test Setup

```bash
# Start development server
npm run dev

# Should open at: http://localhost:5173
```

## ✅ Final Structure Check

Your folder should look like this:

```
conime-website/
├── src/                    ✅
│   ├── App.tsx            ✅
│   ├── main.tsx           ✅
│   ├── components/        ✅
│   ├── hooks/             ✅
│   └── styles/            ✅
├── index.html             ✅
├── package.json           ✅
├── tailwind.config.js     ✅
├── tsconfig.json          ✅
├── vite.config.ts         ✅
└── README.md              ✅
```

## 🔧 If You Get Errors

### Import Path Errors:
Most imports should work automatically, but if you see errors:

```tsx
// In components, update relative paths:
import { useLanguage } from "../hooks/useLanguage";  // Add '../'
```

### Missing Files Error:
```bash
# Check if all files moved correctly
ls src/
ls src/components/
ls src/hooks/
ls src/styles/
```

### Vite Config Issue:
Make sure `vite.config.ts` has correct path:
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),  // Points to src/
  },
},
```

## 🎉 Success!

If `npm run dev` works and website loads → **Perfect structure achieved!** 🎯

**Your Conime website is now properly organized and ready for development!** ✨