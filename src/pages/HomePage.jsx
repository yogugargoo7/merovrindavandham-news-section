import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import Hero from '../components/Hero/Hero';
import Testimonials from '../components/Testimonials/Testimonials';
import EnquirySection from '../components/EnquirySection/EnquirySection';
import { publicAsset } from '../utils/publicAsset';
import './HomePage.css';

const homePaymentPlans = [
  { size: '60 Sq. Yd.', type: 'Normal Plot', rate: 'Rs 16,000/Sq. Yd.', total: 'Rs 9,60,000', booking: 'Rs 3,84,000' },
  { size: '100 Sq. Yd.', type: 'Normal Plot', rate: 'Rs 16,000/Sq. Yd.', total: 'Rs 16,00,000', booking: 'Rs 6,40,000', featured: true },
  { size: '150 Sq. Yd.', type: 'Corner Plot', rate: 'Rs 18,000/Sq. Yd.', total: 'Rs 27,00,000', booking: 'Rs 10,80,000' },
  { size: '30 Sq. Yd.', type: 'Commercial Plot', rate: 'Rs 20,000/Sq. Yd.', total: 'Rs 6,00,000', booking: 'Rs 2,40,000' },
];

const investReasons = [
  {
    num: '01',
    tag: 'Spiritual Value',
    title: 'Vrindavan - Major Pilgrimage Footfall',
    body: 'Vrindavan and Mathura attract a large number of pilgrims and tourists every year, which supports strong long-term interest in the local real estate market.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    num: '02',
    tag: 'Infrastructure',
    title: 'Yamuna Expressway Connectivity',
    body: 'The Yamuna Expressway connects Greater Noida with Agra and supports movement toward Delhi NCR, Mathura and Agra. Buyers should confirm the exact route from the project pin before visiting.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    num: '03',
    tag: 'Future Growth',
    title: 'Noida International Airport Corridor',
    body: 'Noida International Airport at Jewar is an important regional infrastructure project. Its wider connectivity may support long-term interest across the Yamuna Expressway belt.',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

const steps = [
  ['01', 'Shortlist',  'Compare plot sizes, prices and payment plans at your own pace.'],
  ['02', 'Verify',     'Discuss route, documents, availability and payment milestones with our team.'],
  ['03', 'Site Visit', 'Book a free guided site visit and see the land, roads and surroundings yourself.'],
  ['04', 'Reserve',    'Proceed only after final written confirmation. Rs. 11,000 token amount applies as per the latest payment plan.'],
];

const sitePhotos = [
  { src: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'), label: 'Drone Township View' },
  { src: publicAsset('vrindavan-material/site-3d-view.webp'), label: 'Site 3D View' },
  { src: publicAsset('vrindavan-material/commercial-view.webp'), label: 'Commercial Zone' },
  { src: publicAsset('vrindavan-material/entry-view-01.webp'), label: 'Project Entry' },
  { src: publicAsset('vrindavan-material/entry-view-02.webp'), label: 'Entrance Detail' },
  { src: publicAsset('vrindavan-material/entry-view-03.webp'), label: 'Premium Gateway' },
  { src: publicAsset('vrindavan-material/project-photo-03.webp'), label: 'Site Visual' },
  { src: publicAsset('vrindavan-material/mvd-3-photos.webp'), label: 'MVD Photos' },
  { src: publicAsset('vrindavan-material/mvd-photo-1.webp'), label: 'Highway View' },
];

const HOME_SEO = {
  title: 'Premium Plots in Vrindavan near Yamuna Expressway | Mero Vrindavan Dham',
  description: 'Buy residential plots in Vrindavan near Yamuna Expressway. View plot options, payment details, gallery and book a guided site visit with Mero Vrindavan Dham.',
  canonical: 'https://merovrindavandham.com/',
  ogUrl: 'https://merovrindavandham.com/',
};

const HomePage = () => {
  useReveal();
  useSEO(HOME_SEO);

  return (
    <>
      <Hero />

      {/* TRUST STRIP */}
      <div className="hp-trust-strip">
        <div className="hp-container">
          <div className="hp-trust-inner">
            <div className="hp-trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Clear Documentation</span>
            </div>
            <div className="hp-trust-sep" />
            <div className="hp-trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>Guided Site Visits Every Week</span>
            </div>
            <div className="hp-trust-sep" />
            <div className="hp-trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Token Booking from Rs. 11,000</span>
            </div>
            <div className="hp-trust-sep" />
            <div className="hp-trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Quick Response Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <section className="hp-intro reveal-on-scroll">
        <div className="hp-container hp-intro__inner">
          <div className="hp-intro__text">
            <span className="hp-kicker">Mero Vrindavan Dham</span>
            <h2 className="hp-heading">A Planned Township at the<br />Heart of Vrindavan's Growth</h2>
            <p className="hp-para">
              Residential and commercial plots from 30 to 150 Sq. Yd. in a 15-acre planned township near Vrindavan, Mathura.
              Clear documents, transparent payment plans, and weekly guided site visits.
            </p>
            <p className="hp-para hp-para--muted">
              Token booking starts at <strong>Rs. 11,000</strong> as per the latest payment plan. Confirm written terms before booking.
            </p>
            <div className="hp-intro__actions">
              <Link to="/plots" className="hp-btn hp-btn--primary">View Plots &amp; Pricing</Link>
              <Link to="/contact" className="hp-btn hp-btn--outline">Book Site Visit</Link>
            </div>
          </div>
          <div className="hp-payment-grid">
            {homePaymentPlans.map((plan) => (
              <div key={plan.size} className={`hp-payment-card${plan.featured ? ' hp-payment-card--featured' : ''}`}>
                <div className="hp-payment-card__size">{plan.size}</div>
                <div className="hp-payment-card__rate">{plan.rate}</div>
                <div className="hp-payment-card__caption">Basic Sale Price</div>
                <h3>{plan.type}</h3>
                <div className="hp-payment-card__box">
                  <span>Total Price</span>
                  <strong>{plan.total}</strong>
                </div>
                <div className="hp-payment-card__box">
                  <span>Booking Amount 40%</span>
                  <strong>{plan.booking}</strong>
                </div>
                <ul className="hp-payment-card__list">
                  <li>Token amount Rs 11,000</li>
                  <li>40% booking within 7 days</li>
                  <li>Balance in 6 to 12 months</li>
                </ul>
                <Link to="/payment" className="hp-payment-card__btn">Get Payment Details</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hp-video-section reveal-on-scroll" aria-label="Project video">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="hp-kicker">Project Video</span>
            <h2 className="hp-heading">Watch the Complete Project Walkthrough</h2>
            <p className="hp-para hp-para--muted">See the township layout, internal roads, plot demarcation and surroundings before you plan your site visit.</p>
          </div>
        </div>
        <div className="hp-video-frame">
          <video
            src={publicAsset('vrindavan-material/informative-mero-vrindavan-dham-web.mp4')}
            poster={publicAsset('vrindavan-material/drone-view-mvd-3d.webp')}
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>
        <div className="hp-layout-plan">
          <div className="hp-container">
            <div className="hp-layout-plan__head">
              <span className="hp-kicker">Township Layout</span>
              <h2 className="hp-heading">Proposed Layout Plan</h2>
              <p className="hp-para hp-para--muted">Review the block planning, road network and plot demarcation before shortlisting your preferred plot.</p>
            </div>
          </div>
          <figure className="hp-layout-plan__figure">
            <img
              src={publicAsset('vrindavan-material/layout-plan-2026.jpeg')}
              alt="Mero Vrindavan Dham proposed layout plan with plot blocks and road network"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="hp-invest reveal-on-scroll">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="hp-kicker hp-kicker--light">Why Invest Here</span>
            <h2 className="hp-heading hp-heading--light">3 Reasons Smart Buyers<br />Choose Vrindavan Now</h2>
            <p className="hp-para hp-para--light">Location, infrastructure and spiritual relevance in one township.</p>
          </div>
          <div className="hp-invest-grid">
            {investReasons.map((r) => (
              <div key={r.num} className="hp-invest-card">
                <div className="hp-invest-card__top">
                  <div className="hp-invest-card__icon">{r.icon}</div>
                  <span className="hp-invest-card__tag">{r.tag}</span>
                </div>
                <div className="hp-invest-card__num">{r.num}</div>
                <h3 className="hp-invest-card__title">{r.title}</h3>
                <p className="hp-invest-card__body">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="hp-invest-cta">
            <Link to="/plots" className="hp-btn hp-btn--gold">See All Plot Options</Link>
          </div>
        </div>
      </section>

      {/* SITE GALLERY */}
      <section className="hp-gallery reveal-on-scroll">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="hp-kicker">Project Gallery</span>
            <h2 className="hp-heading">See the Site Before You Decide</h2>
            <p className="hp-para hp-para--muted">Real visuals of the project layout, roads, entrance and the surrounding township.</p>
          </div>
          <div className="hp-gallery__grid">
            {sitePhotos.map((photo) => (
              <div key={photo.src} className="hp-gallery__item">
                <img src={photo.src} alt={photo.label} loading="lazy" />
                <span className="hp-gallery__label">{photo.label}</span>
              </div>
            ))}
          </div>
          <div className="hp-gallery__cta">
            <Link to="/gallery" className="hp-btn hp-btn--outline">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* BUYING PROCESS */}
      <section className="hp-process reveal-on-scroll">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="hp-kicker">How to Buy</span>
            <h2 className="hp-heading">Book Your Plot in 4 Easy Steps</h2>
            <p className="hp-para hp-para--muted">From shortlisting to booking, the process is transparent and no-pressure.</p>
          </div>
          <div className="hp-steps">
            {steps.map(([num, title, text]) => (
              <div key={title} className="hp-step">
                <div className="hp-step__num">{num}</div>
                <h3 className="hp-step__title">{title}</h3>
                <p className="hp-step__text">{text}</p>
              </div>
            ))}
          </div>
          <div className="hp-process__cta">
            <Link to="/payment" className="hp-btn hp-btn--primary">View Payment Plan</Link>
            <Link to="/contact" className="hp-btn hp-btn--outline">Talk to Our Team</Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <EnquirySection />
    </>
  );
};

export default HomePage;
