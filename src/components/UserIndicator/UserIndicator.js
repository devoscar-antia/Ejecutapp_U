import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {MULI_BOLD, PURPLE_COLOR} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const UserIndicator = ({
  user: {name},
  orientation = useOrientation(),
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.image,
          width: orientation.width * 0.035,
          height: orientation.width * 0.035,
        }}
      />
      <Text style={{...styles.userName, fontSize: orientation.width * 0.0175}}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 30,
  },
  image: {
    backgroundColor: PURPLE_COLOR,
    borderRadius: 5,
  },
  userName: {
    marginLeft: 15,
    fontFamily: MULI_BOLD,
    color: PURPLE_COLOR,
  },
});

export default UserIndicator;
