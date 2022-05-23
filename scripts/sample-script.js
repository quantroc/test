const hre = require("hardhat");

async function main() {

  const TestToken = await hre.ethers.getContractFactory("TestToken");
  console.log('Deploying TestToken...');
  const token = await TestToken.deploy();

  await token.deployed();
  console.log("TestToken deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });