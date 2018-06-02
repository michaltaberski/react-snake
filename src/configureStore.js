import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// DUCKS
import snake from 'ducks/snake';
import game from 'ducks/game';

const rootReducer = combineReducers({
  snake,
  game,
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk),
  );

  return store;
};

export default configureStore;
