const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account: ", deployer.address);

  const NttId = await ethers.getContractFactory("NttId");
  const nttId = await NttId.deploy("idType", "idName", deployer.address);

  console.log("NttId address: ", nttId.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
