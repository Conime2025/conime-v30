import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'id' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Navigation
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
    
    // Common
    'common.author': 'Oleh',
    'common.readMore': 'Baca Selengkapnya',
    'common.comments': 'Komentar',
    'common.likes': 'Suka',
    'common.previous': 'Sebelumnya',
    'common.next': 'Selanjutnya',
    'common.page': 'Halaman',
    'common.viewAll': 'Lihat Semua Konten',
    'common.noResults': 'Tidak ada konten ditemukan',
    'common.tryDifferentFilter': 'Coba ubah filter atau kembali ke semua konten',
    
    // Hero Section
    'hero.portal': 'Portal',
    'hero.trusted': 'Terpercaya',
    'hero.tagline': 'Temukan dunia anime, manga, komik, film, dan game terbaru di satu tempat',
    'hero.trending': 'Trending Hari Ini',
    'hero.latestUpdates': 'Update Terbaru',
    'hero.popularWeek': 'Populer Minggu Ini',
    'hero.featuredArticle': 'Artikel Pilihan',
    'hero.featuredDesc': 'Artikel terbaru yang direkomendasikan untuk Anda',
    'hero.read': 'Baca',
    
    // Footer
    'footer.categories': 'Kategori',
    'footer.content': 'Konten',
    'footer.followUs': 'Ikuti Kami',
    'footer.company': 'Perusahaan',
    'footer.legal': 'Legal',
    'footer.aboutUs': 'Tentang Kami',
    'footer.contact': 'Kontak',
    'footer.privacyPolicy': 'Kebijakan Privasi',
    'footer.termsOfService': 'Ketentuan Layanan',
    'footer.disclaimer': 'Penafian',
    'footer.tags': 'Tagar',
    'footer.tagline': 'Portal terpercaya untuk anime, manga, komik, film, dan game. Temukan konten terbaru dan berkualitas di sini.',
    'footer.taglineJP': 'アニメ・マンガ・コミック・映画・ゲームの信頼できるポータル',
    'footer.copyright': 'Semua hak cipta dilindungi.',
    'footer.copyrightJP': '全著作権保護。',
    
    // Filter descriptions
    'filter.showingAll': 'Menampilkan semua konten terbaru',
    'filter.showingNews': 'Menampilkan berita dan update terbaru',
    'filter.showingReviews': 'Menampilkan review dan rating konten',
    'filter.showingRecommendations': 'Menampilkan rekomendasi dan top list pilihan',
    'filter.showingAnime': 'Menampilkan semua konten anime',
    'filter.showingComics': 'Menampilkan manga, manhwa, dan komik',
    'filter.showingMovies': 'Menampilkan film anime dan live-action',
    'filter.showingGames': 'Menampilkan konten video games',
  },
  en: {
    // Navigation
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
    
    // Common
    'common.author': 'By',
    'common.readMore': 'Read More',
    'common.comments': 'Comments',
    'common.likes': 'Likes',
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.page': 'Page',
    'common.viewAll': 'View All Content',
    'common.noResults': 'No content found',
    'common.tryDifferentFilter': 'Try changing filters or return to all content',
    
    // Hero Section
    'hero.portal': 'Portal',
    'hero.trusted': 'Trusted',
    'hero.tagline': 'Discover the world of anime, manga, comics, movies, and games in one place',
    'hero.trending': 'Trending Today',
    'hero.latestUpdates': 'Latest Updates',
    'hero.popularWeek': 'Popular This Week',
    'hero.featuredArticle': 'Featured Article',
    'hero.featuredDesc': 'Latest article recommended for you',
    'hero.read': 'Read',
    
    // Footer
    'footer.categories': 'Categories',
    'footer.content': 'Content',
    'footer.followUs': 'Follow Us',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.aboutUs': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.disclaimer': 'Disclaimer',
    'footer.tags': 'Tags',
    'footer.tagline': 'Trusted portal for anime, manga, comics, movies, and games. Find the latest and quality content here.',
    'footer.taglineJP': 'アニメ・マンガ・コミック・映画・ゲームの信頼できるポータル',
    'footer.copyright': 'All rights reserved.',
    'footer.copyrightJP': '全著作権保護。',
    
    // Filter descriptions
    'filter.showingAll': 'Showing all latest content',
    'filter.showingNews': 'Showing latest news and updates',
    'filter.showingReviews': 'Showing reviews and content ratings',
    'filter.showingRecommendations': 'Showing recommendations and top lists',
    'filter.showingAnime': 'Showing all anime content',
    'filter.showingComics': 'Showing manga, manhwa, and comics',
    'filter.showingMovies': 'Showing anime and live-action movies',
    'filter.showingGames': 'Showing video game content',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('id');

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('conime-language') as Language;
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when changed
  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('conime-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.id] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
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