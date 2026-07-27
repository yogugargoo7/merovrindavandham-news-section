import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SEOContent.css';

const MVDA_HOME = 'https://mvdamathura.com/';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const META_IMAGE_API = 'https://api.microlink.io/?meta=false&screenshot=false&url=';
const NEWS_CACHE_KEY = 'mvd_live_hindi_news_cache_v2';
const NEWS_REFRESH_MS = 60 * 60 * 1000;
const NEWS_MAX_AGE_DAYS = 30;
const NEWS_MAX_AGE_MS = NEWS_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
const NEWS_FRESH_AGE_MS = 24 * 60 * 60 * 1000;
const NEWS_MIN_VISIBLE = 20;

const NEWS_IMAGE_FALLBACKS = {
  top: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
  mvda: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
  mandir: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80',
  vrindavan: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80',
  connectivity: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80',
  property: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
  project: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80',
};

const NEWS_FEEDS = [
  {
    cat: 'top',
    category: 'टॉप न्यूज़',
    source: 'मुख्य समाचार',
    query: '(Mathura OR Vrindavan OR "Jewar Airport" OR "Yamuna Expressway" OR "Banke Bihari" OR मथुरा OR वृंदावन OR जेवर एयरपोर्ट OR यमुना एक्सप्रेसवे OR बांके बिहारी)',
    image: NEWS_IMAGE_FALLBACKS.top,
  },
  {
    cat: 'mvda',
    category: 'एमवीडीए / मथुरा',
    source: 'गूगल न्यूज़',
    query: '("Mathura Vrindavan Development Authority" OR MVDA OR mvdamathura OR मथुरा वृंदावन विकास प्राधिकरण OR एमवीडीए)',
    image: NEWS_IMAGE_FALLBACKS.mvda,
  },
  {
    cat: 'mandir',
    category: 'मंदिर / कॉरिडोर',
    source: 'गूगल न्यूज़',
    query: '("Banke Bihari" OR "Banke Bihari corridor" OR "Vrindavan temple" OR "Prem Mandir" OR बांके बिहारी OR मंदिर कॉरिडोर OR प्रेम मंदिर)',
    image: NEWS_IMAGE_FALLBACKS.mandir,
  },
  {
    cat: 'vrindavan',
    category: 'वृंदावन न्यूज़',
    source: 'गूगल न्यूज़',
    query: '(Vrindavan OR Mathura OR वृंदावन OR मथुरा) (development OR tourism OR corridor OR विकास OR पर्यटन)',
    image: NEWS_IMAGE_FALLBACKS.vrindavan,
  },
  {
    cat: 'connectivity',
    category: 'जेवर / एक्सप्रेसवे',
    source: 'गूगल न्यूज़',
    query: '("Jewar Airport" OR "Noida International Airport" OR "Yamuna Expressway" OR जेवर एयरपोर्ट OR यमुना एक्सप्रेसवे)',
    image: NEWS_IMAGE_FALLBACKS.connectivity,
  },
  {
    cat: 'connectivity',
    category: 'जेवर एयरपोर्ट',
    source: 'मुख्य समाचार',
    query: '("Jewar Airport" OR "Noida International Airport" OR "Yamuna Expressway" OR जेवर एयरपोर्ट) (Times of India OR Hindustan Times OR Indian Express OR NDTV OR Amar Ujala OR Dainik Jagran OR Live Hindustan OR Zee News)',
    image: NEWS_IMAGE_FALLBACKS.connectivity,
  },
  {
    cat: 'property',
    category: 'प्रॉपर्टी मार्केट',
    source: 'गूगल न्यूज़',
    query: '("Yamuna Expressway" OR "Jewar Airport" OR Mathura OR Vrindavan OR यमुना एक्सप्रेसवे OR मथुरा OR वृंदावन) (property OR real estate OR plots OR प्रॉपर्टी OR प्लॉट)',
    image: NEWS_IMAGE_FALLBACKS.property,
  },
  {
    cat: 'property',
    category: 'रियल एस्टेट',
    source: 'बिज़नेस न्यूज़',
    query: '("Yamuna Expressway" OR "Jewar Airport" OR Mathura OR Vrindavan) (real estate OR property OR investment OR plots OR Economic Times OR Moneycontrol OR Business Standard)',
    image: NEWS_IMAGE_FALLBACKS.property,
  },
  {
    cat: 'top',
    category: 'हिंदी न्यूज़',
    source: 'हिंदी न्यूज़ चैनल',
    query: '(Mathura OR Vrindavan OR "Jewar Airport" OR "Yamuna Expressway" OR "Banke Bihari" OR मथुरा OR वृंदावन OR जेवर एयरपोर्ट OR यमुना एक्सप्रेसवे) (Amar Ujala OR Dainik Jagran OR Live Hindustan OR Navbharat Times OR Zee News OR TOI OR HT)',
    image: NEWS_IMAGE_FALLBACKS.top,
  },
];

