import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  isLoading: boolean;
  message?: string;
}

export function LoadingAnimation({ isLoading, message = "Loading..." }: LoadingAnimationProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev === '...') return '';
          return prev + '.';
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

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
            {message}
            <span className="inline-block w-8 text-left text-primary">{dots}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Menyiapkan konten terbaik untuk Anda
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 2) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + i * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Spinner untuk komponen kecil
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full border-2 border-muted border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}

// Loading Skeleton untuk content
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header Skeleton */}
      <div className="h-8 bg-muted rounded-md w-3/4"></div>
      
      {/* Content Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/6"></div>
      </div>
      
      {/* Image Skeleton */}
      <div className="h-48 bg-muted rounded-lg"></div>
      
      {/* More Content */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    </div>
  );
}