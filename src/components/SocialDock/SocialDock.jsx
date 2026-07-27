import './SocialDock.css';
import { trackConversionEvent } from '../../utils/analytics';

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/merovrindavandhamtownship/',
    className: 'social-dock__item--instagram',
    label: 'Follow on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.75A4 4 0 0 0 3.75 7.75v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4h-8.5ZM12 7.25A4.75 4.75 0 1 1 7.25 12 4.76 4.76 0 0 1 12 7.25Zm0 1.75A3 3 0 1 0 15 12a3 3 0 0 0-3-3Zm5.25-2.12a1.13 1.13 0 1 1-1.13 1.12 1.13 1.13 0 0 1 1.13-1.12Z" />
      </svg>
    )
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1HmRotdT2k/',
    className: 'social-dock__item--facebook',
    label: 'Visit Facebook page',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.6V11H7v3h2.8v8h3.7Z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@subhsankalpestate',
    className: 'social-dock__item--youtube',
    label: 'Watch on YouTube',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.11C17.62 4.5 12 4.5 12 4.5s-5.62 0-7.48.58a2.98 2.98 0 0 0-2.1 2.11A31.2 31.2 0 0 0 1.85 12a31.2 31.2 0 0 0 .57 4.81 2.98 2.98 0 0 0 2.1 2.11c1.86.58 7.48.58 7.48.58s5.62 0 7.48-.58a2.98 2.98 0 0 0 2.1-2.11A31.2 31.2 0 0 0 22.15 12a31.2 31.2 0 0 0-.57-4.81ZM10.2 15.14V8.86L15.64 12l-5.44 3.14Z" />
      </svg>
    )
  }
];

const SocialDock = () => {
  const handleLinkClick = (e, item) => {
    trackConversionEvent('social_click', 'Social Dock', { channel: item.name });
  };

  return (
    <div className="social-dock" aria-label="Social media links">
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.href || '#'}
          onClick={(e) => handleLinkClick(e, item)}
          className={`social-dock__item ${item.className}`}
          target="_blank"
          rel="noreferrer"
          aria-label={item.name}
        >
          <span className="social-dock__tooltip">{item.label}</span>
          <span className="social-dock__icon">{item.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialDock;
