import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
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
    <div className="nf-shell">
      <div className="nf-inner">
        <div className="nf-badge">404</div>
        <h1 className="nf-title">Page Not Found</h1>
        <p className="nf-sub">
          The page you're looking for doesn't exist or has been moved.<br />
          Let us help you find what you need.
        </p>
        <div className="nf-links">
          <Link to="/" className="nf-btn nf-btn--primary">Go to Home</Link>
          <Link to="/plots" className="nf-btn nf-btn--secondary">View Plots</Link>
          <Link to="/contact" className="nf-btn nf-btn--secondary">Contact Us</Link>
        </div>
        <div className="nf-help">
          <span>Quick links:</span>
          <Link to="/availability">Plot Availability</Link>
          <Link to="/payment">Payment Plan</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
        <Link to="/contact" className="nf-phone">
          Need help? Send an Enquiry
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
