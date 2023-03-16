#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const createListing = require("../commands/create-listing");
const cancelListing = require("../commands/cancel-listing");
const purchaseListing = require("../commands/purchase-listing");

program
  .name("nft-cli")
  .description("CLI to interact with the LMA NFT Marketplace")
  .version("0.1.0");

program
  .command("createListing")
  .description("Create a new listing in the marketplace")
  .requiredOption("--nft-address <address>", "Address of the NFT to be listed")
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be listed")
  .requiredOption("--price <price>", "Price for  the NFT to be listed")
  .requiredOption("--start <start>", "Start time for  the NFT listing")
  .requiredOption("--end <end>", "End time for  the NFT listing")
  .action((options) => {
    createListing(
      options.nftAddress,
      options.tokenId,
      options.price,
      options.start,
      options.end
    );
  });

program
  .command("cancelListing")
  .description("Cancel a listing in the marketplace")
  .requiredOption("--nft-address <address>", "Address of the NFT to be listed")
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be listed")
  .action((options) => {
    cancelListing(options.nftAddress, options.tokenId);
  });

program
  .command("purchaseListing")
  .description("Purchase an NFT listed in the marketplace")
  .requiredOption(
    "--nft-address <address>",
    "Address of the NFT to be purchased"
  )
  .requiredOption("--token-id <tokenId>", "Id of the NFT to be purchased")
  .action((options) => {
    purchaseListing(options.nftAddress, options.tokenId);
  });

program.parse();
