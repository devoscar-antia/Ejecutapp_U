/*
  El Loader deberá mostrar una animación que refleje que está cargando. Se mostrará en los siguientes casos:
    - Antes de mostrar el menú.

  Esta pantalla se mostrará mientras se hacen los siguientes procesos:
    1. Descargar los estudiantes del docente y settearlos en Redux.
    2. Mostrar el Menú cuando ya esté terminada la descarga.
*/

import React from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import {BACKGROUND_COLOR} from '../../assets/styles/';

import LoaderAnimation from '../../assets/animations/loaderAnimation.json';
const LOTTIE_SIZE = 300;

const LoaderScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <LottieView
        style={{width: LOTTIE_SIZE, height: LOTTIE_SIZE}}
        source={LoaderAnimation}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    paddingHorizontal: 80,
    paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderScreen;
