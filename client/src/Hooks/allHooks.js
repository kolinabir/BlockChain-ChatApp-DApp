import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Assuming you have an AuthContext

function checkUserExistAndNavigate() {
  const navigate = useNavigate();
  const { stateContract, account } = useContext(AuthContext);

  async function checkUserExist() {
    const userExist = await stateContract?.checkUser(account);
    return userExist;
  }

  checkUserExist().then((userExist) => {
    if (!userExist) {
      navigate("/LoginState");
    }
  });
}

export default checkUserExistAndNavigate;
