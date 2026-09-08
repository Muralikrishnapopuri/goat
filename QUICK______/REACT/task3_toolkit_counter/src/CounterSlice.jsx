import { createSlice } from "@reduxjs/toolkit";

const counterSlice=createSlice({
    name:"counter",
    initialState:{value:0},
    reducers:{
        incre:(state)=>{
            state.value+=1;
        },
        decre:(state)=>{
            state.value=-+1;
        },
        reset:(state)=>{
            state.value=0;
        },
        addByAmount:(state,action)=>{
            state.value+=action.payload;
        }
    }
});
export const {incre,decre,reset,addByAmount}=counterSlice.actions;
export default counterSlice.reducer;