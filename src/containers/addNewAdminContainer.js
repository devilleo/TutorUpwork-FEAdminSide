import { connect } from 'react-redux';
import adminManagement from '../components/homepage/adminManagement/Modal_AddNewAdmin';
import { addNewAdminRequest } from '../actions/adminManagementAction';

const mapStateToProps = state => {
  return {
    isAddNewAdminSucceed: state.isAddNewAdminSucceed,
    adminInfo: state.adminInfo,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    addNewAdmin: (token, email, password, name, cb) =>
      run(addNewAdminRequest(token, email, password, name, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(adminManagement);
