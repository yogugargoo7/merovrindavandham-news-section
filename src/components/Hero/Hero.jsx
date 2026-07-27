import { useState, useEffect } from 'react';
import './Hero.css';
import QuickLeadModal from '../QuickLeadModal/QuickLeadModal';
import { publicAsset } from '../../utils/publicAsset';
import { trackConversionEvent } from '../../utils/analytics';
import { usePlots } from '../../hooks/usePlots';

const carouselImages = [
  publicAsset('vrindavan-material/drone-view-mvd-3d.webp'),
  publicAsset('vrindavan-material/site-3d-view.webp'),
  publicAsset('vrindavan-material/entry-view-01.webp'),
  publicAsset('vrindavan-material/entry-view-02.webp'),
  publicAsset('vrindavan-material/commercial-view.webp'),
  publicAsset('vrindavan-material/project-photo-03.webp'),
];

const infoPanelItems = [
  { label: 'Token to Book', value: 'Rs. 11,000' },
  { label: 'Location', value: 'Vrindavan-Mathura' },
  { label: 'Connectivity', value: 'Yamuna Expressway' },
];

const Hero = () => {
  const [active, setActive] = useState(0);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, action: null });
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const panelItems = [
    infoPanelItems[0],
    { label: 'Total Plots', value: String(totalPlots) },
    ...infoPanelItems.slice(1),
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setActive(i => (i + 1) % carouselImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSiteVisitClick = () => {
    trackConversionEvent('site_visit_click', 'Hero Site Visit');
    setModalConfig({
      isOpen: true,
      source: 'Hero Site Visit',
      actionLabel: 'Book Site Visit',
      onSuccess: () => scrollToSection('contact'),
    });
  };

  const handleViewPricesClick = () => {
    trackConversionEvent('payment_details_open', 'Hero Payment Details');
    window.location.href = '/payment';
  };

  const handleBrochureClick = () => {
    trackConversionEvent('brochure_open', 'Hero Brochure');
    window.open(publicAsset('vrindavan-material/brochure-mero-vrindavan-dham.pdf'), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="home" className="hero-section">

      {/* Carousel */}
      <div className="hero-carousel" aria-hidden="true">
        {carouselImages.map((src, i) => (
          <div
            key={src}
            className={`hero-slide${i === active ? ' hero-slide--active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">

        <h1 className="sr-only">Mero Vrindavan Dham - Plots in Vrindavan near Yamuna Expressway</h1>

        <div className="hero-cta-wrapper">
          <button onClick={handleViewPricesClick} className="hero-cta-primary">
            <svg className="hero-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>View Plots &amp; Prices</span>
          </button>
          <button onClick={handleSiteVisitClick} className="hero-cta-secondary">
            <svg className="hero-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>Book Free Site Visit</span>
          </button>
          <button onClick={handleBrochureClick} className="hero-cta-ghost">
            <svg className="hero-cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Brochure</span>
          </button>
        </div>

        <div className="hero-info-panel">
          {panelItems.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

      </div>

      {/* Dot indicators */}
      <div className="hero-dots" role="tablist" aria-label="Slide indicators">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === active}
            aria-label={`Slide ${i + 1}`}
            className={`hero-dot${i === active ? ' hero-dot--active' : ''}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>

      <QuickLeadModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onSuccess={modalConfig.onSuccess}
        reservePopup={false}
        source={modalConfig.source}
        actionLabel={modalConfig.actionLabel}
      />
    </section>
  );
};

export default Hero;
