import { ethers } from "hardhat";

async function main() {
  const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  const gameContract = await gameFactory.attach('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  console.log('Game attached at: ', gameContract.address);

  const totalNfts = await gameContract.getTotalNFTs();
  console.log('total nfts are: ', totalNfts);


  const totalBalanceInGame = await gameContract.getTotalBalance();
  console.log('Total balance of game is: ', ethers.utils.formatEther(totalBalanceInGame));

  const nftPrice = await gameContract.currentNFTPrice();
  console.log('The nft price is: ', ethers.utils.formatEther(nftPrice));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
