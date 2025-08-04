import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../hooks/useLanguage';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Ad types
type AdType = 'banner' | 'native' | 'sidebar' | 'sponsored' | 'footer';
type AdSize = 'small' | 'medium' | 'large' | 'responsive';

interface AdData {
  id: string;
  type: AdType;
  size: AdSize;
  title: string;
  description: string;
  image?: string;
  link: string;
  sponsor: string;
  isSponsored: boolean;
  category?: string;
  targetAudience?: string[];
}

interface AdProps {
  type: AdType;
  size?: AdSize;
  className?: string;
  maxAds?: number;
  category?: string;
  onAdClick?: (ad: AdData) => void;
}

// Mock ad data - optimized image sizes
const mockAds: AdData[] = [
  {
    id: 'ad-1',
    type: 'native',
    size: 'medium',
    title: 'Crunchyroll Premium - Unlimited Anime Streaming',
    description: 'Watch thousands of anime episodes in HD without ads. Free trial available!',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=300&fit=crop&auto=format',
    link: 'https://crunchyroll.com',
    sponsor: 'Crunchyroll',
    isSponsored: true,
    category: 'anime',
    targetAudience: ['anime', 'streaming']
  },
  {
    id: 'ad-2',
    type: 'sidebar',
    size: 'small',
    title: 'Manga Plus by Shueisha',
    description: 'Read the latest manga chapters for free!',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=320&h=200&fit=crop&auto=format',
    link: 'https://mangaplus.shueisha.co.jp',
    sponsor: 'Shueisha',
    isSponsored: true,
    category: 'komik',
    targetAudience: ['manga', 'komik']
  },
  {
    id: 'ad-3',
    type: 'banner',
    size: 'large',
    title: 'Steam Summer Sale - Anime Games Up to 75% Off',
    description: 'Discover amazing anime-inspired games at incredible prices.',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=200&fit=crop&auto=format',
    link: 'https://store.steampowered.com',
    sponsor: 'Steam',
    isSponsored: true,
    category: 'game',
    targetAudience: ['game', 'gaming']
  },
  {
    id: 'ad-4',
    type: 'sponsored',
    size: 'responsive',
    title: 'Funko Pop! Anime Collection',
    description: 'Collect your favorite anime characters in adorable Funko Pop! form.',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=480&h=270&fit=crop&auto=format',
    link: 'https://funko.com',
    sponsor: 'Funko',
    isSponsored: true,
    category: 'merchandise',
    targetAudience: ['anime', 'collectibles']
  },
  {
    id: 'ad-5',
    type: 'footer',
    size: 'medium',
    title: 'Conime Premium Membership',
    description: 'Get exclusive content, early access, and ad-free experience.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=640&h=200&fit=crop&auto=format',
    link: '/premium',
    sponsor: 'Conime',
    isSponsored: false,
    category: 'premium',
    targetAudience: ['premium', 'membership']
  }
];

