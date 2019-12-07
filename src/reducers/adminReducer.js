export const adminInfo = (state = { token: '', role: '' }, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED': {
      return {
        ...state,
        token: action.token,
        role: action.role,
      };
    }
    default:
      return state;
  }
};

// the following reducer just to fix eslint
export const trashReducerrrr = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
