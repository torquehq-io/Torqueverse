
# Full stack NFT marketplace built with  Solidity, IPFS, & React.js

[![Build Status](https://torque-nftmarketplace.netlify.app/)](https://torque-nftmarketplace.netlify.app/)

# Prerequisites:-

Before running the project please generate your own .secret file and enter the private key for the account that you wish to utilise for deploying and testing the torqueverse smart contracts.

# Running in a Local setup:-

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```sh
git clone https://github.com/TORQUE-AMBIPLATFORMS/Torqueverse.git

cd torqueverse

# install using NPM or Yarn

npm install --force
``` 

2. Start the app

```sh
npm start
``` 


# For deploying on a hardhat node :-

1. Start the local Hardhat node

```sh
npx hardhat node
```

2. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

3. Start the app

```sh
npm start
```

### Project Execution
1. The user has to login with metamask 

2. Create Page: If the user wants to upload an NFT then they need to provide the NFT name, description and price, after that the user has to pay the gas fees and listing price for the same.

3. Marketplace Page: Here the user can explore the types of NFTs like images, videos, GIFs, 3D models and many more, as well as buy from the provided collections. 

4. Detail Page: User access for details of the NFTs.

5. My NFT Page: Here the user can see their owned NFT assets. 

6. Dashboard : Shows all the listed NFTs.

### Configuration

To deploy to  test or main networks, update the configurations located in __hardhat.config.js__ to use a private key and, optionally, deploy to a private RPC like Infura.

```javascript
require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

// infuraId is optional if you are using Infura RPC
const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/${infuraId}`
      url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey]
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [privateKey]
    }
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
```

