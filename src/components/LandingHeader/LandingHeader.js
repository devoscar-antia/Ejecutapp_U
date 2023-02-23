import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import LogoUDLA from '../../assets/images/global/Logo_UDLA.png';
import LogoUDLA_Tablet from '../../assets/images/global/LogoGrande_UDLA.png';
import LogoUSC from '../../assets/images/global/LogoUSC_V.png';

import {Brand} from '..';

const LandingHeaderLogos = ({orientation, isMobile}) => {
  return (
    <View style={isMobile ? styles.landingHeader : styles.landingHeaderTablet}>
      <Image
        style={{
          ...styles.images,
          width: orientation.width * 0.125,
          height: orientation.width * 0.125,
        }}
        source={isMobile ? LogoUDLA : LogoUDLA_Tablet}
      />
      <Image
        style={{
          ...styles.images,
          width: orientation.width * 0.125,
          height: orientation.width * 0.125,
        }}
        source={LogoUSC}
      />
    </View>
  );
};

export const LandingHeader = ({orientation, isMobile, hideLogos}) => {
  return (
    <View style={isMobile ? styles.header : styles.headerTablet}>
      {hideLogos ? null : (
        <LandingHeaderLogos orientation={orientation} isMobile={isMobile} />
      )}
      <Brand size={isMobile ? 'large' : 'medium'} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '5%',
  },
  headerTablet: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: '5%',
  },
  landingHeader: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '7.5%',
  },
  landingHeaderTablet: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  images: {
    resizeMode: 'contain',
    margin: 10,
  },
});
