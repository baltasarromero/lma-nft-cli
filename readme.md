## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is a simple commmand line tool to interact with the L¡meAcademy NFT Marketplace.
Version 0.1.0 only supports interactions with Listings. It supports creating a listing, purchasing an NFT listed in the marketplace and cancelling a listing.

## Technologies

Project is created with:

- Node js
- Commander: 10.0.0
- Ethers: 5.7.2

## Setup

To run this project, install it locally using npm:

```
$ cd ../cli-test
$ npm install

## Configuration
Create an .env file with the following key/values

ETHEREUM_NETWORK = {NETWORK-NAME} //The name of the network where the NFTMarketplace is deployed
INFURA_PROJECT_ID = {INFURA_PROJECT_ID} //Your Infura project ID
NFT_MARKETPLACE_CONTRACT_ADDRESS = {NFT_MARKETPLACE_CONTRACT_ADDRESS}
```
