import { useState, useEffect } from 'react';
import './Hero.css';
import QuickLeadModal from '../QuickLeadModal/QuickLeadModal';
import BrochureModal from '../BrochureModal/BrochureModal';
import BtnText from '../fx/BtnText';
import { transitionTo } from '../fx/PageTransition';
import { publicAsset } from '../../utils/publicAsset';
import { trackConversionEvent } from '../../utils/analytics';
import { usePlots } from '../../hooks/usePlots';
import { useSiteReady } from '../../hooks/useSiteReady';

const SLIDE_MS = 4500;

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

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const Hero = () => {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, action: null });
  const [brochureOpen, setBrochureOpen] = useState(false);
  const ready = useSiteReady();
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const panelItems = [
    infoPanelItems[0],
    { label: 'Total Plots', value: String(totalPlots) },
    ...infoPanelItems.slice(1),
  ];

  const goTo = (index) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  };

  // each slide gets its full duration, including after a manual jump;
  // the clock waits while the preloader / curtain covers the page
  useEffect(() => {
    if (!ready) return undefined;
    const id = setTimeout(() => {
      setPrevious(active);
      setActive((active + 1) % carouselImages.length);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [active, ready]);

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
    transitionTo('/payment');
  };

  const handleBrochureClick = () => {
    trackConversionEvent('brochure_open', 'Hero Brochure');
    setBrochureOpen(true);
  };

  return (
    <section id="home" className="hero on-dark" data-progress>
      {/* Carousel */}
      <div className="hero__media" aria-hidden="true">
        {carouselImages.map((src, i) => (
          <div
            key={src}
            className={`hero__slide${i === active ? ' is-active' : ''}${i === previous ? ' is-prev' : ''}`}
          >
            <div className="hero__img" style={{ backgroundImage: `url(${src})` }} />
          </div>
        ))}
        <div className="hero__shade" />
      </div>

      <h1 className="sr-only">Mero Vrindavan Dham - Plots in Vrindavan near Yamuna Expressway</h1>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__row">
          <div className="hero__ctas" data-reveal="up" style={{ '--d': '150ms' }}>
            <button onClick={handleViewPricesClick} className="btn btn--gold hero__cta">
              <BtnText>View Plots &amp; Prices</BtnText>
            </button>
            <button onClick={handleSiteVisitClick} className="btn btn--line-light hero__cta">
              <BtnText icon={<PinIcon />}>Book Free Site Visit</BtnText>
            </button>
            <button onClick={handleBrochureClick} className="hero__brochure link-line">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Brochure</span>
            </button>
          </div>

          <div className="hero__pager" data-reveal="fade" style={{ '--d': '450ms' }}>
            <span className="hero__count" aria-hidden="true">
              <b>{String(active + 1).padStart(2, '0')}</b>
              <span>/ {String(carouselImages.length).padStart(2, '0')}</span>
            </span>
            <div className="hero__bars" role="tablist" aria-label="Slide indicators">
              {carouselImages.map((src, i) => (
                <button
                  key={src}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slide ${i + 1}`}
                  className={`hero__bar${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                  style={{ '--slide-ms': `${SLIDE_MS}ms` }}
                  onClick={() => goTo(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </div>

        <dl className="hero__stats" data-reveal="stagger" style={{ '--d': '300ms' }}>
          {panelItems.map((item) => (
            <div key={item.label} className="hero__stat">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>

      <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} source="Hero Brochure" />

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
