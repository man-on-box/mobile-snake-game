import "./css/index.css";
import { Game } from "./game";

new Game({
  canvasId: "game-board",
  currentScoreClass: "current-score",
  highScoreClass: "high-score",
});
