export const getAnimateFps = (fps: number, callback: () => void) => {
  let lastRenderTime = 0;
  let runAnimation = true;

  const animate = (currentTime: number) => {
    while (runAnimation) {
      window.requestAnimationFrame(animate);
      const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

      if (secondsSinceLastRender < 1 / fps) return;

      callback();
      lastRenderTime = currentTime;
    }
  };

  const startAnimation = () => {
    runAnimation = true;
    callback();
    window.requestAnimationFrame(animate);
  };

  const stopAnimation = () => (runAnimation = false);

  return { animate, startAnimation, stopAnimation };
};
