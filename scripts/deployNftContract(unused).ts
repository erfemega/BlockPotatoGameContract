import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const signer = accounts[1];
  console.log('signer: ', signer);
  const BlockPotatoFactory = await ethers.getContractFactory('BlockPotato');

  const BlockPotatoContract = await BlockPotatoFactory.connect(signer).deploy();
  await BlockPotatoContract.deployed();
  console.log('Contract deployed at: ', BlockPotatoContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
