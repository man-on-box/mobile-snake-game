const font = "monospace";

const headerSize = 50;
const textSize = 20;

export const setHeader = (ctx: CanvasRenderingContext2D) =>
  (ctx.font = `${headerSize}px ${font}`);

export const setText = (ctx: CanvasRenderingContext2D) =>
  (ctx.font = `${textSize}px ${font}`);
