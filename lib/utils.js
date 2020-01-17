const BigNumber = require('bignumber.js');
const web3 = require('./web3');
const tronWeb = require('./tronWeb')
const WAD = web3.web3.utils.toBN( web3.web3.utils.toWei("1") );
/* Check if a char is hex char */
const isHexChar = (c) => {
  if ((c >= 'A' && c <= 'F') ||
      (c >= 'a' && c <= 'f') ||
      (c >= '0' && c <= '9')) {
    return 1;
  }
  return 0;
}

/* Convert a hex char to value */
const hexChar2byte = (c) => {
  var d = 0;
  if (c >= 'A' && c <= 'F') {
    d = c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
  }
  else if (c >= 'a' && c <= 'f') {
    d = c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
  }
  else if (c >= '0' && c <= '9') {
    d = c.charCodeAt(0) - '0'.charCodeAt(0);
  }
  return d;
}

const repeat = (x, n) => n > 0 ? new Array(n + 1).join(x) : "";
const rpad = (x, y, n) => x + repeat(y, n - x.length);
const lpad = (x, y, n) => repeat(y, n - x.length) + x;

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
/*
// Multiply WAD values
module.exports.wmul = (a, b) => {
  return web3.web3.utils.toBN(a).times(b).div(WAD);
}

//Divide WAD values
module.exports.wdiv = (a, b) => {
  return web3.web3.utils.toBN(a).times(WAD).div(b);
}

// Multiply RAY values
module.exports.rmul = (a, b) => {
  let ray = new BigNumber(10 ** 27);
  return web3.web3.utils.toBN(a).times(b).div(ray);
}

//Divide RAY values
module.exports.rdiv = (a, b) => {
  let ray = new BigNumber(10 ** 27);
  return web3.web3.utils.toBN(a).times(ray).div(b);
}
module.exports.fromRaytoWad = x => {
  const y = web3.web3.utils.toBN(x).div(web3.web3.utils.toBN(10).pow(9))
  return y;
}
*/
module.exports.toWei = (wad) =>{
  return  web3.web3.utils.toWei(wad);
};
module.exports.fromWei = (wad, unit = 'ether') =>{
  return  web3.web3.utils.fromWei(wad, unit);
};

module.exports.toSun = (wad) =>{
  return new BigNumber(wad * (10**6));
};

module.exports.rmul = (a,b) => {
    var ray = new BigNumber(10 ** 27);
    return new BigNumber(a).multipliedBy(b).dividedBy(ray); 
};


module.exports.toBytes32 = (wad) => `0x${lpad(toHex(`${wad}`), "0", 64)}`;
const toHex = wad => new BigNumber(wad.replace(".", "")).toString(16);

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


module.exports.hexStr2byteArray = (str) => {
  var byteArray = Array();
  var d = 0;
  var j = 0;
  var k = 0;

  for (let i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (isHexChar(c)) {
      d <<= 4;
      d += hexChar2byte(c);
      j++;
      if (0 === (j % 2)) {
        byteArray[k++] = d;
        d = 0;
      }
    }
  }
  return byteArray;
}





