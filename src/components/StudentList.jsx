import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, addStudent, deleteStudent } from "../features/studentSlice"

const StudentList = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.students);
  const [newStudent, setNewStudent] = useState("");

  useEffect(() => {
    dispatch(fetchStudents()); // Fetch students on component mount
  }, [dispatch]);

  const handleAddStudent = () => {
    if (newStudent.trim()) {
      dispatch(addStudent({ name: newStudent }));
      setNewStudent("");
    }
  };

  const handleDeleteStudent = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>🎓 Student Management System</h2>

      {/* Show Loading Indicator */}
      {loading && <p>Loading students...</p>}

      {/* Show Error Message */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Add Student */}
      <input 
        type="text" 
        value={newStudent} 
        onChange={(e) => setNewStudent(e.target.value)} 
        placeholder="Enter student name"
      />
      <button onClick={handleAddStudent}>Add Student</button>

      {/* Display Student List */}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDeleteStudent(student.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
