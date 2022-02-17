const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("SampleToken");
  let nft = await NFT.deploy("SampleToken", "STT");   //CONTRACT INFO
  await nft.deployed();
  console.log("Sample token deployed to:", nft.address);

  nft = await NFT.deploy("SampleToken2", "STT");   //CONTRACT INFO
  await nft.deployed();
  console.log("Sample token 2 deployed to:", nft.address);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});
