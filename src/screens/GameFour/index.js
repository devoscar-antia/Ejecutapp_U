import * as Students from '../../redux/actions/Students';
import {connect} from 'react-redux';
import GameFourScreen from './GameFourScreen';

const mapStateToProps = state => {
  return {
    studentCode: state.students.selectedStudent,
    game: state.games.game,
    isGuest: state.games.auth,
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
)(GameFourScreen);
