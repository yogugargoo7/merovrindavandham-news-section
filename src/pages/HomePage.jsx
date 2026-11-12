import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Hero from '../components/Hero/Hero';
import Testimonials from '../components/Testimonials/Testimonials';
import EnquirySection from '../components/EnquirySection/EnquirySection';
import SplitText from '../components/fx/SplitText';
import BtnText from '../components/fx/BtnText';
import { publicAsset } from '../utils/publicAsset';
import './HomePage.css';

const homePaymentPlans = [
  { size: '60 Sq. Yd.', type: 'Normal Plot', rate: 'Rs 16,000/Sq. Yd.', total: 'Rs 9,60,000', booking: 'Rs 3,84,000' },
  { size: '100 Sq. Yd.', type: 'Normal Plot', rate: 'Rs 16,000/Sq. Yd.', total: 'Rs 16,00,000', booking: 'Rs 6,40,000', featured: true },
  { size: '150 Sq. Yd.', type: 'Corner Plot', rate: 'Rs 18,000/Sq. Yd.', total: 'Rs 27,00,000', booking: 'Rs 10,80,000' },
  { size: '30 Sq. Yd.', type: 'Commercial Plot', rate: 'Rs 20,000/Sq. Yd.', total: 'Rs 6,00,000', booking: 'Rs 2,40,000' },
];

const trustItems = [
  { label: 'Clear Documentation' },
  { label: 'Guided Site Visits Every Week' },
  { label: 'Token Booking from Rs. 11,000' },
  { label: 'Quick Response Team' },
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

// Vertical scroll drives a horizontal track while the section is pinned (desktop).
const usePinnedTrack = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return undefined;

    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    let distance = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!distance) return;
      const top = section.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / distance));
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
      section.style.setProperty('--gp', p.toFixed(4));
    };

    const measure = () => {
      if (!mq.matches) {
        distance = 0;
        section.style.height = '';
        track.style.transform = '';
        section.style.setProperty('--gp', '0');
        return;
      }
      distance = Math.max(0, track.scrollWidth - track.clientWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    mq.addEventListener('change', measure);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      mq.removeEventListener('change', measure);
    };
  }, []);

  return { sectionRef, trackRef };
};

