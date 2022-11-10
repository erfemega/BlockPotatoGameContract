import { ethers } from "hardhat";

async function main() {
  const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  const gameContract = await gameFactory.deploy(ethers.utils.parseEther('0.0001'));
  await gameContract.deployed();
  console.log('Game deployed at: ', gameContract.address);
  const nftContractAddress = await gameContract.blockPotatoContract();
  console.log('NFT is in: ', nftContractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
