import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE_URL);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      userData
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      userData
    );
    return response.data;
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      // Optionally, decode the token to get user info
      const response = await axios.get(`${API_BASE_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload; // Set the user data
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