const HomePage = () => {
  useSEO(HOME_SEO);
  const { sectionRef, trackRef } = usePinnedTrack();

  return (
    <>
      <Hero />

      {/* TRUST STRIP */}
      <div className="hp-trust on-dark" aria-label="Buyer assurances">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div className="marquee__track" key={copy} aria-hidden={copy === 1 || undefined}>
              {/* items twice per track so one track is wider than any screen (no gap) */}
              {[...trustItems, ...trustItems].map((item, i) => (
                <div className="hp-trust__item" key={`${item.label}-${i}`} aria-hidden={i >= trustItems.length || undefined}>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section className="sec sec--paper hp-intro">
        <div className="wrap hp-intro__grid">
          <div className="hp-intro__copy">
            <span className="eyebrow" data-reveal="up">Mero Vrindavan Dham</span>
            <SplitText
              as="h2"
              className="display-l hp-intro__title"
              text={"A Planned Township at the Heart of *Vrindavan's* Growth"}
            />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Residential and commercial plots from 30 to 150 Sq. Yd. in a 15-acre planned township near Vrindavan, Mathura.
              Clear documents, transparent payment plans, and weekly guided site visits.
            </p>
            <p className="hp-intro__note" data-reveal="up" style={{ '--d': '220ms' }}>
              Token booking starts at <strong>Rs. 11,000</strong> as per the latest payment plan. Confirm written terms before booking.
            </p>
            <div className="btn-row" data-reveal="up" style={{ '--d': '300ms' }}>
              <Link to="/plots" className="btn btn--ink"><BtnText>View Plots &amp; Pricing</BtnText></Link>
              <Link to="/contact" className="btn btn--line"><BtnText>Book Site Visit</BtnText></Link>
            </div>
          </div>

          <div className="hp-price-grid" data-reveal="stagger">
            {homePaymentPlans.map((plan) => (
              <article key={plan.size} className={`hp-price${plan.featured ? ' hp-price--featured' : ''}`}>
                <div className="hp-price__top">
                  <span className="hp-price__size">{plan.size}</span>
                  <h3 className="hp-price__type">{plan.type}</h3>
                </div>
                <div className="hp-price__rate">{plan.rate}</div>
                <div className="hp-price__caption">Basic Sale Price</div>
                <dl className="hp-price__rows">
                  <div>
                    <dt>Total Price</dt>
                    <dd>{plan.total}</dd>
                  </div>
                  <div>
                    <dt>Booking Amount 40%</dt>
                    <dd>{plan.booking}</dd>
                  </div>
                </dl>
                <ul className="hp-price__list">
                  <li>Token amount Rs 11,000</li>
                  <li>40% booking within 7 days</li>
                  <li>Balance in 6 to 12 months</li>
                </ul>
                <Link to="/payment" className="hp-price__btn">
                  <span>Get Payment Details</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO + LAYOUT */}
      <section className="sec sec--paper hp-video" aria-label="Project video">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Project Video</span>
            <SplitText as="h2" className="display-l" text={"Watch the Complete\n*Project Walkthrough*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              See the township layout, internal roads, plot demarcation and surroundings before you plan your site visit.
            </p>
          </div>
        </div>
        <div className="hp-video__stage" data-progress>
          <div className="hp-video__frame">
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
        </div>

        <div className="wrap hp-layout">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Township Layout</span>
            <SplitText as="h2" className="display-l" text={"Proposed *Layout Plan*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Review the block planning, road network and plot demarcation before shortlisting your preferred plot.
            </p>
          </div>
          <figure className="hp-layout__figure" data-reveal="up">
            <span className="hp-layout__corner hp-layout__corner--tl" aria-hidden="true" />
            <span className="hp-layout__corner hp-layout__corner--tr" aria-hidden="true" />
            <span className="hp-layout__corner hp-layout__corner--bl" aria-hidden="true" />
            <span className="hp-layout__corner hp-layout__corner--br" aria-hidden="true" />
            <div className="hp-layout__scroll">
              <img
                src={publicAsset('vrindavan-material/layout-plan-2026.jpeg')}
                alt="Mero Vrindavan Dham proposed layout plan with plot blocks and road network"
                loading="lazy"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="sec sec--ink on-dark grain hp-invest">
        <div className="hp-invest__glow" aria-hidden="true" />
        <div className="wrap">
          <div className="sec-head sec-head--center">
            <span className="eyebrow" data-reveal="up">Why Invest Here</span>
            <SplitText as="h2" className="display-l" text={"3 Reasons Smart Buyers\nChoose *Vrindavan* Now"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Location, infrastructure and spiritual relevance in one township.
            </p>
          </div>

          <div className="hp-invest__grid" data-reveal="stagger">
            {investReasons.map((r) => (
              <article key={r.num} className="hp-invest__card">
                <div className="hp-invest__num" aria-hidden="true">{r.num}</div>
                <div className="hp-invest__top">
                  <div className="hp-invest__icon">{r.icon}</div>
                  <span className="hp-invest__tag">{r.tag}</span>
                </div>
                <h3 className="hp-invest__title">{r.title}</h3>
                <p className="hp-invest__body">{r.body}</p>
              </article>
            ))}
          </div>

          <div className="hp-invest__cta" data-reveal="up">
            <Link to="/plots" className="btn btn--gold"><BtnText>See All Plot Options</BtnText></Link>
          </div>
        </div>
      </section>

      {/* SITE GALLERY — pinned horizontal track on desktop, swipe on touch */}
      <section className="hp-gallery" ref={sectionRef}>
        <div className="hp-gallery__sticky">
          <div className="wrap hp-gallery__head">
            <div>
              <span className="eyebrow" data-reveal="up">Project Gallery</span>
              <SplitText as="h2" className="display-l" text={"See the Site\n*Before You Decide*"} />
            </div>
            <div className="hp-gallery__aside" data-reveal="up" style={{ '--d': '150ms' }}>
              <p className="lede">Real visuals of the project layout, roads, entrance and the surrounding township.</p>
              <Link to="/gallery" className="btn btn--line"><BtnText>View Full Gallery</BtnText></Link>
            </div>
          </div>

          <div className="hp-gallery__track" ref={trackRef}>
            {sitePhotos.map((photo, i) => (
              <Link
                key={photo.src}
                to="/gallery"
                className="hp-gallery__item"
                aria-label={`${photo.label} - open gallery`}
              >
                <div className="hp-gallery__media media" data-reveal="img" style={{ '--d': `${Math.min(i, 3) * 90}ms` }}>
                  <img src={photo.src} alt={photo.label} loading="lazy" />
                </div>
                <div className="hp-gallery__meta">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <strong className="hp-gallery__label">{photo.label}</strong>
                </div>
              </Link>
            ))}
          </div>

          <div className="wrap hp-gallery__progress" aria-hidden="true">
            <span className="hp-gallery__hint">Scroll to explore</span>
            <span className="hp-gallery__bar"><i /></span>
          </div>
        </div>
      </section>

      {/* BUYING PROCESS */}
      <section className="sec sec--sand hp-process">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">How to Buy</span>
            <SplitText as="h2" className="display-l" text={"Book Your Plot in\n*4 Easy Steps*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              From shortlisting to booking, the process is transparent and no-pressure.
            </p>
          </div>

          <div className="hp-steps-wrap" data-progress>
            <span className="hp-steps__rail" aria-hidden="true"><i /></span>
            <ol className="hp-steps">
              {steps.map(([num, title, text], i) => (
                <li key={title} className="hp-step" data-reveal="up" style={{ '--d': `${i * 110}ms` }}>
                  <span className="hp-step__dot" aria-hidden="true" />
                  <div className="hp-step__num">{num}</div>
                  <h3 className="hp-step__title">{title}</h3>
                  <p className="hp-step__text">{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="btn-row hp-process__cta" data-reveal="up">
            <Link to="/payment" className="btn btn--ink"><BtnText>View Payment Plan</BtnText></Link>
            <Link to="/contact" className="btn btn--line"><BtnText>Talk to Our Team</BtnText></Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <EnquirySection />
    </>
  );
};

export default HomePage;
