import { connect } from 'react-redux';
import header from '../components/layout/header';

const mapStateToProps = state => {
  return {
    isLogin: state.isLogin,
  };
};

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(header);
