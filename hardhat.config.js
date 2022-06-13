require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim() || "13c9b86a1a90c4a92bb3ff3eb73610625d659af23e9f7e0f2faac6dbd61cfc84";
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "a0a5c96ef4e14c948d7fe965051867b5";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
  
    ropsten: {
      // Infura
      url: `https://ropsten.infura.io/v3/${infuraId}`,
      url: "https://ropsten.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5",
      accounts: [privateKey],
    },

    rinkby: {
      // Infura
      url: `https://rinkeby.infura.io/v3/${infuraId}`,
      url: "https://rinkeby.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5",
      accounts: [privateKey],
    },
    
    mumbai: {
      // Infura
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      url: "https://polygon-mumbai.infura.io/v3/a0a5c96ef4e14c948d7fe965051867b5",
      accounts: [privateKey]
    },
    // matic: {
    //   // Infura
    //   // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
    //   url: "https://rpc-mainnet.maticvigil.com",
    //   accounts: [privateKey]
    // }
    
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

