#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const createListing = require("../commands/create-listing");
const cancelListing = require("../commands/cancel-listing");
const purchaseListing = require("../commands/purchase-listing");

program
  .name("nft-cli")
  .description("CLI to interact with the LMA NFT nodeMarketplace")
  .version("0.1.0");

program
  .command("createListing")
  .description("Create a new listing in the marketplace")
  .requiredOption("--nft-address <address>", "Address of the NFT to be listed")
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be listed")
  .requiredOption("--price <price>", "Price for  the NFT to be listed in Ether")
  .requiredOption(
    "--private-key <privateKey>",
    "The private key ot the user's account"
  )
  .action((options) => {
    createListing(
      options.nftAddress,
      options.tokenId,
      options.price,
      options.privateKey
    );
  });

program
  .command("cancelListing")
  .description("Cancel a listing in the marketplace")
  .requiredOption("--nft-address <address>", "Address of the NFT to be unlisted")
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be unlisted")
  .requiredOption(
    "--private-key <privateKey>",
    "The private key ot the user's account"
  )
  .action((options) => {
    cancelListing(options.nftAddress, options.tokenId, options.privateKey);
  });

program
  .command("purchaseListing")
  .description("Purchase an NFT listed in the marketplace")
  .requiredOption(
    "--nft-address <address>",
    "Address of the NFT to be purchased"
  )
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be purchased")
  .requiredOption(
    "--private-key <privateKey>",
    "The private key ot the user's account"
  )
  .action((options) => {
    purchaseListing(options.nftAddress, options.tokenId, options.privateKey);
  });

program.parse();
