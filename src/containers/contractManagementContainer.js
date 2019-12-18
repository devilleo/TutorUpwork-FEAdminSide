import { connect } from 'react-redux';
import ContractManagement from '../components/homepage/contractManagement/index';
import {
    getContractsListRequest,
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
    };
    return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractManagement);
