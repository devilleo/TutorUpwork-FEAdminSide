export const isAddNewAdminSucceed = (state = false, action) => {
  switch (action.type) {
    case 'ADD_NEW_ADMIN_SUCCEED': {
      return true;
    }
    default:
      return state;
  }
};

// the following reducer just to fix eslint
export const hihi = (state = false, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
