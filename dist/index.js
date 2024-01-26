"use strict";Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "BcSearch", { enumerable: true, get: function () {return _BcSearch.BcSearch;} });Object.defineProperty(exports, "Contract", { enumerable: true, get: function () {return _Contract.default;} });Object.defineProperty(exports, "ContractParser", { enumerable: true, get: function () {return _ContractParser.ContractParser;} });exports.default = exports.abi = void 0;var _ContractParser = require("./lib/ContractParser");
var _BcSearch = require("./lib/BcSearch");
var _Contract = _interopRequireDefault(require("./lib/Contract"));
var _bridgeAbi = require("./lib/nativeContracts/bridgeAbi");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const abi = exports.abi = { bridge: _bridgeAbi.getBridgeAbi };var _default = exports.default =

_ContractParser.ContractParser;

// HOTFIX: because the dependency @ethersproject/abi:5.7.0 spam the logs with 'duplicate definition' warning, this temporary fix should silence those messages until a newer version of the library fixes the issue
const originalConsoleLog = console.log;
console.log = function (message) {
  if (!String(message).includes('duplicate definition')) {
    originalConsoleLog(message);
  }
};
//# sourceMappingURL=index.js.map