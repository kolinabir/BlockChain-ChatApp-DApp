const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const ChatAppContract = await hre.ethers.getContractFactory("ChatApp");
  console.log("Deploying contract...");
  const ChatApp = await ChatAppContract.deploy();

  // to get address
  console.log("SimpleStorage deployed to:", ChatApp.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0xDE518E411859846F8C758206b783c96f57c96353
