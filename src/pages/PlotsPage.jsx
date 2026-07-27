import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import { publicAsset } from '../utils/publicAsset';
import { usePlots } from '../hooks/usePlots';
import './pages.css';
import './PlotsPage.css';

const markedSiteImg = publicAsset('vrindavan-material/entry-view-01.webp');

const plots = [
  {
    type: 'Normal Plot',
    size: '60 Sq. Yd.',
    sqft: '540 sq ft',
    category: 'Residential',
    color: '#3a2d20',
    tag: 'Entry Level',
    features: ['Ideal for first-time buyers', 'Strong rental potential', 'Compact & easy to build', 'Token: ₹11,000'],
    desc: 'The 60 Sq. Yd. plot is the most accessible entry point into Mero Vrindavan Dham. Ideal for investment, future construction or resale within 2–3 years as the area develops.',
  },
  {
    type: 'Normal Plot',
    size: '100 Sq. Yd.',
    sqft: '900 sq ft',
    category: 'Residential',
    color: '#a9763f',
    tag: 'Most Popular',
    features: ['Build a 2–3 BHK home', 'Spacious front setback', 'Good for self-use + investment', 'Token: ₹11,000'],
    desc: 'The 100 Sq. Yd. plot is the most popular choice — large enough to build a comfortable home yet affordable as a pure investment asset near the Yamuna Expressway.',
  },
  {
    type: 'Corner Plot',
    size: '150 Sq. Yd.',
    sqft: '1350 sq ft',
    category: 'Residential Premium',
    color: '#3a2d20',
    tag: 'Premium',
    features: ['Double road frontage', 'Higher resale value', 'More design flexibility', 'Token: ₹11,000'],
    desc: 'Corner plots at 150 Sq. Yd. offer the premium experience — two road-facing sides, wider construction options and historically higher appreciation compared to regular plots.',
  },
  {
    type: 'Commercial Plot',
    size: '30 Sq. Yd.',
    sqft: '270 sq ft',
    category: 'Commercial',
    color: '#5C4A1E',
    tag: 'Commercial',
    features: ['Shop / showroom use', 'High footfall location', 'Rental income potential', 'Token: ₹11,000'],
    desc: 'Commercial plots at 30 Sq. Yd. are strategically placed within the township for shop, showroom or service business setup. Limited availability — contact for current options.',
  },
];

const specs = [
  { label: 'Total Area', value: '15+ Acres' },
  { label: 'Road Width (Main)', value: '30 ft' },
  { label: 'Road Width (Internal)', value: '20 ft' },
  { label: 'Plot Boundary', value: 'Clearly demarcated' },
  { label: 'Soil Type', value: 'Hard & buildable' },
  { label: 'Water Supply', value: 'Planned within layout' },
  { label: 'Electricity', value: 'Grid connection planned' },
  { label: 'Drainage', value: 'Layout includes drainage' },
  { label: 'Location', value: 'Vrindavan–Mathura belt' },
  { label: 'Nearest Expressway', value: 'Yamuna Expressway' },
  { label: 'Documentation', value: 'Clear documents with buyer support' },
];

const PLOTS_SEO = {
  title: 'Plot Sizes & Pricing | 60, 100, 150 Sq.Yd. Residential Plots in Vrindavan',
  description: 'View all plot types at Mero Vrindavan Dham. Normal plots (60 & 100 sq.yd) at ₹16,000/sq.yd, corner plots (150 sq.yd) at ₹18,000/sq.yd, commercial plots (30 sq.yd) at ₹20,000/sq.yd. Token ₹11,000.',
  canonical: 'https://merovrindavandham.com/plots',
  ogUrl: 'https://merovrindavandham.com/plots',
};

const PlotsPage = () => {
  useReveal();
  useSEO(PLOTS_SEO);
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const liveSpecs = [
    { label: 'Total Plots', value: String(totalPlots) },
    ...specs,
  ];

  return (
    <>
      {/* Banner */}
      <div className="page-banner page-banner--plots">
        <div className="page-banner__content">
          <div className="page-banner__breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-banner__breadcrumb-sep">/</span>
            <span>Plots & Pricing</span>
          </div>
          <div className="page-banner__kicker">Plots & Pricing</div>
          <h1 className="page-banner__title">Choose Your Plot at<br />Mero Vrindavan Dham</h1>
          <p className="page-banner__subtitle">Residential and commercial plot options from 30 to 150 Sq. Yd. — near Vrindavan, Mathura and Yamuna Expressway.</p>
        </div>
        <div className="page-banner__line"></div>
      </div>

      {/* Plot Cards */}
      <section className="inner-section inner-section--white reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Available Options</span>
            <h2 className="inner-title">Plot Types & Details</h2>
            <p className="inner-desc">Contact for current pricing — all plots come with clear documentation support and guided site visit.</p>
          </div>
          <div className="plots-grid stagger-children">
            {plots.map((p) => (
              <div key={p.size + p.type} className="plot-card">
                <div className="plot-card__header" style={{ background: p.color }}>
                  <span className="plot-card__tag">{p.tag}</span>
                  <div className="plot-card__size">{p.size}</div>
                  <div className="plot-card__sqft">{p.sqft} • {p.category}</div>
                </div>
                <div className="plot-card__body">
                  <h3 className="plot-card__type">{p.type}</h3>
                  <p className="plot-card__desc">{p.desc}</p>
                  <ul className="plot-card__features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <svg width="14" height="14" fill="none" stroke="#3a2d20" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="plot-card__btn">
                    Enquire for Price
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Map */}
      <section className="inner-section inner-section--gray reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Site Overview</span>
            <h2 className="inner-title">Project Layout & Site Map</h2>
            <p className="inner-desc">The marked site overview shows the overall layout, internal roads and plot demarcation across the 15+ acre township.</p>
          </div>
          <div className="plots-map-wrap">
            <img src={markedSiteImg} alt="Mero Vrindavan Dham Site Overview" className="plots-map-img" loading="lazy" />
            <div className="plots-map-legend">
              <div className="plots-map-legend__item"><span style={{ background: '#3a2d20' }}></span> Main Roads</div>
              <div className="plots-map-legend__item"><span style={{ background: '#a9763f' }}></span> Internal Roads</div>
              <div className="plots-map-legend__item"><span style={{ background: '#5a8a6a' }}></span> Green Spaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="inner-section inner-section--gray reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Specifications</span>
            <h2 className="inner-title">Project Specifications</h2>
          </div>
          <div className="plots-specs-table">
            {liveSpecs.map((s) => (
              <div key={s.label} className="plots-spec-row">
                <span className="plots-spec-label">{s.label}</span>
                <span className="plots-spec-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="page-cta-strip page-cta-strip--plots">
        <h2 className="page-cta-strip__title">Interested in a Plot?</h2>
        <p className="page-cta-strip__sub">Get the latest pricing, availability and payment plan — contact our team for a direct conversation.</p>
        <div className="page-cta-strip__buttons">
          <Link to="/contact" className="page-cta-btn page-cta-btn--primary">Book Site Visit</Link>
          <Link to="/payment" className="page-cta-btn page-cta-btn--secondary">View Payment Plan</Link>
        </div>
      </div>
    </>
  );
};

export default PlotsPage;
