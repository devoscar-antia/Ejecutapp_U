import React, {useState, useRef, useEffect, useContext} from 'react';
import {Text, StyleSheet, SafeAreaView, Image, View} from 'react-native';

import {WHITE_COLOR} from '../../assets/styles';
import SessionFinishedScreen from '../SessionFinished';

import RedFlower from '../../assets/images/go-nogo/RedFlower.png';
import GreenFlower from '../../assets/images/go-nogo/GreenFlower.png';
import Bird from '../../assets/images/go-nogo/Bird.png';
import GameInstructions from '../Instructions';
import {GAME_MAP} from './data';
import {getSumatory} from '../../utils/Misc';
import {LayoutContext} from '../../context/LayoutContext';

const DELAY_PER_LEVEL = 1000;

const GameOneScreen = props => {
  const [data, setData] = useState({
    training: {
      elapsedTime: 0,
      answers: [],
      reactionTime: [],
    },
    normal: {
      elapsedTime: 0,
      answers: [],
      reactionTime: [],
    },
    inverted: {
      elapsedTime: 0,
      answers: [],
      reactionTime: [],
    },
  });
  const [levels, setLevels] = useState(GAME_MAP.training);
  const [level, setLevel] = useState(0);
  const [levelTime, setLevelTime] = useState(0);
  const [stage, setStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const {orientation} = useContext(LayoutContext);

  let currentSeconds, currentMilliseconds;
  let totalMilliseconds = 0;

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      currentSeconds = new Date().getSeconds();
      currentMilliseconds = new Date().getMilliseconds();
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay) {
        let timeInterval = null;
        if (level % 2 === 0) {
          timeInterval = 1000;
        } else {
          timeInterval = 200;
        }
        let id = setInterval(tick, timeInterval);
        return () => {
          clearInterval(id);
        };
      }
    });
  }

  let GoNoGoArrayOne = [
    4,
    11,
    13,
    19,
    22,
    23,
    35,
    42,
    46,
    47,
    57,
    59,
    64,
    67,
    71,
    82,
    84,
    89,
    91,
    92,
    95,
    101,
    102,
    109,
    116,
    119,
    123,
    131,
    137,
    146,
    149,
    153,
  ];

  let GoNoGoArrayTwo = [
    1,
    3,
    4,
    6,
    8,
    10,
    12,
    15,
    17,
    19,
    20,
    21,
    25,
    27,
    30,
    34,
    36,
    38,
    40,
    42,
    43,
    45,
    48,
    50,
    54,
    57,
    58,
    62,
    66,
    68,
    70,
    72,
    76,
    77,
    78,
    79,
    81,
    83,
    84,
    86,
    89,
    90,
    92,
    95,
    97,
    100,
    102,
    104,
    107,
    110,
    112,
    113,
    116,
    118,
    121,
    123,
    125,
    128,
    129,
    133,
    134,
    136,
    138,
    140,
    143,
    144,
    146,
    149,
    152,
  ];

  const checkAnswer = wasPressed => {
    switch (stage) {
      case 1:
      case 3:
        if (wasPressed) {
          /* Si el botón fue presionado */
          if (levels[level] !== 0 && !GoNoGoArrayOne.includes(level)) {
            /* Si el nivel era para presionar */
            return true;
          } else {
            /* Si el nivel no era para presionar */
            return false;
          }
        } else {
          /* Si el botón no fue presionado, es decir pasaron los segundos determinados */
          if (levels[level] !== 0 && !GoNoGoArrayOne.includes(level)) {
            /* Si el nivel era para presionar */
            return false;
          } else {
            /* Si el nivel no era para presionar */
            return true;
          }
        }
      case 5:
        if (wasPressed) {
          /* Si el botón fue presionado */
          if (levels[level] !== 0 && GoNoGoArrayTwo.includes(level)) {
            /* Si el nivel era para presionar */
            return true;
          } else {
            /* Si el nivel no era para presionar */
            return false;
          }
        } else {
          /* Si el botón no fue presionado, es decir pasaron los segundos determinados */
          if (levels[level] !== 0 && GoNoGoArrayTwo.includes(level)) {
            /* Si el nivel era para presionar */
            return false;
          } else {
            /* Si el nivel no era para presionar */
            return true;
          }
        }
    }
  };

  const nextLevel = (wasPressed, reactionTime) => {
    setLevel(level + 1); // Siguiente nivel
    saveStageData(wasPressed, reactionTime); // Acumulo datos del usuario, si fue correcto y cuanto demoró
  };

  const saveStageData = (wasPressed, reactionTime) => {
    switch (stage) {
      case 1:
        setData({
          ...data,
          training: {
            ...data.training,
            answers: [...data.training.answers, checkAnswer(wasPressed)],
            reactionTime: [...data.training.reactionTime, reactionTime],
          },
        });
        break;
      case 3:
        setData({
          ...data,
          normal: {
            ...data.normal,
            answers: [...data.normal.answers, checkAnswer(wasPressed)],
            reactionTime: [...data.normal.reactionTime, reactionTime],
          },
        });
        break;
      case 5:
        setData({
          ...data,
          inverted: {
            ...data.inverted,
            answers: [...data.inverted.answers, checkAnswer(wasPressed)],
            reactionTime: [...data.inverted.reactionTime, reactionTime],
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
        break;
      case 1: // Si se avanza de stage, y está en stage 1(Training), se lleva a las instrucciones nuevamente
        setData({
          ...data,
          training: {...data.training, elapsedTime: levelTime - 1},
        });
        setLevelTime(0);
        setLevels(GAME_MAP.normal);
        setStage(stage + 1);
        break;
      case 2: // Si se avanza de stage, y está en el Stage 2(Instrucciones después de training), se comienza el juego normal de 2 minutos
        setIsRunning(true);
        setStage(stage + 1);
        break;
      case 3: // Si se avanza de stage, y se está en el Stage 3(Juego normal), se lleva a las instrucciones de juego invertido
        setData({
          ...data,
          normal: {...data.normal, elapsedTime: levelTime - 1},
        });
        setLevelTime(0);
        setLevels(GAME_MAP.inverted);
        setStage(stage + 1);
        break;
      case 4: // Si se avanza de stage, y se está en el Stage 4(instrucciones de juego inertido), se comienza el juego invertido de 2 minutos
        setIsRunning(true);
        setStage(stage + 1);
        break;
      case 5: // Si se avanza de stage, y se está en el Stage 5(Juego invertido), se lleva a la pantalla de finalización
        setData({
          ...data,
          inverted: {...data.inverted, elapsedTime: levelTime - 1},
        });
        setLevelTime(0);
        setStage(stage + 1);
        break;
    }
  };

  useInterval(
    () => {
      setLevelTime(levelTime + 1);
    },
    isRunning ? DELAY_PER_LEVEL : null,
  );

  const onButtonPress = () => {
    const secondsWhenButtonWasPressed = new Date().getSeconds(); //To get the Current Seconds
    const millisecondsWhenButtonWasPressed = new Date().getMilliseconds(); //To get the Current Milliseconds

    if (secondsWhenButtonWasPressed === currentSeconds) {
      totalMilliseconds =
        millisecondsWhenButtonWasPressed - currentMilliseconds;
    } else {
      totalMilliseconds =
        1000 - currentMilliseconds + millisecondsWhenButtonWasPressed;
    }

    if (isRunning) {
      if (level === levels.length) {
        setLevel(0);
        setIsRunning(false);
        onNextStageHandler();
      } else {
        nextLevel(true, totalMilliseconds);
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      if (level === levels.length) {
        setLevel(0);
        setIsRunning(false);
        onNextStageHandler();
      } else {
        nextLevel(false, 1001);
      }
    }
  }, [levelTime]);

  useEffect(() => {
    if (stage === 6 && !props.isGuest) {
      const normalErrors = data.normal.answers.reduce(getSumatory, 0);
      const invertedErrors = data.inverted.answers.reduce(getSumatory, 0);
      const totalAnswers =
        data.normal.answers.length + data.inverted.answers.length;
      const hitRatio =
        (totalAnswers - normalErrors - invertedErrors) / totalAnswers;

      props.addStudentResults(props.game.title, props.studentCode, {
        normalTime: data.normal.elapsedTime,
        normalData: data.normal.answers,
        normalReactionTime: data.normal.reactionTime,
        invertedTime: data.inverted.elapsedTime,
        invertedData: data.inverted.answers,
        invertedReactionTime: data.inverted.reactionTime,
        hitRatio,
      });
    }
  }, [stage]);

  const renderSwitcher = stage => {
    let currentImage;
    switch (stage) {
      case 0:
        return (
          <GameInstructions
            onNextStageHandler={onNextStageHandler}
            stage="training"
          />
        );
      case 1:
        currentImage = level <= 7 ? RedFlower : GreenFlower;
        return (
          <SafeAreaView
            style={styles.container}
            onTouchStart={() => onButtonPress()}>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 1 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 2 ? currentImage : Bird}
              />
            </View>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 3 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 4 ? currentImage : Bird}
              />
            </View>
          </SafeAreaView>
        );
      case 2:
        return (
          <GameInstructions
            onNextStageHandler={onNextStageHandler}
            stage="normal"
          />
        );
      case 3:
        currentImage = RedFlower;
        GoNoGoArrayOne = GoNoGoArrayOne.map(function(element) {
          return element * 2;
        });
        if (GoNoGoArrayOne.includes(level)) {
          currentImage = GreenFlower;
        }
        return (
          <SafeAreaView
            style={styles.container}
            onTouchStart={() => onButtonPress()}>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 1 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 2 ? currentImage : Bird}
              />
            </View>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 3 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 4 ? currentImage : Bird}
              />
            </View>
          </SafeAreaView>
        );
      case 4:
        return (
          <GameInstructions
            onNextStageHandler={onNextStageHandler}
            stage="inverse"
          />
        );
      case 5:
        currentImage = RedFlower;
        GoNoGoArrayTwo = GoNoGoArrayTwo.map(function(element) {
          return element * 2;
        });
        if (GoNoGoArrayTwo.includes(level)) {
          currentImage = GreenFlower;
        }
        return (
          <SafeAreaView
            style={styles.container}
            onTouchStart={() => onButtonPress()}>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 1 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 2 ? currentImage : Bird}
              />
            </View>
            <View style={styles.images}>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 3 ? currentImage : Bird}
              />
              <Text style={styles.baseText}>{'                    '}</Text>
              <Image
                style={{
                  ...styles.image,
                  width: orientation.width * 0.2,
                  height: orientation.width * 0.2,
                }}
                source={levels[level] === 4 ? currentImage : Bird}
              />
            </View>
          </SafeAreaView>
        );
      case 6:
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
  },
  images: {
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 120,
    height: 250,
    margin: 20,
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: 'red',
  },
});

export default GameOneScreen;
