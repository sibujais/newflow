import React,{useState,useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import BottomTabs from './BottomTabs';
import SplashScreen from '../screens/SplashScreen/SplashScreen'

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { isLoggedIn } = useSelector(state => state.auth);
const [showSplash,
    setShowSplash] =
    useState(true);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setShowSplash(false);
      }, 1000);

    return () =>
      clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen
            name="Main"
            component={BottomTabs}
          />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}