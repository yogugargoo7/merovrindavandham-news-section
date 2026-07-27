import { Link } from 'react-router-dom';
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
    <section id="process" className="process-section reveal-on-scroll">
      <div className="process-container">
        <div className="process-header">
          <div className="process-badge">
            <div className="process-badge-icon"></div>
            Buyer Journey
          </div>
          <h2 className="process-title">A simple and conversion-friendly path</h2>
          <h3 className="process-subtitle">from first enquiry to final booking discussion</h3>
          <p className="process-description">
            This section keeps the buyer journey practical: understand the requirement, shortlist options, plan the visit,
            review documentation and move toward booking with clearer support.
          </p>
        </div>

        <div className="process-steps-container">
          <div className="process-steps-grid">
            {steps.map((step) => (
              <div key={step.id} className="process-step-card">
                <div className="process-step-marker">
                  <div className="process-step-number">{step.number}</div>
                  <div className="process-step-icon">{step.icon}</div>
                </div>

                <div className="process-step-body">
                  <div className="process-step-heading">
                    <h3 className="process-step-title">{step.title}</h3>
                    <span className="process-step-timeline">{step.timeline}</span>
                  </div>
                  <p className="process-step-description">{step.description}</p>

                  <ul className="process-step-features">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="process-step-feature">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="process-cta">
          <div className="process-cta-content">
            <h3 className="process-cta-title">Ready to move from browsing to a real conversation?</h3>
            <p className="process-cta-subtitle">
              Use the brochure, buyer highlights and the enquiry form so your next step is informed,
              faster and more serious.
            </p>

            <div className="process-cta-buttons">
              <Link to="/contact" className="process-cta-primary">
                Send an Enquiry
              </Link>

              <Link to="/plots" className="process-cta-secondary">
                View Plot Options
              </Link>
            </div>

            <div className="process-stats">
              {stats.map((stat, index) => (
                <div key={index} className="process-stat">
                  <span className="process-stat-number">{stat.number}</span>
                  <span className="process-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
