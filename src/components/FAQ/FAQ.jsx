import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';
import SplitText from '../fx/SplitText';
import BtnText from '../fx/BtnText';
import { trackLeadEvent } from '../../utils/analytics';

const faqs = [
  {
    id: 1,
    question: 'Where is Mero Vrindavan Dham located?',
    answer: 'Mero Vrindavan Dham is positioned around the Mathura-Vrindavan growth belt with Yamuna Expressway connectivity. For an accurate visit, ask the sales team to share the current Google Maps pin and approach-route details before leaving.'
  },
  {
    id: 2,
    question: 'What plot sizes can I choose from?',
    answer: 'As per the latest payment plan, options shown are 60 Sq. Yd. normal plot, 100 Sq. Yd. normal plot, 150 Sq. Yd. corner plot and 30 Sq. Yd. commercial plot. Confirm live availability with the sales team before booking.'
  },
  {
    id: 3,
    question: 'How do I view the latest payment details?',
    answer: 'Open the Payment Details tab to view the latest plan. Token amount is Rs. 11,000. Booking amount is 40% payable within 7 days, and the remaining amount is payable in 6 to 12 monthly installments.'
  },
  {
    id: 4,
    question: 'Can I visit the site before booking?',
    answer: 'Yes. A site visit is recommended before any booking decision. Share your preferred date and time, and the team can coordinate the location pin, route guidance and available plot discussion during the visit.'
  },
  {
    id: 5,
    question: 'Which documents should I check before booking?',
    answer: 'Before booking, review the layout plan, plot dimensions, payment terms, allotment process, approvals, developer details and written commitments. Ask for updated documents directly from the official team.'
  },
  {
    id: 6,
    question: 'Is a plot near Vrindavan good for long-term investment?',
    answer: 'Many buyers look at Vrindavan, Mathura and Yamuna Expressway plots for long-term holding because of connectivity, tourism demand and regional development. For price planning, use only the latest payment details shown on this website and confirm final terms in writing.'
  },
  {
    id: 7,
    question: 'How is plot allotment confirmed?',
    answer: 'Plot booking is confirmed after checking availability, plot number, size, facing and the latest payment-plan terms. The current plan shows 40% booking amount payable within 7 days; keep written confirmation before payment.'
  },
  {
    id: 8,
    question: 'Can I build a home immediately after purchase?',
    answer: 'Construction timelines depend on possession status, development progress, local permissions and project terms. Confirm road access, services, possession timeline and building guidelines before planning construction.'
  },
  {
    id: 9,
    question: 'How can I contact the sales team quickly?',
    answer: 'You can call the team directly from the website to request brochure, current availability, latest payment details and site-visit support. For serious enquiries, share your preferred plot size and budget so the team can respond accurately.'
  }
];

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(1);

  const toggleFAQ = (id) => {
    trackLeadEvent('faq_toggle', { source: 'FAQ Section', faq_id: id });
    setOpenFAQ(openFAQ === id ? null : id);
  };

  useEffect(() => {
    const faqStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };

    let script = document.querySelector('script[type="application/ld+json"]#faq-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', 'faq-structured-data');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqStructuredData);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]#faq-structured-data');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <section className="sec sec--paper faq" id="faq">
      <div className="wrap faq__grid">
        <div className="faq__head">
          <span className="eyebrow" data-reveal="up">Frequently Asked Questions</span>
          <SplitText as="h2" className="display-l" text={"Real estate questions buyers ask *first*"} />
          <h3 className="faq__subtitle" data-reveal="up" style={{ '--d': '120ms' }}>Practical answers before you plan a visit</h3>
          <p className="faq__description" data-reveal="up" style={{ '--d': '180ms' }}>
            Review location, plot sizes, pricing, documents and site-visit details before speaking with the team.
          </p>

          <div className="faq__trust" aria-label="Buyer support highlights" data-reveal="stagger" style={{ '--d': '220ms' }}>
            <div className="faq__trust-card">
              <span>Verify</span>
              <strong>Documents + Layout</strong>
            </div>
            <div className="faq__trust-card">
              <span>Compare</span>
              <strong>Price + Availability</strong>
            </div>
            <div className="faq__trust-card">
              <span>Visit</span>
              <strong>Route + Plot Guidance</strong>
            </div>
          </div>
        </div>

        <div className="faq__list" data-reveal="stagger">
          {faqs.map((faq, i) => {
            const open = openFAQ === faq.id;
            return (
              <div key={faq.id} className={`faq__item${open ? ' is-open' : ''}`}>
                <button className="faq__q" onClick={() => toggleFAQ(faq.id)} aria-expanded={open}>
                  <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq__q-text">{faq.question}</span>
                  <span className="faq__icon" aria-hidden="true"><i /><i /></span>
                </button>
                <div className="faq__a">
                  <div className="faq__a-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wrap">
        <div className="faq__cta" data-reveal="up">
          <div>
            <h3 className="display-s faq__cta-title">Need latest payment details or plot availability?</h3>
            <p className="faq__cta-description">
              Connect with the sales team for brochure, latest payment details, available plot options and visit coordination.
            </p>
          </div>
          <div className="btn-row">
            <Link to="/contact" className="btn btn--ink"><BtnText>Send an Enquiry</BtnText></Link>
            <Link to="/plots" className="btn btn--line"><BtnText>View Plot Options</BtnText></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
