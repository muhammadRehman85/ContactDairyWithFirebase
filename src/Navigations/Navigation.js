import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddContactScreen from '../Screens/AddContactScreen';
import UpdateContactScreen from '../Screens/UpdateContactScreen';
import Home from '../Screens/Home';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7CFC00', // Change the background color of the header
          },
          headerTintColor: 'white', // Change the text color of the header
          headerTitleStyle: {
            fontWeight: 'bold', // Optional: Change the font weight of the header title
          },
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Contacts Dairy'}}
        />
        <Stack.Screen name="AddContactScreen" component={AddContactScreen} />
        <Stack.Screen
          name="UpdateContactScreen"
          component={UpdateContactScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
