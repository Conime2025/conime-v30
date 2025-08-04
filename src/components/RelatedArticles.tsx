import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { ClockIcon, EyeIcon, LinkIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface RelatedArticlesProps {
  articles: any[];
  title?: string;
  maxItems?: number;
  layout?: 'grid' | 'list';
}

export function RelatedArticles({ 
  articles, 
  title,
  maxItems = 6,
  layout = 'grid'
}: RelatedArticlesProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  
  if (!articles.length) return null;

  const displayArticles = articles.slice(0, maxItems);
  const defaultTitle = language === 'id' ? 'Artikel Terkait' : 'Related Articles';

  const handleArticleClick = (article: any) => {
    navigate(`/${article.category}/${article.slug}`);
  };

  // Function to convert category to title case
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
          <LinkIcon className="h-6 w-6 text-primary" />
          {title || defaultTitle}
        </h2>
        <p className="text-muted-foreground">
          {language === 'id' 
            ? 'Artikel lain yang mungkin menarik untuk Anda'
            : 'Other articles you might find interesting'
          }
        </p>
      </div>

      {layout === 'grid' ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayArticles.map((article) => (
            <RelatedArticleCard 
              key={article.id} 
              article={article} 
              language={language}
              formatCategoryName={formatCategoryName}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayArticles.map((article) => (
            <RelatedArticleList 
              key={article.id} 
              article={article} 
              language={language}
              formatCategoryName={formatCategoryName}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RelatedArticleCard({ article, language, formatCategoryName, onClick }: { 
  article: any; 
  language: string; 
  formatCategoryName: (category: string) => string;
  onClick: () => void; 
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col h-full" onClick={onClick}>
      {/* Fixed h-32 height for related article images */}
      <div className="relative h-32 overflow-hidden flex-shrink-0">
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
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article Title'}
        </h3>
        
        {article.summary && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-grow">
            {typeof article.summary === 'string' ? article.summary : article.summary?.[language] || ''}
          </p>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <EyeIcon className="w-3 h-3" />
              {article.viewCount || 0}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {formatDateDDMMYYYY(article.date, language)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RelatedArticleList({ article, language, formatCategoryName, onClick }: { 
  article: any; 
  language: string; 
  formatCategoryName: (category: string) => string;
  onClick: () => void; 
}) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex gap-4">
        {/* Fixed w-24 h-16 for list thumbnails */}
        <div className="w-24 h-16 flex-shrink-0">
          <ImageWithFallback
            src={article.image || `/images/placeholder-${article.category?.toLowerCase() || 'news'}.webp`}
            alt={typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article'}
            className="w-full h-full rounded object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <Badge className="bg-primary text-white">
              {formatCategoryName(article.categories?.[0] || article.category || 'News')}
            </Badge>
          </div>
          
          <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
            {typeof article.title === 'string' ? article.title : article.title?.[language] || 'Article Title'}
          </h3>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <EyeIcon className="w-3 h-3" />
              {article.viewCount || 0}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3" />
              {formatDateDDMMYYYY(article.date, language)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Updated date formatting function to use DD-MM-YYYY format
function formatDateDDMMYYYY(dateString: string, language: string): string {
  // If the date is already in DD-MM-YYYY format, return as is
  if (dateString.includes('-') && dateString.split('-')[0].length === 2) {
    return dateString;
  }
  
  // Otherwise, convert from ISO format
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}-${month}-${year}`;
}