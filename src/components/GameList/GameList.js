import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {BACKGROUND_COLOR} from '../../assets/styles';

export const GameList = ({children}) => {
  return (
    <ScrollView
      style={styles.gameList}
      contentContainerStyle={styles.contentContainerStyle}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gameList: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
});
