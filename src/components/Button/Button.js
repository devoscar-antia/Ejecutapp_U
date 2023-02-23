import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-feather1s';

import {COCO_BOLD, MOBILE} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const Button = ({
  onPress,
  text,
  icon,
  iconPosition,
  backgroundColor,
  width = '90%',
  height,
  fontWeight,
  fontColor,
  fontFamily,
  textAlign,
  padding = 15,
  marginBottom = 0,
  marginVertical = 0,
  marginHorizontal = 0,
  marginForText,
  orientation = useOrientation(),
}) => {
  let percentage = orientation.width <= MOBILE ? 0.04 : 0.03;

  const calculateMarginRight = position => {
    if (position === 'left') {
      return {marginLeft: marginForText};
    } else {
      return {marginRight: marginForText};
    }
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        width,
        height,
        padding,
        backgroundColor,
        marginBottom,
        marginVertical,
        marginHorizontal,
      }}
      onPress={onPress}>
      {iconPosition === 'left' && (
        <Icon
          name={icon}
          size={orientation.width * percentage}
          color={fontColor}
          thin={false}
        />
      )}
      <Text
        numberOfLines={1}
        style={{
          ...styles.buttonText,
          fontWeight,
          fontFamily: fontFamily || COCO_BOLD,
          color: fontColor,
          textAlign,
          fontSize: orientation.width * percentage,
          ...calculateMarginRight(iconPosition),
        }}>
        {text}
      </Text>
      {iconPosition === 'right' && (
        <Icon
          name={icon}
          size={orientation.width * percentage}
          color={fontColor}
          thin={false}
        />
      )}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  width: 'auto',
  height: 60,
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 5,
  },
  buttonText: {
    fontFamily: COCO_BOLD,
  },
});

export default Button;
