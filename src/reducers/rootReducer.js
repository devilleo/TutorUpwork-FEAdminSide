import { combineReducers } from 'redux';
import * as adminManagementReducer from './adminManagementReducer';

const rootReducer = combineReducers({
  ...adminManagementReducer,
});

export default rootReducer;
