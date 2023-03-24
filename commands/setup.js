require("dotenv").config();

const NFTMarketplaceArtifact = require("../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json");

const { ethers, Wallet, Contract } = require("ethers");

let wallet;
let nftMarketplace;

const setup = async function (privateKey) {
  if (privateKey === undefined || privateKey === "") {
    console.log("PrivateKey not provided");cd 
    return;
  }

  // Configuring the connection to an Ethereum node
  const provider = new ethers.providers.InfuraProvider(
    process.env.ETHEREUM_NETWORK,
    process.env.INFURA_PROJECT_ID
  );

  wallet = new Wallet(privateKey, provider);

  const balance = await provider.getBalance(wallet.address);
  console.log("Wallet's balance", ethers.utils.formatEther(balance, 18));

  nftMarketplace = new Contract(
    process.env.NFT_MARKETPLACE_CONTRACT_ADDRESS,
    NFTMarketplaceArtifact.abi,
    wallet
  );
  
  return [nftMarketplace, wallet];
};

module.exports = setup;
