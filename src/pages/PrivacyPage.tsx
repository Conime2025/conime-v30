import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'} - Conime`,
    description: language === 'id' 
      ? 'Kebijakan privasi Conime menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi pengguna.'
      : 'Conime privacy policy explains how we collect, use, and protect user personal information.',
    keywords: language === 'id' 
      ? 'kebijakan privasi, privacy policy, perlindungan data, conime'
      : 'privacy policy, data protection, personal information, conime',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/privacy`
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
              {language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
            </span>
          </nav>

          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
            </h1>
            
            <p className="text-muted-foreground mb-8">
              {language === 'id' 
                ? 'Terakhir diperbarui: 15 Januari 2025'
                : 'Last updated: January 15, 2025'
              }
            </p>

            {language === 'id' ? (
              <div className="space-y-8">
                <section>
                  <h2>1. Pengantar</h2>
                  <p>
                    Conime ("kami", "kita", atau "milik kami") berkomitmen untuk melindungi privasi pengguna ("Anda" atau "milik Anda"). 
                    Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi 
                    pribadi Anda ketika menggunakan situs web conime.com.
                  </p>
                </section>

                <section>
                  <h2>2. Informasi yang Kami Kumpulkan</h2>
                  <h3>2.1 Informasi yang Anda Berikan</h3>
                  <ul>
                    <li>Nama dan alamat email saat berlangganan newsletter</li>
                    <li>Komentar dan feedback yang Anda kirimkan</li>
                    <li>Informasi kontak saat menghubungi kami</li>
                  </ul>

                  <h3>2.2 Informasi yang Dikumpulkan Otomatis</h3>
                  <ul>
                    <li>Alamat IP dan lokasi geografis</li>
                    <li>Jenis browser dan sistem operasi</li>
                    <li>Halaman yang dikunjungi dan waktu akses</li>
                    <li>Data cookie dan teknologi serupa</li>
                  </ul>
                </section>

                <section>
                  <h2>3. Cara Kami Menggunakan Informasi</h2>
                  <p>Kami menggunakan informasi yang dikumpulkan untuk:</p>
                  <ul>
                    <li>Menyediakan dan meningkatkan layanan website</li>
                    <li>Mengirim newsletter dan update konten</li>
                    <li>Menanggapi pertanyaan dan memberikan dukungan</li>
                    <li>Menganalisis penggunaan website untuk peningkatan</li>
                    <li>Mencegah aktivitas yang melanggar ketentuan</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Pembagian Informasi</h2>
                  <p>
                    Kami TIDAK menjual, menyewakan, atau membagikan informasi pribadi Anda kepada pihak ketiga 
                    untuk tujuan komersial. Kami hanya dapat membagikan informasi dalam situasi berikut:
                  </p>
                  <ul>
                    <li>Dengan persetujuan eksplisit dari Anda</li>
                    <li>Untuk mematuhi hukum atau proses legal</li>
                    <li>Untuk melindungi hak dan keamanan kami atau pengguna lain</li>
                    <li>Dengan penyedia layanan tepercaya yang membantu operasi website</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Keamanan Data</h2>
                  <p>
                    Kami mengimplementasikan langkah-langkah keamanan teknis dan organisasi yang sesuai 
                    untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, 
                    atau penghancuran yang tidak sah.
                  </p>
                </section>

                <section>
                  <h2>6. Cookie dan Teknologi Serupa</h2>
                  <p>
                    Website kami menggunakan cookie untuk meningkatkan pengalaman pengguna. Anda dapat 
                    mengatur browser untuk menolak cookie, namun beberapa fitur website mungkin tidak berfungsi optimal.
                  </p>
                </section>

                <section>
                  <h2>7. Hak Pengguna</h2>
                  <p>Anda memiliki hak untuk:</p>
                  <ul>
                    <li>Mengakses informasi pribadi yang kami miliki tentang Anda</li>
                    <li>Meminta koreksi atau pembaruan informasi</li>
                    <li>Meminta penghapusan informasi pribadi</li>
                    <li>Menolak atau membatasi pemrosesan informasi</li>
                    <li>Berhenti berlangganan newsletter kapan saja</li>
                  </ul>
                </section>

                <section>
                  <h2>8. Perubahan Kebijakan</h2>
                  <p>
                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan 
                    dinotifikasi melalui website dan berlaku efektif setelah dipublikasikan.
                  </p>
                </section>

                <section>
                  <h2>9. Kontak</h2>
                  <p>
                    Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:
                  </p>
                  <ul>
                    <li>Email: privacy@conime.com</li>
                    <li>Melalui halaman kontak di website</li>
                  </ul>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2>1. Introduction</h2>
                  <p>
                    Conime ("we", "us", or "our") is committed to protecting user privacy ("you" or "your"). 
                    This Privacy Policy explains how we collect, use, store, and protect your personal 
                    information when using the conime.com website.
                  </p>
                </section>

                <section>
                  <h2>2. Information We Collect</h2>
                  <h3>2.1 Information You Provide</h3>
                  <ul>
                    <li>Name and email address when subscribing to newsletter</li>
                    <li>Comments and feedback you submit</li>
                    <li>Contact information when reaching out to us</li>
                  </ul>

                  <h3>2.2 Automatically Collected Information</h3>
                  <ul>
                    <li>IP address and geographic location</li>
                    <li>Browser type and operating system</li>
                    <li>Pages visited and access times</li>
                    <li>Cookie data and similar technologies</li>
                  </ul>
                </section>

                <section>
                  <h2>3. How We Use Information</h2>
                  <p>We use collected information to:</p>
                  <ul>
                    <li>Provide and improve website services</li>
                    <li>Send newsletters and content updates</li>
                    <li>Respond to inquiries and provide support</li>
                    <li>Analyze website usage for improvements</li>
                    <li>Prevent activities that violate terms</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Information Sharing</h2>
                  <p>
                    We do NOT sell, rent, or share your personal information to third parties 
                    for commercial purposes. We may only share information in the following situations:
                  </p>
                  <ul>
                    <li>With your explicit consent</li>
                    <li>To comply with law or legal process</li>
                    <li>To protect our rights and security or other users</li>
                    <li>With trusted service providers who help website operations</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational security measures 
                    to protect your personal information from unauthorized access, alteration, 
                    disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h2>6. Cookies and Similar Technologies</h2>
                  <p>
                    Our website uses cookies to enhance user experience. You can set your browser 
                    to refuse cookies, but some website features may not function optimally.
                  </p>
                </section>

                <section>
                  <h2>7. User Rights</h2>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Access personal information we hold about you</li>
                    <li>Request correction or update of information</li>
                    <li>Request deletion of personal information</li>
                    <li>Object to or restrict information processing</li>
                    <li>Unsubscribe from newsletter at any time</li>
                  </ul>
                </section>

                <section>
                  <h2>8. Policy Changes</h2>
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be 
                    notified through the website and become effective after publication.
                  </p>
                </section>

                <section>
                  <h2>9. Contact</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at:
                  </p>
                  <ul>
                    <li>Email: privacy@conime.com</li>
                    <li>Through the contact page on our website</li>
                  </ul>
                </section>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}