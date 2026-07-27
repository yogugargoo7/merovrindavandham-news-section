export const normalizeIndianMobile = (value = '') => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }

  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }

  return digits;
};

export const sanitizeIndianMobileInput = (value = '') => {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith('91') && digits.length > 10) {
    return digits.slice(2, 12);
  }

  if (digits.startsWith('0') && digits.length > 10) {
    return digits.slice(1, 11);
  }

  return digits.slice(0, 10);
};

export const isValidIndianMobile = (value = '') => {
  const mobile = normalizeIndianMobile(value);
  return /^[6-9]\d{9}$/.test(mobile);
};

export const formatIndianMobile = (value = '') => normalizeIndianMobile(value);
