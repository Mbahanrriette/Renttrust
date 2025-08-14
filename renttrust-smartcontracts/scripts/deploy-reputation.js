const hre = require("hardhat");

async function main() {
  const ReputationLedger = await hre.ethers.getContractFactory("ReputationLedger");

  const ledger = await ReputationLedger.deploy(); // deploy contract

  await ledger.waitForDeployment(); // wait for deployment (Ethers v6)

  const deployedAddress = await ledger.getAddress(); // get deployed address

  console.log("ReputationLedger deployed to:", deployedAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(" Deployment failed:", error);
    process.exit(1);
  });

