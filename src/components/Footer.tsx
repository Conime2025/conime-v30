import { Logo } from "./Logo";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { useAlert, useNotification } from "./NotificationSystem";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  HeartIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";

export function Footer() {
  const { language } = useLanguage();
  const { navigate, currentPath } = useRouter();
  const alert = useAlert();
  const { showNewsletter } = useNotification();

  const quickLinks = [
    { 
      name: { id: "Beranda", en: "Home" }, 
      path: "/" 
    },
    { 
      name: { id: "Anime", en: "Anime" }, 
      path: "/anime" 
    },
    { 
      name: { id: "Komik", en: "Comics" }, 
      path: "/komik" 
    },
    { 
      name: { id: "Film", en: "Movies" }, 
      path: "/movie" 
    },
    { 
      name: { id: "Game", en: "Games" }, 
      path: "/game" 
    },
    { 
      name: { id: "Ulasan", en: "Reviews" }, 
      path: "/ulasan" 
    }
  ];

  const legalLinks = [
    { 
      name: { id: "Syarat & Ketentuan", en: "Terms & Conditions" }, 
      path: "/terms" 
    },
    { 
      name: { id: "Kebijakan Privasi", en: "Privacy Policy" }, 
      path: "/privacy" 
    },
    { 
      name: { id: "Disclaimer", en: "Disclaimer" }, 
      path: "/disclaimer" 
    }
  ];

  const supportLinks = [
    { 
      name: { id: "Tentang Kami", en: "About Us" }, 
      path: "/about" 
    },
    { 
      name: { id: "Kontak", en: "Contact" }, 
      path: "/contact" 
    },
    { 
      name: { id: "Bantuan", en: "Help" }, 
      path: "/help" 
    },
    { 
      name: { id: "FAQ", en: "FAQ" }, 
      path: "/faq" 
    }
  ];

  const handleNewsletterSubscribe = () => {
    showNewsletter(
      language === 'id' ? 'Newsletter Berhasil!' : 'Newsletter Success!',
      language === 'id' 
        ? 'Terima kasih! Fitur newsletter akan segera tersedia. Kami akan memberi tahu Anda ketika siap.'
        : 'Thank you! Newsletter feature will be available soon. We will notify you when ready.',
      {
        label: language === 'id' ? 'Oke' : 'OK',
        onClick: () => {
          alert.info(language === 'id' 
            ? 'Anda akan mendapat email konfirmasi segera.'
            : 'You will receive a confirmation email soon.'
          );
        }
      }
    );
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'id' 
                ? 'Portal berita anime, manga, dan game terdepan. Dapatkan informasi terbaru dan terpercaya seputar dunia hiburan Jepang.'
                : 'Leading anime, manga, and game news portal. Get the latest and trusted information about Japanese entertainment world.'
              }
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <EnvelopeIcon className="h-4 w-4" />
                <span>conime2025@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <PhoneIcon className="h-4 w-4" />
                <span>+62 812-3195-8808</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation - Same as Header */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {language === 'id' ? 'Navigasi Cepat' : 'Quick Navigation'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {language === 'id' ? 'Bantuan' : 'Support'}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name[language]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {language === 'id' ? 'Newsletter' : 'Newsletter'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'id' 
                ? 'Dapatkan update artikel terbaru langsung ke email Anda.'
                : 'Get the latest article updates directly to your email.'
              }
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder={language === 'id' ? 'Masukkan email Anda' : 'Enter your email'}
                className="bg-background"
              />
              <Button 
                className="w-full" 
                size="sm"
                onClick={handleNewsletterSubscribe}
              >
                {language === 'id' ? 'Berlangganan' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Conime. {language === 'id' ? 'Semua hak dilindungi.' : 'All rights reserved.'}
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <div key={link.path} className="flex items-center">
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name[language]}
                  </button>
                  {index < legalLinks.length - 1 && (
                    <span className="mx-2 text-muted-foreground">•</span>
                  )}
                </div>
              ))}
            </div>

            {/* Scroll to Top */}
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center space-x-1"
            >
              <ArrowUpIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {language === 'id' ? 'Ke Atas' : 'To Top'}
              </span>
            </Button>
          </div>

          {/* Made with Love */}
          <div className="text-center mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
              <span>{language === 'id' ? 'Dibuat dengan' : 'Made with'}</span>
              <HeartIcon className="h-3 w-3 text-red-500" />
              <span>{language === 'id' ? 'untuk komunitas anime Indonesia' : 'for Indonesian anime community'}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {language === 'id' 
                ? 'Konten dibuat dengan bantuan AI dan dikurasi oleh editor manusia.'
                : 'Content created with AI assistance and curated by human editors.'
              }
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}