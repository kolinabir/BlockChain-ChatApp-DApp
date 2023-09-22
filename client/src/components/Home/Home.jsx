import React, { useContext } from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../../contractJson/ChatApp.json";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import App from "../../App";
import { AuthContext } from "../Provider/AuthProvider";

const Home = () => {
  const navigate = useNavigate();
  const { account, userName } = useContext(AuthContext);
  const HandleLogin = () => {
    navigate("/createAccount");
  };
  return (
    <div>
      <h3 className="text-center mt-20 p-10  bg-slate-300 items-center flex justify-between">
        {" "}
        <div>Sepolia ETH</div>
        <div className="text-3xl text-center font-bold">
          BlockChain Chat App
        </div>
        <div>
          <h1 className="text-xl ">
            {userName && <h1>UserName : {userName}</h1>}
          </h1>
        </div>
      </h3>
      <div className="my-2 flex flex-col justify-center">
        <App></App>

        {account == "Not connected" ? (
          <div className="text-center mt-5 text-3xl font-semibold">
            Connect your Account First{" "}
          </div>
        ) : (
          <Outlet></Outlet>
        )}
      </div>
    </div>
  );
};

export default Home;
