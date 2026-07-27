import { useEffect } from 'react';

export const useSEO = (seoData) => {
  useEffect(() => {
    // Update document title
    if (seoData.title) {
      document.title = seoData.title;
    }

    // Update meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      if (!content) return;
      
      const selector = `meta[${attribute}="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update link tags
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let link = document.querySelector(`link[rel="${rel}"]`);
      
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      
      link.setAttribute('href', href);
    };

    // Basic meta tags
    updateMetaTag('description', seoData.description);
    updateMetaTag('keywords', seoData.keywords);
    updateMetaTag('author', seoData.author);
    updateMetaTag('robots', seoData.robots);
    updateMetaTag('theme-color', seoData.themeColor);

    // Open Graph tags
    updateMetaTag('og:title', seoData.ogTitle, 'property');
    updateMetaTag('og:description', seoData.ogDescription, 'property');
    updateMetaTag('og:type', seoData.ogType, 'property');
    updateMetaTag('og:url', seoData.ogUrl, 'property');
    updateMetaTag('og:image', seoData.ogImage, 'property');
    updateMetaTag('og:image:alt', seoData.ogImageAlt, 'property');
    updateMetaTag('og:site_name', seoData.ogSiteName, 'property');
    updateMetaTag('og:locale', seoData.ogLocale, 'property');

    // Twitter tags
    updateMetaTag('twitter:card', seoData.twitterCard);
    updateMetaTag('twitter:title', seoData.twitterTitle);
    updateMetaTag('twitter:description', seoData.twitterDescription);
    updateMetaTag('twitter:image', seoData.twitterImage);
    updateMetaTag('twitter:image:alt', seoData.twitterImageAlt);

    // Geo tags
    updateMetaTag('geo.region', seoData.geoRegion);
    updateMetaTag('geo.placename', seoData.geoPlacename);
    updateMetaTag('geo.position', seoData.geoPosition);
    updateMetaTag('ICBM', seoData.icbm);

    // Language tags
    if (seoData.contentLanguage) {
      let meta = document.querySelector('meta[http-equiv="content-language"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'content-language');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', seoData.contentLanguage);
    }

    // Canonical URL
    updateLinkTag('canonical', seoData.canonical);

    // Alternate language links
    if (seoData.alternateLinks) {
      seoData.alternateLinks.forEach(({ hrefLang, href }) => {
        let link = document.querySelector(`link[hreflang="${hrefLang}"]`);
        if (!link) {
          link = document.createElement('link');
          link.setAttribute('rel', 'alternate');
          link.setAttribute('hreflang', hrefLang);
          document.head.appendChild(link);
        }
        link.setAttribute('href', href);
      });
    }

    // Structured Data
    if (seoData.structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#main-structured-data');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'main-structured-data');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seoData.structuredData);
    }

  }, [seoData]);
};

export default useSEO;
