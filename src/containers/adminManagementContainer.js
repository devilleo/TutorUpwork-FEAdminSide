import { connect } from 'react-redux';
import adminManagement from '../components/homepage/adminManagement/index';
import { addNewAdminRequest } from '../actions/adminManagementAction';

const mapStateToProps = state => {
  return {
    isAddNewAdminSucceed: state.isAddNewAdminSucceed,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    addNewAdmin: (email, password, role, cb) => run(addNewAdminRequest(email, password, role, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(adminManagement);
