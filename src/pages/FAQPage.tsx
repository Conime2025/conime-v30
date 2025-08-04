import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  LightBulbIcon
} from "@heroicons/react/24/outline";

export default function FAQPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const seoData = {
    title: `${language === 'id' ? 'FAQ - Pertanyaan yang Sering Ditanyakan' : 'FAQ - Frequently Asked Questions'} - CoNime`,
    description: language === 'id' 
      ? 'Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang CoNime, konten anime, cara penggunaan website, dan layanan yang tersedia.'
      : 'Find answers to frequently asked questions about CoNime, anime content, website usage, and available services.',
    keywords: language === 'id' 
      ? 'FAQ, pertanyaan, jawaban, bantuan, conime, anime'
      : 'FAQ, questions, answers, help, conime, anime',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/faq`
  };

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: language === 'id' ? 'Apa itu CoNime?' : 'What is CoNime?',
      answer: language === 'id' 
        ? 'CoNime adalah portal berita daring yang menyajikan informasi dan ulasan seputar karya budaya pop visual dari berbagai negara, termasuk anime, manga, manhwa, donghua, dan karya Indonesia.'
        : 'CoNime is an online news portal that presents information and reviews about visual pop culture works from various countries, including anime, manga, manhwa, donghua, and Indonesian works.'
    },
    {
      id: 2,
      category: 'content',
      question: language === 'id' ? 'Apakah konten CoNime menggunakan AI?' : 'Does CoNime content use AI?',
      answer: language === 'id'
        ? 'Ya, kami menggunakan teknologi AI untuk membantu produksi konten, namun semua artikel diperiksa dan disunting oleh editor manusia untuk memastikan kualitas dan akurasi.'
        : 'Yes, we use AI technology to assist in content production, but all articles are reviewed and edited by human editors to ensure quality and accuracy.'
    },
    {
      id: 3,
      category: 'usage',
      question: language === 'id' ? 'Apakah website ini gratis?' : 'Is this website free?',
      answer: language === 'id'
        ? 'Ya, semua konten di CoNime dapat diakses secara gratis. Kami tidak memungut biaya apapun untuk membaca artikel atau menggunakan fitur website.'
        : 'Yes, all content on CoNime can be accessed for free. We do not charge any fees for reading articles or using website features.'
    },
    {
      id: 4,
      category: 'content',
      question: language === 'id' ? 'Bagaimana cara request review anime?' : 'How to request anime reviews?',
      answer: language === 'id'
        ? 'Anda dapat mengirim request review melalui halaman kontak atau email kami di conime2025@gmail.com dengan menyebutkan judul anime yang ingin direview.'
        : 'You can send review requests via our contact page or email us at conime2025@gmail.com mentioning the anime title you want reviewed.'
    },
    {
      id: 5,
      category: 'technical',
      question: language === 'id' ? 'Website lambat atau error, apa yang harus dilakukan?' : 'Website is slow or has errors, what should I do?',
      answer: language === 'id'
        ? 'Coba refresh halaman atau clear cache browser Anda. Jika masalah berlanjut, laporkan ke kami melalui halaman kontak dengan detail browser dan screenshot error.'
        : 'Try refreshing the page or clearing your browser cache. If the problem persists, report it to us via the contact page with browser details and error screenshots.'
    },
    {
      id: 6,
      category: 'general',
      question: language === 'id' ? 'Bagaimana cara berlangganan update?' : 'How to subscribe to updates?',
      answer: language === 'id'
        ? 'Saat ini kami belum memiliki sistem newsletter, namun Anda dapat mengikuti kami di media sosial atau bookmark website untuk mendapat update terbaru.'
        : 'We currently do not have a newsletter system, but you can follow us on social media or bookmark our website for the latest updates.'
    },
    {
      id: 7,
      category: 'content',
      question: language === 'id' ? 'Bisakah saya kirim tips berita?' : 'Can I send news tips?',
      answer: language === 'id'
        ? 'Tentu! Kirim tips berita ke conime2025@gmail.com dengan sumber yang jelas dan kredibel. Tim kami akan verifikasi sebelum dipublikasi.'
        : 'Of course! Send news tips to conime2025@gmail.com with clear and credible sources. Our team will verify before publication.'
    },
    {
      id: 8,
      category: 'partnership',
      question: language === 'id' ? 'Bagaimana cara berkolaborasi dengan CoNime?' : 'How to collaborate with CoNime?',
      answer: language === 'id'
        ? 'Untuk kerjasama partnership, sponsorship, atau kolaborasi konten, hubungi kami di conime2025@gmail.com dengan proposal yang detail.'
        : 'For partnership, sponsorship, or content collaboration, contact us at conime2025@gmail.com with a detailed proposal.'
    }
  ];

  const categories = [
    { key: 'all', label: language === 'id' ? 'Semua' : 'All' },
    { key: 'general', label: language === 'id' ? 'Umum' : 'General' },
    { key: 'content', label: language === 'id' ? 'Konten' : 'Content' },
    { key: 'technical', label: language === 'id' ? 'Teknis' : 'Technical' },
    { key: 'partnership', label: language === 'id' ? 'Kerjasama' : 'Partnership' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFaq = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

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
              FAQ
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* FAQ Illustration */}
            <div className="w-24 h-24 mx-auto mb-6">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-primary"
                fill="none"
              >
                {/* Question Mark Circle */}
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="8" className="opacity-20" />
                <circle cx="100" cy="100" r="60" fill="currentColor" className="opacity-10" />
                
                {/* Question Mark */}
                <path 
                  d="M 75 75 Q 75 55 100 55 Q 125 55 125 75 Q 125 85 110 95 L 105 105"
                  stroke="currentColor" 
                  strokeWidth="6" 
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="105" cy="125" r="4" fill="currentColor" />
                
                {/* Decorative elements */}
                <LightBulbIcon className="w-6 h-6 text-yellow-500 absolute top-2 right-8" />
                <QuestionMarkCircleIcon className="w-4 h-4 text-blue-500 absolute bottom-4 left-6" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Pertanyaan yang Sering Ditanyakan' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'id'
                ? 'Temukan jawaban untuk pertanyaan umum tentang CoNime, konten, dan layanan kami'
                : 'Find answers to common questions about CoNime, content, and our services'
              }
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-8">
            {/* Search */}
            <div className="relative mb-6">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={language === 'id' ? 'Cari pertanyaan...' : 'Search questions...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto">
            {filteredFaq.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
                  <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
                    <circle cx="100" cy="100" r="80" className="opacity-20" />
                    <text x="100" y="110" textAnchor="middle" className="text-4xl">?</text>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'id' ? 'Tidak Ada Hasil' : 'No Results'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'id' 
                    ? 'Tidak ada FAQ yang cocok dengan pencarian Anda.'
                    : 'No FAQ matches your search criteria.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaq.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left hover:bg-muted/50 transition-colors flex items-center justify-between"
                    >
                      <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                      {expandedFaq === faq.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <CardContent className="pt-0 pb-6">
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="max-w-4xl mx-auto mt-16 text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'id' ? 'Masih Ada Pertanyaan?' : 'Still Have Questions?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'id'
                ? 'Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi kami langsung.'
                : 'If you cannot find the answer you are looking for, do not hesitate to contact us directly.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} size="lg">
                {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/help')}>
                {language === 'id' ? 'Pusat Bantuan' : 'Help Center'}
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}