import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import register from "../assets/register.png";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Registered successfully");
      })
      .catch((error) => {
        console.error("Registration failed", error);
        toast.error("Sign up failed");
      });
  };

  return (
    <main className="flex items-center justify-center h-screen z-[1]">
      <div className="absolute bg-[#EAACAC] w-[18rem] h-[18rem] rounded-full -top-36 -left-10 z-[2]"></div>
      <div className="absolute bg-[#C5D0F599] w-[6rem] h-[6rem] rounded-full top-10 left-[12rem] z-[3]"></div>

      {/* main form container */}
      <div className="flex sm:flex-row flex-col-reverse items-center justify-between gap-3 p-3 w-[60rem] sm:h-[40rem] m-auto rounded-[1.5rem] bg-[rgba(96,96,96,0.77)] backdrop-blur-[4px] z-[4]">
        {/* left */}
        <div>
          <img src={register} alt="" />
        </div>
        {/* right */}
        <div className="flex flex-col items-start justify-center gap-5 m-auto">
          <div className="flex flex-col">
            <h1 className="text-[#FFFFFF] text-[2.5rem] font-medium">
              Join us today!
            </h1>
            <p className="text-[#A7A7A7] text-[1.25rem]">
              Sign up now to become a member.
            </p>
          </div>
          <div className="sm:w-[27rem] w-[20rem] p-4 bg-[#D1D1D1] rounded-[1.6rem] py-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="bg-[#E8E8E8] w-3/4 px-2 py-2 rounded-xl flex flex-row gap-2 items-center">
                <FaRegUser />
                <input
                  className="bg-transparent w-full "
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="bg-[#E8E8E8] w-3/4 px-2 py-2 rounded-xl flex flex-row gap-2 items-center">
                <IoMdMail />
                <input
                  className="bg-transparent w-full "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="bg-[#E8E8E8] w-3/4 px-2 py-2 rounded-xl flex flex-row gap-2 items-center">
                <RiLockPasswordLine />
                <input
                  className="bg-transparent w-full "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                className="text-white bg-[#3A31D8] rounded-xl w-3/4 py-2"
                type="submit"
              >
                Sign up
              </button>
              <div>
                <p>
                  Already have an account?{" "}
                  <a className="text-[#3A31D8] font-medium" href="/login">
                    Login
                  </a>{" "}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
