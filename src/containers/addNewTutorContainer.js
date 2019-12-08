import { connect } from 'react-redux';
import tutorManagement from '../components/homepage/tutorManagement/Modal_AddNewTutor';
import { addNewTutorRequest } from '../actions/tutorManagementAction';

const mapStateToProps = state => {
  return {
    isAddNewTutorsSucceed: state.isAddNewTutorsSucceed,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    addNewTutor: (token, email, password, name, cb) =>
      run(addNewTutorRequest(token, email, password, name, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(tutorManagement);
