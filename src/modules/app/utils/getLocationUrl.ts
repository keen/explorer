export const getLocationUrl = () => {
  const baseUrl = window.location.origin;
  const path = window.location.pathname;
  return `${baseUrl}${path ? path : ''}`;
};
