import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    history:[],
    pinsHistoryData:null
};

const historySlice =  createSlice({
    name:'history',
    initialState,
    reducers:{
        updateHistory(state,action){
            state.history = action.payload;
        },
        updatePinsHistoryData(state,action){
            state.pinsHistoryData = action.payload;
        }
    }
})

export const {updateHistory,updatePinsHistoryData} = historySlice.actions;
export default historySlice.reducer;