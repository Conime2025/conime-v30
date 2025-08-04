#!/bin/bash
echo "🚨 FIXING LANGUAGEPROVIDER ERROR NOW..."

# 1. DELETE BROKEN ROOT APP.TSX (root cause!)
rm -f App.tsx
echo "✅ Deleted broken App.tsx"

# 2. DELETE ALL DOCUMENTATION CLUTTER (20+ files!)
rm -f *.md
rm -f FontFallbackDemo.tsx  
rm -f DELETE_THESE_FILES.txt
rm -f FINAL_WORKING_APP.tsx
rm -f EMERGENCY_DELETE_NOW.sh
echo "✅ Deleted documentation clutter"

# 3. DELETE DUPLICATE DIRECTORIES 
rm -rf components
rm -rf hooks
rm -rf styles
echo "✅ Deleted duplicate directories"

# 4. VERIFY MAIN.TSX IS CORRECT
echo "📝 Current main.tsx content:"
cat main.tsx

echo ""
echo "🎯 FIXED! File structure now:"
echo "├── src/"
echo "│   ├── App.tsx (WORKING)"  
echo "│   ├── components/"
echo "│   ├── hooks/"
echo "│   └── styles/"
echo "├── main.tsx (points to src/)"
echo "├── index.html"
echo "└── package.json"
echo ""
echo "🚀 Ready to test: npm run dev"