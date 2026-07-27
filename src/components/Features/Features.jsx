import { Link } from 'react-router-dom';
import './Features.css';

const Features = () => {
  const features = [
   
    {
      id: 1,
      number: "01", 
      title: 'Entry and Boundary Planning',
      description: 'Project visuals show a defined entry concept and boundary planning. Confirm current on-site status during your visit.',
      icon: '🛡️'
    },
    {
      id: 2,
      number: "02",
      title: 'Wide Roads',
      description: 'Modern infrastructure with wide roads, proper drainage, and street lighting.',
      icon: '🛣️'
    },
    {
      id: 3,
      number: "03",
      title: 'Vrindavan-Mathura Location',
      description: 'Positioned for buyers looking at plots in Vrindavan, Mathura and the Yamuna Expressway growth belt.',
      icon: '📍'
    },
    {
      id: 4,
      number: "04",
      title: 'Practical Site Facilities',
      description: 'Review road access, entry planning, open spaces and other available facilities directly with the sales team.',
      icon: '🏢'
    },
    {
      id: 5,
      number: "05",
      title: 'Investment Plot Potential',
      description: 'Suitable for buyers comparing long-term investment plots near Vrindavan and Yamuna Expressway.',
      icon: '📈'
    }
  ];


  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="features-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="features-badge">
            TOWNSHIP FEATURES
          </div>
          <h2 className="features-title">
            Plots for Sale in Vrindavan
          </h2>
          <h3 className="features-subtitle">
            with Modern Township Infrastructure
          </h3>
          <p className="features-description">
            Explore plotted development features for buyers searching Vrindavan plots, Mathura plots and
            plots near Yamuna Expressway with practical road, security and site-visit support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card"
            >
              {/* Header with Number and Icon */}
              <div className="feature-card-header">
                <div className="feature-number">
                  {feature.number}
                </div>
                <div className="feature-icon">{feature.icon}</div>
              </div>

              {/* Content */}
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="features-cta">
            <h3 className="features-cta-title">
              Ready to Review the Project?
            </h3>
            <p className="features-cta-description">
              Compare the location, plot options, payment details and site visit support before making a booking decision.
            </p>
            <div className="features-cta-buttons">
              <button 
                onClick={scrollToGallery}
                className="features-btn-primary"
              >
                View Properties
              </button>
              <Link
                to="/contact"
                className="features-btn-secondary"
              >
                Send Enquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
