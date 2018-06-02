import update from 'immutability-helper';
import last from 'lodash/last';
import { INIT_SNAKE_BODY, DIRECTIONS } from 'config';
import { GAME_TICK } from './game';

const UPDATE_DIRECTION = 'UPDATE_DIRECTION';

const initialState = {
  alive: true,
  direction: DIRECTIONS.RIGHT,
  body: INIT_SNAKE_BODY,
};

const findNewBodyChunk = (snakeState) => {
  const { body, direction } = snakeState;
  const snakeHead = last(body);
  switch (direction) {
    case DIRECTIONS.RIGHT:
      return [snakeHead[0] + 1, snakeHead[1]];
    default:
      return snakeHead;
  }
}

const nextSnakeStep = (snakeState) => {
  const { alive } = snakeState;
  if (!alive) return snakeState;
  const newBodyChunk = findNewBodyChunk(snakeState);
  return update(snakeState, {
    body: {
      $push: [newBodyChunk],
    },
  });
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GAME_TICK:
      return nextSnakeStep(state);
    case UPDATE_DIRECTION:
      return update(state, {
        direction: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
}

export const updateDirecton = (newDirection) => {
  return {
    type: UPDATE_DIRECTION,
    payload: newDirection,
  };
}
