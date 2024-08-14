import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out");
  };

  return (
    <main>
      <nav className="flex flex-row items-center justify-between gap-20 my-5">
        <Link to="/">
          <div className="italic text-[#3A31D8] font-semibold text-[2rem]">
            QuickTask
          </div>
        </Link>
        <button
          className="bg-[#E24A4A] px-5 py-2 rounded-3xl text-[#0D0D0D] font-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </main>
  );
};

export default Header;
