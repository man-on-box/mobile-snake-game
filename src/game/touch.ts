const TOUCH_THRESHOLD = 40;
const ALLOWED_TIME = 300;
const PERPENDICULAR_RESTRAINT = 100;

export type SwipedDirection = "up" | "right" | "down" | "left" | null;

export class Touch {
  private swipedDirection: SwipedDirection = null;
  private startX = 0;
  private startY = 0;
  private distanceX = 0;
  private distanceY = 0;
  private allowedTime = ALLOWED_TIME;
  private threshold = TOUCH_THRESHOLD;
  private restraint = PERPENDICULAR_RESTRAINT;
  private elapsedTime = 0;
  private startTime = 0;
  private touchSurface: HTMLElement;

  constructor(
    element: HTMLElement,
    public handleSwipe: (swipe: SwipedDirection) => void
  ) {
    this.touchSurface = element;
    this.addEventListeners();
  }

  private addEventListeners = () => {
    this.touchSurface.addEventListener("touchstart", (e) => {
      const { pageX, pageY } = e.changedTouches[0];
      this.swipedDirection = null;
      this.distanceX = 0;
      this.distanceY = 0;
      this.startX = pageX;
      this.startY = pageY;
      this.startTime = Date.now();
      e.preventDefault();
    });

    this.touchSurface.addEventListener("touchmove", (e) => {
      e.preventDefault();
    });

    this.touchSurface.addEventListener("touchend", (e) => {
      const { pageX, pageY } = e.changedTouches[0];
      this.distanceX = pageX - this.startX;
      this.distanceY = pageY - this.startY;
      this.elapsedTime = Date.now() - this.startTime;
      e.preventDefault();

      if (this.elapsedTime > this.allowedTime) return;

      if (this.isHorizontalSwipe()) {
        this.swipedDirection = this.distanceX < 0 ? "left" : "right";
      }
      if (this.isVerticleSwipe()) {
        this.swipedDirection = this.distanceY < 0 ? "up" : "down";
      }
      if (this.swipedDirection) this.handleSwipe(this.swipedDirection);
    });
  };

  private isHorizontalSwipe = () =>
    Math.abs(this.distanceX) >= this.threshold &&
    Math.abs(this.distanceY) <= this.restraint;

  private isVerticleSwipe = () =>
    Math.abs(this.distanceY) >= this.threshold &&
    Math.abs(this.distanceX) <= this.restraint;
}
