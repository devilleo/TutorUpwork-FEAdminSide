import { connect } from 'react-redux';
import TutorManagement from '../components/homepage/tutorManagement/index';
import {
  getTutorsListRequest,
  getTutorDetailRequest,
  removeInfoInDrawer,
  getContractsRequest,
  removeContractsInDrawer
} from '../actions/tutorManagementAction';
import { blockUserRequest, unblockUseRequest } from '../actions/userManagementAction';

const mapStateToProps = state => {
  return {
    adminRole: state.adminRole,
    tutorsList: state.tutorsList,
    tutorDetail: state.tutorDetail,
    tutorContracts: state.tutorContracts,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    getTutorsList: token => run(getTutorsListRequest(token)),
    blockUser: (token, id, cb) => run(blockUserRequest(token, id, cb)),
    unblockUser: (token, id, cb) => run(unblockUseRequest(token, id, cb)),
    getTutorDetail: (token, id) => run(getTutorDetailRequest(token, id)),
    removeInfoInDrawer: () => run(removeInfoInDrawer()),
    getContracts: (token, idContractsList) => run(getContractsRequest(token, idContractsList)),
    removeContractsInDrawer: () => run(removeContractsInDrawer()),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorManagement);
