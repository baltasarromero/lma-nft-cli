require("dotenv").config();

const setup = require("./setup");

const cancelNFTOffer = async function (nftAddress, tokenId, privateKey) {
	const [nftMarketplace, buyerWallet] = await setup(privateKey);

	if (nftMarketplace === undefined) {
		console.log("The connection to the marketplace is not established");
		return;
	}

	if (buyerWallet === undefined) {
		console.log("Buyer wallet is not configured");
		return;
	}

	console.log(`Cancelling offer for ${nftAddress}, ${tokenId}`);

	try {
		const cancelOfferTx = await nftMarketplace.cancelNFTOffer(nftAddress, tokenId);

		const cancelOfferTxReceipt = await cancelOfferTx.wait();
		if (cancelOfferTxReceipt.status != 1) {
			// Status 1 is success
			console.log("Couldn't cancel the NFT offer.");
		} else {
			console.log("Successfully cancelled the NFT offer.");
		}
	} catch (error) {
		console.log(error.error.reason);
	}
};

module.exports = cancelNFTOffer;
