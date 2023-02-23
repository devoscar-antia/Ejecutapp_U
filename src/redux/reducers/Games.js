import * as Games from '../actions/Games';

import {gamesData} from '../data/games.js';

const INITIAL_STATE = {
  gamesList: gamesData,
  selectedGameId: null,
  game: null,
};

// Handlers
const setSelectedGame = (state, {selectedGameId}) => {
  return {...state, selectedGameId};
};

const setFullGame = (state, {game}) => {
  return {...state, game};
};

const gameIsCompleted = (state, {game, completed}) => {
  state.gamesList[game].completed = completed;
  return {...state};
};

// Binding actions to handlers
const reducerMap = {
  [Games.Types.SetSelectedGame]: setSelectedGame,
  [Games.Types.SetGame]: setFullGame,
  [Games.Types.SetGameIsCompleted]: gameIsCompleted,
};

export const reducer = (state = INITIAL_STATE, action) => {
  const handler = reducerMap[action.type];
  return typeof handler === 'function' ? handler(state, action) : state;
};
