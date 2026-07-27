import './LocationMap.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackConversionEvent } from '../../utils/analytics';

const exactPlotLocation = {
  coordinates: '27.6349678,77.7368851',
  mapsUrl: 'https://maps.app.goo.gl/rfQE3UG4GS3gfh998',
};

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
    <section id="location" className="location-section reveal-on-scroll">
      <div className="location-container">
        <div className="location-header">
          <div className="location-badge">
            <div className="location-badge-icon"></div>
            Prime Location
          </div>
          <h2 className="location-title">
            Location & Connectivity
          </h2>
          <h3 className="location-subtitle">
            Near Vrindavan, Mathura
          </h3>
          <p className="location-description">
            Open the route, confirm the exact project pin and plan your site visit with the sales team before travelling.
          </p>
        </div>

        <div className="location-content-grid">
          <div className="location-map-container">
            <div className="location-map-wrapper">
              {isMapLoaded ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${exactPlotLocation.coordinates}&z=16&output=embed`}
                  className="location-map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mero Vrindavan Dham Township Location Map - Vrindavan, Mathura"
                ></iframe>
              ) : (
                <button type="button" className="location-map-placeholder" onClick={() => {
                  trackConversionEvent('map_load_click', 'Location Section');
                  setIsMapLoaded(true);
                }}>
                  <span className="location-map-placeholder-pin">Map</span>
                  <strong>Load Location Map</strong>
                  <span>Tap to view the Google Map preview.</span>
                </button>
              )}
              <div className="location-map-overlay">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Exact Plot Location
              </div>
              <div className="location-map-pin" aria-hidden="true">
                <span className="location-map-pin-head"></span>
                <span className="location-map-pin-shadow"></span>
              </div>
            </div>
            <div className="location-map-controls">
              <button
                onClick={handleGetDirections}
                className="location-directions-btn"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Get Directions
              </button>
              <Link
                to="/contact"
                onClick={() => trackConversionEvent('site_visit_enquiry_click', 'Location Site Visit')}
                className="location-directions-btn location-directions-btn--secondary"
              >
                Confirm Site Visit
              </Link>
              <p className="location-map-note">
                Confirm the exact project pin with the sales team before planning your visit.
              </p>
            </div>
          </div>

          <div className="location-landmarks">
            <div className="location-landmarks-header">
              <h3 className="location-landmarks-title">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Nearby access points
              </h3>
              <p className="location-landmarks-subtitle">
                Tap any item to open it in Google Maps.
              </p>
            </div>

            <div className="location-landmarks-grid">
              {nearbyLandmarks.map((landmark) => (
                <div
                  key={landmark.id}
                  className="location-landmark-card"
                  onClick={() => handleLandmarkClick(landmark)}
                >
                  <div className="location-landmark-content">
                    <div className="location-landmark-marker">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div className="location-landmark-info">
                      <div className="location-landmark-icon">
                        {landmark.icon}
                      </div>
                      <h4 className="location-landmark-name">{landmark.name}</h4>
                      <p className="location-landmark-description">{landmark.description}</p>
                    </div>
                    <div className="location-landmark-stats">
                      <div className="location-landmark-type">
                        <span>{landmark.type}</span>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="location-highlight-strip">
          {locationHighlights.map((item) => (
            <div className="location-highlight-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>

        <div className="location-connectivity">
          <div className="location-connectivity-content">
            <h3 className="location-connectivity-title">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Simple travel overview
            </h3>
            <p className="location-connectivity-description">
              A cleaner view of the practical location points buyers usually ask about
              before booking a call or site visit.
            </p>
            <div className="location-connectivity-stats">
              {connectivityStats.map((stat, index) => (
                <div key={index} className="location-connectivity-stat">
                  <div className="location-connectivity-stat-number">{stat.number}</div>
                  <div className="location-connectivity-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
