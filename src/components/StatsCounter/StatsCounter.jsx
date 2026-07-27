import './StatsCounter.css';

const projectFacts = [
  { value: 'Rs. 11,000', label: 'Token Amount', note: 'As shown in the latest payment plan' },
  { value: '40%', label: 'Booking Amount', note: 'Payable within 7 days to confirm booking' },
  { value: '6-12', label: 'Months Installments', note: 'Remaining amount as per latest payment plan' },
  { value: '70%', label: 'Registry Process', note: 'Registry processed after 70% payment' },
];

function StatCard({ fact, index }) {
  return (
    <div className="stat-card" style={{ animationDelay: `${index * 0.12}s` }}>
      <div className="stat-value">{fact.value}</div>
      <div className="stat-label">{fact.label}</div>
      <p className="stat-note">{fact.note}</p>
      <div className="stat-glow"></div>
    </div>
  );
}

const StatsCounter = () => {
  return (
    <section className="stats-section reveal-on-scroll" aria-label="Project snapshot">
      <div className="stats-bg-pattern" aria-hidden="true"></div>
      <div className="stats-container">
        <div className="stats-header">
          <span className="stats-kicker">Project Snapshot</span>
          <h2 className="stats-title">Key details buyers check before shortlisting a plot</h2>
          <div className="section-gold-line--center section-gold-line"></div>
        </div>
        <div className="stats-grid">
          {projectFacts.map((fact, index) => (
            <StatCard key={fact.label} fact={fact} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
