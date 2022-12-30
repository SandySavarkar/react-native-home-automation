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
        }
    }
})

export const {saveAuthData} = authSlice.actions;
export default authSlice.reducer;