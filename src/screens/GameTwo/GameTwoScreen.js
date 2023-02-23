import React, {useState, useRef, useEffect, useContext} from 'react';
import {Text, StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import Circulo from '../../assets/images/imagenesgametwo/CirculoRojo.png';
import Cuadrado from '../../assets/images/imagenesgametwo/CuadradoAzul.png';
import FullData from '../GameTwo/Data';
import DataOne from './DataOne';
import DataTwo from './DataTwo';
import DataThree from './DataThree';
import Modal from '../GameTwo/Modal';

import SessionFinishedScreen from '../SessionFinished';
import GameInstructions from '../Instructions';

import {Loader} from '../../components';
import {COCO_BOLD, GRAY, PURPLE_COLOR, WHITE} from '../../assets/styles';
import {LayoutContext} from '../../context/LayoutContext';
import {generateRandomIndex} from './functions';

const MAXIMUN_TOUCHES = 20;
const DELAY_PER_LEVEL = 1000;
const INCORRECT = 'Incorrect';

const PracticeInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="intro" />
  );
};

/* Practice Screen */
const PracticeScreen = ({
  setStage,
  setPressed,
  setIsRunning,
  data,
  dataPosition,
  orientation,
  numberOfTouches,
  onButtonPress,
  getReactionTime
}) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(' ');
  const [firstFigure, setFirstFigure] = useState('');
  const [secondFigure, setSecondFigure] = useState('');
  const [correct, setCorrect] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [points, setPoints] = useState(1);
  let levelData = FullData;

  const newImage = () => {
    setImage(levelData[currentImage]?.image);
    setFirstFigure(levelData[currentImage]?.firstFigure);
    setSecondFigure(levelData[currentImage]?.secondFigure);
    setCorrect(levelData[currentImage]?.correct);
  };

  const next = () => {
    if (points >= 10 || numberOfTouches > MAXIMUN_TOUCHES * 2) {
      setShowModal(true);
      setIsRunning(false);
      return;
    }
    setCurrentImage(generateRandomIndex(levelData));
    newImage();
  };

  useEffect(() => {
    newImage();
  }, []);

  useEffect(() => {
    verification(INCORRECT);
  }, [numberOfTouches]);

  const verification = option => {
    if(option !== INCORRECT){
      data[dataPosition].push((option === correct));
      getReactionTime();
    }
    if (option === correct) {
      setPoints(points + 1);
    }
    next();
  };

  return (
    <View style={styles.containerNiveles}>
      <View style={styles.containerImage}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{
            ...styles.imagen,
            width: orientation.width * 0.5,
            height: orientation.width * 0.5,
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(firstFigure);
          }}>
          <Image
            source={Circulo}
            style={{
              ...styles.circulo,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(secondFigure);
          }}>
          <Image
            source={Cuadrado}
            style={{
              ...styles.cuadrado,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={showModal}
        setVisible={setShowModal}
        onBackdrop={setStage}>
        <View>
          <View>
            <Text style={styles.modalText}>
              !Muy bien! Ya puedes empezar a jugar
            </Text>
          </View>
          <View style={styles.modalButtons}>
            <View>
              <TouchableOpacity
                style={{
                  ...styles.buttonStart,
                  width: orientation.width * 0.25,
                }}
                onPress={() => setStage(s => s + 1)}>
                <Text style={styles.buttonStartText}>Empezar</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.buttonGoBack}
                onPress={() => setStage(s => s - 1)}>
                <Text style={styles.buttonGoBackText}>Volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

/* Level One Instructions */
const LevelOneInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="nivel1" />
  );
};

