import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import API from '../service/API';

import { ADMIN_ACTION } from './adminAction';

const cookies = new Cookies();

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
        Swal.fire('Thông báo', res.message, 'error');
        if (res.message === 'Unauthorized') {
          cookies.remove('state');
          dispatch({ type: ADMIN_ACTION.LOGOUT });
        }
      }
    })
    .catch(() => {
      Swal.fire('Thông báo', 'Lỗi', 'error');
    })
    .finally(() => {});
};

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
