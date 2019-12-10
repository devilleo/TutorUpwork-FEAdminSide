import { connect } from 'react-redux';
import SkillManagement from '../components/homepage/skillManagement/index';
import {
  getSkillsListRequest,
  addNewSkillRequest,
  removeSkillRequest,
  changeInfoSkillRequest,
} from '../actions/skillManagementAction';

const mapStateToProps = state => {
  return {
    adminRole: state.adminRole,
    skillsList: state.skillsList,
  };
};

const mapDispatchToProps = run => {
  const actions = {
    getSkillsList: token => run(getSkillsListRequest(token)),
    addNewSkillRequest: (token, name, cb) => run(addNewSkillRequest(token, name, cb)),
    removeSkill: (token, id, cb) => run(removeSkillRequest(token, id, cb)),
    changeInfoSkill: (token, id, newName, cb) =>
      run(changeInfoSkillRequest(token, id, newName, cb)),
  };
  return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(SkillManagement);
