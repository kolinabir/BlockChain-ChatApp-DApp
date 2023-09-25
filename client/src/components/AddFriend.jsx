import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AddFriend = () => {
  const navigate = useNavigate();
  const { stateContract, account } = useContext(AuthContext);
  const [error, setError] = useState(null); // error handling
  const [userExist, setUserExist] = useState(false);
  useEffect(() => {
    async function checkUserExist() {
      const userExist = await stateContract?.checkUser(account);
      setUserExist(userExist);
    }
    checkUserExist();
  }, [account]);

  if (!userExist) {
    navigate("/LoginState");
  }
  const handleAddFriend = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;
    const name = e.target.name.value;
    const friendIsUser = await stateContract?.checkUser(address);

    if (!friendIsUser) {
      alert("Friend is not a user");
      window.location.reload();
    }
    try {
      const transaction = await stateContract?.addFriend(address, name);
      await transaction.wait();
      alert("Friend Added");
      navigate("/LoginState");
    } catch (error) {
      if (error.message.includes("Already friends")) {
        const errorMessage = "Already friends";
        alert(errorMessage);
        window.location.reload();
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleAddFriend} className="hero my-10 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="address"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="ADD as a friend"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFriend;