const FALLBACK_NEWS = [];

const FILTERS = [
  { label: 'Sabhi', value: 'all' },
  { label: 'टॉप चैनल', value: 'top' },
  { label: 'एमवीडीए', value: 'mvda' },
  { label: 'मंदिर न्यूज़', value: 'mandir' },
  { label: 'वृंदावन', value: 'vrindavan' },
  { label: 'जेवर / एक्सप्रेसवे', value: 'connectivity' },
  { label: 'प्रॉपर्टी', value: 'property' },
  { label: 'प्रोजेक्ट', value: 'project' },
];

const CARD_WIDTH = 376;

const cleanText = (value = '') => value
  .replace(/<[^>]*>/g, ' ')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .replace(/^[-•\s]+/, '')
  .trim();

const truncateText = (value = '', length = 260) => {
  const clean = cleanText(value);
  return clean.length > length ? `${clean.slice(0, length).trim()}...` : clean;
};

const getTodayLabel = () => new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date());

const timeAgo = (dateValue) => {
  if (!dateValue) return 'Live';
  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return 'Live';
  const diffMinutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays} days ago`;
};

const googleNewsRssUrl = (query, window = '1d') => (
  `https://news.google.com/rss/search?q=${encodeURIComponent(`${query} when:${window}`)}&hl=en-IN&gl=IN&ceid=IN:en`
);

const hasHindiText = (value = '') => /[\u0900-\u097F]/.test(value);

const isUsefulNews = (item) => {
  const haystack = `${item.titleHi} ${item.titleEn}`.toLowerCase();
  return hasHindiText(haystack)
    || /mathura|vrindavan|jewar|yamuna expressway|banke bihari|mvda|noida international airport|prem mandir|plot|plots|property|real estate/.test(haystack);
};

const getImageFromHtml = (html = '') => {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] || '';
};

const getXmlText = (node, selector) => cleanText(node.querySelector(selector)?.textContent || '');

const getXmlImage = (node) => {
  const mediaContent = node.getElementsByTagName('media:content')?.[0];
  const mediaThumbnail = node.getElementsByTagName('media:thumbnail')?.[0];
  return mediaContent?.getAttribute('url')
    || mediaThumbnail?.getAttribute('url')
    || getImageFromHtml(getXmlText(node, 'description'))
    || '';
};

const getRssImage = (item) => (
  item.thumbnail
  || item.enclosure?.link
  || item.enclosure?.url
  || item.enclosure?.thumbnail
  || item['media:thumbnail']?.url
  || getImageFromHtml(item.description)
  || getImageFromHtml(item.content)
  || ''
);

const normalizeRssItem = (item, feed, index) => {
  const rssImage = getRssImage(item);
  const title = cleanText(item.title);

  return {
    id: `${feed.cat}-${item.guid || item.link || index}`,
    cat: feed.cat,
    category: feed.category,
    titleHi: title,
    titleEn: truncateText(item.description || item.content || title, 300),
    source: cleanText(item.author || item.feed?.title || feed.source),
    time: timeAgo(item.pubDate),
    image: rssImage || feed.image || NEWS_IMAGE_FALLBACKS[feed.cat],
    needsImageResolve: !rssImage,
    url: item.link,
    pubDate: item.pubDate ? new Date(item.pubDate).getTime() : 0,
  };
};

const resolveArticleImage = async (item) => {
  if (!item.needsImageResolve) return item;

  try {
    const response = await fetch(`${META_IMAGE_API}${encodeURIComponent(item.url)}`);
    if (!response.ok) return item;
    const data = await response.json();
    const resolvedImage = data?.data?.image?.url || data?.data?.logo?.url;
    return resolvedImage ? { ...item, image: resolvedImage, needsImageResolve: false } : item;
  } catch {
    return item;
  }
};

