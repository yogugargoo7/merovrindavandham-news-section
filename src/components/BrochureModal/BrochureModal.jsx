import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { publicAsset } from '../../utils/publicAsset';
import { lockScroll, unlockScroll } from '../../utils/scrollLock';
import { trackConversionEvent } from '../../utils/analytics';
import BtnText from '../fx/BtnText';
import './BrochureModal.css';

const BROCHURE_URL = publicAsset('vrindavan-material/brochure-mero-vrindavan-dham.pdf');
const BROCHURE_FILE_NAME = 'Mero-Vrindavan-Dham-Brochure.pdf';
const BROCHURE_SIZE = 'PDF · 24.6 MB';
const COVER = publicAsset('vrindavan-material/drone-view-mvd-3d.webp');

// Inline PDF preview only where the browser has a built-in viewer and a big screen;
// phones get a cover card (mobile browsers can't render a PDF inside a page).
const canPreviewInline = () =>
  typeof navigator !== 'undefined' &&
  navigator.pdfViewerEnabled === true &&
  window.matchMedia('(min-width: 900px) and (pointer: fine)').matches;

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
  </svg>
);

const BrochureModal = ({ isOpen, onClose, source = 'Brochure' }) => {
  const [inline] = useState(canPreviewInline);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    lockScroll();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      unlockScroll();
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // portal: keeps the modal out of dark sections' .on-dark colour context
  return createPortal(
    <div
      className="brm"
      role="dialog"
      aria-modal="true"
      aria-label="Project brochure"
      data-lenis-prevent
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`brm__card${inline ? ' brm__card--inline' : ''}`}>
        <button className="brm__close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="brm__preview">
          {inline ? (
            <>
              {!loaded && (
                <div className="brm__loading" aria-hidden="true">
                  <span className="brm__spinner" />
                  Loading brochure...
                </div>
              )}
              <iframe
                className="brm__frame"
                src={`${BROCHURE_URL}#view=FitH&navpanes=0`}
                title="Mero Vrindavan Dham brochure"
                onLoad={() => setLoaded(true)}
              />
            </>
          ) : (
            <div className="brm__cover" style={{ backgroundImage: `url(${COVER})` }}>
              <div className="brm__cover-label">
                <span>Project Brochure</span>
                <strong>Mero Vrindavan Dham</strong>
              </div>
            </div>
          )}
        </div>

        <aside className="brm__side">
          <span className="eyebrow">Project Brochure</span>
          <h2 className="brm__title">Mero Vrindavan Dham Brochure</h2>
          <p className="brm__text">
            Layout, plot options, location and project highlights in one PDF. Download it to read later or share it with your family.
          </p>
          <p className="brm__meta">{BROCHURE_SIZE}</p>

          <div className="brm__actions">
            <a
              className="btn btn--gold btn--block"
              href={BROCHURE_URL}
              download={BROCHURE_FILE_NAME}
              onClick={() => trackConversionEvent('brochure_download', source)}
            >
              <BtnText icon={<DownloadIcon />}>Download Brochure</BtnText>
            </a>
            <a
              className="btn btn--line btn--block"
              href={BROCHURE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversionEvent('brochure_open', source)}
            >
              <BtnText icon={<ExpandIcon />}>{inline ? 'Open Full Screen' : 'View Brochure'}</BtnText>
            </a>
          </div>
        </aside>
      </div>
    </div>,
    document.body
  );
};

export default BrochureModal;
