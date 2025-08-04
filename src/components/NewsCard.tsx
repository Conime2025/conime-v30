import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SharePopup } from "./SharePopup";
import { 
  HeartIcon as HeartOutline, 
  ChatBubbleLeftIcon, 
  PaperAirplaneIcon,
  CalendarIcon,
  UserIcon,
  ClockIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  comments: number;
  likes: number;
  shares?: number;
  reads?: number;
  featured?: boolean;
  layout?: 'grid' | 'list';
  imageHeight?: string; // New prop for standardized image heights
  onShare: () => void;
  onLike: () => void;
  onComment: () => void;
  onReadMore: () => void;
}

export function NewsCard({
  title,
  excerpt,
  category,
  author,
  date,
  image,
  comments,
  likes,
  shares = 0,
  reads = 0,
  featured = false,
  layout = 'grid',
  imageHeight = 'h-48', // Default height for latest articles
  onShare,
  onLike,
  onComment,
  onReadMore
}: NewsCardProps) {
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes || 0);
  const [shareCount, setShareCount] = useState(shares || 0);
  const [readCount] = useState(reads || Math.floor(Math.random() * 500) + 100);
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Event handlers
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareCount(prev => prev + 1);
    setShowSharePopup(true);
    onShare();
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment();
  };

  // Category mapping
  const categoryMap: { [key: string]: { id: string; en: string; color: string } } = {
    'anime': { id: 'Anime', en: 'Anime', color: 'bg-blue-500' },
    'berita': { id: 'Berita', en: 'News', color: 'bg-green-500' },
    'ulasan': { id: 'Ulasan', en: 'Reviews', color: 'bg-purple-500' },
    'rekomendasi': { id: 'Rekomendasi', en: 'Recommendations', color: 'bg-orange-500' },
    'komik': { id: 'Komik', en: 'Comics', color: 'bg-pink-500' },
    'movie': { id: 'Film', en: 'Movies', color: 'bg-red-500' },
    'game': { id: 'Game', en: 'Games', color: 'bg-yellow-500' }
  };

  const displayCategory = categoryMap[category]?.[language] || category || 'Unknown';
  const categoryColor = categoryMap[category]?.color || 'bg-gray-500';
  
  const shareUrl = `https://conime.id/${category || 'article'}`;
  const shareTitle = title || 'Article';

  if (layout === 'list') {
    return (
      <>
        <article className="bg-card rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
                 onClick={onReadMore}>
          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section - List layout uses md:h-full */}
            <div className="md:w-80 flex-shrink-0 relative overflow-hidden">
              <img 
                src={image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'} 
                alt={title || 'Article image'}
                className={`w-full ${imageHeight} md:h-full object-cover group-hover:scale-105 transition-transform duration-500`}
              />
              <div className="absolute top-3 left-3">
                <Badge className={`${categoryColor} text-white border-0`}>
                  {displayCategory}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <EyeIcon className="h-3 w-3" />
                <span>{readCount.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 p-6 flex flex-col justify-between min-h-[300px]">
              <div className="flex-1">
                <a 
                  href={shareUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadMore();
                  }}
                  className="block mb-3"
                >
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {title || 'Untitled Article'}
                  </h3>
                </a>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                  {excerpt || 'No excerpt available.'}
                </p>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-4 w-4" />
                    <span>{author || 'Unknown Author'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{date || 'No date'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="h-4 w-4" />
                    <span>{readCount.toLocaleString()} {language === 'id' ? 'baca' : 'reads'}</span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleLike}
                    className={`flex items-center space-x-1 transition-colors ${
                      isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    {isLiked ? <HeartSolid className="h-4 w-4" /> : <HeartOutline className="h-4 w-4" />}
                    <span>{likeCount}</span>
                  </button>
                  
                  <button 
                    onClick={handleComment}
                    className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500 transition-colors"
                  >
                    <ChatBubbleLeftIcon className="h-4 w-4" />
                    <span>{comments || 0}</span>
                  </button>
                  
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                    <span>{shareCount}</span>
                  </button>
                </div>
                
                <Button onClick={onReadMore} size="sm">
                  {language === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                </Button>
              </div>
            </div>
          </div>
        </article>
        
        <SharePopup 
          isOpen={showSharePopup}
          onClose={() => setShowSharePopup(false)}
          url={shareUrl}
          title={shareTitle}
          image={image}
        />
      </>
    );
  }

  // Grid layout - Use imageHeight prop for standardized heights
  return (
    <>
      <article className={`bg-card rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full cursor-pointer ${
        featured ? 'shadow-lg' : ''
      }`} onClick={onReadMore}>
        {/* Image Section - Grid layout uses imageHeight prop */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img 
            src={image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop'} 
            alt={title || 'Article image'}
            className={`w-full ${imageHeight} object-cover group-hover:scale-105 transition-transform duration-500`}
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColor} text-white border-0`}>
              {displayCategory}
            </Badge>
          </div>
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="text-xs">
                {language === 'id' ? 'Unggulan' : 'Featured'}
              </Badge>
            </div>
          )}
          {!featured && (
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
              <EyeIcon className="h-3 w-3" />
              <span>{readCount > 999 ? `${(readCount / 1000).toFixed(1)}k` : readCount}</span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <div className="flex-1">
            <a 
              href={shareUrl}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onReadMore();
              }}
              className="block mb-2"
            >
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                {title || 'Untitled Article'}
              </h3>
            </a>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-3 leading-relaxed">
              {excerpt || 'No excerpt available.'}
            </p>
          </div>
          
          {/* Meta Info */}
          <div className="space-y-3 mt-auto">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{author || 'Unknown Author'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>{date || 'No date'}</span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-1 transition-colors text-sm ${
                    isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  {isLiked ? <HeartSolid className="h-4 w-4" /> : <HeartOutline className="h-4 w-4" />}
                  <span>{likeCount}</span>
                </button>
                
                <button 
                  onClick={handleComment}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-blue-500 transition-colors text-sm"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                  <span>{comments || 0}</span>
                </button>
                
                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-green-500 transition-colors text-sm"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                  <span>{shareCount}</span>
                </button>
              </div>
              
              <Button onClick={onReadMore} size="sm" variant="outline" className="text-xs px-3 py-1">
                {language === 'id' ? 'Baca' : 'Read'}
              </Button>
            </div>
          </div>
        </div>
      </article>
      
      <SharePopup 
        isOpen={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        url={shareUrl}
        title={shareTitle}
        image={image}
      />
    </>
  );
}