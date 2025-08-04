export interface Article {
  id: string;
  title: {
    id: string;
    en: string;
  };
  slug: string;
  excerpt?: {
    id: string;
    en: string;
  };
  summary?: {
    id: string;
    en: string;
  };
  content?: {
    id: string;
    en: string;
  };
  image: string;
  category: string;
  categories?: string[]; // NEW: Multiple categories support
  tags: string[];
  author: string;
  date: string;
  dateISO: string;
  readTime: number;
  viewCount?: number;
  trendingScore?: number;
}

// Helper function to format date as DD-MM-YYYY
export function formatDateDDMMYYYY(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// Mock articles data with multiple categories support
const mockArticles: Article[] = [
  {
    id: "chainsaw-man-reze-arc-movie",
    title: {
      id: "Chainsaw Man: Film Arc Reze Akan Tayang 2024 - Trailer Perdana Dirilis!",
      en: "Chainsaw Man: Reze Arc Movie Coming 2024 - First Trailer Released!"
    },
    slug: "chainsaw-man-reze-arc-movie-2024",
    excerpt: {
      id: "Studio MAPPA mengumumkan film Chainsaw Man yang akan mengadaptasi Arc Reze dengan animasi spektakuler.",
      en: "Studio MAPPA announces Chainsaw Man movie adapting the Reze Arc with spectacular animation."
    },
    summary: {
      id: "Film Chainsaw Man yang diadaptasi dari Arc Reze akan dirilis tahun 2024 dengan kualitas animasi terbaik dari Studio MAPPA.",
      en: "Chainsaw Man movie adapted from Reze Arc will be released in 2024 with top-quality animation from Studio MAPPA."
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    category: "anime",
    categories: ["anime", "berita", "movie"], // Multiple categories
    tags: ["chainsaw-man", "mappa", "movie", "reze", "anime-2024"],
    author: "Koni",
    date: "20-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-20T10:00:00Z",
    readTime: 5,
    trendingScore: 9
  },
  {
    id: "jujutsu-kaisen-season-3-announcement",
    title: {
      id: "Jujutsu Kaisen Season 3 Resmi Diumumkan - Arc Culling Game Dimulai!",
      en: "Jujutsu Kaisen Season 3 Officially Announced - Culling Game Arc Begins!"
    },
    slug: "jujutsu-kaisen-season-3-culling-game",
    excerpt: {
      id: "Setelah kesuksesan season 2, Studio MAPPA mengonfirmasi produksi Jujutsu Kaisen Season 3.",
      en: "Following the success of season 2, Studio MAPPA confirms Jujutsu Kaisen Season 3 production."
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    category: "anime",
    categories: ["anime", "berita"], // Multiple categories
    tags: ["jujutsu-kaisen", "mappa", "season-3", "culling-game"],
    author: "Koni",
    date: "19-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-19T15:30:00Z",
    readTime: 4,
    trendingScore: 8
  },
  {
    id: "demon-slayer-final-season-review",
    title: {
      id: "Ulasan Demon Slayer: Hashira Training Arc - Persiapan Menuju Final Battle",
      en: "Demon Slayer: Hashira Training Arc Review - Preparation for Final Battle"
    },
    slug: "demon-slayer-hashira-training-arc-review",
    excerpt: {
      id: "Arc pelatihan Hashira memberikan development karakter yang mendalam sebelum pertarungan final.",
      en: "The Hashira training arc provides deep character development before the final battle."
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    category: "ulasan",
    categories: ["ulasan", "anime"], // Multiple categories
    tags: ["demon-slayer", "hashira", "review", "anime-review"],
    author: "Koni",
    date: "18-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-18T12:00:00Z",
    readTime: 6,
    trendingScore: 7
  },
  {
    id: "one-piece-manga-chapter-1100",
    title: {
      id: "One Piece Chapter 1100: Revelasi Masa Lalu Kuma yang Mengharukan",
      en: "One Piece Chapter 1100: Heartbreaking Kuma's Past Revelation"
    },
    slug: "one-piece-chapter-1100-kuma-past",
    excerpt: {
      id: "Eiichiro Oda memberikan backstory Kuma yang sangat emosional dalam chapter terbaru.",
      en: "Eiichiro Oda delivers highly emotional Kuma backstory in the latest chapter."
    },
    image: "https://images.unsplash.com/photo-1614732414444-096040ec8756?w=800&h=600&fit=crop&auto=format",
    category: "komik",
    categories: ["komik", "berita"], // Multiple categories
    tags: ["one-piece", "manga", "kuma", "backstory"],
    author: "Koni",
    date: "17-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-17T09:00:00Z",
    readTime: 3,
    trendingScore: 6
  },
  {
    id: "genshin-impact-fontaine-update",
    title: {
      id: "Genshin Impact 4.3: Update Fontaine Terbesar dengan Karakter Baru",
      en: "Genshin Impact 4.3: Biggest Fontaine Update with New Characters"
    },
    slug: "genshin-impact-fontaine-update-4-3",
    excerpt: {
      id: "Update terbesar Fontaine menghadirkan karakter baru dan storyline yang mencengangkan.",
      en: "The biggest Fontaine update brings new characters and stunning storyline."
    },
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop&auto=format",
    category: "game",
    categories: ["game", "berita"], // Multiple categories
    tags: ["genshin-impact", "fontaine", "update", "gacha"],
    author: "Koni",
    date: "16-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-16T14:00:00Z",
    readTime: 7,
    trendingScore: 5
  },
  {
    id: "studio-ghibli-new-movie-2024",
    title: {
      id: "Studio Ghibli Umumkan Film Baru 2024: 'The Boy and the Heron' Sequel",
      en: "Studio Ghibli Announces New 2024 Movie: 'The Boy and the Heron' Sequel"
    },
    slug: "studio-ghibli-new-movie-boy-heron-sequel",
    excerpt: {
      id: "Hayao Miyazaki kembali dengan sekuel dari film pemenang Oscar 'The Boy and the Heron'.",
      en: "Hayao Miyazaki returns with sequel to Oscar-winning 'The Boy and the Heron'."
    },
    image: "https://images.unsplash.com/photo-1489599735734-79b4fc7c1598?w=800&h=600&fit=crop&auto=format",
    category: "movie",
    categories: ["movie", "berita", "anime"], // Multiple categories
    tags: ["studio-ghibli", "miyazaki", "movie", "sequel"],
    author: "Koni",
    date: "15-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-15T11:30:00Z",
    readTime: 5,
    trendingScore: 8
  },
  {
    id: "attack-on-titan-final-season-review",
    title: {
      id: "Ulasan Attack on Titan Final Season: Ending yang Kontroversial namun Memuaskan",
      en: "Attack on Titan Final Season Review: Controversial yet Satisfying Ending"
    },
    slug: "attack-on-titan-final-season-review",
    excerpt: {
      id: "Analisis mendalam tentang ending Attack on Titan dan dampaknya terhadap fanbase.",
      en: "In-depth analysis of Attack on Titan's ending and its impact on the fanbase."
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    category: "ulasan",
    categories: ["ulasan", "anime"], // Multiple categories
    tags: ["attack-on-titan", "final-season", "review", "ending"],
    author: "Koni",
    date: "14-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-14T16:45:00Z",
    readTime: 8,
    trendingScore: 7
  },
  {
    id: "rekomendasi-anime-winter-2024",
    title: {
      id: "10 Rekomendasi Anime Winter 2024 yang Wajib Ditonton",
      en: "10 Must-Watch Winter 2024 Anime Recommendations"
    },
    slug: "rekomendasi-anime-winter-2024",
    excerpt: {
      id: "Daftar anime terbaik musim winter 2024 yang tidak boleh dilewatkan para otaku.",
      en: "List of best winter 2024 anime that otaku shouldn't miss."
    },
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop&auto=format",
    category: "rekomendasi",
    categories: ["rekomendasi", "anime"], // Multiple categories
    tags: ["anime", "winter-2024", "recommendation", "seasonal"],
    author: "Koni",
    date: "13-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-13T13:20:00Z",
    readTime: 10,
    trendingScore: 6
  },
  {
    id: "manga-sales-2024-report",
    title: {
      id: "Laporan Penjualan Manga 2024: One Piece Masih Mendominasi",
      en: "2024 Manga Sales Report: One Piece Still Dominates"
    },
    slug: "manga-sales-report-2024",
    excerpt: {
      id: "Analisis lengkap tentang penjualan manga tahun 2024 dan tren industri terkini.",
      en: "Complete analysis of 2024 manga sales and current industry trends."
    },
    image: "https://images.unsplash.com/photo-1614732414444-096040ec8756?w=800&h=600&fit=crop&auto=format",
    category: "berita",
    categories: ["berita", "komik"], // Multiple categories
    tags: ["manga", "sales", "industry", "one-piece"],
    author: "Koni",
    date: "12-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-12T08:15:00Z",
    readTime: 6,
    trendingScore: 4
  },
  {
    id: "gaming-industry-anime-influence",
    title: {
      id: "Pengaruh Anime dalam Industri Gaming Modern: Dari Visual Novel hingga Gacha",
      en: "Anime Influence in Modern Gaming Industry: From Visual Novels to Gacha"
    },
    slug: "anime-influence-gaming-industry",
    excerpt: {
      id: "Bagaimana anime membentuk dan mempengaruhi perkembangan industri gaming modern.",
      en: "How anime shapes and influences the development of modern gaming industry."
    },
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop&auto=format",
    category: "berita",
    categories: ["berita", "game", "anime"], // Multiple categories
    tags: ["anime", "gaming", "industry", "gacha", "visual-novel"],
    author: "Koni",
    date: "11-12-2024", // DD-MM-YYYY format
    dateISO: "2024-12-11T17:00:00Z",
    readTime: 9,
    trendingScore: 5
  }
];

// Helper function to get all articles
export function getAllArticles(): Article[] {
  return mockArticles;
}

// Helper function to get articles by category (supports multiple categories)
export function getArticlesByCategory(category: string): Article[] {
  if (category === 'semua') {
    return mockArticles;
  }
  
  return mockArticles.filter(article => 
    article.category === category || 
    (article.categories && article.categories.includes(category))
  );
}

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find(article => article.slug === slug);
}

// Helper function to get trending articles
export function getTrendingArticles(limit: number = 5): Article[] {
  return [...mockArticles]
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0))
    .slice(0, limit);
}

// Helper function to get recent articles
export function getRecentArticles(limit: number = 5): Article[] {
  return [...mockArticles]
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, limit);
}

// Helper function to get related articles
export function getRelatedArticles(article: Article, limit: number = 3): Article[] {
  const related = mockArticles.filter(a => {
    if (a.id === article.id) return false;
    
    // Check if articles share category or categories
    const hasSharedCategory = a.category === article.category ||
      (article.categories && article.categories.includes(a.category)) ||
      (a.categories && a.categories.includes(article.category)) ||
      (article.categories && a.categories && 
       article.categories.some(cat => a.categories!.includes(cat)));
    
    // Check if articles share tags
    const hasSharedTags = a.tags.some(tag => article.tags.includes(tag));
    
    return hasSharedCategory || hasSharedTags;
  });
  
  // Sort by relevance (more shared tags = higher relevance)
  related.sort((a, b) => {
    const aSharedTags = a.tags.filter(tag => article.tags.includes(tag)).length;
    const bSharedTags = b.tags.filter(tag => article.tags.includes(tag)).length;
    return bSharedTags - aSharedTags;
  });
  
  return related.slice(0, limit);
}