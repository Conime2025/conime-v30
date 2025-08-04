import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "./Router";

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const { language } = useLanguage();
  const { navigate } = useRouter();

  const handleClick = (item: BreadcrumbItem) => {
    if (item.path && !item.isActive) {
      navigate(item.path);
    }
  };

  return (
    <nav 
      className={`flex items-center space-x-1 text-sm text-muted-foreground mb-6 ${className}`}
      aria-label={language === 'id' ? 'Breadcrumb' : 'Breadcrumb'}
      data-breadcrumb
    >
      {/* Home Link */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center border-0 hover:text-primary transition-colors"
        aria-label={language === 'id' ? 'Beranda' : 'Home'}
      >
        <HomeIcon className="h-4 w-4" />
      </button>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRightIcon className="h-4 w-4 text-muted-foreground/60" />
          {item.isActive ? (
            <span className="font-medium text-foreground">
              {item.label}
            </span>
          ) : (
            <button
              onClick={() => handleClick(item)}
              className="hover:text-primary border-0 transition-colors"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}