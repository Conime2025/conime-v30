import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { useContentTracking } from "../hooks/useContentTracking";
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ChatBubbleLeftIcon, PaperAirplaneIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getArticlesByCategory } from "../data/mockData";

interface ArticlesPaginationProps {
  activeCategory: string;
  articlesPerPage?: number;
}

export function ArticlesPagination({ activeCategory, articlesPerPage = 6 }: ArticlesPaginationProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const { getViewCount } = useContentTracking();
  const [currentPage, setCurrentPage] = useState(1);

  // Get filtered articles using the new multiple categories system
  const filteredArticles = useMemo(() => {
    const articles = getArticlesByCategory(activeCategory);
    
    // Sort by date (newest first)
    return articles
      .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
      .map(article => ({
        ...article,
        title: article.title[language] || 'Untitled Article',
        excerpt: article.excerpt?.[language] || article.summary?.[language] || 'No excerpt available.',
        viewCount: getViewCount(article.id),
        // Add social counters (mock data - would come from backend in real app)
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 5,
        shares: Math.floor(Math.random() * 150) + 10,
        author: article.author || 'Unknown Author',
        date: article.date || 'No date'
      }));
  }, [activeCategory, language, getViewCount]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const formatCategoryName = (category: string) => {
    const categoryMap: { [key: string]: { id: string; en: string } } = {
      'anime': { id: 'Anime', en: 'Anime' },
      'berita': { id: 'Berita', en: 'News' },
      'ulasan': { id: 'Ulasan', en: 'Reviews' },
      'rekomendasi': { id: 'Rekomendasi', en: 'Recommendations' },
      'komik': { id: 'Komik', en: 'Comics' },
      'movie': { id: 'Film', en: 'Movies' },
      'game': { id: 'Game', en: 'Games' }
    };
    
    return categoryMap[category]?.[language] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const handleArticleClick = (article: any) => {
    navigate(`/${article.category}/${article.slug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleSocialAction = (action: string, articleId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`${action} clicked for article ${articleId}`);
    // TODO: Implement actual social actions
  };

  if (currentArticles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4">
          <svg viewBox="0 0 200 200" className="w-full h-full text-muted-foreground" fill="none">
            <rect x="40" y="40" width="120" height="120" rx="8" stroke="currentColor" strokeWidth="4" className="opacity-40" />
            <path d="M 60 70 L 140 70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
            <path d="M 60 90 L 120 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
            <path d="M 60 110 L 130 110" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-60" />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2">
          {language === 'id' ? 'Belum Ada Artikel' : 'No Articles Yet'}
        </h3>
        <p className="text-muted-foreground mb-6">
          {language === 'id' 
            ? `Artikel ${activeCategory === 'semua' ? '' : formatCategoryName(activeCategory)} akan segera hadir!`
            : `${activeCategory === 'semua' ? '' : formatCategoryName(activeCategory)} articles coming soon!`
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Articles Grid - 2 columns with consistent h-48 image heights for latest articles */}
      <div className="grid md:grid-cols-2 gap-6">
        {currentArticles.map((article) => (
          <Card 
            key={article.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-card border-0 bg-gradient-to-br from-muted/30 to-muted/10 flex flex-col h-full"
            onClick={() => handleArticleClick(article)}
          >
            {/* Fixed h-48 height image container for Latest Articles */}
            <div className="relative flex-shrink-0 h-48 overflow-hidden">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Multiple Category Badges - Show all categories */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                <Badge className="bg-muted text-muted-foreground text-xs px-2 py-1">
                  {formatCategoryName(article.category)}
                </Badge>
                {article.categories && article.categories
                  .filter(cat => cat !== article.category)
                  .slice(0, 1)
                  .map(cat => (
                    <Badge key={cat} className="bg-primary/80 text-white text-xs px-2 py-1">
                      {formatCategoryName(cat)}
                    </Badge>
                  ))
                }
              </div>
              
              {/* View Count in Corner */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                <span>👁</span>
                <span>{article.viewCount.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Content area with flex-grow to fill remaining space */}
            <CardContent className="p-4 space-y-3 flex flex-col flex-grow">
              {/* Title - fixed 2 lines */}
              <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-tight text-base h-fit">
                {article.title}
              </h3>
              
              {/* Excerpt - fixed 2 lines */}
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed h-10 flex-grow">
                {article.excerpt}
              </p>
              
              {/* Meta info area */}
              <div className="mt-auto">
                {/* Author and Date */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <UserIcon className="w-3 h-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                </div>

                {/* Social Actions and Read Button */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => handleSocialAction('like', article.id, e)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                      title={language === 'id' ? 'Suka' : 'Like'}
                    >
                      <HeartIcon className="w-4 h-4" />
                      <span>{article.likes}</span>
                    </button>
                    
                    <button
                      onClick={(e) => handleSocialAction('comment', article.id, e)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-500 transition-colors"
                      title={language === 'id' ? 'Komentar' : 'Comment'}
                    >
                      <ChatBubbleLeftIcon className="w-4 h-4" />
                      <span>{article.comments}</span>
                    </button>
                    
                    <button
                      onClick={(e) => handleSocialAction('share', article.id, e)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                      title={language === 'id' ? 'Bagikan' : 'Share'}
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                      <span>{article.shares}</span>
                    </button>
                  </div>
                  
                  {/* Read Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArticleClick(article);
                    }}
                    className="text-xs px-3 py-1 h-7 hover:bg-primary hover:text-white border-primary/30 hover:border-primary"
                  >
                    {language === 'id' ? 'Baca' : 'Read'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      <div className="text-center text-sm text-muted-foreground">
        {language === 'id' 
          ? `Menampilkan ${startIndex + 1}-${Math.min(startIndex + articlesPerPage, filteredArticles.length)} dari ${filteredArticles.length} artikel`
          : `Showing ${startIndex + 1}-${Math.min(startIndex + articlesPerPage, filteredArticles.length)} of ${filteredArticles.length} articles`
        }
      </div>

      {/* Pagination - Center Aligned */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <nav className="flex items-center gap-2" aria-label={language === 'id' ? 'Navigasi halaman' : 'Page navigation'}>
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="hover:border-primary hover:bg-primary text-foreground"
              aria-label={language === 'id' ? 'Halaman sebelumnya' : 'Previous page'}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-2" />
              {language === 'id' ? 'Sebelumnya' : 'Previous'}
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                let pageNum: number;
                
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (currentPage <= 4) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = currentPage - 3 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 p-0 hover:border-primary hover:bg-primary text-foreground ${
                      currentPage === pageNum 
                        ? 'bg-primary  text-white border-primary hover:bg-primary/90 hover:text-white' 
                        : 'text-foreground border hover:border-primary/90 hover:bg-primary/90 hover:text-white'
                    }`}
                    aria-label={`${language === 'id' ? 'Halaman' : 'Page'} ${pageNum}`}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                    data-active={currentPage === pageNum}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="hover:border-primary hover:text-foreground"
              aria-label={language === 'id' ? 'Halaman selanjutnya' : 'Next page'}
            >
              {language === 'id' ? 'Selanjutnya' : 'Next'}
              <ChevronRightIcon className="h-4 w-4 ml-2" />
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}