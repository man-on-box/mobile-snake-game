import { Touch, SwipedDirection } from "./touch";
import { Coords } from "types";
import { DEFAULT_SIZE } from "../constants";

export class Input {
  private inputDirection: Coords;
  private changingDirection: boolean;

  constructor(element: HTMLElement) {
    this.inputDirection = [0, -DEFAULT_SIZE];
    this.setEventListeners();
    this.changingDirection = false;
    new Touch(element, this.handleSwipe);
  }

  public getInputDirection = (): Coords => {
    this.changingDirection = false;
    return this.inputDirection;
  };

  private changeDirection = (direction: Coords) => {
    if (this.changingDirection) return;

    this.inputDirection = direction;
    this.changingDirection = true;
  };

  private goUp = () => {
    if (this.isGoingDown()) return;
    this.changeDirection([0, -DEFAULT_SIZE]);
  };
  private goDown = () => {
    if (this.isGoingUp()) return;
    this.changeDirection([0, DEFAULT_SIZE]);
  };
  private goLeft = () => {
    if (this.isGoingRight()) return;
    this.changeDirection([-DEFAULT_SIZE, 0]);
  };
  private goRight = () => {
    if (this.isGoingLeft()) return;
    this.changeDirection([DEFAULT_SIZE, 0]);
  };
  private isGoingUp = () => this.inputDirection[1] === -DEFAULT_SIZE;
  private isGoingDown = () => this.inputDirection[1] === DEFAULT_SIZE;
  private isGoingLeft = () => this.inputDirection[0] === -DEFAULT_SIZE;
  private isGoingRight = () => this.inputDirection[0] === DEFAULT_SIZE;

  private handleSwipe = (direction: SwipedDirection) => {
    switch (direction) {
      case "up":
        this.goUp();
        break;
      case "down":
        this.goDown();
        break;
      case "left":
        this.goLeft();
        break;
      case "right":
        this.goRight();
        break;
    }
  };

  private setEventListeners = () => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          this.goUp();
          break;
        case "ArrowDown":
        case "s":
          this.goDown();
          break;
        case "ArrowLeft":
        case "a":
          this.goLeft();
          break;
        case "ArrowRight":
        case "d":
          this.goRight();
          break;
      }
    });
  };
}
