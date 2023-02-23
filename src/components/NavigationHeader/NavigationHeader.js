import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-feather1s';

import {
  PURPLE_COLOR,
  COCO_BOLD,
  WHITE_COLOR,
  PURPLE_SECONDARY_COLOR,
} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';
import {returnToMenu, goBack} from '../../utils/RootNavigation';

export const NavigationHeader = ({title, orientation = useOrientation()}) => {
  return (
    <View style={{...styles.container}}>
      <View style={{...styles.header, height: orientation.width * 0.1}}>
        <View style={styles.returnContainer}>
          <Icon
            onPress={goBack}
            style={styles.returnButtons}
            name="arrow-left-circle"
            size={orientation.width * 0.04}
            color={PURPLE_COLOR}
            thin={false}
          />
          <Icon
            onPress={returnToMenu}
            style={styles.returnButtons}
            name="menu"
            size={orientation.width * 0.04}
            color={PURPLE_SECONDARY_COLOR}
            thin={false}
          />
        </View>
      </View>
      <Text style={{...styles.title, fontSize: orientation.width * 0.05}}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    marginVertical: 10,
    padding: 0,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  returnContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    height: '50%',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
  returnButtons: {
    marginHorizontal: 5,
  },
  title: {
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default NavigationHeader;
