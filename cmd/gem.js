#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const BigNumber = require('bignumber.js');
const headers = require("../config/headers");
let tub =  lib.u.loadContract(lib.addresses.tub);
let gem =  lib.u.loadContract(lib.addresses.weth);


program
  .description('Gem manager')
  .command('exit <wad>', 'post additional PTRX collateral to a cup')

 program
  .command('balance <owner>')
  .description('get balance of address')
  .action((owner) => {
    gem.then(function(result) {
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

program
  .command('join <wad>')
  .description('buy PTRX for gems')
  .action((wad) => {

    tub.then(function(result) {
        result.join(lib.u.toWei(wad)).send(lib.opts)
        .then(next => {
        	if (Array.isArray(next) && next.length == 0) {
        		console.log("Successful!")
        	}
        }).catch(function (err) {
            //console.log(err)
           	 console.log("Failed! Do you have enough GEM balance ?");
    	});
  	})

  });

program
  .command('deposit <wad>')
  .description('deposit TRX to get WTRX')
  .action((wad) => {
    let opts = lib.opts;
    gem.then(function(result) {
        opts.callValue = lib.u.toSun(wad);
        result.deposit().send(opts)
        .then(next => {
        	if (Array.isArray(next) && next.length == 0) {
        		console.log("Successful!")
        	}
        }).catch(function (err) {
            console.log(err)
    	});
  	})

  });

program.parse(process.argv);


