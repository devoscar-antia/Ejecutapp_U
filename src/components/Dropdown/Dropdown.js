import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import {
  PURPLE_COLOR,
  WHITE_COLOR,
  MULI_BLACK,
  MOBILE,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

import {Label} from '..';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Filter from './Filter';

export const Dropdown = ({
  labelText,
  value,
  onValueChange,
  placeholder,
  width = 'auto',
  items,
  orientation = useOrientation(),
  filter = true,
  fontFamily = MULI_BLACK,
  fontSize = undefined,
  marginBottom = 0,
  labelAlign = 'flex-start'
}) => {
  let percentage = orientation.width <= MOBILE ? 0.035 : 0.02;
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    return () => {
      setShowFilter(false);
    };
  }, []);

  return (
    <View
      style={{
        width,
        ...styles.dropdownContainer,
        marginBottom
      }}>
      {labelText && <Label text={labelText} customStyles={{alignSelf : labelAlign, paddingLeft : '2.5%'}} />}
      <ModalDropdown
        options={items.map(item => item.label)}
        onSelect={index => onValueChange(items[index]['value'])}
        showsVerticalScrollIndicator={true}
        style={{
          width,
          ...styles.dropdown,
        }}
        textStyle={{
          ...styles.dropdownText,
          fontSize: orientation.width * percentage,
          fontFamily
        }}
        dropdownTextStyle={{
          ...styles.dropdownText,
          fontSize: orientation.width * percentage,
          fontFamily
        }}
        dropdownTextHighlightStyle={{
          ...styles.dropdownTextHighlight,
          fontFamily
        }}
        dropdownStyle={{
          width,
        }}
        animated>
        <Text
          style={{
            ...styles.dropdownText,
            fontSize: ( fontSize !== undefined )? fontSize : orientation.width * percentage,
            fontFamily
          }}>
          {items.find(item => item.value === value)?.label || placeholder}
        </Text>
      </ModalDropdown>
      {filter && (<TouchableOpacity
        onPress={() => {
          setShowFilter(true);
        }}>
        <Icon
          style={{marginTop: 10}}
          name="search"
          size={30}
          color={PURPLE_COLOR}
        />
      </TouchableOpacity> )}
      <Filter
        items={items}
        onValueChange={onValueChange}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      /> 
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems : 'center',
    margin: 20,
  },
  dropdown: {
    padding: 0,
    borderBottomColor: PURPLE_COLOR,
    borderBottomWidth: 5,
  },
  dropdownText: {fontFamily: MULI_BLACK, color: PURPLE_COLOR},
  dropdownTextHighlight: {
    color: WHITE_COLOR,
    backgroundColor: PURPLE_COLOR,
  },
});
