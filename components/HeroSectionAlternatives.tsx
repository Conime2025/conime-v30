import { TrendingUp, Clock, Flame } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface HeroSectionProps {
  activeCategory: string;
  featuredNews?: {
    title: string;
    category: string;
    author: string;
    date: string;
    slug?: string;
  };
  onCategoryChange?: (category: string) => void;
  onFeaturedClick?: () => void;
  layout?: "horizontal" | "stacked" | "compact"; // Layout options
}

export function HeroSectionAlternatives({ 
  activeCategory, 
  featuredNews, 
  onCategoryChange,
  onFeaturedClick,
  layout = "horizontal" // Default layout saat ini
}: HeroSectionProps) {
  const getCategoryLabel = (category: string) => {
    const labels = {
      all: "",
      berita: "Berita",
      ulasan: "Ulasan", 
      populer: "Populer",
      rilis: "Rilis",
      event: "Event",
      tutorial: "Tutorial"
    };
    return labels[category as keyof typeof labels] || "";
  };

  const handleQuickStatsClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleFeaturedClick = () => {
    if (onFeaturedClick) {
      onFeaturedClick();
    }
    console.log('Navigate to article:', featuredNews?.slug);
  };

  // Quick Stats Component untuk reuse
  const QuickStats = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-wrap items-center gap-4 md:gap-6 text-sm ${className}`}>
      <button 
        onClick={() => handleQuickStatsClick('populer')}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        title="Lihat konten populer"
      >
        <Flame className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="group-hover:underline whitespace-nowrap">Trending Hari Ini</span>
      </button>

      <button 
        onClick={() => handleQuickStatsClick('berita')}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        title="Lihat berita terbaru"
      >
        <Clock className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="group-hover:underline whitespace-nowrap">Update Terbaru</span>
      </button>

      <button 
        onClick={() => handleQuickStatsClick('ulasan')}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors cursor-pointer group"
        title="Lihat ulasan populer"
      >
        <TrendingUp className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
        <span className="group-hover:underline whitespace-nowrap">Populer Minggu Ini</span>
      </button>
    </div>
  );

  return (
    <section className="mb-8">
      {/* OPTION 1: HORIZONTAL (Current) - Sejajar di desktop */}
      {layout === "horizontal" && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="mb-2">
              Portal <span className="text-primary">Conime</span>
              {activeCategory !== "all" && (
                <span className="text-muted-foreground"> - {getCategoryLabel(activeCategory)}</span>
              )}
            </h1>
            <p className="text-muted-foreground">
              Temukan dunia anime, manga, komik, film, dan game terbaru di satu tempat
            </p>
          </div>

          {activeCategory === "all" && (
            <QuickStats className="flex-shrink-0" />
          )}
        </div>
      )}

      {/* OPTION 2: STACKED - Quick stats di bawah brand section */}
      {layout === "stacked" && (
        <div className="mb-6">
          <div className="mb-4">
            <h1 className="mb-2">
              Portal <span className="text-primary">Conime</span>
              {activeCategory !== "all" && (
                <span className="text-muted-foreground"> - {getCategoryLabel(activeCategory)}</span>
              )}
            </h1>
            <p className="text-muted-foreground">
              Temukan dunia anime, manga, komik, film, dan game terbaru di satu tempat
            </p>
          </div>

          {activeCategory === "all" && (
            <QuickStats className="justify-center md:justify-start" />
          )}
        </div>
      )}

      {/* OPTION 3: COMPACT - Quick stats dalam tagline */}
      {layout === "compact" && (
        <div className="mb-6">
          <h1 className="mb-2">
            Portal <span className="text-primary">Conime</span>
            {activeCategory !== "all" && (
              <span className="text-muted-foreground"> - {getCategoryLabel(activeCategory)}</span>
            )}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-muted-foreground">
              Temukan dunia anime, manga, komik, film, dan game terbaru di satu tempat
            </p>
            {activeCategory === "all" && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-muted-foreground">•</span>
                <QuickStats />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Featured Article Banner - Sama untuk semua layout */}
      {activeCategory === "all" && featuredNews && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start gap-3">
            <Badge className="bg-primary text-primary-foreground flex-shrink-0">
              {featuredNews.category}
            </Badge>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                ⭐ {featuredNews.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {featuredNews.author} • {featuredNews.date}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex-shrink-0 hover:bg-primary hover:text-white transition-colors"
              onClick={handleFeaturedClick}
            >
              Baca
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3 text-center">
            ✨ <strong>Artikel Pilihan:</strong> Artikel terbaru yang direkomendasikan untuk Anda
          </p>
        </div>
      )}
    </section>
  );
}