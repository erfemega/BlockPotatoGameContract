// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract BlockPotato is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    // mapping(address => uint256[]) holders;
    mapping (uint256 => address) public NFTOwner;
    mapping (address => mapping (uint => address)) public holders;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Block Potato", "POTATO") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://BlockPotato";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address recipient, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        // Winner memory winner = winners[msg.sender];
        _tokenIdCounter.increment();
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);
        
        // holders[recipient].push(tokenId);
        NFTOwner[tokenId] = recipient;
        holders[recipient][tokenId] = recipient;
    }

    

    // function getHolderNfts(address _holder) public view returns (uint256[] memory nfts) {
    //     nfts = holders[_holder];
    // }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function burnNFT(address holder, uint256 tokenId) external onlyOwner {
        require(NFTOwner[tokenId] == holder, 'You cannot burn this NFT');
        _burn(tokenId);
        delete NFTOwner[tokenId];
    }
    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}