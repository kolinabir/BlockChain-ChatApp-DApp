import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState("Not connected");
  const [stateContract, setStateContract] = useState(null);
  const [userName, setUserName] = useState(null);
  const AuthInfo = {
    account,
    setAccount,
    stateContract,
    setStateContract,
    userName,
    setUserName,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
