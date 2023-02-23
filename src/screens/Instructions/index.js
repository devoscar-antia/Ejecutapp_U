import {connect} from 'react-redux';

import GameInstructions from './GameInstructions';

const mapStateToProps = state => {
  return {
    selectedGameId: state.games.selectedGameId,
    gamesList: state.games.gamesList,
    game: state.games.game,
  };
};

export default connect(
  mapStateToProps,
  null,
)(GameInstructions);
