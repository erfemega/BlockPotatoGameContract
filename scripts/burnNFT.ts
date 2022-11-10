import { ethers } from "hardhat";

async function main() {
  const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  const gameContract = await gameFactory.attach('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  console.log('Game attached at: ', gameContract.address);

  const signers = await ethers.getSigners();
  const currentSigner = signers[19];
  const otherSigner = signers[18];


  const addressNfts = await gameContract.getAddressNfts(
    currentSigner.address
  )
  console.log(`This currentSigner has ${addressNfts} Nfts`);

  const addressNfts2 = await gameContract.getAddressNfts(
    otherSigner.address
  )
  console.log(`This otherSigner has ${addressNfts2} Nfts`);


  

  const burner = currentSigner;
  const tokenToBurn = 5;
  
  const price = await gameContract.connect(burner).burnNft(tokenToBurn);

  console.log(`The token with ID: ${tokenToBurn} has been burned with a price of ${price}`);

  const newAddressNfts = await gameContract.getAddressNfts(
    currentSigner.address
  )
  console.log(`This currentSigner has ${newAddressNfts} Nfts after the burning`);

  const newAddressNfts2 = await gameContract.getAddressNfts(
    otherSigner.address
  )
  console.log(`This otherSigner has ${newAddressNfts2} Nfts after the burning`);

  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
