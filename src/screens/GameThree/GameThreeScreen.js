import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';

import {MULI_BLACK, PURPLE_COLOR, WHITE_COLOR} from '../../assets/styles';
import SessionFinishedScreen from '../SessionFinished';

import WaterLily from '../../assets/images/WaterLily.png';
import Frog from '../../assets/images/Frog.png';
import GameInstructions from '../Instructions/';
import {LayoutContext} from '../../context/LayoutContext';

const DELAY_PER_LEVEL = 1000;
const chances = {
  '0': 'firstChance',
  '1': 'secondChance',
};

const Leaves = [
  {
    number: 0,
    layoutPosition: {
      position: 'absolute',
      top: '10%',
    },
  },
  {
    number: 1,
    layoutPosition: {
      position: 'absolute',
      top: '20%',
      left: '10%',
    },
  },
  {
    number: 2,
    layoutPosition: {
      position: 'absolute',
      top: '25%',
      right: '20%',
    },
  },
  {
    number: 3,
    layoutPosition: {
      position: 'absolute',
      bottom: '15%',
      right: '45%',
    },
  },
  {
    number: 4,
    layoutPosition: {
      position: 'absolute',
      top: '35%',
      left: '40%',
    },
  },
  {
    number: 5,
    layoutPosition: {
      position: 'absolute',
      bottom: '15%',
      left: '20%',
    },
  },
  {
    number: 6,
    layoutPosition: {
      position: 'absolute',
      bottom: '30%',
      right: '10%',
    },
  },
  {
    number: 7,
    layoutPosition: {
      position: 'absolute',
      bottom: '40%',
      left: '20%',
    },
  },
  {
    number: 8,
    layoutPosition: {
      position: 'absolute',
      bottom: '25%',
      right: '30%',
    },
  },
];

class Game {
  static PROGRESIVE = 'PROGRESIVE';
  static REGGRESIVE = 'REGGRESIVE';

  constructor(type = '', levels = {}) {
    this.type = type;
    this.levels = levels;
  }
}
class Multilevel {
  constructor(firstChance = [], secondChance = []) {
    this.firstChance = firstChance;
    this.secondChance = secondChance;
  }
}

const progressiveLevels = {
  '0': new Multilevel([3, 2, 1]),
  '1': new Multilevel([1, 6], [9, 5]),
  '2': new Multilevel([5, 2, 9], [8, 6, 3]),
  '3': new Multilevel([9, 7, 6, 1], [2, 6, 9, 2]),
  '4': new Multilevel([9, 3, 6, 1, 2], [3, 5, 7, 2, 4]),
  '5': new Multilevel([8, 4, 9, 3, 2, 6], [2, 9, 1, 7, 6, 3]),
  '6': new Multilevel([1, 3, 5, 2, 6, 4, 5], [3, 1, 7, 9, 6, 2, 3]),
  '7': new Multilevel([1, 4, 2, 6, 9, 7, 3, 5], [2, 6, 3, 1, 9, 8, 5, 9]),
  '8': new Multilevel([3, 6, 7, 9, 1, 8, 2, 4, 5], [1, 5, 9, 8, 2, 6, 4, 7, 3]),
};

const regressiveLevels = {
  '0': new Multilevel([4, 1], [2, 5]),
  '1': new Multilevel([2, 1], [3, 5]),
  '2': new Multilevel([4, 9], [8, 6]),
  '3': new Multilevel([2, 4, 7], [6, 2, 1]),
  '4': new Multilevel([8, 5, 3], [9, 5, 1]),
  '5': new Multilevel([6, 2, 9, 7], [3, 6, 5, 2]),
  '6': new Multilevel([1, 3, 6, 2, 9], [8, 6, 9, 4, 1]),
  '7': new Multilevel([7, 8, 1, 3, 5, 2], [5, 2, 1, 9, 7, 3]),
};

