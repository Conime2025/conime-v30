import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";
import { 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
  QuestionMarkCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  CogIcon,
  BellIcon
} from "@heroicons/react/24/outline";

interface UserProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
}

export function UserProfilePopup({ isOpen, onClose, anchorRef }: UserProfilePopupProps) {
  const { language, toggleLanguage } = useLanguage();
  const { navigate } = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Mock user data - in real app this would come from auth context
  const user = {
    isLoggedIn: true, // Changed to show logged in state
    name: "Koni",
    email: "koni@conime.com",
    role: "Editor",
    avatar: null
  };

  const handleThemeToggle = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLoginRegister = () => {
    navigate('/login');
    onClose();
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
    // Note: We don't close the popup so user can see the change immediately
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed top-16 right-4 z-50 w-80">
        <Card className="bg-card border shadow-xl">
          <CardHeader className="pb-4">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="text-xs mt-1">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-1">
            {/* Account Section */}
            <div className="pb-2 border-b">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                ACCOUNT
              </p>
              
              {user.isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <CogIcon className="w-4 h-4 mr-3" />
                    {language === 'id' ? 'Pengaturan Akun' : 'Account Settings'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3"
                    onClick={() => handleNavigation('/settings')}
                  >
                    <BellIcon className="w-4 h-4 mr-3" />
                    {language === 'id' ? 'Pengaturan Lengkap' : 'Full Settings'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3"
                    onClick={() => handleNavigation('/notifications')}
                  >
                    <BellIcon className="w-4 h-4 mr-3" />
                    {language === 'id' ? 'Pengaturan Notifikasi' : 'Notification Settings'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-10 px-3 text-destructive hover:text-destructive"
                    onClick={handleLoginRegister}
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                    {language === 'id' ? 'Keluar' : 'Logout'}
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start h-10 px-3"
                  onClick={handleLoginRegister}
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                  Login/Register
                </Button>
              )}
            </div>

            {/* Preferences Section */}
            <div className="py-2 border-b">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                PREFERENCES
              </p>
              
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={handleThemeToggle}
              >
                {isDarkMode ? (
                  <SunIcon className="w-4 h-4 mr-3" />
                ) : (
                  <MoonIcon className="w-4 h-4 mr-3" />
                )}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>

              {/* Language Toggle - Simplified: Show target language only */}
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={handleLanguageToggle}
              >
                <LanguageIcon className="w-4 h-4 mr-3" />
                <span>
                  {language === 'id' ? 'English' : 'Bahasa Indonesia'}
                </span>
              </Button>
            </div>

            {/* Support Section */}
            <div className="pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                SUPPORT
              </p>
              
              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={() => handleNavigation('/help')}
              >
                <QuestionMarkCircleIcon className="w-4 h-4 mr-3" />
                Help & FAQ
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={() => handleNavigation('/report-bug')}
              >
                <ExclamationTriangleIcon className="w-4 h-4 mr-3" />
                Report Bug
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start h-10 px-3"
                onClick={() => handleNavigation('/feature-request')}
              >
                <LightBulbIcon className="w-4 h-4 mr-3" />
                Feature Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}