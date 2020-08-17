import { BOARD_SIZE, IS_TOUCH } from "../../constants";
import { setHeader, setText } from "./fonts";

export const drawNewGameScreen = (ctx: CanvasRenderingContext2D) => {
  const middle = BOARD_SIZE / 2;
  const top = 80;

  const touchStart = "TOUCH to start!";
  const desktopStart = "Press SPACEBAR to start!";
  const howToStart = IS_TOUCH ? touchStart : desktopStart;

  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  setText(ctx);
  ctx.fillText("Yet another", middle, top);
  setHeader(ctx);
  ctx.fillText("SNAKE", middle, top + 60);
  setText(ctx);
  ctx.fillText(howToStart, middle, middle);
};

export const drawGameOverScreen = (
  ctx: CanvasRenderingContext2D,
  score: number
) => {
  const middle = BOARD_SIZE / 2;
  const top = 80;

  const touchStart = "TOUCH to try again!";
  const desktopStart = "Press SPACEBAR to try again!";
  const howToStart = IS_TOUCH ? touchStart : desktopStart;

  ctx.fillStyle = "#ffffff";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.globalCompositeOperation = "destination-over";
  setHeader(ctx);
  ctx.fillText("Game Over!", middle, top + 60);
  setText(ctx);
  ctx.fillText(`Score: ${score}`, middle, top + 120);
  ctx.fillText(howToStart, middle, middle);
};
