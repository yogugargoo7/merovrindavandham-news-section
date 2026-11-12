import { useState } from 'react';
import { Link } from 'react-router-dom';
import './EnquirySection.css';
import SplitText from '../fx/SplitText';
import BtnText from '../fx/BtnText';
import { submitLeadToCRM } from '../../utils/crmApi';
import { formatIndianMobile, isValidIndianMobile, sanitizeIndianMobileInput } from '../../utils/leadValidation';
import { trackConversionEvent, trackLeadEvent } from '../../utils/analytics';

const initialState = {
  name: '',
  phone: '',
  city: '',
  callTime: 'Any time',
  interest: 'Normal Plot - 60 Sq. Yd. - Rs. 9,60,000',
  budget: 'As per latest payment plan',
  message: '',
};

const benefits = [
  'Token amount: Rs. 11,000',
  'Booking amount: 40% within 7 days',
  'Remaining amount: 6 to 12 monthly installments',
  'Quick site-visit planning through a direct call',
  'Clear next steps before booking',
];

const EnquirySection = () => {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState(null);
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: name === 'phone' ? sanitizeIndianMobileInput(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMsg('');

    if (!formData.name.trim()) {
      setStatus('error');
      setStatusMsg('Please enter your full name.');
      return;
    }

    if (!isValidIndianMobile(formData.phone)) {
      setStatus('error');
      setStatusMsg('Please enter a valid 10 digit Indian mobile number.');
      return;
    }

    const mobile = formatIndianMobile(formData.phone);
    setStatus('loading');
    trackLeadEvent('lead_form_submit_attempt', { source: 'Website Enquiry Form' });

    const result = await submitLeadToCRM({
      fullName: formData.name,
      mobile,
      city: formData.city,
      budget: formData.budget,
      plotInterest: formData.interest,
      message: [
        formData.message || 'Please share latest payment details and site visit timing.',
        `Preferred call time: ${formData.callTime}`,
      ].join('\n'),
      source: 'Website Enquiry Form',
      page: 'Home',
    });

    if (result.success) {
      trackLeadEvent('lead_form_submit_success', {
        source: 'Website Enquiry Form',
        duplicate: Boolean(result.duplicate),
      });
      trackConversionEvent('generate_lead', 'Website Enquiry Form', {
        lead_type: formData.interest,
        duplicate: Boolean(result.duplicate),
      });
      setStatus('success');
      setStatusMsg(result.duplicate
        ? 'Thank you. Your enquiry is already registered. Our team will call you shortly.'
        : 'Thank you. Your enquiry has been submitted. Our team will call you shortly.'
      );

      setFormData(initialState);
    } else {
      trackLeadEvent('lead_form_submit_error', { source: 'Website Enquiry Form' });
      setStatus('error');
      setStatusMsg(result.message || 'Sorry, we could not submit your enquiry right now. Please try again in a little while.');
    }
  };

  return (
    <section id="contact" className="sec sec--paper enq">
      <div className="wrap enq__grid">
        <div className="enq__copy">
          <span className="eyebrow" data-reveal="up">Get call back</span>
          <SplitText as="h2" className="display-l enq__title" text={"Get latest payment details and *site-visit support.*"} />
          <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
            Share your details and our sales team will help you with the latest payment-plan options,
            current availability and a suitable site-visit slot.
          </p>
          <ul className="enq__benefits" data-reveal="stagger" style={{ '--d': '200ms' }}>
            {benefits.map((item, i) => (
              <li key={item}>
                <span className="enq__benefit-num">{String(i + 1).padStart(2, '0')}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="enq__note" data-reveal="up">
            Final pricing, documents, development details and plot availability are subject to confirmation by the official sales team.
          </p>
        </div>

        <form className="enq__form" onSubmit={handleSubmit} noValidate data-reveal="up" style={{ '--d': '200ms' }}>
          <div className="enq__form-head">
            <span className="enq__form-dot" aria-hidden="true" />
            <span>Send Enquiry</span>
          </div>

          <div className="enq__fields">
            <label className="field">
              <span className="field__label">Full Name</span>
              <input className="field__control" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required autoComplete="name" />
            </label>
            <label className="field">
              <span className="field__label">Phone Number</span>
              <input className="field__control" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10 digit mobile number" required autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" />
            </label>
            <label className="field">
              <span className="field__label">Interested In</span>
              <select className="field__control" name="interest" value={formData.interest} onChange={handleChange}>
                <option>Normal Plot - 60 Sq. Yd. - Rs. 9,60,000</option>
                <option>Normal Plot - 100 Sq. Yd. - Rs. 16,00,000</option>
                <option>Corner Plot - 150 Sq. Yd. - Rs. 27,00,000</option>
                <option>Commercial Plot - 30 Sq. Yd. - Rs. 6,00,000</option>
                <option>Site Visit for Latest Payment Details</option>
              </select>
            </label>
          </div>

          {status === 'success' && (
            <div className="enq__status enq__status--success" role="status">
              <strong>Thank you!</strong>
              <span>{statusMsg}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="enq__status enq__status--error" role="alert">
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="enq__actions">
            <button type="submit" className="btn btn--gold btn--block" disabled={status === 'loading'}>
              <BtnText>{status === 'loading' ? 'Submitting...' : 'Send Enquiry'}</BtnText>
            </button>
            <Link className="link-line enq__secondary" to="/payment">View Payment Details</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnquirySection;
