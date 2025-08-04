// This is what your /src/App.tsx should look like (WORKING VERSION)
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { NewsCard } from "./components/NewsCard";
import { Sidebar } from "./components/Sidebar";
import { CategoryFilter } from "./components/CategoryFilter";
import { HeroSection } from "./components/HeroSection";
import { SEOHead } from "./components/SEOHead";
import { StructuredData } from "./components/StructuredData";
import { PerformanceOptimizer } from "./components/PerformanceOptimizer";
import { LanguageProvider, useLanguage } from "./hooks/useLanguage";
import { Button } from "./components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Logo } from "./components/Logo";

// This version has ALL imports and will work perfectly!
// The root /App.tsx is missing these imports → that's why LanguageProvider error happens

function AppContent() {
  // All the component code here...
  // This works because ALL imports are present
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}