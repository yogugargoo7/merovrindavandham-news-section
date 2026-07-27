// Official sales contact - set the real number ONCE here and every
// Call / WhatsApp button across the site goes live automatically.
// Format: full international number without spaces or dashes, e.g. '+919876543210'.
// While this is empty (''), all Call/WhatsApp buttons stay hidden so no
// wrong number is ever shown to visitors.
export const SALES_PHONE = '';

export const WHATSAPP_MESSAGE =
  'Hi, I am interested in Mero Vrindavan Dham. Please share the latest payment details and site visit options.';

export const hasSalesPhone = Boolean(SALES_PHONE);

export const telHref = `tel:${SALES_PHONE}`;

export const waHref = `https://wa.me/${SALES_PHONE.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
