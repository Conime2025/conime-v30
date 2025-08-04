import { useState } from "react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "../hooks/useLanguage";
import { 
  BellIcon, 
  SunIcon, 
  MoonIcon, 
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { href: "/", label: t('nav.home') },
    { href: "/anime", label: t('nav.anime') },
    { href: "/komik", label: t('nav.comics') },
    { href: "/film", label: t('nav.movies') },
    { href: "/game", label: t('nav.games') },
    { href: "/ulasan", label: t('nav.reviews') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <Logo variant="icon" size="md" />
              <div className="hidden sm:block">
                <Logo variant="full" size="md" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium font-roboto text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <LanguageToggle />
            
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <BellIcon className="h-4 w-4" />
              </Button>
              {/* Notification badge positioned directly on the bell */}
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs font-roboto"
              >
                3
              </Badge>
            </div>

            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="h-8 w-8"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-4 w-4" />
              ) : (
                <Bars3Icon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <nav className="flex flex-col space-y-1 p-4">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium font-roboto text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}