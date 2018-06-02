import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// DUCKS
import board from 'ducks/board';
import snake from 'ducks/snake';

const rootReducer = combineReducers({
  board,
  snake,
});

const configureStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(logger, thunk),
  );

  return store;
};

export default configureStore;
