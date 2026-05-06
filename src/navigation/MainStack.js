import React from 'react';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen
  from '../screens/home/HomeScreen';

import ProfileScreen
  from '../screens/profile/ProfileScreen';

const Stack =
  createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={
          HomeScreen
        }
      />

      <Stack.Screen
        name="Profile"
        component={
          ProfileScreen
        }
      />
    </Stack.Navigator>
  );
}