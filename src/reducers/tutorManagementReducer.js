import { ADMIN_ACTION } from '../actions/adminAction';

export const tutorsList = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TUTORS_LIST': {
      return action.tutorsList;
    }
    case ADMIN_ACTION.LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const tutorDetail = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TUTORS_DETAIL': {
      return action.detail;
    }
    case 'RESET_TUTOR_DETAIL_STATE':
    case ADMIN_ACTION.LOGOUT: {
      return {};
    }
    default:
      return state;
  }
};

export const tutorContracts = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_TUTOR_CONTRACTS': {
      return action.list
    }
    case 'RESET_CONTRACTS_LIST_STATE': {
      return {}
    }
    default:
      return state;
  }
}