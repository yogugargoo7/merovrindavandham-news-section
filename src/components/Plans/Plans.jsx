import { useState } from 'react';
import './Plans.css';
import { publicAsset } from '../../utils/publicAsset';
import { trackConversionEvent } from '../../utils/analytics';

const brochurePages = [
  { src: publicAsset('vrindavan-material/entry-view-01.webp'), label: 'Grand entrance' },
  { src: publicAsset('vrindavan-material/site-3d-view.webp'), label: '3D township view' },
  { src: publicAsset('vrindavan-material/mvd-photo-1.webp'), label: 'Highway view' },
  { src: publicAsset('vrindavan-material/commercial-view.webp'), label: 'Commercial overview' }
];

const paymentPlan = publicAsset('vrindavan-material/site-3d-view.webp');
const brochurFirstPage = publicAsset('vrindavan-material/drone-view-mvd-3d.webp');
const projectPlanPdf = publicAsset('vrindavan-material/brochure-mero-vrindavan-dham.pdf');

const plansMeta = {
  brochure: {
    title: 'Brochure preview',
    text: 'Open and download the full brochure with project visuals, connectivity, amenities and plot-size options.'
  },
  projectPlan: {
    title: 'Project plan preview',
    text: 'Review the project layout in a clean PDF viewer and open it full screen for a detailed look before your site visit.'
  },
  payment: {
    title: 'Latest payment details',
    text: 'All price, booking and installment details below are matched with the latest payment plan image.'
  }
};

const planHighlights = [
  { label: 'Token Amount', value: 'Rs. 11,000', note: 'As per latest payment plan' },
  { label: 'Booking Amount', value: '40%', note: 'Pay within 7 days to confirm booking' },
  { label: 'Payment Details', value: 'Latest Plan', note: 'Click to view pricing and installments' }
];

const paymentDetails = [
  { title: 'Normal Plot', size: '60 Sq. Yd.', rate: 'Rs. 16,000 per Sq. Yd.', total: 'Rs. 9,60,000', booking: 'Rs. 3,84,000 (40%)' },
  { title: 'Normal Plot', size: '100 Sq. Yd.', rate: 'Rs. 16,000 per Sq. Yd.', total: 'Rs. 16,00,000', booking: 'Rs. 6,40,000 (40%)' },
  { title: 'Corner Plot', size: '150 Sq. Yd.', rate: 'Rs. 18,000 per Sq. Yd.', total: 'Rs. 27,00,000', booking: 'Rs. 10,80,000 (40%)' },
  { title: 'Commercial Plot', size: '30 Sq. Yd.', rate: 'Rs. 20,000 per Sq. Yd.', total: 'Rs. 6,00,000', booking: 'Rs. 2,40,000 (40%)' },
];

