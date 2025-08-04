# Heroicons Reference for Conime

This document contains commonly used Heroicons in the Conime project to avoid import errors.

## ⚠️ Common Import Errors

### ❌ WRONG:
```javascript
import { TrendingUpIcon } from "@heroicons/react/24/outline";
```

### ✅ CORRECT:
```javascript
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
```

## 📱 Commonly Used Icons in Conime

### Navigation & UI
```javascript
import { 
  Bars3Icon,           // ☰ Menu hamburger
  XMarkIcon,           // ✕ Close/Cancel  
  ChevronLeftIcon,     // ← Left arrow
  ChevronRightIcon,    // → Right arrow
  ChevronDownIcon,     // ↓ Down arrow
  ChevronUpIcon,       // ↑ Up arrow
  HomeIcon,            // 🏠 Home
  ArrowLeftIcon,       // ← Back arrow
} from "@heroicons/react/24/outline";
```

### Content & Media
```javascript
import { 
  EyeIcon,             // 👁 View/Watch
  FireIcon,            // 🔥 Trending/Hot
  ClockIcon,           // ⏰ Time/Recent
  CalendarIcon,        // 📅 Date
  BookOpenIcon,        // 📖 Read/Article
  ChatBubbleLeftIcon,  // 💬 Comments
  HeartIcon,           // ❤️ Like/Favorite
  PaperAirplaneIcon,   // ✈️ Share
  StarIcon,            // ⭐ Featured/Rating
} from "@heroicons/react/24/outline";
```

### Statistics & Analytics
```javascript
import { 
  ArrowTrendingUpIcon,   // 📈 Popular/Trending UP (NOT TrendingUpIcon!)
  ArrowTrendingDownIcon, // 📉 Trending down
  ChartBarIcon,          // 📊 Statistics
  SignalIcon,            // 📶 Signal strength
} from "@heroicons/react/24/outline";
```

### Search & Filters
```javascript
import { 
  MagnifyingGlassIcon,      // 🔍 Search
  AdjustmentsHorizontalIcon, // ⚙️ Filters/Settings
  FunnelIcon,               // 🔽 Filter
  Squares2X2Icon,           // ⊞ Grid view
  ListBulletIcon,           // ☰ List view
} from "@heroicons/react/24/outline";
```

### User & Social
```javascript
import { 
  UserIcon,            // 👤 User/Profile
  UserCircleIcon,      // 👤 User avatar
  UsersIcon,           // 👥 Multiple users
  LinkIcon,            // 🔗 Link/Related
  TagIcon,             // 🏷️ Tags
} from "@heroicons/react/24/outline";
```

### Communication
```javascript
import { 
  BellIcon,            // 🔔 Notifications
  ChatBubbleOvalLeftIcon, // 💬 Chat bubble
  EnvelopeIcon,        // ✉️ Email
  PhoneIcon,           // ☎️ Phone
} from "@heroicons/react/24/outline";
```

### Content Categories (Anime/Manga specific)
```javascript
import { 
  FilmIcon,            // 🎬 Movies/Anime
  MusicalNoteIcon,     // 🎵 Music/OST
  PhotoIcon,           // 🖼️ Images/Gallery
  PlayIcon,            // ▶️ Play video
  DocumentTextIcon,    // 📄 Text/Articles
} from "@heroicons/react/24/outline";
```

## 🎯 Conime-Specific Usage Patterns

### Homepage Sections
```javascript
// Featured articles
<StarIcon className="h-6 w-6 text-primary" />

// Trending today
<FireIcon className="h-6 w-6 text-orange-500" />

// Latest articles  
<ClockIcon className="h-6 w-6 text-blue-500" />

// Popular this week
<ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
```

### Article Interactions
```javascript
// View count
<EyeIcon className="w-4 h-4" />

// Like count
<HeartIcon className="w-4 h-4" />

// Comment count
<ChatBubbleLeftIcon className="w-4 h-4" />

// Share button
<PaperAirplaneIcon className="w-4 h-4" />
```

### Navigation
```javascript
// Back button
<ArrowLeftIcon className="h-4 w-4 mr-2" />

// Pagination
<ChevronLeftIcon className="h-4 w-4 mr-2" />
<ChevronRightIcon className="h-4 w-4 ml-2" />
```

## 🚨 Icons to Watch Out For

These icons have tricky names that often cause import errors:

| ❌ Common Mistake | ✅ Correct Name |
|------------------|-----------------|
| `TrendingUpIcon` | `ArrowTrendingUpIcon` |
| `SearchIcon` | `MagnifyingGlassIcon` |
| `MenuIcon` | `Bars3Icon` |
| `CloseIcon` | `XMarkIcon` |
| `SettingsIcon` | `AdjustmentsHorizontalIcon` |

## 💡 Pro Tips

1. **Always use outline version** for consistency: `@heroicons/react/24/outline`
2. **Check the official docs** when unsure: https://heroicons.com/
3. **Use VS Code autocomplete** to avoid typos
4. **Keep icon sizes consistent** in components:
   - Small: `w-3 h-3` or `w-4 h-4`
   - Medium: `w-5 h-5` or `w-6 h-6`
   - Large: `w-8 h-8` or larger

## 🔧 Quick Fix Commands

If you encounter import errors, search and replace:
```bash
# Find incorrect imports
grep -r "TrendingUpIcon" src/

# Replace with correct import
sed -i 's/TrendingUpIcon/ArrowTrendingUpIcon/g' src/**/*.tsx
```

---

**Last Updated:** December 2024  
**Conime Development Team**