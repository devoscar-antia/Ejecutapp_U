import React, {useEffect, useState} from 'react';
import Screen1 from './Screen1';
import GameInstructions from '../../Instructions/GameInstructions';

import SessionFinishedScreen from '../../../screens/SessionFinished';
import {useRef} from 'react';
import {Loader} from '../../../components';

const GameFive = props => {
  const [screen, setScreen] = useState(0);
  const [data, setData] = useState({});
  const startDate = useRef(null);
  const endDate = useRef(null);

  console.log('----------------------------');
  console.log(`Screen = ${screen}`);
  console.log('----------------------------');

  const nextScreen = () => {
    console.log(`Procesando Screen ${screen}`);
    setScreen(screen + 1);
  };

  useEffect(() => {
    console.log('Entro aquí');
    if (screen === 2 && !props.isGuest) {
      endDate.current = new Date();
      props.addStudentResults(props.game.title, props.studentCode, {
        ...data,
        totalTime: Math.abs(startDate.current - endDate.current),
      });
      nextScreen();
    }
  }, [screen]);

  switch (screen) {
    case 0:
      return (
        <GameInstructions
          {...props}
          onNextStageHandler={nextScreen}
          stage="normal"
        />
      );
    case 1:
      startDate.current = new Date();
      return (
        <Screen1
          {...props}
          setScreen={setScreen}
          nextScreen={nextScreen}
          data={data}
          setData={setData}
        />
      );
    case 2:
      return <Loader />;
    case 3:
      return (
        <SessionFinishedScreen
          navigation={props.navigation}
          selectedStudent={props.studentCode}
        />
      );
  }

  return <></>;
};

export default GameFive;
