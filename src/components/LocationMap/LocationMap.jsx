import './LocationMap.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SplitText from '../fx/SplitText';
import BtnText from '../fx/BtnText';
import ShareLocation from '../ShareLocation/ShareLocation';
import { trackConversionEvent } from '../../utils/analytics';
import { PROJECT_LOCATION as exactPlotLocation } from '../../config/location';

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LocationMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(true);
  const nearbyLandmarks = [
    {
      id: 1,
      name: 'Banke Bihari Temple',
      description: 'Popular temple destination in Vrindavan',
      icon: 'Temple',
      type: 'Open map',
      searchHint: 'Vrindavan, Uttar Pradesh'
    },
    {
      id: 2,
      name: 'Prem Mandir',
      description: 'Known for marble architecture and evening lights',
      icon: 'Temple',
      type: 'Open map',
      searchHint: 'Vrindavan, Uttar Pradesh'
    },
    {
      id: 3,
      name: 'Mathura Junction',
      description: 'Railway gateway for Mathura-Vrindavan travel',
      icon: 'Station',
      type: 'Open map',
      searchHint: 'Mathura, Uttar Pradesh'
    },
    {
      id: 4,
      name: 'Mero Vrindavan Dham Plot Pin',
      description: 'Exact Google Maps location for the project site',
      icon: 'Plot',
      type: 'Open map',
      mapsUrl: exactPlotLocation.mapsUrl
    }
  ];

  const locationHighlights = [
    { label: 'Visit Route', value: 'Exact plot pin', note: 'Open route before leaving' },
    { label: 'Nearby City', value: 'Mathura access', note: 'Useful for outstation visitors' },
    { label: 'Map Location', value: '27.6349678, 77.7368851', note: 'Exact project coordinates' }
  ];

  const connectivityStats = [
    { number: '01', label: 'Project pin confirmation' },
    { number: '02', label: 'Site visit coordination' },
    { number: '03', label: 'Route and landmark support' },
    { number: '04', label: 'Current plot availability' }
  ];

  const handleGetDirections = () => {
    trackConversionEvent('directions_click', 'Location Section');
    window.open(exactPlotLocation.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLandmarkClick = (landmark) => {
    trackConversionEvent('landmark_map_click', 'Location Section', { landmark: landmark.name });
    if (landmark.mapsUrl) {
      window.open(landmark.mapsUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    const searchBase = landmark.searchHint
      ? `${landmark.name} ${landmark.searchHint}`
      : `${landmark.name} Vrindavan, Uttar Pradesh`;
    const searchQuery = encodeURIComponent(searchBase);
    const googleMapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section id="location" className="sec sec--paper loc">
      <div className="wrap">
        <div className="sec-head sec-head--split">
          <span className="eyebrow" data-reveal="up">Prime Location</span>
          <div className="loc__titles">
            <SplitText as="h2" className="display-l" text={"Location &\n*Connectivity*"} />
            <h3 className="loc__subtitle" data-reveal="up" style={{ '--d': '160ms' }}>Near Vrindavan, Mathura</h3>
          </div>
          <p className="lede" data-reveal="up" style={{ '--d': '150ms' }}>
            Open the route, confirm the exact project pin and plan your site visit with the sales team before travelling.
          </p>
        </div>

        <div className="loc__grid">
          <div className="loc__map-col" data-reveal="up">
            <div className="loc__map">
              {isMapLoaded ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${exactPlotLocation.coordinates}&z=16&output=embed`}
                  className="loc__iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mero Vrindavan Dham Township Location Map - Vrindavan, Mathura"
                ></iframe>
              ) : (
                <button type="button" className="loc__placeholder" onClick={() => {
                  trackConversionEvent('map_load_click', 'Location Section');
                  setIsMapLoaded(true);
                }}>
                  <span className="loc__placeholder-pin">Map</span>
                  <strong>Load Location Map</strong>
                  <span>Tap to view the Google Map preview.</span>
                </button>
              )}
              <div className="loc__chip">
                <PinIcon />
                Exact Plot Location
              </div>
            </div>
            <div className="loc__controls">
              <button onClick={handleGetDirections} className="btn btn--ink">
                <BtnText icon={<PinIcon />}>Get Directions</BtnText>
              </button>
              <ShareLocation source="Location Section" />
              <Link
                to="/contact"
                onClick={() => trackConversionEvent('site_visit_enquiry_click', 'Location Site Visit')}
                className="btn btn--line"
              >
                <BtnText>Confirm Site Visit</BtnText>
              </Link>
            </div>
            <p className="loc__note">
              Confirm the exact project pin with the sales team before planning your visit.
            </p>
          </div>

          <div className="loc__landmarks">
            <div className="loc__landmarks-head" data-reveal="up">
              <h3 className="loc__landmarks-title">
                <PinIcon />
                Nearby access points
              </h3>
              <p className="loc__landmarks-sub">Tap any item to open it in Google Maps.</p>
            </div>

            <div className="loc__list" data-reveal="stagger">
              {nearbyLandmarks.map((landmark) => (
                <button
                  type="button"
                  key={landmark.id}
                  className="loc__landmark"
                  onClick={() => handleLandmarkClick(landmark)}
                >
                  <span className="loc__landmark-icon">{landmark.icon}</span>
                  <span className="loc__landmark-info">
                    <span className="loc__landmark-name">{landmark.name}</span>
                    <span className="loc__landmark-desc">{landmark.description}</span>
                  </span>
                  <span className="loc__landmark-type">
                    <span>{landmark.type}</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="loc__highlights" data-reveal="stagger">
          {locationHighlights.map((item) => (
            <div className="loc__highlight" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>

        <div className="loc__connect on-dark" data-reveal="up">
          <div className="loc__connect-copy">
            <h3 className="loc__connect-title">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Simple travel overview
            </h3>
            <p>
              A cleaner view of the practical location points buyers usually ask about
              before booking a call or site visit.
            </p>
          </div>
          <div className="loc__connect-stats">
            {connectivityStats.map((stat) => (
              <div key={stat.number} className="loc__connect-stat">
                <div className="loc__connect-num">{stat.number}</div>
                <div className="loc__connect-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
