import { connect } from 'react-redux';
import TutorManagement from '../components/homepage/tutorManagement/index';
import { getTutorsListRequest, getTutorDetailRequest } from '../actions/tutorManagementAction';
import { blockUserRequest, unblockUseRequest } from '../actions/userManagementAction';

const mapStateToProps = state => {
  return {
    adminRole: state.adminRole,
    tutorsList: state.tutorsList,
    tutorDetail: state.tutorDetail,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    getTutorsList: token => run(getTutorsListRequest(token)),
    blockUser: (token, email, cb) => run(blockUserRequest(token, email, cb)),
    unblockUser: (token, email, cb) => run(unblockUseRequest(token, email, cb)),
    getTutorDetail: (token, id) => run(getTutorDetailRequest(token, id)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorManagement);
