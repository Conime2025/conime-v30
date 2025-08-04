import { useLanguage } from "../hooks/useLanguage";
import { Button } from "./ui/button";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 bg-muted/80 text-muted-foreground hover:bg-primary hover:text-white transition-all duration-200"
      title={language === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
    >
      <span className="text-sm font-medium">
        {language === 'id' ? 'English' : 'Bahasa Indonesia'}
      </span>
    </Button>
  );
}