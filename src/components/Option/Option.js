import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  COCO_BOLD,
  PURPLE_SECONDARY_COLOR,
  SHADOWS,
  WHITE_COLOR,
} from '../../assets/styles';

export const Option = ({
  icon,
  size,
  color,
  backgroundColor,
  onPress,
  thin,
  text,
  customStyles = {},
  fontSize,
  fontFamily = COCO_BOLD,
}) => {
  return (
    <TouchableOpacity
      style={{...styles.option, backgroundColor, ...customStyles}}
      onPress={onPress}>
      <View style={styles.optionContent}>
        {icon ? (
          <Icon name={icon} size={size} color={color} thin={thin} />
        ) : null}
        <Text style={{...styles.optionText, color, fontSize, fontFamily}}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    width: '23%',
    height: 30,
    backgroundColor: PURPLE_SECONDARY_COLOR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.normal,
    borderRadius: 5,
  },
  optionContent: {
    display: 'flex',
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  optionText: {
    color: WHITE_COLOR,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
