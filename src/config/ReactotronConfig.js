/*
 Reactotron configuration
 Author : SGarcia710
*/

import {LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux as reduxPlugin} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

LogBox.ignoreAllLogs(true);

/* First, set some configuration settings on how to connect to the app */

Reactotron.setAsyncStorageHandler(AsyncStorage);
Reactotron.configure({
  name: 'Ejecutapp',
});

/*
 Add every built-in react native feature. You also have the ability to pass
 An object as a parameter to configure each individual react-native plugin
 if you'd like. 
 */
Reactotron.useReactNative({
  asyncStorage: {ignore: ['secret']},
});

/* Add some more plugins for redux & redux-saga */

Reactotron.use(reduxPlugin());
Reactotron.use(sagaPlugin());

/* If we're running in DEV mode, then let's connect! */

if (__DEV__) {
  Reactotron.connect();
  Reactotron.clear();
}

console.tron = Reactotron;
