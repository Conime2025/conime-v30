import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { useContentTracking } from "../hooks/useContentTracking";
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getAllArticles } from "../data/mockData";

export function HeroSlider() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const { getViewCount } = useContentTracking();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Get featured articles for slider (latest 5)
  const allArticles = getAllArticles();
  const featuredArticles = allArticles
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, 5)
    .map(article => ({
      ...article,
      title: article.title[language],
      excerpt: article.excerpt?.[language] || article.summary?.[language] || '',
      viewCount: getViewCount(article.id)
    }));

  // Auto-slide effect
  useEffect(() => {
    if (isAutoPlaying && featuredArticles.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => 
          prev === featuredArticles.length - 1 ? 0 : prev + 1
        );
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, featuredArticles.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    handleSlideChange(currentSlide === featuredArticles.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    handleSlideChange(currentSlide === 0 ? featuredArticles.length - 1 : currentSlide - 1);
  };

  const handleArticleClick = (article: any) => {
    navigate(`/${article.category}/${article.slug}`);
  };

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

  if (featuredArticles.length === 0) {
    return (
      <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">
          {language === 'id' ? 'Memuat konten...' : 'Loading content...'}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-card">
      {/* Main Slider */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {featuredArticles.map((article) => (
          <div
            key={article.id}
            className="w-full flex-shrink-0 relative cursor-pointer group"
            onClick={() => handleArticleClick(article)}
          >
            <div className="aspect-[16/9] md:aspect-[21/9] relative overflow-hidden">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-primary text-white text-sm px-3 py-1">
                  {formatCategoryName(article.category)}
                </Badge>
              </div>
              
              {/* View Count */}
              <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1 rounded flex items-center gap-2">
                <EyeIcon className="w-4 h-4" />
                <span>{article.viewCount.toLocaleString()}</span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-10">
                <h2 className="text-xl md:text-3xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                {article.excerpt && (
                  <p className="text-sm md:text-base text-gray-200 line-clamp-2 mb-4 max-w-2xl">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {featuredArticles.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={language === 'id' ? 'Slide sebelumnya' : 'Previous slide'}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label={language === 'id' ? 'Slide selanjutnya' : 'Next slide'}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Smaller Capsule-shaped Dot Indicators */}
      {featuredArticles.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {featuredArticles.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`
                transition-all duration-300 rounded-full
                ${index === currentSlide 
                  ? 'bg-primary w-6 h-2.5' // Smaller capsule shape when active
                  : 'bg-white/50 hover:bg-white/70 w-2.5 h-2.5' // Smaller circles when inactive
                }
              `}
              aria-label={`${language === 'id' ? 'Pergi ke slide' : 'Go to slide'} ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play indicator */}
      {isAutoPlaying && featuredArticles.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span>{language === 'id' ? 'Auto' : 'Auto'}</span>
          </div>
        </div>
      )}
    </div>
  );
}