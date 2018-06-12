import { createSelector } from 'reselect';
import { cellUpdater } from 'lib/utils';

import { EMPTY_BOARD } from 'config';

export const boardSelector = (state) => state.board;

export const snakeSelector = (state) => state.snake;

export const tickSpeedSelector = (state) => state.game.tickSpeed;

export const isRunningSelector = (state) => state.game.isRunning;

export const foodSelector = (state) => state.game.food;

export const scoreSelector = (state) => state.game.score;

export const boardSpaceSelector = createSelector(
  snakeSelector,
  foodSelector,
  (snake, food) => {
    const boardWithSnake = snake.body
      .map((xy) => [...xy, snake.alive ? 'S' : 'D'])
      .reduce(cellUpdater, EMPTY_BOARD);
    return food
      .map((xy) => [...xy, 'F'])
      .reduce(cellUpdater, boardWithSnake);
  }
);
