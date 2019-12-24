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

export const getMessagesConversationRequest = (token, id1, id2, cb) => () => {
    return fetch(API.GET_MESSAGES_CONVERSATION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
        body: `id1=${id1}&id2=${id2}`,
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                cb({ ...res.detail.messages })
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

export const changeInfoContractRequest = (token, id, newStatus, cb) => () => {
    return fetch(API.UPDATE_CONTRACT_INFO, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
        body: `id=${id}&status=${newStatus}`,
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