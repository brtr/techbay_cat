/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "matic",
   etherscan: {
      apiKey: API_KEY
   },
   networks: {
      matic: {
         url: API_URL,
         accounts: [PRIVATE_KEY]
      }
   },
}