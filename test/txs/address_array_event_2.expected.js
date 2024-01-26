import { result as tx } from './address_array_event_2.json'
import abi from './address_array_event_2.abi.json'

export default {
  tx,
  abi,
  expect: {
    events: [
      {
        event: 'ProposalCreated',
        address: '0x6e22f07d4edc6b13b07b7369f11371e7e5286de6',
        _addresses: ['0x0f39e7af6810a2b73a973c3167755930b1266811', '0xe8276a1680cb970c2334b3201044ddf7c492f52a'],
        args: {
          id: '0x06',
          propose: '0x0f39e7af6810a2b73a973c3167755930b1266811',
          targets: '0xe8276a1680cb970c2334b3201044ddf7c492f52a',
          values: '0x00',
          signatures: 'transferTokens(address,address,uint256)',
          calldatas: '0x000000000000000000000000189ecd23e9e34cfc07bfc3b7f5711a23f43f8a570000000000000000000000006a9a07972d07e58f0daf5122d11e069288a375fb00000000000000000000000000000000000000000001a784379d99db42000000',
          startBlock: '0x2501d8',
          endBlock: '0x250d18',
          description: 'SIP-0007: Origins Pre-Sale. Details: https://github.com/DistributedCollective/SIPS/blob/02f836980ee6a4b2992ffb1576e42655ac6fc241/SIP-0006.md , sha256: b6807ded0bd18ddd9d29e189179e23b6d63ef86e93b79143ed03c563770a490d'
        },
        abi: {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "proposer",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "targets",
              "type": "address[]"
            },
            {
              "indexed": false,
              "name": "values",
              "type": "uint256[]"
            },
            {
              "indexed": false,
              "name": "signatures",
              "type": "string[]"
            },
            {
              "indexed": false,
              "name": "calldatas",
              "type": "bytes[]"
            },
            {
              "indexed": false,
              "name": "startBlock",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "endBlock",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "description",
              "type": "string"
            }
          ],
          "name": "ProposalCreated",
          "type": "event"
        }
      }
    ]
  }
}
