require("dotenv").config();

const { ethers } = require("ethers");
const setup = require("./setup");
//const setup = require('../commands/setup');

const createListing = async function (
  nftAddress,
  tokenId,
  price,
  start,
  end,
  privateKey
) {
  const [nftMarketplace, listerWallet] = await setup(privateKey);

  if (nftMarketplace === undefined) {
    console.log("The connection to the marketplace is not established");
    return;
  }

  if (listerWallet === undefined) {
    console.log("The lister wallet is not configured");
    return;
  }

  const listingPriceWei = ethers.utils.parseEther(price);
  console.log(
    `Listing ${nftAddress}, ${tokenId}, ${listingPriceWei}, ${start}, ${end}`
  );
  try {
    const createListingTx = await nftMarketplace.createListing(
      nftAddress,
      tokenId,
      listingPriceWei,
      start,
      end
    );
    const createListingTxReceipt = await createListingTx.wait();
    if (createListingTxReceipt.status != 1) {
      // Status 1 is success
      console.log("Couldn't list the NFT in the Marketplace");
    }

    const listingsCount = await nftMarketplace.listingsCount();
    console.log(
      "Succesfully listed the NFT. Number of listings in the marketPlace: ",
      listingsCount.toString()
    );
  } catch (error) {
    console.log(error.error.reason);
  }
};

module.exports = createListing;
