# 🎌 Conime - Anime News Platform

Conime adalah platform berita anime modern yang dibangun dengan React, TypeScript, dan TailwindCSS. Website ini menyediakan berita anime terkini, review, rekomendasi, dan konten multimedia dengan desain responsif dan pengalaman pengguna yang optimal.

## ✨ Features

### 🌐 **Bilingual Support**
- **Bahasa Indonesia** dan **English**
- Dynamic content translation
- Persistent language preference

### 📱 **Responsive Design**
- Mobile-first approach
- Optimized untuk semua device sizes
- Progressive Web App ready

### 🎨 **Modern UI/UX**
- Dark mode dengan localStorage persistence
- Instagram-style typography menggunakan Roboto
- Conime brand colors (#ff1545 primary)
- Smooth animations dan transitions

### 📰 **Content Management**
- Kategori: Anime, Berita, Ulasan, Rekomendasi, Komik, Film, Game
- Advanced filtering dan search
- Pagination support
- SEO optimized

### 🔧 **Technical Features**
- Built with React 18 + TypeScript
- TailwindCSS v4 untuk styling
- Custom Router dengan hash navigation
- Heroicons untuk icon library
- Performance optimized

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd conime

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # ShadCN UI components
│   ├── Header.tsx       # Main navigation
│   ├── Footer.tsx       # Footer dengan links
│   ├── Logo.tsx         # Conime logo components
│   ├── NewsCard.tsx     # Article card component
│   └── Router.tsx       # Custom routing system
├── pages/               # Page components
│   ├── HomePage.tsx     # Landing page
│   ├── ListPage.tsx     # Category listing
│   ├── SinglePage.tsx   # Article detail
│   ├── AboutPage.tsx    # About us
│   ├── ContactPage.tsx  # Contact form
│   ├── HelpPage.tsx     # FAQ & help center
│   ├── CareersPage.tsx  # Job listings
│   ├── PrivacyPage.tsx  # Privacy policy
│   └── TermsPage.tsx    # Terms of service
├── hooks/               # Custom React hooks
├── data/                # Mock data dan constants
└── styles/              # CSS files
```

## 🎨 Brand Identity

### Colors
```css
Primary: #ff1545
Secondary: #e9335a
Dark variants: #cf012b, #a00123
Light variants: #ff6b8a, #fbb8c5
```

### Typography
- **Primary Font**: Roboto (Instagram-style)
- **Japanese**: Noto Sans JP
- **Fallback**: System fonts (-apple-system, BlinkMacSystemFont)

### Logo
- Responsive logo dengan mobile dan desktop variants
- SVG-based untuk crisp rendering
- Dark/light mode adaptive colors

## 🔗 Navigation

### Main Pages
- `/` - Homepage dengan hero section dan featured content
- `/anime` - Anime news dan updates
- `/berita` - General anime news
- `/ulasan` - Reviews dan ratings
- `/rekomendasi` - Recommendations
- `/komik` - Manga news
- `/movie` - Anime movie news
- `/game` - Anime game news

### Utility Pages
- `/about` - About Conime
- `/contact` - Contact form
- `/help` - FAQ dan help center
- `/careers` - Job opportunities
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Hash Navigation
- `/about#team` - Team section
- `/help#faq` - FAQ section
- `/terms#disclaimer` - Disclaimer
- `/terms#copyright` - Copyright info

## 🛠 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### Key Components

#### Router System
Custom routing dengan support untuk:
- Category pages dengan pagination
- Article detail pages
- Hash navigation untuk internal sections
- Browser back/forward navigation

#### Article Management
```typescript
// Article structure
interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  featured: boolean;
}
```

#### Language System
```typescript
// Language hook usage
const { language, toggleLanguage } = useLanguage();

// Conditional content
const content = language === 'id' ? 'Bahasa Indonesia' : 'English';
```

## 🎯 SEO & Performance

### SEO Features
- Dynamic meta tags per page
- Structured data untuk articles
- Open Graph tags
- Twitter Card support
- Sitemap generation ready

### Performance Optimizations
- Component lazy loading
- Image optimization dengan fallbacks
- Font display: swap
- Reduced motion support
- Bundle size optimization

## 🔧 Configuration

### Environment Variables
```env
VITE_APP_NAME=Conime
VITE_APP_URL=https://conime.id
VITE_APP_DESCRIPTION=Platform berita anime terdepan di Indonesia
```

### TailwindCSS Config
- Custom Conime color palette
- Responsive breakpoints
- Font family configurations
- Animation utilities

## 📱 Mobile Optimization

### Features
- Touch-friendly navigation
- Optimized for mobile reading
- Swipe gestures support
- Responsive images
- Fast loading times

### Performance Targets
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- Time to Interactive < 3.0s

## 🤝 Contributing

### Development Guidelines
1. Use TypeScript untuk type safety
2. Follow React hooks best practices
3. Maintain responsive design principles
4. Write accessible HTML
5. Optimize untuk performance

### Code Style
- ESLint + Prettier configuration
- Consistent naming conventions
- Component documentation
- Git commit conventions

## 📄 License

Copyright © 2025 Conime. All rights reserved.

## 📞 Support

### Contact Information
- **Email**: support@conime.id
- **Website**: https://conime.id
- **Help Center**: /help

### Help Resources
- FAQ: `/help#faq`
- Bug Reports: `/contact?type=bug`
- Feature Requests: `/contact?type=feature`

---

**Built with ❤️ for the anime community in Indonesia** 🇮🇩
```

## 🎯 Next Steps

Ready untuk development? Start dengan:

1. `npm install` - Install dependencies
2. `npm run dev` - Start development server
3. Open `http://localhost:5173` - View website
4. Edit `/src/pages/HomePage.tsx` - Customize content
5. Check `/help` page - FAQ dan documentation

Happy coding! 🚀