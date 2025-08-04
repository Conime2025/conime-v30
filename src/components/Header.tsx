import { useState, useRef } from "react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { UserProfilePopup } from "./UserProfilePopup";
import { BellNotificationPopup } from "./NotificationPopup";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { 
  Bars3Icon, 
  XMarkIcon,
  BellIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

export function Header() {
  const { language } = useLanguage();
  const { navigate, currentPath } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isNotificationPopupOpen, setIsNotificationPopupOpen] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);

  const menuItems = [
    { 
      name: { id: "Beranda", en: "Home" }, 
      path: "/",
      isActive: currentPath === "/"
    },
    { 
      name: { id: "Anime", en: "Anime" }, 
      path: "/anime",
      isActive: currentPath.startsWith("/anime")
    },
    { 
      name: { id: "Komik", en: "Comics" }, 
      path: "/komik",
      isActive: currentPath.startsWith("/komik")
    },
    { 
      name: { id: "Film", en: "Movies" }, 
      path: "/movie",
      isActive: currentPath.startsWith("/movie")
    },
    { 
      name: { id: "Game", en: "Games" }, 
      path: "/game",
      isActive: currentPath.startsWith("/game")
    },
    { 
      name: { id: "Ulasan", en: "Reviews" }, 
      path: "/ulasan",
      isActive: currentPath.startsWith("/ulasan")
    }
  ];

  const handleMenuClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen(!isProfilePopupOpen);
    setIsNotificationPopupOpen(false); // Close notification popup
  };

  const toggleNotificationPopup = () => {
    setIsNotificationPopupOpen(!isNotificationPopupOpen);
    setIsProfilePopupOpen(false); // Close profile popup
  };

  const closeProfilePopup = () => {
    setIsProfilePopupOpen(false);
  };

  const closeNotificationPopup = () => {
    setIsNotificationPopupOpen(false);
  };

  // Mock notification count - in real app this would come from notification system
  const unreadNotificationCount = 3;

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button onClick={() => handleMenuClick('/')}>
                <Logo />
              </button>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="hidden md:flex items-center h-16 headerNav">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  data-active={item.isActive}
                  className={`
                    px-2 lg:px-4 h-16 text-sm font-medium !border-2 !border-conime-500/0 hover:border-b-2 hover:border-primary hover:bg-black/0 hover:!text-primary transition-all duration-200 font-roboto relative group flex items-center
                    ${item.isActive 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-muted-foreground hover:!text-primary'
                    }
                  `}
                  onClick={() => handleMenuClick(item.path)}
                >
                  {item.name[language]}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button 
                ref={notificationButtonRef}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-8 rounded-md px-3 text-xs hover:bg-muted relative"
                aria-label="Notifications"
                onClick={toggleNotificationPopup}
              >
                <BellIcon className="h-5 w-5" />
                {unreadNotificationCount > 0 && (
                  <span className="notif-badge absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full show"></span>
                )}
              </button>

              {/* User Profile */}
              <button 
                ref={profileButtonRef}
                className="flex items-center space-x-2 p-1 rounded-full hover:bg-muted transition-colors" 
                aria-label="User menu"
                onClick={toggleProfilePopup}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-6 h-6 text-white" />
                </div>
                <div className="relative">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-xs md:hidden"
                aria-label="Toggle menu"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4 space-y-2 bg-background">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleMenuClick(item.path)}
                  className={`
                    w-full justify-start px-4 py-3 transition-all duration-200
                    ${item.isActive 
                      ? 'text-primary bg-primary/5 border-l-2 border-l-primary' 
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                    }
                  `}
                >
                  {item.name[language]}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* User Profile Popup */}
      <UserProfilePopup 
        isOpen={isProfilePopupOpen}
        onClose={closeProfilePopup}
        anchorRef={profileButtonRef}
      />

      {/* Notification Popup */}
      <BellNotificationPopup 
        isOpen={isNotificationPopupOpen}
        onClose={closeNotificationPopup}
        anchorRef={notificationButtonRef}
      />
    </>
  );
}