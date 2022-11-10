import { ethers } from "hardhat";

async function main() {
  const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  const gameContract = await gameFactory.attach('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  console.log('Game attached at: ', gameContract.address);

  const signers = await ethers.getSigners();
  const currentSigner = signers[19];
  const otherSigner = signers[18];

  const playCost = await gameContract.playCost();
  console.log('game costs: ', ethers.utils.formatEther(playCost));

  const addressNfts = await gameContract.getAddressNfts(
    currentSigner.address
  )
  console.log(`This address has ${addressNfts} Nfts`);

  const addressNfts2 = await gameContract.getAddressNfts(
    otherSigner.address
  )
  console.log(`This address2 has ${addressNfts2} Nfts`);

  await gameContract.connect(currentSigner).play({value: ethers.utils.parseEther('0.0001')});
  await gameContract.connect(otherSigner).play({value: ethers.utils.parseEther('0.0001')});

  const newAddressNfts = await gameContract.getAddressNfts(
    currentSigner.address
  )
  console.log(`This address has ${newAddressNfts} Nfts after the play`);

  const newAddressNfts2 = await gameContract.getAddressNfts(
    otherSigner.address
  )
  console.log(`This address2 has ${newAddressNfts2} Nfts after the play`);

  const signerBalance = await currentSigner.getBalance();
  console.log('signerBalance is: ', signerBalance);

  const signerBalance2 = await otherSigner.getBalance();
  console.log('signerBalance2 is: ', signerBalance2);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
