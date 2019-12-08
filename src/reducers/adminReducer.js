import { ADMIN_ACTION } from '../actions/adminAction';

export const isLogin = (state = false, action) => {
  switch (action.type) {
    case ADMIN_ACTION.LOGIN_SUCCEED: {
      return true;
    }
    case ADMIN_ACTION.LOGOUT: {
      return false;
    }
    default:
      return state;
  }
};

export const adminRole = (state = '', action) => {
  switch (action.type) {
    case ADMIN_ACTION.LOGIN_SUCCEED: {
      return {
        ...state,
        role: action.role,
      };
    }
    case ADMIN_ACTION.LOGOUT: {
      return '';
    }
    default:
      return state;
  }
};

export const adminToken = (state = '', action) => {
  switch (action.type) {
    case ADMIN_ACTION.LOGIN_SUCCEED: {
      return {
        ...state,
        token: action.token,
      };
    }
    case ADMIN_ACTION.LOGOUT: {
      return '';
    }
    default:
      return state;
  }
};
