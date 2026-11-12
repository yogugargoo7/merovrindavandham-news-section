import { useState, useEffect } from 'react';
import './Testimonials.css';
import { usePlots } from '../../hooks/usePlots';
import SplitText from '../fx/SplitText';

const ROTATE_MS = 5000;

const testimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar Sharma',
    location: 'Delhi',
    plot: 'Residential Plot Enquiry',
    rating: 5,
    text: 'The team explained the location, brochure and visit process with clarity. The route pin was shared on time and the site visit felt well coordinated.',
    initial: 'R',
  },
  {
    id: 2,
    name: 'Priya Singh',
    location: 'Agra',
    plot: 'Plot Size Discussion',
    rating: 5,
    text: 'The team response was quick and professional. I received clear guidance on plot sizes, payment planning and suitable visit timings.',
    initial: 'P',
  },
  {
    id: 3,
    name: 'Mohan Lal Gupta',
    location: 'Mathura',
    plot: 'Investment Plot Enquiry',
    rating: 5,
    text: 'The Mathura-Vrindavan location looked practical for a long-term investment. The sales team guided me through availability and document checks patiently.',
    initial: 'M',
  },
  {
    id: 4,
    name: 'Sunita Agarwal',
    location: 'Noida',
    plot: 'Family Plot Enquiry',
    rating: 5,
    text: 'We wanted to explore a plot near Vrindavan for our family. The executive explained the location, road access and payment plan in a simple, transparent way.',
    initial: 'S',
  },
  {
    id: 5,
    name: 'Amit Verma',
    location: 'Lucknow',
    plot: 'Site Visit',
    rating: 5,
    text: 'The callback and site visit scheduling were timely. After reviewing the brochure, the team clearly shared the next steps without any pressure.',
    initial: 'A',
  },
];

const StarRating = ({ count }) => (
  <div className="tm__stars" aria-label={`${count} stars`}>
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const ArrowIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={direction === 'next' ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'} />
  </svg>
);

const Testimonials = () => {
  const { stats } = usePlots();
  const totalPlots = stats.totalPlots || 178;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (index) => setActive((index + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return undefined;
    const id = setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearTimeout(id);
  }, [paused, active]);

  const current = testimonials[active];

  return (
    <section
      className={`sec sec--ink on-dark grain tm${paused ? ' tm--paused' : ''}`}
      id="testimonials"
      aria-label="Buyer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap tm__grid">
        <div className="tm__intro">
          <span className="eyebrow" data-reveal="up">Happy Buyers</span>
          <SplitText as="h2" className="display-l tm__title" text={"Buyer Stories, Told With *Confidence*"} />
          <span className="tm__rule" data-reveal="line" aria-hidden="true" />
          <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
            Thoughtful feedback from buyers who explored Mero Vrindavan Dham for location, planning and site-visit support.
          </p>

          <div className="tm__trust" data-reveal="stagger" style={{ '--d': '200ms' }}>
            <div className="tm__badge">
              <span className="tm__badge-icon" aria-hidden="true">{totalPlots}</span>
              <span>Total Plots</span>
            </div>
            <div className="tm__badge">
              <span className="tm__badge-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
              </span>
              <span>Quick Response Team</span>
            </div>
            <div className="tm__badge">
              <span className="tm__badge-icon" aria-hidden="true">5★</span>
              <span>Buyer Satisfaction</span>
            </div>
          </div>
        </div>

        <div className="tm__stage" data-reveal="up" style={{ '--d': '200ms' }}>
          <svg className="tm__quote-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <figure className="tm__card" key={current.id}>
            <blockquote className="tm__text">{current.text}</blockquote>
            <figcaption className="tm__footer">
              <div className="tm__author">
                <div className="tm__avatar" aria-hidden="true">{current.initial}</div>
                <div>
                  <div className="tm__name">{current.name}</div>
                  <div className="tm__meta">
                    <span>{current.location}</span>
                    <span>- {current.plot}</span>
                  </div>
                </div>
              </div>
              <StarRating count={current.rating} />
            </figcaption>
          </figure>

          <div className="tm__controls">
            <div className="tm__dots" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`tm__dot${i === active ? ' is-active' : ''}`}
                  style={{ '--rotate-ms': `${ROTATE_MS}ms` }}
                  onClick={() => goTo(i)}
                >
                  {/* remount restarts the bar so it stays in step with the timer after a pause */}
                  <span key={i === active ? `${active}-${paused}` : 'idle'} />
                </button>
              ))}
            </div>
            <div className="tm__nav">
              <span className="tm__count" aria-hidden="true">
                {String(active + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
              <button className="tm__arrow" onClick={() => goTo(active - 1)} aria-label="Previous testimonial">
                <ArrowIcon direction="previous" />
              </button>
              <button className="tm__arrow" onClick={() => goTo(active + 1)} aria-label="Next testimonial">
                <ArrowIcon direction="next" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
