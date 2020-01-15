const config = require('../config/config.json');
const TronWeb = require('tronweb');
const TronGrid = require('trongrid');

const HttpProvider = TronWeb.providers.HttpProvider;
// Full node http endpoint
const fullNode = new HttpProvider("http://192.168.0.102:9090");
// Solidity node http endpoint
const solidityNode = new HttpProvider("http://192.168.0.102:9090");
// Contract events http endpoint
const eventServer = "http://192.168.0.102:9090";

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, config["credentials"].privateKey);
const tronGrid = new TronGrid(tronWeb);

module.exports = {
  tronWeb:tronWeb,
  tronGrid:tronGrid,
  address:config["credentials"].address
};
