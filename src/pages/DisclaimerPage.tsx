import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { 
  HomeIcon,
  CpuChipIcon,
  UserIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

export default function DisclaimerPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Disclaimer' : 'Disclaimer'} - Conime`,
    description: language === 'id' 
      ? 'Disclaimer CoNime tentang penggunaan teknologi AI dalam pembuatan konten, tanggung jawab editorial, dan batasan informasi yang disajikan.'
      : 'CoNime disclaimer about AI technology usage in content creation, editorial responsibility, and limitations of presented information.',
    keywords: language === 'id' 
      ? 'disclaimer, AI content, tanggung jawab editorial, conime, teknologi AI'
      : 'disclaimer, AI content, editorial responsibility, conime, AI technology',
    url: `https://conime.id${language === 'en' ? '/en' : ''}/disclaimer`
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
              Disclaimer
            </span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExclamationTriangleIcon className="h-8 w-8 text-amber-600" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
              <p className="text-xl text-muted-foreground">
                {language === 'id'
                  ? 'Penting untuk dibaca: Informasi tentang penggunaan teknologi AI dan tanggung jawab editorial CoNime'
                  : 'Important to read: Information about AI technology usage and CoNime editorial responsibility'
                }
              </p>
            </div>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              {language === 'id' ? (
                <div className="space-y-8">
                  {/* AI Content Creation */}
                  <section className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <CpuChipIcon className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-0">
                        Penggunaan Teknologi AI
                      </h2>
                    </div>
                    <div className="space-y-4 text-blue-800 dark:text-blue-200">
                      <p>
                        <strong>CoNime menggunakan teknologi Artificial Intelligence (AI)</strong> seperti ChatGPT 
                        dalam proses pembuatan konten untuk meningkatkan efisiensi dan kualitas artikel.
                      </p>
                      <p>
                        <strong>Proses Editorial Kami:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Konten awal dibuat dengan bantuan AI berdasarkan topik dan brief yang ditentukan</li>
                        <li>Semua artikel diperiksa dan disunting oleh editor manusia sebelum dipublikasi</li>
                        <li>Fakta dan informasi diverifikasi dari sumber-sumber terpercaya</li>
                        <li>Gaya penulisan disesuaikan dengan standar editorial CoNime</li>
                        <li>Konten final merupakan hasil kolaborasi antara AI dan kontrol kualitas manusia</li>
                      </ul>
                    </div>
                  </section>

                  {/* Editorial Responsibility */}
                  <section className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <UserIcon className="h-6 w-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-0">
                        Tanggung Jawab Editorial
                      </h2>
                    </div>
                    <div className="space-y-4 text-green-800 dark:text-green-200">
                      <p>
                        Meskipun menggunakan AI, <strong>tanggung jawab editorial penuh tetap berada di tangan tim CoNime</strong>:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Verifikasi Fakta:</strong> Semua informasi dikonfirmasi dari sumber resmi</li>
                        <li><strong>Kontrol Kualitas:</strong> Editor manusia meninjau setiap artikel</li>
                        <li><strong>Akurasi Konten:</strong> Kami bertanggung jawab atas kebenaran informasi</li>
                        <li><strong>Standar Editorial:</strong> Mengikuti kode etik jurnalisme digital</li>
                        <li><strong>Update Berkala:</strong> Koreksi dan update dilakukan saat diperlukan</li>
                      </ul>
                    </div>
                  </section>

                  {/* Content Limitations */}
                  <section className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <InformationCircleIcon className="h-6 w-6 text-amber-600" />
                      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-0">
                        Batasan Informasi
                      </h2>
                    </div>
                    <div className="space-y-4 text-amber-800 dark:text-amber-200">
                      <p>
                        CoNime menyediakan informasi untuk tujuan hiburan dan edukasi. Pembaca perlu memahami:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Opini vs Fakta:</strong> Ulasan dan rekomendasi bersifat subjektif</li>
                        <li><strong>Informasi Terkini:</strong> Industri anime berubah cepat, informasi mungkin outdated</li>
                        <li><strong>Spoiler Alert:</strong> Artikel mungkin mengandung spoiler, perhatikan warning</li>
                        <li><strong>Hak Cipta:</strong> Semua konten anime adalah milik pemegang hak masing-masing</li>
                        <li><strong>Rekomendasi:</strong> Saran tontonan berdasarkan preferensi umum</li>
                      </ul>
                    </div>
                  </section>

                  {/* Contact & Correction */}
                  <section className="bg-gray-50 dark:bg-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-4">
                      <ShieldCheckIcon className="h-6 w-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0">
                        Koreksi & Feedback
                      </h2>
                    </div>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p>
                        Kami menghargai feedback dari pembaca untuk meningkatkan kualitas konten:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Koreksi Informasi:</strong> Hubungi kami jika menemukan kesalahan fakta</li>
                        <li><strong>Saran Konten:</strong> Kirim ide topik atau anime yang ingin dibahas</li>
                        <li><strong>Kritik Konstruktif:</strong> Masukan untuk perbaikan kualitas editorial</li>
                        <li><strong>Update Request:</strong> Minta update untuk artikel yang outdated</li>
                      </ul>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                        <p className="font-semibold mb-2">Kontak Editorial:</p>
                        <ul className="space-y-1 text-sm">
                          <li>📧 Email: <a href="mailto:conime2025@gmail.com" className="text-primary hover:underline">conime2025@gmail.com</a></li>
                          <li>📱 WhatsApp: <a href="tel:+6281231958808" className="text-primary hover:underline">+62 812-3195-8808</a></li>
                          <li>💬 Melalui: <button onClick={() => navigate('/contact')} className="text-primary hover:underline">Halaman Kontak</button></li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Final Note */}
                  <section className="text-center bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-xl font-bold mb-3 text-primary">Komitmen CoNime</h3>
                    <p className="text-muted-foreground">
                      Kami berkomitmen untuk menyajikan konten anime berkualitas tinggi dengan 
                      memanfaatkan teknologi AI secara bertanggung jawab, sambil tetap mempertahankan 
                      standar editorial dan akurasi informasi yang tinggi.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      <strong>Terakhir diperbarui:</strong> 15 Januari 2025
                    </p>
                  </section>
                </div>
              ) : (
                // English version
                <div className="space-y-8">
                  {/* AI Content Creation */}
                  <section className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <CpuChipIcon className="h-6 w-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-0">
                        AI Technology Usage
                      </h2>
                    </div>
                    <div className="space-y-4 text-blue-800 dark:text-blue-200">
                      <p>
                        <strong>CoNime uses Artificial Intelligence (AI) technology</strong> such as ChatGPT 
                        in the content creation process to improve efficiency and article quality.
                      </p>
                      <p>
                        <strong>Our Editorial Process:</strong>
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Initial content is created with AI assistance based on determined topics and briefs</li>
                        <li>All articles are reviewed and edited by human editors before publication</li>
                        <li>Facts and information are verified from trusted sources</li>
                        <li>Writing style is adjusted to CoNime editorial standards</li>
                        <li>Final content is the result of collaboration between AI and human quality control</li>
                      </ul>
                    </div>
                  </section>

                  {/* Editorial Responsibility */}
                  <section className="bg-green-50 dark:bg-green-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <UserIcon className="h-6 w-6 text-green-600" />
                      <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-0">
                        Editorial Responsibility
                      </h2>
                    </div>
                    <div className="space-y-4 text-green-800 dark:text-green-200">
                      <p>
                        Despite using AI, <strong>full editorial responsibility remains with the CoNime team</strong>:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Fact Verification:</strong> All information is confirmed from official sources</li>
                        <li><strong>Quality Control:</strong> Human editors review every article</li>
                        <li><strong>Content Accuracy:</strong> We are responsible for information truthfulness</li>
                        <li><strong>Editorial Standards:</strong> Following digital journalism code of ethics</li>
                        <li><strong>Regular Updates:</strong> Corrections and updates made when necessary</li>
                      </ul>
                    </div>
                  </section>

                  {/* Content Limitations */}
                  <section className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <InformationCircleIcon className="h-6 w-6 text-amber-600" />
                      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-0">
                        Information Limitations
                      </h2>
                    </div>
                    <div className="space-y-4 text-amber-800 dark:text-amber-200">
                      <p>
                        CoNime provides information for entertainment and educational purposes. Readers should understand:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Opinion vs Facts:</strong> Reviews and recommendations are subjective</li>
                        <li><strong>Current Information:</strong> Anime industry changes rapidly, information may be outdated</li>
                        <li><strong>Spoiler Alert:</strong> Articles may contain spoilers, pay attention to warnings</li>
                        <li><strong>Copyright:</strong> All anime content belongs to respective rights holders</li>
                        <li><strong>Recommendations:</strong> Viewing suggestions based on general preferences</li>
                      </ul>
                    </div>
                  </section>

                  {/* Contact & Correction */}
                  <section className="bg-gray-50 dark:bg-gray-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3 mb-4">
                      <ShieldCheckIcon className="h-6 w-6 text-gray-600" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0">
                        Corrections & Feedback
                      </h2>
                    </div>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p>
                        We appreciate reader feedback to improve content quality:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Information Corrections:</strong> Contact us if you find factual errors</li>
                        <li><strong>Content Suggestions:</strong> Send topic ideas or anime you want discussed</li>
                        <li><strong>Constructive Criticism:</strong> Input for editorial quality improvement</li>
                        <li><strong>Update Requests:</strong> Request updates for outdated articles</li>
                      </ul>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4">
                        <p className="font-semibold mb-2">Editorial Contact:</p>
                        <ul className="space-y-1 text-sm">
                          <li>📧 Email: <a href="mailto:conime2025@gmail.com" className="text-primary hover:underline">conime2025@gmail.com</a></li>
                          <li>📱 WhatsApp: <a href="tel:+6281231958808" className="text-primary hover:underline">+62 812-3195-8808</a></li>
                          <li>💬 Via: <button onClick={() => navigate('/contact')} className="text-primary hover:underline">Contact Page</button></li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Final Note */}
                  <section className="text-center bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <h3 className="text-xl font-bold mb-3 text-primary">CoNime Commitment</h3>
                    <p className="text-muted-foreground">
                      We are committed to presenting high-quality anime content by utilizing AI technology 
                      responsibly, while maintaining high editorial standards and information accuracy.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      <strong>Last updated:</strong> January 15, 2025
                    </p>
                  </section>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}