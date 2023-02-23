import GameOneScreen from './GameOneScreen';
import * as Students from '../../redux/actions/Students';
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    studentCode: state.students.selectedStudent,
    game: state.games.game,
    isGuest: state.auth.isGuest,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addStudentResults: (game, studentCode, data) =>
      dispatch(Students.Actions.addOwnStudentResult(game, studentCode, data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameOneScreen);
