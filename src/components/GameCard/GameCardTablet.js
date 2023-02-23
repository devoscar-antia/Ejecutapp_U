import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  COCO_BOLD,
  MULI_MEDIUM,
  PURPLE_COLOR,
  SHADOWS,
  WHITE_COLOR,
} from '../../assets/styles';
import {GameBadge} from './GameBadge';

export const GameCardTablet = ({game, orientation, selectGame}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.gameCardGrid,
        height: orientation.width * 0.285,
      }}
      key={game.id}
      onPress={() => selectGame(game.id)}>
      {game.completed ? <GameBadge /> : null}
      <Image source={game.image} style={{...styles.gameImageGrid}} />
      <Text
        style={{...styles.gameTitleGrid, fontSize: orientation.width * 0.015}}>
        {game.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gameCardGrid: {
    borderColor: WHITE_COLOR,
    ...SHADOWS.light,
    width: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    position: 'relative',
  },
  gameImageGrid: {
    width: '85%',
    height: '70%',
    position: 'relative',
  },
  gameTitleGrid: {
    marginTop: 20,
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    textAlign: 'center',
  },
  gameDescription: {
    fontFamily: MULI_MEDIUM,
  },
});
