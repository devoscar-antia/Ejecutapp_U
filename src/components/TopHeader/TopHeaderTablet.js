import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-feather1s';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  BACKGROUND_COLOR,
  COCO_BOLD,
  GRAY,
  PURPLE_COLOR,
  SHADOWS,
  WHITE_COLOR,
} from '../../assets/styles';
import LogoUDLA from '../../assets/images/global/Logo_UDLA.png';
import LogoUSC from '../../assets/images/global/LogoUSC_V.png';
import {Brand} from '..';

import useOrientation from '../../hooks/useOrientation';

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    game: state.games.game,
  };
};

const TopHeaderLogos = ({orientation = useOrientation()}) => {
  let logoStyle = {
    resizeMode: 'contain',
    width: orientation.width * 0.075,
    height: orientation.width * 0.075,
    margin: 10,
  };

  return (
    <View style={styles.topHeaderLogosContainer}>
      <Image style={logoStyle} source={LogoUDLA} />
      <Image style={logoStyle} source={LogoUSC} />
    </View>
  );
};

const TopHeaderSubtitle = ({orientation, icon, subtitle}) => (
  <View style={styles.user}>
    <Icon
      name={icon}
      size={orientation.width * 0.035}
      color={PURPLE_COLOR}
      thin={false}
    />
    <Text style={styles.username}>{subtitle}</Text>
  </View>
);

const TopHeaderTabletContainer = ({
  orientation = useOrientation(),
  user = {},
  game = {},
  type = 'normal',
  backgroundColor = BACKGROUND_COLOR,
  goBack = () => {},
  children,
}) => {
  return (
    <View
      style={{
        ...styles.topHeaderContainer,
        backgroundColor,
        height: orientation.width * 0.39,
        ...(type === 'game' && styles.gameHeader),
      }}>
      <Brand size="medium" customStyles={styles.topHeaderBrand} />
      {type === 'normal' && user && (
        <TopHeaderSubtitle
          subtitle={user.name}
          orientation={orientation}
          color={PURPLE_COLOR}
          icon="user"
        />
      )}
      {children}
      {type === 'game' && game && (
        <TopHeaderSubtitle
          subtitle={game.title}
          orientation={orientation}
          color="gray"
          icon="box"
        />
      )}
      <TouchableOpacity onPress={() => goBack()}>
        <Text style={styles.goBack}>Volver</Text>
      </TouchableOpacity>
      <TopHeaderLogos orientation={orientation} type={type} />
    </View>
  );
};

TopHeaderTabletContainer.defaultProps = {
  orientation: {},
  user: {},
  game: {},
  type: 'normal',
  backgroundColor: BACKGROUND_COLOR,
};

TopHeaderTabletContainer.propTypes = {
  orientation: PropTypes.object,
  user: PropTypes.object,
  game: PropTypes.object,
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  topHeaderContainer: {
    backgroundColor: WHITE_COLOR,
    width: '100%',
    maxWidth: '34%',
    paddingVertical: 30,
    ...SHADOWS.normal,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
  },
  topHeaderBrand: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
  },
  gameHeader: {
    position: 'absolute',
    elevation: 0,
  },
  topHeaderLogosContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  user: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  username: {
    marginLeft: 10,
    fontFamily: COCO_BOLD,
    color: PURPLE_COLOR,
  },
  goBack: {
    marginTop: '2.5%',
    color: GRAY,
    fontFamily: COCO_BOLD,
  },
});
export const TopHeaderTablet = connect(mapStateToProps)(
  TopHeaderTabletContainer,
);
