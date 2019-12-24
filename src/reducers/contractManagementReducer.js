import { ADMIN_ACTION } from '../actions/adminAction';

// eslint-disable-next-line import/prefer-default-export
export const contractsList = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_CONTRACTS_LIST': {
            return action.contractsList;
        }
        case ADMIN_ACTION.LOGOUT: {
            return {};
        }
        default:
            return state;
    }
};

export const messages = (state = [], action) => {
    switch (action.type) {
        case "UPDATE_MESSAGES_CONVERSATION": {
            return Object.values(action.messagesConversation)
        }
        default:
            return state;
    }
}