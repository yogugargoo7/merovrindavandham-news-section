import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import './pages.css';
import './PaymentPage.css';

const plotPlans = [
  {
    num: '1',
    type: 'Normal Plot',
    size: '60 Sq. Yd.',
    tag: 'Entry Level',
    color: '#3a2d20',
    rate: 'Rs. 16,000',
    total: 'Rs. 9,60,000',
    booking: 'Rs. 3,84,000',
    bookingPct: '40%',
    note: 'Booking amount is 40% (Rs. 3,84,000), payable within 7 days as per the latest payment plan. The remaining amount is payable in 6 to 12 monthly installments.',
  },
  {
    num: '2',
    type: 'Normal Plot',
    size: '100 Sq. Yd.',
    tag: 'Most Popular',
    color: '#a9763f',
    rate: 'Rs. 16,000',
    total: 'Rs. 16,00,000',
    booking: 'Rs. 6,40,000',
    bookingPct: '40%',
    note: 'Booking amount is 40% (Rs. 6,40,000), payable within 7 days as per the latest payment plan. The remaining amount is payable in 6 to 12 monthly installments.',
  },
  {
    num: '3',
    type: 'Corner Plot',
    size: '150 Sq. Yd.',
    tag: 'Corner Premium',
    color: '#3a2d20',
    rate: 'Rs. 18,000',
    total: 'Rs. 27,00,000',
    booking: 'Rs. 10,80,000',
    bookingPct: '40%',
    note: 'Booking amount is 40% (Rs. 10,80,000), payable within 7 days as per the latest payment plan. The remaining amount is payable in 6 to 12 monthly installments.',
  },
  {
    num: '4',
    type: 'Commercial Plot',
    size: '30 Sq. Yd.',
    tag: 'Commercial',
    color: '#a9763f',
    rate: 'Rs. 20,000',
    total: 'Rs. 6,00,000',
    booking: 'Rs. 2,40,000',
    bookingPct: '40%',
    note: 'Booking amount is 40% (Rs. 2,40,000), payable within 7 days as per the latest payment plan. The remaining amount is payable in 6 to 12 monthly installments.',
  },
];

const bankInfo = [
  { icon: '🏦', title: 'Bank Loan Eligible', desc: 'Plots are eligible for home loans from major banks and NBFCs including SBI, HDFC, ICICI and others.' },
  { icon: '📄', title: 'Clear Title Documents', desc: 'All documents are clear and verified. Buyer receives full documentation support from the developer.' },
  { icon: '💳', title: 'Flexible Payment Modes', desc: 'NEFT, RTGS, cheque or bank transfer accepted. No cash transactions. The process is documented for buyer clarity.' },
  { icon: '🔒', title: 'Secure Process', desc: 'Registered sale agreement protects your booking. Every step is documented clearly with buyer support.' },
];

const PAYMENT_SEO = {
  title: 'Payment Plan | Plots in Vrindavan from Rs. 16,000/Sq. Yd. | Mero Vrindavan Dham',
  description: 'Payment plan for Vrindavan plots. Token Rs. 11,000, booking 40%, balance in 6 to 12 month installments and registry at 70% payment as per the latest payment details.',
  canonical: 'https://merovrindavandham.com/payment',
  ogUrl: 'https://merovrindavandham.com/payment',
};

