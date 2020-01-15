const BigNumber = require('bignumber.js');
const web3 = require('./web3');
const tronWeb = require('./tronWeb')

module.exports.loadContract = async address => {
  return await tronWeb.tronWeb.contract().at(address);
};

module.exports.getEvents = async (a, e, n) => {
  return await tronWeb.tronGrid.contract.getEvents(a, { "event_name": e , "block_number": n })
};

module.exports.getCurrentBlock = () => {
  return tronWeb.tronWeb.trx.getCurrentBlock();
};

module.exports.wad = (uint) => {
  return new BigNumber(uint).dividedBy(`1e18`).toNumber()
};

module.exports.ray = (uint) => {
  return new BigNumber(uint).dividedBy(`1e27`).toNumber()
};

module.exports.capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};

module.exports.toBytes32 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 64)}`

const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : ""
//const rpad = (x, y, n) => x + repeat(y, n - x.length)
const lpad = (x, y, n) => repeat(y, n - x.length) + x
const toHex = wad => new BigNumber(wad.replace(".", "")).toString(16)

module.exports.arg = (act, str) => {
  let val = '0x'+str.substring(26);
  switch (act) {
    case 'shut':
      return '-';
    case 'give':
      return val;
    default:
      return val;
  }
};

