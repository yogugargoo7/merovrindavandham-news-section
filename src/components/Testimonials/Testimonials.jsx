import { useState, useEffect, useRef } from 'react';
import './Testimonials.css';
import { usePlots } from '../../hooks/usePlots';

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar Sharma',
    location: 'Delhi',
    plot: 'Residential Plot Enquiry',
    rating: 5,
    text: 'The team explained the location, brochure and visit process with clarity. The route pin was shared on time and the site visit felt well coordinated.',
    initial: 'R',
    color: '#1E3A8A',
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'Agra',
    plot: 'Plot Size Discussion',
    rating: 5,
    text: 'The team response was quick and professional. I received clear guidance on plot sizes, payment planning and suitable visit timings.',
    initial: 'P',
    color: '#0F766E',
  },
  {
    id: 3,
    name: 'Mohan Lal Gupta',
    location: 'Mathura',
    plot: 'Investment Plot Enquiry',
    rating: 5,
    text: 'The Mathura-Vrindavan location looked practical for a long-term investment. The sales team guided me through availability and document checks patiently.',
    initial: 'M',
    color: '#c89a5e',
  },
  {
    id: 4,
    name: 'Sunita Agarwal',
    location: 'Noida',
    plot: 'Family Plot Enquiry',
    rating: 5,
    text: 'We wanted to explore a plot near Vrindavan for our family. The executive explained the location, road access and payment plan in a simple, transparent way.',
    initial: 'S',
    color: '#7C3AED',
  },
  {
    id: 5,
    name: 'Amit Verma',
    location: 'Lucknow',
    plot: 'Site Visit',
    rating: 5,
    text: 'The callback and site visit scheduling were timely. After reviewing the brochure, the team clearly shared the next steps without any pressure.',
    initial: 'A',
    color: '#DC2626',
  },
];

const StarRating = ({ count }) => (
  <div className="testimonial-stars" aria-label={`${count} stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ArrowIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={direction === 'next' ? 'M9 6l6 6-6 6' : 'M15 18l-6-6 6-6'} />
  </svg>
);

const Testimonials = () => {
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => setActive((index + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const current = testimonials[active];

  return (
    <section
      className="testimonials-section reveal-on-scroll"
      id="testimonials"
      aria-label="Buyer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-kicker">Happy Buyers</span>
          <h2 className="testimonials-title">
            Buyer Stories, Told With Confidence
          </h2>
          <div className="section-gold-line section-gold-line--center"></div>
          <p className="testimonials-subtitle">
            Thoughtful feedback from buyers who explored Mero Vrindavan Dham for location, planning and site-visit support.
          </p>
        </div>

        <div className="testimonials-card-wrapper">
          <div className="testimonials-quote-icon" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <div className="testimonials-card" key={current.id}>
            <div className="testimonials-text">{current.text}</div>

            <div className="testimonials-footer">
              <div className="testimonials-author">
                <div
                  className="testimonials-avatar"
                  style={{ background: `linear-gradient(135deg, ${current.color}, ${current.color}aa)` }}
                  aria-hidden="true"
                >
                  {current.initial}
                </div>
                <div className="testimonials-author-info">
                  <div className="testimonials-name">{current.name}</div>
                  <div className="testimonials-meta">
                    <span className="testimonials-location">{current.location}</span>
                    <span className="testimonials-plot">- {current.plot}</span>
                  </div>
                </div>
              </div>
              <StarRating count={current.rating} />
            </div>
          </div>
        </div>

        <div className="testimonials-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`testimonials-dot ${i === active ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="testimonials-nav">
          <button
            className="testimonials-arrow"
            onClick={() => goTo(active - 1)}
            aria-label="Previous testimonial"
          >
            <ArrowIcon direction="previous" />
          </button>
          <button
            className="testimonials-arrow"
            onClick={() => goTo(active + 1)}
            aria-label="Next testimonial"
          >
            <ArrowIcon direction="next" />
          </button>
        </div>

        <div className="testimonials-trust">
          <div className="trust-badge">
            <span className="trust-badge-icon" aria-hidden="true">{totalPlots}</span>
            <span>Total Plots</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon" aria-hidden="true">⚡</span>
            <span>Quick Response Team</span>
          </div>
          <div className="trust-badge">
            <span className="trust-badge-icon" aria-hidden="true">5★</span>
            <span>Buyer Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
