import { Coords } from "types";
import { BOARD_SIZE, DEFAULT_SIZE } from "../constants";

export const getRandomCoord = () =>
  Math.round(
    Math.floor((Math.random() * BOARD_SIZE) / DEFAULT_SIZE) * DEFAULT_SIZE
  );

export const getRandomCoords = (): Coords => {
  return [getRandomCoord(), getRandomCoord()];
};
