import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import API from '../service/API';

// CONST TYPE
export const ADMIN_ACTION = {
  LOGIN_SUCCEED: 'LOGIN_SUCCEED',
  LOGOUT: 'ADMIN_LOGOUT',
};
const cookies = new Cookies();

export const logoutRequest = () => dispatch => {
  dispatch({ type: ADMIN_ACTION.LOGOUT });
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
        // store token in cookie
        cookies.set('token', res.token, { path: '/' });

        // eslint-disable-next-line max-len
        const setRole =
          res.role === undefined || res.role === false || res.role === '' ? '' : res.role;
        dispatch({ type: ADMIN_ACTION.LOGIN_SUCCEED, token: res.token, role: setRole });

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
