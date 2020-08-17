import {
  GAME_SPEED,
  GROWTH_RATE,
  BOARD_SIZE,
  DEFAULT_SIZE,
} from "../constants";
import { Input } from "./input";
import { Snake } from "./snake";
import { Food } from "./food";
import { areMatchingCoords, updateAllQuerySelectors } from "../utils";
import { getAnimateFps } from "./getAnimateFps";
import { drawNewGameScreen, drawGameOverScreen } from "./screens";

type RunningStates = "NEW_GAME" | "RUNNING" | "GAME_OVER";
interface GameSettings {
  modelSize: number;
  gameSpeed: number;
  snakeGrowthRate: number;
}

interface GameInput {
  settings?: GameSettings;
  canvasId: string;
  currentScoreClass: string;
  highScoreClass: string;
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

interface HtmlElements {
  currentScore: NodeListOf<HTMLElement>;
  highScore: NodeListOf<HTMLElement>;
}

const defaultGameSettings: GameSettings = {
  modelSize: DEFAULT_SIZE,
  gameSpeed: GAME_SPEED,
  snakeGrowthRate: GROWTH_RATE,
};

export class Game {
  private settings: GameSettings;
  private state: GameState;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private input: Input;
  private objects: GameObjects;
  private htmlElements: HtmlElements;
  private animate: { startAnimation: () => void; stopAnimation: () => void };

  constructor({
    settings,
    canvasId,
    currentScoreClass,
    highScoreClass,
  }: GameInput) {
    this.settings = { ...defaultGameSettings, ...settings };
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.canvas.width = BOARD_SIZE;
    this.canvas.height = BOARD_SIZE;
    this.objects = this.setNewGameObjects();
    this.input = new Input(this.canvas);
    this.state = { score: 0, highScore: 0, runState: "NEW_GAME" };
    this.htmlElements = {
      currentScore: document.querySelectorAll(
        `.${currentScoreClass}`
      ) as NodeListOf<HTMLElement>,
      highScore: document.querySelectorAll(`.${highScoreClass}`) as NodeListOf<
        HTMLElement
      >,
    };
    this.setNewGame();
    this.animate = getAnimateFps(this.settings.gameSpeed, this.onAnimate);
  }

  private updateCurrentScore = (score: number) => {
    this.state.score = score;
    if (score > this.state.highScore) {
      this.state.highScore = score;
    }
    updateAllQuerySelectors(
      this.htmlElements.currentScore,
      (element) => (element.innerText = score.toString())
    );

    updateAllQuerySelectors(
      this.htmlElements.highScore,
      (element) => (element.innerText = this.state.highScore.toString())
    );
  };

  private setNewGameObjects = (): GameObjects => ({
    food: new Food(this.ctx),
    snake: new Snake(this.ctx, this.onGameOver),
  });

  public setNewGame = () => {
    drawNewGameScreen(this.ctx);
    const handleStart = () => {
      if (this.state.runState !== "RUNNING") {
        this.startGame();
      }
    };
    window.addEventListener("keypress", (e) => {
      if (e.key === " ") {
        handleStart();
      }
    });
    window.addEventListener("touchend", () => {
      handleStart();
    });
  };

  private onGameOver = () => {
    this.state.runState = "GAME_OVER";
    drawGameOverScreen(this.ctx, this.state.score);
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
    this.updateCurrentScore(0);
    this.state.runState = "RUNNING";
    this.clearCanvas();
    this.objects = this.setNewGameObjects();
    this.input = new Input(this.canvas);
    this.animate.startAnimation();
  };

  private snakeOnFood = () => {
    const snakeHeadCoords = this.objects.snake.getSnakeCoords()[0];
    const foodCoords = this.objects.food.getFoodCoords();

    if (!areMatchingCoords(snakeHeadCoords, foodCoords)) return;
    const updatedScore = this.state.score + 10;
    this.updateCurrentScore(updatedScore);
    this.objects.snake.grow();
    this.createNewFood();
  };

  private onAnimate = () => {
    if (this.state.runState !== "RUNNING") return;
    this.clearCanvas();
    this.objects.snake.moveSnake(this.input.getInputDirection());
    this.snakeOnFood();
    this.objects.snake.drawSnake();
    this.objects.food.drawFood();
    return;
  };

  private clearCanvas = () =>
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}
