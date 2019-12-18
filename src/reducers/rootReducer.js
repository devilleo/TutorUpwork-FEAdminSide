import { combineReducers } from 'redux';
import * as adminManagementReducer from './adminManagementReducer';
import * as tutorManagementReducer from './tutorManagementReducer';
import * as studentManagementReducer from './studentManagementReducer';
import * as adminReducer from './adminReducer';
import * as skillManagementReducer from './skillManagementReducer';
import * as contractManagementReducer from './contractManagementReducer';

const rootReducer = combineReducers({
  ...adminReducer,
  ...adminManagementReducer,
  ...tutorManagementReducer,
  ...studentManagementReducer,
  ...skillManagementReducer,
  ...contractManagementReducer,
});

export default rootReducer;
