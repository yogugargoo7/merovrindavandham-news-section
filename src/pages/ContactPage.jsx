import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { submitLeadToCRM } from '../utils/crmApi';
import { formatIndianMobile, isValidIndianMobile, sanitizeIndianMobileInput } from '../utils/leadValidation';
import { trackConversionEvent, trackLeadEvent } from '../utils/analytics';
import LocationMap from '../components/LocationMap/LocationMap';
import PageBanner from '../components/PageBanner/PageBanner';
import CtaStrip from '../components/CtaStrip/CtaStrip';
import SplitText from '../components/fx/SplitText';
import BtnText from '../components/fx/BtnText';
import ShareLocation from '../components/ShareLocation/ShareLocation';
import { PROJECT_LOCATION } from '../config/location';
import './pages.css';
import './ContactPage.css';

const contactCards = [
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Site Office',
    primary: 'Mero Vrindavan Dham Township',
    secondary: 'Mathura, Uttar Pradesh - 202141',
    action: PROJECT_LOCATION.mapsUrl,
    actionLabel: 'Get Directions',
    external: true,
  },
];

const visitPoints = [
  'Free guided site tour',
  'Meet the project team on site',
  'See the plot demarcations live',
  'No commitment required',
];

const CONTACT_SEO = {
  title: 'Find Us | Location & Site Visit | Mero Vrindavan Dham',
  description: 'Find Mero Vrindavan Dham location near Vrindavan and Mathura. Open the exact project pin, get directions and send an enquiry for site visit support.',
  canonical: 'https://merovrindavandham.com/contact',
  ogUrl: 'https://merovrindavandham.com/contact',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Mero Vrindavan Dham',
    url: 'https://merovrindavandham.com/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vrindavan',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    openingHours: 'Mo-Su 09:00-18:00',
  },
};

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const ContactPage = () => {
  useSEO(CONTACT_SEO);
  const [form, setForm] = useState({ name: '', phone: '', email: '', plotSize: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === 'phone' ? sanitizeIndianMobileInput(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setStatusType('');

    if (!form.name.trim()) {
      setStatusType('error');
      setStatusMsg('Please enter your full name.');
      return;
    }

    if (!isValidIndianMobile(form.phone)) {
      setStatusType('error');
      setStatusMsg('Please enter a valid 10 digit Indian mobile number.');
      return;
    }

    const mobile = formatIndianMobile(form.phone);
    setSubmitting(true);
    trackLeadEvent('contact_form_submit_attempt', { source: 'Contact Page Form' });

    const result = await submitLeadToCRM({
      fullName: form.name,
      mobile,
      email: form.email,
      plotInterest: form.plotSize || 'Not specified',
      message: form.message || 'Please share latest payment details and site visit timing.',
      source: 'Contact Page Form',
      page: 'Contact',
    });

    setSubmitting(false);

    if (result.success || result.duplicate) {
      trackLeadEvent('contact_form_submit_success', {
        source: 'Contact Page Form',
        duplicate: Boolean(result.duplicate),
      });
      trackConversionEvent('generate_lead', 'Contact Page Form', {
        lead_type: form.plotSize || 'Not specified',
        duplicate: Boolean(result.duplicate),
      });

      setStatusType('success');
      setStatusMsg(result.duplicate
        ? 'Your enquiry is already registered. Our team will contact you shortly.'
        : 'Your enquiry has been submitted successfully. Our team will contact you shortly.'
      );
      setSubmitted(true);
      return;
    }

    trackLeadEvent('contact_form_submit_error', { source: 'Contact Page Form' });
    setStatusType('error');
    setStatusMsg(result.message || 'Sorry, we could not submit your enquiry right now. Please try again in a little while.');
  };

  return (
    <>
      <PageBanner
        variant="contact"
        crumb="Find Us"
        kicker="Find Us"
        title={"Reach the Site\n*With Clear Directions*"}
        subtitle="Fill the enquiry form to request current pricing, availability and site visit details."
      />

      {/* Location Map */}
      <LocationMap />

      {/* Contact Cards */}
      <section className="sec sec--sand sec--tight">
        <div className="wrap">
          <div className="sec-head sec-head--split">
            <span className="eyebrow" data-reveal="up">Route &amp; Support</span>
            <SplitText as="h2" className="display-l" text={"Visit *Information*"} />
            <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
              Use the project pin for directions, or send an enquiry to confirm the route and available visit timing.
            </p>
          </div>
          <div className="ct-cards">
            {contactCards.map((c) => (
              <div key={c.title} className="ct-card" data-reveal="up">
                <div className="ip-icon ct-card__icon">{c.icon}</div>
                <div className="ct-card__body">
                  <h3 className="ct-card__title">{c.title}</h3>
                  <p className="ct-card__primary">{c.primary}</p>
                  <p className="ct-card__secondary">{c.secondary}</p>
                </div>
                <div className="ct-card__actions">
                  {c.external ? (
                    <a href={c.action} target="_blank" rel="noopener noreferrer" className="btn btn--gold">
                      <BtnText>{c.actionLabel}</BtnText>
                    </a>
                  ) : (
                    <a href={c.action} className="btn btn--gold">
                      <BtnText>{c.actionLabel}</BtnText>
                    </a>
                  )}
                  <ShareLocation source="Contact Site Office" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form + Site Visit */}
      <section className="sec sec--paper">
        <div className="wrap ct-layout">
          {/* Form */}
          <div className="ct-form-box" data-reveal="up">
            <span className="eyebrow">Send Enquiry</span>
            <h2 className="display-m ct-form-box__title">Fill the Enquiry Form</h2>
            {submitted ? (
              <div className="ct-success" role="status">
                <div className="ct-success__icon"><CheckIcon /></div>
                <h3 className="display-s">Enquiry Sent!</h3>
                <p>Thank you, {form.name}. {statusMsg || 'Our team will contact you within 1 hour.'}</p>
                <button className="btn btn--line" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', plotSize: '', message: '' }); }}>
                  <BtnText>Send Another Enquiry</BtnText>
                </button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit}>
                <div className="ct-form__row">
                  <label className="field">
                    <span className="field__label">Full Name *</span>
                    <input
                      className="field__control"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Phone Number *</span>
                    <input
                      className="field__control"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10 digit mobile number"
                      required
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      maxLength="10"
                    />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">Email Address</span>
                  <input
                    className="field__control"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com (optional)"
                  />
                </label>
                <label className="field">
                  <span className="field__label">Interested In</span>
                  <select className="field__control" name="plotSize" value={form.plotSize} onChange={handleChange}>
                    <option value="">Select plot size</option>
                    <option value="60 Sq. Yd - Residential">60 Sq. Yd - Residential</option>
                    <option value="100 Sq. Yd - Residential">100 Sq. Yd - Residential</option>
                    <option value="150 Sq. Yd - Corner Premium">150 Sq. Yd - Corner Premium</option>
                    <option value="30 Sq. Yd - Commercial">30 Sq. Yd - Commercial</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </label>
                <label className="field">
                  <span className="field__label">Message</span>
                  <textarea
                    className="field__control"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Any specific questions or requirements..."
                    rows={4}
                  />
                </label>
                <button type="submit" className="btn btn--gold btn--block" disabled={submitting}>
                  <BtnText>{submitting ? 'Sending...' : 'Send Enquiry'}</BtnText>
                </button>
                {statusMsg && statusType === 'error' && (
                  <div className="ct-error" role="alert">
                    <p>{statusMsg}</p>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Site Visit Info */}
          <div className="ct-aside">
            <div className="ct-visit on-dark" data-reveal="up" style={{ '--d': '120ms' }}>
              <span className="eyebrow">Site Visit</span>
              <h3 className="display-m">Book a Free Site Visit</h3>
              <p className="ct-visit__desc">
                Walk the land yourself before deciding. Our team will meet you at the site, show available plots and answer all your questions - no pressure.
              </p>
              <ul className="ct-visit__list">
                {visitPoints.map((point) => (
                  <li key={point}>
                    <CheckIcon />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ct-address" data-reveal="up" style={{ '--d': '220ms' }}>
              <h3 className="ct-address__title">Project Location</h3>
              <p className="ct-address__addr">
                Mero Vrindavan Dham Township<br />
                Near Yamuna Expressway<br />
                Mathura, Uttar Pradesh - 202141
              </p>
              <div className="ct-address__tags">
                <span>Yamuna Expressway connectivity</span>
                <span>Vrindavan-Mathura access</span>
                <span>Noida International Airport corridor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaStrip
        title={"Check Current Plot\n*Availability*"}
        sub="Contact the team to confirm available plot sizes, current pricing and written booking terms."
        primary={{ to: '/plots', label: 'View All Plots' }}
        secondary={{ to: '/payment', label: 'See Payment Plan' }}
      />
    </>
  );
};

export default ContactPage;
