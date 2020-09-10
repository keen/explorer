const getScreenDimensions = () => {
  const width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  return {
    width,
    height,
  };
};

export default getScreenDimensions;
