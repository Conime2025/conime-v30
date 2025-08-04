import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { useContentTracking } from "../hooks/useContentTracking";
import { useAlert, useNotification } from "./NotificationSystem";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Card, CardHeader, CardContent } from "./ui/card";
import { ArrowTrendingUpIcon, StarIcon, ClockIcon, FireIcon, EyeIcon } from "@heroicons/react/24/outline";
import { sidebarData, getLatestArticles, getAllArticles } from "../data/mockData";
import { LastViewed } from "./LastViewed";
import { SidebarAd } from "./AdManager";

export function Sidebar() {
  const { t, language } = useLanguage();
  const { navigate } = useRouter();
  const { getTrendingArticles, getPopularArticles, getViewCount } = useContentTracking();
  const alert = useAlert();
  const { showNewsletter } = useNotification();

  // Get all articles for trending calculation
  const allArticles = getAllArticles();
  
  // Get trending articles with real tracking data
  const trendingArticles = getTrendingArticles(allArticles, 4)
    .map(article => ({
      id: article.id,
      title: article.title[language],
      views: getViewCount(article.id),
      viewsText: `${getViewCount(article.id)} ${language === 'id' ? 'dilihat' : 'views'}`,
      image: article.image,
      category: article.category,
      slug: article.slug,
      trendingScore: article.trendingScore
    }));

  // Get popular articles for weekly section
  const popularArticles = getPopularArticles(allArticles, 'weekly', 4)
    .map(article => ({
      id: article.id,
      title: article.title[language],
      views: getViewCount(article.id),
      viewsText: `${getViewCount(article.id)} ${language === 'id' ? 'dilihat' : 'views'}`,
      image: article.image,
      category: article.category,
      slug: article.slug,
      popularityScore: article.popularityScore
    }));

  // Categories with count from actual data - Title Case
  const categories = [
    { 
      name: language === 'id' ? 'Ulasan' : 'Reviews', 
      count: allArticles.filter(a => a.category === 'ulasan').length, 
      color: 'bg-emerald-500',
      path: '/ulasan'
    },
    { 
      name: language === 'id' ? 'Berita' : 'News', 
      count: allArticles.filter(a => a.category === 'berita').length, 
      color: 'bg-blue-500',
      path: '/berita' 
    },
    { 
      name: language === 'id' ? 'Rekomendasi' : 'Recommendations', 
      count: allArticles.filter(a => a.category === 'rekomendasi').length, 
      color: 'bg-purple-500',
      path: '/rekomendasi'
    },
    { 
      name: language === 'id' ? 'Anime' : 'Anime', 
      count: allArticles.filter(a => a.category === 'anime').length, 
      color: 'bg-[#ff1545]',
      path: '/anime'
    },
    { 
      name: language === 'id' ? 'Komik' : 'Comics', 
      count: allArticles.filter(a => a.category === 'komik').length, 
      color: 'bg-yellow-500',
      path: '/komik'
    },
    { 
      name: language === 'id' ? 'Film' : 'Movies', 
      count: allArticles.filter(a => a.category === 'movie').length, 
      color: 'bg-pink-500',
      path: '/movie'
    },
    { 
      name: language === 'id' ? 'Game' : 'Games', 
      count: allArticles.filter(a => a.category === 'game').length, 
      color: 'bg-orange-500',
      path: '/game'
    }
  ];

  const handleArticleClick = (article: any) => {
    navigate(`/${article.category}/${article.slug}`);
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    navigate(category.path);
  };

  const handleNewsletterSubscribe = () => {
    showNewsletter(
      language === 'id' ? 'Newsletter Berhasil!' : 'Newsletter Success!',
      language === 'id' 
        ? 'Terima kasih! Fitur newsletter akan segera tersedia. Kami akan memberi tahu Anda ketika siap.'
        : 'Thank you! Newsletter feature will be available soon. We will notify you when ready.',
      {
        label: language === 'id' ? 'Oke' : 'OK',
        onClick: () => {
          alert.info(language === 'id' 
            ? 'Anda akan mendapat email konfirmasi segera.'
            : 'You will receive a confirmation email soon.'
          );
        }
      }
    );
  };

  return (
    <div className="w-full md:w-80 flex-shrink-0" aria-label="Artikel sampingan">
      <div className="space-y-6">
        {/* Last Viewed Articles */}
        <LastViewed maxItems={6} showClearButton={true} />

        {/* Ad Space - Small Sidebar Ad */}
        <SidebarAd className="mb-6" />

        {/* Trending Articles */}
        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none flex items-center space-x-2">
              <FireIcon className="h-5 w-5 text-orange-500" aria-hidden="true" />
              <span>{language === 'id' ? 'Trending Hari Ini' : 'Trending Today'}</span>
            </h4>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            {trendingArticles.length > 0 ? trendingArticles.map((article, index) => (
              <div key={article.id}>
                <div 
                  className="flex space-x-3 group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-16 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="flex items-center gap-1">
                        <EyeIcon className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{article.viewsText}</span>
                      </span>
                      {article.trendingScore > 5 && (
                        <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700">
                          <FireIcon className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {index < trendingArticles.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {language === 'id' ? 'Belum ada artikel trending' : 'No trending articles yet'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Popular This Week */}
        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none flex items-center space-x-2">
              <ArrowTrendingUpIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span>{language === 'id' ? 'Popular Minggu Ini' : 'Popular This Week'}</span>
            </h4>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            {popularArticles.length > 0 ? popularArticles.map((article, index) => (
              <div key={article.id}>
                <div 
                  className="flex space-x-3 group cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-12 rounded object-cover flex-shrink-0"
                    />
                    <div className="absolute -top-1 -left-1">
                      <span className="bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <EyeIcon className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{article.viewsText}</span>
                    </div>
                  </div>
                </div>
                {index < popularArticles.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                {language === 'id' ? 'Belum ada artikel popular' : 'No popular articles yet'}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Another Ad Space - Between popular and categories */}
        <SidebarAd className="mb-6" />

        {/* Kategori Card */}
        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/10">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none flex items-center space-x-2">
              <StarIcon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span>{language === 'id' ? 'Kategori' : 'Categories'}</span>
            </h4>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-3">
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2 transition-colors group"
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${category.color} group-hover:scale-110 transition-transform`}></div>
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs group-hover:bg-primary/10">
                  {category.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Newsletter Card */}
        <Card className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
            <h4 className="leading-none text-center w-full">Newsletter</h4>
          </CardHeader>
          <CardContent className="px-6 pb-6 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              {language === 'id' 
                ? "Dapatkan update berita anime terbaru langsung di email Anda!" 
                : "Get the latest anime news updates directly to your email!"
              }
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={language === 'id' ? "Email Anda" : "Your Email"}
                className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
              <Button 
                className="w-full bg-gradient-to-r from-[#ff1545] to-[#e9335a] text-white text-sm py-2 rounded-md hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
                onClick={handleNewsletterSubscribe}
              >
                {language === 'id' ? "Berlangganan" : "Subscribe"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}