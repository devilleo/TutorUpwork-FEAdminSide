import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';

// Cookies
import Cookies from 'universal-cookie';

// Local Storage
import { loadState, saveState } from './local_storage';

// Reducer
import rootReducer from '../reducers/rootReducer';

const middlewares = [thunk];

export function configureStore(initialState) {
  const createdStore = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  return createdStore;
}

const store = configureStore(loadState());
const cookies = new Cookies();

store.subscribe(
  throttle(() => {
    // store necessary reducer in local storage
    saveState({
      role: store.getState().adminInfo.role,
    });

    // store token in cookie
    cookies.set('token', store.getState().adminInfo.token, { path: '/' });
  }, 1000),
);

export default store;
