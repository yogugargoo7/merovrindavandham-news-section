import { Link } from 'react-router-dom';
import SplitText from '../fx/SplitText';
import BtnText from '../fx/BtnText';
import './Process.css';

const Process = () => {
  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Requirement Discussion',
      description: 'Share your budget, preferred plot size and whether you are exploring for self-use or investment so the next conversation stays relevant.',
      icon: 'Consult',
      timeline: 'Step 1',
      features: ['Requirement clarity', 'Budget-based guidance', 'Relevant discussion only']
    },
    {
      id: 2,
      number: '02',
      title: 'Project Shortlisting',
      description: 'Review brochure, plot options and key highlights in a more focused way so you understand the project before spending time on a visit.',
      icon: 'Select',
      timeline: 'Step 2',
      features: ['Brochure support', 'Plot option review', 'Clearer comparison']
    },
    {
      id: 3,
      number: '03',
      title: 'Site Visit Planning',
      description: 'Fix a practical time slot and explore the location, access and on-ground project understanding with guided support.',
      icon: 'Visit',
      timeline: 'Step 3',
      features: ['Visit scheduling', 'Ground understanding', 'Location walkthrough']
    },
    {
      id: 4,
      number: '04',
      title: 'Documentation Guidance',
      description: 'Move ahead with more confidence through support around documentation, verification and discussion of the next formal step.',
      icon: 'Legal',
      timeline: 'Step 4',
      features: ['Documentation support', 'Verification guidance', 'Clearer next step']
    },
    {
      id: 5,
      number: '05',
      title: 'Booking Completion',
      description: 'Complete the booking journey with better payment clarity, final coordination and smoother follow-up from the team.',
      icon: 'Close',
      timeline: 'Step 5',
      features: ['Booking support', 'Payment clarity', 'Continued follow-up']
    }
  ];

  const stats = [
    { number: '1:1', label: 'Sales Assistance' },
    { number: 'Brochure', label: 'Guided Discussion' },
    { number: 'Quick', label: 'Site Visit Flow' }
  ];

  return (
    <section id="process" className="sec sec--sand prc">
      <div className="wrap prc__grid">
        <div className="prc__head">
          <span className="eyebrow" data-reveal="up">Buyer Journey</span>
          <SplitText as="h2" className="display-l" text={"A simple and *conversion-friendly* path"} />
          <h3 className="prc__subtitle" data-reveal="up" style={{ '--d': '120ms' }}>from first enquiry to final booking discussion</h3>
          <p className="prc__description" data-reveal="up" style={{ '--d': '180ms' }}>
            This section keeps the buyer journey practical: understand the requirement, shortlist options, plan the visit,
            review documentation and move toward booking with clearer support.
          </p>
        </div>

        <div className="prc__steps-wrap" data-progress>
          <span className="prc__rail" aria-hidden="true"><i /></span>
          <ol className="prc__steps">
          {steps.map((step) => (
            <li key={step.id} className="prc__step" data-reveal="up">
              <div className="prc__marker">
                <span className="prc__number">{step.number}</span>
              </div>
              <div className="prc__body">
                <div className="prc__heading">
                  <h3 className="prc__title">{step.title}</h3>
                  <span className="prc__tags">
                    <span>{step.timeline}</span>
                    <span>{step.icon}</span>
                  </span>
                </div>
                <p className="prc__text">{step.description}</p>
                <ul className="prc__features">
                  {step.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>

      <div className="wrap">
        <div className="prc__cta on-dark" data-reveal="up">
          <div className="prc__cta-copy">
            <h3 className="display-m">Ready to move from browsing to a real conversation?</h3>
            <p>
              Use the brochure, buyer highlights and the enquiry form so your next step is informed,
              faster and more serious.
            </p>
            <div className="btn-row">
              <Link to="/contact" className="btn btn--gold"><BtnText>Send an Enquiry</BtnText></Link>
              <Link to="/plots" className="btn btn--line"><BtnText>View Plot Options</BtnText></Link>
            </div>
          </div>
          <div className="prc__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="prc__stat">
                <span className="prc__stat-number">{stat.number}</span>
                <span className="prc__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
