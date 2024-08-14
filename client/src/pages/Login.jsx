import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import login from "../assets/login.png";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        toast.success("Logged in");
      })
      .catch((error) => {
        console.error("Login failed", error);
        toast.error("Logged failed");
      });
  };

  return (
    <main className="flex items-center justify-center h-screen z-[1]">
      <div className="absolute bg-[#87A8DA80] w-[18rem] h-[18rem] rounded-full -top-28 -left-8 z-[2]"></div>
      <div className="absolute bg-[#C5D0F599] w-[6rem] h-[6rem] rounded-full top-10 left-[12rem] z-[3]"></div>
      <div className="absolute rounded-full bottom-0 right-0 z-[3]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="389"
          height="211"
          viewBox="0 0 389 211"
          fill="none"
        >
          <g filter="url(#filter0_f_1_38)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M249.275 4.83496C310.476 7.78623 381.898 -2.22162 424.803 41.5218C468.9 86.4812 496.372 169.05 462.244 221.968C424.779 280.061 317.132 232.84 269.257 282.706C222.865 331.028 286.999 459.167 221.413 472.818C156.217 486.389 148.567 366.785 104.284 317.045C83.3644 293.546 48.6869 286.695 31.9792 260.037C14.6777 232.433 12.1864 199.707 10.3569 167.182C8.1239 127.483 -6.13146 80.9987 20.2346 51.2365C46.5859 21.4908 95.1456 35.3944 134.097 27.5033C173.409 19.539 209.209 2.90291 249.275 4.83496Z"
              fill="url(#paint0_linear_1_38)"
              fill-opacity="0.29"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1_38"
              x="0.510986"
              y="0.680054"
              width="481.054"
              height="477.204"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_1_38"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1_38"
              x1="-7.38539"
              y1="105.114"
              x2="424.332"
              y2="305.604"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#00D2FF" />
              <stop offset="1" stop-color="#3A7BD5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* main form container */}
      <div className="flex sm:flex-row flex-col-reverse items-center justify-between p-3 w-[60rem] sm:h-[40rem]  m-auto rounded-[1.5rem] bg-[rgba(96,96,96,0.77)] backdrop-blur-[4px] z-[4]">
        {/* left */}
        <div>
          <img src={login} alt="" />
        </div>
        {/* right */}
        <div className="flex flex-col items-start justify-center gap-5 m-auto">
          <div className="flex flex-col">
            <h1 className="text-[#FFFFFF] text-[2.5rem] font-medium">
              Welcome back!
            </h1>
            <p className="text-[#A7A7A7] text-[1.25rem]">
              Please login to continue
            </p>
          </div>
          <div className="sm:w-[27rem] w-[20rem] p-4 bg-[#D1D1D1] rounded-[1.6rem] py-10">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center gap-2"
            >
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
                Login
              </button>
              <div>
                <p>
                  New user ?{" "}
                  <a className="text-[#3A31D8] font-medium" href="/register">
                    Register
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

export default Login;
