"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tokensInterfaces = exports.contractsInterfaces = exports.bitcoinRskNetWorks = exports.bitcoinNetworks = exports.INTERFACE_ID_BYTES = exports.ABI_SIGNATURE = void 0;const ABI_SIGNATURE = exports.ABI_SIGNATURE = '__signatureData';

const INTERFACE_ID_BYTES = exports.INTERFACE_ID_BYTES = 4;

const bitcoinNetworks = exports.bitcoinNetworks = {
  TESTNET: 'testnet',
  MAINNET: 'mainnet',
  REGTEST: 'regtest'
};

const bitcoinRskNetWorks = exports.bitcoinRskNetWorks = {
  31: bitcoinNetworks.TESTNET,
  30: bitcoinNetworks.MAINNET,
  33: bitcoinNetworks.REGTEST
};

const contractsInterfaces = exports.contractsInterfaces = {
  ERC20: 'ERC20',
  ERC677: 'ERC677',
  ERC165: 'ERC165',
  ERC721: 'ERC721'
};

const ci = contractsInterfaces;

const tokensInterfaces = exports.tokensInterfaces = [
ci.ERC20,
ci.ERC677,
ci.ERC721];
//# sourceMappingURL=types.js.map