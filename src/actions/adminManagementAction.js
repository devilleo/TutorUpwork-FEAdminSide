import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
// import Cookies from 'universal-cookie';
import API from '../service/API';

// import { ADMIN_ACTION } from './adminAction';

// const cookies = new Cookies();

export const getAdminsListRequest = token => dispatch => {
  return fetch(API.GET_ADMIN_LIST, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        dispatch({ type: 'UPDATE_ADMINS_LIST', adminsList: { ...res.list } });
      } else {
        // Swal.fire('Thông báo', res.message, 'error');
        // if (res.message === 'Unauthorized') {
        //   cookies.remove('state');
        //   dispatch({ type: ADMIN_ACTION.LOGOUT });
        // }
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => { });
};

export const addNewAdminRequest = (token, emailF, passwordF, nameF, cb) => () => {
  return fetch(API.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `email=${emailF}&password=${passwordF}&name=${nameF}`,
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        Swal.fire('Thông báo', 'Thành công', 'success');
      } else {
        Swal.fire('Thông báo', res.message, 'error');
        // if (res.message === 'Unauthorized') {
        //   cookies.remove('state');
        //   dispatch({ type: ADMIN_ACTION.LOGOUT });
        // }
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => {
      cb();
    });
};

export const removeAdminRequest = (token, id, cb) => dispatch => {
  const trueURL = `${API.REMOVE_ADMIN}?id=${id}`;
  return fetch(trueURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        dispatch({ type: 'REMOVE_ADMIN_SUCCESS', id });
        Swal.fire('Thông báo', 'Thành công', 'success');
      } else {
        Swal.fire('Thông báo', res.message, 'error');
        // if (res.message === 'Unauthorized') {
        //   cookies.remove('state');
        //   dispatch({ type: ADMIN_ACTION.LOGOUT });
        // }
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => {
      cb();
    });
};

export const changePasswordAdminRequest = (token, id, newPassword, cb) => () => {
  return fetch(API.CHANGE_PASSWORD, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `id=${id}&password=${newPassword}`,
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        Swal.fire('Thông báo', 'Thành công', 'success');
      } else {
        Swal.fire('Thông báo', res.message, 'error');
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => {
      cb();
    });
};

export const changeInfoAdminRequest = (token, id, newEmail, newName, cb) => () => {
  return fetch(API.UPDATE_INFO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `id=${id}&email=${newEmail}&name=${newName}`,
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        Swal.fire('Thông báo', 'Thành công', 'success');
      } else {
        Swal.fire('Thông báo', res.message, 'error');
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => {
      cb();
    });
};
