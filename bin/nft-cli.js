#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
// Listings
const createListing = require("../commands/create-listing");
const cancelListing = require("../commands/cancel-listing");
const purchaseListing = require("../commands/purchase-listing");
// NFTOffer
const createNFTOffer = require("../commands/create-nft-offer");
const cancelNFTOffer = require("../commands/cancel-nft-offer");
const acceptNFTOffer = require("../commands/accept-nft-offer");
const acceptNFTOfferWithPermit = require("../commands/accept-nft-offer-with-permit");

program
	.name("nft-cli")
	.description("CLI to interact with the LMA NFT nodeMarketplace")
	.version("0.1.0");

// CREATE LISTING COMMAND
program
	.command("createListing")
	.description("Create a new listing in the marketplace")
	.requiredOption("--nft-address <address>", "Address of the NFT to be listed")
	.requiredOption("--token-id <tokenId>", "Id of the NFT to be listed")
	.requiredOption(
		"--price <price>",
		"Price for  the NFT to be listed. Please notice that this value is expressed in Ether"
	)
	.requiredOption("--private-key <privateKey>", "The private key ot the user's account")
	.action((options) => {
		createListing(options.nftAddress, options.tokenId, options.price, options.privateKey);
	});

// CANCEL LISTING COMMAND
program
	.command("cancelListing")
	.description("Cancel a listing in the marketplace")
	.requiredOption("--nft-address <address>", "Address of the NFT to be unlisted")
	.requiredOption("--token-id <tokenId>", "Id of the NFT to be unlisted")
	.requiredOption("--private-key <privateKey>", "The private key ot the user's account")
	.action((options) => {
		cancelListing(options.nftAddress, options.tokenId, options.privateKey);
	});

// PURCHASE LISTING COMMAND
program
	.command("purchaseListing")
	.description("Purchase an NFT listed in the marketplace")
	.requiredOption("--nft-address <address>", "Address of the NFT to be purchased")
	.requiredOption("--token-id <tokenId>", "Id of the NFT to be purchased")
	.requiredOption("--private-key <privateKey>", "The private key ot the user's account")
	.action((options) => {
		purchaseListing(options.nftAddress, options.tokenId, options.privateKey);
	});

// CREATE NFT OFFER COMMAND
program
	.command("createNFTOffer")
	.description("Create a new offer for a given NFT")
	.requiredOption("--nft-address <address>", "Address of the NFT that we are interested in")
	.requiredOption("--token-id <tokenId>", "Id of the NFT that we are interested in")
	.requiredOption(
		"--offer <offer>",
		"The amount of ether that we are willing to pay the NFT. Please notice that this value is expressed in Ether"
	)
	.requiredOption("--private-key <privateKey>", "The private key of the user's account")
	.action((options) => {
		createNFTOffer(options.nftAddress, options.tokenId, options.offer, options.privateKey);
	});

// CANCEL NFT OFFER COMMAND
program
	.command("cancelNFTOffer")
	.description("Cancel a previously created NFT offer")
	.requiredOption("--nft-address <address>", "Address of the NFT that we are interested in")
	.requiredOption("--token-id <tokenId>", "Id of the NFT that we are interested in")
	.requiredOption("--private-key <privateKey>", "The private key of the user's account")
	.action((options) => {
		cancelNFTOffer(options.nftAddress, options.tokenId, options.privateKey);
	});

// ACCEPT NFT OFFER COMMAND
program
	.command("acceptNFTOffer")
	.description("Accept a previously created NFT offer")
	.requiredOption("--nft-address <address>", "Address of the NFT that accepted to sell")
	.requiredOption("--token-id <tokenId>", "Id of the NFT that we accepted to sell")
	.requiredOption(
		"--buyer-address <address>",
		"Address of the buyer that created the offer that we accepted"
	)
	.requiredOption("--private-key <privateKey>", "The private key of the user's account")
	.action((options) => {
		acceptNFTOffer(
			options.nftAddress,
			options.tokenId,
			options.buyerAddress,
			options.privateKey
		);
	});

// ACCEPT NFT OFFER WITH PERMIT COMMAND
program
	.command("acceptNFTOfferWithPermit")
	.description("Accept a previously created NFT offer")
	.requiredOption(
		"--nft-address <address>",
		"Address of the NFT that accepted to sell. This should be an NFT that extends ERC721WIthPermit contract."
	)
	.requiredOption("--token-id <tokenId>", "Id of the NFT that we accepted to sell")
	.requiredOption(
		"--buyer-address <address>",
		"Address of the buyer that created the offer that we accepted"
	)
	.requiredOption("--private-key <privateKey>", "The private key of the user's account")
	.action((options) => {
		acceptNFTOfferWithPermit(
			options.nftAddress,
			options.tokenId,
			options.buyerAddress,
			options.privateKey
		);
	});

program.parse();
