import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtodo, removetodo ,updatetodo} from "../features/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todo);
  console.log(todos, "todolist");
  const dispatch = useDispatch();

  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAdd = () => {
    dispatch(addtodo(task));
    setTask("");
  };

  const handleUpdate=(id,text)=>{
    setEditId(id);
    setEditText(text);
  }

  const handleUpdateConfirm=()=>{
    dispatch(updatetodo({id:editId, newText:editText}));
    setEditId(null);
    setEditText("")
  }

  const handleCancel=()=>{
    setEditId(null);
    setEditText("");
  }



  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleUpdateConfirm}>OK</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => dispatch(removetodo(todo.id))}>
                  remove
                </button>
                <button onClick={() => handleUpdate(todo.id, todo.text)}>
                  Update
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
