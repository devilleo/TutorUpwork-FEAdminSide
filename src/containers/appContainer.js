import { connect } from 'react-redux';
import app from '../App';

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
    adminRole: state.adminRole,
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(app);
