const breakpoints = ['0', '600px', '960px', '1280px', '1920px'] as any;

breakpoints.xs = breakpoints[0];
breakpoints.sm = breakpoints[1];
breakpoints.md = breakpoints[2];
breakpoints.lg = breakpoints[3];
breakpoints.xl = breakpoints[4];

const theme = {
  breakpoints,
};

export default theme;
