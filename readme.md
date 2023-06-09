## Table of contents

  

- [General info](#general-info)

- [Technologies](#technologies)

- [Setup](#setup)

  

## General info

This project is a simple command line tool to interact with the NFT Marketplace created for LimeAcademy's bootcamp. Github repo: [here](https://github.com/baltasarromero/lma-nft-marketplace)

Version 0.1.0 supports interactions with Listings and NFT Offers. 
### Listings
This tool supports creating a listing, purchasing an NFT listed in the marketplace and cancelling a previously listing. Contract used for testing purposes "TestCarsNFT" deployed at 0x38Db61983fb2A5853e09466067333EFf5A04A04F in sepolia.

### NFT Offers
The tool supports creating  offers for NFTs that are not listed in the marketplace, cancelling an offer and accepting offers having previously approved the marketplace or using an [EIP721](https://eips.ethereum.org/EIPS/eip-712) type permits.
In order to use the permit based function (acceptNFTOfferWithPermit) the NFT has to either extend abstract contract [ERC721WithPermit](https://github.com/baltasarromero/lma-nft-marketplace/contracts/ERC721WithPermit.sol)  or implement [IERC721WithPermit](https://github.com/baltasarromero/lma-nft-marketplace/interfaces/IERC721WithPermit.sol) interface. For testing purposed the following contract [MyNFTWithPermit](https://sepolia.etherscan.io/address/0xD844FDbe21FA66dd883bc132bc1D37141437B0aE#readContract) is deployed in sepolia testnet could be used.

## Technologies

Project is created with:

- Node js

- Commander: 10.0.0

- Ethers: 5.7.2

  

## Setup

To run this project, install it locally using npm:
```

$ cd ../cli-test

$ npm i -g
```

## Configuration

Create an .env file with the following key/values either in the directory where you will be running the command. 

```
ETHEREUM_NETWORK = {NETWORK-NAME} //The name of the network where the NFTMarketplace is deployed. Currently sepolia

INFURA_PROJECT_ID = {INFURA_PROJECT_ID} //Your Infura project ID

NFT_MARKETPLACE_CONTRACT_ADDRESS = {NFT_MARKETPLACE_CONTRACT_ADDRESS} //NFTMarketplace is currently deployed in sepolia test network @ 0x7401B735b57Ca565A44e1D17C132b7aB2f8a15a8
```
## Supported Commands

### Listings
In the order to interact with the Marketplace using these commands any ERC721 NFT will be supported.

####  Create Listing

#### Cancel Listing

####  Purchase Listing

### NFT Offers
Any ERC721 NFT can be used for the create, cancel and accept functions. AcceptNFTOfferWithPermit command is only supported for NTFs with the characteristics mentioned in the introductory section.  

#### Create NFT Offer
Creates an offer for an NFT that is not listed in the marketplace. This supports any NFT that complies with IERC721 interface. The owner of the NFT can't create and offer. If there's an open listing for the NFT the offer won't be accepted as the user should just purchase the open listing.
#### Parameters (all parameters are required)

**--nft-address** The address of the nft that we are interested in
**--token-id** The token id of the nft that we are interested in
**--offer** The value that we are willing to pay for the NFT. This is expressed in ETH
**--private-key** Private key of the account that is creating the offer. This value is not stored.
Command
```` 
nft-cli createNFTOffer --nft-address {DESIRED_NFT_ADDRESS} --tokenId {DESIRED_TOKEN_ID} --offer {AMOUNT_OFFERED_IN_ETH} --private-key {PK_OF_ACCOUNT_USED_TO_OFFER} 
```` 

### Cancel NFT Offer
Cancels an offer that was previously created by the same account. If there's no offer for the NFT created by the caller the function call will fail 

#### Parameters (all parameters are required)

**--nft-address** The address of the nft
**--token-id** The token id of the nft 
**--private-key** Private key of the account that is cancelling the offer. This value is not stored.
Command
```` 
nft-cli cancelNFTOffer --nft-address {NFT_ADDRESS} --tokenId {TOKEN_ID} --private-key {PK_OF_ACCOUNT_USED_TO_OFFER} 
```` 

### Accept NFT Offer
Accepts an offer that was previously created by another account. Only the NFT owner can accept an offer, before calling this function the owner needs to approveForAll or approve the specific token to the Marketplace so it can transfer the NFT to the offerer, otherwise the call will fail with the error **"execution reverted: ERC721: caller is not token owner or approved"**. If there's no offer the call will fail.

#### Parameters (all parameters are required)

**--nft-address** The address of the nft
**--token-id** The token id of the nft 
**--buyer-address** The address of the buyer that created the offer that we want to accept as there could be multiple offers created.
**--private-key** Private key of the account that is accepting the offer. This value is not stored.
Command
```` 
nft-cli acceptNFTOffer --nft-address {NFT_ADDRESS} --tokenId {TOKEN_ID} --buyer-address {BUYER-ADDRESS} --private-key {PK_OF_ACCOUNT_USED_TO_OFFER} 
```` 

### Accept NFT Offer With Permit
Accepts an offer that was previously created by another account. Only the NFT owner can accept an offer. This function doesn't require the owner to previously approve the marketplace to transfer the token, it uses a signed permit following EIP712 format to avoid the previous approval. The permit signed has a hardcoded deadline of 1 day, i.e. the permit won't be valid after one day of being generated.
In order to use this function to accept the offer the NFT (referenced by the --nft-address param) needs to extend ERC721WithPermit contract (add reference to the contract). 
If there's no offer for the token and buyer combination the call will fail.

#### Parameters (all parameters are required)

**--nft-address** The address of the nft. The NFT needs to extend ERC721WithPermit contract or implement the IERC721WithPermit interface.
**--token-id** The token id of the nft 
**--buyer-address** The address of the buyer that created the offer that we want to accept as there could be multiple offers created.
**--private-key** Private key of the account that is accepting the offer. This value is not stored.
Command
```` 
nft-cli acceptNFTOfferWithPermit --nft-address {NFT_ADDRESS} --tokenId {TOKEN_ID} --buyer-address {BUYER-ADDRESS} --private-key {PK_OF_ACCOUNT_USED_TO_OFFER} 
```` 


## Pending
- Make deadline parameterizable