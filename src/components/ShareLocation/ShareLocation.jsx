import { useEffect, useRef, useState } from 'react';
import BtnText from '../fx/BtnText';
import { PROJECT_LOCATION } from '../../config/location';
import { trackConversionEvent } from '../../utils/analytics';
import './ShareLocation.css';

const SHARE_TEXT = `${PROJECT_LOCATION.name} - Project Location (Vrindavan, Mathura)`;

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
};

// "Share Location" button: native share sheet on phones, small menu elsewhere.
const ShareLocation = ({ source = 'Location', variant = 'line' }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef(null);
  const { mapsUrl } = PROJECT_LOCATION;

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => { if (!wrapRef.current?.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleClick = async () => {
    trackConversionEvent('location_share_click', source);
    const touch = window.matchMedia('(pointer: coarse)').matches;
    if (touch && navigator.share) {
      try {
        await navigator.share({ title: PROJECT_LOCATION.name, text: SHARE_TEXT, url: mapsUrl });
        trackConversionEvent('location_shared', source, { channel: 'native' });
      } catch {
        /* share sheet dismissed */
      }
      return;
    }
    setOpen((v) => !v);
  };

  const handleCopy = async () => {
    const ok = await copyText(mapsUrl);
    if (!ok) return;
    trackConversionEvent('location_shared', source, { channel: 'copy' });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${mapsUrl}`)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(SHARE_TEXT)}&body=${encodeURIComponent(`${SHARE_TEXT}\n${mapsUrl}`)}`;

  return (
    <div className="share-loc" ref={wrapRef}>
      <button
        type="button"
        className={`btn btn--${variant}`}
        onClick={handleClick}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <BtnText icon={<ShareIcon />}>Share Location</BtnText>
      </button>

      {open && (
        <div className="share-loc__menu" role="menu">
          <p className="share-loc__title">Share project location</p>
          <a
            role="menuitem"
            className="share-loc__item"
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={() => { trackConversionEvent('location_shared', source, { channel: 'whatsapp' }); setOpen(false); }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm4.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" /></svg>
            WhatsApp
          </a>
          <button type="button" role="menuitem" className="share-loc__item" onClick={handleCopy}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
            </svg>
            {copied ? 'Link copied!' : 'Copy location link'}
          </button>
          <a
            role="menuitem"
            className="share-loc__item"
            href={mailHref}
            onClick={() => { trackConversionEvent('location_shared', source, { channel: 'email' }); setOpen(false); }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
        </div>
      )}

      <span className="sr-only" role="status" aria-live="polite">{copied ? 'Location link copied' : ''}</span>
    </div>
  );
};

export default ShareLocation;
