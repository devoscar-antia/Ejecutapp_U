import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

import {
  WHITE_COLOR,
  PURPLE_COLOR,
  MULI_REGULAR,
  MOBILE,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';
import {Label} from '..';

export const Input = ({
  width = '90%',
  labelText,
  keyboardType,
  onChange,
  value,
  placeholder,
  marginBottom = 0,
  secureTextEntry,
  orientation = useOrientation(),
  ...rest
}) => {
  let percentage = orientation.width <= MOBILE ? 0.04 : 0.03;
  return (
    <View
      style={{
        marginBottom,
        width,
      }}>
      <Label text={labelText} />
      <TextInput
        placeholderTextColor={PURPLE_COLOR}
        autoCorrect={secureTextEntry}
        autoCapitalize={
          secureTextEntry || keyboardType === 'email-address'
            ? 'none'
            : 'sentences'
        }
        keyboardType={keyboardType ? keyboardType : 'default'}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={{...styles.input, fontSize: orientation.width * percentage}}
        onChange={text => {
          onChange(text.nativeEvent.text);
        }}
        value={value}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: WHITE_COLOR,
    fontFamily: MULI_REGULAR,
    color: PURPLE_COLOR,
    height: 60,
    width: 'auto',
    padding: 'auto',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 5,
  },
});

export default Input;
