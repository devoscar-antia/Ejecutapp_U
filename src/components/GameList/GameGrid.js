import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COCO_BOLD, PURPLE_COLOR} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const GameGrid = ({children, orientation = useOrientation()}) => {
  return (
    <View style={{...styles.gamesGrid, height: orientation.width * 0.75}}>
      <Text style={styles.gamesMenuTitle}>Galería de Estimulos</Text>
      <TouchableOpacity style={styles.gamesGridDummy} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  gamesGrid: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: '7.5%',
  },
  gamesMenuTitle: {
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
    position: 'absolute',
    right: '10%',
    top: '5%',
    fontSize: 25,
  },
  gamesGridDummy: {
    width: '25%',
    margin: 15,
  },
});
