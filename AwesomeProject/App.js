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
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigation'
import { Root } from 'native-base';

const App = () => {
  console.log('APP');
  return (
    <Root>
      <Provider store={store}>
        <StatusBar barStyle='default' />
        <AppNavigator />
      </Provider>
    </Root>
  );
};

export default App;
