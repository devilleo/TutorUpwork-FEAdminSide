import { connect } from 'react-redux';
import app from '../App';

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(app);
