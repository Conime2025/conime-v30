import { useState, useEffect, useCallback } from 'react';

interface ViewedArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  viewedAt: number;
  thumbnail?: string;
}

interface ArticleViews {
  [articleId: number]: {
    count: number;
    lastViewed: number;
    sessions: number;
  };
}

interface PopularityData {
  daily: { [articleId: number]: number };
  weekly: { [articleId: number]: number };
  monthly: { [articleId: number]: number };
  trending: { [articleId: number]: number };
}

const STORAGE_KEYS = {
  ARTICLE_VIEWS: 'conime_article_views',
  LAST_VIEWED: 'conime_last_viewed', 
  POPULARITY_DATA: 'conime_popularity_data',
  USER_SESSION: 'conime_user_session'
};

const MAX_LAST_VIEWED = 10;
const VIEW_COUNT_THRESHOLD = 3000; // 3 seconds to count as view
const TRENDING_DECAY_HOURS = 24;

export function useContentTracking() {
  const [viewedArticles, setViewedArticles] = useState<ViewedArticle[]>([]);
  const [articleViews, setArticleViews] = useState<ArticleViews>({});
  const [popularityData, setPopularityData] = useState<PopularityData>({
    daily: {},
    weekly: {},
    monthly: {},
    trending: {}
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const storedViews = localStorage.getItem(STORAGE_KEYS.ARTICLE_VIEWS);
        if (storedViews) {
          setArticleViews(JSON.parse(storedViews));
        }

        const storedLastViewed = localStorage.getItem(STORAGE_KEYS.LAST_VIEWED);
        if (storedLastViewed) {
          setViewedArticles(JSON.parse(storedLastViewed));
        }

        const storedPopularity = localStorage.getItem(STORAGE_KEYS.POPULARITY_DATA);
        if (storedPopularity) {
          setPopularityData(JSON.parse(storedPopularity));
        }
      } catch (error) {
        console.warn('Error loading content tracking data:', error);
      }
    };

    loadStoredData();
  }, []);

  // Track article view with time threshold
  const trackArticleView = useCallback((article: {
    id: number;
    title: string;
    slug: string;
    category: string;
    thumbnail?: string;
  }) => {
    const now = Date.now();
    const sessionKey = `${STORAGE_KEYS.USER_SESSION}_${article.id}`;
    const lastSession = localStorage.getItem(sessionKey);
    
    // Only count if not viewed in last 30 minutes (avoid spam)
    if (lastSession && now - parseInt(lastSession) < 30 * 60 * 1000) {
      return;
    }

    localStorage.setItem(sessionKey, now.toString());

    // Update view counts
    setArticleViews(prev => {
      const updated = {
        ...prev,
        [article.id]: {
          count: (prev[article.id]?.count || 0) + 1,
          lastViewed: now,
          sessions: (prev[article.id]?.sessions || 0) + 1
        }
      };
      localStorage.setItem(STORAGE_KEYS.ARTICLE_VIEWS, JSON.stringify(updated));
      return updated;
    });

    // Update last viewed list
    setViewedArticles(prev => {
      const filtered = prev.filter(item => item.id !== article.id);
      const updated = [
        {
          id: article.id,
          title: article.title,
          slug: article.slug,
          category: article.category,
          viewedAt: now,
          thumbnail: article.thumbnail
        },
        ...filtered
      ].slice(0, MAX_LAST_VIEWED);
      
      localStorage.setItem(STORAGE_KEYS.LAST_VIEWED, JSON.stringify(updated));
      return updated;
    });

    // Update popularity data
    setPopularityData(prev => {
      const today = new Date().toDateString();
      const thisWeek = getWeekKey();
      const thisMonth = getMonthKey();
      
      const updated = {
        daily: {
          ...prev.daily,
          [article.id]: (prev.daily[article.id] || 0) + 1
        },
        weekly: {
          ...prev.weekly,
          [article.id]: (prev.weekly[article.id] || 0) + 1
        },
        monthly: {
          ...prev.monthly,
          [article.id]: (prev.monthly[article.id] || 0) + 1
        },
        trending: {
          ...prev.trending,
          [article.id]: calculateTrendingScore(prev.trending[article.id] || 0, now)
        }
      };
      
      localStorage.setItem(STORAGE_KEYS.POPULARITY_DATA, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get related articles based on category, tags, and content similarity
  const getRelatedArticles = useCallback((currentArticle: any, allArticles: any[], limit: number = 6) => {
    if (!currentArticle || !allArticles.length) return [];

    const scored = allArticles
      .filter(article => article.id !== currentArticle.id)
      .map(article => {
        let score = 0;
        
        // Category match (highest weight)
        if (article.categories?.some((cat: string) => 
          currentArticle.categories?.includes(cat))) {
          score += 50;
        }
        
        // Tags match (medium weight)
        const commonTags = article.tags?.filter((tag: string) => 
          currentArticle.tags?.includes(tag)) || [];
        score += commonTags.length * 10;
        
        // Title/content keyword similarity (lower weight)
        const currentWords = (currentArticle.title + ' ' + (currentArticle.summary || ''))
          .toLowerCase().split(/\s+/);
        const articleWords = (article.title + ' ' + (article.summary || ''))
          .toLowerCase().split(/\s+/);
        
        const commonWords = currentWords.filter(word => 
          word.length > 3 && articleWords.includes(word));
        score += commonWords.length * 5;
        
        // Popularity boost
        const views = articleViews[article.id]?.count || 0;
        score += Math.min(views / 100, 20); // Max 20 points from popularity
        
        // Recency boost (newer articles get slight preference)
        const daysSincePublished = (Date.now() - new Date(article.date).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSincePublished < 7) score += 10;
        else if (daysSincePublished < 30) score += 5;
        
        return { ...article, relevanceScore: score };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);

    return scored;
  }, [articleViews]);

  // Get trending articles
  const getTrendingArticles = useCallback((allArticles: any[], limit: number = 10) => {
    const now = Date.now();
    const cutoff = now - (TRENDING_DECAY_HOURS * 60 * 60 * 1000);
    
    return allArticles
      .map(article => ({
        ...article,
        trendingScore: popularityData.trending[article.id] || 0,
        recentViews: articleViews[article.id]?.lastViewed > cutoff ? 
          articleViews[article.id]?.count || 0 : 0
      }))
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, limit);
  }, [popularityData.trending, articleViews]);

  // Get popular articles by timeframe
  const getPopularArticles = useCallback((
    allArticles: any[], 
    timeframe: 'daily' | 'weekly' | 'monthly' = 'weekly',
    limit: number = 10
  ) => {
    const popularityMap = popularityData[timeframe] || {};
    
    return allArticles
      .map(article => ({
        ...article,
        popularityScore: popularityMap[article.id] || 0,
        viewCount: articleViews[article.id]?.count || 0
      }))
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, limit);
  }, [popularityData, articleViews]);

  // Clear old data (run periodically)
  const cleanupOldData = useCallback(() => {
    const now = Date.now();
    const monthAgo = now - (30 * 24 * 60 * 60 * 1000);
    
    // Clean old view sessions
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_KEYS.USER_SESSION)) {
        const timestamp = localStorage.getItem(key);
        if (timestamp && parseInt(timestamp) < monthAgo) {
          localStorage.removeItem(key);
        }
      }
    });
  }, []);

  return {
    // State
    viewedArticles,
    articleViews,
    popularityData,
    
    // Actions
    trackArticleView,
    getRelatedArticles,
    getTrendingArticles,
    getPopularArticles,
    cleanupOldData,
    
    // Utils
    getViewCount: (articleId: number) => articleViews[articleId]?.count || 0,
    isRecentlyViewed: (articleId: number) => {
      const lastViewed = articleViews[articleId]?.lastViewed;
      return lastViewed && (Date.now() - lastViewed) < 24 * 60 * 60 * 1000;
    }
  };
}

// Helper functions
function getWeekKey(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

function calculateTrendingScore(currentScore: number, timestamp: number): number {
  const now = Date.now();
  const hoursSince = (now - timestamp) / (1000 * 60 * 60);
  
  // Decay old trending score
  const decayFactor = Math.max(0, 1 - (hoursSince / TRENDING_DECAY_HOURS));
  const decayedScore = currentScore * decayFactor;
  
  // Add new point
  return decayedScore + 1;
}