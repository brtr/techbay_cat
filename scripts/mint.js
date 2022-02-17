const hre = require("hardhat");

async function main() {
  const NFT = await hre.ethers.getContractFactory("SampleToken");
  const { SAMPLE_ADDRESS, SAMPLE2_ADDRESS, OWNER_ADDRESS } = process.env;
  const sampleContract = NFT.attach(SAMPLE_ADDRESS);
  await sampleContract.addController(OWNER_ADDRESS);
  await sampleContract.mint(OWNER_ADDRESS, ethers.utils.parseUnits('10000', 'ether'));

  const sample2Contract = NFT.attach(SAMPLE2_ADDRESS);
  await sample2Contract.addController(OWNER_ADDRESS);
  await sample2Contract.mint(OWNER_ADDRESS, ethers.utils.parseUnits('10000', 'ether'));
}
main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});