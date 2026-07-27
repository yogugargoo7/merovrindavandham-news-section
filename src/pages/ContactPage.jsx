import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';
import { useSEO } from '../hooks/useSEO';
import { submitLeadToCRM } from '../utils/crmApi';
import { formatIndianMobile, isValidIndianMobile, sanitizeIndianMobileInput } from '../utils/leadValidation';
import { trackConversionEvent, trackLeadEvent } from '../utils/analytics';
import LocationMap from '../components/LocationMap/LocationMap';
import './pages.css';
import './ContactPage.css';

const contactCards = [
  {
    icon: (
      <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Site Office',
    primary: 'Vrindavan Dham Township',
    secondary: 'Mathura, Uttar Pradesh - 202141',
    action: 'https://maps.app.goo.gl/rfQE3UG4GS3gfh998',
    actionLabel: 'Get Directions',
    color: '#3a2d20',
    external: true,
  },
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

const ContactPage = () => {
  useReveal();
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
      {/* Banner */}
      <div className="page-banner page-banner--contact">
        <div className="page-banner__content">
          <div className="page-banner__breadcrumb">
            <Link to="/">Home</Link>
            <span className="page-banner__breadcrumb-sep">/</span>
            <span>Find Us</span>
          </div>
          <div className="page-banner__kicker">Find Us</div>
          <h1 className="page-banner__title">Reach the Site<br />With Clear Directions</h1>
          <p className="page-banner__subtitle">Fill the enquiry form to request current pricing, availability and site visit details.</p>
        </div>
        <div className="page-banner__line"></div>
      </div>

      {/* Location Map */}
      <LocationMap />

      {/* Contact Cards */}
      <section className="inner-section inner-section--white reveal-on-scroll">
        <div className="inner-container">
          <div className="inner-header">
            <span className="inner-kicker">Route &amp; Support</span>
            <h2 className="inner-title">Visit Information</h2>
            <p className="inner-desc">Use the project pin for directions, or send an enquiry to confirm the route and available visit timing.</p>
          </div>
          <div className="contact-cards stagger-children">
            {[...contactCards].sort((a, b) => (a.title === 'Site Office' ? -1 : b.title === 'Site Office' ? 1 : 0)).map((c) => (
              <div key={c.title} className="contact-card">
                <div className="contact-card__icon" style={{ background: c.color }}>
                  {c.icon}
                </div>
                <h3 className="contact-card__title">{c.title}</h3>
                <p className="contact-card__primary">{c.primary}</p>
                <p className="contact-card__secondary">{c.secondary}</p>
                {c.external ? (
                  <a
                    href={c.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card__btn"
                    style={{ '--btn-color': c.color }}
                  >
                    {c.actionLabel}
                  </a>
                ) : (
                  <a href={c.action} className="contact-card__btn" style={{ '--btn-color': c.color }}>
                    {c.actionLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form + Site Visit */}
      <section className="inner-section inner-section--gray reveal-on-scroll">
        <div className="inner-container">
          <div className="contact-form-layout">
            {/* Form */}
            <div className="contact-form-box">
              <span className="inner-kicker">Send Enquiry</span>
              <h2 className="inner-title" style={{ textAlign: 'left', marginTop: '8px' }}>Fill the Enquiry Form</h2>
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success__icon">OK</div>
                  <h3>Enquiry Sent!</h3>
                  <p>Thank you, {form.name}. {statusMsg || 'Our team will contact you within 1 hour.'}</p>
                  <button className="contact-success__reset" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', plotSize: '', message: '' }); }}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="contact-form__row">
                    <div className="contact-form__group">
                      <label className="contact-form__label">Full Name *</label>
                      <input
                        className="contact-form__input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label className="contact-form__label">Phone Number *</label>
                      <input
                        className="contact-form__input"
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
                    </div>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Email Address</label>
                    <input
                      className="contact-form__input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com (optional)"
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Interested In</label>
                    <select className="contact-form__input contact-form__select" name="plotSize" value={form.plotSize} onChange={handleChange}>
                      <option value="">Select plot size</option>
                      <option value="60 Sq. Yd - Residential">60 Sq. Yd - Residential</option>
                      <option value="100 Sq. Yd - Residential">100 Sq. Yd - Residential</option>
                      <option value="150 Sq. Yd - Corner Premium">150 Sq. Yd - Corner Premium</option>
                      <option value="30 Sq. Yd - Commercial">30 Sq. Yd - Commercial</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Message</label>
                    <textarea
                      className="contact-form__input contact-form__textarea"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Any specific questions or requirements..."
                      rows={4}
                    />
                  </div>
                  <button type="submit" className="contact-form__submit" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Enquiry'}
                  </button>
                  {statusMsg && statusType === 'error' && (
                    <div className="contact-success" style={{ marginTop: '14px' }}>
                      <p>{statusMsg}</p>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Site Visit Info */}
            <div className="contact-visit-box">
              <div className="contact-visit-card">
                <span className="inner-kicker">Site Visit</span>
                <h3 className="contact-visit-card__title">Book a Free Site Visit</h3>
                <p className="contact-visit-card__desc">
                  Walk the land yourself before deciding. Our team will meet you at the site, show available plots and answer all your questions - no pressure.
                </p>
                <ul className="contact-visit-card__list">
                  <li>
                    <svg width="16" height="16" fill="none" stroke="#3a2d20" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Free guided site tour
                  </li>
                  <li>
                    <svg width="16" height="16" fill="none" stroke="#3a2d20" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    Meet the project team on site
                  </li>
                  <li>
                    <svg width="16" height="16" fill="none" stroke="#3a2d20" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    See the plot demarcations live
                  </li>
                  <li>
                    <svg width="16" height="16" fill="none" stroke="#3a2d20" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    No commitment required
                  </li>
                </ul>
              </div>

              <div className="contact-address-card">
                <h3 className="contact-address-card__title">Project Location</h3>
                <p className="contact-address-card__addr">
                  Mero Vrindavan Dham Township<br />
                  Near Yamuna Expressway<br />
                  Mathura, Uttar Pradesh - 202141
                </p>
                <div className="contact-address-card__tags">
                  <span>Yamuna Expressway connectivity</span>
                  <span>Vrindavan-Mathura access</span>
                  <span>Noida International Airport corridor</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="page-cta-strip page-cta-strip--contact">
        <h2 className="page-cta-strip__title">Check Current Plot Availability</h2>
        <p className="page-cta-strip__sub">Contact the team to confirm available plot sizes, current pricing and written booking terms.</p>
        <div className="page-cta-strip__buttons">
          <Link to="/plots" className="page-cta-btn page-cta-btn--primary">View All Plots</Link>
          <Link to="/payment" className="page-cta-btn page-cta-btn--secondary">See Payment Plan</Link>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
