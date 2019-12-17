import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
// import Cookies from 'universal-cookie';
import API from '../service/API';

export const getStudentsListRequest = token => dispatch => {
    return fetch(API.GET_STUDENT_LIST, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                dispatch({ type: 'UPDATE_STUDENTS_LIST', studentsList: { ...res.list } });
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

export const getStudentDetailRequest = (token, id) => dispatch => {
    const trueURL = `${API.GET_STUDENT_DETAIL}?id=${id}`;
    return fetch(trueURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                dispatch({ type: 'UPDATE_STUDENTS_DETAIL', detail: { ...res.detail } });
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

export const removeInfoStudentInDrawer = () => dispatch => {
    dispatch({ type: 'RESET_STUDENT_DETAIL_STATE' })
}

export const getContractsRequest = (token, idContractsList) => dispatch => {
    // convert list into params
    let params = ''
    for (let i = 0; i < idContractsList.length; i += 1) {
        params = `${params}list=${idContractsList[i]}`;
        if (i !== idContractsList.length - 1)
            params += '&';
    }
    const trueURL = `${API.GET_CONTRACTS}?${params}`;
    return fetch(trueURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            secret_token: token,
        },
    })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                dispatch({ type: 'UPDATE_STUDENT_CONTRACTS', list: { ...res.list } });
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
}

export const removeContractsInDrawer = () => dispatch => {
    dispatch({ type: 'RESET_STUDENT_CONTRACTS_LIST_STATE' })
}