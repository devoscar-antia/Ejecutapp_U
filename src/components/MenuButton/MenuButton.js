import React from 'react';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

import {COCO_BOLD, MOBILE, PURPLE_COLOR} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const MenuButton = ({
  image,
  onPress,
  text,
  marginBottom,
  orientation = useOrientation(),
}) => {
  let percentage = orientation.width <= MOBILE ? 0.03 : 0.02;

  return (
    <TouchableOpacity
      style={{
        ...styles.buttonContainer,
        marginBottom: marginBottom ? marginBottom : 0,
      }}
      onPress={onPress}>
      {image ? (
        <Image
          style={{
            ...styles.buttonImage,
            width: orientation.width * 0.15,
            height: orientation.width * 0.075,
          }}
          source={image}
        />
      ) : null}
      <Text
        style={{
          ...styles.buttonText,
          fontSize: orientation.width * percentage,
          textAlign: 'center',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    height: 'auto',
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 10,
  },
  buttonImage: {
    height: '100%',
  },
  buttonText: {
    width: '60%',
    textAlign: 'center',
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
  },
});

export default MenuButton;
