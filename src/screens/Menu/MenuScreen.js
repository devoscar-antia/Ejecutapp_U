import React, {useContext, useEffect} from 'react';

import {StyleSheet, View} from 'react-native';

import {LayoutContext} from '../../context/LayoutContext';

import menuImageOne from '../../assets/images/MenuItemOne.png';
import menuImageTwo from '../../assets/images/MenuItemTwo.png';
import menuImageThree from '../../assets/images/MenuItemThree.png';

import {MenuButton, Button} from '../../components';
import LoaderScreen from '../Loader';

import {BACKGROUND_COLOR, PURPLE_COLOR, WHITE_COLOR} from '../../assets/styles';
import {ScrollView} from 'react-native-gesture-handler';

const MenuScreen = ({
  navigation,
  logoutUser,
  isGuest,
  isFetching,
  fetchAllOwnStudents,
  userEmail,
}) => {
  const {orientation} = useContext(LayoutContext);

  const onPressMenuButton = location => {
    navigation.navigate(location);
  };

  const onPressExitButton = location => {
    logoutUser();
    navigation.navigate(location);
  };

  useEffect(() => {
    if (!isGuest) {
      fetchAllOwnStudents(userEmail);
    }
  }, []);

  return isFetching ? (
    <LoaderScreen />
  ) : (
    <ScrollView
      style={{...styles.screenContainer}}
      contentContainerStyle={styles.scrollAlignment}>
      {!isGuest && (
        <>
          <MenuButton
            image={menuImageOne}
            onPress={() => onPressMenuButton('RegisterStudent')}
            text="Registrar estudiante"
            marginBottom={20}
            orientation={orientation}
          />
          <MenuButton
            image={menuImageTwo}
            onPress={() => onPressMenuButton('StudentsList')}
            text="Lista de estudiantes"
            marginBottom={20}
            orientation={orientation}
          />
        </>
      )}
      <MenuButton
        image={menuImageThree}
        onPress={() => onPressMenuButton('GamesMenu')}
        text={isGuest ? 'Menú de Juegos' : 'Evaluar estudiante'}
        marginBottom={20}
        orientation={orientation}
      />
      <Button
        backgroundColor={PURPLE_COLOR}
        fontColor={WHITE_COLOR}
        width={'60%'}
        onPress={() => onPressExitButton('LoginScreen')}
        text="Salir"
        orientation={orientation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 100,
  },
  scrollAlignment: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '20%',
  },
  buttons: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
