import React, {useContext} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {LayoutContext} from '../../context/LayoutContext';

import {
  WHITE_COLOR,
  PURPLE_COLOR,
  WINDOW_HEIGHT,
  BACKGROUND_COLOR,
} from '../../assets/styles';

import {Button} from '../../components';
import {LandingHeader} from '../../components';

const LandingScreen = ({startGuestSession, navigation}) => {
  const {orientation, isMobile} = useContext(LayoutContext);

  const onPressGuestSessionButton = () => {
    startGuestSession();
  };

  return (
    <ScrollView
      style={{
        ...styles.screenContainer,
        width: orientation.width,
        height: orientation.height,
      }}>
      <LandingHeader orientation={orientation} isMobile={isMobile} />
      <View style={styles.buttons}>
        <Button
          onPress={() => navigation.navigate('Login')}
          text="Iniciar sesión"
          icon="arrow-right"
          iconPosition="right"
          width={'60%'}
          backgroundColor={PURPLE_COLOR}
          fontColor={WHITE_COLOR}
          marginBottom={25}
          marginForText={15}
          orientation={orientation}
        />
        <Button
          onPress={onPressGuestSessionButton}
          text="Invitado"
          icon="users"
          iconPosition="left"
          backgroundColor={WHITE_COLOR}
          fontColor={PURPLE_COLOR}
          width={'60%'}
          marginForText={15}
          orientation={orientation}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: WINDOW_HEIGHT,
  },
  buttons: {
    width: '100%',
    height: '30%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: '10%',
  },
});

export default LandingScreen;
