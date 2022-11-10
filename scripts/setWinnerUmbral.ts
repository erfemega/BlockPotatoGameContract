import { ethers } from "hardhat";

async function main() {
  const gameFactory = await ethers.getContractFactory('BlockPotatoGame');
  const gameContract = await gameFactory.attach('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  console.log('Game attached at: ', gameContract.address);

  const winnerUmbral = await gameContract.winnerUmbral();
  console.log('winner umbral is: ', winnerUmbral);

  const maxUmbral = await gameContract.MAX_WINNER_UMBRAL();
  console.log('max winner umbral is: ', maxUmbral);
  
  await gameContract.setWinnerUmbral(500);

  const winnerUmbral2 = await gameContract.winnerUmbral();
  console.log('winner umbral after change is: ', winnerUmbral2);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
