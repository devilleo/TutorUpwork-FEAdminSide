import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../service/API';

// eslint-disable-next-line import/prefer-default-export
export const getContractsListRequest = token => dispatch => {
    return fetch(API.GET_CONTRACT_LIST, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                dispatch({ type: 'UPDATE_CONTRACTS_LIST', contractsList: { ...res.list } });
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
