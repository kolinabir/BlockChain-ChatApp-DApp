import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "./contractJson/SecureMarriage.json";
import { Marry } from "./components/Marry";
import { ShowMarriges } from "./components/ShowMarriges";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      try {
        const contractAddress = "0x87A6bfc79e3cC9Fd1C9605397229E9fF5d1a0F37";
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
    <div className="my-10">
      <div className="text-center">Account Connected : {account}</div>
      <Marry state={state}></Marry>
      <ShowMarriges state={state}></ShowMarriges>
    </div>
  );
};

export default App;
