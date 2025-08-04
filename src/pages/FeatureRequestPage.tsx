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
import { Textarea } from "../components/ui/textarea";
import { 
  HomeIcon,
  LightBulbIcon,
  CheckCircleIcon,
  StarIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

export default function FeatureRequestPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
    useCase: '',
    userStory: '',
    alternatives: '',
    email: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const seoData = {
    title: `${language === 'id' ? 'Saran Fitur' : 'Feature Request'} - CoNime`,
    description: language === 'id' 
      ? 'Ajukan ide fitur baru untuk website CoNime. Bantu kami mengembangkan platform yang lebih baik sesuai kebutuhan komunitas anime Indonesia.'
      : 'Submit new feature ideas for CoNime website. Help us develop a better platform according to Indonesian anime community needs.',
    keywords: language === 'id' 
      ? 'saran fitur, feature request, ide fitur, pengembangan conime'
      : 'feature request, feature ideas, conime development',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/feature-request`
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: '',
        category: '',
        priority: '',
        description: '',
        useCase: '',
        userStory: '',
        alternatives: '',
        email: ''
      });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const categories = [
    { value: 'content', label: language === 'id' ? 'Konten & Artikel' : 'Content & Articles' },
    { value: 'search', label: language === 'id' ? 'Pencarian & Filter' : 'Search & Filters' },
    { value: 'user', label: language === 'id' ? 'Pengalaman Pengguna' : 'User Experience' },
    { value: 'social', label: language === 'id' ? 'Fitur Sosial' : 'Social Features' },
    { value: 'mobile', label: language === 'id' ? 'Mobile App' : 'Mobile App' },
    { value: 'notification', label: language === 'id' ? 'Notifikasi' : 'Notifications' },
    { value: 'personalization', label: language === 'id' ? 'Personalisasi' : 'Personalization' },
    { value: 'other', label: language === 'id' ? 'Lainnya' : 'Other' }
  ];

  const priorities = [
    { value: 'nice-to-have', label: language === 'id' ? 'Nice to Have' : 'Nice to Have' },
    { value: 'useful', label: language === 'id' ? 'Berguna' : 'Useful' },
    { value: 'important', label: language === 'id' ? 'Penting' : 'Important' },
    { value: 'critical', label: language === 'id' ? 'Sangat Dibutuhkan' : 'Highly Needed' }
  ];

  if (isSubmitted) {
    return (
      <>
        <SEOHead {...seoData} />
        
        <div className="min-h-screen bg-background">
          <Header />
        <TimeBar />
          
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6">
                <CheckCircleIcon className="w-full h-full text-green-500" />
              </div>
              
              <h1 className="text-3xl font-bold mb-4 text-green-600">
                {language === 'id' ? 'Saran Berhasil Dikirim!' : 'Suggestion Successfully Submitted!'}
              </h1>
              
              <p className="text-muted-foreground mb-8">
                {language === 'id'
                  ? 'Terima kasih atas ide kreatif Anda! Tim pengembangan kami akan mengevaluasi saran fitur ini untuk versi mendatang CoNime.'
                  : 'Thank you for your creative idea! Our development team will evaluate this feature suggestion for future versions of CoNime.'
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/')} size="lg">
                  {language === 'id' ? 'Kembali ke Beranda' : 'Back to Homepage'}
                </Button>
                <Button variant="outline" size="lg" onClick={() => setIsSubmitted(false)}>
                  {language === 'id' ? 'Ajukan Fitur Lain' : 'Suggest Another Feature'}
                </Button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </>
    );
  }

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
              {language === 'id' ? 'Saran Fitur' : 'Feature Request'}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* Innovation Icon */}
            <div className="w-24 h-24 mx-auto mb-6">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-blue-500"
                fill="none"
              >
                {/* Light Bulb */}
                <circle cx="100" cy="90" r="35" stroke="currentColor" strokeWidth="4" />
                <path d="M 75 110 Q 100 125 125 110" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M 80 125 L 120 125" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M 85 135 L 115 135" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                
                {/* Light Rays */}
                <path d="M 100 30 L 100 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 140 50 L 147 43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 150 90 L 160 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 140 130 L 147 137" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 60 130 L 53 137" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 50 90 L 40 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                <path d="M 60 50 L 53 43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                
                {/* Innovation Symbols */}
                <StarIcon className="w-6 h-6 text-yellow-500 absolute top-8 left-8" />
                <HeartIcon className="w-5 h-5 text-red-500 absolute bottom-8 right-8" />
                
                {/* Inner Glow */}
                <circle cx="100" cy="90" r="25" fill="currentColor" className="opacity-10" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Saran Fitur' : 'Feature Request'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'id'
                ? 'Punya ide fitur keren untuk CoNime? Bagikan visi Anda dan bantu kami membangun platform yang lebih baik!'
                : 'Have a cool feature idea for CoNime? Share your vision and help us build a better platform!'
              }
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <LightBulbIcon className="h-6 w-6 text-blue-500" />
                  <h2 className="text-2xl font-bold">
                    {language === 'id' ? 'Form Saran Fitur' : 'Feature Request Form'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {language === 'id'
                    ? 'Jelaskan ide fitur Anda sedetail mungkin. Semakin spesifik, semakin mudah kami memahami dan mengimplementasikannya.'
                    : 'Explain your feature idea in as much detail as possible. The more specific, the easier for us to understand and implement it.'
                  }
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-2">
                        {language === 'id' ? 'Nama Fitur' : 'Feature Name'} *
                      </label>
                      <Input
                        id="title"
                        name="title"
                        type="text"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder={language === 'id' ? 'Bookmark Artikel, Dark Mode, dll...' : 'Article Bookmarks, Dark Mode, etc...'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Category & Priority */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        {language === 'id' ? 'Kategori' : 'Category'} *
                      </label>
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                      >
                        <option value="">{language === 'id' ? 'Pilih kategori...' : 'Select category...'}</option>
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium mb-2">
                        {language === 'id' ? 'Seberapa Penting?' : 'How Important?'} *
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        required
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md"
                      >
                        <option value="">{language === 'id' ? 'Pilih tingkat kepentingan...' : 'Select importance level...'}</option>
                        {priorities.map((priority) => (
                          <option key={priority.value} value={priority.value}>{priority.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Feature Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      {language === 'id' ? 'Deskripsi Fitur' : 'Feature Description'} *
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={language === 'id' 
                        ? 'Jelaskan fitur yang Anda inginkan secara detail. Apa yang akan dilakukan fitur ini? Bagaimana cara kerjanya?'
                        : 'Explain the feature you want in detail. What will this feature do? How will it work?'
                      }
                    />
                  </div>

                  {/* Use Case */}
                  <div>
                    <label htmlFor="useCase" className="block text-sm font-medium mb-2">
                      {language === 'id' ? 'Kasus Penggunaan' : 'Use Case'} *
                    </label>
                    <Textarea
                      id="useCase"
                      name="useCase"
                      required
                      rows={3}
                      value={formData.useCase}
                      onChange={handleChange}
                      placeholder={language === 'id' 
                        ? 'Kapan dan mengapa Anda akan menggunakan fitur ini? Masalah apa yang diselesaikan oleh fitur ini?'
                        : 'When and why would you use this feature? What problem does this feature solve?'
                      }
                    />
                  </div>

                  {/* User Story */}
                  <div>
                    <label htmlFor="userStory" className="block text-sm font-medium mb-2">
                      {language === 'id' ? 'User Story' : 'User Story'}
                    </label>
                    <Textarea
                      id="userStory"
                      name="userStory"
                      rows={3}
                      value={formData.userStory}
                      onChange={handleChange}
                      placeholder={language === 'id' 
                        ? 'Sebagai [tipe pengguna], saya ingin [fitur] agar saya bisa [manfaat]. Contoh: "Sebagai pembaca anime, saya ingin bookmark artikel agar saya bisa membacanya nanti."'
                        : 'As a [user type], I want [feature] so that I can [benefit]. Example: "As an anime reader, I want to bookmark articles so I can read them later."'
                      }
                    />
                  </div>

                  {/* Alternatives */}
                  <div>
                    <label htmlFor="alternatives" className="block text-sm font-medium mb-2">
                      {language === 'id' ? 'Alternatif Saat Ini' : 'Current Alternatives'}
                    </label>
                    <Textarea
                      id="alternatives"
                      name="alternatives"
                      rows={3}
                      value={formData.alternatives}
                      onChange={handleChange}
                      placeholder={language === 'id' 
                        ? 'Bagaimana Anda saat ini mengatasi masalah ini? Apa keterbatasan dari solusi yang ada?'
                        : 'How do you currently solve this problem? What are the limitations of existing solutions?'
                      }
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate('/contact')}
                      size="lg"
                    >
                      {language === 'id' ? 'Diskusi Langsung' : 'Direct Discussion'}
                    </Button>
                    <Button type="submit" size="lg">
                      {language === 'id' ? 'Kirim Saran' : 'Submit Suggestion'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Popular Requests */}
            <Card className="mt-8">
              <CardHeader>
                <h3 className="text-xl font-bold">
                  {language === 'id' ? 'Fitur yang Sedang Dikembangkan' : 'Features Under Development'}
                </h3>
                <p className="text-muted-foreground">
                  {language === 'id' 
                    ? 'Berikut fitur-fitur yang sedang dalam tahap pengembangan berdasarkan permintaan pengguna'
                    : 'Here are features currently under development based on user requests'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-600">
                      {language === 'id' ? 'Dalam Pengembangan' : 'In Development'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Bookmark Artikel' : 'Article Bookmarks'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Notifikasi Push' : 'Push Notifications'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Mode Offline' : 'Offline Mode'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Sharing ke Social Media' : 'Social Media Sharing'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-600">
                      {language === 'id' ? 'Direncanakan' : 'Planned'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Mobile App' : 'Mobile App'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Komentar Artikel' : 'Article Comments'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{language === 'id' ? 'Rating & Review' : 'Rating & Review'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{language === 'id' ? 'User Profile' : 'User Profile'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="mt-8">
              <CardHeader>
                <h3 className="text-xl font-bold">
                  {language === 'id' ? 'Panduan Saran Fitur yang Baik' : 'Good Feature Suggestion Guidelines'}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">
                      {language === 'id' ? 'Ciri Saran yang Baik' : 'Good Suggestions'}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Menyelesaikan masalah nyata pengguna' : 'Solves real user problems'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Deskripsi jelas dan spesifik' : 'Clear and specific description'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Relevan dengan konten anime/manga' : 'Relevant to anime/manga content'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Bermanfaat untuk banyak pengguna' : 'Beneficial for many users'}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-amber-600">
                      {language === 'id' ? 'Tips Tambahan' : 'Additional Tips'}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start space-x-2">
                        <LightBulbIcon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Berikan contoh konkret penggunaan' : 'Provide concrete usage examples'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <LightBulbIcon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Jelaskan manfaat untuk komunitas' : 'Explain benefits for community'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <LightBulbIcon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Pertimbangkan kemudahan implementasi' : 'Consider implementation feasibility'}</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <LightBulbIcon className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        <span>{language === 'id' ? 'Sertakan referensi dari platform lain' : 'Include references from other platforms'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}