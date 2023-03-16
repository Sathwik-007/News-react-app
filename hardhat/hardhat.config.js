require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: "0.8.18",
  networks: {
    localhost: {
      url: "http://localhost:8545",
    },
  }
};
