const { ethers } = require("ethers");
const setup = require("./setup");

const purchaseListing = async function (nftAddress, tokenId) {
  const [nftMarketplace, wallet] = await setup(process.env.BUYER_PRIVATE_KEY);

  if (nftMarketplace === undefined) {
    console.log("The connection to the marketplace is not established");
    return;
  }

  if (wallet === undefined) {
    console.log("The wallet is not configured");
    return;
  }

  console.log(`Buying ${nftAddress} tokenId: ${tokenId}`);

  const remoteListingKey = await nftMarketplace.getKey(nftAddress, tokenId);

  try {
    const listing = await nftMarketplace.listings(remoteListingKey);

    const purchaseListingTx = await nftMarketplace.purchase(remoteListingKey, {
      value: listing.price,
    });

    const purchaseListingTxReceipt = await purchaseListingTx.wait();
    if (purchaseListingTxReceipt.status != 1) {
      // Status 1 is success
      console.log("Couldn't purchase the NFT");
    }

    const listingsCount = await nftMarketplace.listingsCount();

    console.log(
      "Successfully purchased the listing. Number of active listings: ",
      listingsCount.toString()
    );
  } catch (error) {
    console.log(error.error.reason);
  }
};

module.exports = purchaseListing;
