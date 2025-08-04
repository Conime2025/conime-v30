import { Header } from "../components/Header";
import { TimeBar } from "../components/TimeBar";
import { Footer } from "../components/Footer";
import { SEOHead } from "../components/SEOHead";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "../components/Router";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function TermsPage() {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const seoData = {
    title: `${language === 'id' ? 'Syarat dan Ketentuan' : 'Terms of Service'} - Conime`,
    description: language === 'id' 
      ? 'Syarat dan ketentuan penggunaan website Conime. Pelajari hak dan kewajiban pengguna serta aturan penggunaan platform.'
      : 'Conime website terms of service. Learn about user rights and obligations and platform usage rules.',
    keywords: language === 'id' 
      ? 'syarat ketentuan, terms of service, aturan penggunaan, conime'
      : 'terms of service, usage rules, user agreement, conime',
    url: `https://conime.com${language === 'en' ? '/en' : ''}/terms`
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
              {language === 'id' ? 'Syarat dan Ketentuan' : 'Terms of Service'}
            </span>
          </nav>

          <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
            <h1 className="text-4xl font-bold mb-4">
              {language === 'id' ? 'Syarat dan Ketentuan' : 'Terms of Service'}
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
                  <h2>1. Penerimaan Syarat</h2>
                  <p>
                    Dengan mengakses dan menggunakan website Conime (conime.com), Anda menyetujui untuk 
                    terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan syarat ini, 
                    mohon tidak menggunakan website kami.
                  </p>
                </section>

                <section>
                  <h2>2. Tentang Layanan</h2>
                  <p>
                    Conime adalah platform berita dan informasi anime yang menyediakan:
                  </p>
                  <ul>
                    <li>Artikel berita anime dan manga terkini</li>
                    <li>Review dan rekomendasi anime</li>
                    <li>Informasi industri anime dan hiburan Jepang</li>
                    <li>Newsletter dan update konten</li>
                  </ul>
                </section>

                <section>
                  <h2>3. Penggunaan yang Diizinkan</h2>
                  <p>Anda diperbolehkan untuk:</p>
                  <ul>
                    <li>Membaca dan mengakses konten untuk penggunaan pribadi</li>
                    <li>Membagikan link artikel ke platform media sosial</li>
                    <li>Berlangganan newsletter dan layanan notifikasi</li>
                    <li>Memberikan komentar dan feedback yang konstruktif</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Penggunaan yang Dilarang</h2>
                  <p>Anda TIDAK diperbolehkan untuk:</p>
                  <ul>
                    <li>Menyalin, mendistribusikan, atau mempublikasi ulang konten tanpa izin</li>
                    <li>Menggunakan konten untuk tujuan komersial tanpa lisensi</li>
                    <li>Mengirim spam, malware, atau konten berbahaya</li>
                    <li>Melakukan aktivitas yang melanggar hukum</li>
                    <li>Menggunakan bot atau sistem otomatis untuk mengakses website</li>
                    <li>Mencoba mengakses sistem atau data yang tidak diotorisasi</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Hak Kekayaan Intelektual</h2>
                  <p>
                    Semua konten di website Conime, termasuk teks, gambar, logo, dan desain, 
                    dilindungi oleh hak cipta dan merupakan milik Conime atau pemberi lisensi. 
                    Penggunaan konten harus sesuai dengan ketentuan yang berlaku.
                  </p>
                </section>

                <section>
                  <h2>6. Konten Pengguna</h2>
                  <p>
                    Dengan mengirimkan komentar atau konten lainnya, Anda memberikan Conime 
                    lisensi non-eksklusif untuk menggunakan, memodifikasi, dan menampilkan 
                    konten tersebut. Anda bertanggung jawab atas konten yang Anda kirimkan.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2>7. Disclaimer</h2>
                  <p>
                    Informasi di website ini disediakan "sebagaimana adanya". Conime tidak 
                    memberikan jaminan atas keakuratan, kelengkapan, atau keandalan informasi. 
                    Penggunaan informasi sepenuhnya merupakan risiko Anda sendiri.
                  </p>
                  <p>
                    Conime tidak bertanggung jawab atas:
                  </p>
                  <ul>
                    <li>Kerusakan atau kerugian yang timbul dari penggunaan website</li>
                    <li>Interupsi layanan atau downtime website</li>
                    <li>Kesalahan atau kelalaian dalam konten</li>
                    <li>Keamanan data atau privasi pengguna di platform pihak ketiga</li>
                    <li>Konten atau link dari website eksternal</li>
                  </ul>
                </section>

                <section>
                  <h2>8. Batasan Tanggung Jawab</h2>
                  <p>
                    Conime tidak bertanggung jawab atas kerugian langsung, tidak langsung, 
                    insidental, atau konsekuensial yang timbul dari penggunaan website ini. 
                    Tanggung jawab kami terbatas pada nilai maksimum yang telah Anda bayarkan kepada kami.
                  </p>
                </section>

                <section>
                  <h2>9. Moderasi Konten</h2>
                  <p>
                    Kami berhak untuk memoderasi, mengedit, atau menghapus konten yang melanggar 
                    ketentuan ini atau yang dianggap tidak pantas. Keputusan moderasi bersifat final.
                  </p>
                </section>

                <section>
                  <h2>10. Perubahan Ketentuan</h2>
                  <p>
                    Conime dapat mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan 
                    dinotifikasi melalui website dan berlaku efektif setelah dipublikasikan. 
                    Penggunaan berkelanjutan dianggap sebagai penerimaan perubahan.
                  </p>
                </section>

                <section>
                  <h2>11. Penghentian Layanan</h2>
                  <p>
                    Kami berhak menghentikan atau membatasi akses Anda ke website jika terbukti 
                    melanggar ketentuan ini. Penghentian dapat dilakukan tanpa pemberitahuan sebelumnya.
                  </p>
                </section>

                <section>
                  <h2>12. Hukum yang Berlaku</h2>
                  <p>
                    Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa 
                    akan diselesaikan melalui pengadilan yang berwenang di Jakarta, Indonesia.
                  </p>
                </section>

                <section id="copyright">
                  <h2>13. Hak Cipta</h2>
                  <p>
                    Semua materi di website Conime dilindungi oleh undang-undang hak cipta Indonesia 
                    dan internasional. Hak cipta mencakup namun tidak terbatas pada:
                  </p>
                  <ul>
                    <li>Artikel, review, dan konten editorial</li>
                    <li>Desain website dan elemen visual</li>
                    <li>Logo, brand mark, dan identitas visual Conime</li>
                    <li>Foto dan ilustrasi yang dibuat tim Conime</li>
                    <li>Layout, struktur, dan organisasi konten</li>
                  </ul>
                  
                  <h3>13.1 Penggunaan Fair Use</h3>
                  <p>
                    Penggunaan wajar (fair use) diperbolehkan untuk:
                  </p>
                  <ul>
                    <li>Kutipan singkat untuk tujuan review atau kritik</li>
                    <li>Penggunaan akademis dengan atribusi yang tepat</li>
                    <li>Sharing link artikel dengan kutipan pendek</li>
                  </ul>

                  <h3>13.2 DMCA dan Pelanggaran Hak Cipta</h3>
                  <p>
                    Jika Anda percaya konten di website kami melanggar hak cipta Anda, silakan hubungi:
                  </p>
                  <ul>
                    <li>Email: copyright@conime.com</li>
                    <li>Sertakan bukti kepemilikan dan lokasi konten yang dilanggar</li>
                    <li>Kami akan merespons dalam 24-48 jam</li>
                  </ul>

                  <h3>13.3 Konten Pihak Ketiga</h3>
                  <p>
                    Conime menghormati hak cipta pihak ketiga. Gambar anime, screenshot, dan materi 
                    promosi digunakan berdasarkan fair use untuk tujuan review dan editorial. 
                    Hak cipta tetap dimiliki oleh pemegang hak masing-masing.
                  </p>
                </section>

                <section>
                  <h2>14. Kontak</h2>
                  <p>
                    Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di:
                  </p>
                  <ul>
                    <li>Email: legal@conime.com</li>
                    <li>Melalui halaman kontak di website</li>
                  </ul>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using the Conime website (conime.com), you agree to be bound 
                    by these Terms of Service. If you do not agree to these terms, please do not use our website.
                  </p>
                </section>

                <section>
                  <h2>2. About the Service</h2>
                  <p>
                    Conime is an anime news and information platform that provides:
                  </p>
                  <ul>
                    <li>Latest anime and manga news articles</li>
                    <li>Anime reviews and recommendations</li>
                    <li>Anime industry and Japanese entertainment information</li>
                    <li>Newsletter and content updates</li>
                  </ul>
                </section>

                <section>
                  <h2>3. Permitted Use</h2>
                  <p>You are allowed to:</p>
                  <ul>
                    <li>Read and access content for personal use</li>
                    <li>Share article links to social media platforms</li>
                    <li>Subscribe to newsletter and notification services</li>
                    <li>Provide constructive comments and feedback</li>
                  </ul>
                </section>

                <section>
                  <h2>4. Prohibited Use</h2>
                  <p>You are NOT allowed to:</p>
                  <ul>
                    <li>Copy, distribute, or republish content without permission</li>
                    <li>Use content for commercial purposes without license</li>
                    <li>Send spam, malware, or harmful content</li>
                    <li>Engage in activities that violate the law</li>
                    <li>Use bots or automated systems to access the website</li>
                    <li>Attempt to access unauthorized systems or data</li>
                  </ul>
                </section>

                <section>
                  <h2>5. Intellectual Property Rights</h2>
                  <p>
                    All content on the Conime website, including text, images, logos, and design, 
                    is protected by copyright and owned by Conime or licensors. Content usage must 
                    comply with applicable terms.
                  </p>
                </section>

                <section>
                  <h2>6. User Content</h2>
                  <p>
                    By submitting comments or other content, you grant Conime a non-exclusive 
                    license to use, modify, and display such content. You are responsible for 
                    the content you submit.
                  </p>
                </section>

                <section id="disclaimer">
                  <h2>7. Disclaimer</h2>
                  <p>
                    Information on this website is provided "as is". Conime makes no warranties 
                    regarding the accuracy, completeness, or reliability of information. Use of 
                    information is entirely at your own risk.
                  </p>
                  <p>
                    Conime is not responsible for:
                  </p>
                  <ul>
                    <li>Damage or loss arising from website usage</li>
                    <li>Service interruptions or website downtime</li>
                    <li>Errors or omissions in content</li>
                    <li>Data security or user privacy on third-party platforms</li>
                    <li>Content or links from external websites</li>
                  </ul>
                </section>

                <section>
                  <h2>8. Limitation of Liability</h2>
                  <p>
                    Conime is not responsible for direct, indirect, incidental, or consequential 
                    damages arising from use of this website. Our liability is limited to the 
                    maximum amount you have paid to us.
                  </p>
                </section>

                <section>
                  <h2>9. Content Moderation</h2>
                  <p>
                    We reserve the right to moderate, edit, or remove content that violates these 
                    terms or is deemed inappropriate. Moderation decisions are final.
                  </p>
                </section>

                <section>
                  <h2>10. Changes to Terms</h2>
                  <p>
                    Conime may change these Terms of Service at any time. Changes will be notified 
                    through the website and become effective after publication. Continued use is 
                    considered acceptance of changes.
                  </p>
                </section>

                <section>
                  <h2>11. Service Termination</h2>
                  <p>
                    We reserve the right to terminate or restrict your access to the website if 
                    proven to violate these terms. Termination may be done without prior notice.
                  </p>
                </section>

                <section>
                  <h2>12. Governing Law</h2>
                  <p>
                    These Terms of Service are governed by the laws of the Republic of Indonesia. 
                    Any disputes will be resolved through competent courts in Jakarta, Indonesia.
                  </p>
                </section>

                <section id="copyright">
                  <h2>13. Copyright</h2>
                  <p>
                    All materials on the Conime website are protected by Indonesian and international 
                    copyright laws. Copyright includes but is not limited to:
                  </p>
                  <ul>
                    <li>Articles, reviews, and editorial content</li>
                    <li>Website design and visual elements</li>
                    <li>Conime logo, brand marks, and visual identity</li>
                    <li>Photos and illustrations created by Conime team</li>
                    <li>Layout, structure, and content organization</li>
                  </ul>
                  
                  <h3>13.1 Fair Use</h3>
                  <p>
                    Fair use is permitted for:
                  </p>
                  <ul>
                    <li>Brief quotations for review or criticism purposes</li>
                    <li>Academic use with proper attribution</li>
                    <li>Sharing article links with short excerpts</li>
                  </ul>

                  <h3>13.2 DMCA and Copyright Infringement</h3>
                  <p>
                    If you believe content on our website infringes your copyright, please contact:
                  </p>
                  <ul>
                    <li>Email: copyright@conime.com</li>
                    <li>Include proof of ownership and location of infringing content</li>
                    <li>We will respond within 24-48 hours</li>
                  </ul>

                  <h3>13.3 Third-Party Content</h3>
                  <p>
                    Conime respects third-party copyrights. Anime images, screenshots, and promotional 
                    materials are used under fair use for review and editorial purposes. Copyright 
                    remains with respective rights holders.
                  </p>
                </section>

                <section>
                  <h2>14. Contact</h2>
                  <p>
                    If you have questions about these Terms of Service, please contact us at:
                  </p>
                  <ul>
                    <li>Email: legal@conime.com</li>
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