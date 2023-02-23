import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {
  COCO_BOLD,
  COCO_REGULAR,
  GRAY,
  PURPLE_COLOR,
  WHITE_COLOR,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const Brand = ({
  size,
  type,
  orientation = useOrientation(),
  customStyles,
}) => {
  let percentage = 0.15;
  let background;

  switch (size) {
    case 'small':
      percentage = 0.035;
      break;
    case 'medium':
      percentage = 0.05;
      break;
    case 'large':
      percentage = 0.125;
      break;
    case 'extralarge':
    default:
  }

  switch (type) {
    case 'white':
      background = PURPLE_COLOR;
      break;
    case 'original':
    default:
      background = WHITE_COLOR;
  }

  return (
    <View style={{...styles.brand, ...customStyles}}>
      <Text>
        <Text
          style={{
            ...styles.title,
            fontSize: orientation.width * percentage,
            color: background === PURPLE_COLOR ? WHITE_COLOR : GRAY,
          }}>
          Ejecut
        </Text>
        <Text
          style={{
            ...styles.titleBold,
            fontSize: orientation.width * percentage,
            color: background === PURPLE_COLOR ? WHITE_COLOR : PURPLE_COLOR,
          }}>
          app
        </Text>
      </Text>
    </View>
  );
};

Button.defaultProps = {
  size: 'large',
  type: 'original',
};

const styles = StyleSheet.create({
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: COCO_REGULAR,
  },
  titleBold: {
    fontFamily: COCO_BOLD,
  },
});
