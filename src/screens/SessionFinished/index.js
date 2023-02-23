import {connect} from 'react-redux';

import SessionFinishedScreen from './SessionFinishedScreen';

const mapStateToProps = state => {
  return {
    selectedStudent: state.students.selectedStudent,
    isGuest: state.auth.isGuest,
  };
};

export default connect(
  mapStateToProps,
  null,
)(SessionFinishedScreen);
