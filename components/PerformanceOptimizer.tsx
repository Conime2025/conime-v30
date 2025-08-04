import { useEffect, useState } from 'react';

export function PerformanceOptimizer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Preload critical images
      const criticalImages = [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=400&fit=crop'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Add resource hints
    const addResourceHints = () => {
      // DNS prefetch for external domains
      const domains = ['images.unsplash.com', 'fonts.googleapis.com'];
      
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    };

    // Optimize font loading
    const optimizeFonts = () => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = 'https://fonts.googleapis.com';
      document.head.appendChild(link);
    };

    // Critical CSS inlining (simulated)
    const inlineCriticalCSS = () => {
      const criticalCSS = `
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      
      const style = document.createElement('style');
      style.textContent = criticalCSS;
      document.head.appendChild(style);
    };

    // Implement lazy loading for images
    const implementLazyLoading = () => {
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading support
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
          (img as HTMLImageElement).src = img.getAttribute('data-src') || '';
        });
      } else {
        // Fallback for browsers without native lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.classList.remove('loading-skeleton');
              imageObserver.unobserve(img);
            }
          });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
      }
    };

    // Initialize optimizations
    preloadResources();
    addResourceHints();
    optimizeFonts();
    inlineCriticalCSS();
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
      implementLazyLoading();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton for better perceived performance
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-card border-b loading-skeleton"></div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="h-8 bg-card loading-skeleton mb-4 rounded"></div>
              <div className="h-4 bg-card loading-skeleton mb-8 rounded w-2/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg overflow-hidden">
                    <div className="h-48 loading-skeleton"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 loading-skeleton rounded"></div>
                      <div className="h-3 loading-skeleton rounded w-3/4"></div>
                      <div className="h-3 loading-skeleton rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-80">
              <div className="bg-card rounded-lg p-4 mb-6">
                <div className="h-6 loading-skeleton rounded mb-4"></div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex space-x-3 mb-4">
                    <div className="w-16 h-12 loading-skeleton rounded"></div>
                    <div className="flex-1">
                      <div className="h-3 loading-skeleton rounded mb-1"></div>
                      <div className="h-3 loading-skeleton rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}