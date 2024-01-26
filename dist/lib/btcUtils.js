"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sha256 = exports.rskAddressFromBtcPublicKey = exports.pubToAddress = exports.parsePublic = exports.h160toAddress = exports.h160 = exports.decompressPublic = exports.compressPublic = void 0;var _crypto = _interopRequireDefault(require("crypto"));
var bs58 = _interopRequireWildcard(require("bs58"));
var _rskUtils = require("@rsksmart/rsk-utils");
var _secp256k = _interopRequireDefault(require("secp256k1"));function _getRequireWildcardCache(e) {if ("function" != typeof WeakMap) return null;var r = new WeakMap(),t = new WeakMap();return (_getRequireWildcardCache = function (e) {return e ? t : r;})(e);}function _interopRequireWildcard(e, r) {if (!r && e && e.__esModule) return e;if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };var t = _getRequireWildcardCache(r);if (t && t.has(e)) return t.get(e);var n = { __proto__: null },a = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];}return n.default = e, t && t.set(e, n), n;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const PREFIXES = {
  mainnet: {
    pubKeyHash: '00',
    scriptHash: '05'
  },
  testnet: {
    pubKeyHash: '6F',
    scriptHash: 'C4'
  },
  regtest: {
    pubKeyHash: '00',
    scriptHash: '00'
  }
};
const getNetPrefix = (netName) => {
  let prefixes = PREFIXES[netName];
  if (!prefixes) throw new Error(`Unknown network ${netName}`);
  return prefixes;
};

const createHash = (a, val, from = 'hex', to = 'hex') => _crypto.default.createHash(a).update(val, from).digest(to);

const sha256 = (val, from, to) => createHash('sha256', (0, _rskUtils.remove0x)(val), from, to);exports.sha256 = sha256;

const h160 = (val, from, to) => createHash('ripemd160', (0, _rskUtils.remove0x)(val), from, to);exports.h160 = h160;

const h160toAddress = (hash160, { network, prefixKey }) => {
  network = network || 'mainnet';
  prefixKey = prefixKey || 'pubKeyHash';
  const prefix = getNetPrefix(network)[prefixKey];
  hash160 = Buffer.isBuffer(hash160) ? hash160.toString('hex') : (0, _rskUtils.remove0x)(hash160);
  hash160 = `${prefix}${hash160}`;
  let check = sha256(sha256(hash160)).slice(0, 8);
  return bs58.encode(Buffer.from(`${hash160}${check}`, 'hex'));
};exports.h160toAddress = h160toAddress;

const pubToAddress = (pub, network) => {
  return h160toAddress(h160(sha256((0, _rskUtils.remove0x)(pub))), { network });
};exports.pubToAddress = pubToAddress;

const parsePublic = (pub, compressed) => {
  pub = !Buffer.isBuffer(pub) ? Buffer.from((0, _rskUtils.remove0x)(pub), 'hex') : pub;
  return _secp256k.default.publicKeyConvert(pub, compressed);
};exports.parsePublic = parsePublic;

const decompressPublic = (compressed) => parsePublic(compressed, false).toString('hex');exports.decompressPublic = decompressPublic;

const compressPublic = (pub) => parsePublic(pub, true).toString('hex');exports.compressPublic = compressPublic;

const rskAddressFromBtcPublicKey = (cpk) => (0, _rskUtils.add0x)((0, _rskUtils.keccak256)(parsePublic(cpk, false).slice(1)).slice(-40));exports.rskAddressFromBtcPublicKey = rskAddressFromBtcPublicKey;
//# sourceMappingURL=btcUtils.js.map