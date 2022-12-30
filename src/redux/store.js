import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import {reducers} from './reducers';
import { persistReducer,persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist:['auth']
}

const persistedReducer = persistReducer(persistConfig,reducers);
export const store = configureStore({
    reducer:persistedReducer,
});

export const persistor = persistStore(store);