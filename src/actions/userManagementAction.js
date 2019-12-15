import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
// import Cookies from 'universal-cookie';
import API from '../service/API';

export const blockUserRequest = (token, id, cb) => () => {
  return fetch(API.BLOCK_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `id=${id}`,
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        Swal.fire('Thông báo', 'Đã chặn', 'success');
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

export const unblockUseRequest = (token, id, cb) => () => {
  return fetch(API.UNBLOCK_USER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `id=${id}`,
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        Swal.fire('Thông báo', 'Đã bỏ chặn', 'success');
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
