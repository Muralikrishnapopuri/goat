import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:[{id:1,name:"krish",age:24,no:"987654342",roll:"Full Stack Dev"}],
    reducers:{
        register:((state,action)=>{
          state.push(action.payload);
        }),
        remove:((state,action)=>{
          return   state.filter((user)=>user.id!=action.payload);
            
        }),

    }
});

export const {register,remove}=userSlice.actions;
export default userSlice.reducer;