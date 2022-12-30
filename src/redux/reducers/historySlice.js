import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history:[]
};

const historySlice =  createSlice({
    name:'history',
    initialState,
    reducers:{
        updateHistory(state,action){
            state.history = action.payload;
        }
    }
})

export const {updateHistory} = historySlice.actions;
export default historySlice.reducer;