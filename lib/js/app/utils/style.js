export const getThemeForSelect = (theme) => ({
  ...theme,
  colors: {
  ...theme.colors,
    primary25: '#f4f6f7',
    primary: '#00bbde',
  },
});