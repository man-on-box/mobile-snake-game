import { Coords } from "types";
import {
  BOARD_SIZE,
  SNAKE_BODY_COLOR,
  SNAKE_STROKE_COLOR,
  SNAKE_SIZE,
  GROWTH_RATE,
} from "../constants";
import { areMatchingCoords } from "../utils";

const getInitialSnake = (bounds: number, initialLength = 4): Coords[] => {
  const centerPoint = bounds / 2 - SNAKE_SIZE;

  let initialSnake: Coords[] = [];
  for (let i = 0; i < initialLength; i++) {
    initialSnake = [
      ...initialSnake,
      [centerPoint, centerPoint + SNAKE_SIZE * i],
    ];
  }
  return initialSnake;
};

export class Snake {
  private ctx: CanvasRenderingContext2D;
  private bounds: number;
  private snakeBody: Coords[];
  private size: number;
  private onSnakeDie: () => void;

  constructor(ctx: CanvasRenderingContext2D, onSnakeDie: () => void) {
    this.ctx = ctx;
    this.bounds = BOARD_SIZE;
    this.snakeBody = getInitialSnake(this.bounds);
    this.size = SNAKE_SIZE;
    this.onSnakeDie = onSnakeDie;
  }

  private drawSnakeSegment = ([x, y]: Coords) => {
    this.ctx.fillStyle = SNAKE_BODY_COLOR;
    this.ctx.strokeStyle = SNAKE_STROKE_COLOR;
    this.ctx.fillRect(x, y, this.size, this.size);
    this.ctx.strokeRect(x, y, this.size, this.size);
  };

  private stayInBounds = (newCoords: Coords): Coords => {
    const adjustedCoords = newCoords.map((coord) => {
      if (coord >= this.bounds) return 0;
      if (coord < 0) return this.bounds - SNAKE_SIZE;
      return coord;
    });
    return adjustedCoords as Coords;
  };

  public isOnSnake = (coords: Coords) =>
    this.snakeBody.some((segment) => areMatchingCoords(segment, coords));

  public getSnakeCoords = () => this.snakeBody;

  public drawSnake = () => {
    this.snakeBody.forEach(this.drawSnakeSegment);
  };

  public grow = () => {
    for (let i = 0; i < GROWTH_RATE; i++) {
      this.snakeBody.push({ ...this.snakeBody[this.snakeBody.length - 1] });
    }
  };

  public moveSnake = ([x, y]: Coords) => {
    const coords: Coords = [this.snakeBody[0][0] + x, this.snakeBody[0][1] + y];

    const adjustedCoords = this.stayInBounds(coords);

    if (this.isOnSnake(adjustedCoords)) this.onSnakeDie();
    this.snakeBody = [adjustedCoords, ...this.snakeBody.slice(0, -1)];
  };
}
