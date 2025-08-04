import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  CalendarIcon,
  FireIcon,
  HeartIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
  onSortChange: (sort: 'newest' | 'oldest' | 'popular' | 'trending') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalResults: number;
  category: string;
  onClearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults,
  category,
  onClearFilters
}: SearchFiltersProps) {
  const { language, t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  const categoryMap: { [key: string]: { id: string; en: string; emoji: string } } = {
    'anime': { id: 'Anime', en: 'Anime', emoji: '🎌' },
    'berita': { id: 'Berita Animasi', en: 'Animation News', emoji: '📺' },
    'ulasan': { id: 'Ulasan', en: 'Reviews', emoji: '⭐' },
    'rekomendasi': { id: 'Rekomendasi', en: 'Recommendations', emoji: '👍' },
    'komik': { id: 'Komik', en: 'Comics', emoji: '📚' },
    'movie': { id: 'Film', en: 'Movies', emoji: '🎬' },
    'game': { id: 'Game', en: 'Games', emoji: '🎮' }
  };

  const displayCategory = categoryMap[category]?.[language] || category;

  const sortOptions = [
    {
      value: 'newest',
      label: language === 'id' ? 'Terbaru' : 'Newest',
      icon: CalendarIcon
    },
    {
      value: 'oldest',
      label: language === 'id' ? 'Terlama' : 'Oldest',
      icon: CalendarIcon
    },
    {
      value: 'popular',
      label: language === 'id' ? 'Terpopuler' : 'Most Popular',
      icon: HeartIcon
    },
    {
      value: 'trending',
      label: language === 'id' ? 'Trending' : 'Trending',
      icon: FireIcon
    }
  ];

  const hasActiveFilters = searchQuery.trim() !== '' || sortBy !== 'newest';

  return (
    <div className="bg-card rounded-xl border p-6 mb-8 space-y-4">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'id' 
              ? `Cari artikel ${displayCategory.toLowerCase()}...` 
              : `Search ${displayCategory.toLowerCase()} articles...`
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-48 h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{option.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="h-10 px-3"
              title={language === 'id' ? 'Tampilan grid' : 'Grid view'}
            >
              <Squares2X2Icon className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="h-10 px-3"
              title={language === 'id' ? 'Tampilan list' : 'List view'}
            >
              <ListBulletIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-4"
          >
            <FunnelIcon className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">
              {language === 'id' ? 'Filter' : 'Filters'}
            </span>
            <ChevronDownIcon className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span>
            {language === 'id' 
              ? `${totalResults} artikel ditemukan`
              : `${totalResults} articles found`
            }
          </span>
          {searchQuery && (
            <span>
              {language === 'id' ? `untuk "${searchQuery}"` : `for "${searchQuery}"`}
            </span>
          )}
        </div>

        {/* View Mode Indicator (Mobile) */}
        <div className="sm:hidden">
          <Badge variant="outline" className="text-xs">
            {viewMode === 'grid' ? (
              <><Squares2X2Icon className="h-3 w-3 mr-1" /> Grid</>
            ) : (
              <><ListBulletIcon className="h-3 w-3 mr-1" /> List</>
            )}
          </Badge>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t">
          <span className="text-sm text-muted-foreground">
            {language === 'id' ? 'Filter aktif:' : 'Active filters:'}
          </span>
          
          {searchQuery && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <MagnifyingGlassIcon className="h-3 w-3" />
              <span>"{searchQuery}"</span>
              <button 
                onClick={() => onSearchChange('')}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {sortBy !== 'newest' && (
            <Badge variant="outline" className="flex items-center space-x-1">
              {sortBy === 'oldest' && <><CalendarIcon className="h-3 w-3" /> {language === 'id' ? 'Terlama' : 'Oldest'}</>}
              {sortBy === 'popular' && <><HeartIcon className="h-3 w-3" /> {language === 'id' ? 'Terpopuler' : 'Popular'}</>}
              {sortBy === 'trending' && <><FireIcon className="h-3 w-3" /> Trending</>}
              <button 
                onClick={() => onSortChange('newest')}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClearFilters}
            className="text-xs h-7 px-2"
          >
            <XMarkIcon className="h-3 w-3 mr-1" />
            {language === 'id' ? 'Hapus Semua' : 'Clear All'}
          </Button>
        </div>
      )}

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="pt-4 border-t space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'id' ? 'Rentang Tanggal' : 'Date Range'}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'id' ? 'Semua Waktu' : 'All Time'}
                  </SelectItem>
                  <SelectItem value="today">
                    {language === 'id' ? 'Hari Ini' : 'Today'}
                  </SelectItem>
                  <SelectItem value="week">
                    {language === 'id' ? 'Minggu Ini' : 'This Week'}
                  </SelectItem>
                  <SelectItem value="month">
                    {language === 'id' ? 'Bulan Ini' : 'This Month'}
                  </SelectItem>
                  <SelectItem value="year">
                    {language === 'id' ? 'Tahun Ini' : 'This Year'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Author Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'id' ? 'Penulis' : 'Author'}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'id' ? 'Semua Penulis' : 'All Authors'}
                  </SelectItem>
                  <SelectItem value="koni">Koni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Popularity Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === 'id' ? 'Popularitas' : 'Popularity'}
              </label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    {language === 'id' ? 'Semua' : 'All'}
                  </SelectItem>
                  <SelectItem value="high">
                    {language === 'id' ? 'Sangat Populer (500+ likes)' : 'Very Popular (500+ likes)'}
                  </SelectItem>
                  <SelectItem value="medium">
                    {language === 'id' ? 'Populer (100+ likes)' : 'Popular (100+ likes)'}
                  </SelectItem>
                  <SelectItem value="low">
                    {language === 'id' ? 'Kurang Populer (<100 likes)' : 'Less Popular (<100 likes)'}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-muted-foreground">
              {language === 'id' 
                ? 'Filter advanced akan segera tersedia!'
                : 'Advanced filters coming soon!'
              }
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(false)}
            >
              {language === 'id' ? 'Tutup' : 'Close'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}