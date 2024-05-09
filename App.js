import 'react-native-gesture-handler';
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Navigation from './src/Navigations/Navigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (<><StatusBar backgroundColor="#7CFC00" barStyle="light-content" />
    <Navigation/>
    </> )
}

export default App