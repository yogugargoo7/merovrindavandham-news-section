export const trackLeadEvent = (eventName, details = {}) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    project: 'Mero Vrindavan Dham',
    event_category: details.event_category || 'lead',
    ...details,
  });
};

export const trackConversionEvent = (eventName, source, details = {}) => {
  trackLeadEvent(eventName, {
    source,
    event_category: 'conversion',
    ...details,
  });
};
