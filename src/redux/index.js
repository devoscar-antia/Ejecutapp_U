import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

// Importing sagas
import rootSaga from './sagas';

// Importing reducers
import {reducer as studentsReducer} from './reducers/Students';
import {reducer as gamesReducer} from './reducers/Games';
import {reducer as authReducer} from './reducers/Auth';

// Reactotron Stuff
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const rootReducer = combineReducers({
  auth: authReducer,
  games: gamesReducer,
  students: studentsReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['games'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// A function which can create our store and auto-persist the data
export default () => {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: Reactotron.createSagaMonitor(),
  });
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(
    persistedReducer,
    compose(
      middleware,
      Reactotron.createEnhancer(),
    ),
  );
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return {store, persistor};
};
