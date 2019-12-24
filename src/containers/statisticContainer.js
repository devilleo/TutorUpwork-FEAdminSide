import { connect } from 'react-redux';
import StatisticManagement from '../components/homepage/statisticManagement/index';
import {
    getContractsListRequest,
} from '../actions/contractManagementAction';
import {
    getSkillsListRequest,
} from '../actions/skillManagementAction';
import {
    getTutorsListRequest,
} from '../actions/tutorManagementAction';
import {
    getStudentsListRequest,
} from '../actions/studentManagementAction';

const mapStateToProps = state => {
    return {
        contractsList: state.contractsList,
        skillsList: state.skillsList,
        tutorsList: state.tutorsList,
        studentsList: state.studentsList,
    };
};

const mapDispatchToProps = run => {
    const actions = {
        getContractsList: token => run(getContractsListRequest(token)),
        getSkillsList: token => run(getSkillsListRequest(token)),
        getTutorsList: token => run(getTutorsListRequest(token)),
        getStudentsList: token => run(getStudentsListRequest(token)),
    };
    return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(StatisticManagement);
