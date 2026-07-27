import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnquirySection.css';
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

const EnquirySection = () => {
  const navigate = useNavigate();
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
    <section id="contact" className="enquiry-section reveal-on-scroll">
      <div className="enquiry-container">
        <div className="enquiry-copy">
          <span className="enquiry-kicker">Get call back</span>
          <h2>Get latest payment details and site-visit support.</h2>
          <p>
            Share your details and our sales team will help you with the latest payment-plan options,
            current availability and a suitable site-visit slot.
          </p>
          <ul className="enquiry-benefits">
            <li>Token amount: Rs. 11,000</li>
            <li>Booking amount: 40% within 7 days</li>
            <li>Remaining amount: 6 to 12 monthly installments</li>
            <li>Quick site-visit planning through a direct call</li>
            <li>Clear next steps before booking</li>
          </ul>
          <p className="enquiry-note">
            Final pricing, documents, development details and plot availability are subject to confirmation by the official sales team.
          </p>
        </div>

        <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
          <div className="enquiry-grid">
            <label>
              Full Name
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required autoComplete="name" />
            </label>
            <label>
              Phone Number
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10 digit mobile number" required autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" />
            </label>
            <label>
              Interested In
              <select name="interest" value={formData.interest} onChange={handleChange}>
                <option>Normal Plot - 60 Sq. Yd. - Rs. 9,60,000</option>
                <option>Normal Plot - 100 Sq. Yd. - Rs. 16,00,000</option>
                <option>Corner Plot - 150 Sq. Yd. - Rs. 27,00,000</option>
                <option>Commercial Plot - 30 Sq. Yd. - Rs. 6,00,000</option>
                <option>Site Visit for Latest Payment Details</option>
              </select>
            </label>
          </div>

          {status === 'success' && (
            <div className="enquiry-status enquiry-status--success">
              <strong>Thank you!</strong>
              <span>{statusMsg}</span>
            </div>
          )}
          {status === 'error' && (
            <div className="enquiry-status enquiry-status--error">
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="enquiry-actions">
            <button type="submit" className="enquiry-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting...' : 'Send Enquiry'}
            </button>
            <a className="enquiry-secondary" href="/payment" onClick={(event) => {
              event.preventDefault();
              navigate('/payment');
            }}>View Payment Details</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EnquirySection;
