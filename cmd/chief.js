#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const headers = require("../config/headers");


let chief = lib.u.loadContract(lib.addresses.chief);

  program
  .command('open [lad]')
  .description('create a new cup (collateralized debt position)')
  .action((lad) => {
    if (!lad)
      lad = "410000000000000000000000000000000000000000";
    tub.then(async(result) => {
        result.open().send(lib.opts)
        .then(async next => {
            let promises = [];           
            let header = headers.cup;
            if ( lib.web3.web3.utils.toDecimal(next.cup) > 0) {
            //console.log("got ", lib.web3.web3.utils.toDecimal(next.cup));
            let res = await result.cups(  next.cup ).call();
            //console.log(res)
            if (res.lad != '410000000000000000000000000000000000000000') {
              res.id = lib.web3.web3.utils.toDecimal(next.cup);
              res.lad   = lib.CryptoUtils.getBase58CheckAddress(lib.u.hexStr2byteArray(res.lad))
              res.art   = res.art.toString();
              res.ink   = res.ink.toString();
              res.ire   = res.ire.toString();
              res.safe  = true;
              promises.push(res);              
            } else {
              return;
            }
            
            let t1 = Table(header, promises, {
              borderStyle: 1,
              borderColor: "blue",
              paddingBottom: 0,
              headerAlign: "center",
              align: "center",
              color: "white",
              truncate: "..."
            })
            console.log(t1.render());
          } else {
            console.log("error creating new cup");
          }
        });
    })
  });