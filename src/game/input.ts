import { Coords } from "types";
import { DEFAULT_SIZE } from "../constants";

export class Input {
  private inputDirection: Coords;
  constructor() {
    this.inputDirection = [0, -DEFAULT_SIZE];
    this.setEventListeners();
  }

  public getInputDirection = (): Coords => {
    return this.inputDirection;
  };

  private goUp = () => (this.inputDirection = [0, -DEFAULT_SIZE]);
  private isGoingUp = () => this.inputDirection[1] === -DEFAULT_SIZE;

  private goDown = () => (this.inputDirection = [0, DEFAULT_SIZE]);
  private isGoingDown = () => this.inputDirection[1] === DEFAULT_SIZE;

  private goLeft = () => (this.inputDirection = [-DEFAULT_SIZE, 0]);
  private isGoingLeft = () => this.inputDirection[0] === -DEFAULT_SIZE;

  private goRight = () => (this.inputDirection = [DEFAULT_SIZE, 0]);
  private isGoingRight = () => this.inputDirection[0] === DEFAULT_SIZE;

  private setEventListeners = () => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
          if (this.isGoingDown()) break;
          this.goUp();
          break;
        case "ArrowDown":
        case "s":
          if (this.isGoingUp()) break;
          this.goDown();
          break;
        case "ArrowLeft":
        case "a":
          if (this.isGoingRight()) break;
          this.goLeft();
          break;
        case "ArrowRight":
        case "d":
          if (this.isGoingLeft()) break;
          this.goRight();
          break;
      }
    });
  };
}

// const inputDirection: Coords = [0, 0];
