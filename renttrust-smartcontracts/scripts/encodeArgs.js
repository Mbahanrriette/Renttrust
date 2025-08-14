const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const tenant = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const propertyAddress = "123 Main Street, Apt 4B";
  // Use parseEther properly
  const rentAmount = ethers.parseEther("1");         // or ethers.utils.parseEther("1")
  const securityDeposit = ethers.parseEther("2");    // or ethers.utils.parseEther("2")
  const startDate = Math.floor(Date.now() / 1000);
  const endDate = startDate + 60 * 60 * 24 * 30;
  const dueDate = startDate + 60 * 60 * 24 * 7;
  const rules = "No smoking, no pets";

  console.log({
    tenant,
    propertyAddress,
    rentAmount: rentAmount.toString(),
    securityDeposit: securityDeposit.toString(),
    startDate,
    endDate,
    dueDate,
    rules
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

