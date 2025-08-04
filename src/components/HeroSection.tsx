import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { FireIcon, ClockIcon, ArrowTrendingUpIcon, EyeIcon, UsersIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { getAllArticles } from "../data/mockData";

export function HeroSection() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get stats
  const allArticles = getAllArticles();
  const totalArticles = allArticles.length;
  const todayArticles = allArticles.filter(article => {
    const articleDate = new Date(article.dateISO);
    const today = new Date();
    return articleDate.toDateString() === today.toDateString();
  }).length;

  // Quick stats data
  const quickStats = [
    {
      label: language === 'id' ? 'Total Artikel' : 'Total Articles',
      value: `${totalArticles.toLocaleString()}`,
      icon: EyeIcon,
      color: 'text-primary'
    },
    {
      label: language === 'id' ? 'Update Terbaru' : 'Latest Updates',
      value: `${todayArticles || 156}`,
      icon: ClockIcon,
      color: 'text-blue-500'
    },
    {
      label: language === 'id' ? 'Popular Minggu Ini' : 'Popular This Week',
      value: '89',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-500'
    }
  ];

  const handleQuickStatClick = (index: number) => {
    switch (index) {
      case 0: // Total Articles
        navigate('/');
        break;
      case 1: // Latest Updates
        // Scroll to latest section on homepage
        const latestSection = document.getElementById('latest-section');
        if (latestSection) {
          latestSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case 2: // Popular This Week
        // Scroll to popular section on homepage
        const popularSection = document.getElementById('popular-section');
        if (popularSection) {
          popularSection.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-muted/30 border-b border-border/50">
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Portal <span className="text-primary">Terpercaya</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {language === 'id' 
                ? 'Portal terpercaya untuk anime, manga, komik, film, dan game. Temukan konten terbaru dan berkualitas di sini.'
                : 'Trusted portal for anime, manga, comics, films, and games. Discover the latest and quality content here.'
              }
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => navigate('/anime')}
              className="flex items-center space-x-2"
            >
              <FireIcon className="h-4 w-4" />
              <span>{language === 'id' ? 'Jelajahi Anime' : 'Explore Anime'}</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/komik')}
              className="flex items-center space-x-2"
            >
              <span>{language === 'id' ? 'Baca Komik' : 'Read Comics'}</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/game')}
              className="flex items-center space-x-2"
            >
              <span>{language === 'id' ? 'Review Game' : 'Game Reviews'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-muted/30 border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => handleQuickStatClick(index)}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-3 rounded-full bg-background border border-border/50 group-hover:border-primary/50 transition-colors`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Time & Status */}
      <div className="bg-card border-t border-border/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <CalendarDaysIcon className="h-4 w-4" />
                <span>
                  {currentTime.toLocaleDateString(
                    language === 'id' ? 'id-ID' : 'en-US',
                    { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }
                  )}
                </span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4" />
                <span>
                  {currentTime.toLocaleTimeString(
                    language === 'id' ? 'id-ID' : 'en-US',
                    { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    }
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{language === 'id' ? 'Website Aktif' : 'Website Active'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}