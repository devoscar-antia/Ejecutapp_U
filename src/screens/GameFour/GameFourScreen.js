import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import useOrientation from '../../hooks/useOrientation';

import animalImages from './AnimalImages';
import fruitImages from './FruitImages';

import animalData from './animals';
import fruitsData from './fruits';

import SessionFinishedScreen from '../SessionFinished';
import GameInstructions from '../Instructions';

import {Button, Loader} from '../../components';
import {WHITE_COLOR, PURPLE_COLOR} from '../../assets/styles';

const MAX_TRAINING_LEVELS = 10;
const MAX_LEVEL = 40;

/* Instrucciones Iniciales */
const ShowcaseInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="intro" />
  );
};

/* Item Animal */
const AnimalItem = props => {
  const orientation = useOrientation();
  const {image} = props.animal;
  return (
    <View>
      <View>
        <ImageBackground
          source={image}
          style={{
            justifyContent: 'center',
            width: orientation.width * 0.45,
            height: orientation.width * 0.45,
          }}
        />
      </View>
    </View>
  );
};

/* Showcase de Animales */
const ShowcaseAnimals = ({setStage}) => {
  return (
    <View style={styles.showcaseContainer}>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        horizontal={true}
        data={animalImages}
        renderItem={({item}) => <AnimalItem animal={item} />}
        keyExtractor={(item, index) => index.toString()}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
      <Button
        text={`CONTINUAR`}
        backgroundColor={PURPLE_COLOR}
        fontColor={WHITE_COLOR}
        marginForText={45}
        width={'70%'}
        marginVertical={30}
        marginBottom={25}
        customStyles={{fontWeight: 'thin'}}
        onPress={() => setStage(s => s + 1)}
      />
    </View>
  );
};

const FruitItem = props => {
  const orientation = useOrientation();
  const {image} = props.fruit;
  return (
    <View>
      <View>
        <ImageBackground
          source={image}
          style={{
            justifyContent: 'center',
            width: orientation.width * 0.45,
            height: orientation.width * 0.45,
          }}
        />
      </View>
    </View>
  );
};

const ShowcaseFruits = ({setStage}) => {
  return (
    <View style={styles.showcaseContainer}>
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        horizontal={true}
        data={fruitImages}
        renderItem={({item}) => <FruitItem fruit={item} />}
        keyExtractor={(item, index) => index.toString()}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
      <Button
        text={`CONTINUAR`}
        backgroundColor={PURPLE_COLOR}
        fontColor={WHITE_COLOR}
        marginForText={45}
        width={'70%'}
        marginVertical={30}
        marginBottom={25}
        customStyles={{fontWeight: 'thin'}}
        onPress={() => setStage(s => s + 1)}
      />
    </View>
  );
};

/* Instrucciones de la Prueba */
const TestInstructions = ({onNextStageHandler}) => {
  return (
    <GameInstructions
      onNextStageHandler={onNextStageHandler}
      stage="training"
    />
  );
};

