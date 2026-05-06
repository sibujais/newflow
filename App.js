import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
  

  return (
    <Provider store={store}>
    
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>

  </Provider>
  );
}