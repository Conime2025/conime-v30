import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'website' | 'organization' | 'article';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    let structuredData: any = {};

    switch (type) {
      case 'website':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Conime",
          "description": "Portal berita anime, manga, komik, film dan game terpercaya",
          "url": "https://conime.id",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://conime.id/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
        break;
        
      case 'organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Conime",
          "description": "Portal berita anime, manga, komik, film dan game terpercaya",
          "url": "https://conime.id",
          "logo": "https://conime.id/logo.png",
          "sameAs": [
            "https://twitter.com/conime",
            "https://instagram.com/conime",
            "https://youtube.com/conime",
            "https://discord.gg/conime"
          ]
        };
        break;
        
      case 'article':
        if (data) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.title,
            "description": data.description,
            "author": {
              "@type": "Person",
              "name": data.author || "Koni"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Conime",
              "logo": {
                "@type": "ImageObject",
                "url": "https://conime.id/logo.png"
              }
            },
            "datePublished": data.datePublished,
            "dateModified": data.dateModified || data.datePublished,
            "image": data.image,
            "url": data.url
          };
        }
        break;
    }

    if (Object.keys(structuredData).length > 0) {
      // Remove existing structured data of this type
      const existingScript = document.querySelector(`script[data-type="${type}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-type', type);
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [type, data]);

  return null;
}