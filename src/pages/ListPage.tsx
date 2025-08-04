import { useState, useEffect, useMemo } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar"; 
import { NewsCard } from "../components/NewsCard";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";
import { Breadcrumb } from "../components/Breadcrumb";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/button";
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  HomeIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  Squares2X2Icon,
  ListBulletIcon,
  CalendarIcon,
  FireIcon,
  HeartIcon
} from "@heroicons/react/24/outline";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { getArticlesByCategory } from "../data/mockData";
import { useRouter } from "../components/Router";

interface ListPageProps {
  category: string;
  page?: string;
}

type SortOption = 'newest' | 'oldest' | 'popular' | 'trending';
type ViewMode = 'grid' | 'list';

export default function ListPage({ category, page = "1" }: ListPageProps) {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Category mapping tanpa emoticon
  const categoryMap: { [key: string]: { id: string; en: string } } = {
    'anime': { id: 'Anime', en: 'Anime' },
    'berita': { id: 'Berita Animasi', en: 'Animation News' },
    'ulasan': { id: 'Ulasan', en: 'Reviews' },
    'rekomendasi': { id: 'Rekomendasi', en: 'Recommendations' },
    'komik': { id: 'Komik', en: 'Comics' },
    'movie': { id: 'Film', en: 'Movies' },
    'game': { id: 'Game', en: 'Games' }
  };

  const displayCategory = categoryMap[category]?.[language] || category;

  // Get articles for the category
  const categoryArticles = getArticlesByCategory(category);

  // Advanced filtering and sorting
  const filteredAndSortedNews = useMemo(() => {
    let filtered = categoryArticles.map((article, index) => ({
      id: parseInt(article.id.replace(/[^0-9]/g, '')) || index + 1,
      title: article.title,
      excerpt: article.excerpt || article.summary || { id: '', en: '' },
      category: article.category,
      author: article.author,
      date: article.date,
      dateISO: article.dateISO,
      image: article.image,
      slug: article.slug,
      likes: Math.floor(Math.random() * 500) + 50,
      comments: Math.floor(Math.random() * 100) + 5,
      shares: Math.floor(Math.random() * 150) + 10,
      reads: Math.floor(Math.random() * 1000) + 100,
      trendingScore: article.trendingScore || 0
    }));
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(news => 
        news.title[language].toLowerCase().includes(query) ||
        news.excerpt[language].toLowerCase().includes(query) ||
        news.author.toLowerCase().includes(query)
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
        case 'oldest':
          return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.likes + b.comments * 2) - (a.likes + a.comments * 2);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [category, searchQuery, sortBy, language, categoryArticles]);

  const newsPerPage = viewMode === 'grid' ? 12 : 8;
  const totalPages = Math.ceil(filteredAndSortedNews.length / newsPerPage);
  const startIndex = (currentPage - 1) * newsPerPage;
  const currentNews = filteredAndSortedNews.slice(startIndex, startIndex + newsPerPage);

  // Interactive handlers
  const handleShare = (newsItem: typeof filteredAndSortedNews[0]) => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title[language],
        text: newsItem.excerpt[language],
        url: window.location.origin + `/${newsItem.category}/${newsItem.slug}`
      }).catch(console.error);
    } else {
      const shareUrl = window.location.origin + `/${newsItem.category}/${newsItem.slug}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert(language === 'id' ? 'Link berhasil disalin!' : 'Link copied successfully!');
      });
    }
  };

  const handleLike = (newsId: number) => {
    console.log(`Liked article ${newsId}`);
    alert(language === 'id' ? 'Artikel disukai!' : 'Article liked!');
  };

  const handleComment = (newsItem: typeof filteredAndSortedNews[0]) => {
    navigate(`/${newsItem.category}/${newsItem.slug}#comment`);
  };

  const handleReadMore = (newsItem: typeof filteredAndSortedNews[0]) => {
    navigate(`/${newsItem.category}/${newsItem.slug}`);
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      navigate(`/${category}?page=${newPage}`, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      
      if (newPage === 1) {
        navigate(`/${category}`, true);
      } else {
        navigate(`/${category}?page=${newPage}`, true);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset page when search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  // SEO data
  const seoData = {
    title: `${displayCategory} - Conime | ${language === 'id' ? 'Portal Berita Anime' : 'Anime News Portal'}${currentPage > 1 ? ` - ${t ? t('common.page') : (language === 'id' ? 'Halaman' : 'Page')} ${currentPage}` : ''}`,
    description: `${language === 'id' ? `Kumpulan artikel ${displayCategory.toLowerCase()} terbaru dan terlengkap di Conime` : `Latest and complete ${displayCategory.toLowerCase()} articles collection at Conime`}. ${language === 'id' ? 'Berita anime, review, rekomendasi terpercaya' : 'Trusted anime news, reviews, recommendations'}.`,
    keywords: `${category}, ${displayCategory.toLowerCase()}, anime, manga, ${language === 'id' ? 'berita anime indonesia' : 'anime news'}`,
    url: `https://conime.com${language === 'en' ? '/en' : ''}/${category}${currentPage > 1 ? `?page=${currentPage}` : ""}`
  };

  useEffect(() => {
    setCurrentPage(parseInt(page) || 1);
    
    // Simulate loading
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, [page, category]);

  if (!isLoaded) {
    return (
      <LoadingAnimation 
        isLoading={!isLoaded} 
        message={language === 'id' ? 'Memuat artikel...' : 'Loading articles...'}
      />
    );
  }

  return (
    <>
      {/* SEO Components */}
      <SEOHead {...seoData} />
      <StructuredData type="website" />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar /> 
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0" role="main">
              {/* Page Header */}
              <div className="mb-8">
                {/* Breadcrumb */}
                <Breadcrumb 
                  items={[
                    { 
                      label: displayCategory, 
                      isActive: true 
                    }
                  ]} 
                />

                {/* Page Title & Stats */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      {displayCategory}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      {language === 'id' 
                        ? `${filteredAndSortedNews.length} artikel tersedia`
                        : `${filteredAndSortedNews.length} articles available`
                      }
                      {searchQuery && (
                        <span className="ml-2">
                          {language === 'id' ? `untuk "${searchQuery}"` : `for "${searchQuery}"`}
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-base px-3 py-1">
                      {filteredAndSortedNews.length}
                    </Badge>
                    {category === 'anime' && (
                      <Badge variant="default" className="text-sm px-2 py-1">
                        {language === 'id' ? 'Terpopuler' : 'Popular'}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Search & Filters */}
                <div className="bg-card rounded-xl border p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={language === 'id' ? `Cari artikel ${displayCategory.toLowerCase()}...` : `Search ${displayCategory.toLowerCase()} articles...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>

                    {/* Sort */}
                    <div className="flex items-center space-x-3">
                      <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                        <SelectTrigger className="w-48 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{language === 'id' ? 'Terbaru' : 'Newest'}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="oldest">
                            <div className="flex items-center space-x-2">
                              <CalendarIcon className="h-4 w-4" />
                              <span>{language === 'id' ? 'Terlama' : 'Oldest'}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="popular">
                            <div className="flex items-center space-x-2">
                              <HeartIcon className="h-4 w-4" />
                              <span>{language === 'id' ? 'Terpopuler' : 'Most Popular'}</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="trending">
                            <div className="flex items-center space-x-2">
                              <FireIcon className="h-4 w-4" />
                              <span>{language === 'id' ? 'Trending' : 'Trending'}</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* View Mode Toggle */}
                      <div className="flex items-center bg-muted rounded-lg p-1">
                        <Button 
                          variant={viewMode === 'grid' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className="h-10 px-3"
                        >
                          <Squares2X2Icon className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={viewMode === 'list' ? 'default' : 'ghost'}
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className="h-10 px-3"
                        >
                          <ListBulletIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Active Filters Display */}
                  {(searchQuery || sortBy !== 'newest') && (
                    <div className="flex items-center space-x-2 mt-4 pt-4 border-t">
                      <span className="text-sm text-muted-foreground">
                        {language === 'id' ? 'Filter aktif:' : 'Active filters:'}
                      </span>
                      {searchQuery && (
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <MagnifyingGlassIcon className="h-3 w-3" />
                          <span>"{searchQuery}"</span>
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {sortBy !== 'newest' && (
                        <Badge variant="outline">
                          {sortBy === 'oldest' && (language === 'id' ? 'Terlama' : 'Oldest')}
                          {sortBy === 'popular' && (language === 'id' ? 'Terpopuler' : 'Popular')}
                          {sortBy === 'trending' && 'Trending'}
                        </Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setSearchQuery('');
                          setSortBy('newest');
                        }}
                        className="text-xs"
                      >
                        {language === 'id' ? 'Reset' : 'Clear all'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* News Grid/List with consistent heights */}
              {currentNews.length > 0 ? (
                <section className={`mb-8 ${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-6'
                }`}>
                  {currentNews.map((news, index) => (
                    <div 
                      key={`${category}-${news.id}-${currentPage}-${index}`} 
                      className={`${viewMode === 'list' ? 'transform hover:scale-[1.02] transition-transform' : 'h-full'}`}
                    >
                      <NewsCard
                        title={news.title[language]}
                        excerpt={news.excerpt[language]}
                        category={news.category}
                        author={news.author}
                        date={news.date}
                        image={news.image}
                        comments={news.comments}
                        likes={news.likes}
                        shares={news.shares || 0}
                        reads={news.reads || Math.floor(Math.random() * 1000) + 100}
                        featured={index === 0 && currentPage === 1 && sortBy === 'newest'}
                        layout={viewMode}
                        onShare={() => handleShare(news)}
                        onLike={() => handleLike(news.id)}
                        onComment={() => handleComment(news)}
                        onReadMore={() => handleReadMore(news)}
                      />
                    </div>
                  ))}
                </section>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 mx-auto mb-4">
                    {searchQuery ? (
                      <MagnifyingGlassIcon className="w-full h-full text-muted-foreground" />
                    ) : (
                      <svg viewBox="0 0 200 200" className="w-full h-full text-muted-foreground" fill="none">
                        <rect x="40" y="40" width="120" height="120" rx="8" stroke="currentColor" strokeWidth="4" className="opacity-40" />
                        <path d="M 60 70 L 140 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
                        <path d="M 60 90 L 120 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
                        <path d="M 60 110 L 130 110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
                        <path d="M 60 130 L 110 130" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    {searchQuery 
                      ? (language === 'id' ? 'Tidak ada hasil ditemukan' : 'No results found')
                      : (language === 'id' ? 'Belum Ada Artikel' : 'No Articles Yet')
                    }
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery 
                      ? (language === 'id' 
                          ? `Tidak ada artikel yang cocok dengan "${searchQuery}"`
                          : `No articles match "${searchQuery}"`)
                      : (language === 'id' 
                          ? `Artikel ${displayCategory.toLowerCase()} akan segera hadir!`
                          : `${displayCategory} articles coming soon!`)
                    }
                  </p>
                  <div className="space-x-3">
                    {searchQuery && (
                      <Button onClick={() => setSearchQuery('')} variant="default">
                        {language === 'id' ? 'Hapus Pencarian' : 'Clear Search'}
                      </Button>
                    )}
                    <Button onClick={() => navigate('/')} variant="outline">
                      {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              {currentNews.length > 0 && (
                <div className="text-center text-sm text-muted-foreground mb-6">
                  {language === 'id' 
                    ? `Menampilkan ${startIndex + 1}-${Math.min(startIndex + newsPerPage, filteredAndSortedNews.length)} dari ${filteredAndSortedNews.length} artikel`
                    : `Showing ${startIndex + 1}-${Math.min(startIndex + newsPerPage, filteredAndSortedNews.length)} of ${filteredAndSortedNews.length} articles`
                  }
                </div>
              )}

              {/* Enhanced Pagination */}
              {totalPages > 1 && (
                <nav className="flex flex-col sm:flex-row items-center justify-between gap-4" aria-label={language === 'id' ? 'Navigasi halaman' : 'Page navigation'}>
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="hover:border-primary hover:text-primary w-full sm:w-auto"
                    aria-label={language === 'id' ? 'Halaman sebelumnya' : 'Previous page'}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-2" />
                    {language === 'id' ? 'Sebelumnya' : 'Previous'}
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const pages: number[] = [];
                      const maxVisiblePages = Math.min(7, totalPages);
                      
                      if (totalPages <= 7) {
                        // Show all pages if 7 or fewer
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else if (currentPage <= 4) {
                        // Show first 7 pages
                        for (let i = 1; i <= 7; i++) {
                          pages.push(i);
                        }
                      } else if (currentPage >= totalPages - 3) {
                        // Show last 7 pages
                        for (let i = totalPages - 6; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Show current page and 3 on each side
                        for (let i = currentPage - 3; i <= currentPage + 3; i++) {
                          pages.push(i);
                        }
                      }
                      
                      // Remove duplicates and ensure unique keys
                      const uniquePages = [...new Set(pages)].filter(page => page >= 1 && page <= totalPages);
                      
                      return uniquePages.map((pageNum, index) => (
                        <Button
                          key={`page-${pageNum}-${category}-${index}`}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setCurrentPage(pageNum);
                            if (pageNum === 1) {
                              navigate(`/${category}`, true);
                            } else {
                              navigate(`/${category}?page=${pageNum}`, true);
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-10 h-10 p-0 hover:border-primary hover:text-primary ${
                            currentPage === pageNum 
                              ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:text-white' 
                              : ''
                          }`}
                          aria-label={`${language === 'id' ? 'Halaman' : 'Page'} ${pageNum}`}
                          aria-current={currentPage === pageNum ? "page" : undefined}
                          data-active={currentPage === pageNum}
                        >
                          {pageNum}
                        </Button>
                      ));
                    })()}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="hover:border-primary hover:text-primary w-full sm:w-auto"
                    aria-label={language === 'id' ? 'Halaman selanjutnya' : 'Next page'}
                  >
                    {language === 'id' ? 'Selanjutnya' : 'Next'}
                    <ChevronRightIcon className="h-4 w-4 ml-2" />
                  </Button>
                </nav>
              )}
            </main>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}