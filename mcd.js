#!/usr/bin/env node
const program = require('commander');

program
  .description('mcd client')
  .option('-F, --from=<account>', 'Account from which to send transaction')

program
  .command('gem <cmd> [args...]', 'Gem Manager', {executableFile: './cmd/gem.js'})

program
  .command('sai <cmd> [args...]', 'Sai Manager', {executableFile: './cmd/sai.js'})

program
  .command('cdp <cmd> [args...]', 'Cdp Manager', {executableFile: './cmd/cdp.js'})

program
  .command('tap <cmd> [args...]', 'Liquidator Manager', {executableFile: './cmd/tap.js'})

program
  .command('chief <cmd> [args...]', 'Liquidator Manager', {executableFile: './cmd/chief.js'})

program.parse(process.argv);


