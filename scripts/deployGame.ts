// import { ethers } from "hardhat";
import * as dotenv from 'dotenv';
import { ethers } from "ethers";
import { BlockPotatoGame__factory } from '../typechain-types';
dotenv.config();

async function main() {
  const provider = new ethers.providers.AlchemyProvider('goerli', `${process.env.ALCHEMY_API_KEY}`);
  const wallet = new ethers.Wallet(`${process.env.ACCOUNT_1_SECRET}`);
  const signer = wallet.connect(provider);
  const gameFactory = new BlockPotatoGame__factory(signer);
  const gameContract = await gameFactory.deploy(
    ethers.utils.parseEther('0.0001')
  );
  await gameContract.deployed();

  const nftAddress = await gameContract.blockPotatoContract();

  console.log(`Game has been deployed to address: ${gameContract.address}`);
  console.log(`NFT contract has been deployed in address: ${nftAddress}`);



  // const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  // const gameContract = await gameFactory.deploy(ethers.utils.parseEther('0.0001'));
  // await gameContract.deployed();
  // console.log('Game deployed at: ', gameContract.address);
  // const nftContractAddress = await gameContract.blockPotatoContract();
  // console.log('NFT is in: ', nftContractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
