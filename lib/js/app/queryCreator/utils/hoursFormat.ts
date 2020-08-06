export const use12HoursDateFormat = () => {
  const testDate = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  const dateString = testDate.toLocaleTimeString();
  return Array.isArray(
    dateString.match(/am|pm/i) || testDate.toString().match(/am|pm/i)
  );
};
