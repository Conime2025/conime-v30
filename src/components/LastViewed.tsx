import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage } from '../hooks/useLanguage';
import { useRouter } from './Router';
import { useAlert } from './NotificationSystem';
import { ClockIcon, XMarkIcon, EyeIcon } from '@heroicons/react/24/outline';

interface LastViewedArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  viewedAt: number;
  viewCount: number;
}

interface LastViewedProps {
  showClearButton?: boolean;
}

export function LastViewed({ showClearButton = true }: LastViewedProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const alert = useAlert();
  const [lastViewedArticles, setLastViewedArticles] = useState<LastViewedArticle[]>([]);

  // Load last viewed articles from localStorage (limit to 5)
  useEffect(() => {
    const loadLastViewed = () => {
      try {
        const stored = localStorage.getItem('conime_last_viewed');
        if (stored) {
          const articles = JSON.parse(stored) as LastViewedArticle[];
          // Sort by viewedAt descending and limit to 5
          const sortedArticles = articles
            .sort((a, b) => b.viewedAt - a.viewedAt)
            .slice(0, 5);
          setLastViewedArticles(sortedArticles);
        }
      } catch (error) {
        console.warn('Error loading last viewed articles:', error);
      }
    };

    loadLastViewed();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'conime_last_viewed') {
        loadLastViewed();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Format category names with title case
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

  // Format time ago
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return language === 'id' ? 'baru saja' : 'just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ${language === 'id' ? 'lalu' : 'ago'}`;
    } else if (diffHours < 24) {
      return `${diffHours}h ${language === 'id' ? 'lalu' : 'ago'}`;
    } else if (diffDays === 1) {
      return language === 'id' ? 'kemarin' : 'yesterday';
    } else if (diffDays < 7) {
      return `${diffDays}d ${language === 'id' ? 'lalu' : 'ago'}`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleDateString(
        language === 'id' ? 'id-ID' : 'en-US',
        { day: 'numeric', month: 'short' }
      );
    }
  };

  const handleArticleClick = (article: LastViewedArticle) => {
    navigate(`/${article.category}/${article.slug}`);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('conime_last_viewed');
      setLastViewedArticles([]);
      alert.success(
        language === 'id' 
          ? 'Riwayat baca berhasil dihapus'
          : 'Reading history cleared successfully'
      );
    } catch (error) {
      console.error('Error clearing history:', error);
      alert.error(
        language === 'id'
          ? 'Gagal menghapus riwayat'
          : 'Failed to clear history'
      );
    }
  };

  const removeArticle = (articleId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      const updated = lastViewedArticles.filter(article => article.id !== articleId);
      localStorage.setItem('conime_last_viewed', JSON.stringify(updated));
      setLastViewedArticles(updated);
      alert.success(
        language === 'id'
          ? 'Artikel dihapus dari riwayat'
          : 'Article removed from history'
      );
    } catch (error) {
      console.error('Error removing article:', error);
      alert.error(
        language === 'id'
          ? 'Gagal menghapus artikel'
          : 'Failed to remove article'
      );
    }
  };

  if (lastViewedArticles.length === 0) {
    return (
      <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10">
        <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
          <h4 className="leading-none flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>{language === 'id' ? 'Terakhir Dibaca' : 'Recently Viewed'}</span>
          </h4>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-center py-8">
            <ClockIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              {language === 'id' 
                ? 'Belum ada artikel yang dibaca'
                : 'No articles read yet'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10">
      <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
        <div className="flex items-center justify-between w-full">
          <h4 className="leading-none flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            <span>{language === 'id' ? 'Terakhir Dibaca' : 'Recently Viewed'}</span>
          </h4>
          {showClearButton && lastViewedArticles.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearHistory}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive"
              title={language === 'id' ? 'Hapus semua riwayat' : 'Clear all history'}
            >
              <XMarkIcon className="h-3 w-3 mr-1" />
              {language === 'id' ? 'Hapus' : 'Clear'}
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          {language === 'id' ? '5 artikel terakhir yang Anda baca' : 'Last 5 articles you read'}
        </p>
      </CardHeader>
      <CardContent className="px-6 pb-6 space-y-3">
        {lastViewedArticles.map((article, index) => (
          <div 
            key={article.id}
            className="group flex space-x-3 cursor-pointer hover:bg-muted/50 rounded-lg p-2 -m-2 transition-colors relative"
            onClick={() => handleArticleClick(article)}
          >
            {/* Index Number */}
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center">
              {index + 1}
            </div>
            
            <div className="w-16 h-12 flex-shrink-0">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full rounded object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
                {article.title}
              </h5>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {formatCategoryName(article.category)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(article.viewedAt)}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <EyeIcon className="h-3 w-3" />
                    {article.viewCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => removeArticle(article.id, e)}
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                    title={language === 'id' ? 'Hapus dari riwayat' : 'Remove from history'}
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}