import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
// import Cookies from 'universal-cookie';
import API from '../service/API';

// import { ADMIN_ACTION } from './adminAction';

// const cookies = new Cookies();

// eslint-disable-next-line import/prefer-default-export
export const getSkillsListRequest = token => dispatch => {
  return fetch(API.GET_SKILL_LIST, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
  })
    .then(response => response.json())
    .then(res => {
      if (res.status === 'success') {
        dispatch({ type: 'UPDATE_SKILLS_LIST', skillsList: { ...res.list } });
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
    .finally(() => {});
};

export const removeSkillRequest = (token, id, cb) => () => {
  const trueURL = `${API.REMOVE_SKILL}?id=${id}`;
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

export const changeInfoSkillRequest = (token, id, newName, cb) => () => {
  return fetch(API.UPDATE_SKILL_INFO, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `id=${id}&name=${newName}`,
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

export const addNewSkillRequest = (token, name, cb) => () => {
  return fetch(API.REGISTER_SKILL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      secret_token: token,
    },
    body: `name=${name}`,
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