const PaymentPage = () => {
  useReveal();
  useSEO(PAYMENT_SEO);

  return (
    <>
      {/* Banner */}
      <div className="page-banner page-banner--payment">
        <div className="page-banner__content">
          <div className="page-banner__breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-banner__breadcrumb-sep">/</span>
            <span>Payment Plan</span>
          </div>
          <div className="page-banner__kicker">Pricing & Payment Plan</div>
          <h1 className="page-banner__title">Prime Location.<br />Smart Price. High Growth.</h1>
          <p className="page-banner__subtitle">Token amount is Rs. 11,000 as per the latest payment plan. Booking is 40% within 7 days, with the remaining amount payable in 6 to 12 monthly installments.</p>
        </div>
        <div className="page-banner__line"></div>
      </div>

      {/* Token Highlight Bar */}
      <div className="payment-token-bar reveal-on-scroll">
        <div className="payment-token-bar__inner">
          <div className="payment-token-bar__icon">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="payment-token-bar__label">Token Amount</div>
            <div className="payment-token-bar__amount">Rs. 11,000</div>
          </div>
          <div className="payment-token-bar__divider"></div>
          <div className="payment-token-bar__meta">
            <span>Booking: <strong>40%</strong> within 7 days</span>
            <span>Installments: <strong>6-12 months</strong></span>
            <span>Registry: On <strong>70% payment</strong></span>
          </div>
        </div>
      </div>

      {/* Plot Plan Cards */}
      <section className="inner-section inner-section--white reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Plot Pricing</span>
            <h2 className="inner-title">Current Plot Rates</h2>
            <p className="inner-desc">All prices are as per the latest payment plan: token Rs. 11,000, 40% booking within 7 days and balance in 6 to 12 monthly installments.</p>
          </div>
          <div className="pp-grid stagger-children">
            {plotPlans.map((p) => (
              <div key={p.size} className="pp-card">
                <div className="pp-card__header" style={{ background: p.color }}>
                  <div className="pp-card__num-badge">{p.num}</div>
                  <div className="pp-card__type">{p.type}</div>
                  <div className="pp-card__rate">{p.rate}/-</div>
                  <div className="pp-card__rate-label">per Sq. Yd.</div>
                </div>
                <div className="pp-card__body">
                  <div className="pp-card__row">
                    <div className="pp-card__row-icon">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </div>
                    <span className="pp-card__row-label">Plot Size</span>
                    <span className="pp-card__row-value">{p.size} Plot</span>
                  </div>
                  <div className="pp-card__row">
                    <div className="pp-card__row-icon">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <span className="pp-card__row-label">Total Amount</span>
                    <span className="pp-card__row-value pp-card__row-value--bold">{p.total}/-</span>
                  </div>
                  <div className="pp-card__row pp-card__row--highlight">
                    <div className="pp-card__row-icon">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                    <span className="pp-card__row-label">Booking Amount ({p.bookingPct})</span>
                    <span className="pp-card__row-value pp-card__row-value--accent">{p.booking}/-</span>
                  </div>
                  <p className="pp-card__note">{p.note}</p>
                  <Link to="/contact" className="pp-card__btn">
                    Enquire to Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registry Info */}
      <section className="inner-section inner-section--gray reveal-on-scroll">
        <div className="inner-container">
          <div className="payment-registry-box stagger-children">
            <div className="payment-registry-card">
              <div className="payment-registry-card__icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3>Registry</h3>
              <p>On completion of <strong>70% payment</strong>, registry will be processed in your name.</p>
            </div>
            <div className="payment-registry-card">
              <div className="payment-registry-card__icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3>Mutation</h3>
              <p>Mutation will be finalized after <strong>full payment (100%)</strong> is completed by the buyer.</p>
            </div>
            <div className="payment-registry-card">
              <div className="payment-registry-card__icon">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Token Amount</h3>
              <p><strong>Rs. 11,000</strong> token amount applies as per the latest payment plan. Confirm current availability and written terms before payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bank & Documentation Info */}
      <section className="inner-section inner-section--white reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Loans & Documentation</span>
            <h2 className="inner-title">Bank Loans & Secure Process</h2>
          </div>
          <div className="payment-bank-grid stagger-children">
            {bankInfo.map((b) => (
              <div key={b.title} className="payment-bank-card">
                <div className="payment-bank-card__icon">{b.icon}</div>
                <h3 className="payment-bank-card__title">{b.title}</h3>
                <p className="payment-bank-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="page-cta-strip page-cta-strip--payment">
        <h2 className="page-cta-strip__title">Ready to Book Your Plot?</h2>
        <p className="page-cta-strip__sub">Token amount is Rs. 11,000 as per the latest payment plan. Contact the team to confirm availability and written booking terms.</p>
        <div className="page-cta-strip__buttons">
          <Link to="/contact" className="page-cta-btn page-cta-btn--primary">Enquire to Book</Link>
          <Link to="/plots" className="page-cta-btn page-cta-btn--secondary">View All Plots</Link>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
