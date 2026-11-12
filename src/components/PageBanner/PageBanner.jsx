import { Link } from 'react-router-dom';
import SplitText from '../fx/SplitText';
import './PageBanner.css';

// Shared inner-page hero: full-bleed photo, oversized split title, breadcrumb.
const PageBanner = ({ variant, crumb, kicker, title, subtitle }) => (
  <header className={`pb pb--${variant} on-dark`} data-progress>
    <div className="pb__media" aria-hidden="true">
      <div className="pb__img" />
    </div>
    <div className="pb__shade" aria-hidden="true" />

    <div className="pb__inner">
      <nav className="pb__crumb" aria-label="Breadcrumb" data-reveal="up" style={{ '--d': '80ms' }}>
        <Link to="/">Home</Link>
        <span className="pb__crumb-sep" aria-hidden="true">/</span>
        <span>{crumb}</span>
      </nav>
      <div className="eyebrow pb__kicker" data-reveal="up" style={{ '--d': '160ms' }}>{kicker}</div>
      <SplitText as="h1" className="display-xl pb__title" text={title} delay={220} />
      <div className="pb__foot">
        <p className="pb__sub" data-reveal="up" style={{ '--d': '520ms' }}>{subtitle}</p>
      </div>
    </div>
  </header>
);

export default PageBanner;
