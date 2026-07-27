import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Amenities.css';
import { publicAsset } from '../../utils/publicAsset';

const Amenities = () => {
  const [activePhoto, setActivePhoto] = useState(null);

  const amenities = [
    {
      id: 1,
      number: "01",
      title: 'Strategic Location',
      description: 'Positioned around the Vrindavan-Mathura growth belt with Yamuna Expressway connectivity. Confirm the exact approach route before planning a visit.',
      image: publicAsset('vrindavan-material/mvd-photo-1.webp'),
      icon: '📍',
      badge: 'Prime Location',
      features: ['Yamuna Expressway Access', 'Near Vrindavan', 'Delhi Connectivity', 'Agra Link Road'],
      className: 'lake-view featured'
    },
    {
      id: 2,
      number: "02",
      title: 'Well-Planned Roads',
      description: 'Wide internal roads, clear plot demarcation and smooth site access. The approach road gives buyers a real sense of the project layout on visit.',
      image: publicAsset('vrindavan-material/site-3d-view.webp'),
      icon: '🛣️',
      badge: 'Good Access',
      features: ['Wide Internal Roads', 'Clear Markings', 'Smooth Entry', 'Proper Drainage'],
      className: 'society-gate'
    },
    {
      id: 3,
      number: "03",
      title: 'Spiritual Connectivity',
      description: 'Useful access toward Prem Mandir, Vrindavan Dham and the Mathura spiritual circuit. Confirm travel time from the exact project pin before visiting.',
      image: publicAsset('vrindavan-material/entry-view-01.webp'),
      icon: '🛕',
      badge: 'Spiritual Hub',
      features: ['Near Prem Mandir', 'Vrindavan Circuit', 'Mathura Access', 'Peaceful Area'],
      className: 'clubhouse'
    },
    {
      id: 4,
      number: "04",
      title: 'Latest Payment-Plan Plot Sizes',
      image: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'),
      icon: '📐',
      description: 'Plot options shown on the latest payment plan: 60 and 100 sq. yd. normal plots, 150 sq. yd. corner plot and 30 sq. yd. commercial plot.',
      badge: 'Latest Options',
      features: ['60 Sq. Yd Normal', '100 Sq. Yd Normal', '150 Sq. Yd Corner', '30 Sq. Yd Commercial'],
      className: 'gymnasium'
    },
    {
      id: 5,
      number: "05",
      title: 'Open Green Environment',
      description: 'Open plots in a clean, green environment away from city noise. Ideal for peaceful living, future construction or long-term land holding.',
      image: publicAsset('vrindavan-material/entry-view-03.webp'),
      icon: '🌿',
      badge: 'Green Surroundings',
      features: ['Open Layout', 'Clean Environment', 'Green Belt', 'Quiet Locality'],
      className: 'garden'
    }
  ];


  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!activePhoto) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActivePhoto(null);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePhoto]);

  return (
    <section id="amenities" className="amenities-section">
      <div className="amenities-container">
        {/* Section Header */}
        <div className="amenities-header">
          <div className="amenities-badge">
            <div className="amenities-badge-icon"></div>
            PREMIUM AMENITIES
          </div>
          <h2 className="amenities-title">
            Residential Plots in Vrindavan
          </h2>
          <h3 className="amenities-subtitle">
            with Yamuna Expressway Connectivity
          </h3>
          <p className="amenities-description">
            Compare location, road access, spiritual connectivity, plot sizes and township facilities before
            choosing residential plots near Vrindavan, Mathura and Yamuna Expressway.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-grid special-layout stagger-children">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className={`amenity-card ${amenity.className}`}
            >
              {/* Image Container */}
              <button
                type="button"
                className="amenity-image-container"
                onClick={() => setActivePhoto(amenity)}
                aria-label={`Open ${amenity.title} photo`}
              >
                <img 
                  src={amenity.image} 
                  alt={amenity.title}
                  className="amenity-image"
                />
                <div className="amenity-overlay">
                  <div className="amenity-overlay-content">
                    <div className="amenity-overlay-icon">
                      <span style={{ fontSize: '20px' }}>{amenity.icon}</span>
                    </div>
                    <div className="amenity-overlay-text">View Photo</div>
                  </div>
                </div>
                <div className="amenity-badge-overlay">
                  {amenity.badge}
                </div>
              </button>

              {/* Content */}
              <div className="amenity-content">
                <div className="amenity-header">
                  <div className="amenity-number">
                    {amenity.number}
                  </div>
                  <div className="amenity-icon">
                    {amenity.icon}
                  </div>
                </div>

                <h3 className="amenity-title">
                  {amenity.title}
                </h3>
                
                <p className="amenity-description">
                  {amenity.description}
                </p>

                <div className="amenity-features">
                  {amenity.features.map((feature, index) => (
                    <span key={index} className="amenity-feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="amenities-cta">
          <h3 className="amenities-cta-title">
            Ready to Book Your Plot at Mero Vrindavan Dham?
          </h3>
          <p className="amenities-cta-description">
            Schedule a site visit today and see the location, plot sizes and Yamuna Expressway connectivity firsthand. Send an enquiry and our team will share the brochure and details.
          </p>
          <div className="amenities-cta-buttons">
            <button 
              onClick={scrollToGallery}
              className="amenities-btn-primary"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Explore Gallery
            </button>
            <Link
              to="/contact"
              className="amenities-btn-secondary"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>

      {activePhoto && (
        <div className="amenity-photo-modal" role="dialog" aria-modal="true" aria-label={activePhoto.title} onClick={() => setActivePhoto(null)}>
          <div className="amenity-photo-modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="amenity-photo-modal-close" onClick={() => setActivePhoto(null)} aria-label="Close photo">
              ×
            </button>
            <img src={activePhoto.image} alt={activePhoto.title} className="amenity-photo-modal-image" />
            <div className="amenity-photo-modal-meta">
              <span>{activePhoto.badge}</span>
              <h3>{activePhoto.title}</h3>
              <p>{activePhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Amenities;
