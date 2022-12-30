import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/Routes';
import {store,persistor} from './src/Redux';
import {PersistGate} from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <RootNavigator/>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;