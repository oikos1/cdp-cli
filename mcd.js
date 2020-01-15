#!/usr/bin/env node
const program = require('commander');

program
  .description('mcd client')
  .option('-F, --from=<account>', 'Account from which to send transaction')

program
  .command('cdp <cmd> [args...]', 'Cdp Manager', {executableFile: './cmd/cdp.js'})

program
  .command('gem <cmd> [args...]', 'Gem Manager', {executableFile: './cmd/gem.js'})

program.parse(process.argv);


