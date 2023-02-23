/*

  El Splash screen deberá mostrar los logos de las dos universidades involucradas en el proyecto. Este durará 5 segundos y luego redireccionará al Landing Screen.

*/

import React, {useContext} from 'react';
import {Image, StyleSheet, ImageBackground} from 'react-native';

import {LayoutContext} from '../../context/LayoutContext';

import SplashBackground from '../../assets/images/FondoSplash.png';
import LogoUDLA from '../../assets/images/global/LogoGris_UDLA.png';
import LogoUSC from '../../assets/images/LogoUSC_B.png';

import {Brand} from '../../components';
import {FadeIn} from '../../components';

const SplashScreen = () => {
  const {orientation} = useContext(LayoutContext);

  return (
    <ImageBackground source={SplashBackground} style={styles.screenContainer}>
      <FadeIn style={styles.brand}>
        <Brand type="white" size="large" orientation={orientation} />
      </FadeIn>
      <FadeIn style={styles.imagesContainer}>
        <Image
          style={{
            resizeMode: 'contain',
            width: orientation.width * 0.125,
            height: orientation.width * 0.125,
          }}
          source={LogoUDLA}
        />
        <Image
          style={{
            resizeMode: 'contain',
            width: orientation.width * 0.125,
            height: orientation.width * 0.125,
          }}
          source={LogoUSC}
        />
      </FadeIn>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagesContainer: {
    width: '75%',
    flex: 2,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default SplashScreen;
