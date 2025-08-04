import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { ClockIcon, EyeIcon, BookOpenIcon, LinkIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ReadAlsoProps {
  articles: any[];
  variant?: 'inline' | 'compact' | 'end-article';
  title?: string;
  maxItems?: number;
}

export function ReadAlso({ 
  articles, 
  variant = 'inline', 
  title,
  maxItems = 2 
}: ReadAlsoProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  
  if (!articles.length) return null;

  const displayArticles = articles.slice(0, maxItems);
  
  const handleArticleClick = (article: any) => {
    navigate(`/${article.category}/${article.slug}`);
  };

  // Function to format category names with title case
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

  // Mid-article inline style
  if (variant === 'inline') {
    return (
      <div className="my-8 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
        <div className="flex items-center gap-2 mb-4">
          <BookOpenIcon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-primary">
            {title || (language === 'id' ? 'Baca Juga' : 'Read Also')}
          </h3>
        </div>

        <div className="space-y-3">
          {displayArticles.map((article) => (
            <div
              key={article.id}
              className="group flex gap-3 p-3 bg-background/50 hover:bg-background/80 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:border-primary/20"
              onClick={() => handleArticleClick(article)}
            >
              <div className="w-12 h-12 flex-shrink-0">
                <ImageWithFallback
                  src={article.image || `/images/placeholder-${article.category?.toLowerCase() || 'news'}.webp`}
                  alt={typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article'}
                  className="w-full h-full rounded object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium line-clamp-2 text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                  {typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article Title'}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    {formatCategoryName(article.categories?.[0] || article.category || 'News')}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <EyeIcon className="w-3 h-3" />
                    {article.viewCount || 0}
                  </span>
                </div>
              </div>

              <ArrowRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors self-center" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // End-article variant with different styling
  if (variant === 'end-article') {
    return (
      <div className="mt-12 space-y-6">
        <div className="text-center border-b pb-4">
          <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            {title || (language === 'id' ? 'Artikel Lainnya untuk Anda' : 'More Articles for You')}
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            {language === 'id' 
              ? 'Jangan lewatkan artikel menarik lainnya'
              : "Don't miss other interesting articles"
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {displayArticles.map((article) => (
            <Card
              key={article.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
              onClick={() => handleArticleClick(article)}
            >
              <div className="aspect-video relative">
                <ImageWithFallback
                  src={article.image || `/images/placeholder-${article.category?.toLowerCase() || 'news'}.webp`}
                  alt={typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <Badge className="bg-primary text-white">
                    {formatCategoryName(article.categories?.[0] || article.category || 'News')}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article Title'}
                </h4>
                
                {article.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {typeof article.summary === 'string' ? article.summary : article.summary?.[language] || ''}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <EyeIcon className="w-3 h-3" />
                      {article.viewCount || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      {formatDate(article.date, language)}
                    </span>
                  </div>
                  <span className="text-primary font-medium group-hover:underline">
                    {language === 'id' ? 'Baca →' : 'Read →'}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Compact variant for sidebar or other uses
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        <LinkIcon className="h-5 w-5 text-primary" />
        {title || (language === 'id' ? 'Baca Juga' : 'Read Also')}
      </h3>
      <div className="space-y-2">
        {displayArticles.map((article) => (
          <div
            key={article.id}
            className="group flex gap-3 p-2 hover:bg-muted/50 rounded-lg cursor-pointer transition-colors"
            onClick={() => handleArticleClick(article)}
          >
            <div className="w-12 h-12 flex-shrink-0">
              <ImageWithFallback
                src={article.image || `/images/placeholder-${article.category?.toLowerCase() || 'news'}.webp`}
                alt={typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article'}
                className="w-full h-full rounded object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium line-clamp-2 text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                {typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article Title'}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <EyeIcon className="w-3 h-3" />
                  {article.viewCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3 h-3" />
                  {formatDate(article.date, language)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateString: string, language: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffMinutes < 60) {
    if (diffMinutes < 1) {
      return language === 'id' ? 'baru saja' : 'just now';
    }
    return `${diffMinutes}m ${language === 'id' ? 'lalu' : 'ago'}`;
  } else if (diffHours < 24) {
    return `${diffHours}h ${language === 'id' ? 'lalu' : 'ago'}`;
  } else if (diffDays === 1) {
    return language === 'id' ? 'kemarin' : 'yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ${language === 'id' ? 'lalu' : 'ago'}`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w ${language === 'id' ? 'lalu' : 'ago'}`;
  } else {
    return date.toLocaleDateString(
      language === 'id' ? 'id-ID' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  }
}