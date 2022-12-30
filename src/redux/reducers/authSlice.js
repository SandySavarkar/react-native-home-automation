import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth:null
};

const authSlice =  createSlice({
    name:'auth',
    initialState,
    reducers:{
        saveAuthData(state,action){
            state.auth = action.payload;
        },
        clear(state,action){
            state.auth=null
        }
    }
})

export const {saveAuthData,clear} = authSlice.actions;
export default authSlice.reducer;