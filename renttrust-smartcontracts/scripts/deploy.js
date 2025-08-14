const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);

  // 1. Deploy ReputationLedger
  const ReputationLedger = await ethers.getContractFactory("ReputationLedger");
  const reputationLedger = await ReputationLedger.deploy();
  await reputationLedger.waitForDeployment();
  console.log("ReputationLedger deployed to:", await reputationLedger.getAddress());

  // 2. Define constructor values for RentTrust
  const tenant = "0x537210a9E0C7281b3aDdd0AE1C4E6fE376Af37cA"; // Replace with real tenant address
  const propertyAddress = "123 Blockchain St, Cryptoville";
  const rentAmount = ethers.parseEther("1"); // 1 ETH
  const securityDeposit = ethers.parseEther("0.5"); // 0.5 ETH
  const startDate = Math.floor(new Date("2025-07-31T05:45:00Z").getTime() / 1000);
  const endDate = Math.floor(new Date("2026-07-31T05:45:00Z").getTime() / 1000);
  const rules = "No pets. Rent due on the 3rd day after start.";
  const dueDate = Math.floor(new Date("2025-08-02T05:45:00Z").getTime() / 1000); // 2 days after startDate

  // 3. Deploy RentTrust with 9 arguments
  const RentTrust = await ethers.getContractFactory("RentTrust");
  const rentTrust = await RentTrust.deploy(
    tenant,
    propertyAddress,
    rentAmount,
    securityDeposit,
    startDate,
    endDate,
    rules,
    dueDate,
    await reputationLedger.getAddress()
  );
  await rentTrust.waitForDeployment();
  console.log("RentTrust deployed to:", await rentTrust.getAddress());
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});

