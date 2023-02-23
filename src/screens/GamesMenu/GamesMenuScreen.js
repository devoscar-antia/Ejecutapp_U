import React, {useState, useEffect, useContext} from 'react';

import {ScrollView, StyleSheet} from 'react-native';
import {
  Dropdown,
  Label,
  GameCard,
  NavigationHeader,
  ErrorModal,
  GameList,
  GameGrid,
  GameCardTablet,
  Loader,
} from '../../components';
import {BACKGROUND_COLOR} from '../../assets/styles';
import {LayoutContext} from '../../context/LayoutContext';
import {TopHeaderTablet} from '../../components';
import {GamesContext} from '../../context/GamesContext';

const GamesMenuScreen = ({
  navigation,
  setSelectedGame,
  selectedStudent,
  setSelectedStudent,
  isGuest,
  userEmail,
  setGame,
  studentsList = [],
  gamesList = [],
  fetchAllOwnStudents,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const {orientation, isMobile, isLoading} = useContext(LayoutContext);
  const {games, getStudentResults, resetGameStatus} = useContext(GamesContext);

  useEffect(() => {
    if (!isGuest) {
      fetchAllOwnStudents(userEmail);
    }
    return () => {
      setSelectedGame(null);
      setSelectedStudent(null);
      resetGameStatus();
    };
  }, []);

  let dropdownStudents;
  if (!isGuest) {
    dropdownStudents =
      studentsList?.length > 0
        ? studentsList.map(student => {
            const {names, surnames} = student;
            return {
              label: `${names} ${surnames}`,
              value: student._id,
            };
          })
        : [];
  }

  const onSelectStudent = studentId => {
    setSelectedStudent(studentId);
    getStudentResults(studentId);
  };

  const onPressGameButton = gameNumber => {
    setSelectedGame(gameNumber);
    setGame(gamesList[gameNumber]);

    if (!isGuest && !selectedStudent) {
      setModalMessage('Debes seleccionar un estudiante primero.');
      setModalVisible(true);
      return;
    }

    const {gameScreen} = gamesList[gameNumber];
    navigation.navigate(gameScreen);
  };

  return (
    <ScrollView style={styles.screenContainer}>
      {isMobile ? (
        <>
          <NavigationHeader
            navigation={navigation}
            orientation={orientation}
            title={'Galería de Estímulos'}
          />
          {!isGuest && (
            <Dropdown
              labelText="Seleccionar estudiante"
              placeholder="Elige un estudiante..."
              items={dropdownStudents}
              onValueChange={onSelectStudent}
              value={selectedStudent}
              orientation={orientation}
              labelAlign={'center'}
            />
          )}
          <Label
            text="Seleccionar juego"
            customStyles={{textAlign: 'center'}}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <GameList>
              <ErrorModal
                state={modalVisible}
                message={modalMessage}
                onDismiss={setModalVisible}
              />
              {games.map(game => {
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    orientation={orientation}
                    selectGame={onPressGameButton}
                  />
                );
              })}
            </GameList>
          )}
        </>
      ) : (
        <>
          <TopHeaderTablet
            orientation={orientation}
            goBack={() => {
              navigation.navigate('Menu');
            }}>
            {!isGuest && (
              <Dropdown
                placeholder="Elige un estudiante..."
                items={dropdownStudents}
                onValueChange={onSelectStudent}
                value={selectedStudent}
                orientation={orientation}
              />
            )}
          </TopHeaderTablet>
          <ErrorModal
            state={modalVisible}
            message={modalMessage}
            onDismiss={setModalVisible}
          />
          {isLoading ? (
            <Loader />
          ) : (
            <GameGrid orientation={orientation}>
              {games.map(game => {
                return (
                  <GameCardTablet
                    key={game.id}
                    game={game}
                    orientation={orientation}
                    selectGame={onPressGameButton}
                  />
                );
              })}
            </GameGrid>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
  header: {
    width: '100%',
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default GamesMenuScreen;
