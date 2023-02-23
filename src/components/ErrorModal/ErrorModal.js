import React from 'react';
import {StyleSheet, Modal, View, TouchableHighlight, Text} from 'react-native';
import {
  WHITE_COLOR,
  PURPLE_COLOR,
  COCO_BOLD,
  PURPLE_SECONDARY_COLOR,
} from '../../assets/styles';

export const ErrorModal = ({state, message, onDismiss}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>{message}</Text>
          <TouchableHighlight
            style={modalStyles.closeButton}
            onPress={() => {
              onDismiss(!state);
            }}>
            <Text style={modalStyles.textStyle}>Entendido</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: WHITE_COLOR,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  closeButton: {
    backgroundColor: PURPLE_SECONDARY_COLOR,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: WHITE_COLOR,
    fontFamily: COCO_BOLD,
    textAlign: 'center',
  },
  modalText: {
    fontFamily: COCO_BOLD,
    fontSize: 18,
    color: PURPLE_COLOR,
    marginBottom: 15,
    textAlign: 'center',
  },
});
