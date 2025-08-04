import { useState, useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";

export function TimeBar() {
  const { language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date as DD-MM-YY with weekday
  const formatDate = (date: Date) => {
    const weekday = date.toLocaleDateString(
      language === 'id' ? 'id-ID' : 'en-US',
      { weekday: 'long' }
    );
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2); // Last 2 digits
    
    return `${weekday}, ${day}-${month}-${year}`;
  };

  return (
    <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>
              {formatDate(currentTime)}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <span>
              {currentTime.toLocaleTimeString(
                language === 'id' ? 'id-ID' : 'en-US',
                { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  second: '2-digit'
                }
              )}
            </span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="hidden md:block">{language === 'id' ? 'Website Aktif' : 'Website Active'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}