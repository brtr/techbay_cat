const hre = require("hardhat");
async function main() {
  let NFT = await hre.ethers.getContractFactory("SampleToken");
  let nft = await NFT.deploy("SampleToken", "STT");   //CONTRACT INFO
  await nft.deployed();
  console.log("Sample token deployed to:", nft.address);

  nft = await NFT.deploy("SampleToken2", "STT");   //CONTRACT INFO
  await nft.deployed();
  console.log("Sample token 2 deployed to:", nft.address);

  NFT = await hre.ethers.getContractFactory("WithdrawToken");
  nft = await NFT.deploy(nft.address)
  await nft.deployed();
  console.log("Withdraw token deployed to:", nft.address);

}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
