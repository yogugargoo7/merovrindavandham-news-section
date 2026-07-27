import { useEffect, useRef, useState } from 'react';
import './ProjectExperience.css';
import { publicAsset } from '../../utils/publicAsset';
import { trackConversionEvent } from '../../utils/analytics';

const sections = [
  {
    id: 'arrival',
    eyebrow: 'Grand Entrance',
    title: 'A premium entry gate with a clear township identity',
    text: 'A defined entrance gives the project a stronger first impression and makes the township feel more organized from the start.',
    image: publicAsset('vrindavan-material/entry-view-01.webp'),
    stats: ['Premium entrance gate', 'Branded township identity', 'Stronger buyer confidence'],
  },
  {
    id: 'growth',
    eyebrow: 'Location Advantage',
    title: 'Positioned within the Yamuna Expressway growth belt',
    text: 'The location supports connectivity toward Vrindavan, Mathura, Agra and Delhi NCR, making it useful for buyers comparing family-use and long-term holding options.',
    image: publicAsset('vrindavan-material/mvd-photo-1.webp'),
    stats: ['Growth corridor visibility', 'Better movement access', 'Useful for home or investment'],
  },
  {
    id: 'masterplan',
    eyebrow: '3D Township View',
    title: 'Township view showing layout, roads and plot planning',
    text: 'The 3D view makes road movement, plot structure and overall planning easier to understand at a glance.',
    image: publicAsset('vrindavan-material/site-3d-view.webp'),
    stats: ['Birds-eye layout clarity', 'Better project explanation', 'Organized internal planning'],
  },
  {
    id: 'spiritual',
    eyebrow: 'Vrindavan Connectivity',
    title: 'Connected to the spiritual circuit of Vrindavan',
    text: 'Temple access and cultural surroundings add a meaningful location advantage beyond the plot itself.',
    image: publicAsset('vrindavan-material/entry-view-03.webp'),
    stats: ['Temple circuit relevance', 'Peaceful surrounding context', 'Stronger destination appeal'],
  },
  {
    id: 'amenities',
    eyebrow: 'Essential Amenities',
    title: 'Core amenities for practical everyday use',
    text: 'Roads, lighting, open spaces and entry support cover the essentials people usually check before shortlisting a plotted project.',
    image: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'),
    stats: ['Roads and lighting', 'Controlled entry support', 'Everyday-use confidence'],
  },
  {
    id: 'plots',
    eyebrow: 'Payment Plan Options',
    title: 'Plot options shown as per the latest payment plan',
    text: 'The latest plan lists 60 and 100 sq. yd. normal plots, a 150 sq. yd. corner plot and a 30 sq. yd. commercial plot with token and booking details.',
    image: publicAsset('vrindavan-material/commercial-view.webp'),
    stats: ['Normal: 60/100 sq. yd.', 'Corner: 150 sq. yd.', 'Commercial: 30 sq. yd.'],
  },
];

const ProjectExperience = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (direction) => {
    setActiveIndex((currentIndex) => {
      if (direction === 'previous') {
        return (currentIndex - 1 + sections.length) % sections.length;
      }

      return (currentIndex + 1) % sections.length;
    });
  };

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    let intervalId = 0;

    const startAutoScroll = () => {
      window.clearInterval(intervalId);
      intervalId = window.setInterval(() => {
        setActiveIndex((currentIndex) => (currentIndex + 1) % sections.length);
      }, 3200);
    };

    const stopAutoScroll = () => {
      window.clearInterval(intervalId);
      intervalId = 0;
    };

    if (!('IntersectionObserver' in window)) {
      startAutoScroll();
      return stopAutoScroll;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      stopAutoScroll();
    };
  }, []);

  const activeSection = sections[activeIndex];
  const translateX = `translateX(-${activeIndex * (100 / sections.length)}%)`;

  return (
    <section className="experience-shell reveal-on-scroll" id="highlights" ref={sectionRef}>
      <div className="experience-sticky-stage">
        <div className="experience-heading-wrap">
          <div>
            <span className="experience-kicker">Project Highlights</span>
            <h2>A clear walkthrough of the project before you plan a visit</h2>
            <p className="experience-heading-copy">
              Review the entrance concept, location advantage, township planning, amenities and plot-size options in one place.
            </p>
          </div>
          <a className="experience-brochure-link" href={publicAsset('vrindavan-material/brochure-mero-vrindavan-dham.pdf')} target="_blank" rel="noreferrer" onClick={() => trackConversionEvent('brochure_open', 'Project Highlights')}>
            Open Brochure
          </a>
        </div>

        <div className="experience-horizontal-window">
          <button
            type="button"
            className="experience-nav-btn experience-nav-prev"
            aria-label="Previous highlight"
            onClick={() => goToSlide('previous')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="experience-horizontal-track"
            style={{ transform: translateX, width: `${sections.length * 100}%`, ['--slide-count']: sections.length }}
          >
            {sections.map((section, index) => (
              <article className="experience-slide" key={section.id} style={{ width: `${100 / sections.length}%` }}>
                <div className="experience-slide-visual">
                  <img src={section.image} alt={section.title} className="experience-slide-image" loading="lazy" decoding="async" />
                  <div className="experience-slide-overlay">
                    <span>{section.eyebrow}</span>
                    <h3>{section.title}</h3>
                  </div>
                </div>

                <div className={`experience-slide-copy ${activeIndex === index ? 'active' : ''}`}>
                  <div className="experience-slide-number">0{index + 1}</div>
                  <span className="experience-step-kicker">{section.eyebrow}</span>
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                  <div className="experience-chip-row">
                    {section.stats.map((item) => (
                      <span key={item} className="experience-chip">{item}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="experience-nav-btn experience-nav-next"
            aria-label="Next highlight"
            onClick={() => goToSlide('next')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="experience-progress-ui">
          <div className="experience-progress-bar">
            <span style={{ transform: `scaleX(${(activeIndex + 1) / sections.length})` }} />
          </div>
          <div className="experience-dots" aria-label="Highlight slides">
            {sections.map((section, index) => (
              <button
                type="button"
                key={section.id}
                className={`experience-dot${activeIndex === index ? ' active' : ''}`}
                aria-label={`Show ${section.eyebrow}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <div className="experience-progress-meta">
            <strong>0{activeIndex + 1}</strong>
            <p>{activeSection.eyebrow}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectExperience;
