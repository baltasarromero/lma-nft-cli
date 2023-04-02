require("dotenv").config();

const setup = require("./setup");

const acceptNFTOffer = async function (nftAddress, tokenId, buyerAddress, privateKey) {
	const [nftMarketplace, sellerWallet] = await setup(privateKey);

	if (nftMarketplace === undefined) {
		console.log("The connection to the marketplace is not established");
		return;
	}

	if (sellerWallet === undefined) {
		console.log("Seller wallet is not configured");
		return;
	}

	console.log(`Accepting offer for ${nftAddress}, ${tokenId} from account ${buyerAddress}`);

	try {
		const acceptOfferTx = await nftMarketplace.acceptNFTOffer(
			nftAddress,
			tokenId,
			buyerAddress
		);

		const acceptOfferTxReceipt = await acceptOfferTx.wait();
		if (acceptOfferTxReceipt.status != 1) {
			// Status 1 is success
			console.log("Couldn't accept the specified NFT offer.");
		} else {
			console.log("Successfully accepted the offer.");
		}
	} catch (error) {
		console.log(error.error.reason);
	}
};

module.exports = acceptNFTOffer;
