import React from 'react'
import ContactListContainer from '../components/screens/ContactList/ContactList.Container'
import AddContactContainer from '../components/screens/AddContact/AddContact.Container'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParamList } from './type'

const AppStack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="ContactList" headerMode="none">
        <AppStack.Screen name="ContactList" component={ContactListContainer} />
        <AppStack.Screen name="AddContact" component={AddContactContainer} />
      </AppStack.Navigator>
    </NavigationContainer>
    // <AppStack.Navigator initialRouteName="ContactList">
    //   <AppStack.Screen name="ContactList" component={ContactListContainer} />
    // </AppStack.Navigator>
  )
}

export default AppNavigator;
