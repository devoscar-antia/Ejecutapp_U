import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import {LayoutContext} from '../../context/LayoutContext';

import {
  BACKGROUND_COLOR,
  COCO_BOLD,
  GRAY,
  PURPLE_COLOR,
  WHITE_COLOR,
  WINDOW_HEIGHT,
} from '../../assets/styles';
import {Button, Input, ErrorModal, LandingHeader} from '../../components';

const LoginScreen = ({navigation, checkUser}) => {
  const {orientation, isMobile} = useContext(LayoutContext);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const onPressLoginButton = () => {
    if (checkForm()) checkUser(email, password);
  };

  const checkForm = () => {
    const generateSentence = field => `Debes ingresar tu ${field}.`;

    if (!email.length) {
      setModalMessage(generateSentence('E-mail'));
      setModalVisible(true);
      return false;
    }

    if (!password.length) {
      setModalMessage(generateSentence('Contraseña'));
      setModalVisible(true);
      return false;
    }

    return true;
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ErrorModal
        state={modalVisible}
        message={modalMessage}
        onDismiss={setModalVisible}
      />
      <ScrollView
        style={{
          ...styles.screenContainer,
        }}>
        <LandingHeader orientation={orientation} isMobile={isMobile} />
        <View
          style={{...styles.form, paddingVertical: orientation.width * 0.05}}>
          <Input
            labelText="Correo electrónico"
            keyboardType="email-address"
            onChange={onChangeEmail}
            value={email}
            placeholder="Ingresa tu correo"
            marginBottom={20}
            orientation={orientation}
          />
          <Input
            labelText="Contraseña"
            secureTextEntry={true}
            onChange={onChangePassword}
            value={password}
            placeholder="Ingresa tu contraseña"
            marginBottom={20}
            orientation={orientation}
          />
          <Button
            onPress={onPressLoginButton}
            text="Iniciar Sesión"
            backgroundColor={PURPLE_COLOR}
            fontColor={WHITE_COLOR}
            width={'90%'}
            marginForText={0}
            orientation={orientation}
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{...styles.goBack, fontSize: orientation.width * 0.03}}>
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  screenContainer: {
    backgroundColor: BACKGROUND_COLOR,
    width: '100%',
    height: WINDOW_HEIGHT,
  },
  header: {
    width: '100%',
    height: '20%',
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBack: {
    marginTop: '2.5%',
    color: GRAY,
    fontFamily: COCO_BOLD,
  },
});

export default LoginScreen;
