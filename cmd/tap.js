#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const BigNumber = require('bignumber.js');
const headers = require("../config/headers");
let tap =  lib.u.loadContract(lib.addresses.tap);
let sai =  lib.u.loadContract(lib.addresses.sai);


program
  .description('Liquidator Manager')
  .command('boom <cup>', 'buy some amount of dai to process joy (surplus)')
  .command('bust <cup>', 'sell some amount of dai to process woe (bad debt)')
  .command('cage',       'lock the system and initiate settlement')

 program
  .command('boom <wad>')
  .description('buy some amount of dai to process joy (surplus)')
  .action((wad) => {
    tap.then(function(result) {
    	//let header = headers.balance;    	
    	//let promises = [];
        result.boom(wad).send(lib.opts)
        .then(result => {
          console.log("result", result)
            //balance.toString() > 0 ? balance = chalk.green(balance.toString())  : balance = chalk.red(balance.toString());
           /* let o = {"lad": owner, "balance": lib.u.fromWei(balance.toString())};
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
            console.log(t1.render())*/
        }).catch(function (err) {
           	  console.log(err)
    	});
  	})
  });

 program
  .command('bust <wad>')
  .description('sell some amount of dai to process woe (bad debt)')
  .action((wad) => {
    tap.then(function(result) {
      //let header = headers.balance;     
      //let promises = [];
        result.bust(wad).send(lib.opts)
        .then(result => {
          console.log("result", result)
            //balance.toString() > 0 ? balance = chalk.green(balance.toString())  : balance = chalk.red(balance.toString());
           /* let o = {"lad": owner, "balance": lib.u.fromWei(balance.toString())};
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
            console.log(t1.render())*/
        }).catch(function (err) {
              console.log(err)
      });
    })
  });

program.parse(process.argv);


