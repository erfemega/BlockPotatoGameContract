import { ethers } from "hardhat";

async function main() {
  const BlockPotatoFactory = await ethers.getContractFactory('BlockPotato');
  const accounts = await ethers.getSigners();
  const signer = accounts[19];

  const BlockPotatoContract = await BlockPotatoFactory.attach('0xa16E02E87b7454126E5E10d957A927A7F5B5d2be');

  const tokens = await BlockPotatoContract.balanceOf(
    signer.address,
  );
  console.log(`balance is: ${tokens}`);

  const tokenOwners =  await BlockPotatoContract.tokenOfOwnerByIndex(
    signer.address,
    1
  );
  console.log('owners', tokenOwners);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
