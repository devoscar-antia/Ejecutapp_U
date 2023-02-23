import React, {useContext, useEffect, useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';

import {
  Button,
  DateInput,
  Input,
  NavigationHeader,
  ErrorModal,
  Dropdown,
} from '../../components';

import {BACKGROUND_COLOR, MOBILE, MULI_REGULAR, PURPLE_COLOR, WHITE_COLOR} from '../../assets/styles';
import {LayoutContext} from '../../context/LayoutContext';
import { countries } from '../../data/catalogs/countries';
import { sexes } from '../../data/catalogs/sex';

const RegisterStudentScreen = props => {
  const [names, onChangeNames] = useState('');
  const [surnames, onChangeSurnames] = useState('');
  const [code, onChangeCode] = useState('');
  const [birthDate, onChangeBirthdate] = useState(new Date());
  const [institution, onChangeInstitution] = useState('');
  const [country, onChangeCountry] = useState('');
  const [city, onChangeCity] = useState('');
  const [sex,onChangeSex] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [show, setShow] = useState(false);
  const [marginBottom, setMarginBottom] = useState(50);

  const {orientation} = useContext(LayoutContext);
  let percentage = orientation.width <= MOBILE ? 0.04 : 0.03;

  useEffect(() => {
    setMarginBottom(orientation.width * 0.05);
  }, [orientation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    onChangeBirthdate(currentDate);
    setShow(false);
  };

  const checkForm = () => {
    const generateSentence = field =>
      `Debes ingresar ${
        field === 'Fecha de nacimiento' ||
        field === 'Ciudad' ||
        field === 'Institución'
          ? 'la'
          : 'el'
      } ${field} del estudiante.`;

    if (!names.length) {
      setModalMessage(generateSentence('Nombre'));
      setModalVisible(true);
      return false;
    }
    if (!surnames.length) {
      setModalMessage(generateSentence('Apellido'));
      setModalVisible(true);
      return false;
    }
    if (!code.length) {
      setModalMessage(generateSentence('Código'));
      setModalVisible(true);
      return false;
    }
    if (isNaN(code)) {
      setModalMessage('El código del estudiante debe ser númerico.');
      setModalVisible(true);
      return false;
    }

    if (!country.length) {
      setModalMessage(generateSentence('País'));
      setModalVisible(true);
      return false;
    }

    if (!city.length) {
      setModalMessage(generateSentence('Ciudad'));
      setModalVisible(true);
      return false;
    }

    if(!sex.length){
      setModalMessage(generateSentence('Sexo'));
      setModalVisible(true);
      return false;
    }

    if (!institution.length) {
      setModalMessage(generateSentence('Institución'));
      setModalVisible(true);
      return false;
    }

    return true;
  };

  const onPressButton = () => {
    if (checkForm()) {
      props.createStudent(
        names,
        surnames,
        code,
        birthDate,
        institution,
        country,
        city,
        sex,
        props.user,
      );
      props.navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={{...styles.header, marginBottom: orientation.width * 0.075}}>
        <NavigationHeader
          title="Registro de estudiante"
          navigation={props.navigation}
        />
      </View>
      <View style={styles.form}>
        <Input
          labelText="Nombres"
          onChange={onChangeNames}
          value={names}
          placeholder="Primer y/o segundo nombre"
          marginBottom={marginBottom}
        />
        <Input
          labelText="Apellidos"
          onChange={onChangeSurnames}
          value={surnames}
          placeholder="Primer y segundo apellido"
          marginBottom={marginBottom}
        />
        <Input
          labelText="Código estudiante"
          keyboardType="numeric"
          onChange={onChangeCode}
          value={code}
          placeholder="Ingresar código"
          marginBottom={marginBottom}
        />
        <DateInput
          labelText="Fecha de nacimiento"
          placeholder="Seleccionar fecha"
          date={birthDate}
          onDateChange={onChange}
          show={show}
          setShow={setShow}
        />
        <Dropdown
               labelText={"País"}
                placeholder="Seleccionar País..."
                items={countries}
                onValueChange={onChangeCountry}
                value={country}
                width="95%"
                fontFamily={MULI_REGULAR}
                fontSize={orientation.width * percentage}
        />
        <Input
          labelText="Ciudad"
          onChange={onChangeCity}
          value={city}
          placeholder="Ingresar Ciudad"
          marginBottom={marginBottom}
        />
        <Dropdown
               labelText={"Sexo"}
                placeholder="Seleccionar Sexo..."
                items={sexes}
                onValueChange={onChangeSex}
                value={sex}
                width="95%"
                filter={false}
                fontFamily={MULI_REGULAR}
                fontSize={orientation.width * percentage}
                marginBottom={marginBottom}
        />
        <Input
          labelText="Institución"
          onChange={onChangeInstitution}
          value={institution}
          placeholder="Ingresar Institución"
          marginBottom={marginBottom}
        />
        <Button
          onPress={onPressButton}
          text="REGISTRAR"
          backgroundColor={PURPLE_COLOR}
          fontColor={WHITE_COLOR}
          width={'90%'}
          marginForText={65}
        />
      </View>
      <ErrorModal
        state={modalVisible}
        message={modalMessage}
        onDismiss={setModalVisible}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    paddingHorizontal: '10%',
  },
  header: {
    width: '100%',
    height: '10%',
    padding: 0,
  },
  form: {
    width: '100%',
    paddingBottom: '15%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default RegisterStudentScreen;
