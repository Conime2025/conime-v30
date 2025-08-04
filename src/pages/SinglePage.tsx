import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { SharePopup } from "../components/SharePopup";
import { CommentsSection } from "../components/CommentsSection";
import { Breadcrumb } from "../components/Breadcrumb";
import { LoadingAnimation } from "../components/LoadingAnimation";
import { SEOHead } from "../components/SEOHead";
import { StructuredData } from "../components/StructuredData";
import { ReadAlso } from "../components/ReadAlso";
import { RelatedArticles } from "../components/RelatedArticles";
import { useLanguage } from "../hooks/useLanguage";
import { useContentTracking } from "../hooks/useContentTracking";
import { Button } from "../components/ui/button";
import { 
  HomeIcon, 
  CalendarIcon, 
  UserIcon, 
  HeartIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  DocumentTextIcon,
  TagIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { getAllArticles, getArticleBySlug, formatDateDDMMYYYY } from "../data/mockData";
import { useRouter } from "../components/Router";

interface SinglePageProps {
  category: string;
  slug: string;
}

export default function SinglePage({ category, slug }: SinglePageProps) {
  const { language, t } = useLanguage();
  const { navigate } = useRouter();
  const { trackArticleView, getRelatedArticles, getViewCount } = useContentTracking();
  const [article, setArticle] = useState<any | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Find article by slug
  useEffect(() => {
    const foundArticle = getArticleBySlug(slug);
    
    if (foundArticle && foundArticle.category === category) {
      const processedArticle = {
        ...foundArticle,
        id: parseInt(foundArticle.id.replace(/[^0-9]/g, '')) || 1,
        likes: Math.floor(Math.random() * 500) + 50,
        comments: Math.floor(Math.random() * 100) + 5,
        shares: Math.floor(Math.random() * 150) + 10,
        tags: foundArticle.tags || []
      };
      setArticle(processedArticle);
      setLikeCount(processedArticle.likes);
    }
    
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, [category, slug]);

  // Track article view automatically after 3 seconds
  useEffect(() => {
    if (!article || hasTrackedView) return;
    
    const timer = setTimeout(() => {
      trackArticleView({
        id: article.id,
        title: article.title[language],
        slug: article.slug,
        category: article.category,
        thumbnail: article.image
      });
      setHasTrackedView(true);
    }, 3000); // Track after 3 seconds
    
    return () => clearTimeout(timer);
  }, [article, hasTrackedView, trackArticleView, language]);

  // Get related articles using smart algorithm
  const allArticles = getAllArticles();
  const relatedArticles = article ? getRelatedArticles(
    {
      ...article,
      categories: article.categories || [article.category],
      summary: article.excerpt || article.summary,
      tags: article.tags || []
    },
    allArticles,
    6
  ) : [];

  // Get view count for current article
  const currentViewCount = article ? getViewCount(article.id) : 0;

  // Category mapping untuk display dengan title case
  const categoryMap: { [key: string]: { id: string; en: string } } = {
    'anime': { id: 'Anime', en: 'Anime' },
    'berita': { id: 'Berita', en: 'News' },
    'ulasan': { id: 'Ulasan', en: 'Reviews' },
    'rekomendasi': { id: 'Rekomendasi', en: 'Recommendations' },
    'komik': { id: 'Komik', en: 'Comics' },
    'movie': { id: 'Film', en: 'Movies' },
    'game': { id: 'Game', en: 'Games' }
  };

  const displayCategory = categoryMap[category]?.[language] || category;

  // YouTube embed component
  const YouTubeEmbed = ({ videoId, title }: { videoId: string; title: string }) => (
    <div className="youtube-embed my-8">
      <div className="relative w-full h-0 pb-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption className="text-sm text-muted-foreground mt-3 text-center">
        {title}. {language === 'id' ? 'Sumber: YouTube' : 'Source: YouTube'}
      </figcaption>
    </div>
  );

  // Interactive handlers
  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    // Scroll to comment section
    const commentElement = document.getElementById('comment');
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRelatedClick = (relatedArticle: any) => {
    navigate(`/${relatedArticle.category}/${relatedArticle.slug}`);
  };

  const handleCategoryClick = () => {
    navigate(`/${category}`);
  };

  const handleTagClick = (tag: string) => {
    // Navigate to list page with tag filter
    navigate(`/tag/${encodeURIComponent(tag)}`);
  };

  if (!isLoaded) {
    return (
      <LoadingAnimation 
        isLoading={!isLoaded} 
        message={language === 'id' ? 'Memuat artikel...' : 'Loading article...'}
      />
    );
  }

  if (!article) {
    return (
      <>
        <div className="min-h-screen bg-background">
          <Header />
        <TimeBar />
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">
                <svg className="mx-auto h-16 w-16 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">
                {language === 'id' ? 'Artikel Tidak Ditemukan' : 'Article Not Found'}
              </h1>
              <p className="text-muted-foreground mb-6">
                {language === 'id' 
                  ? 'Artikel yang Anda cari mungkin telah dipindahkan atau tidak tersedia.'
                  : 'The article you are looking for may have been moved or is not available.'
                }
              </p>
              <div className="space-x-4">
                <Button onClick={() => navigate('/')} variant="default">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
                </Button>
                <Button onClick={() => navigate(`/${category}`)} variant="outline">
                  {language === 'id' ? `Lihat ${displayCategory} Lainnya` : `View Other ${displayCategory}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const seoData = {
    title: `${article.title[language]} - Conime`,
    description: article.summary?.[language] || article.excerpt?.[language] || '',
    keywords: article.tags?.join(', ') || '',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/${category}/${slug}`,
    image: article.image,
    type: 'article',
    publishedTime: article.dateISO,
    author: article.author
  };

  // Generate article content from excerpt since content property doesn't exist
  const generateArticleContent = (excerpt: string) => {
    const paragraphs = excerpt.split('. ').map(sentence => sentence.trim()).filter(Boolean);
    return paragraphs.map(paragraph => {
      if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
        return paragraph + '.';
      }
      return paragraph;
    });
  };

  const articleExcerpt = article.excerpt?.[language] || article.summary?.[language] || '';

  return (
    <>
      {/* SEO Components */}
      <SEOHead {...seoData} />
      <StructuredData type="article" data={article} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0" role="main">
              {/* Breadcrumb Navigation */}
              <Breadcrumb 
                items={[
                  { 
                    label: displayCategory, 
                    path: `/${category}`
                  },
                  { 
                    label: article.title[language], 
                    isActive: true 
                  }
                ]} 
              />

              {/* Article Header */}
              <article className="mb-8">
                <div className="mb-6">
                  <Badge 
                    variant="default" 
                    className="mb-4 cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={handleCategoryClick}
                  >
                    {displayCategory}
                  </Badge>
                  
                  <h1 className="text-4xl font-bold mb-4 leading-tight">
                    {article.title[language]}
                  </h1>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-4 w-4" />
                      <time dateTime={article.dateISO}>
                        {article.date}
                      </time>
                    </div>
                    <div className="flex items-center space-x-2">
                      <EyeIcon className="h-4 w-4" />
                      <span>{currentViewCount.toLocaleString()} {language === 'id' ? 'dilihat' : 'views'}</span>
                    </div>
                  </div>

                  {/* Social Actions */}
                  <div className="flex items-center space-x-6 py-4 border-y">
                    <button 
                      onClick={handleLike}
                      className={`flex items-center space-x-2 transition-colors ${
                        liked ? 'text-red-500' : 'text-muted-foreground hover:text-primary'
                      }`}
                    >
                      <HeartIcon className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                      <span>{likeCount}</span>
                    </button>
                    
                    <button 
                      onClick={handleComment}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span>{article.comments}</span>
                    </button>
                    
                    <button 
                      onClick={handleShare}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                      <span>{language === 'id' ? 'Bagikan' : 'Share'}</span>
                    </button>
                  </div>
                </div>

                {/* Featured Image */}
                <figure className="mb-8">
                  <div className="relative w-full h-96 rounded-xl overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="text-sm text-muted-foreground mt-3 text-center">
                    {article.title[language]}. {language === 'id' ? 'Gambar utama artikel' : 'Main article image'}. {language === 'id' ? 'Sumber: Unsplash' : 'Source: Unsplash'}
                  </figcaption>
                </figure>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="article-content">
                    {articleExcerpt && generateArticleContent(articleExcerpt).map((paragraph, index) => (
                      <div key={index} className="mb-6">
                        <p className="text-lg leading-relaxed">
                          {paragraph}
                        </p>
                        
                        {/* Add blockquote example after first paragraph */}
                        {index === 0 && (
                          <blockquote className="article-quote my-8">
                            <p>
                              {language === 'id' 
                                ? 'Adaptasi anime dari manga selalu memberikan perspektif baru yang menarik bagi para penggemar.'
                                : 'Anime adaptations from manga always provide an interesting new perspective for fans.'
                              }
                            </p>
                            <cite className="quote-author">
                              — {language === 'id' ? 'Editor Conime' : 'Conime Editor'}
                            </cite>
                          </blockquote>
                        )}
                        
                        {/* Add read button in the middle of article */}
                        {index === Math.floor(generateArticleContent(articleExcerpt).length / 2) && (
                          <div className="my-12 text-center">
                            <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-8 rounded-xl border border-primary/20">
                              <BookOpenIcon className="h-8 w-8 text-primary mx-auto mb-4" />
                              <h3 className="text-xl font-semibold mb-2">
                                {language === 'id' ? 'Sedang Menikmati Artikel Ini?' : 'Enjoying This Article?'}
                              </h3>
                              <p className="text-muted-foreground mb-4">
                                {language === 'id' 
                                  ? 'Jangan lewatkan artikel menarik lainnya di Conime!'
                                  : 'Don\'t miss other interesting articles on Conime!'
                                }
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Button 
                                  onClick={handleLike}
                                  variant={liked ? "default" : "outline"}
                                  className="flex items-center space-x-2"
                                >
                                  <HeartIcon className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                                  <span>{liked ? (language === 'id' ? 'Disukai' : 'Liked') : (language === 'id' ? 'Suka Artikel Ini' : 'Like This Article')}</span>
                                </Button>
                                <Button 
                                  onClick={handleShare}
                                  variant="outline"
                                  className="flex items-center space-x-2"
                                >
                                  <PaperAirplaneIcon className="h-4 w-4" />
                                  <span>{language === 'id' ? 'Bagikan ke Teman' : 'Share with Friends'}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Add YouTube embed example - show after middle paragraph or second paragraph */}
                        {(index === Math.floor(generateArticleContent(articleExcerpt).length / 2) + 1 || 
                          (index === 1 && generateArticleContent(articleExcerpt).length <= 3)) && (
                          <YouTubeEmbed 
                            videoId="dQw4w9WgXcQ" 
                            title={language === 'id' 
                              ? 'Trailer Resmi Chainsaw Man Movie - Studio MAPPA'
                              : 'Official Chainsaw Man Movie Trailer - Studio MAPPA'
                            }
                          />
                        )}
                      </div>
                    ))}
                    
                    {/* Development Notice */}
                    <div className="my-8 p-6 bg-muted/30 rounded-xl border-l-4 border-blue-500">
                      <p className="text-sm text-muted-foreground">
                        {language === 'id' 
                          ? 'Konten lengkap artikel sedang dalam proses pengembangan. Saat ini menampilkan ringkasan artikel yang diperluas.'
                          : 'Full article content is under development. Currently showing expanded article summary.'
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Read Counter */}
                <div className="my-8 flex items-center justify-center">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                    <EyeIcon className="w-4 h-4" />
                    <span>{currentViewCount.toLocaleString()} {language === 'id' ? 'orang telah melihat artikel ini' : 'people have viewed this article'}</span>
                  </div>
                </div>

                {/* Tags Section */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-12 pb-4 mb-6 border-b">
                    <div className="mb-3">
                      <span className="text-sm font-medium text-foreground">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => handleTagClick(tag)}
                          className="px-3 py-1.5 text-sm bg-muted hover:bg-primary hover:text-white transition-colors rounded-lg border border-border hover:border-primary group"
                        >
                          <span className="text-primary group-hover:text-white">#</span>{tag.toLowerCase().replace(/\s+/g, '-')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {language === 'id' ? 'Ditulis oleh' : 'Written by'} <span className="text-foreground">{article.author}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          liked 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'bg-muted hover:bg-muted/80'
                        }`}
                      >
                        <HeartIcon className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                        <span>{liked ? (language === 'id' ? 'Disukai' : 'Liked') : (language === 'id' ? 'Suka' : 'Like')}</span>
                      </button>
                      
                      <Button onClick={handleShare} variant="outline" size="sm">
                        <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                        {language === 'id' ? 'Bagikan' : 'Share'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Related Articles Section */}
                {relatedArticles.length > 0 && (
                  <div className="mt-12">
                    <RelatedArticles 
                      articles={relatedArticles.map(relatedArticle => ({
                        ...relatedArticle,
                        title: typeof relatedArticle.title === 'string' ? relatedArticle.title : relatedArticle.title[language],
                        viewCount: getViewCount(relatedArticle.id)
                      }))}
                      maxItems={6}
                      layout="grid"
                    />
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-12">
                  <CommentsSection 
                    articleId={article.id} 
                    totalComments={article.comments}
                  />
                </div>
              </article>
            </main>

            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Share Popup */}
      {article && (
        <SharePopup 
          isOpen={showSharePopup}
          onClose={() => setShowSharePopup(false)}
          title={article.title[language]}
          url={window.location.href}
          image={article.image}
        />
      )}
    </>
  );
}