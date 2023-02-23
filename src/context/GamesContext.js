import React, {createContext, useContext, useState} from 'react';
import {getStudentResultsController} from '../controllers/gamesController';
import {gamesData} from '../redux/data/games';
import {LayoutContext} from './LayoutContext';

export const GamesContext = createContext();

export const GamesProvider = ({children}) => {
  const [games, setGames] = useState(gamesData);
  const {setIsLoading} = useContext(LayoutContext);

  const getStudentResults = async studentId => {
    setIsLoading(true);
    for (let game of games) {
      try {
        const response = await getStudentResultsController(
          studentId,
          game.title,
        );
        game.completed = !!response.length;
      } catch (error) {
        game.completed = false;
      }
    }
    setIsLoading(false);
  };

  const resetGameStatus = () => {
    setGames(gamesList => {
      return gamesList.map(game => ({...game, completed: false}));
    });
  };

  return (
    <GamesContext.Provider
      value={{games, setGames, getStudentResults, resetGameStatus}}>
      {children}
    </GamesContext.Provider>
  );
};
