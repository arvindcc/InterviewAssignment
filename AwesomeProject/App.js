/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ContactListScreenContainer from './src/components/screens/ContactList/ContactList.Container';
import { StatusBar } from 'react-native';

const App = () => {
  console.log('APP');
  return (
    <Provider store={store}>
      <StatusBar barStyle='default' />
      <ContactListScreenContainer />
    </Provider>
  );
};

export default App;