/* Level One */
const LevelOne = ({
  setStage,
  setPressed,
  setIsRunning,
  data,
  dataPosition,
  orientation,
  numberOfTouches,
  onButtonPress,
  getReactionTime
}) => {
  const [image, setImage] = useState(' ');
  const [firstFigure, setFirstFigure] = useState('');
  const [secondFigure, setSecondFigure] = useState('');
  const [correct, setCorrect] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  let levelData = DataOne;

  const newImage = () => {
    setImage(levelData[currentImage].image);
    setFirstFigure(levelData[currentImage].circle);
    setSecondFigure(levelData[currentImage].square);
    setCorrect(levelData[currentImage].correct);
  };

  const next = () => {
    if (numberOfTouches > MAXIMUN_TOUCHES) {
      setIsRunning(false);
      setStage(s => s + 1);
      return;
    }

    setCurrentImage(generateRandomIndex(levelData));
    newImage();
  };

  useEffect(() => {
    newImage();
  }, []);

  useEffect(() => {
    verification(INCORRECT);
  }, [numberOfTouches]);

  const verification = option => {
    if(option !== INCORRECT){
      data[dataPosition].push((option === correct));
      getReactionTime();
    }
    next();
  };

  return (
    <View style={styles.containerNiveles}>
      <View style={styles.containerImage}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{
            ...styles.imagen,
            width: orientation.width * 0.5,
            height: orientation.width * 0.5,
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(firstFigure);
          }}>
          <Image
            source={Circulo}
            style={{
              ...styles.circulo,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(secondFigure);
          }}>
          <Image
            source={Cuadrado}
            style={{
              ...styles.cuadrado,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* Level Two Instructions */
const LevelTwoInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="nivel2" />
  );
};

/* Level Two */
const LevelTwo = ({
  setStage,
  setPressed,
  setIsRunning,
  data,
  dataPosition,
  orientation,
  numberOfTouches,
  onButtonPress,
  getReactionTime
}) => {
  const [image, setImage] = useState(' ');
  const [firstFigure, setFirstFigure] = useState('');
  const [secondFigure, setSecondFigure] = useState('');
  const [correct, setCorrect] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  let levelData = DataTwo;

  const newImage = () => {
    setImage(levelData[currentImage].image);
    setFirstFigure(levelData[currentImage].firstFigure);
    setSecondFigure(levelData[currentImage].secondFigure);
    setCorrect(levelData[currentImage].correct);
  };

  const next = () => {
    if (numberOfTouches > MAXIMUN_TOUCHES) {
      setIsRunning(false);
      setStage(s => s + 1);
      return;
    }

    setCurrentImage(generateRandomIndex(levelData));
    newImage();
  };

  useEffect(() => {
    newImage();
  }, []);

  useEffect(() => {
    verification(INCORRECT);
  }, [numberOfTouches]);

  const verification = option => {
    if(option !== INCORRECT){
      data[dataPosition].push((option === correct));
      getReactionTime();
    }
    next();
  };

  return (
    <View style={styles.containerNiveles}>
      <View style={styles.containerImage}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{
            ...styles.imagen,
            width: orientation.width * 0.5,
            height: orientation.width * 0.5,
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(firstFigure);
          }}>
          <Image
            source={Circulo}
            style={{
              ...styles.circulo,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(secondFigure);
          }}>
          <Image
            source={Cuadrado}
            style={{
              ...styles.cuadrado,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* Level Three Instructions */
const LevelThreeInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="nivel3" />
  );
};

/* Level Three */
const LevelThree = ({
  setStage,
  setPressed,
  setIsRunning,
  data,
  dataPosition,
  orientation,
  numberOfTouches,
  onButtonPress,
  getReactionTime
}) => {
  const [image, setImage] = useState(' ');
  const [firstFigure, setFirstFigure] = useState('');
  const [secondFigure, setSecondFigure] = useState('');
  const [correct, setCorrect] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  let levelData = DataThree;

  useEffect(() => {
    newImage();
  }, []);

  const newImage = () => {
    setImage(levelData[currentImage].image);
    setFirstFigure(levelData[currentImage].firstFigure);
    setSecondFigure(levelData[currentImage].secondFigure);
    setCorrect(levelData[currentImage].correct);
  };

  const next = () => {
    if (numberOfTouches > MAXIMUN_TOUCHES) {
      setIsRunning(false);
      setStage(s => s + 1);
      return;
    }

    setCurrentImage(generateRandomIndex(levelData));
    newImage();
  };

  useEffect(() => {
    newImage();
  }, []);

  useEffect(() => {
    verification(INCORRECT);
  }, [numberOfTouches]);

  const verification = option => {
    if(option !== INCORRECT){
      data[dataPosition].push((option === correct));
      getReactionTime();
    }
    next();
  };

  return (
    <View style={styles.containerNiveles}>
      <View style={styles.containerImage}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{
            ...styles.imagen,
            width: orientation.width * 0.5,
            height: orientation.width * 0.5,
          }}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(firstFigure);
          }}>
          <Image
            source={Circulo}
            style={{
              ...styles.circulo,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(secondFigure);
          }}>
          <Image
            source={Cuadrado}
            style={{
              ...styles.cuadrado,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* Level Four Instructions */
const LevelFourInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="nivel4" />
  );
};

/* Level Four */
const LevelFour = ({
  setStage,
  setPressed,
  setIsRunning,
  data,
  dataPosition,
  orientation,
  numberOfTouches,
  onButtonPress,
  getReactionTime
}) => {
  const [image, setImage] = useState(' ');
  const [firstFigure, setFirstFigure] = useState('');
  const [secondFigure, setSecondFigure] = useState('');
  const [correct, setCorrect] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  let levelData = FullData;

  const newImage = () => {
    setImage(levelData[currentImage].image);
    setFirstFigure(levelData[currentImage].firstFigure);
    setSecondFigure(levelData[currentImage].secondFigure);
    setCorrect(levelData[currentImage].correct);
  };

  const next = () => {
    if (numberOfTouches > MAXIMUN_TOUCHES) {
      setIsRunning(false);
      setStage(s => s + 1);
      return;
    }

    setCurrentImage(generateRandomIndex(levelData));
    newImage();
  };

  useEffect(() => {
    newImage();
  }, []);

  useEffect(() => {
    verification(INCORRECT);
  }, [numberOfTouches]);

  const verification = option => {
    if(option !== INCORRECT){
      data[dataPosition].push((option === correct));
      getReactionTime();
    }
    next();
  };

  return (
    <View style={styles.containerNiveles}>
      <View style={styles.containerImage}>
        <Image
          source={typeof image === 'string' ? {uri: image} : image}
          style={{
            ...styles.imagen,
            width: orientation.width * 0.5,
            height: orientation.width * 0.5,
          }}
        />
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(firstFigure);
          }}>
          <Image
            source={Circulo}
            style={{
              ...styles.circulo,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPressed(true);
            onButtonPress();
            verification(secondFigure);
          }}>
          <Image
            source={Cuadrado}
            style={{
              ...styles.cuadrado,
              width: orientation.width * 0.175,
              height: orientation.width * 0.175,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const GameTwoScreen = props => {
  //Current Stage It Toggles the Current View and Sets data for the Next Stage
  const [stage, setStage] = useState(0);
  //Previous Time, Mutable reference for capturing the previousTime in previousTime.current
  const previousTime = useRef(0);
  //Level Time state that captures in Seconds Per Level
  const [levelTime, setLevelTime] = useState(0);
  const [level] = useState(0);
  //Determines if a Level Is Running so a Hook is Executed
  const [isRunning, setIsRunning] = useState(false);
  //State that is triggered when a figure is pressed
  const [pressed, setPressed] = useState(false);
  //Array of Reaction Time
  const [reactionTime] = useState([]);
  //Array of attempts and if the response was correct or incorrect
  const [data] = useState([]);
  //Current Data Position
  const [dataPosition, setDataPosition] = useState(0);
  const {orientation} = useContext(LayoutContext);
  //Number of Touches Max Number = 20
  const [numberOfTouches, setNumberOfTouches] = useState(1);

  let startDate = useRef(null);
  let endDate = useRef(null);
  let totalMilliseconds = 0;

  const nextStage = () => {
    setIsRunning(true);
    setStage(stage + 1); // Avanzo al siguiente stage
    setDataPosition(dataPosition + 1);
    data[dataPosition + 1] = [];
    reactionTime[dataPosition + 1] = [];
    setNumberOfTouches(1);
  };

  const onNextStageHandler = () => {
    switch (stage) {
      case 0: // Si se avanza de stage, y está en stage 0(Primeras instrucciones), se comienza el training
        setIsRunning(true);
        setStage(stage + 1); // Avanzo al siguiente stage
        data[dataPosition] = [];
        reactionTime[dataPosition] = [];
        break;
      case 2:
        setIsRunning(true);
        setStage(stage + 1); // Avanzo al siguiente stage
        startDate.current = new Date();
        data[dataPosition] = [];
        reactionTime[dataPosition] = [];
        setNumberOfTouches(1);
        break;
      case 4:
        nextStage();
        break;
      case 6:
        nextStage();
        break;
      case 8:
        nextStage();
        break;
    }
  };

  let currentSeconds, currentMilliseconds;
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      currentSeconds = new Date().getSeconds(); //To get the Current Seconds
      currentMilliseconds = new Date().getMilliseconds(); //To get the Current Seconds
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
        };
      }
    });
  }

  const captureSeconds = () => {
    const secondsWhenButtonWasPressed = new Date().getSeconds(); //To get the Current Seconds
    const millisecondsWhenButtonWasPressed = new Date().getMilliseconds(); //To get the Current Milliseconds

    if (secondsWhenButtonWasPressed === currentSeconds) {
      totalMilliseconds =
        millisecondsWhenButtonWasPressed - currentMilliseconds;
    } else {
      totalMilliseconds =
        1000 - currentMilliseconds + millisecondsWhenButtonWasPressed;
    }

    return isNaN(totalMilliseconds) ? 0 : totalMilliseconds;
  }

  useInterval(
    () => {
      setLevelTime(levelTime + 1);
    },
    isRunning ? DELAY_PER_LEVEL : null,
  );

  const getReactionTime = () => {
    reactionTime[dataPosition].push(captureSeconds());
  };

  const getSuccess = () => {
    previousTime.current = levelTime;
    setTimeout(()=>{
      setPressed(false);
    },50);
    setNumberOfTouches(numberOfTouches + 1);
  };

  const getError = () => {
    reactionTime[dataPosition].push(DELAY_PER_LEVEL);
    previousTime.current = levelTime;
    data[dataPosition].push(false);
    setPressed(false);
    setNumberOfTouches(numberOfTouches + 1);
  };

  const runningLogic = (wasPressed) => {
    if (!isRunning) {
      return;
    }

    if (wasPressed) {
      getSuccess();
    } else {
      getError();
    }
  }

  const onButtonPress = () => {
    runningLogic(true);
  };

  useEffect(() => {
    runningLogic();
  }, [levelTime]);

  const screens = [
    {id: 0, component: PracticeInstructions},
    {id: 1, component: PracticeScreen},
    {id: 2, component: LevelOneInstructions},
    {id: 3, component: LevelOne},
    {id: 4, component: LevelTwoInstructions},
    {id: 5, component: LevelTwo},
    {id: 6, component: LevelThreeInstructions},
    {id: 7, component: LevelThree},
    {id: 8, component: LevelFourInstructions},
    {id: 9, component: LevelFour},
  ];
  useEffect(() => {
    if (stage == screens.length) {
      endDate.current = new Date();
      if (!props.isGuest) {
        props.addStudentResults(props.game.title, props.studentCode, {
          totalTime: reactionTime?.flat().reduce((previous,current) => previous+current),
          realTime: Math.abs(startDate.current - endDate.current),
          reactionTime,
          data,
        });
      }
      setStage(stage + 1);
    }
  }, [stage]);
  if (stage == screens.length) {
    return <Loader />;
  }
  if (stage > screens.length) {
    return <SessionFinishedScreen navigation={props.navigation} />;
  }

  return (
    <>
      {screens.map(({id, component: Component}, index) =>
        stage === index ? (
          <Component
            key={id}
            setStage={setStage}
            onNextStageHandler={onNextStageHandler}
            setIsRunning={setIsRunning}
            setPressed={setPressed}
            getReactionTime={getReactionTime}
            endDate={endDate}
            data={data}
            dataPosition={dataPosition}
            orientation={orientation}
            numberOfTouches={numberOfTouches}
            setNumberOfTouches={setNumberOfTouches}
            onButtonPress={onButtonPress}
          />
        ) : null,
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#490091',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerEnunciados: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ima: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  tituloE: {
    textAlignVertical: 'center',
    marginTop: 90,
    textAlign: 'center',
    fontSize: 30,
  },
  P1: {
    marginHorizontal: 18,
    fontFamily: 'Lato-Black',
    fontSize: 15,
  },
  P2: {
    marginHorizontal: 18,
    marginVertical: 10,
    fontFamily: 'Lato-Black',
    fontSize: 15,
  },
  containerButton2: {
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttoncirculo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#ff0000',
    borderRadius: 50,
  },

  buttoncuadrado: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#0000ff',
  },
  imagen: {
    flex: 1,
    width: 265,
    height: 265,
    resizeMode: 'contain',
  },
  containerNiveles: {
    margin: 30,
    height: '40%',
    display: 'flex',
    flexDirection: 'column',
  },
  containerImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  containerButton: {
    marginVertical: 70,
    height: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circulo: {
    width: 150,
    height: 150,
  },
  cuadrado: {
    width: 150,
    height: 150,
  },

  title: {
    color: '#ffff',
    textAlign: 'center',
    textAlignVertical: 'top',
    marginVertical: 20,
    fontSize: 35,
    fontFamily: 'Cocogoose Pro UltraLight Italic-trial',
  },

  modalButtons: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonStart: {
    backgroundColor: PURPLE_COLOR,
    margin: 10,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7.5,
  },
  buttonStartText: {
    fontFamily: COCO_BOLD,
    color: WHITE,
  },
  buttonGoBack: {
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGoBackText: {
    fontFamily: COCO_BOLD,
    color: GRAY,
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
  },
  modalText: {
    fontFamily: COCO_BOLD,
    color: PURPLE_COLOR,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 50,
    fontSize: 20,
  },
});

export default GameTwoScreen;
