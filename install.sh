#!/bin/bash

# 🚀 Conime Website - Auto Installation Script
# Skrip instalasi otomatis untuk website Conime

echo "🎌 =========================================="
echo "🚀 CONIME WEBSITE - AUTO INSTALLER"
echo "🎌 =========================================="
echo ""

# Check Node.js version
echo "📋 Checking system requirements..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak ditemukan!"
    echo "📥 Silakan install Node.js v18+ dari: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version terlalu lama: $(node -v)"
    echo "📥 Minimal Node.js v18.0.0 dibutuhkan"
    echo "📥 Download dari: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Clean install
echo "🧹 Cleaning previous installation..."
rm -rf node_modules package-lock.json yarn.lock pnpm-lock.yaml

echo "📦 Installing dependencies..."
echo "⏳ This may take a few minutes..."
echo ""

# Install dependencies
npm install --verbose

# Install additional UI dependencies
echo ""
echo "🎨 Installing UI dependencies..."
npm install @heroicons/react@^2.0.18 class-variance-authority@^0.7.0 clsx@^2.0.0 lucide-react@^0.263.1 tailwind-merge@^2.0.0

echo ""
echo "🎉 =========================================="
echo "✅ INSTALLATION COMPLETED!"
echo "🎉 =========================================="
echo ""
echo "🚀 Quick Start Commands:"
echo "   npm run dev     - Start development server"
echo "   npm run build   - Build for production"
echo "   npm run preview - Preview production build"
echo ""
echo "🌐 Development server will run on:"
echo "   http://localhost:5173"
echo ""
echo "📁 Project structure:"
echo "   src/components/ - React components"
echo "   src/styles/     - CSS styles"
echo "   src/hooks/      - Custom hooks"
echo ""
echo "🎨 Features:"
echo "   ✅ Responsive design"
echo "   ✅ Dark/Light mode"
echo "   ✅ Bilingual support"
echo "   ✅ SEO optimized"
echo ""
echo "Ready to start coding! 🎌✨"