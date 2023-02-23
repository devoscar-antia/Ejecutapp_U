import React, {useContext} from 'react';
import {useEffect, useState} from 'react';

import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

import {LayoutContext} from '../../context/LayoutContext';

import {
  BACKGROUND_COLOR,
  WHITE_COLOR,
  MULI_REGULAR,
  PURPLE_COLOR,
  COCO_BOLD,
} from '../../assets/styles';

import {NavigationHeader} from '../../components';
import {countriesKey} from '../../data/catalogs/countries';

const StudentsListScreen = ({navigation, studentsList = []}) => {
  const {orientation} = useContext(LayoutContext);
  const [widthArray, setWidthArray] = useState([150, 200, 210, 100, 180]);

  useEffect(() => {
    setWidthArray([
      orientation.width * 0.125,
      orientation.width * 0.2,
      orientation.width * 0.1,
      orientation.width * 0.14,
      orientation.width * 0.125,
    ]);
  }, [orientation.width]);

  const tableHeaders = [
    'Código',
    <Text
      style={{...styles.tableHeadersText, fontSize: orientation.width * 0.015}}>
      Nombre estudiante
    </Text>,
    'Sexo',
    'Institución',
    'Ciudad y País',
    'Fecha de Nacimiento',
  ];

  const studentsDataFormatted =
    studentsList?.length > 0
      ? studentsList?.map(student => {
          const {
            code,
            names,
            surnames,
            institution,
            city,
            country,
            sex,
            birthDate,
          } = student;

          return [
            code,
            [
              <Text
                key={code + names}
                style={{
                  ...styles.tableText,
                  textAlign: 'left',
                  fontWeight: '800',
                }}>
                {`${names}\n`}
              </Text>,
              <Text
                key={code + surnames}
                style={{...styles.tableText, textAlign: 'left'}}>
                {surnames}
              </Text>,
            ],
            <View style={styles.sex}>
                <Icon
                  name={ sex === 'F' ? "venus" : "mars"}
                  size={30}
                  color={PURPLE_COLOR}
                />
            </View>,
            institution,
            `${city}, ${countriesKey[country]}`,
            moment(birthDate).format('L'),
          ];
        })
      : [];

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <NavigationHeader
          title="Lista de estudiantes"
          navigation={navigation}
        />
      </View>
      <ScrollView
        style={{
          ...styles.list,
          marginTop: orientation.height * 0.15,
          width: orientation.width,
        }}
        contentContainerStyle={{alignItems: 'center'}}>
        <View>
          <Table>
            <Row
              data={tableHeaders}
              widthArr={widthArray}
              style={{...styles.tableHeader, width: orientation.width * 0.9}}
              textStyle={{
                ...styles.tableHeadersText,
                fontSize: orientation.width * 0.015,
              }}
            />
          </Table>
          <View style={styles.tableDataWrapper}>
            <ScrollView>
              <Table>
                {studentsDataFormatted.map((rowData, position) => {
                  return (
                    <Row
                      key={position}
                      data={rowData}
                      widthArr={widthArray}
                      style={{
                        ...styles.tableRow,
                        width: orientation.width * 0.9,
                      }}
                      textStyle={{
                        ...styles.tableText,
                        fontSize: orientation.width * 0.015,
                      }}
                    />
                  );
                })}
              </Table>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: '25%',
    paddingHorizontal: '10%',
  },
  form: {
    width: '100%',
    height: '55%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    width: '100%',
  },
  sex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    backgroundColor: PURPLE_COLOR,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 4,
  },
  tableHeadersText: {
    fontFamily: COCO_BOLD,
    textAlign: 'center',
    color: WHITE_COLOR,
    lineHeight: 25,
  },
  tableDataWrapper: {
    width: '100%',
    height: '100%',
  },
  tableText: {
    fontFamily: MULI_REGULAR,
    color: PURPLE_COLOR,
    textAlign: 'center',
  },
  tableRow: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: WHITE_COLOR,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 10,
  },
});

export default StudentsListScreen;
