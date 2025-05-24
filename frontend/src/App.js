import React, { useEffect, useState } from "react";
import { getTodos, addTodo, deleteTodo, summarizeTodos } from "./api";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import SummaryButton from "./components/SummaryButton";

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch all todos from the backend
  const loadTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Load todos once on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Add todo
  const handleAdd = async (text) => {
    await addTodo(text);
    loadTodos();
  };

  // Delete todo
  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  // Summarize todos
  const handleSummarize = async () => {
    await summarizeTodos();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📝 Todo Summary Assistant</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} />
      <SummaryButton onSummarize={handleSummarize} />
    </div>
  );
}

export default App;
