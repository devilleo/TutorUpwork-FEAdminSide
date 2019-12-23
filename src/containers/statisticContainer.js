import { connect } from 'react-redux';
import StatisticManagement from '../components/homepage/statisticManagement/index';

const mapStateToProps = state => {
    return {
        contractsList: state.contractsList,
        skillsList: state.skillsList,
    };
};

const mapDispatchToProps = () => {
    const actions = {
    };
    return actions;
};
export default connect(mapStateToProps, mapDispatchToProps)(StatisticManagement);
