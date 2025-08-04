#!/bin/bash

echo "🧹 Starting CoNime Project Cleanup..."
echo "This will remove all unnecessary guide files and duplicates."

# Confirm cleanup
read -p "Are you sure you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 1
fi

echo "📁 Removing guide files from root directory..."

# Remove all guide files
rm -f ARTICLE_MANAGEMENT_GUIDE.md
rm -f CLEANUP_COMMANDS_FINAL.md
rm -f COMPLETE_SETUP_GUIDE.md
rm -f DELETE_THESE_FILES.txt
rm -f EASY_INSTALL.md
rm -f EMERGENCY_CLEANUP.md
rm -f EMERGENCY_DELETE_NOW.sh
rm -f EXECUTE_FIX_NOW.md
rm -f FINAL_CLEANUP_GUIDE.md
rm -f FINAL_CLEANUP_NOW.md
rm -f FINAL_FIX_COMMANDS.md
rm -f FINAL_WORKING_APP.tsx
rm -f FontAnalysis.md
rm -f FontFallbackDemo.tsx
rm -f Guidelines.md
rm -f HEROICONS_REFERENCE.md
rm -f ICON_COMPARISON.md
rm -f IMMEDIATE_FIX.sh
rm -f INSTAGRAM_FONT_EXPLANATION.md
rm -f LICENSE_CONFIRMATION.md
rm -f MONETIZATION_GUIDE.md
rm -f RESTRUCTURE_GUIDE.md
rm -f SETUP_GUIDE.md
rm -f SETUP_INSTRUCTIONS.md
rm -f SIMPLE_SETUP_COMMANDS.md
rm -f install.sh
rm -f tailwind.config.js

echo "🗂️ Removing duplicate directories..."

# Remove duplicate components and hooks in root
rm -rf components/
rm -rf hooks/
rm -rf styles/

# Remove duplicate main.tsx in root
rm -f main.tsx

echo "🎨 Cleaning unnecessary CSS files..."

# Remove duplicate CSS files
rm -f src/styles/article-enhancements.css

echo "✅ Cleanup completed successfully!"
echo ""
echo "📋 Remaining structure:"
echo "├── App.tsx                    # Main app"
echo "├── README.md                  # Project documentation"  
echo "├── Attributions.md            # License info"
echo "├── package.json              # Dependencies"
echo "├── vite.config.ts            # Vite config"
echo "├── index.html                # HTML template"
echo "└── src/"
echo "    ├── main.tsx              # Entry point"
echo "    ├── components/           # All components"
echo "    ├── pages/               # All pages"
echo "    ├── hooks/               # Custom hooks"
echo "    ├── data/                # Mock data"
echo "    ├── constants/           # Constants"
echo "    └── styles/"
echo "        └── globals.css      # Main CSS"
echo ""
echo "🚀 Project is now clean and ready for development!"
echo ""
echo "Next steps:"
echo "1. Run: npm install"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:5173"
echo ""
echo "Don't forget to remove this cleanup script:"
echo "rm CLEANUP_NOW.sh"