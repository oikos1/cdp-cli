#!/usr/bin/env node
const program = require('commander');
const lib = require('../lib/common');
const Table = require('tty-table');
const chalk = require("chalk");
const headers = require("../config/headers");


let tub =  lib.u.loadContract(lib.addresses.tub);
let vox = lib.u.loadContract(lib.addresses.vox);

 program
  .version('0.1.0')
  .command('count [<owner>]', 'Cup count' )
  .command('<id> cup', 'Cdp state')
  .command('<id> lock <wad>', 'Join & lock collaterals')
  .command('<id> free <wad>', 'Free & exit collateral')
  .command('<id> draw <wad>', 'Draw & exit dai')
  .command('<id> wipe <wad>', 'Join & wipe dai')

 program
  .command('open <lad>')
  .description('clone a repository into a newly created directory')
  .action((lad) => {
    tub.then(async(result) => {
        result.open(lad).send(lib.opts)
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
  .command('free')
  .description('clone a repository into a newly created directory')
  .action(() => {
    console.log("free!");
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
            let promises = []
            //console.log("next", lib.web3.web3)
            for (let i=1; i<= lib.web3.web3.utils.toDecimal(next);i++) {
                let res = await result.cups(  lib.u.toBytes32(i) ).call() ;
                if (res.lad != '410000000000000000000000000000000000000000')
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
.command('view <id>')
.description('View Cup')
.action( (id) => {
    let header = headers.cup;
    tub.then(async (result) => {
            let promises = [];            
            let res = await result.cups(  lib.u.toBytes32(id) ).call();
            //console.log(res)
            if (res.lad != '410000000000000000000000000000000000000000') {
              res.id    = id;
              res.lad   = lib.CryptoUtils.getBase58CheckAddress(lib.u.hexStr2byteArray(res.lad))
              res.art   = res.art.toString();
              res.ink   = res.ink.toString();
              res.ire   = res.ire.toString();
              res.safe  = await result.safe( lib.u.toBytes32(id) ).send(lib.opts);
              promises.push(res);              
            } else {
              return;
            }
              
            /*
              let tab = await result.tab(  lib.u.toBytes32(id) ).send(lib.opts);
              let tag = await result.tag().call();
              console.log("tag", tag)
              console.log("tag", (tag.wad / (10**27)), "ink", (res.ink / (10**6)));
              console.log("pro", (tag.wad / (10**27)) * (res.ink / (10**6)))
              //console.log("multiplying", lib.web3.utils.fromWei(tag.wad.toString()), "*", res.ink)
              console.log("pro", lib.u.rmul(tag.wad.toString(), res.ink.toString() ).toString());

            vox.then(async (result) => {
              let par = await result.par().send(lib.opts);
              console.log("par", par.toString())
              console.log("multiplying", tab.toString(), "*", par.toString());
              console.log("con", lib.u.rmul(tab.toString(), par.toString() ).toString());
  
              let min = lib.u.rmul(lib.u.rmul(tab.toString(), par.toString() ), 1500000000000000000000000000)
              console.log("min", min.toString());
            })
            */

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
.command('lock <id> <wad>')
.description('post additional PETH collateral to a cup')
.action( (id, wad) => {
    tub.then((result) => {
        result.lock(lib.u.toBytes32(id), lib.u.toWei(wad)).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        });
    })
});  
program
.command('give <id> <lad>')
.description('give cup to another lad')
.action( (id, lad) => {
    tub.then((result) => {
        result.give(lib.u.toBytes32(id), lad).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        });
    })
}); 
program
.command('draw <id> <wad>')
.description('issue the specified amount of dai stablecoins')
.action( (id, wad) => {
    tub.then((result) => {
        result.draw(lib.u.toBytes32(id), lib.u.toWei(wad)).send(lib.opts)
        .then(next => {
            console.log("got ", next)
        }).catch(function (err) {
            console.log(err);
            //console.log(chalk.red(lib.tronWeb.toUtf8(err.output.resMessage)));                              
        }) 
    })
});  

program.parse(process.argv);