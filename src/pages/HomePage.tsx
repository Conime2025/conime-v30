import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar"; 
import { Footer } from "../components/Footer";
import { HeroSlider } from "../components/HeroSlider";
import { CategoryFilter } from "../components/CategoryFilter";
import { ArticlesPagination } from "../components/ArticlesPagination";
import { Sidebar } from "../components/Sidebar";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";
import { BannerAd, NativeAd } from "../components/AdManager";
import { useLanguage } from "../hooks/useLanguage";
import { useContentTracking } from "../hooks/useContentTracking";
import { Card, CardContent } from "../components/ui/card";
import { useRouter } from "../components/Router";
import { FireIcon, ArrowTrendingUpIcon, EyeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { getAllArticles } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import "../styles/Bird.css";

export default function HomePage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const { getTrendingArticles, getPopularArticles, getViewCount } = useContentTracking();
  const [activeCategory, setActiveCategory] = useState('semua');

  // Get all articles for processing
  const allArticles = getAllArticles();

  // Get trending articles (auto-updated from localStorage)
  const trendingArticles = getTrendingArticles(allArticles, 6)
    .map(article => ({
      ...article,
      title: article.title[language],
      viewCount: getViewCount(article.id)
    }));

  // Get popular articles this week (auto-updated from localStorage)
  const popularArticles = getPopularArticles(allArticles, 'weekly', 6)
    .map(article => ({
      ...article,
      title: article.title[language],
      viewCount: getViewCount(article.id)
    }));

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

  const seoData = {
    title: `Conime - ${language === 'id' ? 'Portal Berita Anime, Manga & Game Terdepan' : 'Leading Anime, Manga & Game News Portal'}`,
    description: language === 'id' 
      ? 'Dapatkan berita anime terbaru, ulasan manga, rekomendasi game, dan informasi terkini dunia hiburan Jepang di Conime.'
      : 'Get the latest anime news, manga reviews, game recommendations, and current information about Japanese entertainment at Conime.',
    keywords: 'anime, manga, game, berita anime, review manga, rekomendasi game, otaku, weeb, anime news, manga review',
    url: `https://conime.id${language === 'en' ? '/en' : ''}`,
    type: 'website'
  };

  return (
    <>
      <SEOHead {...seoData} />
      <StructuredData type="website" data={{
        name: 'Conime',
        description: seoData.description,
        url: seoData.url
      }} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar /> 
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1" role="main">



 
    <div className="bird-container hidden">          
<svg className="hidden" width="100" height="100" viewBox="0 0 463 463" fill="none" xmlns="http://www.w3.org/2000/svg">
 
<ellipse className="shadowBird" cx="241.5" cy="404.5" rx="121.5" ry="42.5" fill="#666565" fill-opacity="0.7"/>
<g className="bird" clip-path="url(#clip0_3477_1183)">
<path d="M220.328 313.021C220.328 315.019 221.349 316.85 222.955 318.038C226.971 321.006 233.327 326.793 233.327 334.998C231.327 365 216.328 361.5 210.827 354.498C198.827 367.998 189.327 354.5 189.327 353C172.758 363 169.257 344.5 176.756 334.998C178.648 331.678 183.257 326 188.399 322.885C192.757 320.244 193.757 318.5 195.328 312.696V288H220.328V313.021Z" fill="#E09C23"/>
<path d="M260.329 313.021C260.329 315.019 259.308 316.85 257.701 318.038C253.686 321.006 247.33 326.793 247.33 334.998C249.329 365 264.328 361.5 269.83 354.498C281.829 367.998 291.33 354.5 291.33 353C307.899 363 311.399 344.5 303.9 334.998C302.008 331.678 297.399 326 292.257 322.885C287.899 320.244 286.9 318.5 285.329 312.696V288H260.329V313.021Z" fill="#E09C23"/>
<path className="wing-left" d="M430.693 131.499C417.039 127.495 360.772 162.078 336.547 179.929L312.873 199.452L321.131 244.497C339.851 243.663 355.817 247.999 392.154 240.493C418.441 235.063 428.858 217.637 422.985 208.961C443.687 191.744 439.319 176.095 430.693 170.923C436.382 160.746 444.347 135.503 430.693 131.499Z" fill="#133048"/>
<path className="wing-right" d="M45.4121 138.32C59.0661 134.316 115.334 168.898 139.558 186.75L163.232 206.272L154.974 251.317C136.255 250.483 120.289 254.819 83.9515 247.313C57.6641 241.883 47.2473 224.457 53.12 215.782C32.4189 198.564 36.7867 182.915 45.4121 177.743C39.723 167.566 31.7582 142.324 45.4121 138.32Z" fill="#133048"/>
<ellipse cx="195.604" cy="159.453" rx="8.53516" ry="8.08594" fill="white"/>
<ellipse cx="296.678" cy="159.453" rx="8.53516" ry="8.08594" fill="white"/>
<path d="M336.227 93.5349C339.015 93.2084 341.148 95.887 340.296 98.5613C336.786 109.581 333.91 116.921 328.54 127.979C340.081 143.005 346.663 162.007 345.878 182.488L343.907 233.99C342.411 273.042 310.319 303.929 271.239 303.929H207.671C168.591 303.929 136.499 273.042 135.003 233.99L133.032 182.488C132.232 161.59 139.098 142.231 151.081 127.065C145.992 116.51 143.177 109.275 139.764 98.5613C138.913 95.8871 141.046 93.2084 143.834 93.5349C157.668 95.1553 165.935 98.8632 176.793 105.317C188.783 98.7449 202.558 94.9998 217.235 94.9998H261.676C276.597 94.9998 290.585 98.8696 302.713 105.646C313.847 98.9885 322.159 95.1827 336.227 93.5349Z" fill="#133048"/>
<path d="M321.955 247.883C321.955 278.811 296.883 303.883 265.955 303.883H212.955C182.027 303.883 156.955 278.811 156.955 247.883V183.883H321.955V247.883Z" fill="#06CF99"/>
<path d="M240.977 276C248.156 276 253.031 275.919 253.031 278.794C253.031 281.669 247.211 284 240.031 284C232.852 284 227.031 281.669 227.031 278.794C227.031 275.919 233.797 276 240.977 276Z" fill="white" fill-opacity="0.1"/>
<path d="M213.977 252C221.156 252 226.03 251.919 226.031 254.793C226.031 257.669 220.211 259.999 213.031 259.999C205.852 259.999 200.031 257.669 200.031 254.793C200.032 251.919 206.798 252 213.977 252Z" fill="white" fill-opacity="0.1"/>
<path d="M268.977 252C276.156 252 281.03 251.919 281.031 254.793C281.031 257.669 275.211 259.999 268.031 259.999C260.852 259.999 255.031 257.669 255.031 254.793C255.032 251.919 261.798 252 268.977 252Z" fill="white" fill-opacity="0.1"/>
<path d="M236.868 107L129.873 74.1875L236.868 19L343.873 74.1875L236.868 107Z" fill="#0D1216"/>
<path d="M189.111 76.998L178.873 104.998C226.101 109.079 252.648 108.987 299.873 104.998L289.635 76.998C251.13 65.1334 229.203 63.9854 189.111 76.998Z" fill="#141819"/>
<path d="M333.873 80.0002C333.873 60.4973 322.873 54.5 313.373 58.5035L320.373 61.9996C326.373 66.0009 328.54 75.6666 327.373 80.0002H333.873Z" fill="#141819"/>
<path d="M330.874 78C334.187 78.0002 336.874 80.6864 336.874 84V86C336.874 87.485 336.333 88.8429 335.439 89.8906C336.501 90.9506 337.198 92.3805 337.317 93.9834L338.715 112.853C338.8 114.012 337.882 115 336.719 115H325.027C323.864 115 322.947 114.012 323.033 112.853L324.43 93.9834C324.549 92.3804 325.246 90.9497 326.307 89.8896C325.414 88.8421 324.874 87.4846 324.874 86V84C324.874 80.6863 327.56 78 330.874 78Z" fill="#06CF99"/>
<path d="M294.103 110.469C328.218 110.469 355.874 138.124 355.874 172.24C355.874 206.355 328.218 234.01 294.103 234.01C270.702 234.01 250.34 220.997 239.859 201.813C229.377 220.997 209.016 234.01 185.615 234.01C151.499 234.01 123.844 206.355 123.844 172.24C123.844 138.124 151.499 110.469 185.615 110.469C201.506 110.469 215.995 116.47 226.941 126.329C233.659 132.38 246.058 132.38 252.776 126.329C263.722 116.47 278.212 110.469 294.103 110.469Z" fill="#0A4164"/>
<circle className="" cx="188.727" cy="172.236" r="47.496" fill="#133048"/>
<circle className="" cx="188.727" cy="172.24" r="39.6074" fill="white"/>
<circle className="" cx="188.726" cy="175.211" r="22.5154" fill="#133048"/>
<circle className="" cx="188.73" cy="175.195" r="13.312" fill="black"/>
<circle className="" cx="197.602" cy="167.964" r="6.08081" fill="white"/>
<circle className="" cx="290.984" cy="172.236" r="47.496" fill="#133048"/>
<circle className="" cx="290.984" cy="172.24" r="39.6074" fill="white"/>
<circle className="" cx="290.984" cy="175.211" r="22.5154" fill="#133048"/>
<circle className="" cx="290.988" cy="175.195" r="13.312" fill="black"/>
<circle className="" cx="299.86" cy="167.964" r="6.08081" fill="white"/>
<path d="M240.904 186.592C245.659 186.108 255.37 200.703 262.466 207.041C263.141 207.644 263.363 208.622 262.938 209.42C256.215 222.037 245.411 231.613 240.892 231.909L240.681 231.916C236.295 231.916 225.254 222.237 218.424 209.42C217.999 208.622 218.221 207.644 218.896 207.041C226.105 200.603 236.011 185.643 240.681 186.626L240.904 186.592Z" fill="#FE8101"/>
<path d="M240.68 211.553V224.66C234.451 224.972 228.567 214.841 226.404 209.736L240.68 211.553ZM254.955 209.736C252.792 214.841 246.909 224.971 240.681 224.66V211.553L254.955 209.736Z" fill="#631515"/>
<path d="M248.852 212.91C247.632 215.788 244.348 221.455 240.843 221.461L240.676 221.457C237.108 221.635 233.739 215.834 232.5 212.91L240.676 213.95L248.852 212.91Z" fill="#CF1C1C"/>
<path d="M240.902 186.59C245.658 186.107 255.369 200.702 262.465 207.039C262.974 207.494 263.224 208.163 263.134 208.807L263.131 208.81C254.517 211.499 249.585 213.55 240.681 218.024C231.776 213.55 226.844 211.499 218.231 208.81L218.223 208.804C218.134 208.161 218.386 207.494 218.895 207.039C226.103 200.601 236.01 185.641 240.68 186.624L240.902 186.59Z" fill="#FFC300"/>
<path d="M247.814 197.018C247.814 199.956 245.137 199.873 241.196 199.873C237.254 199.873 233.539 199.956 233.539 197.018C233.539 194.079 236.735 191.697 240.676 191.697C244.618 191.697 247.814 194.079 247.814 197.018Z" fill="white" fill-opacity="0.3"/>
<path className="strokeEffect" d="M435.373 114C445.373 120.5 455.873 132 452.373 161.5M442.707 107.727C450.226 111.787 457.479 117.002 460.386 134" stroke="#141819" stroke-width="5" stroke-linecap="round"/>
<path className="strokeEffect" d="M37.8858 125.531C29.9628 130.681 22.4793 137.212 22.0996 159M13.2559 144.289C10.7977 152.473 9.34354 161.287 19.2865 175.377" stroke="#141819" stroke-width="5" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_3477_1183">
<rect width="462.437" height="462.44" fill="white"/>
</clipPath>
</defs>
</svg>
</div> 


              {/* Hero Slider - Limited to main content area */}
              <div className="mb-8">
                <HeroSlider />
              </div>

              {/* Top Banner Ad */}
              <div className="mb-8">
                <BannerAd className="w-full" />
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <CategoryFilter 
                  onCategoryChange={setActiveCategory} 
                  activeCategory={activeCategory}
                />
              </div>

              {/* Latest Articles with Pagination - LEFT ALIGNED */}
              <div className="mb-12">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-3 text-left">
                    {language === 'id' ? 'Artikel Terbaru' : 'Latest Articles'}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl text-left">
                    {activeCategory === 'semua' 
                      ? (language === 'id' 
                          ? 'Temukan artikel terbaru dari semua kategori yang telah diperbarui hari ini'
                          : 'Discover the latest articles from all categories updated today'
                        )
                      : (language === 'id' 
                          ? `Artikel terbaru kategori ${formatCategoryName(activeCategory)} yang wajib Anda baca`
                          : `Latest ${formatCategoryName(activeCategory)} articles you must read`
                        )
                    }
                  </p>
                </div>
                
                <ArticlesPagination 
                  activeCategory={activeCategory}
                  articlesPerPage={6}
                />
              </div>

              {/* Native Ad between main content and trending/popular */}
              <div className="mb-12">
                <NativeAd category="anime" className="w-full" />
              </div>

              {/* Trending Articles Section - h-36 height for trending images */}
              <div className="mb-12" id="trending-section">
                <div className="flex items-center gap-2 mb-6">
                  <FireIcon className="h-6 w-6 text-orange-500" />
                  <h2 className="text-2xl font-bold">
                    {language === 'id' ? 'Trending Hari Ini' : 'Trending Today'}
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingArticles.slice(0, 3).map((article) => (
                    <Card 
                      key={article.id}
                      className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                      onClick={() => handleArticleClick(article)}
                    >
                      {/* h-36 (144px) height for trending articles */}
                      <div className="relative h-36 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                            {formatCategoryName(article.category)}
                          </span>
                        </div>
                        {article.trendingScore > 5 && (
                          <div className="absolute top-2 right-2">
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                              <FireIcon className="w-3 h-3" />
                              Hot
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-3">
                        <h3 className="font-semibold line-clamp-2 mb-2 text-sm group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            {article.viewCount.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="w-3 h-3" />
                            {article.date}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Another Native Ad */}
              <div className="mb-12">
                <NativeAd category="game" className="w-full" />
              </div>

              {/* Popular This Week Section - h-40 height for popular images */}
              <div className="mb-12" id="popular-section">
                <div className="flex items-center gap-2 mb-6">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-green-500" />
                  <h2 className="text-2xl font-bold">
                    {language === 'id' ? 'Popular Minggu Ini' : 'Popular This Week'}
                  </h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularArticles.slice(0, 3).map((article, index) => (
                    <Card 
                      key={article.id}
                      className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                      onClick={() => handleArticleClick(article)}
                    >
                      {/* h-40 (160px) height for popular articles */}
                      <div className="relative h-40 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                            {formatCategoryName(article.category)}
                          </span>
                        </div>
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            #{index + 1}
                          </span>
                        </div>
                      </div>
                      
                      <CardContent className="p-3">
                        <h3 className="font-semibold line-clamp-2 mb-2 text-sm group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            {article.viewCount.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowTrendingUpIcon className="w-3 h-3" />
                            Popular
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </main>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}