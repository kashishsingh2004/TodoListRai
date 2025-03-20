import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchStudentsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess: (state, action) => {
      state.loading = false;
      state.students = action.payload;
    },
    fetchStudentsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addStudentSuccess: (state, action) => {
      state.students.push(action.payload);
    },
    deleteStudentSuccess: (state, action) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
  },
});

export const { 
  fetchStudentsRequest, fetchStudentsSuccess, fetchStudentsFailure, 
  addStudentSuccess, deleteStudentSuccess 
} = studentSlice.actions;

export default studentSlice.reducer;

// **Thunk: Fetch Students**
export const fetchStudents = () => async (dispatch) => {
  dispatch(fetchStudentsRequest());
  try {
    const response = await fetch("https://freetestapi.com/api/v1/students");
    const data = await response.json();
    dispatch(fetchStudentsSuccess(data));
  } catch (error) {
    dispatch(fetchStudentsFailure(error.message));
  }
};

// **Thunk: Add Student**
export const addStudent = (newStudent) => async (dispatch) => {
  try {
    const response = await fetch("https://freetestapi.com/api/v1/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const data = await response.json();
    dispatch(addStudentSuccess(data));
  } catch (error) {
    console.error("Error adding student:", error);
  }
};

// **Thunk: Delete Student**
export const deleteStudent = (id) => async (dispatch) => {
  try {
    await fetch(`https://api.university.com/students/${id}`, { method: "DELETE" });
    dispatch(deleteStudentSuccess(id));
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};