const enrichNewsImages = async (items) => Promise.all(items.map(resolveArticleImage));

const fetchRssFeedWindow = async (feed, window) => {
  const rssUrl = googleNewsRssUrl(feed.query, window);

  try {
    const response = await fetch(`${RSS_API}${encodeURIComponent(rssUrl)}`);
    if (!response.ok) throw new Error(`RSS2JSON failed: ${feed.query}`);
    const data = await response.json();
    if (data.status === 'ok' && Array.isArray(data.items)) {
      const items = data.items
        .map((item, index) => normalizeRssItem(item, feed, index))
        .filter(isUsefulNews)
        .slice(0, 20);
      if (items.length) return items;
    }
  } catch {
    // Fall through to raw RSS parser.
  }

  const rawResponse = await fetch(`${CORS_PROXY}${encodeURIComponent(rssUrl)}`);
  if (!rawResponse.ok) throw new Error(`Raw RSS failed: ${feed.query}`);
  const xmlText = await rawResponse.text();
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const items = Array.from(doc.querySelectorAll('item'));

  return items
    .map((node, index) => {
      const title = getXmlText(node, 'title');
      const description = getXmlText(node, 'description');
      const link = getXmlText(node, 'link');
      const pubDate = getXmlText(node, 'pubDate');
      const source = getXmlText(node, 'source') || feed.source;
      const rssImage = getXmlImage(node);

      return {
        id: `${feed.cat}-xml-${link || title || index}`,
        cat: feed.cat,
        category: feed.category,
        titleHi: title,
        titleEn: truncateText(description || title, 300),
        source,
        time: timeAgo(pubDate),
        image: rssImage || feed.image || NEWS_IMAGE_FALLBACKS[feed.cat],
        needsImageResolve: !rssImage,
        url: link || googleNewsRssUrl(feed.query),
        pubDate: pubDate ? new Date(pubDate).getTime() : 0,
      };
    })
    .filter((item) => item.titleHi && item.url && isUsefulNews(item))
    .slice(0, 20);
};

const fetchRssFeed = async (feed) => {
  const windows = ['1d', '7d', '30d'];
  const allItems = [];

  for (const window of windows) {
    try {
      allItems.push(...await fetchRssFeedWindow(feed, window));
      if (allItems.length >= NEWS_MIN_VISIBLE) break;
    } catch {
      // Try the next date window.
    }
  }

  return uniqueByUrlOrTitle(allItems).slice(0, 30);
};

const fetchMvdaUpdates = async () => {
  const response = await fetch(`${CORS_PROXY}${encodeURIComponent(MVDA_HOME)}`);
  if (!response.ok) throw new Error('MVDA fetch failed');
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const links = Array.from(doc.querySelectorAll('a'));
  const keywords = /tender|nit-|ots|corrigendum|eoi|master plan|colony|allotment|sajra|योजना|उपविधि|सूचना|निविदा/i;

  return links
    .map((link, index) => {
      const title = cleanText(link.textContent);
      if (!title || title.length < 4 || !keywords.test(title)) return null;

      return {
        id: `mvda-official-${index}-${title}`,
        cat: 'mvda',
        category: 'एमवीडीए आधिकारिक',
        titleHi: title,
        titleEn: 'मथुरा-वृंदावन विकास प्राधिकरण की आधिकारिक सूचना। मूल नोटिस, टेंडर, योजना या सर्कुलर देखने के लिए क्लिक करें।',
        source: 'mvdamathura.com',
        time: 'आधिकारिक लाइव',
        image: NEWS_IMAGE_FALLBACKS.mvda,
        url: new URL(link.getAttribute('href') || '/', MVDA_HOME).href,
        pubDate: Date.now() + index,
      };
    })
    .filter(Boolean)
    .slice(0, 10);
};

