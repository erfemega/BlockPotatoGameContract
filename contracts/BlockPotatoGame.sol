// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./BlockPotato.sol";

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlockPotatoGame is Ownable {
  struct NFT {
    uint256 tokenId;
    string uri;
  }
  uint256 public MAX_WINNER_UMBRAL = 1000;
  using Counters for Counters.Counter;
  BlockPotato public blockPotatoContract;
  uint256 public playCost;
  uint256 public winnerUmbral;
  
  

  Counters.Counter private _matchCounter;


  constructor(uint256 _playCost) {
    blockPotatoContract = new BlockPotato();
    playCost = _playCost;
    winnerUmbral = 500;
  }

  function play() public payable {
    require(msg.value >= playCost, 'You must cover the play cost');
    bool winner = isWinner();
    if (winner) {
      mintNFT(msg.sender);
    }
  }

  
  function getAddressNfts(address _playerAddress) public view returns(uint256 tokensCount)  {
    tokensCount = blockPotatoContract.balanceOf(_playerAddress);
  }

  // function getNftsOfOwner(address _playerAddress) public {
  //   uint tokenCount = blockPotatoContract.balanceOf(_playerAddress);
  //    uint[] memory tokensId = new uint256[](tokenCount);
  //    for (uint i = 0; i < tokenCount; i++) {
  //         tokensId[i] = tokenOfOwnerByIndex(_owner, i);
  //    }

  //    return tokensId;
  // }
  function setWinnerUmbral(uint256 _newWinnerUmbral) public onlyOwner {
    require(_newWinnerUmbral < MAX_WINNER_UMBRAL, "Invalid winner umbral value");
    winnerUmbral = _newWinnerUmbral;
  }

  function mintNFT(address recipient) internal {
    blockPotatoContract.safeMint(recipient, 'test');
  }

  function claimNFT() external returns(uint256 newBalance){
    mintNFT(msg.sender);
    newBalance = blockPotatoContract.balanceOf(msg.sender);
  }

  function getNftSupply() public view returns (uint256 supply) {
    supply = blockPotatoContract.totalSupply();
  }

  function getTotalBalance() public view returns (uint256 balance){
    balance = address(this).balance;
  }

  function isWinner() internal view returns (bool winner) {
    uint256 number = getRandomNumber() % MAX_WINNER_UMBRAL;
    winner = number <= winnerUmbral;
  }

  function getRandomNumber() internal view returns (uint256 randomNumber) {
      randomNumber = block.difficulty;
  }

  function burnNft(uint256 tokenId) public returns (uint256 price) {
    blockPotatoContract.burnNFT(msg.sender, tokenId);
    price = address(this).balance / blockPotatoContract.totalSupply();
    payable(msg.sender).transfer(price);
  }

  function currentNFTPrice() public view returns (uint256 price) {
    uint256 balance = address(this).balance;
    uint256 totalNfts = blockPotatoContract.totalSupply();
    if (totalNfts == 0) {
      return 0;
    }
    price = balance / totalNfts;
  }

  function getTotalNFTs() public view returns (uint256 totalNfts) {
    totalNfts = blockPotatoContract.totalSupply();
  }

  // function NFTsByAddress(address _holderAddress) public view returns (uint256[] memory nfts){
  //   // nfts = blockPotatoContract.getHolderNfts(_holderAddress);
    
  // }
}