import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import $ from 'jquery';
import API from '../service/API';

// eslint-disable-next-line import/prefer-default-export
export const addNewAdminRequest = (token, emailF, passwordF, nameF, cb) => dispatch => {
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
        dispatch({ type: 'REGISTER_SUCCEED' });
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

export const loginRequest = (email, password, cb) => dispatch => {
  const data = $.param({ email, password });
  return fetch(API.LOGIN, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        dispatch({ type: 'LOGIN_SUCCEED', token: res.token, role: res.role });
        Swal.fire('Thông báo', 'Thành công', 'success');
      } else {
        Swal.fire('Thông báo', res.message, 'error');
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    })
    .finally(() => {
      cb();
    });
};
