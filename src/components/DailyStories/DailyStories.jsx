import { Link } from 'react-router-dom';
import './DailyStories.css';
import { publicAsset } from '../../utils/publicAsset';

const stories = [
  {
    id: 1,
    tag: 'Today',
    title: 'Site location glimpse',
    note: 'A quick visual update for buyers checking the project position and surrounding access.',
    image: publicAsset('vrindavan-material/drone-view-mvd-3d.webp'),
  },
  {
    id: 2,
    tag: 'Access',
    title: 'Approach road view',
    note: 'Road-facing frame to understand movement, visit planning and project entry feel.',
    image: publicAsset('vrindavan-material/site-3d-view.webp'),
  },
  {
    id: 3,
    tag: 'Project',
    title: 'Frontage update',
    note: 'A clean project-facing visual for families comparing plotted options near Vrindavan.',
    image: publicAsset('vrindavan-material/entry-view-01.webp'),
  },
  {
    id: 4,
    tag: 'Plot',
    title: 'Open plot character',
    note: 'Useful for buyers imagining future construction, holding value or family use.',
    image: publicAsset('vrindavan-material/project-photo-03.webp'),
  },
];

const DailyStories = () => {
  return (
    <section className="daily-stories-section reveal-on-scroll" id="daily-stories">
      <div className="daily-stories-container">
        <div className="daily-stories-header">
          <span className="daily-stories-kicker">Daily Visual Stories</span>
          <div>
            <h2>Fresh Site Views — Straight from the Project.</h2>
            <p>
              Quick visual updates for buyers who want to understand the site,
              approach road and plot feel before booking a visit.
            </p>
          </div>
          <Link to="/contact" className="daily-stories-action">
            Request Site Update
          </Link>
        </div>

        <div className="daily-stories-strip" aria-label="Daily project visual stories">
          {stories.map((story) => (
            <article className="daily-story-card" key={story.id}>
              <img src={story.image} alt={story.title} loading="lazy" decoding="async" />
              <div className="daily-story-overlay">
                <span>{story.tag}</span>
                <h3>{story.title}</h3>
                <p>{story.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyStories;
