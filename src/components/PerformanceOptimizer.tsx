import { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [
      'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
    ];

    preloadResources.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Optimize images loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src || '';
      });
    }

    // Service worker registration for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Conime Logo Animation */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-20 h-20 border-4 border-border rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-4 h-4 bg-primary rounded-full transform -translate-x-2 -translate-y-2"></div>
          </div>
          
          {/* Inner Pulse */}
          <div className="absolute inset-4 bg-primary/20 rounded-full animate-pulse"></div>
          
          {/* Center Conime Logo (Icon Only) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="w-10 h-10"
              viewBox="0 0 336 336" 
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M266.658 48L181.98 168H5.66016L90.3379 48H266.658Z" fill="#FF1545" />
              <path d="M330.34 288L245.661 168H5.66016L90.3389 288H330.34Z" fill="#E9335A" />
            </svg>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-medium text-foreground">
            Loading Conime...
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Menyiapkan konten terbaik untuk Anda
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}