require('dotenv').config();

const web3 = require('./web3');
const tronWeb = require('./tronWeb')
const utils = require('./utils');
const config = require('../config/config.json');

module.exports = {
  web3: web3.web3,
  tronWeb:tronWeb.tronWeb,
  tronGrid:tronWeb.tronGrid,
  addresses: config["mainnet"],
  u: utils,
  latestBlock: utils.getCurrentBlock(),
  genBlock: 55000, //process.env.DEPLOY_BLOCK
};
