import React from 'react';
import {AppRegistry, StatusBar, LogBox} from 'react-native';
import {name as appName} from './app.json';

/* Redux */
import './src/config/ReactotronConfig';
import {Provider} from 'react-redux';
import configureStore from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';

/* Context */

import {LayoutProvider} from './src/context/LayoutContext';

/* Navigation */
import Navigator from './src/navigator';
import {GamesProvider} from './src/context/GamesContext';

const myAppWithStore = () => {
  const {store, persistor} = configureStore();

  return (
    <Provider store={store}>
      <LayoutProvider>
        <GamesProvider>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar hidden={true} />
            <Navigator />
          </PersistGate>
        </GamesProvider>
      </LayoutProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => myAppWithStore);

LogBox.ignoreAllLogs();
