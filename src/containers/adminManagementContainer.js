import { connect } from 'react-redux';
import AdminManagement from '../components/homepage/adminManagement/index';
import {
  addNewAdminRequest,
  getAdminsListRequest,
  removeAdminRequest,
  changePasswordAdminRequest,
  changeInfoAdminRequest,
} from '../actions/adminManagementAction';

const mapStateToProps = state => {
  return {
    adminRole: state.adminRole,
    adminsList: state.adminsList,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    getAdminsList: token => run(getAdminsListRequest(token)),
    addNewAdmin: (token, email, password, name, cb) =>
      run(addNewAdminRequest(token, email, password, name, cb)),
    removeAdmin: (token, id, cb) => run(removeAdminRequest(token, id, cb)),
    changePasswordAdmin: (token, id, password, cb) =>
      run(changePasswordAdminRequest(token, id, password, cb)),
    changeInfoAdmin: (token, id, newEmail, newName, cb) =>
      run(changeInfoAdminRequest(token, id, newEmail, newName, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
