import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation } from "react-router-dom";

const LoginState = () => {
  const { stateContract, account, userName, setUserName } =
    useContext(AuthContext);
  const [userExist, setUserExist] = useState(false);
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    async function checkUserExist() {
      const userExist = await stateContract?.checkUser(account);
      setUserExist(userExist);
      const userName = await stateContract?.getUserName(account);
      setUserName(userName);
      const friendList = await stateContract?.getMyFriendList();
      setFriendList(friendList);
    }
    checkUserExist();
  }, [account]);

  return (
    <div className="py-10 text-center bg-gradient-to-bl from-white via-cyan-200 to-teal-200">
      {userExist ? (
        <>
          <div>Welcome Back: {userName}</div>
          <Link className="btn btn-accent my-4" to="/addafriend">
            Add a friend
          </Link>
        </>
      ) : (
        <Link to="/createAccount">Create an account</Link>
      )}
      <div className="flex justify-center gap-10">
        {friendList.map((friend) => {
          return (
            <div className="" key={friend.name}>
              <div className="card glass">
                <div className="card-body">
                  <h2 className="card-title flex justify-center">
                    Friend Name: {friend.name}
                  </h2>
                  <h2>Address: </h2>
                  <p>{friend.F_address}</p>
                  <div className="card-actions justify-end">
                    <Link
                      state={friend}
                      to="/messagePortal"
                      className="btn btn-primary"
                    >
                      Send Message
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoginState;
