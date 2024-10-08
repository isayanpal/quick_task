import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoPage from "./pages/TodoPage";
import { loadUser } from "./features/authSlice";
import LandingPage from "./pages/LandingPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(loadUser()); // Load user data when the app starts
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={token ? <TodoPage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// {!token ? (
//   <>
//     <Route path="/" element={<LandingPage />} />
//     <Route path="/login" element={<Login />} />
//     <Route path="/register" element={<Register />} />
//   </>
// ) : (
//   <Route path="/" element={<TodoPage />} />
// )}
