import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { Sidebar } from "./components/Sidebar";
import { CategoryFilter } from "./components/CategoryFilter";
import { HeroSection } from "./components/HeroSection";
import { SEOHead } from "./components/SEOHead";
import { StructuredData } from "./components/StructuredData";
import { PerformanceOptimizer } from "./components/PerformanceOptimizer";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import { Button } from "./components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Logo } from "./components/Logo";

// Main App Component with Language Support
function AppContent() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Enhanced mock data dengan bilingual support dan author "Koni"
  const newsData = [
    {
      id: 1,
      title: {
        id: "One Piece Episode 1000: Luffy vs Kaido - Pertarungan Epic Yang Ditunggu-tunggu!",
        en: "One Piece Episode 1000: Luffy vs Kaido - The Epic Battle We've Been Waiting For!"
      },
      titleJP: "ワンピース エピソード1000",
      excerpt: {
        id: "Episode milestone One Piece akhirnya tiba! Saksikan pertarungan epik antara Luffy dan Kaido yang akan mengubah segalanya di Wano Country. Animasi yang luar biasa dan soundtrack yang memukau membuat episode ini menjadi yang terbaik sepanjang masa.",
        en: "The milestone One Piece episode has finally arrived! Witness the epic battle between Luffy and Kaido that will change everything in Wano Country. The incredible animation and captivating soundtrack make this the best episode of all time."
      },
      category: "ulasan",
      author: "Koni", // Updated author name
      date: "15 Jan 2025",
      dateISO: "2025-01-15T10:00:00+07:00",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      comments: 234,
      likes: 1547,
      featured: true,
      slug: "one-piece-episode-1000-luffy-vs-kaido",
      keywords: "One Piece, Luffy, Kaido, episode 1000, anime review"
    },
    {
      id: 2,
      title: {
        id: "Attack on Titan Final Season Part 4 Dikonfirmasi Rilis Musim Semi 2025",
        en: "Attack on Titan Final Season Part 4 Confirmed for Spring 2025 Release"
      },
      titleJP: "進撃の巨人 ファイナルシーズン",
      excerpt: {
        id: "Studio WIT dan MAPPA mengumumkan kelanjutan dari Attack on Titan yang akan mengakhiri cerita Eren Yeager. Trailer perdana menunjukkan animasi yang menakjubkan dengan kualitas produksi tinggi.",
        en: "Studio WIT and MAPPA announce the continuation of Attack on Titan that will conclude Eren Yeager's story. The first trailer shows stunning animation with high production quality."
      },
      category: "berita",
      author: "Koni",
      date: "14 Jan 2025",
      dateISO: "2025-01-14T15:30:00+07:00",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop",
      comments: 156,
      likes: 892,
      slug: "attack-on-titan-final-season-part-4",
      keywords: "Attack on Titan, final season, MAPPA, anime news"
    },
    {
      id: 3,
      title: {
        id: "5 Anime Action Terbaik Yang Wajib Ditonton di 2025",
        en: "5 Best Action Anime You Must Watch in 2025"
      },
      titleJP: "2025年必見アクションアニメ5選",
      excerpt: {
        id: "Daftar anime action terbaik yang tidak boleh dilewatkan tahun ini! Dari pertarungan epik hingga animasi memukau, ini dia pilihan anime action yang akan membuatmu terpaku di layar sepanjang episode.",
        en: "List of the best action anime not to be missed this year! From epic battles to stunning animation, these are action anime choices that will keep you glued to the screen throughout every episode."
      },
      category: "rekomendasi",
      author: "Koni",
      date: "13 Jan 2025",
      dateISO: "2025-01-13T09:15:00+07:00",
      image: "https://images.unsplash.com/photo-1606897965121-4ef48ae1b88f?w=600&h=400&fit=crop",
      comments: 89,
      likes: 654,
      slug: "5-anime-action-terbaik-2025",
      keywords: "anime action, rekomendasi anime, top anime 2025"
    },
    {
      id: 4,
      title: {
        id: "Solo Leveling Manhwa Chapter 200: Jinwoo's Final Battle",
        en: "Solo Leveling Manhwa Chapter 200: Jinwoo's Final Battle"
      },
      titleJP: "俺だけレベルアップな件",
      excerpt: {
        id: "Chapter terakhir dari manhwa fenomenal Solo Leveling akhirnya dirilis! Saksikan pertarungan final Sung Jinwoo melawan Shadow Monarch yang menentukan nasib dunia.",
        en: "The final chapter of the phenomenal Solo Leveling manhwa has finally been released! Witness Sung Jinwoo's final battle against the Shadow Monarch that determines the fate of the world."
      },
      category: "komik",
      author: "Koni",
      date: "12 Jan 2025",
      dateISO: "2025-01-12T14:20:00+07:00",
      image: "https://images.unsplash.com/photo-1587833963486-69b1d3e45cd1?w=600&h=400&fit=crop",
      comments: 167,
      likes: 723,
      slug: "solo-leveling-manhwa-chapter-200-final-battle",
      keywords: "Solo Leveling, manhwa, Sung Jinwoo, webtoon"
    },
    {
      id: 5,
      title: {
        id: "Your Name Live Action Movie Remake Akan Tayang 2025",
        en: "Your Name Live Action Movie Remake Coming in 2025"
      },
      titleJP: "君の名は。実写版",
      excerpt: {
        id: "Adaptasi live-action dari film anime hit 'Your Name' dikonfirmasi akan tayang tahun 2025. Dengan cast yang menawan dan sinematografi yang memukau, film ini dinanti-nantikan fans di seluruh dunia.",
        en: "The live-action adaptation of the hit anime film 'Your Name' is confirmed to be released in 2025. With an enchanting cast and stunning cinematography, this film is eagerly awaited by fans worldwide."
      },
      category: "movie",
      author: "Koni",
      date: "11 Jan 2025",
      dateISO: "2025-01-11T11:45:00+07:00",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=400&fit=crop",
      comments: 98,
      likes: 445,
      slug: "your-name-live-action-movie-2025",
      keywords: "Your Name, live action, movie, film anime"
    },
    {
      id: 6,
      title: {
        id: "Jujutsu Kaisen Season 3: Shibuya Incident Arc Mulai Produksi",
        en: "Jujutsu Kaisen Season 3: Shibuya Incident Arc Begins Production"
      },
      titleJP: "呪術廻戦 渋谷事変編",
      excerpt: {
        id: "MAPPA mengkonfirmasi produksi season 3 Jujutsu Kaisen telah dimulai. Arc Shibuya Incident yang gelap dan intens akan diadaptasi dengan kualitas animasi terbaik dari studio tersebut.",
        en: "MAPPA confirms that Jujutsu Kaisen season 3 production has begun. The dark and intense Shibuya Incident arc will be adapted with the studio's best animation quality."
      },
      category: "anime",
      author: "Koni",
      date: "10 Jan 2025",
      dateISO: "2025-01-10T16:00:00+07:00",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      comments: 312,
      likes: 1876,
      slug: "jujutsu-kaisen-season-3-shibuya-incident",
      keywords: "Jujutsu Kaisen, season 3, Shibuya Incident, MAPPA"
    }
  ];

  // Filter based on current language and category
  const filteredNews = newsData.filter(news => {
    return activeCategory === "all" || news.category === activeCategory;
  });

  const newsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + newsPerPage);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    
    // Update URL for SEO (simulated)
    const url = category === "all" ? "/" : `/${category}`;
    window.history.pushState({}, "", url);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      
      // Update URL for SEO
      const url = activeCategory === "all" 
        ? `/page/${newPage}` 
        : `/${activeCategory}/page/${newPage}`;
      window.history.pushState({}, "", url);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      
      // Update URL for SEO
      const url = newPage === 1 
        ? (activeCategory === "all" ? "/" : `/${activeCategory}`)
        : (activeCategory === "all" ? `/page/${newPage}` : `/${activeCategory}/page/${newPage}`);
      window.history.pushState({}, "", url);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate dynamic SEO data with i18n
  const generateSEOData = () => {
    const categoryLabels = {
      all: "",
      berita: t('category.news'),
      ulasan: t('category.reviews'), 
      rekomendasi: t('category.recommendations'),
      anime: t('category.anime'),
      komik: t('category.comics'),
      movie: t('category.movies'),
      game: t('category.games')
    };
    
    const categoryText = activeCategory === "all" ? "" : ` ${categoryLabels[activeCategory as keyof typeof categoryLabels]}`;
    const pageText = currentPage > 1 ? ` - ${t('common.page')} ${currentPage}` : "";
    
    return {
      title: `Conime - ${t('hero.portal')}${categoryText} ${t('hero.trusted')}${pageText}`,
      description: `${language === 'id' ? 'Dapatkan update terkini seputar' : 'Get the latest updates about'}${categoryText.toLowerCase()}. ${t('footer.tagline')}`,
      keywords: `anime, manga, komik, film anime, game anime${categoryText.toLowerCase()}, otaku, anime indonesia`,
      url: `https://conime.com${language === 'en' ? '/en' : ''}${activeCategory === "all" ? "" : `/${activeCategory}`}${currentPage > 1 ? `/page/${currentPage}` : ""}`
    };
  };

  const seoData = generateSEOData();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return <PerformanceOptimizer />;
  }

  return (
    <>
      {/* SEO Components */}
      <SEOHead {...seoData} />
      <StructuredData type="website" />
      <StructuredData type="organization" />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0" role="main" aria-label={language === 'id' ? 'Konten utama' : 'Main content'}>
              {/* Hero Section */}
              <HeroSection 
                activeCategory={activeCategory}
                featuredNews={currentNews[0] ? {
                  title: currentNews[0].title[language],
                  titleJP: currentNews[0].titleJP,
                  category: currentNews[0].category,
                  author: currentNews[0].author,
                  date: currentNews[0].date,
                  slug: currentNews[0].slug
                } : undefined}
                onCategoryChange={handleCategoryChange}
                onFeaturedClick={() => {
                  const article = currentNews[0];
                  if (article) {
                    console.log('Opening article:', article.slug);
                    alert(`${language === 'id' ? 'Membuka artikel' : 'Opening article'}: "${article.title[language]}"`);
                  }
                }}
              />

              {/* Category Filter */}
              <CategoryFilter 
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />

              {/* News Grid */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" aria-label={language === 'id' ? 'Daftar konten anime' : 'Anime content list'}>
                {currentNews.map((news, index) => (
                  <article key={news.id}>
                    <NewsCard
                      title={news.title[language]}
                      titleJP={news.titleJP}
                      excerpt={news.excerpt[language]}
                      category={news.category.charAt(0).toUpperCase() + news.category.slice(1)}
                      author={news.author}
                      date={news.date}
                      image={news.image}
                      comments={news.comments}
                      likes={news.likes}
                      featured={index === 0 && currentPage === 1}
                    />
                  </article>
                ))}
              </section>

              {/* No Results State */}
              {currentNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">
                    <svg className="mx-auto h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t('common.noResults')}</h3>
                  <p className="text-muted-foreground mb-4">
                    {t('common.tryDifferentFilter')}
                  </p>
                  <Button onClick={() => handleCategoryChange("all")}>
                    {t('common.viewAll')}
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center space-x-2" aria-label={language === 'id' ? 'Navigasi halaman' : 'Page navigation'}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="hover:border-primary hover:text-primary"
                    aria-label={language === 'id' ? 'Halaman sebelumnya' : 'Previous page'}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    {t('common.previous')}
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setCurrentPage(page);
                          const url = page === 1 
                            ? (activeCategory === "all" ? "/" : `/${activeCategory}`)
                            : (activeCategory === "all" ? `/page/${page}` : `/${activeCategory}/page/${page}`);
                          window.history.pushState({}, "", url);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="w-8 h-8 p-0 hover:border-primary hover:text-primary"
                        aria-label={`${t('common.page')} ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="hover:border-primary hover:text-primary"
                    aria-label={language === 'id' ? 'Halaman selanjutnya' : 'Next page'}
                  >
                    {t('common.next')}
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </nav>
              )}
            </main>

            {/* Sidebar */}
            <aside className="w-full xl:w-80 flex-shrink-0" aria-label={language === 'id' ? 'Konten sampingan' : 'Sidebar content'}>
              <Sidebar />
            </aside>
          </div>
        </div>

        {/* Enhanced Footer with Copyright Disclaimer */}
        <footer className="bg-muted/30 border-t mt-16" role="contentinfo">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Brand Section */}
              <div className="space-y-4 lg:col-span-2">
                <div className="flex items-center space-x-3">
                  <Logo variant="icon" size="sm" />
                  <Logo variant="full" size="sm" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('footer.tagline')}
                </p>
                <p className="text-xs text-muted-foreground jp-text">
                  {t('footer.taglineJP')}
                </p>
              </div>
              
              {/* Categories */}
              <div>
                <h3>{t('footer.categories')}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                  <li><a href="/anime" className="hover:text-primary transition-colors">{t('category.anime')}</a></li>
                  <li><a href="/komik" className="hover:text-primary transition-colors">{t('category.comics')}</a></li>
                  <li><a href="/movie" className="hover:text-primary transition-colors">{t('category.movies')}</a></li>
                  <li><a href="/game" className="hover:text-primary transition-colors">{t('category.games')}</a></li>
                </ul>
              </div>
              
              {/* Content */}
              <div>
                <h3>{t('footer.content')}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                  <li><a href="/berita" className="hover:text-primary transition-colors">{t('category.news')}</a></li>
                  <li><a href="/ulasan" className="hover:text-primary transition-colors">{t('category.reviews')}</a></li>
                  <li><a href="/rekomendasi" className="hover:text-primary transition-colors">{t('category.recommendations')}</a></li>
                  <li><a href="/tags" className="hover:text-primary transition-colors">{t('footer.tags')}</a></li>
                </ul>
              </div>
              
              {/* Company & Legal */}
              <div>
                <h3>{t('footer.company')}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                  <li><a href="/about" className="hover:text-primary transition-colors">{t('footer.aboutUs')}</a></li>
                  <li><a href="/contact" className="hover:text-primary transition-colors">{t('footer.contact')}</a></li>
                </ul>
                
                <h4 className="mt-4 mb-2 text-sm font-medium">{t('footer.legal')}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/privacy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</a></li>
                  <li><a href="/terms" className="hover:text-primary transition-colors">{t('footer.termsOfService')}</a></li>
                  <li><a href="/disclaimer" className="hover:text-primary transition-colors">{t('footer.disclaimer')}</a></li>
                </ul>
              </div>
            </div>
            
            {/* Social Media Row */}
            <div className="border-t mt-8 pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex flex-wrap gap-6">
                  <h4 className="text-sm font-medium">{t('footer.followUs')}:</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="https://twitter.com/conime" className="hover:text-primary transition-colors" rel="noopener noreferrer" target="_blank">Twitter</a>
                    <a href="https://instagram.com/conime" className="hover:text-primary transition-colors" rel="noopener noreferrer" target="_blank">Instagram</a>
                    <a href="https://youtube.com/conime" className="hover:text-primary transition-colors" rel="noopener noreferrer" target="_blank">YouTube</a>
                    <a href="https://discord.gg/conime" className="hover:text-primary transition-colors" rel="noopener noreferrer" target="_blank">Discord</a>
                    <a href="https://tiktok.com/@conime" className="hover:text-primary transition-colors" rel="noopener noreferrer" target="_blank">TikTok</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright Disclaimer Section */}
            <div className="border-t mt-6 pt-4 space-y-3">
              {/* Copyright Disclaimer */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t('footer.copyrightDisclaimer')}
                </p>
              </div>
              
              {/* Copyright */}
              <div className="text-center text-sm text-muted-foreground">
                © 2025 Conime. {t('footer.copyright')}
                <span className="jp-text block text-xs mt-1">© 2025 コニメ。{t('footer.copyrightJP')}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

// Main App with Language Provider
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}