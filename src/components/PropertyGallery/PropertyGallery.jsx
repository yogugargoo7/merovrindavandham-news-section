import { useEffect, useMemo, useState } from 'react';
import './PropertyGallery.css';
import { publicAsset } from '../../utils/publicAsset';

const galleryItems = [
  {
    id: 'material-drone-view',
    title: 'Drone view with MVD 3D layout',
    description: 'The strongest new project visual for explaining scale, road planning and overall township positioning.',
    media: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'),
  },
  {
    id: 'material-site-3d',
    title: 'Site 3D view',
    description: 'A clean master visual for showing the project layout and planned development character.',
    media: publicAsset('vrindavan-material/site-3d-view.webp'),
  },
  {
    id: 'material-commercial',
    title: 'Commercial plot zone',
    description: 'Highlights the commercial option with a dedicated presentation render.',
    media: publicAsset('vrindavan-material/commercial-view.webp'),
  },
  {
    id: 'material-entry-01',
    title: 'Premium project entry',
    description: 'A polished entrance visual that gives the project a stronger first impression.',
    media: publicAsset('vrindavan-material/entry-view-01.webp'),
  },
  {
    id: 'material-entry-02',
    title: 'Entrance detail view',
    description: 'Useful for showing branded arrival, road alignment and front-facing identity.',
    media: publicAsset('vrindavan-material/entry-view-02.webp'),
  },
  {
    id: 'material-entry-03',
    title: 'Gateway view',
    description: 'A polished gateway view from the latest project material set.',
    media: publicAsset('vrindavan-material/entry-view-03.webp'),
  },
  {
    id: 'material-site-visual',
    title: 'Project entry visual',
    description: 'A clean front-facing project visual for buyer conversations.',
    media: publicAsset('vrindavan-material/project-photo-03.webp'),
  },
  {
    id: 'material-mvd-photos',
    title: 'Marked plot visual',
    description: 'Shows plot planning, internal roads and project boundary context.',
    media: publicAsset('vrindavan-material/mvd-3-photos.webp'),
  },
  {
    id: 'material-highway',
    title: 'Highway-side project visual',
    description: 'Highlights the highway-side location context from the latest material.',
    media: publicAsset('vrindavan-material/mvd-photo-1.webp'),
  },
];

const PropertyGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeItem = useMemo(() => galleryItems[activeIndex], [activeIndex]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryItems.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => setActiveIndex((current) => (current - 1 + galleryItems.length) % galleryItems.length);
  const goNext = () => setActiveIndex((current) => (current + 1) % galleryItems.length);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) return;
      if (event.key === 'Escape') setIsModalOpen(false);
      if (event.key === 'ArrowRight') goNext();
      if (event.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  return (
    <section className="gallery-section reveal-on-scroll" id="gallery">
      <div className="gallery-container">
        <div className="gallery-header">
          <div className="process-badge">
            <div className="process-badge-icon"></div>
            Project Gallery
          </div>
          <h2 className="gallery-title">Project visuals, site images and premium lifestyle references in one gallery.</h2>
          <p className="gallery-description">
            New presentation visuals are added alongside the existing site images, so buyers can review approach, entrance, planning,
            open spaces and actual project context without losing the old gallery.
          </p>
        </div>

        <div className="gallery-showcase">
          <div className="gallery-stage">
            <button className="gallery-nav gallery-nav--left" onClick={goPrev} aria-label="Previous image">‹</button>
            <img
              src={activeItem.media}
              alt={activeItem.title}
              className="gallery-stage-image"
              loading="lazy"
              decoding="async"
              onClick={() => setIsModalOpen(true)}
            />
            <button className="gallery-nav gallery-nav--right" onClick={goNext} aria-label="Next image">›</button>
          </div>

          <div className="gallery-copy-card">
            <span className="gallery-copy-kicker">Gallery highlight {String(activeIndex + 1).padStart(2, '0')}</span>
            <h3>{activeItem.title}</h3>
            <p>{activeItem.description}</p>
            <div className="gallery-copy-actions">
              <button onClick={() => setIsModalOpen(true)} className="gallery-copy-btn gallery-copy-btn--primary">Open Fullscreen</button>
              <a href="#contact" className="gallery-copy-btn gallery-copy-btn--secondary">Request details</a>
            </div>
          </div>
        </div>

        <div className="gallery-thumbs">
          {galleryItems.map((item, index) => (
            <button
              key={item.id}
              className={`gallery-thumb ${activeIndex === index ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={item.title}
            >
              <img src={item.media} alt={item.title} loading="lazy" decoding="async" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="gallery-modal" role="dialog" aria-modal="true" onClick={() => setIsModalOpen(false)}>
          <div className="gallery-modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="gallery-modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close gallery">×</button>
            <button className="gallery-modal-nav gallery-modal-nav--left" onClick={goPrev} aria-label="Previous image">‹</button>
            <img src={activeItem.media} alt={activeItem.title} className="gallery-modal-image" />
            <button className="gallery-modal-nav gallery-modal-nav--right" onClick={goNext} aria-label="Next image">›</button>
            <div className="gallery-modal-meta">
              <h3>{activeItem.title}</h3>
              <p>{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PropertyGallery;
