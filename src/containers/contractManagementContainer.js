import { connect } from 'react-redux';
import ContractManagement from '../components/homepage/contractManagement/index';
import {
    getContractsListRequest,
    getMessagesConversationRequest,
    changeInfoContractRequest
} from '../actions/contractManagementAction';

const mapStateToProps = state => {
    return {
        adminRole: state.adminRole,
        contractsList: state.contractsList,
    };
};

const mapDispatchToProps = run => {
    const actions = {
        getContractsList: token => run(getContractsListRequest(token)),
        getMessagesConversation: (token, id1, id2, cb) =>
            run(getMessagesConversationRequest(token, id1, id2, cb)),
        changeInfoContract: (token, id, newStatus, cb) =>
            run(changeInfoContractRequest(token, id, newStatus, cb)),
    };
    return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement);
