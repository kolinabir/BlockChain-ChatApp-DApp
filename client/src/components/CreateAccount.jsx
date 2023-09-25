import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider";

import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const { stateContract, account } = useContext(AuthContext);
  const [userExist, setUserExist] = useState(false);
  useEffect(() => {
    async function checkUserExist() {
      const userExist = await stateContract?.checkUser(account);
      setUserExist(userExist);
    }
    checkUserExist();
  }, [account]);

  if (userExist) {
    navigate("/LoginState");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameOfYours = e.target.nameOfYours.value;

    // const { contract } = stateContract;

    const transaction = await stateContract?.createAccount(nameOfYours);

    await transaction.wait();
    alert("Transaction mined");
    navigate("/LoginState");
  };
  return (
    <form onSubmit={handleSubmit} className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create an Account</h1>
          <p className="py-6"></p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
                <input type="text" name="name" id="name" />
              </label>
              <input
                required
                placeholder="Enter Your Name"
                className="border rounded border-blue-600 p-3"
                type="text"
                name="nameOfYours"
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateAccount;
