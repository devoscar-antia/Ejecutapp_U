import React from 'react';
import {StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

export default function Modal({isVisible, children, onBackdrop}) {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      fullScreen={false}
      onBackdropPress={() => {
        onBackdrop(stage => stage - 1);
      }}>
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    height: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
