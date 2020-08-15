export const getAnimateFps = (fps: number, callback: () => void) => {
  let lastRenderTime = 0;
  callback();

  const animate = (currentTime: number) => {
    window.requestAnimationFrame(animate);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

    if (secondsSinceLastRender < 1 / fps) return;

    callback();
    lastRenderTime = currentTime;
  };

  const startAnimation = () => {
    window.requestAnimationFrame(animate);
  };

  return { animate, startAnimation };
};
