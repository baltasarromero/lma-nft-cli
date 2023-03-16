const { ethers } = require("ethers");
const setup = require("./setup");

const cancelListing = async function (nftAddress, tokenId) {
  const [nftMarketplace, listerWallet] = await setup(
    process.env.SIGNER_PRIVATE_KEY
  );

  if (nftMarketplace === undefined) {
    console.log("The connection to the marketplace is not established");
    return;
  }

  if (listerWallet === undefined) {
    console.log("The wallet is not configured");
    return;
  }

  console.log(`Cancelling listing for ${nftAddress} tokenId: ${tokenId}`);

  const remoteListingKey = await nftMarketplace.getKey(nftAddress, tokenId);

  try {
    const cancelListingTx = await nftMarketplace.cancelListing(
      remoteListingKey
    );

    const cancelListingTxReceipt = await cancelListingTx.wait();
    if (cancelListingTxReceipt.status != 1) {
      // Status 1 is success
      console.log("Couldn't cancel the listing");
    }

    const listingsCount = await nftMarketplace.listingsCount();

    console.log(
      "Successfully cancelled the listing. Number of active listings: ",
      listingsCount.toString()
    );
  } catch (error) {
    console.log(error.error.reason);
  }
};

module.exports = cancelListing;