import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { publicAsset } from '../utils/publicAsset';
import { usePlots } from '../hooks/usePlots';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import SplitText from '../components/fx/SplitText';
import BtnText from '../components/fx/BtnText';
import './pages.css';
import './PlotsPage.css';

const markedSiteImg = publicAsset('vrindavan-material/entry-view-01.webp');

const plots = [
  {
    type: 'Normal Plot',
    size: '60 Sq. Yd.',
    sqft: '540 sq ft',
    category: 'Residential',
    tone: 'ink',
    tag: 'Entry Level',
    features: ['Ideal for first-time buyers', 'Strong rental potential', 'Compact & easy to build', 'Token: ₹11,000'],
    desc: 'The 60 Sq. Yd. plot is the most accessible entry point into Mero Vrindavan Dham. Ideal for investment, future construction or resale within 2–3 years as the area develops.',
  },
  {
    type: 'Normal Plot',
    size: '100 Sq. Yd.',
    sqft: '900 sq ft',
    category: 'Residential',
    tone: 'gold',
    tag: 'Most Popular',
    features: ['Build a 2–3 BHK home', 'Spacious front setback', 'Good for self-use + investment', 'Token: ₹11,000'],
    desc: 'The 100 Sq. Yd. plot is the most popular choice — large enough to build a comfortable home yet affordable as a pure investment asset near the Yamuna Expressway.',
  },
  {
    type: 'Corner Plot',
    size: '150 Sq. Yd.',
    sqft: '1350 sq ft',
    category: 'Residential Premium',
    tone: 'ink',
    tag: 'Premium',
    features: ['Double road frontage', 'Higher resale value', 'More design flexibility', 'Token: ₹11,000'],
    desc: 'Corner plots at 150 Sq. Yd. offer the premium experience — two road-facing sides, wider construction options and historically higher appreciation compared to regular plots.',
  },
  {
    type: 'Commercial Plot',
    size: '30 Sq. Yd.',
    sqft: '270 sq ft',
    category: 'Commercial',
    tone: 'deep',
    tag: 'Commercial',
    features: ['Shop / showroom use', 'High footfall location', 'Rental income potential', 'Token: ₹11,000'],
    desc: 'Commercial plots at 30 Sq. Yd. are strategically placed within the township for shop, showroom or service business setup. Limited availability — contact for current options.',
  },
];

const specs = [
  { label: 'Total Area', value: '15+ Acres' },
  // road widths as per the proposed layout plan (01-03-2026) and project video
  { label: 'Road Width (Main)', value: '40 ft with central divider' },
  { label: 'Road Width (Commercial)', value: '30 ft (in front of shops)' },
  { label: 'Road Width (Internal)', value: '20 ft, 25 ft & 30 ft' },
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

// Blueprint square whose side is proportional to the plot's footprint.
const PlotFootprint = ({ size, corner }) => {
  const side = Math.round(Math.sqrt(parseFloat(size) / 150) * 64);
  const offset = (72 - side) / 2;
  return (
    <svg className="plot-card__blueprint" viewBox="0 0 72 72" aria-hidden="true">
      <rect x="0.5" y="0.5" width="71" height="71" rx="3" className="plot-card__blueprint-frame" />
      <rect x={offset} y={offset} width={side} height={side} className="plot-card__blueprint-plot" />
      {corner && <path d={`M${offset} ${offset + side + 4}H${offset + side + 4}V${offset}`} className="plot-card__blueprint-road" />}
    </svg>
  );
};

const PlotsPage = () => {
  useSEO(PLOTS_SEO);
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const liveSpecs = [
    { label: 'Total Plots', value: String(totalPlots) },
    ...specs,
  ];

  return (
    <>
      <PageBanner
        variant="plots"
        crumb="Plots & Pricing"
        kicker="Plots & Pricing"
        title={"Choose Your Plot at\n*Mero Vrindavan Dham*"}
        subtitle="Residential and commercial plot options from 30 to 150 Sq. Yd. — near Vrindavan, Mathura and Yamuna Expressway."
      />

      {/* Plot Cards */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Available Options</span>
            <SplitText as="h2" className="display-l" text={"Plot Types &\n*Details*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Contact for current pricing — all plots come with clear documentation support and guided site visit.
            </p>
          </div>
          <div className="plots-grid" data-reveal="stagger">
            {plots.map((p) => (
              <article key={p.size + p.type} className={`plot-card plot-card--${p.tone}`}>
                <header className="plot-card__header">
                  <div className="plot-card__header-top">
                    <span className="plot-card__tag">{p.tag}</span>
                    <PlotFootprint size={p.size} corner={p.type === 'Corner Plot'} />
                  </div>
                  <div className="plot-card__size">{p.size}</div>
                  <div className="plot-card__sqft">{p.sqft} • {p.category}</div>
                </header>
                <div className="plot-card__body">
                  <h3 className="plot-card__type">{p.type}</h3>
                  <p className="plot-card__desc">{p.desc}</p>
                  <ul className="ip-checks plot-card__features">
                    {p.features.map((f) => (
                      <li key={f}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn--ink btn--block plot-card__btn">
                    <BtnText>Enquire for Price</BtnText>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Site Map */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Site Overview</span>
            <SplitText as="h2" className="display-l" text={"Project Layout &\n*Site Map*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              The marked site overview shows the overall layout, internal roads and plot demarcation across the 15+ acre township.
            </p>
          </div>
          <div className="plots-map">
            <div className="media plots-map__media" data-reveal="img">
              <img src={markedSiteImg} alt="Mero Vrindavan Dham Site Overview" loading="lazy" data-parallax="0.08" />
            </div>
            <div className="plots-map__legend" data-reveal="up" style={{ '--d': '400ms' }}>
              <div className="plots-map__legend-item"><span style={{ background: '#3a2d20' }}></span> Main Roads</div>
              <div className="plots-map__legend-item"><span style={{ background: '#a9763f' }}></span> Internal Roads</div>
              <div className="plots-map__legend-item"><span style={{ background: '#5a8a6a' }}></span> Green Spaces</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Table */}
      <section className="sec sec--paper">
        <div className="wrap plots-specs">
          <div className="plots-specs__head">
            <span className="eyebrow" data-reveal="up">Specifications</span>
            <SplitText as="h2" className="display-l" text={"Project\n*Specifications*"} />
          </div>
          <dl className="plots-specs__table" data-reveal="stagger">
            {liveSpecs.map((s) => (
              <div key={s.label} className="plots-specs__row">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaStrip
        title={"Interested in a *Plot?*"}
        sub="Get the latest pricing, availability and payment plan — contact our team for a direct conversation."
        primary={{ to: '/contact', label: 'Book Site Visit' }}
        secondary={{ to: '/payment', label: 'View Payment Plan' }}
      />
    </>
  );
};

export default PlotsPage;
