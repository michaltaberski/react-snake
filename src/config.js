import times from 'lodash/times';

export const BOARD_SIZE = 120;

export const EMPTY_BOARD = times(BOARD_SIZE, () => (
  times(BOARD_SIZE, () => null)
));

export const INIT_SNAKE_BODY = [
  [5, 5],
  [6, 5],
  [7, 5],
];

const TOP = 'direction/TOP';
const RIGHT = 'direction/RIGHT';
const BOTTOM = 'direction/BOTTOM';
const LEFT = 'direction/LEFT';

export const DIRECTIONS = { TOP, RIGHT, BOTTOM, LEFT };
