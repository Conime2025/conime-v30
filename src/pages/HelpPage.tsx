import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { 
  HomeIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";

export default function HelpPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const seoData = {
    title: `${language === 'id' ? 'Pusat Bantuan' : 'Help Center'} - Conime`,
    description: language === 'id' 
      ? 'Pusat bantuan Conime dengan FAQ, panduan penggunaan, dan dukungan teknis untuk pengalaman terbaik di portal anime kami.'
      : 'Conime help center with FAQ, usage guides, and technical support for the best experience on our anime portal.',
    keywords: language === 'id' 
      ? 'help center, FAQ, bantuan, dukungan, panduan, conime'
      : 'help center, FAQ, support, help, guide, conime',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/help`
  };

  const faqData = [
    {
      id: 1,
      question: language === 'id' ? 'Bagaimana cara berlangganan newsletter?' : 'How to subscribe to newsletter?',
      answer: language === 'id' 
        ? 'Anda bisa berlangganan newsletter dengan mengisi email di bagian footer website atau di halaman kontak. Newsletter akan dikirim setiap minggu dengan update berita anime terbaru.'
        : 'You can subscribe to newsletter by filling your email in the footer section or contact page. Newsletter will be sent weekly with latest anime news updates.',
      category: 'newsletter'
    },
    {
      id: 2,
      question: language === 'id' ? 'Bagaimana cara mengirim tips berita?' : 'How to send news tips?',
      answer: language === 'id'
        ? 'Kirim tips berita ke email tips@conime.com dengan menyertakan sumber yang jelas dan kredibel. Tim kami akan review dan memverifikasi informasi sebelum dipublikasi.'
        : 'Send news tips to tips@conime.com with clear and credible sources. Our team will review and verify information before publication.',
      category: 'content'
    },
    {
      id: 3,
      question: language === 'id' ? 'Apakah bisa request review anime tertentu?' : 'Can I request specific anime reviews?',
      answer: language === 'id'
        ? 'Ya! Kirim request review melalui halaman kontak atau email request@conime.com. Sertakan judul anime dan alasan mengapa anime tersebut menarik untuk di-review.'
        : 'Yes! Send review requests via contact page or email request@conime.com. Include anime title and reasons why the anime is interesting to review.',
      category: 'content'
    },
    {
      id: 4,
      question: language === 'id' ? 'Bagaimana kebijakan komentar di website?' : 'What is the comment policy on the website?',
      answer: language === 'id'
        ? 'Komentar harus konstruktif dan tidak mengandung SARA, spam, atau konten tidak pantas. Moderasi dilakukan secara berkala dan komentar yang melanggar akan dihapus.'
        : 'Comments must be constructive and not contain hate speech, spam, or inappropriate content. Moderation is done regularly and violating comments will be removed.',
      category: 'policy'
    },
    {
      id: 5,
      question: language === 'id' ? 'Bagaimana cara berkolaborasi dengan Conime?' : 'How to collaborate with Conime?',
      answer: language === 'id'
        ? 'Untuk kerjasama partnership, sponsor, atau kolaborasi konten, hubungi kami di partnership@conime.com dengan proposal yang detail termasuk bentuk kolaborasi yang diinginkan.'
        : 'For partnership, sponsorship, or content collaboration, contact us at partnership@conime.com with detailed proposal including desired collaboration form.',
      category: 'partnership'
    },
    {
      id: 6,
      question: language === 'id' ? 'Website lambat atau error, apa yang harus dilakukan?' : 'Website is slow or has errors, what should I do?',
      answer: language === 'id'
        ? 'Coba refresh halaman atau clear cache browser. Jika masalah berlanjut, laporkan ke support@conime.com dengan detail browser yang digunakan dan screenshot error.'
        : 'Try refreshing the page or clearing browser cache. If problem persists, report to support@conime.com with browser details and error screenshots.',
      category: 'technical'
    },
    {
      id: 7,
      question: language === 'id' ? 'Apakah konten Conime gratis?' : 'Is Conime content free?',
      answer: language === 'id'
        ? 'Ya, semua konten di Conime gratis untuk dibaca. Kami didukung oleh iklan dan partnership yang tidak mengganggu pengalaman membaca pengguna.'
        : 'Yes, all content on Conime is free to read. We are supported by advertisements and partnerships that do not interfere with user reading experience.',
      category: 'general'
    },
    {
      id: 8,
      question: language === 'id' ? 'Bagaimana cara menggunakan fitur pencarian?' : 'How to use the search feature?',
      answer: language === 'id'
        ? 'Gunakan kotak pencarian di bagian atas halaman atau di halaman kategori. Anda bisa mencari berdasarkan judul artikel, nama anime, atau kata kunci tertentu.'
        : 'Use the search box at the top of the page or on category pages. You can search by article title, anime name, or specific keywords.',
      category: 'features'
    }
  ];

  const helpCategories = [
    {
      title: language === 'id' ? 'Pertanyaan Umum (FAQ)' : 'General Questions (FAQ)',
      icon: QuestionMarkCircleIcon,
      description: language === 'id' 
        ? 'Pertanyaan yang sering ditanyakan pengguna'
        : 'Frequently asked questions by users',
      link: '/faq'
    },
    {
      title: language === 'id' ? 'Lapor Bug' : 'Report Bug',
      icon: ExclamationTriangleIcon,
      description: language === 'id'
        ? 'Laporkan masalah teknis atau bug di website'
        : 'Report technical issues or bugs on website',
      link: '/bug-report'
    },
    {
      title: language === 'id' ? 'Saran Fitur' : 'Feature Request',
      icon: DocumentTextIcon,
      description: language === 'id'
        ? 'Ajukan ide fitur baru untuk CoNime'
        : 'Suggest new features for CoNime',
      link: '/feature-request'
    },
    {
      title: language === 'id' ? 'Hubungi Kami' : 'Contact Us',
      icon: ChatBubbleLeftRightIcon,
      description: language === 'id'
        ? 'Kontak langsung dengan tim support'
        : 'Direct contact with support team',
      link: '/contact'
    }
  ];

  const filteredFaq = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {language === 'id' ? 'Pusat Bantuan' : 'Help Center'}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Pusat Bantuan' : 'Help Center'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {language === 'id'
                ? 'Temukan jawaban untuk pertanyaan Anda atau hubungi tim support kami untuk bantuan lebih lanjut'
                : 'Find answers to your questions or contact our support team for further assistance'
              }
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={language === 'id' ? 'Cari bantuan...' : 'Search help...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Help Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {language === 'id' ? 'Kategori Bantuan' : 'Help Categories'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{category.title}</h3>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(category.link)}
                      >
                        {language === 'id' ? 'Lihat Detail' : 'View Details'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {language === 'id' ? 'Pertanyaan yang Sering Ditanyakan' : 'Frequently Asked Questions'}
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredFaq.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    {language === 'id' 
                      ? 'Tidak ada FAQ yang cocok dengan pencarian Anda.'
                      : 'No FAQ matches your search.'
                    }
                  </p>
                </div>
              ) : (
                filteredFaq.map((faq) => (
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
                ))
              )}
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 text-center">
            <CheckCircleIcon className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              {language === 'id' ? 'Masih Butuh Bantuan?' : 'Still Need Help?'}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'id'
                ? 'Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi tim support kami. Kami siap membantu 24/7!'
                : 'If you can\'t find the answer you\'re looking for, don\'t hesitate to contact our support team. We\'re ready to help 24/7!'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/contact')} size="lg">
                {language === 'id' ? 'Hubungi Support' : 'Contact Support'}
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/faq')}>
                {language === 'id' ? 'Lihat FAQ' : 'View FAQ'}
              </Button>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
}