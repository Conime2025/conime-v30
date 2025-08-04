import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  HomeIcon,
  BriefcaseIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HeartIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

export default function CareersPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Karir' : 'Careers'} - Conime`,
    description: language === 'id' 
      ? 'Bergabunglah dengan tim Conime! Temukan peluang karir di bidang konten anime, teknologi, dan media digital untuk bersama membangun masa depan anime Indonesia.'
      : 'Join the Conime team! Find career opportunities in anime content, technology, and digital media to build the future of Indonesian anime together.',
    keywords: language === 'id' 
      ? 'karir conime, lowongan kerja, content writer, developer, anime, media'
      : 'conime careers, job openings, content writer, developer, anime, media',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/careers`
  };

  const jobOpenings = [
    {
      id: 1,
      title: language === 'id' ? 'Content Writer - Anime' : 'Content Writer - Anime',
      department: language === 'id' ? 'Editorial' : 'Editorial',
      type: language === 'id' ? 'Full-time' : 'Full-time',
      location: language === 'id' ? 'Remote/Jakarta' : 'Remote/Jakarta',
      salary: language === 'id' ? 'Kompetitif' : 'Competitive',
      description: language === 'id'
        ? 'Menulis artikel berita, review, dan konten anime berkualitas tinggi dengan gaya yang engaging dan informatif.'
        : 'Write high-quality anime news articles, reviews, and content with engaging and informative style.',
      requirements: [
        language === 'id' ? 'Pengalaman menulis 2+ tahun' : '2+ years writing experience',
        language === 'id' ? 'Pengetahuan mendalam tentang anime/manga' : 'Deep knowledge of anime/manga',
        language === 'id' ? 'Bahasa Indonesia dan Inggris yang baik' : 'Good Indonesian and English',
        language === 'id' ? 'Deadline-oriented dan detail' : 'Deadline-oriented and detail-focused'
      ]
    },
    {
      id: 2,
      title: language === 'id' ? 'Frontend Developer' : 'Frontend Developer',
      department: language === 'id' ? 'Technology' : 'Technology',
      type: language === 'id' ? 'Full-time' : 'Full-time',
      location: language === 'id' ? 'Remote/Jakarta' : 'Remote/Jakarta',
      salary: language === 'id' ? 'Kompetitif' : 'Competitive',
      description: language === 'id'
        ? 'Mengembangkan dan maintain website Conime dengan teknologi modern dan user experience yang optimal.'
        : 'Develop and maintain Conime website with modern technology and optimal user experience.',
      requirements: [
        'React, TypeScript, TailwindCSS',
        language === 'id' ? 'Pengalaman 3+ tahun' : '3+ years experience',
        language === 'id' ? 'Pemahaman UI/UX design' : 'Understanding of UI/UX design',
        language === 'id' ? 'Git workflow dan team collaboration' : 'Git workflow and team collaboration'
      ]
    },
    {
      id: 3,
      title: language === 'id' ? 'Social Media Manager' : 'Social Media Manager',
      department: language === 'id' ? 'Marketing' : 'Marketing',
      type: language === 'id' ? 'Part-time' : 'Part-time',
      location: language === 'id' ? 'Remote' : 'Remote',
      salary: language === 'id' ? 'Fleksibel' : 'Flexible',
      description: language === 'id'
        ? 'Mengelola akun media sosial Conime dan membangun engagement dengan komunitas anime Indonesia.'
        : 'Manage Conime social media accounts and build engagement with Indonesian anime community.',
      requirements: [
        language === 'id' ? 'Pengalaman social media 2+ tahun' : '2+ years social media experience',
        language === 'id' ? 'Kreatif dalam membuat konten' : 'Creative in content creation',
        language === 'id' ? 'Familiar dengan trend anime' : 'Familiar with anime trends',
        language === 'id' ? 'Tools design dasar (Canva, Figma)' : 'Basic design tools (Canva, Figma)'
      ]
    }
  ];

  const benefits = [
    {
      icon: MapPinIcon,
      title: language === 'id' ? 'Remote Friendly' : 'Remote Friendly',
      description: language === 'id' 
        ? 'Bekerja dari mana saja dengan flexible working hours'
        : 'Work from anywhere with flexible working hours'
    },
    {
      icon: UserGroupIcon,
      title: language === 'id' ? 'Tim yang Passionate' : 'Passionate Team',
      description: language === 'id'
        ? 'Bekerja dengan orang-orang yang sama-sama cinta anime'
        : 'Work with people who equally love anime'
    },
    {
      icon: RocketLaunchIcon,
      title: language === 'id' ? 'Pertumbuhan Karir' : 'Career Growth',
      description: language === 'id'
        ? 'Kesempatan berkembang bersama pertumbuhan Conime'
        : 'Opportunity to grow with Conime\'s development'
    },
    {
      icon: HeartIcon,
      title: language === 'id' ? 'Work-Life Balance' : 'Work-Life Balance',
      description: language === 'id'
        ? 'Environment kerja yang mendukung keseimbangan hidup'
        : 'Work environment that supports life balance'
    }
  ];

  const handleApply = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle} - Conime`);
    const body = encodeURIComponent(`Hi Conime Team,\n\nI am interested in applying for the ${jobTitle} position.\n\nPlease find my resume and portfolio attached.\n\nThank you for your consideration.\n\nBest regards,`);
    window.location.href = `mailto:careers@conime.id?subject=${subject}&body=${body}`;
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
              {language === 'id' ? 'Karir' : 'Careers'}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Bergabung dengan Tim Conime' : 'Join the Conime Team'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === 'id'
                ? 'Bersama-sama membangun masa depan anime Indonesia. Temukan peluang karir yang sesuai dengan passion Anda di bidang anime dan teknologi.'
                : 'Together building the future of Indonesian anime. Find career opportunities that match your passion in anime and technology.'
              }
            </p>
          </div>

          {/* Why Work With Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Mengapa Bekerja dengan Kami?' : 'Why Work with Us?'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold">{benefit.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Job Openings */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Lowongan Terbuka' : 'Open Positions'}
            </h2>
            
            {jobOpenings.length === 0 ? (
              <div className="text-center py-12">
                <BriefcaseIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'id' ? 'Tidak Ada Lowongan Saat Ini' : 'No Open Positions Currently'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'id'
                    ? 'Kami tidak memiliki posisi terbuka saat ini, tapi jangan ragu untuk mengirim CV dan portfolio Anda.'
                    : 'We don\'t have open positions currently, but feel free to send your CV and portfolio.'
                  }
                </p>
                <Button onClick={() => handleApply('General Application')}>
                  {language === 'id' ? 'Kirim CV Umum' : 'Send General Application'}
                </Button>
              </div>
            ) : (
              <div className="space-y-6 max-w-4xl mx-auto">
                {jobOpenings.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{job.department}</Badge>
                            <Badge variant="outline">{job.type}</Badge>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPinIcon className="h-4 w-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                        </div>
                        <Button onClick={() => handleApply(job.title)}>
                          {language === 'id' ? 'Lamar Sekarang' : 'Apply Now'}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">
                          {language === 'id' ? 'Persyaratan:' : 'Requirements:'}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          {/* Application Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {language === 'id' ? 'Proses Lamaran' : 'Application Process'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'id' ? 'Kirim Aplikasi' : 'Send Application'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'id'
                    ? 'Kirim CV dan portfolio melalui email atau form yang tersedia'
                    : 'Send CV and portfolio via email or available form'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'id' ? 'Review & Interview' : 'Review & Interview'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'id'
                    ? 'Tim HR akan review aplikasi dan mengundang untuk interview'
                    : 'HR team will review application and invite for interview'
                  }
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">
                  {language === 'id' ? 'Bergabung!' : 'Join the Team!'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {language === 'id'
                    ? 'Selamat datang di keluarga Conime dan mulai berkontribusi!'
                    : 'Welcome to Conime family and start contributing!'
                  }
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'id' ? 'Tidak Menemukan Posisi yang Cocok?' : 'Can\'t Find the Right Position?'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {language === 'id'
                ? 'Kami selalu mencari talenta terbaik. Kirim CV Anda dan beri tahu kami bagaimana Anda bisa berkontribusi untuk Conime!'
                : 'We are always looking for the best talent. Send us your CV and tell us how you can contribute to Conime!'
              }
            </p>
            <Button onClick={() => navigate('/contact')} size="lg">
              {language === 'id' ? 'Hubungi Kami' : 'Contact Us'}
            </Button>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}