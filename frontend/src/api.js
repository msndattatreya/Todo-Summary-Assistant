import axios from "axios";

// Base URL of the backend API (adjust if using different port or deployed URL)
const API = axios.create({ baseURL: "http://localhost:5000" });

// API Endpoints
export const getTodos = () => API.get("/todos");
export const addTodo = (text) => API.post("/todos", { text });
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
export const summarizeTodos = () => API.post("/summarize");
