import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

export const FadeIn = ({children, style}) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnimation,
      }}>
      {children}
    </Animated.View>
  );
};
