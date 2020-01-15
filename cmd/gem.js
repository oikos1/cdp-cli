#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const BigNumber = require('bignumber.js');
let tub =  lib.u.loadContract(lib.addresses.tub);

const ToWad = (uint) => {
  return new BigNumber(uint).dividedBy(`1e18`).toNumber()
};

program
  .description('Gem manager')
  //.command('join <wad>', 'buy PTRX for gems' )
  .command('exit <wad>', 'post additional PTRX collateral to a cup')

program
  .command('join <wad>')
  .description('buy PTRX for gems')
  .action((wad) => {
 	console.log("got wad", wad)
  })


program.parse(process.argv);


