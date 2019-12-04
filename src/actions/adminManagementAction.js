import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../service/API';

// eslint-disable-next-line import/prefer-default-export
export const addNewAdminRequest = (email, password, role, name, cb) => dispatch => {
  return fetch(API.REGISTER, {
    method: 'POST',
    body: JSON.stringify({ email, password, role, name }),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'OK') {
        dispatch({ type: 'REGISTER_SUCCEED' });
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
