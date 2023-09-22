import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const LoginState = () => {
  const { stateContract, account, userName, setUserName } =
    useContext(AuthContext);
  const [userExist, setUserExist] = useState(false);
  useEffect(() => {
    async function checkUserExist() {
      const userExist = await stateContract?.checkUser(account);
      setUserExist(userExist);
      const userName = await stateContract?.getUserName(account);
      setUserName(userName);
    }
    checkUserExist();
  }, [account]);

  return (
    <div className="text-center">
      {userExist ? (
        <>
          {" "}
          <div>Welcome Back : </div>
          <Link className="btn btn-accent my-4" to="/addafriend">
            Add a friend
          </Link>
        </>
      ) : (
        <Link to="/createAccount">Create an account</Link>
      )}
    </div>
  );
};

export default LoginState;
