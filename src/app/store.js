// import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import studentReducer from "../features/studentSlice";

// const store = configureStore({
//   reducer: { students: studentReducer },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export default store;






import { configureStore } from '@reduxjs/toolkit';
// import countReducer from '../features/countSlice';
import todoReducer from '../features/todoSlice';

const store = configureStore({
  reducer:{
    
    todo: todoReducer
  }
})

export default store;

