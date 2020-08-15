import {
  GAME_SPEED,
  GROWTH_RATE,
  BOARD_SIZE,
  DEFAULT_SIZE,
} from "../constants";
import { Input } from "./input";
import { Snake } from "./snake";
import { Food } from "./food";
import { areMatchingCoords } from "../utils";
import { getAnimateFps } from "./getAnimateFps";
import { drawNewGameScreen } from "./screens";

type RunningStates = "NEW_GAME" | "RUNNING" | "GAME_OVER";
interface GameSettings {
  modelSize: number;
  gameSpeed: number;
  snakeGrowthRate: number;
}

interface GameInput {
  settings?: GameSettings;
  canvasId: string;
}

interface GameState {
  score: number;
  highScore: number;
  runState: RunningStates;
}

interface GameObjects {
  food: Food;
  snake: Snake;
}

const defaultGameSettings: GameSettings = {
  modelSize: DEFAULT_SIZE,
  gameSpeed: GAME_SPEED,
  snakeGrowthRate: GROWTH_RATE,
};

export class Game {
  private settings: GameSettings;
  private state: GameState;
  private highScore: number;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private input: Input;
  private objects: GameObjects;
  private animate: { startAnimation: () => void; stopAnimation: () => void };

  constructor({ settings, canvasId }: GameInput) {
    this.settings = { ...defaultGameSettings, ...settings };
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.width = BOARD_SIZE;
    this.canvas.height = BOARD_SIZE;
    this.highScore = 0;
    this.objects = {
      food: new Food(this.ctx),
      snake: new Snake(this.ctx, this.onGameOver),
    };
    this.input = new Input();
    this.state = { score: 0, highScore: 0, runState: "NEW_GAME" };
    this.setNewGame();
    this.animate = getAnimateFps(this.settings.gameSpeed, this.onAnimate);
  }

  public setNewGame = () => {
    drawNewGameScreen(this.ctx);
    this.state = {
      score: 0,
      highScore: this.highScore,
      runState: "NEW_GAME",
    };
    // const handleSpacebar = (e: KeyboardEvent) => this.startGame()
    window.addEventListener("keypress", (e) => {
      if (e.key === " ") {
        this.startGame();
        //   window.removeEventListener("keypress")
      }
    });
  };

  private onGameOver = () => {
    console.log("GAME OVER");
    this.state.runState = "GAME_OVER";
    this.animate.stopAnimation();
  };

  private createNewFood = () => {
    const { food, snake } = this.objects;
    food.createFood();
    while (snake.isOnSnake(food.getFoodCoords())) {
      food.createFood();
    }
  };

  private startGame = () => {
    this.animate.startAnimation();
  };

  private snakeOnFood = () => {
    const { food, snake } = this.objects;

    const snakeHeadCoords = snake.getSnakeCoords()[0];
    const foodCoords = food.getFoodCoords();

    if (!areMatchingCoords(snakeHeadCoords, foodCoords)) return;
    snake.grow();
    this.createNewFood();
  };

  private onAnimate = () => {
    const { food, snake } = this.objects;
    this.clearCanvas();
    snake.moveSnake(this.input.getInputDirection());
    this.snakeOnFood();
    snake.drawSnake();
    food.drawFood();
    return;
  };

  private clearCanvas = () =>
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
