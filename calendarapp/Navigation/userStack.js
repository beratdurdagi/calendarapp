import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../src/screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from '../src/screens/DetailsScreen';

const Stack=createStackNavigator()



export default function UserStack() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}