import { combineReducers } from 'redux';
import * as adminManagementReducer from './adminManagementReducer';
import * as tutorManagementReducer from './tutorManagementReducer';
import * as adminReducer from './adminReducer';

const rootReducer = combineReducers({
  ...adminReducer,
  ...adminManagementReducer,
  ...tutorManagementReducer,
});

export default rootReducer;
