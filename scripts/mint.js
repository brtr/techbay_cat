const hre = require("hardhat");
const { METADATA_URI, MINT_ADDRESS, CONTRACT_ADDRESS } = process.env;

async function main() {
  const NFT = await hre.ethers.getContractFactory("TechBayCat");
  const contract = NFT.attach(CONTRACT_ADDRESS);
  await contract.mint(MINT_ADDRESS, METADATA_URI);
  console.log("NFT minted:", contract);
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});