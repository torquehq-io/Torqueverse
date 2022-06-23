
# Full stack NFT marketplace built with  Solidity, IPFS, & React.js

[![Build Status](https://torque-nftmarketplace.netlify.app/)](https://torque-nftmarketplace.netlify.app/)

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
1. user has to login with the metamask 

2. Create Page: If user want to upload the NFT then user have to enter the NFT name,description,and price after 
	that user has to pay gas fees and listing price for the same.

3. Marketplace Page: Here user can explore the types of NFTs like images,videos,GIFs,audio and many more and buy from it. 

4. Detail Page: Here user can see details of the NFTs.

5. My NFT Page: Here user can see their owned NFTs. 

6. Daashboard : Here user can see listed NFTs.

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

