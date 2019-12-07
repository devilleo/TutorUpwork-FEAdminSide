import { connect } from 'react-redux';
import adminManagement from '../components/homepage/adminManagement/Modal_AddNewAdmin';
import { addNewTutorRequest } from '../actions/tutorManagementAction';

const mapStateToProps = state => {
  return {
    isAddNewTutorsSucceed: state.isAddNewTutorsSucceed,
    adminInfo: state.adminInfo,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    addNewTutor: (token, email, password, name, cb) =>
      run(addNewTutorRequest(token, email, password, name, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(adminManagement);
