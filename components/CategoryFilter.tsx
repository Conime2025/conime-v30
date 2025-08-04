import { Button } from "./ui/button";
import { useLanguage } from "../hooks/useLanguage";
// Using Heroicons - 100% free MIT license
import { 
  FireIcon, 
  NewspaperIcon, 
  StarIcon, 
  HandThumbUpIcon,
  TvIcon, 
  BookOpenIcon, 
  FilmIcon,
  PuzzlePieceIcon
} from "@heroicons/react/24/outline";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const { t } = useLanguage();
  
  // Enhanced categories dengan Conime brand colors dan Heroicons
  const categories = [
    { 
      id: "all", 
      label: t('category.all'),
      icon: FireIcon, 
      color: "text-conime", // Using custom Conime color
      bgColor: "bg-conime-50 dark:bg-conime-950",
      description: t('filter.showingAll')
    },
    { 
      id: "berita", 
      label: t('category.news'),
      icon: NewspaperIcon, 
      color: "text-blue-600 dark:text-blue-400", 
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: t('filter.showingNews')
    },
    { 
      id: "ulasan", 
      label: t('category.reviews'),
      icon: StarIcon, 
      color: "text-amber-600 dark:text-amber-400", 
      bgColor: "bg-amber-50 dark:bg-amber-950",
      description: t('filter.showingReviews')
    },
    { 
      id: "rekomendasi", 
      label: t('category.recommendations'),
      icon: HandThumbUpIcon, 
      color: "text-green-600 dark:text-green-400", 
      bgColor: "bg-green-50 dark:bg-green-950",
      description: t('filter.showingRecommendations')
    },
    { 
      id: "anime", 
      label: t('category.anime'),
      icon: TvIcon, 
      color: "text-purple-600 dark:text-purple-400", 
      bgColor: "bg-purple-50 dark:bg-purple-950",
      description: t('filter.showingAnime')
    },
    { 
      id: "komik", 
      label: t('category.comics'),
      icon: BookOpenIcon, 
      color: "text-indigo-600 dark:text-indigo-400", 
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      description: t('filter.showingComics')
    },
    { 
      id: "movie", 
      label: t('category.movies'),
      icon: FilmIcon, 
      color: "text-red-600 dark:text-red-400", 
      bgColor: "bg-red-50 dark:bg-red-950",
      description: t('filter.showingMovies')
    },
    { 
      id: "game", 
      label: t('category.games'),
      icon: PuzzlePieceIcon, 
      color: "text-orange-600 dark:text-orange-400", 
      bgColor: "bg-orange-50 dark:bg-orange-950",
      description: t('filter.showingGames')
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Primary Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category.id)}
              className={`
                font-roboto transition-all duration-200 hover:scale-105
                ${isActive 
                  ? "bg-conime text-conime-foreground shadow-lg border-conime-600" 
                  : `hover:border-conime hover:text-conime hover:${category.bgColor}`
                }
              `}
              title={category.description}
            >
              <Icon className="h-4 w-4 mr-1.5" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Filter Description */}
      <div className="text-sm text-muted-foreground font-roboto">
        {categories.find(cat => cat.id === activeCategory)?.description}
      </div>
    </div>
  );
}