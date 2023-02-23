import {connect} from 'react-redux';
import {UserIndicator} from './UserIndicator';

const mapStateToProps = state => {
  return {
    userEmail: state.auth.userEmail,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(UserIndicator);
