require('dotenv').config();

const web3 = require('./web3');
const tronWeb = require('./tronWeb');
const utils = require('./utils');
const config = require('../config/config.json');
const CryptoUtils = require("@tronscan/client/src/utils/crypto");

module.exports = {
  web3: web3,
  tronWeb:tronWeb.tronWeb,
  tronGrid:tronWeb.tronGrid,
  CryptoUtils:CryptoUtils,
  addresses: config["mainnet"],
  opts:{fee_limit:1000000000, shouldPollResponse: true, callValue: 0, from: tronWeb.tronWeb.defaultAddress.hex},
  u: utils,
  latestBlock: utils.getCurrentBlock(),
  genBlock: 55000, //process.env.DEPLOY_BLOCK
};
