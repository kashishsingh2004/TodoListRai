import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
  name:"count",
  initialState:0,
  reducers:{
    increment:(state,action)=>console.log(action),
    decrement:(state,action)=>state-1,
    reset:()=>0,
  }
})

//export for componets 
export const {increment,decrement,reset} = countSlice.actions;
//export for the store 
export default countSlice.reducer;