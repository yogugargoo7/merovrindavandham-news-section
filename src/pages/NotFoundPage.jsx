import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import BtnText from '../components/fx/BtnText';
import './pages.css';
import './NotFoundPage.css';

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const NotFoundPage = () => {
  useSEO({ title: 'Page Not Found | Mero Vrindavan Dham' });

  // Tell search engines this URL is not a real page (SPA always answers 200,
  // so without this Google would index broken URLs as normal pages).
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]');
    if (!meta) return undefined;
    meta.setAttribute('content', 'noindex, nofollow');
    return () => meta.setAttribute('content', DEFAULT_ROBOTS);
  }, []);

  return (
    <div className="nf on-dark">
      <div className="nf__glow" aria-hidden="true" />
      <div className="nf__code" aria-hidden="true" data-reveal="fade">404</div>
      <div className="nf__inner">
        <div className="eyebrow" data-reveal="up">404</div>
        <h1 className="display-l nf__title" data-reveal="up" style={{ '--d': '80ms' }}>Page Not Found</h1>
        <p className="nf__sub" data-reveal="up" style={{ '--d': '160ms' }}>
          The page you're looking for doesn't exist or has been moved.<br />
          Let us help you find what you need.
        </p>
        <div className="btn-row nf__links" data-reveal="up" style={{ '--d': '240ms' }}>
          <Link to="/" className="btn btn--gold"><BtnText>Go to Home</BtnText></Link>
          <Link to="/plots" className="btn btn--line"><BtnText>View Plots</BtnText></Link>
          <Link to="/contact" className="btn btn--line"><BtnText>Contact Us</BtnText></Link>
        </div>
        <div className="nf__help" data-reveal="up" style={{ '--d': '320ms' }}>
          <span>Quick links:</span>
          <Link to="/availability" className="link-line">Plot Availability</Link>
          <Link to="/payment" className="link-line">Payment Plan</Link>
          <Link to="/gallery" className="link-line">Gallery</Link>
        </div>
        <Link to="/contact" className="nf__phone" data-reveal="up" style={{ '--d': '400ms' }}>
          Need help? Send an Enquiry
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
