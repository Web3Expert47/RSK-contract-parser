"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = FakeABI;
var _rskUtils = require("@rsksmart/rsk-utils");
var _utils = require("../utils");
var btcUtils = _interopRequireWildcard(require("../btcUtils"));function _getRequireWildcardCache(e) {if ("function" != typeof WeakMap) return null;var r = new WeakMap(),t = new WeakMap();return (_getRequireWildcardCache = function (e) {return e ? t : r;})(e);}function _interopRequireWildcard(e, r) {if (!r && e && e.__esModule) return e;if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };var t = _getRequireWildcardCache(r);if (t && t.has(e)) return t.get(e);var n = { __proto__: null },a = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];}return n.default = e, t && t.set(e, n), n;}

function FakeABI(network) {
  const decodeBtcTxHash = (data) => {
    if ((0, _rskUtils.remove0x)(data).length === 128) {
      let buffer = Buffer.from((0, _rskUtils.remove0x)(data), 'hex');
      data = (0, _rskUtils.add0x)(buffer.toString('ascii'));
    }
    return data;
  };
  const decodeArray = (data) => data.map((d) => Array.isArray(d) ? decodeArray(d) : (0, _rskUtils.add0x)(d.toString('hex')));

  const decodeFederationData = (data) => {
    let [a160, keys] = data;
    let address = btcUtils.h160toAddress(a160, { prefixKey: 'scriptHash', network }).toString('hex');
    keys = keys.map((d) => btcUtils.rskAddressFromBtcPublicKey(d.toString('hex')));
    return [address, keys];
  };

  const commitFederationDecoder = (data) => {
    const decoded = _rskUtils.rlp.decode(data);
    let [oldData, newData, block] = decoded;
    let [oldFederationAddress, oldFederationMembers] = decodeFederationData(oldData);
    let [newFederationAddress, newFederationMembers] = decodeFederationData(newData);
    block = block.toString('ascii');
    return [oldFederationAddress, oldFederationMembers, newFederationAddress, newFederationMembers, block];
  };
  return Object.freeze((0, _utils.addSignatureDataToAbi)([
  { // Remasc events
    anonymous: false,
    inputs: [
    {
      indexed: true,
      name: 'to',
      type: 'address'
    },
    {
      indexed: false,
      name: 'blockHash',
      type: 'string'
    },
    {
      indexed: false,
      name: 'value',
      type: 'uint256'
    }],

    name: 'mining_fee_topic',
    type: 'event'
  },
  { // Bridge events
    inputs: [
    {
      indexed: false,
      name: 'btcTxHash',
      type: 'string'
    },
    {
      indexed: false,
      name: 'btcTx', // raw tx?
      type: 'string'
    }],

    name: 'release_btc_topic',
    type: 'event'
  },
  {
    inputs: [
    {
      indexed: false,
      name: 'sender',
      type: 'address'
    }],

    name: 'update_collections_topic',
    type: 'event'
  },
  {
    inputs: [
    {
      indexed: false,
      name: 'btcTxHash',
      type: 'string',
      _filter: decodeBtcTxHash
    },
    {
      indexed: false,
      name: 'federatorPublicKey',
      type: 'string'
    },
    {
      indexed: false,
      name: 'rskTxHash',
      type: 'string'
    }],

    name: 'add_signature_topic',
    type: 'event'
  },
  {
    inputs: [
    {
      indexed: false,
      name: 'oldFederationAddress',
      type: 'string'
    },
    {
      indexed: false,
      name: 'oldFederationMembers',
      type: 'address[]'
    },
    {
      indexed: false,
      name: 'newFederationAddress',
      type: 'string'
    },
    {
      indexed: false,
      name: 'newFederationMembers',
      type: 'address[]'
    },
    {
      indexed: false,
      name: 'activationBlockNumber',
      type: 'string'
    }],

    name: 'commit_federation_topic',
    type: 'event',
    _decoder: commitFederationDecoder
  }]
  ));
}
//# sourceMappingURL=FakeABI.js.map