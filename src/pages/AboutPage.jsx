import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import Process from '../components/Process/Process';
import FAQ from '../components/FAQ/FAQ';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import SplitText from '../components/fx/SplitText';
import BtnText from '../components/fx/BtnText';
import { publicAsset } from '../utils/publicAsset';
import { usePlots } from '../hooks/usePlots';
import './pages.css';
import './AboutPage.css';

const strategicImg = publicAsset('vrindavan-material/drone-view-mvd-3d.webp');
const premMandirImg = publicAsset('vrindavan-material/mvd-photo-1.webp');
const site1 = publicAsset('vrindavan-material/entry-view-01.webp');

const IconPlots = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10"/>
  </svg>
);
const IconAcres = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 0M5 21l14 0M3 5l0 14M21 5l0 14"/>
    <rect x="7" y="7" width="10" height="10" rx="1" strokeLinecap="round"/>
  </svg>
);
const IconPin = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
);
const IconTemple = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 7h16L12 2zM4 7v13h16V7M9 20v-6h6v6"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v5"/>
  </svg>
);
const IconPlane = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
  </svg>
);
const IconValue = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
  </svg>
);
const IconRoad = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5-5 5-5M15 4l5 5-5 5M12 3v18"/>
  </svg>
);
const IconDoc = () => (
  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0120 9.414V19a2 2 0 01-2 2z"/>
  </svg>
);

const highlights = [
  { Icon: IconAcres,  num: '15+',     label: 'Acres Township',   desc: 'Open green layout with planned roads and clear plot demarcation.' },
  { Icon: IconPin,    num: 'Route',   label: 'Yamuna Expressway Access', desc: 'Connectivity toward Delhi NCR, Mathura and Agra; confirm the exact route before visiting.' },
  { Icon: IconTemple, num: 'Nearby',  label: 'Vrindavan-Mathura Belt',   desc: 'Useful for buyers comparing spiritual location with practical access.' },
  { Icon: IconPlane,  num: 'Jewar',   label: 'Airport Corridor',         desc: 'Noida International Airport is a major regional infrastructure project in the wider corridor.' },
  { Icon: IconValue,  num: 'Plan',    label: 'Latest Payment Details',   desc: 'Pricing and booking information should be matched with the latest payment plan.' },
];

const reasons = [
  { Icon: IconTemple, title: 'Spiritual + Investment Value',   desc: 'Vrindavan and Mathura draw a large number of pilgrims and tourists yearly. This keeps the location relevant for buyers considering long-term land ownership.' },
  { Icon: IconRoad,   title: 'Yamuna Expressway Corridor',     desc: 'The Yamuna Expressway is a 165.5 km access-controlled corridor connecting Greater Noida with Agra, with Mathura and Jewar as important regional points.' },
  { Icon: IconPlane,  title: 'Noida International Airport Impact', desc: 'Noida International Airport at Jewar is expected to improve regional connectivity. Buyers should treat future appreciation as potential and verify all assumptions independently.' },
  { Icon: IconDoc,    title: 'Clear Documentation',            desc: 'Guided support through site visit, documentation verification and booking. Every step is transparent with buyer support at each stage.' },
];

const ABOUT_SEO = {
  title: 'About Mero Vrindavan Dham | Plots in Vrindavan near Yamuna Expressway',
  description: 'Discover Mero Vrindavan Dham near the Vrindavan-Mathura belt with Yamuna Expressway connectivity. View plot options, payment details and site visit support.',
  canonical: 'https://merovrindavandham.com/about',
  ogUrl: 'https://merovrindavandham.com/about',
};

