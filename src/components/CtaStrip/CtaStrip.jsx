import { Link } from 'react-router-dom';
import SplitText from '../fx/SplitText';
import BtnText from '../fx/BtnText';
import './CtaStrip.css';

// Closing call-to-action panel used at the end of every inner page.
const CtaStrip = ({ title, sub, primary, secondary }) => (
  <section className="cta">
    <div className="wrap">
      <div className="cta__panel on-dark" data-reveal="scale">
        <div className="cta__orb cta__orb--one" aria-hidden="true" />
        <div className="cta__orb cta__orb--two" aria-hidden="true" />
        <SplitText as="h2" className="display-l cta__title" text={title} />
        <p className="cta__sub" data-reveal="up" style={{ '--d': '200ms' }}>{sub}</p>
        <div className="btn-row cta__buttons" data-reveal="up" style={{ '--d': '320ms' }}>
          <Link to={primary.to} className="btn btn--gold"><BtnText>{primary.label}</BtnText></Link>
          <Link to={secondary.to} className="btn btn--line"><BtnText>{secondary.label}</BtnText></Link>
        </div>
      </div>
    </div>
  </section>
);

export default CtaStrip;
