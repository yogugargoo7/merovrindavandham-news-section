import './TrustSection.css';

const trustItems = [
  {
    title: 'Plots in Vrindavan',
    text: 'Residential and investment plot options for buyers comparing land near Vrindavan, Mathura and nearby spiritual landmarks.',
  },
  {
    title: 'Plots near Yamuna Expressway',
    text: 'Yamuna Expressway connectivity supports easier travel from Delhi NCR, Agra and Mathura for site visits and future movement.',
  },
  {
    title: 'Residential Plots in Mathura',
    text: 'Current website plot options follow the latest payment details: 60 and 100 sq. yd. normal plots plus 150 sq. yd. corner plot.',
  },
  {
    title: 'Latest Payment Details',
    text: 'The latest payment details image and direct call assistance help serious buyers verify token, booking and installment information before booking.',
  },
];

const quickStats = [
  { value: 'Rs. 11,000', label: 'Token Amount' },
  { value: '40%', label: 'Booking Amount' },
  { value: '6-12', label: 'Months Installments' },
  { value: '70%', label: 'Registry Process' },
];

const TrustSection = () => {
  return (
    <section id="highlights" className="trust-section" aria-label="Project trust highlights">
      <div className="trust-container">
        <div className="trust-copy">
          <span className="trust-kicker">Project highlights</span>
          <h2 className="trust-title">Plots in Vrindavan near Yamuna Expressway and Mathura.</h2>
          <p className="trust-text">
            Mero Vrindavan Dham is built for buyers searching Vrindavan plots, plots for sale in Vrindavan,
            Yamuna Expressway plots and residential plots in Mathura with details aligned to the latest payment plan.
          </p>
        </div>

        <div className="trust-grid">
          {trustItems.map((item) => (
            <article key={item.title} className="trust-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="trust-stats">
          {quickStats.map((stat) => (
            <div key={stat.label} className="trust-stat">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className="trust-disclaimer">
          Website pricing follows the latest payment details only. Documents and plot availability should be confirmed with the official sales team before booking.
        </p>
      </div>
    </section>
  );
};

export default TrustSection;
