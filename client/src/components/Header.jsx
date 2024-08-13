import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">Todos</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default Header;
