import React from "react";
import landing from "../assets/landing.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <main className="h-screen m-5">
      <div className="flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <h1 className="text-white font-medium sm:text-[105px] text-[50px]">
            Welcome To <span className="italic text-[#3A31D8]">QuickTask</span>
          </h1>
        </div>
        <div className="flex sm:flex-row flex-col items-center justify-around">
          <div className="sm:w-[600px] w-[300px]">
            <p className="text-white sm:text-[32px] text-[24px] italic font-light">
              Empowering You to Navigate Your Tasks with Precision, Stay
              Organized, and Achieve More Every Day.
            </p>
            <Link to={token ? "/dashboard" : "/login"}>
              <button className="px-5 py-2 my-3 text-white bg-[#3A31D8] rounded-3xl">
                Get Started
              </button>
            </Link>
          </div>
          <div>
            <img src={landing} alt="" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
