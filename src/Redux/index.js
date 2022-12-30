import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import rootReducer from "./reducers";

const persistConfig = {
    key:'root',
    storage:AsyncStorage,
}
const persistedReducer  = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer
});
const persistor = persistStore(store);
export {store,persistor}