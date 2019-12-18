import { createStore, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';

// Local Storage
import { loadState, saveState, removeState } from './local_storage';

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
const cookies = new Cookies();

store.subscribe(
  throttle(() => {
    if (store.getState().isLogin === false) {
      cookies.remove('token');
      removeState();
    } else {
      // store necessary reducer in local storage
      saveState({
        adminRole: store.getState().adminRole,
        isLogin: store.getState().isLogin,
        adminsList: store.getState().adminsList,
        skillsList: store.getState().skillsList,
        tutorsList: store.getState().tutorsList,
        studentsList: store.getState().studentsList,
        contractsList: store.getState().contractsList,
        tutorContracts: store.getState().tutorContracts
      });
    }
  }, 1000),
);

export default store;
