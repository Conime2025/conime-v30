import { TrendingUp, Clock, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Sidebar() {
  const trendingNews = [
    {
      title: "One Piece Episode 1000 Pecahkan Rekor Penonton",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=70&fit=crop",
      views: "15.2K"
    },
    {
      title: "Attack on Titan Final Season Konfirmasi Tanggal Tayang",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=100&h=70&fit=crop",
      views: "12.8K"
    },
    {
      title: "Demon Slayer Season 4 Rilis Trailer Perdana",
      image: "https://images.unsplash.com/photo-1606897965121-4ef48ae1b88f?w=100&h=70&fit=crop",
      views: "10.5K"
    },
    {
      title: "Studio Ghibli Umumkan Proyek Film Terbaru",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=70&fit=crop",
      views: "9.1K"
    }
  ];

  const categories = [
    { name: "Review", count: 45, color: "bg-emerald-500" },
    { name: "Berita", count: 78, color: "bg-blue-500" },
    { name: "Rilis", count: 32, color: "bg-purple-500" },
    { name: "Populer", count: 56, color: "bg-[#ff1545]" },
    { name: "Tutorial", count: 23, color: "bg-yellow-500" },
    { name: "Event", count: 18, color: "bg-pink-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Trending News */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Trending</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingNews.map((news, index) => (
            <div key={index}>
              <div className="flex space-x-3 group cursor-pointer">
                <ImageWithFallback
                  src={news.image}
                  alt={news.title}
                  className="w-16 h-12 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                  </h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{news.views} views</span>
                  </div>
                </div>
              </div>
              {index < trendingNews.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-primary" />
            <span>Kategori</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between cursor-pointer hover:bg-muted/50 rounded p-2 -m-2 transition-colors group">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${category.color} group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">{category.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs group-hover:bg-primary/10">
                {category.count}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-center">Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-3">
          <p className="text-sm text-muted-foreground">
            Dapatkan update berita anime terbaru langsung di email Anda!
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full px-3 py-2 text-sm border rounded-md bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
            />
            <button className="w-full bg-gradient-to-r from-[#ff1545] to-[#e9335a] text-white text-sm py-2 rounded-md hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl">
              Berlangganan
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}