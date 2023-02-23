import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

import {
  WHITE_COLOR,
  PURPLE_COLOR,
  COCO_BOLD,
  MULI_MEDIUM,
  MOBILE,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';
import {GameBadge} from './GameBadge';

export const GameCard = ({
  game,
  orientation = useOrientation(),
  selectGame,
}) => {
  return (
    <TouchableOpacity
      style={styles.game}
      key={game.id}
      onPress={() => selectGame(game.id)}>
      {game.completed ? <GameBadge /> : null}
      <Image
        source={game.image}
        style={{
          ...styles.gameImage,
          height: orientation.width <= MOBILE ? '100%' : 100,
        }}
      />
      <View style={styles.gameContent}>
        <Text
          style={{
            ...styles.gameTitle,
            fontSize:
              orientation.width <= MOBILE
                ? orientation.width * 0.04
                : orientation.width * 0.03,
          }}>
          {game.title}
        </Text>
        <Text
          style={{
            ...styles.gameDescription,
            fontSize:
              orientation.width <= MOBILE
                ? orientation.width * 0.03
                : orientation.width * 0.025,
          }}>
          {game.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  game: {
    width: '90%',
    backgroundColor: WHITE_COLOR,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginVertical: 10,
    height: 'auto',
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 100,
    elevation: 10,
    position: 'relative',
  },
  gameImage: {
    width: '30%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: '-7.5%',
  },
  gameContent: {
    width: '100%',
  },
  gameTitle: {
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
  },
  gameDescription: {
    fontFamily: MULI_MEDIUM,
  },
});
