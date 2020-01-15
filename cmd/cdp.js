#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
//const chalk = require("chalk");
const headers = require("../config/headers");
let tub =  lib.u.loadContract(lib.addresses.tub);


 program
  .version('0.1.0')
  .command('count [<owner>]', 'Cdp count' )
  .command('<id> cup', 'Cdp state')
  .command('<id> lock <wad>', 'Join & lock collaterals')
  .command('<id> free <wad>', 'Free & exit collateral')
  .command('<id> draw <wad>', 'Draw & exit dai')
  .command('<id> wipe <wad>', 'Join & wipe dai')

 program
  .command('open')
  .description('clone a repository into a newly created directory')
  .action(() => {
    tub.then(function(result) {
        result.open().send({
                shouldPollResponse: true,
                callValue: 0, 
                from : lib.tronWeb.address
            }).then(next => {
            console.log("got ", next)
        });
    })
  })

 program
  .command('free')
  .description('clone a repository into a newly created directory')
  .action(() => {
    console.log("free!")
  })

program
.command('ls [owner]', {isDefault: true})
.description('List Cdps')
.action( (owner) => {

    let header = headers.cdp;
    tub.then(function(result) {
        result.cupi().call().then(next => {
            return next ;
        }).then(async (next) => {
            var promises = []
            for (let i=0; i< lib.web3.utils.toDecimal(next);i++) {
                let res = await result.cups(  lib.u.toBytes32(i) ).call() ;
                res.index = (i+1);
                res.art = res.art.toString();
                res.ink = res.ink.toString();
                res.ire = res.ire.toString();
                promises[i] = res;
            }
            promises.splice( promises.findIndex(x => x.lad == '410000000000000000000000000000000000000000'),1);
            let renderData = promises;
            if (owner)
                renderData = promises.filter(x => x.lad == owner);
            let t1 = Table(header, renderData, {
              borderStyle: 1,
              borderColor: "blue",
              paddingBottom: 0,
              headerAlign: "center",
              align: "center",
              color: "white",
              truncate: "..."
            })
            console.log(t1.render())
        })
    })
})  


program.parse(process.argv);