// đăng ký thành công hay chưa ?
// eslint-disable-next-line import/prefer-default-export
export const isAddNewAdminSucceed = (state = false, action) => {
  switch (action.type) {
    case 'ADD_NEW_ADMIN_SUCCEED': {
      return true;
    }
    default:
      return state;
  }
};

export const isLogin = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCEED': {
      return true;
    }
    default:
      return state;
  }
};

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