const uniqueByUrlOrTitle = (items) => {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.url}|${item.titleHi.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const isRecentNews = (item) => {
  if (!item.pubDate) return item.cat === 'mvda';
  return Date.now() - item.pubDate <= NEWS_MAX_AGE_MS;
};

const isFreshNews = (item) => {
  if (!item.pubDate) return false;
  return Date.now() - item.pubDate <= NEWS_FRESH_AGE_MS;
};

const getCachedNews = () => {
  try {
    const cached = window.localStorage.getItem(NEWS_CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
      const validItems = Array.isArray(parsed?.items)
      ? parsed.items.filter((item) => item?.image && item?.url && item?.titleHi && isRecentNews(item))
      : [];
    return validItems.length ? { ...parsed, items: validItems } : null;
  } catch {
    return null;
  }
};

const setCachedNews = (items) => {
  try {
    window.localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({
      savedAt: new Date().toISOString(),
      items,
    }));
  } catch {
    // Cache is optional; live fetch should continue even if storage is unavailable.
  }
};

const NewsSection = () => {
  const [cachedNews] = useState(() => getCachedNews());
  const [liveNews, setLiveNews] = useState(() => cachedNews?.items || FALLBACK_NEWS);
  const [activeCat, setActiveCat] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(() => !cachedNews);
  const [lastUpdated, setLastUpdated] = useState(() => (
    cachedNews
      ? new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: 'short',
      }).format(new Date(cachedNews.savedAt))
      : ''
  ));
  const autoRef = useRef(null);
  const cardsRef = useRef(null);
  const todayLabel = useMemo(() => getTodayLabel(), []);

  useEffect(() => {
    let isMounted = true;

    const loadLiveNews = async () => {
      setIsLoading(!cachedNews);
      const results = await Promise.allSettled([
        fetchMvdaUpdates(),
        ...NEWS_FEEDS.map(fetchRssFeed),
      ]);

      const nextNews = uniqueByUrlOrTitle(
        results
          .filter((result) => result.status === 'fulfilled')
          .flatMap((result) => result.value)
          .filter((item) => item.titleHi && item.url)
          .filter(isRecentNews)
          .sort((a, b) => {
            const freshPriority = Number(isFreshNews(b)) - Number(isFreshNews(a));
            if (freshPriority !== 0) return freshPriority;
            return (b.pubDate || 0) - (a.pubDate || 0);
          }),
      );

      const newsWithImages = nextNews.length ? await enrichNewsImages(nextNews) : [];

      if (isMounted) {
        setLiveNews(newsWithImages.length ? newsWithImages : []);
        if (newsWithImages.length) setCachedNews(newsWithImages);
        setLastUpdated(new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short',
        }).format(new Date()));
        setIsLoading(false);
      }
    };

    loadLiveNews();
    const refreshId = window.setInterval(loadLiveNews, NEWS_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(refreshId);
    };
  }, [cachedNews]);

  const filtered = useMemo(
    () => activeCat === 'all' ? liveNews : liveNews.filter((item) => item.cat === activeCat),
    [activeCat, liveNews],
  );

  const visibleNews = filtered.length ? filtered : liveNews;
  const active = visibleNews[activeIndex] || visibleNews[0] || null;

  const goToIndex = useCallback((index) => {
    const total = visibleNews.length || 1;
    const nextIndex = (index + total) % total;
    setActiveIndex(nextIndex);
    cardsRef.current?.scrollTo({
      left: nextIndex * CARD_WIDTH,
      behavior: 'smooth',
    });
  }, [visibleNews.length]);

  const startAuto = useCallback(() => {
    window.clearInterval(autoRef.current);
    autoRef.current = window.setInterval(() => {
      goToIndex(activeIndex + 1);
    }, 4200);
  }, [activeIndex, goToIndex]);

  const handleFilterChange = useCallback((value) => {
    setActiveCat(value);
    setActiveIndex(0);
    cardsRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    startAuto();
    return () => window.clearInterval(autoRef.current);
  }, [startAuto]);

  const openNews = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="news" className="news-section reveal-on-scroll">
      <div className="news-shell">
        <div className="news-head">
          <div className="news-head-left">
            <span className="news-live-dot" aria-hidden="true" />
            <div>
              <h2 className="news-head-title">लाइव न्यूज़ - एमवीडीए, मथुरा और वृंदावन</h2>
              <p className="news-head-sub">
                आज की ताज़ा खबरें पहले, हर 15 मिनट में ऑटो अपडेट - {todayLabel}
              </p>
            </div>
          </div>

          <div className="news-head-actions">
            <div className="news-filters" aria-label="Live news filters">
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  className={`news-filter-btn${activeCat === filter.value ? ' active' : ''}`}
                  onClick={() => handleFilterChange(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <span className="news-count">
              {isLoading ? 'लाइव खबरें लोड हो रही हैं...' : `${visibleNews.length} लाइव अपडेट - हर 1 घंटे रिफ्रेश`}
            </span>
          </div>
        </div>

        <div className="news-ticker">
          <span className="news-ticker-label">लाइव</span>
          <div className="news-ticker-track">
            <div className="news-ticker-inner">
              {(visibleNews.length ? [...visibleNews, ...visibleNews] : []).map((item, index) => (
                <button
                  type="button"
                  className="news-ticker-item"
                  key={`${item.id}-${index}`}
                  onClick={() => openNews(item.url)}
                >
                  <span className={`news-category-pill ${item.cat}`}>{item.category}</span>
                  {item.titleHi}
                  <span className="news-ticker-sep" aria-hidden="true">.</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="news-live-grid"
          onMouseEnter={() => window.clearInterval(autoRef.current)}
          onMouseLeave={startAuto}
        >
          {active ? (
            <article className="news-lead-card" onClick={() => openNews(active.url)}>
              <img
                src={active.image}
                alt={active.titleEn}
                loading="lazy"
                decoding="async"
                onError={(event) => {
                  event.currentTarget.src = NEWS_IMAGE_FALLBACKS[active.cat] || NEWS_IMAGE_FALLBACKS.top;
                }}
              />
              <div className="news-lead-overlay">
                <span className={`news-card-cat ${active.cat}`}>{active.category}</span>
                <h3>{active.titleHi}</h3>
                <p>{active.titleEn}</p>
                <div className="news-lead-meta">
                  <span>{active.source}</span>
                  <span>{active.time}</span>
                </div>
              </div>
            </article>
          ) : (
            <div className="news-empty-state">
              <span className="news-live-dot" aria-hidden="true" />
              <h3>लाइव हिंदी खबरें लोड हो रही हैं</h3>
              <p>एमवीडीए, मथुरा, वृंदावन, जेवर एयरपोर्ट और यमुना एक्सप्रेसवे से जुड़ी खबरें स्रोत इमेज के साथ अपने आप दिखेंगी।</p>
            </div>
          )}

          <div className="news-side-panel">
            <div className="news-side-top">
              <span>लाइव न्यूज़ डेस्क</span>
              <strong>{lastUpdated || todayLabel}</strong>
            </div>
            {visibleNews.slice(0, 4).map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`news-live-row${index === activeIndex ? ' active' : ''}`}
                onClick={() => openNews(item.url)}
              >
                <span className={`news-row-dot ${item.cat}`} />
                <span>
                  {item.titleHi}
                  <small>{item.source} - {item.time}</small>
                </span>
              </button>
            ))}
            <Link
              className="news-whatsapp-cta"
              to="/contact"
            >
              प्रोजेक्ट पर असर पूछें
            </Link>
          </div>
        </div>

        <div className="news-cards-section">
          <button
            type="button"
            className="news-arrow news-arrow-left"
            aria-label="Previous live update"
            onClick={() => goToIndex(activeIndex - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="news-cards-wrap" ref={cardsRef}>
            {visibleNews.map((item, index) => (
              <article
                className={`news-card${index === activeIndex ? ' active' : ''}`}
                key={item.id}
                onClick={() => openNews(item.url)}
              >
                <img
                  className="news-card-img"
                src={item.image}
                  alt={item.titleEn}
                  loading="lazy"
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = NEWS_IMAGE_FALLBACKS[item.cat] || NEWS_IMAGE_FALLBACKS.top;
                  }}
                />
                <div className="news-card-body">
                  <span className={`news-card-cat ${item.cat}`}>{item.category}</span>
                  <h3 className="news-card-title-hi">{item.titleHi}</h3>
                  <p className="news-card-title-en">{item.titleEn}</p>
                  <div className="news-card-footer">
                    <span className="news-card-source">{item.source}</span>
                    <span className="news-card-time">{item.time}</span>
                  </div>
                </div>
                <a
                  className="news-card-link"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  पूरी खबर पढ़ें
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="news-arrow news-arrow-right"
            aria-label="Next live update"
            onClick={() => goToIndex(activeIndex + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
