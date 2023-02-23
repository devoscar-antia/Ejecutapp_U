import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from '../../components';
import {
  BACKGROUND_COLOR,
  PURPLE_COLOR,
  COCO_BOLD,
  WHITE_COLOR,
} from '../../assets/styles';
import {GamesContext} from '../../context/GamesContext';
import {LayoutContext} from '../../context/LayoutContext';

const SessionFinishedScreen = ({navigation, selectedStudent, isGuest}) => {
  const {getStudentResults} = useContext(GamesContext);
  const {orientation} = useContext(LayoutContext);

  useEffect(() => {
    if (!isGuest) {
      getStudentResults(selectedStudent);
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text
          style={{...styles.headerText, fontSize: orientation.width * 0.075}}>
          Juego terminado
        </Text>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            navigation.navigate('GamesMenu');
          }}
          text="Regresar al menú de juegos"
          icon="arrow-left"
          iconPosition="left"
          backgroundColor={PURPLE_COLOR}
          fontColor={WHITE_COLOR}
          marginForText={30}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    paddingHorizontal: 79,
    paddingVertical: 80,
  },
  header: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    fontSize: 48,
  },
  buttons: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default SessionFinishedScreen;