const WaterLilyCard = props => {
  const renderFrog = () => {
    switch (props.currentChance) {
      case 0:
        if (
          props.observation &&
          props.level.firstChance[props.position] == props.number + 1
        ) {
          return <Image style={styles.image} source={Frog} />;
        }
        break;
      case 1:
        if (
          props.observation &&
          props.level.secondChance[props.position] == props.number + 1
        ) {
          return <Image style={styles.image} source={Frog} />;
        }
        break;
    }
    return null;
  };

  return (
    <TouchableOpacity
      onPress={e => props.onPress(props.number)}
      disabled={props.observation}
      style={props.layoutPosition}>
      <ImageBackground
        source={WaterLily}
        style={{
          ...styles.imageBackground,
          width: props.orientation.width * (props.isMobile ? 0.175 : 0.105),
          height: props.orientation.width * (props.isMobile ? 0.175 : 0.105),
        }}>
        {renderFrog()}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const GameThreeScreen = props => {
  let seconds, currentMilliseconds;
  let countTimer = 0;

  let startDate = useRef(null);
  let endDate = useRef(null);

  const [data, setData] = useState({
    normal: {
      elapsedTime: 0,
      answers: {},
    },
    inverted: {
      elapsedTime: 0,
      answers: [],
    },
  });

  const [levels, setLevels] = useState(progressiveLevels);

  const [observation, setObservation] = useState(true);
  const [currentChance, setCurrentChance] = useState(0);

  const [level, setLevel] = useState(0);
  const [position, setPosition] = useState(0);
  const [levelTime, setLevelTime] = useState(0);

  const [stage, setStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [errors, setErrors] = useState(0);

  const {orientation, isMobile} = useContext(LayoutContext);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      seconds = new Date().getSeconds();
      currentMilliseconds = new Date().getMilliseconds();
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, DELAY_PER_LEVEL);
        return () => {
          clearInterval(id);
        };
      }
    });
  }

  const nextPosition = (wasPressed, reactionTime, error) => {
    setPosition(position + 1);
    if (!observation) {
      saveStageData(wasPressed, reactionTime, error);
      switch (currentChance) {
        case 0:
          if (!(position + 1 > levels[level].firstChance.length - 1)) {
            setLevelTime(levelTime + 1);
          }

          break;
        case 1:
          if (!(position + 1 > levels[level].secondChance.length - 1)) {
            setLevelTime(levelTime + 1);
          }
          break;
      }
    }
  };

  const saveStageData = (wasPressed, reactionTime, error) => {
    let keyCurrentChance, keyCurrentPosition;
    switch (stage) {
      case 1:
        try {
          keyCurrentChance =
            data.normal.answers[level + 1][chances[currentChance]];
          keyCurrentPosition =
            data.normal.answers[level + 1][chances[currentChance]][position];
        } catch (error) {
          keyCurrentChance = {};
          keyCurrentPosition = {};
        }

        setData({
          ...data,
          normal: {
            ...data.normal,
            answers: {
              ...data.normal.answers,
              [level + 1]: {
                ...data.normal.answers[level + 1],
                [chances[currentChance]]: {
                  ...keyCurrentChance,
                  [position]: {
                    ...keyCurrentPosition,
                    hasError: error,
                    reactionTime: levelTime * 1000 + reactionTime + 1000,
                  },
                  numberOfErrors: errors,
                },
              },
            },
          },
        });
        break;
      case 3:
        try {
          keyCurrentChance =
            data.inverted.answers[level + 1][chances[currentChance]];
          keyCurrentPosition =
            data.inverted.answers[level + 1][chances[currentChance]][position];
        } catch (error) {
          keyCurrentChance = {};
          keyCurrentPosition = {};
        }

        setData({
          ...data,
          inverted: {
            ...data.inverted,
            answers: {
              ...data.inverted.answers,
              [level + 1]: {
                ...data.inverted.answers[level + 1],
                [chances[currentChance]]: {
                  ...keyCurrentChance,
                  [position]: {
                    ...keyCurrentPosition,
                    hasError: error,
                    reactionTime: levelTime * 1000 + reactionTime + 1000,
                  },
                  numberOfErrors: errors,
                },
              },
            },
          },
        });
        break;
    }
  };

  const onNextStageHandler = () => {
    switch (stage) {
      case 0: // Si se avanza de stage, y está en stage 0(Primeras instrucciones), se comienza el training
        setIsRunning(true);
        setStage(stage + 1); // Avanzo al siguiente stage
        startDate.current = new Date();
        break;
      case 1: // Si se avanza de stage, y está en stage 1(Training), se lleva a las instrucciones nuevamente
        setData({
          ...data,
          normal: {...data.normal, elapsedTime: levelTime - 1},
        });
        setLevelTime(0);
        setStage(stage + 1);
        break;
      case 2: // Si se avanza de stage, y está en el Stage 2(Instrucciones después de training), se comienza el juego normal de 2 minutos
        setIsRunning(true);
        setLevels(regressiveLevels);
        setStage(stage + 1);
        break;
      case 3: // Si se avanza de stage, y se está en el Stage 3(Juego normal), se lleva a las instrucciones de juego invertido
        setData({
          ...data,
          inverted: {...data.inverted, elapsedTime: levelTime - 1},
        });
        setLevelTime(0);
        setStage(stage + 1);
        endDate.current = new Date();
        break;
    }
  };

  useInterval(
    async () => {
      setLevelTime(levelTime + 1);
    },
    isRunning ? DELAY_PER_LEVEL : null,
  );

  const onButtonPress = number => {
    const currentSeconds = new Date().getSeconds(); //To get the Current Seconds
    const milliseconds = new Date().getMilliseconds(); //To get the Current Seconds

    if (currentSeconds === seconds) {
      countTimer = milliseconds - currentMilliseconds;
    } else {
      countTimer = 1000 - currentMilliseconds + milliseconds;
    }

    let error = false;
    switch (currentChance) {
      case 0:
        error = number + 1 !== levels[level].firstChance[position];
        break;
      case 1:
        error = number + 1 !== levels[level].secondChance[position];
        break;
    }
    error ? setErrors(errors + 1) : null;

    if (isRunning) {
      nextPosition(true, countTimer, error);
    }
  };

  const resetGameParameters = () => {
    setIsRunning(false);
    setPosition(0);
    setObservation(true);
    setCurrentChance(0);
    setLevel(0);
    setErrors(0);
  };

  useEffect(() => {
    const gameLogic = () => {
      if (isRunning) {
        if (level >= Object.keys(levels).length) {
          resetGameParameters();
          onNextStageHandler();
          return;
        }
        switch (currentChance) {
          case 0:
            if (observation) {
              if (position > levels[level].firstChance.length - 1) {
                setPosition(0);
                setObservation(false);
                break;
              } else {
                nextPosition(false, 1001);
                break;
              }
            } else {
              if (position > levels[level].firstChance.length - 1) {
                if (errors >= 1) {
                  if (levels[level].secondChance.length === 0) {
                    resetGameParameters();
                    onNextStageHandler();
                    break;
                  }
                  setCurrentChance(1);
                  setPosition(0);
                  setErrors(0);
                  setObservation(true);
                } else {
                  setPosition(0);
                  setObservation(true);
                  setCurrentChance(0);
                  setLevel(level + 1);
                }
                break;
              }
            }
            break;
          case 1:
            if (observation) {
              if (position > levels[level].secondChance.length - 1) {
                setPosition(0);
                setObservation(false);
                break;
              } else {
                nextPosition(false, 1001);
                break;
              }
            } else {
              if (position > levels[level].secondChance.length - 1) {
                if (errors >= 1) {
                  resetGameParameters();
                  onNextStageHandler();
                  break;
                } else {
                  setPosition(0);
                  setObservation(true);
                  setCurrentChance(0);
                  setLevel(level + 1);
                }

                break;
              }
            }
            break;
        }
      }
    };
    gameLogic();
  }, [levelTime]);

  useEffect(() => {
    if (stage === 4 && !props.isGuest) {
      props.addStudentResults(props.game.title, props.studentCode, {
        ...data,
        totalTime: Math.abs(startDate.current - endDate.current),
      });
    }
  }, [stage]);

  const renderSwitcher = stage => {
    switch (stage) {
      case 0:
        return (
          <GameInstructions
            onNextStageHandler={onNextStageHandler}
            stage="training"
          />
        );
      case 1:
        return (
          <SafeAreaView style={styles.container}>
            {!(level >= Object.keys(levels).length) ? (
              <>
                <Text
                  style={{
                    ...styles.yourTurn,
                    fontSize: orientation.width * (isMobile ? 0.065 : 0.04),
                  }}>
                  {!observation ? '¡Es tu turno!' : ''}
                </Text>
                <ImageBackground
                  style={{
                    ...styles.images,
                    width: orientation.width,
                    height: orientation.height * 0.8,
                  }}
                  source={require('../../assets/images/FondoSinHojas.png')}>
                  {Leaves.map(({number, layoutPosition}) => {
                    return (
                      <WaterLilyCard
                        onPress={onButtonPress}
                        key={number}
                        number={number}
                        level={levels[level]}
                        observation={observation}
                        currentChance={currentChance}
                        position={position}
                        layoutPosition={layoutPosition}
                        orientation={orientation}
                        isMobile={isMobile}
                      />
                    );
                  })}
                </ImageBackground>
              </>
            ) : (
              <Text
                style={{
                  ...styles.yourTurn,
                  fontSize: orientation.width * 0.04,
                }}>
                ¡Felicidades!
              </Text>
            )}
          </SafeAreaView>
        );
      case 2:
        return (
          <GameInstructions
            onNextStageHandler={onNextStageHandler}
            stage="inverse"
          />
        );

      case 3:
        return (
          <SafeAreaView style={styles.container}>
            {!(level >= Object.keys(levels).length) ? (
              <>
                <Text
                  style={{
                    ...styles.yourTurn,
                    fontSize: orientation.width * 0.05,
                  }}>
                  {!observation ? '¡Es tu turno!' : ''}
                </Text>
                <ImageBackground
                  style={{
                    ...styles.images,
                    width: orientation.width,
                    height: orientation.height * 0.8,
                  }}
                  source={require('../../assets/images/FondoSinHojas.png')}>
                  {Leaves.map(({number, layoutPosition}) => {
                    return (
                      <WaterLilyCard
                        onPress={onButtonPress}
                        key={number}
                        number={number}
                        level={levels[level]}
                        observation={observation}
                        currentChance={currentChance}
                        position={position}
                        layoutPosition={layoutPosition}
                        orientation={orientation}
                        isMobile={isMobile}
                      />
                    );
                  })}
                </ImageBackground>
              </>
            ) : (
              <Text
                style={{
                  ...styles.yourTurn,
                  fontSize: orientation.width * 0.04,
                }}>
                ¡Felicidades!
              </Text>
            )}
          </SafeAreaView>
        );
      case 4:
        return (
          <SessionFinishedScreen
            navigation={props.navigation}
            selectedStudent={props.studentCode}
          />
        );
    }
  };

  return <>{renderSwitcher(stage)}</>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE_COLOR,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  images: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '90%',
    height: '90%',
    position: 'absolute',
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
  imageBackground: {
    resizeMode: 'contain',
    position: 'relative',
  },
  yourTurn: {
    fontFamily: MULI_BLACK,
    color: PURPLE_COLOR,
  },
});

export default GameThreeScreen;
