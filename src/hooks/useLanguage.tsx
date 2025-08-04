import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  id: {
    // Navigation - Updated Menu
    'nav.home': 'Beranda',
    'nav.anime': 'Anime',
    'nav.comics': 'Komik',
    'nav.movies': 'Film',
    'nav.games': 'Game',
    'nav.reviews': 'Ulasan',
    
    // Categories
    'category.all': 'Semua',
    'category.news': 'Berita',
    'category.reviews': 'Ulasan', 
    'category.recommendations': 'Rekomendasi',
    'category.anime': 'Anime',
    'category.comics': 'Komik',
    'category.movies': 'Movie',
    'category.games': 'Game',
    
    // Hero Section
    'hero.portal': 'Portal',
    'hero.trusted': 'Terpercaya',
    'hero.tagline': 'Portal terpercaya untuk anime, manga, komik, film, dan game. Temukan konten terbaru dan berkualitas di sini.',
    'hero.trending': 'Trending',
    'hero.latestUpdates': 'Update Terkini',
    'hero.popularWeek': 'Popular Minggu Ini',
    'hero.featuredArticle': 'Artikel Unggulan',
    'hero.featuredDesc': 'Jangan lewatkan artikel pilihan kami yang sedang trending dan banyak dibicarakan komunitas!',
    'hero.read': 'Baca Selengkapnya',
    
    // Common
    'common.author': 'Oleh',
    'common.readMore': 'Baca Selengkapnya',
    'common.comments': 'Komentar',
    'common.likes': 'Suka',
    'common.share': 'Bagikan',
    'common.loading': 'Memuat...',
    'common.error': 'Terjadi Kesalahan',
    'common.noResults': 'Tidak Ada Hasil',
    'common.tryDifferentFilter': 'Coba filter yang berbeda atau lihat semua konten.',
    'common.viewAll': 'Lihat Semua',
    'common.page': 'Halaman',
    'common.previous': 'Sebelumnya',
    'common.next': 'Selanjutnya',
    'common.comingSoon': 'Segera Hadir!',
    
    // Sidebar
    'sidebar.trending': 'Trending Hari Ini',
    'sidebar.popular': 'Populer Minggu Ini',
    'sidebar.latest': 'Terbaru',
    'sidebar.recommended': 'Rekomendasi',
    'sidebar.tags': 'Tag Populer',
    'sidebar.social': 'Ikuti Kami',
    
    // Footer
    'footer.tagline': 'Portal terpercaya untuk anime, manga, komik, film, dan game. Temukan konten terbaru dan berkualitas di sini.',
    'footer.categories': 'Kategori',
    'footer.content': 'Konten',
    'footer.company': 'Perusahaan',
    'footer.legal': 'Legal',
    'footer.aboutUs': 'Tentang Kami',
    'footer.contact': 'Kontak',
    'footer.privacyPolicy': 'Kebijakan Privasi',
    'footer.termsOfService': 'Syarat Layanan',
    'footer.disclaimer': 'Disclaimer',
    'footer.tags': 'Semua Tag',
    'footer.followUs': 'Ikuti Kami',
    'footer.copyright': 'Semua hak dilindungi.',
    'footer.copyrightDisclaimer': 'Semua nama, logo, dan gambar merupakan hak milik pemilik masing-masing. Digunakan hanya untuk keperluan informasi dan editorial. Tidak bermaksud melakukan pelanggaran hak cipta.',
    
    // SEO
    'seo.defaultDescription': 'Portal berita anime, manga, komik, film dan game terpercaya. Update terkini, ulasan mendalam, dan rekomendasi terbaik untuk otaku Indonesia.',
    'seo.keywords': 'anime, manga, komik, film anime, game anime, otaku, anime indonesia, berita anime, ulasan anime'
  },
  en: {
    // Navigation - Updated Menu
    'nav.home': 'Home',
    'nav.anime': 'Anime',
    'nav.comics': 'Comics',
    'nav.movies': 'Movies',
    'nav.games': 'Games',
    'nav.reviews': 'Reviews',
    
    // Categories
    'category.all': 'All',
    'category.news': 'News',
    'category.reviews': 'Reviews',
    'category.recommendations': 'Recommendations', 
    'category.anime': 'Anime',
    'category.comics': 'Comics',
    'category.movies': 'Movies',
    'category.games': 'Games',
    
    // Hero Section
    'hero.portal': 'Trusted',
    'hero.trusted': 'Portal',
    'hero.tagline': 'Trusted portal for anime, manga, comics, movies, and games. Discover the latest and quality content here.',
    'hero.trending': 'Trending',
    'hero.latestUpdates': 'Latest Updates',
    'hero.popularWeek': 'Popular This Week',
    'hero.featuredArticle': 'Featured Article',
    'hero.featuredDesc': "Don't miss our featured article that's currently trending and being discussed by the community!",
    'hero.read': 'Read More',
    
    // Common
    'common.author': 'By',
    'common.readMore': 'Read More',
    'common.comments': 'Comments',
    'common.likes': 'Likes',
    'common.share': 'Share',
    'common.loading': 'Loading...',
    'common.error': 'An Error Occurred',
    'common.noResults': 'No Results Found',
    'common.tryDifferentFilter': 'Try a different filter or view all content.',
    'common.viewAll': 'View All',
    'common.page': 'Page',
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.comingSoon': 'Coming Soon!',
    
    // Sidebar
    'sidebar.trending': 'Trending Today',
    'sidebar.popular': 'Popular This Week',
    'sidebar.latest': 'Latest',
    'sidebar.recommended': 'Recommended',
    'sidebar.tags': 'Popular Tags',
    'sidebar.social': 'Follow Us',
    
    // Footer
    'footer.tagline': 'Trusted portal for anime, manga, comics, movies, and games. Discover the latest and quality content here.',
    'footer.categories': 'Categories',
    'footer.content': 'Content',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.disclaimer': 'Disclaimer',
    'footer.tags': 'All Tags',
    'footer.followUs': 'Follow Us',
    'footer.copyright': 'All rights reserved.',
    'footer.copyrightDisclaimer': 'All names, logos, and images are the property of their respective owners. Used for informational and editorial purposes only. No copyright infringement intended.',
    
    // SEO
    'seo.defaultDescription': 'Trusted anime, manga, comics, movies and games news portal. Latest updates, in-depth reviews, and best recommendations for Indonesian otaku.',
    'seo.keywords': 'anime, manga, comics, anime movies, anime games, otaku, indonesian anime, anime news, anime reviews'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('conime-language');
    return (saved === 'en' || saved === 'id') ? saved : 'id';
  });

  const setLanguageWithStorage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('conime-language', lang);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguageWithStorage(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: setLanguageWithStorage, 
      toggleLanguage,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}