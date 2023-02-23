import 'react-native-gesture-handler';

import React, {useContext, useState} from 'react';

import {LayoutContext} from '../context/LayoutContext';

/* React Navigation */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '../utils/RootNavigation';

/* Screens */
import LandingScreen from '../screens/Landing';
import LoginScreen from '../screens/Login';
import MenuScreen from '../screens/Menu';
import RegisterStudentScreen from '../screens/RegisterStudent';
import StudentsListScreen from '../screens/StudentsList';
import GamesMenuScreen from '../screens/GamesMenu';
import GameOneScreen from '../screens/GameOne';
import GameTwoScreen from '../screens/GameTwo';
import GameThreeScreen from '../screens/GameThree';
import GameFourScreen from '../screens/GameFour';
import GameFiveScreen from '../screens/GameFive';
import SplashScreen from '../screens/Splash';
import SessionFinishedScreen from '../screens/SessionFinished';

/* Components */
import {TopHeader} from '../components/TopHeader';

const Stack = createStackNavigator();

const App = ({isLoggedIn}) => {
  const {orientation, isMobile} = useContext(LayoutContext);
  const [showSplash, setShowSplash] = useState(true);

  setTimeout(() => {
    setShowSplash(false);
  }, 5000);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Landing"
              options={{headerShown: false}}
              component={LandingScreen}
            />
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
              options={{header: () => <TopHeader orientation={orientation} />}}
            />
            <Stack.Screen
              name="RegisterStudent"
              options={{header: () => <TopHeader orientation={orientation} />}}
              component={RegisterStudentScreen}
            />
            <Stack.Screen
              name="GamesMenu"
              options={{
                header: () =>
                  isMobile ? <TopHeader orientation={orientation} /> : null,
              }}
              component={GamesMenuScreen}
            />
            <Stack.Screen
              name="StudentsList"
              options={{header: () => <TopHeader orientation={orientation} />}}
              component={StudentsListScreen}
            />
            <Stack.Screen
              name="SessionFinished"
              options={{header: () => <TopHeader orientation={orientation} />}}
              component={SessionFinishedScreen}
            />
            <Stack.Screen
              name="GameOne"
              options={{headerShown: false}}
              component={GameOneScreen}
            />
            <Stack.Screen
              name="GameTwo"
              options={{headerShown: false}}
              component={GameTwoScreen}
            />
            <Stack.Screen
              name="GameThree"
              options={{headerShown: false}}
              component={GameThreeScreen}
            />
            <Stack.Screen
              name="GameFour"
              options={{headerShown: false}}
              component={GameFourScreen}
            />
            <Stack.Screen
              name="GameFive"
              options={{headerShown: false}}
              component={GameFiveScreen}
            />
            <Stack.Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
