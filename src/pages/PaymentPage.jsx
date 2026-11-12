import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import SplitText from '../components/fx/SplitText';
import BtnText from '../components/fx/BtnText';
import './pages.css';
import './PaymentPage.css';

const plotPlans = [
  {
    num: '1',
    type: 'Normal Plot',
    size: '60 Sq. Yd.',
    tag: 'Entry Level',
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
    rate: 'Rs. 20,000',
    total: 'Rs. 6,00,000',
    booking: 'Rs. 2,40,000',
    bookingPct: '40%',
    note: 'Booking amount is 40% (Rs. 2,40,000), payable within 7 days as per the latest payment plan. The remaining amount is payable in 6 to 12 monthly installments.',
  },
];

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const bankInfo = [
  { icon: icon('M3 21h18M4 10h16M5 6l7-3 7 3M6 10v8m4-8v8m4-8v8m4-8v8'), title: 'Bank Loan Eligible', desc: 'Plots are eligible for home loans from major banks and NBFCs including SBI, HDFC, ICICI and others.' },
  { icon: icon('M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'), title: 'Clear Title Documents', desc: 'All documents are clear and verified. Buyer receives full documentation support from the developer.' },
  { icon: icon('M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'), title: 'Flexible Payment Modes', desc: 'NEFT, RTGS, cheque or bank transfer accepted. No cash transactions. The process is documented for buyer clarity.' },
  { icon: icon('M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'), title: 'Secure Process', desc: 'Registered sale agreement protects your booking. Every step is documented clearly with buyer support.' },
];

const PAYMENT_SEO = {
  title: 'Payment Plan | Plots in Vrindavan from Rs. 16,000/Sq. Yd. | Mero Vrindavan Dham',
  description: 'Payment plan for Vrindavan plots. Token Rs. 11,000, booking 40%, balance in 6 to 12 month installments and registry at 70% payment as per the latest payment details.',
  canonical: 'https://merovrindavandham.com/payment',
  ogUrl: 'https://merovrindavandham.com/payment',
};

const PaymentPage = () => {
  useSEO(PAYMENT_SEO);

  return (
    <>
      <PageBanner
        variant="payment"
        crumb="Payment Plan"
        kicker="Pricing & Payment Plan"
        title={"Prime Location.\nSmart Price. *High Growth.*"}
        subtitle="Token amount is Rs. 11,000 as per the latest payment plan. Booking is 40% within 7 days, with the remaining amount payable in 6 to 12 monthly installments."
      />

      {/* Token Highlight Bar */}
      <div className="pay-token">
        <div className="wrap">
          <div className="pay-token__card on-dark" data-reveal="up">
            <div className="pay-token__main">
              <div className="pay-token__icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="pay-token__label">Token Amount</div>
                <div className="pay-token__amount">Rs. 11,000</div>
              </div>
            </div>
            <div className="pay-token__meta">
              <span>Booking: <strong>40%</strong> within 7 days</span>
              <span>Installments: <strong>6-12 months</strong></span>
              <span>Registry: On <strong>70% payment</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Plot Plan Cards */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Plot Pricing</span>
            <SplitText as="h2" className="display-l" text={"Current Plot\n*Rates*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              All prices are as per the latest payment plan: token Rs. 11,000, 40% booking within 7 days and balance in 6 to 12 monthly installments.
            </p>
          </div>
          <div className="pp-grid" data-reveal="stagger">
            {plotPlans.map((p) => (
              <article key={p.size} className={`pp-card${p.tag === 'Most Popular' ? ' pp-card--featured' : ''}`}>
                <header className="pp-card__header">
                  <div className="pp-card__num-badge">{p.num.padStart(2, '0')}</div>
                  <div className="pp-card__type">{p.type}</div>
                  <div className="pp-card__rate">{p.rate}/-</div>
                  <div className="pp-card__rate-label">per Sq. Yd.</div>
                </header>
                <div className="pp-card__body">
                  <dl className="pp-card__rows">
                    <div className="pp-card__row">
                      <dt>Plot Size</dt>
                      <dd>{p.size} Plot</dd>
                    </div>
                    <div className="pp-card__row">
                      <dt>Total Amount</dt>
                      <dd className="pp-card__strong">{p.total}/-</dd>
                    </div>
                    <div className="pp-card__row pp-card__row--highlight">
                      <dt>Booking Amount ({p.bookingPct})</dt>
                      <dd>{p.booking}/-</dd>
                    </div>
                  </dl>
                  <p className="pp-card__note">{p.note}</p>
                  <Link to="/contact" className="btn btn--ink btn--block pp-card__btn">
                    <BtnText>Enquire to Book</BtnText>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Registry Info */}
      <section className="sec sec--sand">
        <div className="wrap">
          <div className="pay-registry" data-reveal="stagger">
            <div className="ip-card pay-registry__card">
              <span className="pay-registry__step">01</span>
              <div className="ip-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="ip-card__title">Registry</h3>
              <p className="ip-card__text">On completion of <strong>70% payment</strong>, registry will be processed in your name.</p>
            </div>
            <div className="ip-card pay-registry__card">
              <span className="pay-registry__step">02</span>
              <div className="ip-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="ip-card__title">Mutation</h3>
              <p className="ip-card__text">Mutation will be finalized after <strong>full payment (100%)</strong> is completed by the buyer.</p>
            </div>
            <div className="ip-card pay-registry__card">
              <span className="pay-registry__step">03</span>
              <div className="ip-icon">
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="ip-card__title">Token Amount</h3>
              <p className="ip-card__text"><strong>Rs. 11,000</strong> token amount applies as per the latest payment plan. Confirm current availability and written terms before payment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bank & Documentation Info */}
      <section className="sec sec--paper">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Loans & Documentation</span>
            <SplitText as="h2" className="display-l" text={"Bank Loans &\n*Secure Process*"} />
          </div>
          <div className="pay-bank" data-reveal="stagger">
            {bankInfo.map((b) => (
              <div key={b.title} className="pay-bank__item">
                <div className="ip-icon">{b.icon}</div>
                <h3 className="pay-bank__title">{b.title}</h3>
                <p className="pay-bank__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip
        title={"Ready to Book\n*Your Plot?*"}
        sub="Token amount is Rs. 11,000 as per the latest payment plan. Contact the team to confirm availability and written booking terms."
        primary={{ to: '/contact', label: 'Enquire to Book' }}
        secondary={{ to: '/plots', label: 'View All Plots' }}
      />
    </>
  );
};

export default PaymentPage;
