import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Button } from "../components/ui/button";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFoundPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'} - Conime`,
    description: language === 'id' 
      ? 'Halaman yang Anda cari tidak ditemukan. Kembali ke beranda untuk menjelajahi konten anime terbaru.'
      : 'The page you are looking for was not found. Return to homepage to explore the latest anime content.',
    keywords: language === 'id' 
      ? '404, halaman tidak ditemukan, error, conime'
      : '404, page not found, error, conime',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/404`
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <TimeBar />
        
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md">
            {/* Sad Robot Illustration */}
            <div className="w-24 h-24 mx-auto mb-6">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-muted-foreground"
                fill="currentColor"
              >
                {/* Robot Body */}
                <rect x="60" y="80" width="80" height="90" rx="10" className="fill-gray-300 dark:fill-gray-600" />
                
                {/* Robot Head */}
                <rect x="70" y="40" width="60" height="50" rx="8" className="fill-gray-400 dark:fill-gray-500" />
                
                {/* Antenna */}
                <line x1="100" y1="40" x2="100" y2="25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <circle cx="100" cy="20" r="4" className="fill-red-500" />
                
                {/* Sad Eyes */}
                <circle cx="85" cy="55" r="3" className="fill-gray-600 dark:fill-gray-300" />
                <circle cx="115" cy="55" r="3" className="fill-gray-600 dark:fill-gray-300" />
                
                {/* Sad eyebrows */}
                <path d="M 80 50 Q 85 48 90 50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M 110 50 Q 115 48 120 50" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                
                {/* Sad Mouth */}
                <path d="M 90 70 Q 100 65 110 70" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                
                {/* Robot Arms */}
                <rect x="40" y="95" width="15" height="40" rx="7" className="fill-gray-400 dark:fill-gray-500" />
                <rect x="145" y="95" width="15" height="40" rx="7" className="fill-gray-400 dark:fill-gray-500" />
                
                {/* Robot Legs */}
                <rect x="75" y="170" width="15" height="25" rx="7" className="fill-gray-400 dark:fill-gray-500" />
                <rect x="110" y="170" width="15" height="25" rx="7" className="fill-gray-400 dark:fill-gray-500" />
                
                {/* Body Details */}
                <circle cx="85" cy="105" r="3" className="fill-blue-500" />
                <circle cx="115" cy="105" r="3" className="fill-green-500" />
                <rect x="90" y="120" width="20" height="4" rx="2" className="fill-gray-500" />
                <rect x="90" y="130" width="20" height="4" rx="2" className="fill-gray-500" />
                
                {/* Tear Drop */}
                <ellipse cx="120" cy="75" rx="2" ry="6" className="fill-blue-400 opacity-60" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Halaman Tidak Ditemukan' : 'Page Not Found'}
            </h1>
            
            <p className="text-muted-foreground mb-8 text-lg">
              {language === 'id'
                ? 'Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan. Robot kami juga sedih karena tidak bisa membantu menemukan halaman ini.'
                : 'It seems the page you are looking for does not exist or has been moved. Our robot is also sad because it cannot help find this page.'
              }
            </p>
            
            <div className="space-y-4">
              <Button onClick={() => navigate('/')} size="lg" className="w-full">
                <HomeIcon className="h-5 w-5 mr-2" />
                {language === 'id' ? 'Kembali ke Beranda' : 'Back to Homepage'}
              </Button>
              
              <Button 
                onClick={() => window.history.back()} 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                {language === 'id' ? 'Kembali ke Halaman Sebelumnya' : 'Go Back to Previous Page'}
              </Button>
            </div>
            
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-2">
                {language === 'id' ? 'Mungkin Anda mencari:' : 'Maybe you are looking for:'}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/anime')}
                >
                  Anime
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/berita')}
                >
                  {language === 'id' ? 'Berita' : 'News'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/ulasan')}
                >
                  {language === 'id' ? 'Ulasan' : 'Reviews'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => navigate('/contact')}
                >
                  {language === 'id' ? 'Kontak' : 'Contact'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}