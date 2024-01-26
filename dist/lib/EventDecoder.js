"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = require("./utils");
var _rskUtils = require("@rsksmart/rsk-utils");
var _abi = require("@ethersproject/abi");

function EventDecoder(abi, logger) {
  const contractInterface = new _abi.Interface((0, _utils.addSignatureDataToAbi)(abi));

  const getEventAbi = (topics) => {
    topics = [...topics];
    const sigHash = (0, _rskUtils.remove0x)(topics.shift());
    let events = abi.filter((i) => {
      let { indexed, signature } = (0, _utils.getSignatureDataFromAbi)(i);
      return signature === sigHash && indexed === topics.length;
    });
    if (events.length > 1) throw new Error('Duplicate events in ABI');
    const eventABI = events[0];
    return { eventABI, topics };
  };

  const formatElement = (type, decoded) => {
    if (decoded._isIndexed) return { _isIndexed: true, hash: decoded.hash };
    if (decoded._isBigNumber) {
      return decoded.toHexString();
    }
    const res = (0, _rskUtils.add0x)(Buffer.isBuffer(decoded) ? (0, _rskUtils.bufferToHex)(decoded) : decoded.toString(16));
    if (type === 'address' || type === 'address[]') return res.toLowerCase();
    return res;
  };

  const encodeElement = (type, decoded) => {
    if (Array.isArray(decoded)) {
      decoded = decoded.map((d) => formatElement(type, d));
      if (decoded.length === 1) decoded = decoded.join();
    } else {
      decoded = formatElement(type, decoded);
    }
    return decoded;
  };

  const decodeLog = (log) => {
    try {
      const { eventFragment, name, args, topic } = contractInterface.parseLog(log);

      const { address } = log;

      const parsedArgs = [];

      for (const i in eventFragment.inputs) {
        parsedArgs.push(
          encodeElement(eventFragment.inputs[i].type, args[i])
        );
      }

      return Object.assign({}, log, {
        signature: (0, _rskUtils.remove0x)(topic),
        event: name,
        address,
        args: parsedArgs,
        abi: JSON.parse(eventFragment.format('json'))
      });
    } catch (e) {
      // temporary fix to avoid ethers "no matching event" error spam
      if (!e.message.includes('no matching event')) {
        logger.error(e);
      }
      return log;
    }
  };

  return Object.freeze({ decodeLog, getEventAbi });
}var _default = exports.default =

EventDecoder;
//# sourceMappingURL=EventDecoder.js.map