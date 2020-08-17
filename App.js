import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import configStore from './src/store';
const store = configStore();

import AppNavigation from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

// https://community.auth0.com/t/implementing-auth0-in-react-native-expo-app/17406