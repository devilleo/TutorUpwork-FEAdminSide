import { connect } from 'react-redux';
import StudentManagement from '../components/homepage/studentManagement/index';
import {
    getStudentsListRequest,
    getStudentDetailRequest,
    removeInfoStudentInDrawer,
    getContractsRequest,
    removeContractsInDrawer
} from '../actions/studentManagementAction';
import { blockUserRequest, unblockUseRequest } from '../actions/userManagementAction';

const mapStateToProps = state => {
    return {
        adminRole: state.adminRole,
        studentsList: state.studentsList,
        studentDetail: state.studentDetail,
        studentContracts: state.studentContracts,
    };
};

const mapDispatchToProps = run => {
    const actions = {
        getStudentsList: token => run(getStudentsListRequest(token)),
        blockUser: (token, id, cb) => run(blockUserRequest(token, id, cb)),
        unblockUser: (token, id, cb) => run(unblockUseRequest(token, id, cb)),
        getStudentDetail: (token, id) => run(getStudentDetailRequest(token, id)),
        removeInfoStudentInDrawer: () => run(removeInfoStudentInDrawer()),
        getContracts: (token, idContractsList) => run(getContractsRequest(token, idContractsList)),
        removeContractsInDrawer: () => run(removeContractsInDrawer()),
    };
    return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentManagement);
