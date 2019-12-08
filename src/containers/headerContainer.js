import { connect } from 'react-redux';
import header from '../components/layout/header';
import { logoutRequest } from '../actions/adminAction';

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(header);