const AboutPage = () => {
  useSEO(ABOUT_SEO);
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const liveHighlights = [
    { Icon: IconPlots, num: String(totalPlots), label: 'Total Plots', desc: 'Residential & commercial options updated regularly.' },
    ...highlights,
  ];
  return (
    <>
      <PageBanner
        variant="about"
        crumb="About Project"
        kicker="About Mero Vrindavan Dham"
        title={"A Township Built for\n*Investors & Believers*"}
        subtitle="Plotted development near Vrindavan and Mathura with Yamuna Expressway connectivity and spiritual-location relevance."
      />

      {/* Project Introduction */}
      <section className="sec sec--paper">
        <div className="wrap ip-split about-intro">
          <div className="ip-copy">
            <span className="eyebrow" data-reveal="up">The Project</span>
            <SplitText as="h2" className="display-l" text={"Mero Vrindavan Dham *Township*"} />
            <p className="lede" data-reveal="up">
              Mero Vrindavan Dham is a planned plotted township positioned around the Vrindavan-Mathura growth belt with Yamuna Expressway connectivity. The project brings together spiritual-location relevance, practical access and transparent buyer support.
            </p>
            <p data-reveal="up">
              With plot options shown from 60 Sq. Yd. to 150 Sq. Yd. for corner plots, the project is designed for end-users looking near Vrindavan and buyers comparing long-term land options around the Yamuna Expressway corridor.
            </p>
            <p data-reveal="up">
              The township spans 15+ acres with wide internal roads, clear plot markings, proper drainage planning and an approach road that gives buyers a clear sense of the layout from day one.
            </p>
            <div className="btn-row" data-reveal="up">
              <Link to="/plots" className="btn btn--ink"><BtnText>View Plot Options</BtnText></Link>
              <Link to="/contact" className="btn btn--line"><BtnText>Schedule Site Visit</BtnText></Link>
            </div>
          </div>
          <div className="about-intro__visual">
            <div className="media about-intro__media" data-reveal="img">
              <img src={strategicImg} alt="Mero Vrindavan Dham township drone view" loading="lazy" data-parallax="0.08" />
            </div>
            <div className="about-intro__badge" data-reveal="up" style={{ '--d': '500ms' }}>
              <span className="about-intro__badge-dot" aria-hidden="true" />
              Near Yamuna Expressway
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Project Highlights</span>
            <SplitText as="h2" className="display-l" text={"Numbers That *Matter*"} />
          </div>
          <div className="about-highlights" data-reveal="stagger">
            {liveHighlights.map((h) => (
              <div key={h.label} className="about-highlight">
                <div className="about-highlight__top">
                  <div className="about-highlight__num">{h.num}</div>
                  <div className="ip-icon"><h.Icon /></div>
                </div>
                <div className="about-highlight__label">{h.label}</div>
                <p className="about-highlight__desc">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Investment Case</span>
            <SplitText as="h2" className="display-l" text={"Why Invest Near\n*Vrindavan?*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Four compelling reasons why this location is one of the strongest real estate bets in North India right now.
            </p>
          </div>
          <div className="about-reasons">
            {reasons.map((r, i) => (
              <article key={r.title} className="about-reason" data-reveal="up" style={{ '--d': `${(i % 2) * 120}ms` }}>
                <span className="about-reason__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="ip-icon"><r.Icon /></div>
                <div className="about-reason__body">
                  <h3 className="about-reason__title">{r.title}</h3>
                  <p className="about-reason__desc">{r.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Location Photo Strip */}
      <section className="sec sec--sand">
        <div className="wrap about-strip">
          <figure className="about-strip__main">
            <div className="media about-strip__media" data-reveal="img">
              <img src={premMandirImg} alt="Mero Vrindavan Dham project visual" loading="lazy" data-parallax="0.1" />
            </div>
            <figcaption className="about-strip__caption">Mero Vrindavan Dham - Project Site View</figcaption>
          </figure>
          <div className="about-strip__side">
            <div className="media about-strip__thumb" data-reveal="img" style={{ '--d': '150ms' }}>
              <img src={site1} alt="Project site" loading="lazy" />
            </div>
            <div className="about-strip__card on-dark" data-reveal="up" style={{ '--d': '250ms' }}>
              <h3 className="display-s">Visit the Site Today</h3>
              <p>The best way to understand the project is to see it in person. Our team will guide you through the site, show available plots and answer all your questions.</p>
              <Link to="/contact" className="btn btn--gold"><BtnText>Book Site Visit</BtnText></Link>
            </div>
          </div>
        </div>
      </section>

      <Process />
      <FAQ />

      <CtaStrip
        title={"Ready to Take the\n*Next Step?*"}
        sub="Connect with our team for brochure, latest payment plan and site visit coordination."
        primary={{ to: '/plots', label: 'View Plots & Pricing' }}
        secondary={{ to: '/contact', label: 'Contact Us' }}
      />
    </>
  );
};

export default AboutPage;
