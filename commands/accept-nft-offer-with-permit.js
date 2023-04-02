require("dotenv").config();

const setup = require("./setup");

const ERC721WithPermitArtifact = require("../artifacts/contracts/ERC721WithPermit.sol/ERC721WithPermit.json");

const { ethers, Wallet, Contract, BigNumber } = require("ethers");

// Helper function to sign data using ethers.js _singTypedData
async function sign(tokenContract, signerAccount, spender, tokenId, nonce, deadline) {
	const [name, version, chainId] = await Promise.all([
		tokenContract.name(),
		"1",
		signerAccount.getChainId(),
	]);

	const typedData = {
		types: {
			Permit: [
				{ name: "spender", type: "address" },
				{ name: "tokenId", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint256" },
			],
		},
		primaryType: "Permit",
		domain: {
			name: name,
			version: version,
			chainId: chainId,
			verifyingContract: tokenContract.address,
		},
		message: {
			spender,
			tokenId,
			nonce,
			deadline,
		},
	};

	// sign Permit
	const signature = await signerAccount._signTypedData(
		typedData.domain,
		{ Permit: typedData.types.Permit },
		typedData.message
	);

	return signature;
}

const acceptNFTOfferWithPermit = async function (nftAddress, tokenId, buyerAddress, privateKey) {
	const [nftMarketplace, sellerWallet] = await setup(privateKey);

	if (nftMarketplace === undefined) {
		console.log("The connection to the marketplace is not established");
		return;
	}

	if (sellerWallet === undefined) {
		console.log("Seller wallet is not configured");
		return;
	}

	console.log(
		`Accepting offer using permit for ${nftAddress}, ${tokenId} from account ${buyerAddress}`
	);

	let signature;
	let deadline;

	try {
		// Configuring the connection to an Ethereum node
		const provider = new ethers.providers.InfuraProvider(
			process.env.ETHEREUM_NETWORK,
			process.env.INFURA_PROJECT_ID
		);

		const sellerWallet = new Wallet(privateKey, provider);

		// Reference to NFT contract. The address passesd as parameter hast to extend ERC721WIthPermit in order to support safeTransforFrom using a permit instead of requiring previous
		// approval
		const tokenContract = new Contract(nftAddress, ERC721WithPermitArtifact.abi, sellerWallet);

		// Deadline that determines when the permit will expire. In this case will be 1 day
		deadline = BigNumber.from((await provider.getBlock("latest")).timestamp).add(86400);

		// Sign Permit
		signature = await sign(
			tokenContract,
			sellerWallet,
			nftMarketplace.address,
			tokenId,
			await tokenContract.nonces(tokenId),
			deadline
		);
	} catch (error) {
		console.log(error);
		return;
	}

	try {
		const acceptOfferTx = await nftMarketplace.acceptNFTOfferWithPermit(
			nftAddress,
			tokenId,
			buyerAddress,
			deadline,
			signature
		);

		const acceptOfferTxReceipt = await acceptOfferTx.wait();
		if (acceptOfferTxReceipt.status != 1) {
			// Status 1 is success
			console.log("Couldn't accept the specified NFT offer using a permit.");
		} else {
			console.log("Successfully accepted the offer using a signed permit.");
		}
	} catch (error) {
		console.log(error.error.reason);
		return;
	}
};

module.exports = acceptNFTOfferWithPermit;
