
import { remove0x, add0x, rlp } from '@rsksmart/rsk-utils'
import { addSignatureDataToAbi } from '../utils'
import * as btcUtils from '../btcUtils'

export default function FakeABI (network) {
  const decodeBtcTxHash = data => {
    if (remove0x(data).length === 128) {
      let buffer = Buffer.from(remove0x(data), 'hex')
      data = add0x(buffer.toString('ascii'))
    }
    return data
  }
  const decodeArray = data => data.map(d => Array.isArray(d) ? decodeArray(d) : add0x(d.toString('hex')))

  const decodeFederationData = data => {
    let [a160, keys] = data
    let address = btcUtils.h160toAddress(a160, { prefixKey: 'scriptHash', network }).toString('hex')
    keys = keys.map(d => btcUtils.rskAddressFromBtcPublicKey(d.toString('hex')))
    return [address, keys]
  }

  const commitFederationDecoder = data => {
    const decoded = rlp.decode(data)
    let [oldData, newData, block] = decoded
    let [oldFederationAddress, oldFederationMembers] = decodeFederationData(oldData)
    let [newFederationAddress, newFederationMembers] = decodeFederationData(newData)
    block = block.toString('ascii')
    return [oldFederationAddress, oldFederationMembers, newFederationAddress, newFederationMembers, block]
  }
  return Object.freeze(addSignatureDataToAbi([
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
        }
      ],
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
        }
      ],
      name: 'release_btc_topic',
      type: 'event'
    },
    {
      inputs: [
        {
          indexed: false,
          name: 'sender',
          type: 'address'
        }
      ],
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
        }
      ],
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
        }
      ],
      name: 'commit_federation_topic',
      type: 'event',
      _decoder: commitFederationDecoder
    }
  ]))
}
