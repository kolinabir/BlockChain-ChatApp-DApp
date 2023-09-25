
# BlockChain ChatApp DApp

**A decentralized chat application built on the Ethereum Sepolia blockchain.**

[Live Demo](https://smart-chats.netlify.app/)

## Overview

BlockChain ChatApp DApp allows users to communicate securely and privately using blockchain technology.

## Getting Started

### Clone the repository

```bash
git clone https://github.com/kolinabir/BlockChain-ChatApp-DApp.git
```

### Install dependencies

Navigate to the project directory and install the necessary packages.

```bash
cd BlockChain-ChatApp-DApp
yarn install # or npm install
```

### Set up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
SEPOLIA_RPC_URL = "Alchemy RPC URL (SEPOLIA)"
PRIVATE_KEY = "Your Sepolia Account Private Key"
```

### Deploy Contracts

Deploy the necessary smart contracts.

```bash
npx hardhat run scripts/deploy.js --network sepolia
# or
yarn hardhat run scripts/deploy.js --network sepolia
```

### Start the Client Application

Create a `.env` file in the `./client` directory and add the following variable:

```env
VITE_CONTRACT_ADDRESS = "BlockChain ChatApp Contract Address"
```

Navigate to the `./client` directory and install client dependencies.

```bash
cd client
yarn install # or npm install
```

Start the client application.

```bash
npm run dev
# or
yarn dev
```

## Features

- [x] Decentralized Messaging
- [x] Secure Encryption
- [x] User Authentication

## Contact

For any queries or issues related to the contract or the project, please contact: knkolin9@gmail.com
```

