const isElementInViewport = (element: HTMLElement) => {
  const { top } = element.getBoundingClientRect();
  return top >= 0 && top < window.innerHeight;
};

export default isElementInViewport;
