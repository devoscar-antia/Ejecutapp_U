import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Badge from '../../assets/images/global/Finished-Badge.png';
import {LayoutContext} from '../../context/LayoutContext';

export const GameBadge = () => {
  const {orientation, isMobile} = useContext(LayoutContext);
  return (
    <View style={isMobile ? styles.badge : styles.badgeTablet}>
      <Image
        source={Badge}
        style={{width: orientation.width * 0.075, resizeMode: 'contain'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: '-12.5%',
    left: '-3.5%',
    zIndex: 20,
  },
  badgeTablet: {
    position: 'absolute',
    top: '-5%',
    left: '-10%',
    zIndex: 20,
  },
});
