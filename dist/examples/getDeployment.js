"use strict";var _index = require("../index");
var _nod3Connect = require("../lib/nod3Connect");
var _rskUtils = require("@rsksmart/rsk-utils");

const url = process.env['URL'] || 'http://localhost:4444';
const address = process.argv[2];
const highBlock = process.argv[3];

if (!address) help();
if (!(0, _rskUtils.isAddress)(address)) help(`Invalid address "${address}"`);

const nod3 = (0, _nod3Connect.nod3Connect)(url);

console.log(`Searching in node: ${url}`);
search(address, highBlock);

async function search(address, highBlock) {
  try {
    highBlock = highBlock || 'latest';
    const code = await nod3.eth.getCode(address, highBlock);
    if (!parseInt(code)) {
      throw new Error(`The address ${address} has no code at block ${highBlock}`);
    }
    const bcsearch = (0, _index.BcSearch)(nod3);
    let res = await bcsearch.deploymentTx(address.toLowerCase(), { highBlock });
    console.log(res);
  } catch (err) {
    console.error(err);
    process.exit(9);
  }
}

function help(msg) {
  if (msg) console.log(`${msg}`);
  console.log('Usage:');
  console.log(`node ${process.argv[1]} address [highestBlock]`);
  console.log();
  console.log(`Set environment variable URL to change node url`);
  console.log(`Example: export URL=http://localhost:4444`);
  process.exit(0);
}
//# sourceMappingURL=getDeployment.js.map