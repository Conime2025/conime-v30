import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { useRouter } from "../components/Router";
import { 
  HomeIcon,
  CpuChipIcon,
  UserIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  CheckCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Tentang Kami' : 'About Us'} - CoNime`,
    description: language === 'id' 
      ? 'Pelajari lebih lanjut tentang CoNime, portal berita budaya pop visual yang menyajikan konten anime, manga, manhwa, donghua dari berbagai negara dengan teknologi AI.'
      : 'Learn more about CoNime, visual pop culture news portal presenting anime, manga, manhwa, donghua content from various countries with AI technology.',
    keywords: language === 'id' 
      ? 'tentang conime, about us, portal anime, berita anime, budaya pop, AI content'
      : 'about conime, about us, anime portal, anime news, pop culture, AI content',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/about`
  };

  const coverage = [
    {
      icon: StarIcon,
      country: language === 'id' ? "Jepang" : "Japan",
      content: language === 'id' 
        ? ["Anime TV & Film", "Manga & Light Novel", "J-Pop & Voice Actor", "Gaming & Merchandise"]
        : ["Anime TV & Film", "Manga & Light Novel", "J-Pop & Voice Actor", "Gaming & Merchandise"]
    },
    {
      icon: HeartIcon,
      country: language === 'id' ? "Korea" : "Korea", 
      content: language === 'id'
        ? ["K-Drama & Film", "Manhwa & Webtoon", "K-Pop Culture", "Korean Games"]
        : ["K-Drama & Film", "Manhwa & Webtoon", "K-Pop Culture", "Korean Games"]
    },
    {
      icon: StarIcon,
      country: language === 'id' ? "China" : "China",
      content: language === 'id'
        ? ["Donghua (Animasi China)", "Manhua & Novel", "C-Drama & Film", "Mobile Games"]
        : ["Donghua (Chinese Animation)", "Manhua & Novel", "C-Drama & Film", "Mobile Games"]
    },
    {
      icon: MapPinIcon,
      country: "Indonesia",
      content: language === 'id'
        ? ["Film Animasi Lokal", "Komik & Webtoon", "Game Developer", "Content Creator"]
        : ["Local Animation Films", "Comics & Webtoons", "Game Developers", "Content Creators"]
    }
  ];

  const values = [
    {
      icon: ShieldCheckIcon,
      title: language === 'id' ? 'Akurasi Informasi' : 'Information Accuracy',
      description: language === 'id'
        ? 'Verifikasi fakta dari sumber terpercaya dengan supervisi editor manusia.'
        : 'Fact verification from trusted sources with human editor supervision.'
    },
    {
      icon: CpuChipIcon,
      title: language === 'id' ? 'Teknologi AI' : 'AI Technology',
      description: language === 'id'
        ? 'Menggunakan AI secara bertanggung jawab untuk efisiensi produksi konten.'
        : 'Using AI responsibly for content production efficiency.'
    },
    {
      icon: GlobeAltIcon,
      title: language === 'id' ? 'Perspektif Global' : 'Global Perspective',
      description: language === 'id'
        ? 'Menyajikan budaya pop dari berbagai negara dengan insight lokal Indonesia.'
        : 'Presenting pop culture from various countries with Indonesian local insights.'
    },
    {
      icon: HeartIcon,
      title: language === 'id' ? 'Komunitas Positif' : 'Positive Community',
      description: language === 'id'
        ? 'Membangun diskusi yang sehat dan konstruktif di antara penggemar.'
        : 'Building healthy and constructive discussions among fans.'
    }
  ];

  const timeline = [
    {
      date: "2025-06-03",
      version: "1.0",
      title: language === 'id' ? 'GitHub Pages' : 'GitHub Pages',
      description: language === 'id' ? 'Awal CoNime sebagai GitHub Pages' : 'CoNime started as GitHub Pages'
    },
    {
      date: "2025-06-29",
      version: "2.0",
      title: language === 'id' ? 'Domain Launch' : 'Domain Launch',
      description: language === 'id' ? 'Launch resmi domain conime.id' : 'Official launch of conime.id domain'
    },
    {
      date: "2025-07",
      version: "3.0",
      title: language === 'id' ? 'Platform V3' : 'Platform V3',
      description: language === 'id' ? 'Pengembangan CoNime v3.0 (dalam proses)' : 'CoNime v3.0 development (in progress)'
    }
  ];

  return (
    <>
      <SEOHead {...seoData} />
      
      <div className="min-h-screen bg-background">
        <Header />
        <TimeBar />
        
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate('/')} className="flex items-center space-x-1 hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4" /> 
            </button>
            <span>/</span>
            <span className="text-foreground font-medium">
              {language === 'id' ? 'Tentang Kami' : 'About Us'}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Tentang CoNime' : 'About CoNime'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'CoNime adalah portal berita daring yang menyajikan informasi dan ulasan seputar karya budaya pop visual dari berbagai negara, termasuk Jepang, Korea, China, Barat, serta karya orisinal Indonesia.'
                : 'CoNime is an online news portal that presents information and reviews about visual pop culture works from various countries, including Japan, Korea, China, the West, and original Indonesian works.'
              }
            </p>
          </div>

          {/* Main Description */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
              {language === 'id' ? (
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    <strong>CoNime adalah portal berita daring</strong> yang menyajikan informasi dan ulasan seputar 
                    karya budaya pop visual dari berbagai negara, termasuk <strong>Jepang (anime, manga)</strong>, 
                    <strong>Korea (manhwa, K-drama)</strong>, <strong>China (donghua)</strong>, <strong>Barat (film & game)</strong>, 
                    serta karya orisinal dari <strong>Indonesia</strong> seperti webtoon, film animasi, dan komik lokal.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Kami menghadirkan berita terkini, review episode, rekomendasi, dan opini menarik yang 
                    dikurasi untuk pembaca Indonesia. Seluruh konten kami ditulis secara kolaboratif 
                    menggunakan bantuan AI (seperti ChatGPT), kemudian disunting oleh editor manusia untuk 
                    memastikan kualitas dan orisinalitas.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-lg leading-relaxed">
                    <strong>CoNime is an online news portal</strong> that presents information and reviews about 
                    visual pop culture works from various countries, including <strong>Japan (anime, manga)</strong>, 
                    <strong>Korea (manhwa, K-drama)</strong>, <strong>China (donghua)</strong>, <strong>Western (films & games)</strong>, 
                    as well as original works from <strong>Indonesia</strong> such as webtoons, animated films, and local comics.
                  </p>
                  <p className="text-lg leading-relaxed">
                    We present the latest news, episode reviews, recommendations, and interesting opinions 
                    curated for Indonesian readers. All our content is written collaboratively using AI 
                    assistance (such as ChatGPT), then edited by human editors to ensure quality and originality.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Company Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Perjalanan CoNime' : 'CoNime Journey'}
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary to-primary/20 h-full"></div>
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                        <div className="bg-card border rounded-lg p-6 shadow-sm">
                          <div className="flex items-center space-x-2 mb-2">
                            <CalendarIcon className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">{item.date}</span>
                          </div>
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{item.description}</p>
                          <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            v{item.version}
                          </div>
                        </div>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="relative flex items-center justify-center w-4 h-4 bg-primary rounded-full border-4 border-background z-10">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      <div className="w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Visi & Misi' : 'Vision & Mission'}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {language === 'id' ? 'Visi' : 'Vision'}
                </h3>
                <p className="text-lg leading-relaxed">
                  {language === 'id'
                    ? 'Menjadi portal budaya pop visual terpercaya yang menghubungkan Indonesia dengan dunia hiburan global, khususnya Asia Timur.'
                    : 'To become a trusted visual pop culture portal that connects Indonesia with the global entertainment world, especially East Asia.'
                  }
                </p>
              </div>
              <div className="bg-secondary/5 rounded-xl p-8 border border-secondary/20">
                <h3 className="text-2xl font-bold mb-4 text-secondary-foreground">
                  {language === 'id' ? 'Misi' : 'Mission'}
                </h3>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{language === 'id' ? 'Menyajikan informasi berkualitas tentang budaya pop Asia' : 'Presenting quality information about Asian pop culture'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{language === 'id' ? 'Mendukung karya kreatif Indonesia di kancah internasional' : 'Supporting Indonesian creative works on the international stage'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{language === 'id' ? 'Membangun komunitas penggemar yang informed dan positif' : 'Building an informed and positive fan community'}</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{language === 'id' ? 'Menggunakan teknologi AI secara bertanggung jawab' : 'Using AI technology responsibly'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Content Coverage */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Cakupan Konten' : 'Content Coverage'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coverage.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{item.country}</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {item.content.map((content, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></span>
                            <span>{content}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* AI & Editorial */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Teknologi & Editorial' : 'Technology & Editorial'}
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-8 border border-blue-200 dark:border-blue-800 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <CpuChipIcon className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {language === 'id' ? 'Kolaborasi AI & Editor Manusia' : 'AI & Human Editor Collaboration'}
                </h3>
              </div>
              <p className="text-blue-800 dark:text-blue-200 mb-6 text-center max-w-3xl mx-auto">
                {language === 'id'
                  ? 'CoNime menggunakan teknologi AI untuk meningkatkan efisiensi produksi konten, namun tetap mempertahankan standar editorial yang ketat melalui supervisi manusia.'
                  : 'CoNime uses AI technology to improve content production efficiency, while maintaining strict editorial standards through human supervision.'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-bold mb-4 text-blue-900 dark:text-blue-100">
                    {language === 'id' ? 'AI Membantu:' : 'AI Assists:'}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Riset informasi awal' : 'Initial information research'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Draft artikel struktur' : 'Article structure drafting'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Optimasi SEO' : 'SEO optimization'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Terjemahan konten' : 'Content translation'}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-bold mb-4 text-blue-900 dark:text-blue-100">
                    {language === 'id' ? 'Editor Memastikan:' : 'Editors Ensure:'}
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Akurasi informasi' : 'Information accuracy'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Kualitas penulisan' : 'Writing quality'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Originalitas konten' : 'Content originality'}</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{language === 'id' ? 'Standar editorial' : 'Editorial standards'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Nilai-Nilai Kami' : 'Our Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{value.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Contact Section - Simplified */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Kontak & Kerjasama' : 'Contact & Collaboration'}
            </h2>
            <div className="bg-gray-50 dark:bg-gray-900/20 rounded-xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <p className="text-center mb-8 text-lg">
                {language === 'id'
                  ? 'Jika Anda memiliki saran, kritik, atau ingin menjalin kerja sama, silakan hubungi kami:'
                  : 'If you have suggestions, criticism, or want to establish cooperation, please contact us:'
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-4 text-lg flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-primary" />
                    <span>{language === 'id' ? 'Kontak Resmi' : 'Official Contact'}</span>
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <EnvelopeIcon className="h-5 w-5 text-primary" />
                      <a href="mailto:conime2025@gmail.com" className="text-primary hover:underline">conime2025@gmail.com</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <DevicePhoneMobileIcon className="h-5 w-5 text-primary" />
                      <a href="tel:+6281231958808" className="text-primary hover:underline">+62 812-3195-8808</a>
                    </li>
                    <li className="flex items-center space-x-3">
                      <MapPinIcon className="h-5 w-5 text-primary" />
                      <span>Indonesia</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-lg flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-5 w-5 text-primary" />
                    <span>{language === 'id' ? 'Kerjasama' : 'Collaboration'}</span>
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Partnership & Sponsorship</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Content Collaboration</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Event Coverage</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Press Release</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Commitment */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              {language === 'id' ? 'Komitmen CoNime' : 'CoNime Commitment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>{language === 'id' ? 'Akurasi Informasi:' : 'Information Accuracy:'}</strong> {language === 'id' ? 'Verifikasi fakta dari sumber terpercaya' : 'Fact verification from trusted sources'}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>{language === 'id' ? 'Konten Berkualitas:' : 'Quality Content:'}</strong> {language === 'id' ? 'Editorial yang ketat dan standar tinggi' : 'Strict editorial and high standards'}</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>{language === 'id' ? 'Transparansi:' : 'Transparency:'}</strong> {language === 'id' ? 'Jelas tentang penggunaan AI dalam produksi' : 'Clear about AI usage in production'}</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span><strong>{language === 'id' ? 'Komunitas Positif:' : 'Positive Community:'}</strong> {language === 'id' ? 'Membangun diskusi yang sehat dan konstruktif' : 'Building healthy and constructive discussions'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}