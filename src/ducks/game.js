import update from 'immutability-helper';
import random from 'lodash/random';
import {
  tickSpeedSelector,
  isRunningSelector,
  snakeSelector,
  foodSelector,
} from 'selectors';
import {
  findFood,
  findNextHeadPosition,
} from 'lib/utils';

import { eat, EAT } from './snake';
import { BOARD_SIZE } from 'config';

export const GAME_TICK = 'GAME_TICK';
export const GAME_TICK_CALLBACK = 'GAME_TICK_CALLBACK';
export const GAME_RUN = 'GAME_RUN';

const rand = () => random(0, BOARD_SIZE - 1);

const initialState = {
  tickSpeed: 150,
  isRunning: false,
  food: [
    [rand(), rand()],
    [rand(), rand()],
    [rand(), rand()],
  ],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EAT:
      const food = state.food.filter((food) => (
        !(food[0] === action.payload[0] && food[1] === action.payload[1])
      ));

      food.push([rand(), rand()]);
      return update(state, {
        food: {
          $set: food,
        },
      });
    case GAME_RUN:
      return update(state, {
        isRunning: {
          $set: action.payload,
        },
      });
    default:
      return state;
  }
}

export const startGame = () => {
  return (dispatch) => {
    dispatch({type: GAME_RUN, payload: true});
    dispatch(gameTick());
  }
}

export const stopGame = () => {
  return (dispatch) => {
    dispatch({type: GAME_RUN, payload: false});
  }
}

export const gameTick = () => {
  return (dispatch, getState) => {
    const state = getState();
    const tickSpeed = tickSpeedSelector(state);
    const isRunning = isRunningSelector(state);
    const snakeState = snakeSelector(state)
    const isSnakeAlive = snakeState.alive;

    if (!isRunning || !isSnakeAlive) return;
    const snakeHead = findNextHeadPosition(snakeState);
    const food = findFood(foodSelector(state), snakeHead);
    if (food) dispatch(eat(food));

    dispatch({type: GAME_TICK});
    setTimeout(() => {
      dispatch({type: GAME_TICK_CALLBACK});
      setTimeout(() => {
        dispatch(gameTick());
      }, tickSpeed / 2);
    }, tickSpeed / 2);
  };
}
