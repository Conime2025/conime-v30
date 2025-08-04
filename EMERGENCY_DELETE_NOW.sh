#!/bin/bash
# 🚨 EMERGENCY FIX - Execute immediately to fix LanguageProvider error

echo "🚨 FIXING LANGUAGEPROVIDER ERROR - DELETING BROKEN FILES..."

# 1. DELETE BROKEN ROOT APP.TSX (root cause of error)
rm -f App.tsx
echo "✅ Deleted broken root App.tsx"

# 2. DELETE ALL DOCUMENTATION CLUTTER (15+ files!)
rm -f *.md
rm -f FontFallbackDemo.tsx
rm -f DELETE_THESE_FILES.txt
rm -f FINAL_WORKING_APP.tsx
echo "✅ Deleted documentation clutter"

# 3. DELETE DUPLICATE DIRECTORIES (keep only src/ versions)
rm -rf components
rm -rf hooks  
rm -rf styles
echo "✅ Deleted duplicate directories"

# 4. VERIFY STRUCTURE
echo "📁 Final structure:"
ls -la src/
echo ""
echo "🚀 Ready to test: npm run dev"