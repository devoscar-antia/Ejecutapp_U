import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {
  BACKGROUND_COLOR,
  COCO_BOLD,
  MOBILE,
  PURPLE_COLOR,
  WHITE_COLOR,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const Label = ({text, customStyles, orientation = useOrientation()}) => {
  let percentage = orientation.width <= MOBILE ? 0.04 : 0.03;
  return (
    <Text
      style={{
        ...styles.label,
        fontSize: orientation.width * percentage,
        ...customStyles,
      }}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: BACKGROUND_COLOR === PURPLE_COLOR ? WHITE_COLOR : PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    marginBottom: 15,
  },
});
