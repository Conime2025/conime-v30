import { useEffect } from "react";

interface Article {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

interface StructuredDataProps {
  type: "website" | "article" | "organization";
  data?: {
    article?: Article;
  };
}

export function StructuredData({
  type,
  data,
}: StructuredDataProps) {
  useEffect(() => {
    const generateStructuredData = () => {
      let structuredData: any = {};

      if (type === "website") {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Conime",
          description:
            "Portal berita anime terpercaya dengan update terkini seputar dunia anime, review, dan rilis terbaru",
          url: "https://conime.com",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate:
                "https://conime.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
          publisher: {
            "@type": "Organization",
            name: "Conime",
            logo: {
              "@type": "ImageObject",
              url: "https://conime.com/logo.png",
            },
          },
        };
      } else if (type === "organization") {
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Conime",
          description: "Portal berita anime terpercaya",
          url: "https://conime.com",
          logo: "https://conime.com/logo.png",
          sameAs: [
            "https://twitter.com/conime",
            "https://instagram.com/conime",
            "https://youtube.com/conime",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: "Indonesian",
          },
        };
      } else if (type === "article" && data?.article) {
        const article = data.article;
        structuredData = {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: article.headline,
          description: article.description,
          image: article.image,
          datePublished: article.datePublished,
          dateModified:
            article.dateModified || article.datePublished,
          author: {
            "@type": "Person",
            name: article.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Conime",
            logo: {
              "@type": "ImageObject",
              url: "https://conime.com/logo.png",
            },
          },
          url: article.url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": article.url,
          },
        };
      }

      return structuredData;
    };

    const structuredData = generateStructuredData();

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(
        'script[type="application/ld+json"]',
      );
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
}