import update from 'immutability-helper';
import { INIT_SNAKE_BODY, DIRECTIONS } from 'config';
import { GAME_TICK, GAME_TICK_CALLBACK } from './game';
import { getNextSnakeStep, removeTail, getUpdatedDirection, snakeEats } from 'lib/utils';

const UPDATE_DIRECTION = 'UPDATE_DIRECTION';
export const EAT = 'EAT';

const initialState = {
  alive: true,
  direction: DIRECTIONS.RIGHT,
  body: INIT_SNAKE_BODY,
  grow: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EAT:
      return snakeEats(state, action.payload);
    case GAME_TICK:
      return getNextSnakeStep(state);
    case GAME_TICK_CALLBACK:
      return removeTail(state);
    case UPDATE_DIRECTION:
      return getUpdatedDirection(state, action.payload);
    default:
      return state;
  }
}

export const eat = (food) => {
  return {
    type: EAT,
    payload: food,
  };
}

export const updateDirection = (newDirection) => {
  return {
    type: UPDATE_DIRECTION,
    payload: newDirection,
  };
}
