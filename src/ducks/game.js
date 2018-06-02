export const GAME_TICK = 'GAME_TICK';

const initialState = {
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const gameTick = (newDirection) => {
  return {
    type: GAME_TICK,
  };
}
