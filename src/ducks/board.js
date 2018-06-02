import times from 'lodash/times';
import { cellUpdater } from 'lib/utils';

import { BOARD_SIZE, INIT_SNAKE_BODY } from 'config';

const LOAD_SNAKE = 'LOAD_SNAKE';

const initialState = (
  times(BOARD_SIZE, () => (
    times(BOARD_SIZE, () => null)
  ))
);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // case LOAD_SNAKE:
    //   return INIT_SNAKE_BODY
    //     .map(xy => [...xy, 'S'])
    //     .reduce(cellUpdater, state);
    default:
      return state;
  }
}

export const loadSnake = () => {
  return {
    type: LOAD_SNAKE,
  };
}
