import update from 'immutability-helper';

export const cellUpdater = (board, [x, y, value]) => (
  update(board, {
    [x]: {
      [y]: {
        $set: value,
      },
    },
  })
);
