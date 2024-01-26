"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = NativeContractsEventDecoder;var _NativeContractsEvents = _interopRequireDefault(require("./NativeContractsEvents"));
var _EventDecoder = _interopRequireDefault(require("../EventDecoder"));
var _bridgeAbi = require("./bridgeAbi");
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function NativeContractsEventDecoder({ bitcoinNetwork, txBlockNumber }) {
  const nativeDecoder = (0, _NativeContractsEvents.default)({ bitcoinNetwork });
  const ABI = (0, _utils.addSignatureDataToAbi)((0, _bridgeAbi.getBridgeAbi)({ txBlockNumber, bitcoinNetwork }));
  const solidityDecoder = (0, _EventDecoder.default)(ABI);

  const getEventDecoder = (log) => {
    const { eventABI } = solidityDecoder.getEventAbi([...log.topics]);
    return eventABI ? solidityDecoder : nativeDecoder;
  };
  return Object.freeze({ getEventDecoder });
}
//# sourceMappingURL=NativeContractsDecoder.js.map