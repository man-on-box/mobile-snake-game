import "./css/index.css";
import { BOARD_SIZE, GAME_SPEED } from "./constants";
import { getAnimateFps } from "./game/getAnimateFps";
import { Input } from "./game/input";
import { Snake } from "./game/snake";
import { Food } from "./game/food";

const canvas = <HTMLCanvasElement>document.getElementById("game-board");
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

canvas.width = BOARD_SIZE;
canvas.height = BOARD_SIZE;

const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

const snake = new Snake(ctx);
const food = new Food(ctx);
const input = new Input();

const onAnimate = () => {
  clearCanvas();
  snake.moveSnake(input.getInputDirection());
  snake.drawSnake();
  food.drawFood();
  return;
};

const { startAnimation } = getAnimateFps(GAME_SPEED, onAnimate);
startAnimation();
