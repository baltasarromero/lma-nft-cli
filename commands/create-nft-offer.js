require("dotenv").config();

const { ethers } = require("ethers");
const setup = require("./setup");

const createNFTOffer = async function (nftAddress, tokenId, offer, privateKey) {
	const [nftMarketplace, buyerWallet] = await setup(privateKey);

	if (nftMarketplace === undefined) {
		console.log("The connection to the marketplace is not established");
		return;
	}

	if (buyerWallet === undefined) {
		console.log("Buyer wallet is not configured");
		return;
	}

	const offeredPriceWei = ethers.utils.parseEther(offer);
	console.log(
		`Creating offer for collection ${nftAddress} and token Id ${tokenId}, for ${offer} ETH`
	);

	try {
		const createOfferTx = await nftMarketplace.createNFTOffer(nftAddress, tokenId, {
			value: offeredPriceWei,
		});

		const createOfferTxReceipt = await createOfferTx.wait();
		if (createOfferTxReceipt.status != 1) {
			// Status 1 is success
			console.log("Couldn't create an offer for the NFT.");
		} else {
			console.log("Successfully created an offer for the NFT.");
		}
	} catch (error) {
		console.log(error.error.reason);
	}
};

module.exports = createNFTOffer;
