export const transformInterval = (interval: string): string => {
  const capitalLetter = `${interval.charAt(0).toUpperCase()}${interval.slice(
    1
  )}`;
  return capitalLetter.split('_').join(' ');
};
