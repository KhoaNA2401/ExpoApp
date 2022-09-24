import { story } from './dishes';
import { comments } from './comments';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { favorites } from './favorites';

export const ConfigureStore = () => {
    const store = createStore(
      combineReducers({ story, comments, favorites }),
      applyMiddleware(thunk, logger)
    );
    return store;
  };