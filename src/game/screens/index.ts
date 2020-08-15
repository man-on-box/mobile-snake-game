import { BOARD_SIZE } from "../../constants";

export const drawNewGameScreen = (ctx: CanvasRenderingContext2D) => {
  const textString = "Press SPACEBAR to start!";
  const coord = BOARD_SIZE / 2;

  ctx.font = "20px monospace";
  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText(textString, coord, coord);
};
