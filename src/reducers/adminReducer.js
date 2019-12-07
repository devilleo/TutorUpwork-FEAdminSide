export const isLogin = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED': {
      return true;
    }
    default:
      return state;
  }
};

export const adminRole = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED': {
      return {
        ...state,
        role: action.role,
      };
    }
    default:
      return state;
  }
};

export const adminToken = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED': {
      return {
        ...state,
        token: action.token,
      };
    }
    default:
      return state;
  }
};
