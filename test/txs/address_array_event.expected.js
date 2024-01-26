import { result as tx } from './address_array_event.json'
import abi from './address_array_event.abi.json'

export default {
  tx,
  abi,
  expect: {
    events: [
      {
        event: 'TransferBatch',
        address: '0x8859c08ed73bd06b2961ccc88160cb11a61d69f7',
        args: {
          from: '0x0000000000000000000000000000000000000000',
          to: { _isIndexed: true, hash: '0x4cafb10118c6176cea8f9427e636ce907815ab55a3c441c407e2d6a939a6d84b' },
          values: ["0x038d7ea4c68000", "0x038d7ea4c68000"]
        },
        abi: {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "to",
              "type": "address[]"
            },
            {
              "indexed": false,
              "name": "values",
              "type": "uint256[]"
            }
          ],
          "name": "TransferBatch",
          "type": "event"
        }
      }
    ]
  }
}
