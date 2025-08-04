import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
// Using Heroicons - Fixed import names
import { 
  FireIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon,
  ArrowRightIcon,
  StarIcon
} from "@heroicons/react/24/outline";

interface HeroSectionProps {
  activeCategory: string;
  featuredNews?: {
    title: string;
    titleJP: string;
    category: string;
    author: string;
    date: string;
    slug: string;
  };
  onCategoryChange: (category: string) => void;
  onFeaturedClick: () => void;
}

export function HeroSection({
  activeCategory,
  featuredNews,
  onCategoryChange,
  onFeaturedClick
}: HeroSectionProps) {
  const { t } = useLanguage();

  const quickStats = [
    {
      id: "all",
      label: t('hero.trending'),
      icon: FireIcon,
      count: "2.5K",
      color: "text-conime",
      bgColor: "bg-conime-50 dark:bg-conime-950",
      description: t('hero.trending')
    },
    {
      id: "berita", 
      label: t('hero.latestUpdates'),
      icon: ClockIcon,
      count: "156",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      description: t('hero.latestUpdates')
    },
    {
      id: "ulasan",
      label: t('hero.popularWeek'),
      icon: ArrowTrendingUpIcon,
      count: "89",
      color: "text-green-600 dark:text-green-400", 
      bgColor: "bg-green-50 dark:bg-green-950",
      description: t('hero.popularWeek')
    }
  ];

  return (
    <section className="mb-12">
      {/* Brand Hero Section - REMOVED LOGO, text only */}
      <div className="bg-gradient-to-br from-conime-50 via-background to-conime-50/30 dark:from-conime-950/20 dark:via-background dark:to-conime-950/10 rounded-2xl p-8 mb-8 border border-conime-200/50 dark:border-conime-800/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Brand Section - NO LOGO */}
          <div className="space-y-4">
            <div>
              <h1 className="font-roboto tracking-tight">
                <span className="text-conime">{t('hero.portal')}</span>{" "}
                <span className="logo-text">{t('hero.trusted')}</span>
              </h1>
              <p className="text-muted-foreground font-roboto mt-2 max-w-md">
                {t('hero.tagline')}
              </p>
              <p className="text-xs text-muted-foreground jp-text mt-1">
                アニメ・マンガ・コミック・映画・ゲームの総合ポータルサイト
              </p>
            </div>
          </div>

          {/* Quick Stats - Horizontal on Desktop */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
            {quickStats.map((stat) => {
              const Icon = stat.icon;
              const isActive = activeCategory === stat.id;
              
              return (
                <Card
                  key={stat.id}
                  className={`
                    cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg
                    ${isActive 
                      ? `border-conime-500 ${stat.bgColor} shadow-md` 
                      : "hover:border-conime-300 dark:hover:border-conime-700"
                    }
                  `}
                  onClick={() => onCategoryChange(stat.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-2">
                      <Icon 
                        className={`h-6 w-6 ${isActive ? "text-conime" : stat.color}`}
                      />
                      <div>
                        <div className="font-roboto text-lg">{stat.count}</div>
                        <div className="text-xs text-muted-foreground font-roboto">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Article Banner */}
      {featuredNews && (
        <Card className="overflow-hidden bg-gradient-to-r from-card via-card to-conime-50/30 dark:to-conime-950/20 border-conime-200/50 dark:border-conime-800/50 hover:shadow-xl transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Featured Content */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-conime hover:bg-conime-600 font-roboto">
                    <StarIcon className="h-3 w-3 mr-1" />
                    {t('hero.featuredArticle')}
                  </Badge>
                  <Badge variant="outline" className="font-roboto capitalize">
                    {featuredNews.category}
                  </Badge>
                </div>
                
                <h2 className="font-roboto group-hover:text-conime transition-colors line-clamp-2">
                  {featuredNews.title}
                </h2>
                
                <p className="text-xs text-muted-foreground jp-text">
                  {featuredNews.titleJP}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground font-roboto">
                  <span>{t('common.author')} {featuredNews.author}</span>
                  <span>•</span>
                  <span>{featuredNews.date}</span>
                </div>
                
                <p className="text-sm text-muted-foreground font-roboto">
                  {t('hero.featuredDesc')}
                </p>
              </div>

              {/* CTA Button */}
              <div className="lg:flex-shrink-0">
                <Button 
                  onClick={onFeaturedClick}
                  className="font-roboto bg-conime hover:bg-conime-600 w-full lg:w-auto group-hover:scale-105 transition-all"
                >
                  {t('hero.read')}
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}