import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Sidebar } from "../components/Sidebar";
import { Footer } from "../components/Footer";
import { NewsCard } from "../components/NewsCard";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Button } from "../components/ui/button";
import { TagIcon, HomeIcon } from "@heroicons/react/24/outline";
import { getAllArticles } from "../data/mockData";

interface TagPageProps {
  tag: string;
}

export default function TagPage({ tag }: TagPageProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  // Decode tag dari URL
  const decodedTag = decodeURIComponent(tag);

  // Get all articles
  const allArticles = getAllArticles();

  // Filter artikel berdasarkan tag
  const taggedArticles = allArticles.filter(article => 
    article.tags && article.tags.some(articleTag => 
      articleTag.toLowerCase().replace(/\s+/g, '-') === decodedTag.toLowerCase() ||
      articleTag.toLowerCase() === decodedTag.toLowerCase()
    )
  ).map(article => ({
    ...article,
    id: parseInt(article.id.replace(/[^0-9]/g, '')) || 1,
    likes: Math.floor(Math.random() * 500) + 50,
    comments: Math.floor(Math.random() * 100) + 5,
    shares: Math.floor(Math.random() * 150) + 10,
    reads: Math.floor(Math.random() * 1000) + 100
  }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, [tag]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const seoData = {
    title: `${language === 'id' ? 'Artikel dengan Tag' : 'Articles with Tag'} "${decodedTag}" - Conime`,
    description: language === 'id' 
      ? `Kumpulan artikel terkait ${decodedTag}. Temukan berita, ulasan, dan rekomendasi terbaru seputar ${decodedTag} di Conime.`
      : `Collection of articles related to ${decodedTag}. Find the latest news, reviews, and recommendations about ${decodedTag} on Conime.`,
    keywords: `${decodedTag}, ${language === 'id' ? 'artikel, berita, ulasan' : 'articles, news, reviews'}`,
    url: `https://conime.id${language === 'en' ? '/en' : ''}/tag/${tag}`,
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <main className="flex-1 min-w-0" role="main">
              {/* Breadcrumb */}
              <nav className="flex items-center text-sm text-muted-foreground mb-6 border-b border-border pb-2">
                <button onClick={() => navigate('/')} className="flex items-center space-x-1 px-2 py-1 hover:text-primary transition-colors">
                  <HomeIcon className="h-4 w-4" />
                  <span>{language === 'id' ? 'Beranda' : 'Home'}</span>
                </button>
                <span className="mx-1">/</span>
                <span className="px-2 py-1 text-primary border-b-2 border-primary font-medium">{language === 'id' ? 'Tag' : 'Tag'}</span>
                <span className="mx-1">/</span>
                <span className="text-foreground font-medium px-2 py-1">#{decodedTag}</span>
              </nav>

              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                    <TagIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      #{decodedTag}
                    </h1>
                    <p className="text-muted-foreground">
                      {taggedArticles.length} {language === 'id' ? 'artikel ditemukan' : 'articles found'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button onClick={() => navigate('/')} variant="outline" size="sm">
                    <HomeIcon className="h-4 w-4 mr-2" />
                    {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    {language === 'id' ? 'Menampilkan semua artikel dengan tag ini' : 'Showing all articles with this tag'}
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              {taggedArticles.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                  {taggedArticles.map((article) => (
                    <NewsCard
                      key={article.id}
                      title={article.title[language]}
                      excerpt={article.excerpt?.[language] || article.summary?.[language] || ''}
                      category={article.category}
                      author={article.author}
                      date={article.date}
                      image={article.image}
                      comments={article.comments}
                      likes={article.likes}
                      shares={article.shares}
                      reads={article.reads}
                      layout="grid"
                      onReadMore={() => navigate(`/${article.category}/${article.slug}`)}
                      onShare={() => console.log('Share', article.id)}
                      onLike={() => console.log('Like', article.id)}
                      onComment={() => navigate(`/${article.category}/${article.slug}#comment`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="flex justify-center mb-4">
                    <TagIcon className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">
                    {language === 'id' ? 'Tidak Ada Artikel' : 'No Articles Found'}
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {language === 'id' 
                      ? `Belum ada artikel dengan tag "${decodedTag}". Coba tag lain atau kembali ke beranda untuk melihat artikel terbaru.`
                      : `No articles found with tag "${decodedTag}". Try other tags or return to homepage to see latest articles.`
                    }
                  </p>
                  <div className="space-x-4">
                    <Button onClick={() => navigate('/')} variant="default">
                      <HomeIcon className="h-4 w-4 mr-2" />
                      {language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Related Tags */}
              {taggedArticles.length > 0 && (
                <div className="mt-12 p-6 bg-card rounded-xl border">
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'id' ? 'Tag Terkait' : 'Related Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(
                      taggedArticles
                        .flatMap(article => article.tags || [])
                        .filter(t => t.toLowerCase() !== decodedTag.toLowerCase())
                    )).slice(0, 10).map((relatedTag, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(`/tag/${encodeURIComponent(relatedTag.toLowerCase().replace(/\s+/g, '-'))}`)}
                        className="px-3 py-1.5 text-sm bg-muted hover:bg-primary hover:text-white transition-colors rounded-lg font-light border border-border hover:border-primary group"
                      >
                        <span className="text-primary group-hover:text-white">#</span>{relatedTag.toLowerCase().replace(/\s+/g, '-')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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