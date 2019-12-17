import { ADMIN_ACTION } from '../actions/adminAction';

export const studentsList = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_STUDENTS_LIST': {
            return action.studentsList;
        }
        case ADMIN_ACTION.LOGOUT: {
            return {};
        }
        default:
            return state;
    }
};

export const studentDetail = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_STUDENTS_DETAIL': {
            return action.detail;
        }
        case 'RESET_STUDENT_DETAIL_STATE':
        case ADMIN_ACTION.LOGOUT: {
            return {};
        }
        default:
            return state;
    }
};

export const studentContracts = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_STUDENT_CONTRACTS': {
            return action.list
        }
        case 'RESET_STUDENT_CONTRACTS_LIST_STATE': {
            return {}
        }
        default:
            return state;
    }
}