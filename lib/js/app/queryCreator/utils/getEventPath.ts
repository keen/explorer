export const getEventPath = (event: Event & { path?: Element[] }) =>
  event.path || (event.composedPath && event.composedPath());
