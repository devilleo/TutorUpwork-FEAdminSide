import { connect } from 'react-redux';
import app from '../components/login';
import { loginRequest } from '../actions/adminAction';

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    login: (e, p, cb) => dispatch(loginRequest(e, p, cb)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(app);
