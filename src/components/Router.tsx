import { useState, useEffect, createContext, useContext } from "react";
import { NotificationProvider } from "./NotificationSystem";
import HomePage from "../pages/HomePage";
import ListPage from "../pages/ListPage";
import SinglePage from "../pages/SinglePage";
import TagPage from "../pages/TagPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";
import DisclaimerPage from "../pages/DisclaimerPage";
import HelpPage from "../pages/HelpPage";
import BugReportPage from "../pages/BugReportPage";
import FeatureRequestPage from "../pages/FeatureRequestPage";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotificationsPage from "../pages/NotificationsPage";
import ProfilePage from "../pages/ProfilePage";
import SettingsPage from "../pages/SettingsPage";
import FAQPage from "../pages/FAQPage";

interface RouterContextType {
  currentPath: string;
  navigate: (path: string, replace?: boolean) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router component');
  }
  return context;
}

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, replace: boolean = false) => {
    if (replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path.split('?')[0]);
    setSearchParams(new URLSearchParams(path.split('?')[1] || ''));
  };

  const renderPage = () => {
    // Remove leading slash and split path
    const pathSegments = currentPath.slice(1).split('/').filter(Boolean);
    
    // Home page
    if (pathSegments.length === 0) {
      return <HomePage />;
    }

    // Static pages
    switch (pathSegments[0]) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'disclaimer':
        return <DisclaimerPage />;
      case 'help':
        return <HelpPage />;
      case 'report-bug':
        return <BugReportPage />;
      case 'feature-request':
        return <FeatureRequestPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      case 'faq':
        return <FAQPage />;
    }

    // Tag pages
    if (pathSegments[0] === 'tag' && pathSegments[1]) {
      return <TagPage tag={pathSegments[1]} />;
    }

    // Category pages (anime, komik, movie, game, ulasan, berita, rekomendasi)
    const validCategories = ['anime', 'komik', 'movie', 'game', 'ulasan', 'berita', 'rekomendasi'];
    
    if (validCategories.includes(pathSegments[0])) {
      const category = pathSegments[0];
      
      // Single article page: /category/slug
      if (pathSegments[1]) {
        return <SinglePage category={category} slug={pathSegments[1]} />;
      }
      
      // Category list page: /category or /category?page=X
      const page = searchParams.get('page') || '1';
      return <ListPage category={category} page={page} />;
    }

    // 404 for unmatched routes
    return <NotFoundPage />;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      <NotificationProvider>
        {renderPage()}
      </NotificationProvider>
    </RouterContext.Provider>
  );
}