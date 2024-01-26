"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.RELEASES = void 0;exports.getBridgeAbi = getBridgeAbi;var _bridgeOrchid = _interopRequireDefault(require("./bridge-orchid.json"));
var _bridgeWasabi = _interopRequireDefault(require("./bridge-wasabi.json"));
var _bridgePapyrus = _interopRequireDefault(require("./bridge-papyrus.json"));
var _bridgeIris = _interopRequireDefault(require("./bridge-iris.json"));
var _bridgeFingerroot = _interopRequireDefault(require("./bridge-fingerroot.json"));
var _bridgeHop = _interopRequireDefault(require("./bridge-hop.json"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const RELEASES = exports.RELEASES = {
  mainnet: [
  { height: 0, abi: _bridgeOrchid.default },
  { height: 1591000, abi: _bridgeWasabi.default },
  { height: 2392700, abi: _bridgePapyrus.default },
  { height: 3614800, abi: _bridgeIris.default },
  { height: 4598500, abi: _bridgeHop.default },
  { height: 5468000, abi: _bridgeFingerroot.default }],

  testnet: [
  { height: 0, abi: _bridgeWasabi.default },
  { height: 863000, abi: _bridgePapyrus.default },
  { height: 2060500, abi: _bridgeIris.default },
  { height: 3103000, abi: _bridgeHop.default },
  { height: 4015800, abi: _bridgeFingerroot.default }]

};

function findmatchingAbi(txHeight, abisWithHeight) {
  const lastIndex = abisWithHeight.length - 1;

  if (txHeight >= abisWithHeight[lastIndex].height || txHeight === undefined) {
    return abisWithHeight[lastIndex].abi;
  }

  for (let i = 1; i <= lastIndex; i++) {
    const previous = abisWithHeight[i - 1];
    if (txHeight >= previous.height && txHeight < abisWithHeight[i].height) {
      return previous.abi;
    }
  }
}

function getBridgeAbi({ txBlockNumber, bitcoinNetwork }) {
  if (!['testnet', 'mainnet'].includes(bitcoinNetwork)) {
    throw new Error('Invalid bitcoin network');
  }

  return findmatchingAbi(txBlockNumber, RELEASES[bitcoinNetwork]);
}
//# sourceMappingURL=bridgeAbi.js.map