import { useLanguage } from "../hooks/useLanguage";
import { Button } from "./ui/button";
import { getArticlesByCategory } from "../data/mockData";
import { 
  Squares2X2Icon, 
  FilmIcon, 
  BookOpenIcon,
  HeartIcon,
  StarIcon,
  NewspaperIcon
} from "@heroicons/react/24/outline";

// Custom Game Controller Icon
const GameControllerIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M17 8h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
  activeCategory: string;
}

export function CategoryFilter({ onCategoryChange, activeCategory }: CategoryFilterProps) {
  const { language } = useLanguage();

  const categories = [
    {
      id: 'semua',
      name: { id: 'Semua', en: 'All' },
      icon: Squares2X2Icon
    },
    {
      id: 'berita',
      name: { id: 'Berita', en: 'News' },
      icon: NewspaperIcon
    },
    {
      id: 'ulasan',
      name: { id: 'Ulasan', en: 'Reviews' },
      icon: HeartIcon
    },
    {
      id: 'rekomendasi',
      name: { id: 'Rekomendasi', en: 'Recommendations' },
      icon: StarIcon
    },
    {
      id: 'anime',
      name: { id: 'Anime', en: 'Anime' },
      icon: FilmIcon
    },
    {
      id: 'komik',
      name: { id: 'Komik', en: 'Comics' },
      icon: BookOpenIcon
    },
    {
      id: 'movie',
      name: { id: 'Film', en: 'Movies' },
      icon: FilmIcon
    },
    {
      id: 'game',
      name: { id: 'Game', en: 'Games' },
      icon: GameControllerIcon
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
  };

  // Get article count for each category (supports multiple categories)
  const getCategoryCount = (categoryId: string) => {
    const articles = getArticlesByCategory(categoryId);
    return articles.length;
  };

  return (
    <div className="category-filter" data-category-filter>
      <div className="flex flex-wrap gap-2 justify-start">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          const articleCount = getCategoryCount(category.id);
          
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className={`
                flex items-center space-x-2 transition-all duration-200
                ${isActive 
                  ? 'bg-primary text-white border-primary hover:bg-primary/90 hover:text-white' 
                  : 'hover:bg-primary hover:text-white hover:border-primary'
                }
              `}
              data-active={isActive}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name[language]}</span>
              {articleCount > 0 && (
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-full
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  {articleCount}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}