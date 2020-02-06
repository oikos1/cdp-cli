#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const headers = require("../config/headers");


let tub = lib.u.loadContract(lib.addresses.tub);
let vox = lib.u.loadContract(lib.addresses.vox);

 program
  .version('0.1.0')

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

program
.command('ls [owner]', {isDefault: true})
.description('List Cups')
.action( (owner) => {
    let header = headers.cups;
    tub.then((result) => {
        result.cupi().call()
        .then(next => {
            return next ;
        }).then(async (next) => {
          console.log("number of cups", lib.web3.web3.utils.toDecimal(next))
            let promises = []
            //console.log("next", lib.web3.web3)
            for (let i=1; i<= lib.web3.web3.utils.toDecimal(next);i++) {
                let res = await result.cups(  lib.u.toBytes32(i) ).call() ;
                //if (res.lad != '410000000000000000000000000000000000000000')
                  res.id    = i;
                  res.lad   = lib.CryptoUtils.getBase58CheckAddress(lib.u.hexStr2byteArray(res.lad))
                  res.art   = res.art.toString();
                  res.ink   = res.ink.toString();
                  res.ire   = res.ire.toString();
                  promises[i-1] = res;
            }
            //promises.splice( promises.findIndex(x => x.lad == '410000000000000000000000000000000000000000'),1);
            let filtered = promises;
            if (owner)
                filtered = promises.filter(x => x.lad == owner);
            console.log("\n  Found a total of", filtered.length, "cups");
            let t1 = Table(header, filtered, {
              borderStyle: 1,
              borderColor: "blue",
              paddingBottom: 0,
              headerAlign: "center",
              align: "center",
              color: "white",
              truncate: "..."
            })
            console.log(t1.render());
        }).catch(function (err) {
            console.log(err)
        });
    })
});

program
.command('view <cup>')
.description('View Cup')
.action( (cup) => {
    let header = headers.cup;
    tub.then(async (result) => {
            let promises = [];            
            let res = await result.cups(  lib.u.toBytes32(cup) ).call();
            //console.log(res)
            if (res.lad != '410000000000000000000000000000000000000000') {
              res.id    = cup;
              res.lad   = lib.CryptoUtils.getBase58CheckAddress(lib.u.hexStr2byteArray(res.lad))
              res.art   = res.art.toString();
              res.ink   = res.ink.toString();
              res.ire   = res.ire.toString();
              res.safe  = await result.safe( lib.u.toBytes32(cup) ).send(lib.opts);
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
    })
});  

program
.command('lock <cup> <wad>')
.description('post additional PETH collateral to a cup')
.action( (cup, wad) => {
    tub.then((result) => {
        result.lock(lib.u.toBytes32(cup), lib.u.toWei(wad)).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        });
    })
});  


program
.command('give <cup> <lad>')
.description('give cup to another lad')
.action( (cup, lad) => {
    tub.then((result) => {
        result.give(lib.u.toBytes32(cup), lad).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        });
    })
}); 

program
.command('draw <cup> <wad>')
.description('issue the specified amount of dai stablecoins')
.action( (cup, wad) => {
    tub.then((result) => {
        result.draw(lib.u.toBytes32(cup), lib.u.toWei(wad)).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        }).catch(function (err) {
            console.log(err);
            //console.log(chalk.red(lib.tronWeb.toUtf8(err.output.resMessage)));                              
        });
    })
});  

program
  .command('free <cup> <wad>')
  .description('remove excess PETH collateral from a cup')
  .action((cup, wad) => {
    tub.then((result) => {
        console.log("freeing with pars", lib.u.toBytes32(cup), lib.u.toWei(wad).toString())
        result.free(lib.u.toBytes32(cup), lib.u.toWei(wad).toString()).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        }).catch((err)=>console.log(chalk.red(err.error)));

    }).catch((err)=>console.log(chalk.red(err.error)));
  });

program
.command('wipe <cup> <wad>')
.description('repay some portion of your existing dai debt')
.action( (cup, wad) => {
    
    tub.then((result) => {
        console.log("wiping with pars", lib.u.toBytes32(cup), lib.u.toWei(wad).toString())
        result.wipe(lib.u.toBytes32(cup), lib.u.toWei(wad).toString()).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        }).catch((err)=>console.log(chalk.red(err.error)));

    }).catch((err)=>console.log(chalk.red(err.error)));
}); 

program
.command('bite <cup>')
.description('initiate liquidation of an undercollateral cup')
.action( (cup) => {
    tub.then((result) => {
        result.bite(lib.u.toBytes32(cup)).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        });
    })
});  

program.parse(process.argv);