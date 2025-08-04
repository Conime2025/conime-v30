import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  siteName?: string;
  locale?: string;
  alternateLocale?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

export function SEOHead({ 
  title, 
  description, 
  keywords = '',
  url = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Koni',
  section,
  tags = [],
  siteName = 'CoNime',
  locale = 'id_ID',
  alternateLocale = 'en_US',
  twitterSite = '@conime',
  twitterCreator = '@koni'
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateOrCreateMeta = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic SEO meta tags
    updateOrCreateMeta('description', description);
    updateOrCreateMeta('robots', 'index, follow');
    if (keywords) {
      updateOrCreateMeta('keywords', keywords);
    }
    if (author) {
      updateOrCreateMeta('author', author);
    }

    // Theme color - responsive to dark/light mode
    const updateThemeColor = () => {
      let themeColorDark = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');
      let themeColorLight = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
      
      if (!themeColorDark) {
        themeColorDark = document.createElement('meta');
        themeColorDark.setAttribute('name', 'theme-color');
        themeColorDark.setAttribute('media', '(prefers-color-scheme: dark)');
        document.head.appendChild(themeColorDark);
      }
      
      if (!themeColorLight) {
        themeColorLight = document.createElement('meta');
        themeColorLight.setAttribute('name', 'theme-color');
        themeColorLight.setAttribute('media', '(prefers-color-scheme: light)');
        document.head.appendChild(themeColorLight);
      }
      
      themeColorDark.setAttribute('content', '#0b0b16'); // Dark theme bg
      themeColorLight.setAttribute('content', '#ffffff'); // Light theme bg
    };
    updateThemeColor();
    
    // Open Graph meta tags
    updateOrCreateMeta('og:title', title, true);
    updateOrCreateMeta('og:description', description, true);
    updateOrCreateMeta('og:type', type, true);
    updateOrCreateMeta('og:site_name', siteName, true);
    updateOrCreateMeta('og:locale', locale, true);
    updateOrCreateMeta('og:locale:alternate', alternateLocale, true);
    
    if (url) {
      updateOrCreateMeta('og:url', url, true);
    }
    
    // Default image jika tidak ada - gunakan absolute URL
    const baseUrl = 'https://conime.id';
    let imageUrl = image;
    
    // Jika image adalah relative path, ubah jadi absolute URL
    if (image && !image.startsWith('http')) {
      imageUrl = image.startsWith('/') ? `${baseUrl}${image}` : `${baseUrl}/${image}`;
    }
    
    // Default fallback image
    const defaultImage = imageUrl || `${baseUrl}/favicon.png`;
    
    updateOrCreateMeta('og:image', defaultImage, true);
    updateOrCreateMeta('og:image:secure_url', defaultImage, true);
    updateOrCreateMeta('og:image:width', '1200', true);
    updateOrCreateMeta('og:image:height', '630', true);
    updateOrCreateMeta('og:image:alt', `${title} - ${siteName}`, true);
    updateOrCreateMeta('og:image:type', 'image/jpeg', true);
    
    // Article specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        updateOrCreateMeta('article:published_time', publishedTime, true);
      }
      if (modifiedTime) {
        updateOrCreateMeta('article:modified_time', modifiedTime, true);
      }
      if (author) {
        updateOrCreateMeta('article:author', author, true);
      }
      if (section) {
        updateOrCreateMeta('article:section', section, true);
      }
      // Article tags
      if (tags.length > 0) {
        tags.forEach(tag => {
          const tagMeta = document.createElement('meta');
          tagMeta.setAttribute('property', 'article:tag');
          tagMeta.setAttribute('content', tag);
          document.head.appendChild(tagMeta);
        });
      }
    }
    
    // Twitter Card meta tags
    updateOrCreateMeta('twitter:card', 'summary_large_image');
    updateOrCreateMeta('twitter:title', title);
    updateOrCreateMeta('twitter:description', description);
    updateOrCreateMeta('twitter:site', twitterSite);
    updateOrCreateMeta('twitter:creator', twitterCreator);
    updateOrCreateMeta('twitter:image', defaultImage);
    updateOrCreateMeta('twitter:image:alt', `${title} - ${siteName}`);
    updateOrCreateMeta('twitter:domain', 'conime.id');
    
    if (url) {
      updateOrCreateMeta('twitter:url', url);
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    if (url) {
      canonical.href = url;
    }

    // Preload important images
    if (image && type === 'article') {
      let preloadLink = document.querySelector(`link[rel="preload"][href="${image}"]`) as HTMLLinkElement;
      if (!preloadLink) {
        preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = image;
        document.head.appendChild(preloadLink);
      }
    }

    // JSON-LD Structured Data
    const updateStructuredData = () => {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": type === 'article' ? 'Article' : 'WebSite',
        "name": title,
        "headline": title,
        "description": description,
        "url": url,
        "image": defaultImage,
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "url": "https://conime.id",
          "logo": {
            "@type": "ImageObject",
            "url": "https://conime.id/images/logo_conime_square300.png"
          }
        },
        ...(type === 'article' && {
          "author": {
            "@type": "Person",
            "name": author
          },
          "datePublished": publishedTime,
          "dateModified": modifiedTime || publishedTime,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })
      };

      script.textContent = JSON.stringify(structuredData);
    };
    updateStructuredData();
    
  }, [title, description, keywords, url, image, type, publishedTime, modifiedTime, author, section, tags, siteName, locale, alternateLocale, twitterSite, twitterCreator]);

  return null;
}