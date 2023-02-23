import React, {useState} from 'react';

import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {directLevels, inverseLevels} from '../data/index';
import sourceFiles from '../data/sources_files';
import Screen2 from './Screen2';
import {Loader} from '../../../components';
import {LayoutContext} from '../../../context/LayoutContext';
import {useContext} from 'react';

const Screen1 = props => {
  const [startGame, setStartGame] = useState(false);
  const [loading] = useState(false);
  const [disableBoolPlay, setdisableBoolPlay] = useState(false);
  const [historyGame, setHistoryGame] = useState({
    nivel: 0,
    subNivel: 0,
    direct: true,
    countErrors: 0,
  });
  const [levelData, setLevelData] = useState({});

  if (loading) {
    return <Loader />;
  }

  const {orientation} = useContext(LayoutContext);

  const playOtherSong = async () => {
    console.log('> INICIANDO SONIDO');
    console.log(historyGame);
    console.log(JSON.stringify(props.data));
    setdisableBoolPlay(true);
    if (historyGame.direct) {
      await directLevels[historyGame.nivel].startAudioGame(
        historyGame.subNivel,
      );
    } else {
      await inverseLevels[historyGame.nivel].startAudioGame(
        historyGame.subNivel,
      );
    }
    setdisableBoolPlay(false);
    console.log('Finalizado');
    setStartGame(true);
  };

  if (!startGame) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: historyGame.direct
              ? 'https://i.postimg.cc/FspYzk1W/Der-Fondo.png'
              : 'https://i.postimg.cc/xdB3TgkW/Rev-Fondo.png',
          }}
          resizeMode="cover"
          style={styles.imageBackground}>
          <TouchableOpacity
            disabled={disableBoolPlay}
            onPress={() => {
              playOtherSong();
            }}>
            <Image
              style={{...styles.playButton, width: orientation.width * 0.5}}
              source={sourceFiles.img.der_btn}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <Screen2
        setScreen={props.setScreen}
        historyGame={historyGame}
        setHistoryGame={setHistoryGame}
        setStartGame={setStartGame}
        data={props.data}
        setData={props.setData}
        levelData={levelData}
        setLevelData={setLevelData}
      />
    );
  }
};

/* Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  playButton: {
    resizeMode: 'contain',
  },
});

export default Screen1;