/* Prueba */
const Prueba = ({setStage}) => {
  const orientation = useOrientation();

  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [numberOfTouches, setNumberOfTouches] = useState(0);
  const colors = ['#1ea1e6', '#FFFFFF'];
  const [animalImage, setAnimalImage] = useState(' ');
  const [fruitImage, setFruitImage] = useState(' ');
  const [currentAnimalImage, setCurrentAnimalImage] = useState(0);
  const [currentFruitImage, setCurrentFruitImage] = useState(0);
  const [animals] = useState(animalData);
  const [fruits] = useState(fruitsData);

  useEffect(() => {
    newImage();
    next();
    changeBackground();
  }, []);

  const newImage = () => {
    setAnimalImage(animals[currentAnimalImage].image);
    setFruitImage(fruits[currentFruitImage].image);
    changeBackground();
  };

  const next = () => {
    let index = Math.floor(Math.random() * (4 - 0)) + 0;
    while (index === currentAnimalImage) {
      index = Math.floor(Math.random() * (4 - 0)) + 0;
    }
    setCurrentAnimalImage(index);
    setCurrentFruitImage(index);
    newImage();
  };

  const changeBackground = () => {
    let index = Math.floor(Math.random() * (2 - 0)) + 0;

    while (index === colors) {
      index = Math.floor(Math.random() * (2 - 0)) + 0;
    }

    let newBackgroundColor = colors[index];

    setBackgroundColor(newBackgroundColor);
    setNumberOfTouches(numberOfTouches + 1);
    checkIfCompleted();
  };

  const checkIfCompleted = () => {
    if (numberOfTouches === MAX_TRAINING_LEVELS) {
      setStage(stage => stage + 1);
    }
  };

  return (
    <View style={[styles.gameContainer, {backgroundColor: backgroundColor}]}>
      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => {
            next();
          }}>
          <Image
            source={
              typeof animalImage === 'string' ? {uri: animalImage} : animalImage
            }
            style={{
              justifyContent: 'center',
              width: orientation.width * 0.4,
              height: orientation.width * 0.4,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => {
            next();
          }}>
          <Image
            source={
              typeof fruitImage === 'string' ? {uri: fruitImage} : fruitImage
            }
            style={{
              justifyContent: 'center',
              width: orientation.width * 0.4,
              height: orientation.width * 0.4,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* Instrucciones Juego CompletoS */
const InstruccionesJuegoCompleto = ({onNextStageHandler}) => {
  return (
    <GameInstructions onNextStageHandler={onNextStageHandler} stage="normal" />
  );
};

/* Juego Completo */
const JuegoCompleto = ({
  setStage,
  setPressed,
  setIsRunning,
  puntos,
  setPuntos,
  data,
}) => {
  const orientation = useOrientation();

  const [backgroundColor, setBackgroundColor] = useState('rgb(255, 255, 255)');
  const [numberOfTouches, setNumberOfTouches] = useState(0);
  const colors = ['#1ea1e6', '#FFFFFF'];
  const [animalImage, setAnimalImage] = useState(' ');
  const [fruitImage, setFruitImage] = useState(' ');
  const [currentAnimalImage, setCurrentAnimalImage] = useState(0);
  const [currentFruitImage, setCurrentFruitImage] = useState(0);
  const [animals] = useState(animalData);
  const [fruits] = useState(fruitsData);

  const [correctAnimal, setCorrectAnimal] = useState('');
  const [correctFruit, setCorrectFruit] = useState('');

  const [animal, setAnimal] = useState('');
  const [fruit, setFruit] = useState('');

  useEffect(() => {
    newImage();
    next();
    changeBackground();
  }, []);

  const newImage = () => {
    setAnimalImage(animals[currentAnimalImage].image);
    setFruitImage(fruits[currentFruitImage].image);
    setAnimal(animals[currentAnimalImage].animal);
    setFruit(animals[currentAnimalImage].fruta);
    setCorrectAnimal(animals[currentAnimalImage].correcta);
    setCorrectFruit(animals[currentAnimalImage].correctaF);
    changeBackground();
  };

  const next = () => {
    let index = Math.floor(Math.random() * (4 - 0)) + 0;
    while (index === currentAnimalImage) {
      index = Math.floor(Math.random() * (4 - 0)) + 0;
    }
    setCurrentAnimalImage(index);
    setCurrentFruitImage(index);
    newImage();
  };

  const changeBackground = () => {
    let index = Math.floor(Math.random() * (2 - 0)) + 0;

    while (index === colors) {
      index = Math.floor(Math.random() * (2 - 0)) + 0;
    }

    let newBackgroundColor = colors[index];

    setBackgroundColor(newBackgroundColor);
    setNumberOfTouches(numberOfTouches + 1);
    checkIfCompleted();
  };

  const checkIfCompleted = () => {
    if (numberOfTouches === MAX_LEVEL) {
      setIsRunning(false);
      setStage(stage => stage + 1);
    }
  };
  const checkAnimal = option => {
    if (backgroundColor === colors[1]) {
      if (option === correctAnimal) {
        setPuntos(puntos + 1);
      }
    }
    data.push(backgroundColor === colors[1] && option === correctAnimal);
    setPressed(true);
    next();
  };
  const checkFruit = option => {
    if (backgroundColor === colors[0]) {
      if (option === correctFruit) {
        setPuntos(puntos + 1);
      }
    }
    data.push(backgroundColor === colors[0] && option === correctFruit);
    setPressed(true);
    next();
  };

  return (
    <View style={[styles.gameContainer, {backgroundColor: backgroundColor}]}>
      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => {
            checkAnimal(animal);
          }}>
          <Image
            source={
              typeof animalImage === 'string' ? {uri: animalImage} : animalImage
            }
            style={{
              justifyContent: 'center',
              width: orientation.width * 0.4,
              height: orientation.width * 0.4,
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <TouchableOpacity
          onPress={() => {
            checkFruit(fruit);
          }}>
          <Image
            source={
              typeof fruitImage === 'string' ? {uri: fruitImage} : fruitImage
            }
            style={{
              justifyContent: 'center',
              width: orientation.width * 0.4,
              height: orientation.width * 0.4,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GameThreeScreen = props => {
  const [stage, setStage] = useState(0);

  const previousTime = useRef(0);
  const [levelTime, setLevelTime] = useState(0);
  const [level] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [reactionTime] = useState([]);
  const [puntos, setPuntos] = useState(0);
  const [data] = useState([]);

  let startDate = useRef(null);
  let endDate = useRef(null);

  const onNextStageHandler = () => {
    switch (stage) {
      case 0: // Si se avanza de stage, y está en stage 0(Primeras instrucciones), se comienza el training
        setStage(stage + 1); // Avanzo al siguiente stage
        break;
      case 3:
        setStage(stage + 1); // Avanzo al siguiente stage
        break;
      case 5:
        setIsRunning(true);
        setStage(stage + 1); // Avanzo al siguiente stage
        startDate.current = new Date();
        break;
    }
  };

  let seconds, milliseconds;
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      seconds = new Date().getSeconds(); //To get the Current Seconds
      milliseconds = new Date().getMilliseconds(); //To get the Current Seconds
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let value = null;
        if (level % 2 === 0) {
          value = 1000;
        } else {
          value = 200;
        }
        let id = setInterval(tick, value);
        return () => {
          clearInterval(id);
        };
      }
    });
  }

  useInterval(
    () => {
      setLevelTime(levelTime + 1);
    },
    isRunning ? 1000 : null,
  );

  const getReactionTime = () => {
    reactionTime.push(levelTime - previousTime.current);
    previousTime.current = levelTime;
    setPressed(false);
    setLevelTime(levelTime + 1);
  };

  useEffect(() => {
    if (pressed) {
      getReactionTime();
    }
  });

  const screens = [
    {
      id: 0,
      component: ShowcaseInstructions,
    },
    {
      id: 1,
      component: ShowcaseAnimals,
    },
    {
      id: 2,
      component: ShowcaseFruits,
    },
    {
      id: 3,
      component: TestInstructions,
    },
    {
      id: 5,
      component: Prueba,
    },
    {
      id: 6,
      component: InstruccionesJuegoCompleto,
    },
    {
      id: 7,
      component: JuegoCompleto,
    },
  ];

  useEffect(() => {
    if (stage == screens.length) {
      if (!props.isGuest) {
        endDate.current = new Date();
        props.addStudentResults(props.game.title, props.studentCode, {
          totalTime: levelTime,
          realTime: Math.abs(startDate.current - endDate.current),
          reactionTime,
          numberOfErrors: MAX_LEVEL - puntos,
          success: puntos,
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
            setIsRunning={setIsRunning}
            setPressed={setPressed}
            getReactionTime={getReactionTime}
            onNextStageHandler={onNextStageHandler}
            puntos={puntos}
            setPuntos={setPuntos}
            endDate={endDate}
            data={data}
          />
        ) : null,
      )}
    </>
  );
};

const styles = StyleSheet.create({
  showcaseContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameContainer: {
    padding: 12,
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: '#0071BC',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameThreeScreen;
