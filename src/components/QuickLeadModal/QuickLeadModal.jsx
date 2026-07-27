import { useState, useEffect, useRef } from 'react';
import './QuickLeadModal.css';
import { submitLeadToCRM } from '../../utils/crmApi';
import { formatIndianMobile, isValidIndianMobile, sanitizeIndianMobileInput } from '../../utils/leadValidation';
import { trackConversionEvent, trackLeadEvent } from '../../utils/analytics';

export default function QuickLeadModal({
  isOpen,
  onClose,
  onSuccess,
  reservePopup = false,
  source = 'Website CTA',
  actionLabel = 'Proceed',
  actionIcon = null,
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setName('');
      setPhone('');
      setStatus('idle');
      setErrorMsg('');
      setTimeout(() => nameRef.current?.focus(), 120);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!isValidIndianMobile(phone)) {
      setErrorMsg('Please enter a valid 10 digit Indian mobile number.');
      return;
    }

    const mobile = formatIndianMobile(phone);
    const reservedWindow = reservePopup ? window.open('about:blank', '_blank') : null;
    if (reservedWindow) {
      reservedWindow.opener = null;
      reservedWindow.document.title = 'Opening...';
      reservedWindow.document.body.innerHTML = '<p style="font-family: Arial, sans-serif; padding: 24px;">Opening, please wait...</p>';
    }

    const runSuccessAction = () => {
      if (!reservedWindow) {
        onSuccess?.();
        return;
      }

      const originalOpen = window.open;
      window.open = (url, ...args) => {
        if (typeof url === 'string' && url) {
          reservedWindow.location.href = url;
          return reservedWindow;
        }
        return originalOpen.call(window, url, ...args);
      };

      try {
        onSuccess?.();
      } finally {
        window.open = originalOpen;
      }
    };

    setStatus('loading');
    trackLeadEvent('quick_lead_submit_attempt', { source });
    const result = await submitLeadToCRM({
      fullName: name.trim(),
      mobile,
      source,
      page: 'Home',
      message: `CTA click - ${source}`,
    });

    if (result.success || result.duplicate) {
      trackLeadEvent('quick_lead_submit_success', { source, duplicate: Boolean(result.duplicate) });
      trackConversionEvent('generate_lead', source, {
        action_label: actionLabel,
        duplicate: Boolean(result.duplicate),
      });
      setStatus('success');
      setTimeout(() => {
        onClose();
        runSuccessAction();
      }, 2600);
    } else {
      trackLeadEvent('quick_lead_submit_error', { source });
      setStatus('error');
      setErrorMsg('Sorry, we could not submit right now. Please call us directly for quick assistance.');
      setTimeout(() => {
        onClose();
        runSuccessAction();
      }, 1200);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="qlm-backdrop" role="dialog" aria-modal="true" aria-label="Quick enquiry" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="qlm-card">
        <button className="qlm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="qlm-header">
          <div className="qlm-icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.61a16 16 0 0 0 5.95 5.95l1.68-1.68a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <h3 className="qlm-title">Quick Details</h3>
            <p className="qlm-subtitle">Our team will connect with you shortly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="qlm-form" noValidate>
          <div className="qlm-field">
            <label htmlFor="qlm-name">Your Name</label>
            <input id="qlm-name" ref={nameRef} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required autoComplete="name" disabled={status === 'loading' || status === 'success'} />
          </div>

          <div className="qlm-field">
            <label htmlFor="qlm-phone">Phone Number</label>
            <input id="qlm-phone" type="tel" value={phone} onChange={(e) => setPhone(sanitizeIndianMobileInput(e.target.value))} placeholder="10 digit mobile number" required autoComplete="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength="10" disabled={status === 'loading' || status === 'success'} />
          </div>

          {errorMsg && <p className="qlm-error">{errorMsg}</p>}

          <button type="submit" className={`qlm-submit ${status}`} disabled={status === 'loading' || status === 'success' || !name.trim() || !phone.trim()}>
            {status === 'loading' ? (
              <>
                <span className="qlm-spinner" />
                Saving details...
              </>
            ) : status === 'success' ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                Thank you! We will contact you soon.
              </>
            ) : (
              <>
                {actionIcon}
                {actionLabel}
              </>
            )}
          </button>

          <p className="qlm-note">Your details are safe with us and used only for project support.</p>
        </form>
      </div>
    </div>
  );
}
