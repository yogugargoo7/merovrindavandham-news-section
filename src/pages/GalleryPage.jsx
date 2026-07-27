import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import { publicAsset } from '../utils/publicAsset';
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
  useReveal();
  useSEO(GALLERY_SEO);
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'all' ? photos : photos.filter((p) => p.category === active);

  const openLightbox = useCallback((idx) => setLightbox(idx), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevPhoto = useCallback(() => setLightbox((i) => (i > 0 ? i - 1 : filtered.length - 1)), [filtered.length]);
  const nextPhoto = useCallback(() => setLightbox((i) => (i < filtered.length - 1 ? i + 1 : 0)), [filtered.length]);

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

  return (
    <div>
      {/* Banner */}
      <div className="page-banner page-banner--gallery">
        <div className="page-banner__content">
          <div className="page-banner__breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-banner__breadcrumb-sep">/</span>
            <span>Gallery</span>
          </div>
          <div className="page-banner__kicker">Photo Gallery</div>
          <h1 className="page-banner__title">See the Project<br />With Your Own Eyes</h1>
          <p className="page-banner__subtitle">Real site photos, approach roads, location maps and the spiritual surroundings of Mero Vrindavan Dham.</p>
        </div>
        <div className="page-banner__line"></div>
      </div>

      {/* Photo Grid */}
      <section className="inner-section inner-section--white reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Project Photos</span>
            <h2 className="inner-title">Site & Location Gallery</h2>
            <p className="inner-desc">Browse drone views, 3D renders, site photos and township visuals — everything you need before booking a visit.</p>
          </div>

          {/* Filter Tabs */}
          <div className="gallery-filters">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`gallery-filter-btn${active === f.key ? ' gallery-filter-btn--active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid stagger-children">
            {filtered.map((photo, idx) => (
              <button
                key={photo.src + idx}
                className="gallery-item"
                onClick={() => openLightbox(idx)}
                aria-label={`Open ${photo.alt}`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
                <div className="gallery-item__overlay">
                  <span className="gallery-item__label">{photo.label}</span>
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Section */}
      <section className="inner-section inner-section--gray reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Site Visit</span>
            <h2 className="inner-title">Walk the Project in Person</h2>
            <p className="inner-desc">Photos help you shortlist the project. A guided site visit gives you the clearest view of roads, plots, surroundings and current availability.</p>
          </div>
          <div className="gallery-video-wrap">
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

      {/* CTA */}
      <div className="page-cta-strip page-cta-strip--gallery">
        <h2 className="page-cta-strip__title">Want to See It In Person?</h2>
        <p className="page-cta-strip__sub">Schedule a free site visit — our team will take you through the entire plot area and answer every question.</p>
        <div className="page-cta-strip__buttons">
          <Link to="/contact" className="page-cta-btn page-cta-btn--primary">Book Site Visit</Link>
          <Link to="/plots" className="page-cta-btn page-cta-btn--secondary">View Plot Options</Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gallery-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button className="gallery-lightbox__close" onClick={closeLightbox} aria-label="Close">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button className="gallery-lightbox__nav gallery-lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }} aria-label="Previous">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="gallery-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} />
            <div className="gallery-lightbox__caption">{filtered[lightbox].alt}</div>
          </div>
          <button className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }} aria-label="Next">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="gallery-lightbox__counter">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
