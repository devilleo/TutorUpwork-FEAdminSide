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
    default:
      return state;
  }
};
