import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StackNavigation} from './src/navigations/StackNavigation';
import {socket, SocketContext} from './src/contexts/Socket';
const App = () => {
  return (
    <>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SocketContext.Provider>
    </>
  );
};
export default App;
