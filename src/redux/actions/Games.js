export const Types = {
  SetSelectedGame: 'games.setSelectedGame',
  SetGame: 'games.setGame',
  SetGameIsCompleted: 'games.setGameIsCompleted',
};

export const Actions = {
  setSelectedGame: selectedGameId => ({
    type: Types.SetSelectedGame,
    selectedGameId,
  }),
  setGame: game => ({
    type: Types.SetGame,
    game,
  }),
  setGameIsCompleted: (game, completed) => ({
    type: Types.SetGameIsCompleted,
    game,
    completed,
  }),
};
