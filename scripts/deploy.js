const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const SecureMarriageContract = await hre.ethers.getContractFactory(
    "SecureMarriage"
  );
  console.log("Deploying contract...");
  const secureMarriage = await SecureMarriageContract.deploy();

  // to get address
  console.log("SimpleStorage deployed to:", secureMarriage.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




  // 0xDE518E411859846F8C758206b783c96f57c96353