import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { usePlots } from '../hooks/usePlots';
import { useSEO } from '../hooks/useSEO';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import BtnText from '../components/fx/BtnText';
import './pages.css';
import './AvailabilityPage.css';

const AVAILABLE_META = { label: 'Available', color: '#22C55E', bg: '#F0FDF4', text: '#15803D' };

function fmt(n) {
  return new Intl.NumberFormat('en-IN').format(n || 0);
}

function timeAgo(date) {
  if (!date) return '';
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const PlotModal = ({ plot, onClose }) => {
  if (!plot) return null;

  return (
    <div className="av-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" data-lenis-prevent>
      <div className="av-modal" onClick={(e) => e.stopPropagation()}>
        <button className="av-modal__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="av-modal__head">
          <h2 className="av-modal__plot-num">Plot {plot.plotNumber}</h2>
          <span className="av-modal__status-badge" style={{ background: AVAILABLE_META.bg, color: AVAILABLE_META.text, borderColor: AVAILABLE_META.color }}>
            <span className="av-modal__status-dot" style={{ background: AVAILABLE_META.color }}></span>
            {AVAILABLE_META.label}
          </span>
        </div>
        <div className="av-modal__total">
          <div className="av-modal__total-label">Total Price</div>
          <div className="av-modal__total-price">Rs. {fmt(plot.totalPrice)}</div>
        </div>
        <div className="av-modal__grid">
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Plot Size</span>
            <span className="av-modal__cell-value">{plot.size} Sq. Yd.</span>
          </div>
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Rate / Sq. Yd.</span>
            <span className="av-modal__cell-value">Rs. {fmt(plot.rate)}</span>
          </div>
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Block</span>
            <span className="av-modal__cell-value">{plot.block}</span>
          </div>
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Facing</span>
            <span className="av-modal__cell-value">{plot.facing || 'N/A'}</span>
          </div>
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Site</span>
            <span className="av-modal__cell-value av-modal__cell-value--small">{plot.siteName || 'Mero Vrindavan Dham'}</span>
          </div>
          <div className="av-modal__cell">
            <span className="av-modal__cell-label">Plot ID</span>
            <span className="av-modal__cell-value">#{plot.id}</span>
          </div>
        </div>
        <div className="av-modal__actions">
          <Link to="/contact" className="btn btn--gold btn--block" onClick={onClose}>
            <BtnText>Enquire to Book</BtnText>
          </Link>
          <Link to="/contact" className="btn btn--line btn--block" onClick={onClose}>
            <BtnText>Get Details</BtnText>
          </Link>
        </div>
      </div>
    </div>
  );
};

const AVAILABILITY_SEO = {
  title: 'Live Available Plots | Mero Vrindavan Dham',
  description: 'See live available plots at Mero Vrindavan Dham, Vrindavan. The inventory shows only plots currently available for enquiry and booking.',
  canonical: 'https://merovrindavandham.com/availability',
  ogUrl: 'https://merovrindavandham.com/availability',
};

const AvailabilityPage = () => {
  useSEO(AVAILABILITY_SEO);
  const { plots, loading, error, lastUpdated, refresh } = usePlots();
  const [activeBlock, setActiveBlock] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const blocks = useMemo(() => {
    const b = [...new Set(plots.map((p) => p.block).filter(Boolean))].sort();
    return ['ALL', ...b];
  }, [plots]);

  const filtered = useMemo(() => {
    const result = plots.filter((p) => {
      if (activeBlock !== 'ALL' && p.block !== activeBlock) return false;
      if (search && !p.plotNumber.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    result.sort((a, b) => {
      const aBlock = a.block || '';
      const bBlock = b.block || '';
      if (aBlock !== bBlock) return aBlock.localeCompare(bBlock);
      const aNum = parseInt(a.plotNumber.replace(/\D/g, ''), 10) || 0;
      const bNum = parseInt(b.plotNumber.replace(/\D/g, ''), 10) || 0;
      return aNum - bNum;
    });

    return result;
  }, [plots, activeBlock, search]);

  return (
    <>
      <PageBanner
        variant="availability"
        crumb="Plot Availability"
        kicker="Live CRM Inventory"
        title={"Available Plots -\n*Live CRM View*"}
        subtitle="Only plots currently available in the live CRM inventory are shown here."
      />

      <div className="av-stats">
        <div className="wrap av-stats__inner">
          <div className="av-stats__card" data-reveal="up">
            <span className="av-stats__live" style={{ '--dot': AVAILABLE_META.color }}>
              <span className="av-stats__dot" />
              Live
            </span>
            <span className="av-stats__num">{plots.length}</span>
            <span className="av-stats__label">Available Plots</span>
          </div>
          <div className="av-stats__meta" data-reveal="up" style={{ '--d': '120ms' }}>
            {lastUpdated && (
              <button className="av-stats__refresh" onClick={refresh} title="Refresh data">
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Updated {timeAgo(lastUpdated)}
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="sec sec--paper av-section">
        <div className="wrap">
          <div className="av-toolbar" data-reveal="up">
            <div className="av-tabs" role="tablist" aria-label="Filter by block">
              {blocks.map((b) => (
                <button
                  key={b}
                  role="tab"
                  aria-selected={activeBlock === b}
                  className={`av-tab${activeBlock === b ? ' av-tab--active' : ''}`}
                  onClick={() => setActiveBlock(b)}
                >
                  {b === 'ALL' ? 'All Blocks' : `Block ${b}`}
                </button>
              ))}
            </div>
            <div className="av-search">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search plot e.g. A01"
                className="av-search__input"
                aria-label="Search plot number"
              />
              {search && (
                <button className="av-search__clear" onClick={() => setSearch('')} aria-label="Clear">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="av-showing">
            Showing <strong>{filtered.length}</strong> available plots
            {activeBlock !== 'ALL' && <span> - Block {activeBlock}</span>}
          </div>

          {loading && (
            <div className="av-grid">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="av-skeleton" style={{ '--i': i }}></div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="av-error">
              <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p>Could not load live CRM plot data: {error}</p>
              <button onClick={refresh} className="btn btn--ink btn--no-icon"><BtnText icon={false}>Retry</BtnText></button>
            </div>
          )}

          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="av-empty">No available plots found in live CRM inventory.</div>
              ) : (
                <div className="av-grid">
                  {filtered.map((plot, i) => (
                    <button
                      key={plot.id}
                      className="av-cell"
                      style={{ '--plot-color': AVAILABLE_META.color, '--i': Math.min(i, 40) }}
                      onClick={() => setSelected(plot)}
                      aria-label={`Plot ${plot.plotNumber} - Available`}
                      title={`${plot.plotNumber} - ${plot.size} Sq. Yd. - Available`}
                    >
                      <span className="av-cell__dot" aria-hidden="true" />
                      <span className="av-cell__num">{plot.plotNumber}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CtaStrip
        title={"Found an Available *Plot?*"}
        sub="Token amount just Rs. 11,000/- - Contact our team to confirm current availability and booking."
        primary={{ to: '/payment', label: 'View Payment Plan' }}
        secondary={{ to: '/contact', label: 'Contact Us' }}
      />

      <PlotModal plot={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default AvailabilityPage;
