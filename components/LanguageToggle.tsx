import { Button } from "./ui/button";
import { useLanguage } from "../hooks/useLanguage";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// Using Heroicons
import { GlobeAltIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'id' as const, name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 px-2 font-roboto">
          <GlobeAltIcon className="h-4 w-4 mr-1" />
          <span className="text-sm">{currentLanguage?.flag}</span>
          <ChevronDownIcon className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer font-roboto ${language === lang.code ? 'bg-primary/10 text-primary' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}