export function AdManager({ 
  type, 
  size = 'medium', 
  className = '', 
  maxAds = 1, 
  category,
  onAdClick 
}: AdProps) {
  const { language } = useLanguage();
  const [hiddenAds, setHiddenAds] = useState<Set<string>>(new Set());
  const [availableAds, setAvailableAds] = useState<AdData[]>([]);

  // Filter ads based on type, category, and hidden status
  useEffect(() => {
    let filteredAds = mockAds.filter(ad => 
      ad.type === type && 
      !hiddenAds.has(ad.id) &&
      (!category || ad.category === category || ad.targetAudience?.includes(category))
    );

    // Limit number of ads
    filteredAds = filteredAds.slice(0, maxAds);
    
    setAvailableAds(filteredAds);
  }, [type, category, maxAds, hiddenAds]);

  const handleAdClick = (ad: AdData) => {
    // Track ad click
    console.log('Ad clicked:', ad.id);
    onAdClick?.(ad);
    
    // Open link
    if (ad.link.startsWith('http')) {
      window.open(ad.link, '_blank', 'noopener,noreferrer');
    } else {
      // Internal link
      window.location.href = ad.link;
    }
  };

  const handleHideAd = (adId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setHiddenAds(prev => new Set([...prev, adId]));
  };

  if (availableAds.length === 0) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`}>
      {availableAds.map((ad) => (
        <AdCard
          key={ad.id}
          ad={ad}
          size={size}
          language={language}
          onAdClick={() => handleAdClick(ad)}
          onHideAd={(e) => handleHideAd(ad.id, e)}
        />
      ))}
    </div>
  );
}

function AdCard({ 
  ad, 
  size, 
  language, 
  onAdClick, 
  onHideAd 
}: {
  ad: AdData;
  size: AdSize;
  language: string;
  onAdClick: () => void;
  onHideAd: (e: React.MouseEvent) => void;
}) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'max-w-xs';
      case 'medium':
        return 'max-w-md';
      case 'large':
        return 'max-w-2xl';
      case 'responsive':
        return 'w-full';
      default:
        return 'max-w-md';
    }
  };

  // Native ads blend with content
  if (ad.type === 'native') {
    return (
      <Card 
        className={`
          ${getSizeClasses()} cursor-pointer hover:shadow-lg transition-all duration-300 
          border border-dashed border-muted-foreground/30 bg-muted/20 relative group overflow-hidden
        `}
        onClick={onAdClick}
      >
        {/* Sponsored label */}
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur-sm">
            {language === 'id' ? 'Sponsored' : 'Sponsored'}
          </Badge>
        </div>
        
        {/* Hide button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={onHideAd}
        >
          <XMarkIcon className="h-3 w-3" />
        </Button>

        <CardContent className="p-0">
          {ad.image && (
            <div className="w-full aspect-video">
              <ImageWithFallback
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-4">
            <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {ad.title}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {ad.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {language === 'id' ? 'Oleh' : 'By'} {ad.sponsor}
              </span>
              <Badge variant="secondary" className="text-xs">
                {language === 'id' ? 'Iklan' : 'Ad'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sidebar ads - compact
  if (ad.type === 'sidebar') {
    return (
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow relative group border-l-2 border-l-primary/30 overflow-hidden"
        onClick={onAdClick}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-1 right-1 z-10 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onHideAd}
        >
          <XMarkIcon className="h-3 w-3" />
        </Button>
        
        <CardContent className="p-0">
          {ad.image && (
            <div className="w-full aspect-video">
              <ImageWithFallback
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-3">
            <h5 className="font-medium text-xs mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {ad.title}
            </h5>
            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
              {ad.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {language === 'id' ? 'Iklan' : 'Ad'}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {ad.sponsor}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Banner ads - horizontal
  if (ad.type === 'banner') {
    return (
      <Card 
        className={`
          ${getSizeClasses()} cursor-pointer hover:shadow-lg transition-all relative group overflow-hidden
          bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20
        `}
        onClick={onAdClick}
      >
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
          onClick={onHideAd}
        >
          <XMarkIcon className="h-3 w-3" />
        </Button>

        <CardContent className="p-4 flex items-center gap-4">
          {ad.image && (
            <div className="w-24 flex-shrink-0">
              <ImageWithFallback
                src={ad.image}
                alt={ad.title}
                className="w-full !h-16 object-cover rounded"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
              {ad.title}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {ad.description}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            <Badge className="bg-primary text-white text-xs">
              {ad.sponsor}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {language === 'id' ? 'Sponsor' : 'Sponsored'}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default card layout
  return (
    <Card 
      className={`${getSizeClasses()} cursor-pointer hover:shadow-lg transition-all relative group overflow-hidden`}
      onClick={onAdClick}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-2 right-2 z-10 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
        onClick={onHideAd}
      >
        <XMarkIcon className="h-3 w-3" />
      </Button>

      <CardContent className="p-0">
        {ad.image && (
          <div className="w-full aspect-video">
            <ImageWithFallback
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4">
          <h4 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {ad.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-3 mb-3">
            {ad.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {language === 'id' ? 'Oleh' : 'By'} {ad.sponsor}
            </span>
            <Badge variant={ad.isSponsored ? 'default' : 'secondary'} className="text-xs">
              {ad.isSponsored 
                ? (language === 'id' ? 'Sponsored' : 'Sponsored')
                : (language === 'id' ? 'Promosi' : 'Promo')
              }
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Specific ad components for easy placement
export function NativeAd({ category, className }: { category?: string; className?: string }) {
  return (
    <AdManager 
      type="native" 
      size="responsive" 
      category={category}
      className={className}
      maxAds={1}
    />
  );
}

export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdManager 
      type="sidebar" 
      size="small" 
      className={className}
      maxAds={2}
    />
  );
}

export function BannerAd({ className }: { className?: string }) {
  return (
    <AdManager 
      type="banner" 
      size="large" 
      className={className}
      maxAds={1}
    />
  );
}

export function FooterAd({ className }: { className?: string }) {
  return (
    <AdManager 
      type="footer" 
      size="medium" 
      className={className}
      maxAds={1}
    />
  );
}