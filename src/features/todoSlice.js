import { createSlice,nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"todo",
    initialState:[{id:1,text:"SP"}],
    reducers:{
        addtodo:(state,action)=>{
           state.push({id:nanoid(), text:action.payload})
        },

        removetodo:(state,action)=>{
          return state.filter((todo)=>todo.id !== action.payload)
        },

        updatetodo:(state,action)=>{
          const {id, newText} = action.payload;
          const todo = state.find((todo)=>todo.id===id)
          if(todo){
           todo.text=newText;
          }
        }
    }
})

console.log(todoSlice,"slice");
export const {addtodo,removetodo,updatetodo} = todoSlice.actions;
export default todoSlice.reducer;