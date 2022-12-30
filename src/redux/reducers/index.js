import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import historySlice from "./historySlice";

export const reducers = combineReducers({
    auth:authSlice,
    history:historySlice,
})