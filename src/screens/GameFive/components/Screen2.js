import React, {useState, useContext, useEffect} from 'react';
import {directLevels, inverseLevels} from '../data/index';
import sourceFiles from '../data/sources_files';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import imgGlobos from '../data/sources';
import {LayoutContext} from '../../../context/LayoutContext';
import {useRef} from 'react';

const Screen2 = props => {
  const [nivel, setNivel] = useState(props.historyGame.nivel);
  const [subNivel, setSubNivel] = useState(props.historyGame.subNivel);
  const [direct, setDirect] = useState(props.historyGame.direct);
  const [countErrors, setCountErrors] = useState(props.historyGame.countErrors);
  const startDateOfLevel = useRef(null);
  const endDateOfLevel = useRef(null);

  const {orientation, isMobile} = useContext(LayoutContext);

  const [globos, setGlobos] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
    0: true,
  });

  useEffect(() => {
    startDateOfLevel.current = new Date();
  }, []);

  const stateGlobo = globoIndex => {
    setGlobos({...globos, [globoIndex]: !globos[globoIndex]});
  };

  const verifyGame = () => {
    /**
     * Obtener niveles dependiendo de si es juego directo o juego invertido
     */
    const dataLevels = direct ? directLevels[nivel] : inverseLevels[nivel];

    /**
     * Inicializar variables locales en base a estado
     */
    let errors = 0; /** Errores Nivel */
    let countErrorsGlobals = countErrors;
    let subNivelGlobals = subNivel;
    let nivelGlobals = nivel;

    /**
     * Obtener Niveles por Intento
     * 0 - Primer Intento
     * 1 - Segundo Intento
     */
    const chanceLevels =
      subNivelGlobals == 0 ? dataLevels.firstChance : dataLevels.secondChance;

    /**
     *  Globos, es un Objeto que indica si un globo fue clickeado o no
     */

    for (let globoIndex in globos) {
      if (chanceLevels.includes(parseInt(globoIndex))) {
        if (globos[globoIndex] === true) errors += 1;
      } else {
        if (globos[globoIndex] === false) errors += 1;
      }
    }

    console.log(`Nivel: ${nivelGlobals}`);
    console.log(`SubNivel: ${subNivelGlobals}`);
    console.log(`Errores totales: ${errors}`);
    endDateOfLevel.current = new Date();

    /**
     *  Si tuvo Errores, subo los errores globlales
     */

    if (errors) {
      countErrorsGlobals += 1; // Aumenta 1 error si se equivoca en un Test
      setCountErrors(countErrorsGlobals);
    }

    if (props.levelData[nivel] !== undefined) {
      props.levelData[nivel][subNivel] = {
        hasError: Boolean(errors),
        elapsedTime: Math.abs(
          startDateOfLevel.current - endDateOfLevel.current,
        ),
      };
    } else {
      props.levelData[nivel] = {
        [subNivel]: {
          hasError: Boolean(errors),
          elapsedTime: Math.abs(
            startDateOfLevel.current - endDateOfLevel.current,
          ),
        },
      };
    }

    console.log(`Errores Globales: ${countErrorsGlobals}`);

    const toInverseLevels = () => {
      const directData = {
        ...props.levelData,
        maxLevelReached: nivel + 1,
        levelsFailed: countErrorsGlobals,
      };
      setDirect(false);
      setCountErrors(0);
      setNivel(0);
      setSubNivel(0);

      props.setHistoryGame({
        nivel: 0,
        subNivel: 0,
        direct: false,
        countErrors: 0,
      });

      props.setData({
        ...props.data,
        directData,
      });

      props.setLevelData({});

      props.setStartGame(false);

      console.log('Test Inverso iniciado!');
    };

    const finishGame = () => {
      const inverseData = {
        ...props.levelData,
        maxLevelReached: nivel + 1,
        levelsFailed: countErrorsGlobals,
      };

      props.setData({
        ...props.data,
        inverseData,
      });
      console.log('Juego Finalizado en Ambos Test!');
      props.setScreen(2);
      console.log(props);
    };

    if (countErrorsGlobals == 2) {
      /**
       * Si tiene 2 Errores pasamos al Test Inverso.
       * Caso contrario si ya esta en el Test Inverso
       * y se ha euivocado 2 veces finaliza el juego.
       *  */
      if (direct) {
        toInverseLevels();
      } else {
        finishGame();
      }
      return;
    }

    subNivelGlobals += 1;
    setSubNivel(subNivelGlobals);

    if (
      direct &&
      nivel >= Object.keys(directLevels).length - 1 &&
      subNivelGlobals > 1
    ) {
      console.log('Entro auqi');
      toInverseLevels();
      return;
    }

    if (
      !direct &&
      nivel >= Object.keys(inverseLevels).length - 1 &&
      subNivelGlobals > 1
    ) {
      finishGame();
      return;
    }

    // # Si el [subnivel esta vacio o si se realizaron los 2 subniveles] comienza un nuevo nivel
    if (dataLevels.secondChance.length < 1 || subNivelGlobals > 1) {
      nivelGlobals += 1;
      subNivelGlobals = 0;
      setNivel(nivelGlobals);
      setSubNivel(subNivelGlobals);
    }

    props.setHistoryGame({
      ...props.historyGame,
      nivel: nivelGlobals,
      subNivel: subNivelGlobals,
      direct: direct,
      countErrors: countErrorsGlobals,
    });

    props.setStartGame(false);
  };

  const sourceGlobo = indexGlobo => {
    return direct
      ? globos[indexGlobo] === false
        ? imgGlobos[indexGlobo].d[0]
        : imgGlobos[indexGlobo].d[1]
      : globos[indexGlobo] === true
      ? imgGlobos[indexGlobo].i[0]
      : imgGlobos[indexGlobo].i[1];
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: direct
            ? 'https://i.postimg.cc/FspYzk1W/Der-Fondo.png'
            : 'https://i.postimg.cc/xdB3TgkW/Rev-Fondo.png',
        }}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View
          style={{...styles.balloonRow, paddingTop: orientation.width * 0.035}}>
          {[...Array(5)]
            .fill(0)
            .map((value, index) => value + index)
            .map(value => (
              <TouchableOpacity onPress={() => stateGlobo(value)} key={value}>
                <Image
                  style={{
                    ...styles.balloon,
                    width: orientation.width * (isMobile ? 0.1 : 0.08),
                    flex: 1,
                    marginTop: value % 2 == 0 ? 0 : orientation.width * 0.025,
                  }}
                  source={sourceGlobo(value)}
                />
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.balloonRow}>
          {[...Array(5)]
            .fill(5)
            .map((value, index) => value + index)
            .map(value => (
              <TouchableOpacity onPress={() => stateGlobo(value)} key={value}>
                <Image
                  style={{
                    ...styles.balloon,
                    width: orientation.width * (isMobile ? 0.1 : 0.08),
                    flex: 1,
                    marginTop: value % 2 == 0 ? 0 : orientation.width * 0.025,
                  }}
                  source={sourceGlobo(value)}
                />
              </TouchableOpacity>
            ))}
        </View>
        <View style={{...styles.balloonRow}}>
          <TouchableOpacity onPress={() => verifyGame()}>
            <Image
              style={{
                ...styles.nextButton,
                flex: 1,
                width: orientation.width * (isMobile ? 0.175 : 0.125),
              }}
              source={sourceFiles.img.btnseguir_s}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

//Estilos
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  imageBackground: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  balloonRow: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
  },
  balloon: {
    resizeMode: 'contain',
  },
  nextButton: {
    resizeMode: 'contain',
  },
});

export default Screen2;
