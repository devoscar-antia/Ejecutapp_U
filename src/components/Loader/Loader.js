import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {PURPLE_COLOR} from '../../assets/styles';

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={PURPLE_COLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30%',
  },
});
