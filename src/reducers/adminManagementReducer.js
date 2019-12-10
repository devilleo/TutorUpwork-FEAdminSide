import { ADMIN_ACTION } from '../actions/adminAction';

// eslint-disable-next-line import/prefer-default-export
export const adminsList = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ADMINS_LIST': {
      return action.adminsList;
    }
    case ADMIN_ACTION.LOGOUT: {
      return {};
    }
    case 'CHANGE_INFO_SUCCESS': {
      const stateClone = { ...state };
      const keys = Object.keys(stateClone);
      const values = Object.values(stateClone);
      for (let i = 0; i < keys.length; i += 1) {
        // eslint-disable-next-line no-underscore-dangle
        if (values[i]._id === action.id) {
          values[i].email = action.email;
          values[i].name = action.name;
          break;
        }
      }
      return stateClone;
    }
    case 'REMOVE_ADMIN_SUCCESS': {
      const stateClone = { ...state };
      const keys = Object.keys(stateClone);
      const values = Object.values(stateClone);
      for (let i = 0; i < keys.length; i += 1) {
        // eslint-disable-next-line no-underscore-dangle
        if (values[i]._id === action.id) {
          delete stateClone[i];
          break;
        }
      }
      return stateClone;
    }
    default:
      return state;
  }
};
