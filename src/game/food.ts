import { Coords } from "types";
import { getRandomCoords } from "../utils";
import { FOOD_FILL_COLOR, FOOD_STROKE_COLOR, FOOD_SIZE } from "../constants";

export class Food {
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private foodCoords: Coords;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.foodCoords = [0, 0];
    this.size = FOOD_SIZE;
    this.createFood();
  }

  private createFood = () => (this.foodCoords = getRandomCoords());

  public getFoodCoords = () => this.foodCoords;

  public drawFood = () => {
    this.drawFoodPoint(this.getFoodCoords());
  };

  private drawFoodPoint = ([x, y]: Coords) => {
    this.ctx.fillStyle = FOOD_FILL_COLOR;
    this.ctx.strokeStyle = FOOD_STROKE_COLOR;
    this.ctx.fillRect(x, y, this.size, this.size);
    this.ctx.strokeRect(x, y, this.size, this.size);
  };
}
