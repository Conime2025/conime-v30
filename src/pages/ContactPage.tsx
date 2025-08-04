import { useState } from "react";
import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { useRouter } from "../components/Router";
import { 
  HomeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

export default function ContactPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const seoData = {
    title: `${language === 'id' ? 'Hubungi Kami' : 'Contact Us'} - Conime`,
    description: language === 'id' 
      ? 'Hubungi tim Conime untuk pertanyaan, saran, kerjasama, atau feedback. Kami selalu siap membantu dan mendengar dari komunitas anime Indonesia.'
      : 'Contact Conime team for questions, suggestions, collaborations, or feedback. We are always ready to help and hear from the Indonesian anime community.',
    keywords: language === 'id' 
      ? 'kontak conime, hubungi kami, email conime, kerjasama, partnership'
      : 'contact conime, contact us, conime email, collaboration, partnership',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/contact`
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert(language === 'id' 
      ? 'Pesan Anda telah dikirim! Kami akan membalas dalam 1-2 hari kerja.'
      : 'Your message has been sent! We will reply within 1-2 business days.'
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "conime2025@gmail.com",
      description: language === 'id' 
        ? 'Untuk pertanyaan umum dan kerjasama'
        : 'For general inquiries and partnerships'
    },
    {
      icon: PhoneIcon,
      title: "WhatsApp",
      content: "+62 812-3195-8808",
      description: language === 'id' 
        ? 'Chat langsung untuk respon cepat'
        : 'Direct chat for quick response'
    },
    {
      icon: MapPinIcon,
      title: language === 'id' ? 'Lokasi' : 'Location',
      content: "Lamongan, Jawa Timur, Indonesia",
      description: language === 'id' 
        ? 'Kantor virtual dan remote team'
        : 'Virtual office and remote team'
    },
    {
      icon: ClockIcon,
      title: language === 'id' ? 'Jam Kerja' : 'Working Hours',
      content: "09:00 - 17:00 WIB",
      description: language === 'id' 
        ? 'Senin - Jumat (kecuali hari libur)'
        : 'Monday - Friday (except holidays)'
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
              {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'id'
                ? 'Punya pertanyaan, saran, atau ingin berkolaborasi? Kami siap mendengar dan membantu Anda!'
                : 'Have questions, suggestions, or want to collaborate? We are ready to listen and help you!'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <h2 className="text-2xl font-bold">
                    {language === 'id' ? 'Kirim Pesan' : 'Send Message'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'id' 
                      ? 'Isi form di bawah ini dan kami akan merespon dalam 1-2 hari kerja.'
                      : 'Fill out the form below and we will respond within 1-2 business days.'
                    }
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {language === 'id' ? 'Nama' : 'Name'} *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={language === 'id' ? 'Nama lengkap Anda' : 'Your full name'}
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
                          placeholder={language === 'id' ? 'email@example.com' : 'email@example.com'}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        {language === 'id' ? 'Subjek' : 'Subject'} *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder={language === 'id' ? 'Topik pesan Anda' : 'Your message topic'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {language === 'id' ? 'Pesan' : 'Message'} *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={language === 'id' 
                          ? 'Tulis pesan Anda di sini...' 
                          : 'Write your message here...'
                        }
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      {language === 'id' ? 'Kirim Pesan' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'id' ? 'Informasi Kontak' : 'Contact Information'}
                </h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">{info.title}</h3>
                              <p className="font-medium">{info.content}</p>
                              <p className="text-sm text-muted-foreground">{info.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    {language === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      {language === 'id' 
                        ? 'Bagaimana cara mengirim tips berita?'
                        : 'How to submit news tips?'
                      }
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id'
                        ? 'Kirim email ke conime2025@gmail.com dengan sumber yang jelas dan kredibel.'
                        : 'Send email to conime2025@gmail.com with clear and credible sources.'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      {language === 'id' 
                        ? 'Apakah bisa request review anime?'
                        : 'Can I request anime reviews?'
                      }
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id'
                        ? 'Ya! Kirim request melalui form atau email dengan judul anime yang diinginkan.'
                        : 'Yes! Send requests via form or email with the desired anime title.'
                      }
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      {language === 'id' 
                        ? 'Bagaimana cara berkolaborasi?'
                        : 'How to collaborate?'
                      }
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'id'
                        ? 'Hubungi kami melalui conime2025@gmail.com dengan proposal detail.'
                        : 'Contact us via conime2025@gmail.com with detailed proposal.'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}