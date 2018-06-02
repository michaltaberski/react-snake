import update from 'immutability-helper';
import last from 'lodash/last';
import { DIRECTIONS, BOARD_SIZE } from 'config';

const HORIZONTAL_DIRECTIONS = [DIRECTIONS.LEFT, DIRECTIONS.RIGHT];
const VERTICAL_DIRECTIONS = [DIRECTIONS.TOP, DIRECTIONS.BOTTOM];

export const cellUpdater = (board, [x, y, value]) => (
  update(board, {
    [x]: {
      [y]: {
        $set: value,
      },
    },
  })
);

export const findNextHeadPosition = (snakeState) => {
  const { body, direction } = snakeState;
  const snakeHead = last(body);
  switch (direction) {
    case DIRECTIONS.TOP:
      return [snakeHead[0], snakeHead[1] - 1];
    case DIRECTIONS.RIGHT:
      return [snakeHead[0] + 1, snakeHead[1]];
    case DIRECTIONS.BOTTOM:
      return [snakeHead[0], snakeHead[1] + 1];
    case DIRECTIONS.LEFT:
      return [snakeHead[0] - 1, snakeHead[1]];
    default:
      return snakeHead;
  }
}

const validateNewBodyChunk = (snakeState, newBodyChunk) => {
  const [x, y] = newBodyChunk;
  if (x >= BOARD_SIZE || x < 0) return false;
  if (y >= BOARD_SIZE || y < 0) return false;
  if (snakeState.body.find((body) => (
    body[0] === newBodyChunk[0] &&
    body[1] === newBodyChunk[1]
  ))) return false;
  return true;
}

export const getNextSnakeStep = (snakeState) => {
  const { alive } = snakeState;
  if (!alive) return snakeState;
  const newBodyChunk = findNextHeadPosition(snakeState);
  const isValidNextStep = validateNewBodyChunk(snakeState, newBodyChunk);

  if (!isValidNextStep) {
    return update(snakeState, {
      alive: {
        $set: false,
      },
    });
  }

  return update(snakeState, {
    body: {
      $push: [newBodyChunk],
    },
  });
}

export const removeTail = (snakeState) => {
  const { alive, grow } = snakeState;
  if (!alive) return snakeState;
  if (grow > 0) return update(snakeState, { grow: { $set: grow - 1 } });
  return update(snakeState, { body: { $splice: [[0, 1]] } });
}

export const getUpdatedDirection = (snakeState, newDirection) => {
  const { direction } = snakeState;
  if (
    HORIZONTAL_DIRECTIONS.includes(direction) &&
    HORIZONTAL_DIRECTIONS.includes(newDirection)
  ) return snakeState;
  if (
    VERTICAL_DIRECTIONS.includes(direction) &&
    VERTICAL_DIRECTIONS.includes(newDirection)
  ) return snakeState;
  return update(snakeState, {
    direction: {
      $set: newDirection,
    },
  });
}

export const findFood = (allFood, snakeHead) => (
  allFood.find((food) => (
    food[0] === snakeHead[0] &&
    food[1] === snakeHead[1]
  ))
);

export const snakeEats = (snakeState, food) => {
  return update(snakeState, {
    grow: {
      $set: snakeState.grow + 2,
    },
  });
}
