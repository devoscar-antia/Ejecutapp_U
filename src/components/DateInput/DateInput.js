import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {
  WHITE_COLOR,
  LIGHT_BLUE_COLOR,
  MULI_REGULAR,
  PURPLE_COLOR,
  MULI_MEDIUM,
} from '../../assets/styles';
import {Label} from '..';
import {Button} from '..';

export const DateInput = ({
  labelText,
  onDateChange,
  date,
  placeholder,
  width = '90%',
  marginBottom = 0,
  show,
  setShow,
}) => {
  const [mode] = useState('date');
  const [currentYear] = useState(new Date().getFullYear());

  return (
    <View
      style={{
        marginBottom,
        width,
      }}>
      <Label text={labelText} />
      <Button
        text={moment(date).format('L')}
        backgroundColor={WHITE_COLOR}
        fontColor={PURPLE_COLOR}
        iconPosition={'right'}
        icon={'calendar'}
        width={'100%'}
        marginForText={65}
        fontFamily={MULI_MEDIUM}
        onPress={() => setShow(!show)}
        marginBottom={marginBottom}
      />
      {show && (
        <DatePicker
          style={{
            width: styles.dateInput.width,
          }}
          value={date}
          mode={mode}
          placeholder={placeholder}
          format="YYYY-MM-DD"
          minDate={`${currentYear - 18}-01-01`}
          maxDate={`${currentYear - 1}-01-01`}
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          customStyles={{
            dateIcon: {
              display: 'none',
            },
            dateInput: styles.dateInput,
            dateText: styles.dateInputText,
            placeholderText: styles.dateInputText,
          }}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    marginLeft: 0,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: LIGHT_BLUE_COLOR,
    height: 100,
    paddingHorizontal: 30,
    paddingVertical: 17,
    width: '100%',
    alignItems: 'flex-start',
  },
  dateInputText: {
    color: WHITE_COLOR,
    fontSize: 18,
    fontFamily: MULI_REGULAR,
  },
});

export default DateInput;
