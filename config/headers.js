const chalk = require("chalk");

module.exports = {
	cdp: [{value:"lad",headerColor:"cyan",color:"white",align:"left",paddingLeft:5,width:56},{value:"ink",color:"red",width:10,formatter:(value)=>{if(value>0){value=chalk.green(value)}return value}},{value:"art",color:"red",width:10},{value:"ire",color:"red",width:10},{value:"index",color:"white",width:5}]	

}