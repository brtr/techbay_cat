pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract TechBayTest is ERC721Enumerable, Ownable {
    //supply counters
    uint64 public totalCount = 50;
    uint256 public price = 0.001 ether;
    address payable private w1;  // Vault
    string private _baseUri;
    mapping (uint256 => uint256) private _tokenURIs;

    constructor(string memory name_, string memory symbol_,address payable wAddress) ERC721(name_, symbol_) {
       w1 = wAddress;
    }

    function setBaseURI(string memory _newURI) public onlyOwner {
        _baseUri = _newURI;
    }

    function setMaxNftSupply(uint64 maxNftSupply) public onlyOwner {
        totalCount = maxNftSupply;
    }

    function random() public view returns (uint256) {
        // get an integer between 0 and 50
        return uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%251/5);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseUri;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, Strings.toString(_tokenURIs[tokenId]))) : "";
    }

    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 count = balanceOf(owner);
        uint256[] memory ids = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            ids[i] = tokenOfOwnerByIndex(owner, i);
        }
        return ids;
    }

    function setSalePrice(uint256 nowPrice) public onlyOwner {
        price = nowPrice;
    }

    function mint() public payable {
        uint256 ts = totalSupply() + 1;
        require(ts <= totalCount, "max supply reached!");
        require(msg.value >= price, "value error, please check price.");
        (bool success, ) = w1.call{ value: msg.value }("");
        require(success, "payable failed.");

        _tokenURIs[ts] = random();
        _safeMint(_msgSender(), ts);
    }

    function setVault(address payable addr) public onlyOwner {
        w1 = addr;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawBalance() public onlyOwner {
        uint256 curr_balance = address(this).balance;
        if (curr_balance == 0) return;
        (bool success, ) = w1.call{ value: curr_balance }("");
        require(success, "Transfer failed.");
    }
}