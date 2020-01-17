#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const BigNumber = require('bignumber.js');
const headers = require("../config/headers");
let tub =  lib.u.loadContract(lib.addresses.tub);
let sai =  lib.u.loadContract(lib.addresses.sai);


program
  .description('Sai manager')
  .command('exit <wad>', 'post additional PTRX collateral to a cup')

 program
  .command('balance <owner>')
  .description('get Sai balance of address')
  .action((owner) => {
    sai.then(function(result) {
    	let header = headers.balance;    	
    	let promises = [];
        result.balanceOf(owner).call()
        .then(balance => {
          console.log("balance", balance)
            //balance.toString() > 0 ? balance = chalk.green(balance.toString())  : balance = chalk.red(balance.toString());
            let o = {"lad": owner, "balance": lib.u.fromWei(balance.toString())};
            promises.push(o);
            let t1 = Table(header, promises, {
              borderStyle: 1,
              borderColor: "blue",
              paddingBottom: 0,
              headerAlign: "center",
              align: "center",
              color: "white",
              truncate: "..."
            })
            console.log(t1.render())
        }).catch(function (err) {
           	  console.log(err)
    	});
  	})
  });


program.parse(process.argv);


