import { ADMIN_ACTION } from '../actions/adminAction';

// eslint-disable-next-line import/prefer-default-export
export const skillsList = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_SKILLS_LIST': {
      return action.skillsList;
    }
    case ADMIN_ACTION.LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};
