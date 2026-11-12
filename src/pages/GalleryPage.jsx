import { useState, useCallback, useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import { publicAsset } from '../utils/publicAsset';
import { lockScroll, unlockScroll } from '../utils/scrollLock';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import SplitText from '../components/fx/SplitText';
import './pages.css';
import './GalleryPage.css';

const photos = [
  { src: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'), alt: 'Drone View with MVD 3D layout', category: 'renders', label: 'Drone Township View' },
  { src: publicAsset('vrindavan-material/site-3d-view.webp'), alt: 'Mero Vrindavan Dham site 3D view', category: 'layout', label: 'Site 3D View' },
  { src: publicAsset('vrindavan-material/commercial-view.webp'), alt: 'Commercial plot zone render', category: 'commercial', label: 'Commercial Zone' },
  { src: publicAsset('vrindavan-material/entry-view-01.webp'), alt: 'Project entry view', category: 'renders', label: 'Project Entry' },
  { src: publicAsset('vrindavan-material/entry-view-02.webp'), alt: 'Premium entrance view', category: 'renders', label: 'Entrance Detail' },
  { src: publicAsset('vrindavan-material/entry-view-03.webp'), alt: 'Gateway view', category: 'renders', label: 'Gateway View' },
  { src: publicAsset('vrindavan-material/project-photo-03.webp'), alt: 'Mero Vrindavan Dham plot area view', category: 'site', label: 'Plot Area View' },
  { src: publicAsset('vrindavan-material/mvd-3-photos.webp'), alt: 'Mero Vrindavan Dham township site collage', category: 'site', label: 'Township Site Collage' },
  { src: publicAsset('vrindavan-material/mvd-photo-1.webp'), alt: 'Mero Vrindavan Dham project ground view', category: 'site', label: 'Project Ground View' },
];

const filters = [
  { key: 'all',      label: 'All Photos' },
  { key: 'site',     label: 'Site Photos' },
  { key: 'layout',   label: 'Layout & Map' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'renders',  label: 'Township Renders' },
];

const GALLERY_SEO = {
  title: 'Site Gallery | Mero Vrindavan Dham Township Photos',
  description: 'View real site photos of Mero Vrindavan Dham township in Vrindavan. See plot area, approach roads, site overview, strategic location near Yamuna Expressway and Prem Mandir.',
  canonical: 'https://merovrindavandham.com/gallery',
  ogUrl: 'https://merovrindavandham.com/gallery',
};

const GalleryPage = () => {
  useSEO(GALLERY_SEO);
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? photos : photos.filter((p) => p.category === active);

  const openLightbox = useCallback((idx) => setLightbox(idx), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : filtered.length - 1)), [filtered.length]);
  const nextPhoto = useCallback(() => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : 0)), [filtered.length]);
  const isOpen = lightbox !== null;

  // Window-level listener: a div onKeyDown only fires when focus is inside it,
  // so Escape/arrow keys would not work right after opening the lightbox.
  useEffect(() => {
    if (lightbox === null) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    if (!isOpen) return undefined;
    lockScroll();
    return unlockScroll;
  }, [isOpen]);

  return (
    <div>
      <PageBanner
        variant="gallery"
        crumb="Gallery"
        kicker="Photo Gallery"
        title={"See the Project\n*With Your Own Eyes*"}
        subtitle="Real site photos, approach roads, location maps and the spiritual surroundings of Mero Vrindavan Dham."
      />

      {/* Photo Grid */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Project Photos</span>
            <SplitText as="h2" className="display-l" text={"Site & Location\n*Gallery*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Browse drone views, 3D renders, site photos and township visuals — everything you need before booking a visit.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="gl-filters" role="tablist" aria-label="Filter photos" data-reveal="up">
            {filters.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={active === f.key}
                className={`gl-filter${active === f.key ? ' gl-filter--active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
                <sup>{f.key === 'all' ? photos.length : photos.filter((p) => p.category === f.key).length}</sup>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gl-grid" key={active} data-reveal="stagger">
            {filtered.map((photo, idx) => (
              <button
                key={photo.src + idx}
                className="gl-item"
                onClick={() => openLightbox(idx)}
                aria-label={`Open ${photo.alt}`}
              >
                <div className="media gl-item__media">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <div className="gl-item__overlay">
                  <span className="gl-item__index">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="gl-item__label">{photo.label}</span>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Site Visit</span>
            <SplitText as="h2" className="display-l" text={"Walk the Project\n*in Person*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Photos help you shortlist the project. A guided site visit gives you the clearest view of roads, plots, surroundings and current availability.
            </p>
          </div>
          <div className="media gl-video" data-reveal="img">
            <video
              src={publicAsset('vrindavan-material/mvd-site-web.mp4')}
              poster={publicAsset('vrindavan-material/site-3d-view.webp')}
              className="gallery-video"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      </section>

      <CtaStrip
        title={"Want to See It\n*In Person?*"}
        sub="Schedule a free site visit — our team will take you through the entire plot area and answer every question."
        primary={{ to: '/contact', label: 'Book Site Visit' }}
        secondary={{ to: '/plots', label: 'View Plot Options' }}
      />

      {/* Lightbox */}
      {isOpen && (
        <div className="gl-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo viewer" data-lenis-prevent>
          <button className="gl-lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="gl-lightbox__nav gl-lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }} aria-label="Previous">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <figure className="gl-lightbox__content" onClick={(e) => e.stopPropagation()} key={filtered[lightbox].src}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} />
            <figcaption className="gl-lightbox__caption">{filtered[lightbox].alt}</figcaption>
          </figure>
          <button className="gl-lightbox__nav gl-lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }} aria-label="Next">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="gl-lightbox__counter">
            <b>{String(lightbox + 1).padStart(2, '0')}</b> / {String(filtered.length).padStart(2, '0')}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
