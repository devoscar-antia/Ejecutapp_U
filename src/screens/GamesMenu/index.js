import {connect} from 'react-redux';
import * as Games from '../../redux/actions/Games';
import * as Students from '../../redux/actions/Students';

import GamesMenuScreen from './GamesMenuScreen';

const mapDispatchToProps = dispatch => {
  return {
    setSelectedGame: setSelectedGameId =>
      dispatch(Games.Actions.setSelectedGame(setSelectedGameId)),
    setGame: game => dispatch(Games.Actions.setGame(game)),
    setSelectedStudent: selectedStudent =>
      dispatch(Students.Actions.setSelectedStudent(selectedStudent)),
    getStudentResults: async (id, game, gameId) =>
      dispatch(Students.Actions.studentHasCompletedGame(id, game, gameId)),
    fetchAllOwnStudents: userEmail =>
      dispatch(Students.Actions.fetchAllOwnStudents(userEmail)),
  };
};

const mapStateToProps = state => {
  return {
    gamesList: state.games.gamesList,
    selectedGameId: state.games.selectedGameId,
    game: state.games.game,
    isGuest: state.auth.isGuest,
    studentsList: state.students.studentsList,
    selectedStudent: state.students.selectedStudent,
    userEmail: state.auth.userEmail,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GamesMenuScreen);