const Plans = () => {
  const [activePlan, setActivePlan] = useState('brochure');
  const [isPaymentZoomOpen, setIsPaymentZoomOpen] = useState(false);

  const handleDownloadBrochure = () => {
    trackConversionEvent('brochure_download', 'Plans Brochure');
    window.open(publicAsset('vrindavan-material/brochure-mero-vrindavan-dham.pdf'), '_blank', 'noopener,noreferrer');
  };

  const handlePlanTabClick = (plan) => {
    setActivePlan(plan);
    trackConversionEvent('plans_tab_click', 'Plans Section', { plan_type: plan });
  };

  const handlePaymentZoomOpen = () => {
    trackConversionEvent('payment_plan_zoom', 'Plans Payment Plan');
    setIsPaymentZoomOpen(true);
  };

  return (
    <section id="plans" className="plans-section reveal-on-scroll">
      <div className="plans-container">
        <div className="faq-badge">
          <div className="faq-badge-icon"></div>
          Project Plans
        </div>
        <h2 className="plans-title">Brochure, project plan and latest payment details</h2>
        <p className="plans-subtitle">
          View token amount, booking amount, plot-size pricing and installment details exactly as per the latest payment plan.
        </p>

        <div className="plans-snapshot">
          {planHighlights.map((item) => (
            <button
              type="button"
              className={`plans-snapshot-card${item.label === 'Payment Details' ? ' plans-snapshot-card--clickable' : ''}`}
              key={item.label}
              onClick={() => {
                if (item.label === 'Payment Details') {
                  handlePlanTabClick('payment');
                }
              }}
              aria-label={item.label === 'Payment Details' ? 'Open latest payment details' : undefined}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </button>
          ))}
        </div>

        <div className="plans-tabs">
          <button className={`tab-btn ${activePlan === 'brochure' ? 'active' : ''}`} onClick={() => handlePlanTabClick('brochure')}>
            Brochure Preview
          </button>
          <button className={`tab-btn ${activePlan === 'projectPlan' ? 'active' : ''}`} onClick={() => handlePlanTabClick('projectPlan')}>
            Project Plan
          </button>
          <button className={`tab-btn ${activePlan === 'payment' ? 'active' : ''}`} onClick={() => handlePlanTabClick('payment')}>
            Payment Details
          </button>
        </div>

        <div className="plans-meta-card">
          <h3>{plansMeta[activePlan].title}</h3>
          <p>{plansMeta[activePlan].text}</p>
        </div>

        {activePlan === 'brochure' && (
          <div className="brochure-preview-card">
            <button type="button" className="brochure-locked-preview" onClick={handleDownloadBrochure} aria-label="Open full brochure">
              <img src={brochurFirstPage} alt="Brochure first page" className="brochure-first-page-image" loading="lazy" decoding="async" />
              <span className="brochure-lock-panel">
                <span className="brochure-lock-icon" aria-hidden="true">PDF</span>
                <strong>Brochure Ready</strong>
                <span>Tap to download and view the full brochure.</span>
              </span>
            </button>
            <div className="brochure-preview-actions">
              <button className="download-overlay-btn" onClick={handleDownloadBrochure}>Download Brochure</button>
            </div>
            <div className="brochure-thumb-row">
              {brochurePages.map((page) => (
                <button type="button" key={page.src} className="brochure-thumb-wrap" onClick={handleDownloadBrochure}>
                  <img src={page.src} alt={`${page.label} brochure preview`} className="brochure-thumb" loading="lazy" decoding="async" />
                  <span>{page.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {activePlan === 'projectPlan' && (
          <div className="project-plan-preview">
            <div className="project-plan-actions project-plan-actions--top">
              <a className="project-plan-btn project-plan-btn--primary" href={projectPlanPdf} target="_blank" rel="noreferrer" onClick={() => trackConversionEvent('project_plan_open', 'Plans Project Plan')}>
                Open Project Plan
              </a>
              <a className="project-plan-btn project-plan-btn--secondary" href={projectPlanPdf} download onClick={() => trackConversionEvent('project_plan_download', 'Plans Project Plan')}>
                Download PDF
              </a>
            </div>
            <div className="project-plan-frame">
              <iframe
                src={`${projectPlanPdf}#toolbar=0&navpanes=0&view=FitH`}
                title="Mero Vrindavan Dham project plan PDF preview"
                className="project-plan-iframe"
                loading="lazy"
              />
              <div className="project-plan-shine" aria-hidden="true"></div>
            </div>
            <div className="project-plan-actions">
              <a className="project-plan-btn project-plan-btn--primary" href={projectPlanPdf} target="_blank" rel="noreferrer" onClick={() => trackConversionEvent('project_plan_open', 'Plans Project Plan')}>
                Open Project Plan
              </a>
              <a className="project-plan-btn project-plan-btn--secondary" href={projectPlanPdf} download onClick={() => trackConversionEvent('project_plan_download', 'Plans Project Plan')}>
                Download PDF
              </a>
            </div>
          </div>
        )}

        {activePlan === 'payment' && (
          <div className="document-preview-card">
            <div className="payment-detail-grid" aria-label="Latest payment details summary">
              {paymentDetails.map((item) => (
                <article className="payment-detail-card" key={`${item.title}-${item.size}`}>
                  <span>{item.title}</span>
                  <strong>{item.size}</strong>
                  <p>{item.rate}</p>
                  <dl>
                    <div>
                      <dt>Total</dt>
                      <dd>{item.total}</dd>
                    </div>
                    <div>
                      <dt>Booking</dt>
                      <dd>{item.booking}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
            <p className="payment-plan-note">
              Token amount is Rs. 11,000. Booking amount is 40% payable within 7 days. Remaining amount is payable in 6 to 12 months installments.
            </p>
            <button type="button" className="payment-zoom-trigger" onClick={handlePaymentZoomOpen} aria-label="Open latest payment details">
              <img src={paymentPlan} alt="Payment plan" className="plan-image" loading="lazy" decoding="async" />
              <span>Click to view latest payment details</span>
            </button>
          </div>
        )}
        <p className="plans-disclaimer">
          Use only the latest payment details shown above for website pricing reference. Confirm availability and written terms with the sales team before booking.
        </p>
      </div>

      {isPaymentZoomOpen && (
        <div className="payment-plan-modal" role="dialog" aria-modal="true" aria-label="Payment plan preview" onClick={() => setIsPaymentZoomOpen(false)}>
          <div className="payment-plan-modal-content" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="payment-plan-modal-close" onClick={() => setIsPaymentZoomOpen(false)} aria-label="Close payment plan">
              X
            </button>
            <img src={paymentPlan} alt="Payment plan full view" className="payment-plan-modal-image" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Plans;
