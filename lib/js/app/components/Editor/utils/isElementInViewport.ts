export const isElementInViewport = (elementRef) => {
  if (!elementRef.current) return;

  const { top } = elementRef.current.getBoundingClientRect();
  return top >= 0 && top < window.innerHeight;
};