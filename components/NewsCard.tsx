import { Calendar, User, MessageCircle, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NewsCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  comments: number;
  likes: number;
  featured?: boolean;
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
  featured = false 
}: NewsCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ulasan': return 'bg-emerald-500';
      case 'berita': return 'bg-blue-500';
      case 'rilis': return 'bg-purple-500';
      case 'populer': return 'bg-[#ff1545]';
      case 'tutorial': return 'bg-yellow-500';
      case 'event': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${featured ? 'md:col-span-2' : ''}`}>
      {/* Image - Tinggi yang sama untuk semua card */}
      <div className="relative">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge 
          className={`absolute top-3 left-3 ${getCategoryColor(category)} text-white border-0`}
        >
          {category}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content - dengan constraint yang jelas */}
      <CardContent className="p-4">
        {/* Title - Maksimal 2 baris */}
        <h3 className={`font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors ${featured ? 'text-lg' : ''}`}>
          {title}
        </h3>
        
        {/* Excerpt - Maksimal 3 baris */}
        <p className="text-muted-foreground text-sm line-clamp-3 mb-3">
          {excerpt}
        </p>
        
        {/* Author & Date */}
        <div className="flex items-center text-xs text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      
      {/* Footer - Tinggi tetap */}
      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer">
            <MessageCircle className="h-3 w-3" />
            <span>{comments}</span>
          </div>
          <div className="flex items-center space-x-1 hover:text-primary transition-colors cursor-pointer">
            <Heart className="h-3 w-3" />
            <span>{likes}</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="hover:text-primary">
          Baca Selengkapnya
        </Button>
      </CardFooter>
    </Card>
  );
}