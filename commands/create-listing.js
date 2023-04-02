require("dotenv").config();

const { ethers } = require("ethers");
const setup = require("./setup");

const createListing = async function (nftAddress, tokenId, price, privateKey) {
	const [nftMarketplace, listerWallet] = await setup(privateKey);

	if (nftMarketplace === undefined) {
		console.log("The connection to the marketplace is not established");
		return;
	}

	if (listerWallet === undefined) {
		console.log("Lister wallet is not configured");
		return;
	}

	const listingPriceWei = ethers.utils.parseEther(price);
	console.log(`Listing ${nftAddress}, ${tokenId}, ${listingPriceWei}`);

	try {
		const createListingTx = await nftMarketplace.createListing(
			nftAddress,
			tokenId,
			listingPriceWei
		);

		const createListingTxReceipt = await createListingTx.wait();
		if (createListingTxReceipt.status != 1) {
			// Status 1 is success
			console.log("Couldn't list the NFT in the Marketplace");
		} else {
			console.log("Successfully listed the NFT.");
		}
	} catch (error) {
		console.log(error.error.reason);
	}
};

module.exports = createListing;
