import {connect} from 'react-redux';
import Navigator from './Navigator';

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Navigator);
