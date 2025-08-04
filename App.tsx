import { useEffect } from "react";
import { LanguageProvider } from "./src/hooks/useLanguage";
import { Router } from "./src/components/Router";
import "./src/styles/globals.css";

// Theme initialization
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Main App with Language Provider and Router
export default function App() {
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}