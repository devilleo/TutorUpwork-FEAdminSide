import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

// Local Storage
import { loadState, saveState } from './local_storage';

// Reducer
import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk];

export const configureStore = initialState => {
  const createdStore = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  return createdStore;
};

const store = configureStore(loadState());

store.subscribe(
  throttle(() => {
    // store necessary reducer in local storage
    saveState({
      adminRole: store.getState().adminRole,
      isLogin: store.getState().isLogin,
    });
  }, 1000),
);

export default store;
