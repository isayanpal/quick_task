import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.get("http://localhost:5000/api/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (todoData, { getState }) => {
    const token = getState().auth.token;
    const response = await axios.post(
      "http://localhost:5000/api/todos",
      todoData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todoData, { getState }) => {
    const token = getState().auth.token;
    const { id, text, completed } = todoData;
    const response = await axios.put(
      `http://localhost:5000/api/todos/${id}`,
      { text, completed },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { getState }) => {
    const token = getState().auth.token;
    await axios.delete(`http://localhost:5000/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
