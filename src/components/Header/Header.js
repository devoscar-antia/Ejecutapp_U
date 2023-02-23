import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COCO_BOLD, COCO_REGULAR, PURPLE_COLOR} from '../../assets/styles';
import useOrientation from '../../hooks/useOrientation';

export const Header = ({
  title,
  subtitle,
  size,
  orientation = useOrientation(),
}) => {
  let percentage = 0.1;

  switch (size) {
    case 'small':
      percentage = 0.025;
      break;
    case 'medium':
      percentage = 0.05;
      break;
    case 'large':
      percentage = 0.075;
      break;
    case 'extralarge':
    default:
  }

  return (
    <View>
      <Text style={{...styles.title, fontSize: orientation.width * percentage}}>
        {title}
      </Text>
      {subtitle && (
        <Text
          style={{
            ...styles.subtitle,
            fontSize: orientation.width * (percentage / 2.5),
          }}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

Header.defaultProps = {
  size: 'extralarge',
};

const styles = StyleSheet.create({
  title: {
    color: PURPLE_COLOR,
    fontFamily: COCO_BOLD,
  },
  subtitle: {
    color: PURPLE_COLOR,
    fontFamily: COCO_REGULAR,
  },
});

export default Header;
