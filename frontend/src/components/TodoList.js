import React from "react";

const TodoList = ({ todos, onDelete }) => {
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
          <span>{todo.text}</span>
          <button
            onClick={() => onDelete(todo.id)}
            style={{ marginLeft: "1rem" }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
