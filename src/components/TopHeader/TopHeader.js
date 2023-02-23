import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View, Text} from 'react-native';
import {
  BACKGROUND_COLOR,
  COCO_BOLD,
  MOBILE,
  PURPLE_COLOR,
  SHADOWS,
  WHITE_COLOR,
} from '../../assets/styles';
import LogoUDLA from '../../assets/images/global/Logo_UDLA.png';
import LogoUSC from '../../assets/images/global/LogoUSC_V.png';
import {Brand} from '..';
import Icon from 'react-native-feather1s';

import {connect} from 'react-redux';
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
  };

  return (
    <View style={styles.topHeaderLogosContainer}>
      <Image style={logoStyle} source={LogoUDLA} />
      <Image style={logoStyle} source={LogoUSC} />
    </View>
  );
};

const TopHeaderSubtitle = ({orientation, icon, subtitle, percentage}) => (
  <View style={styles.user}>
    <Icon
      name={icon}
      size={orientation.width * 0.035}
      color={PURPLE_COLOR}
      thin={false}
    />
    <Text
      style={{...styles.username, fontSize: orientation.width * percentage}}>
      {subtitle}
    </Text>
  </View>
);

const TopHeaderContainer = ({
  orientation = useOrientation(),
  user = {},
  game = {},
  type = 'normal',
  backgroundColor = BACKGROUND_COLOR,
}) => {
  let percentage = orientation.width <= MOBILE ? 0.035 : 0.02;

  return (
    <View
      style={{
        ...styles.topHeaderContainer,
        backgroundColor,
        ...(type === 'game' && styles.gameHeader),
      }}>
      <Brand size="small" customStyles={styles.topHeaderBrand} />
      <TopHeaderLogos orientation={orientation} type={type} />
      {type === 'normal' && user && (
        <TopHeaderSubtitle
          subtitle={user.name}
          orientation={orientation}
          color={PURPLE_COLOR}
          icon="user"
          percentage={percentage}
        />
      )}
      {type === 'game' && game && (
        <TopHeaderSubtitle
          subtitle={game.title}
          orientation={orientation}
          color="gray"
          icon="box"
          percentage={percentage}
        />
      )}
    </View>
  );
};

TopHeaderContainer.defaultProps = {
  orientation: {},
  user: {},
  game: {},
  type: 'normal',
  backgroundColor: BACKGROUND_COLOR,
};

TopHeaderContainer.propTypes = {
  orientation: PropTypes.object,
  user: PropTypes.object,
  game: PropTypes.object,
  type: PropTypes.string,
};

const styles = StyleSheet.create({
  topHeaderContainer: {
    backgroundColor: WHITE_COLOR,
    width: '100%',
    height: 'auto',
    padding: 30,
    ...SHADOWS.normal,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  topHeaderBrand: {
    position: 'relative',
    alignItems: 'flex-start',
    width: '80%',
  },
  gameHeader: {
    position: 'absolute',
    elevation: 0,
  },
  topHeaderLogosContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
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
});
export const TopHeader = connect(mapStateToProps)(TopHeaderContainer);
