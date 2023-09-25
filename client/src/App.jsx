import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import abi from "./contractJson/ChatApp.json";
import CreateAccount from "./components/CreateAccount";
import { AuthContext } from "./components/Provider/AuthProvider";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const { account, setAccount, setStateContract } = useContext(AuthContext);
  useEffect(() => {
    const template = async () => {
      try {
        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        const contractABI = abi.abi;
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          window.ethereum.on("accountsChanged", () => {
            console.log("Accounts changed");
            window.location.reload();
          });
          setAccount(provider.provider.selectedAddress);
          setState({ provider, signer, contract });
          setStateContract(contract);
        } else {
          console.log("Please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    template();
  }, []);

  return (
    <div className="my-2">
      <div className="text-center">Account Connected : {account}</div>
      {/* {console.log(account)} */}
    </div>
  );
};

export default App;
