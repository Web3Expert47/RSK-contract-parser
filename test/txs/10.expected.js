import { result as tx } from './10.json'
import abi from './10.abi.json'

export default {
  tx,
  abi,
  expect: {
    'events': [
      {
        'logIndex': 0,
        'blockNumber': 1034938,
        'blockHash': '0x654299007c2cec34241222e0565bfeaa517c71e1122575b1939b94267283a68f',
        'transactionHash': '0x8b1664e50bafe2cb8dc3c29cbd493ec9e752fc7208d4eb1902f4138fec2544b5',
        'transactionIndex': 14,
        'address': '0x925606edc5863c079b712daed560c31eff8335b9',
        'data': '0x000000000000000000000000a36085f69e2889c224210f603d836748e7dc0088000000000000000000000000170346689cc312d8e19959bc68c3ad03e72c98500000000000000000000000000000000000000000000000044598f17d3655050000000000000000000000000000000000000000000000000000000000000001001c0838a4b207ac67c10c120099fb33301d9c946239dc8742d165c298fc8dcea300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000044c494e4b00000000000000000000000000000000000000000000000000000000',
        'topics': [
          '0x4237ab39e8496b350fbe760f4402abe992fc5d7e175824b087182422d347cf8a',
          '0x0000000000000000000000008f397ff074ff190fc650e5cab4da039a8163e12a',
          '0xd5ff7b56a6b1bdf0e086e3eb950c50e392640280b04ef3b44616f1e67f9e3cd0',
          '0x90c0f24295b0261eb20440c77aba0b67c7026b2625a260074016bdfca5699a81'
        ],
        'event': 'Voted',
        'args': [
          '0x8f397ff074ff190fc650e5cab4da039a8163e12a',
          '0xd5ff7b56a6b1bdf0e086e3eb950c50e392640280b04ef3b44616f1e67f9e3cd0',
          '0xa36085f69e2889c224210f603d836748e7dc0088',
          '0x170346689cc312d8e19959bc68c3ad03e72c9850',
          '0x044598f17d36550500',
          'LINK',
          '0x1c0838a4b207ac67c10c120099fb33301d9c946239dc8742d165c298fc8dcea3',
          '0x90c0f24295b0261eb20440c77aba0b67c7026b2625a260074016bdfca5699a81',
          '0x2',
          '0x12',
          '0x01'
        ],
        'abi': {
          'anonymous': false,
          'inputs': [
            {
              'indexed': true,
              'name': 'sender',
              'type': 'address'
            },
            {
              'indexed': true,
              'name': 'transactionId',
              'type': 'bytes32'
            },
            {
              'indexed': false,
              'name': 'originalTokenAddress',
              'type': 'address'
            },
            {
              'indexed': false,
              'name': 'receiver',
              'type': 'address'
            },
            {
              'indexed': false,
              'name': 'amount',
              'type': 'uint256'
            },
            {
              'indexed': false,
              'name': 'symbol',
              'type': 'string'
            },
            {
              'indexed': false,
              'name': 'blockHash',
              'type': 'bytes32'
            },
            {
              'indexed': true,
              'name': 'transactionHash',
              'type': 'bytes32'
            },
            {
              'indexed': false,
              'name': 'logIndex',
              'type': 'uint32'
            },
            {
              'indexed': false,
              'name': 'decimals',
              'type': 'uint8'
            },
            {
              'indexed': false,
              'name': 'granularity',
              'type': 'uint256'
            }
          ],
          'name': 'Voted',
          'type': 'event'
        },
        'signature': '4237ab39e8496b350fbe760f4402abe992fc5d7e175824b087182422d347cf8a',
        '_addresses': [
          '0x8f397ff074ff190fc650e5cab4da039a8163e12a',
          '0xa36085f69e2889c224210f603d836748e7dc0088',
          '0x170346689cc312d8e19959bc68c3ad03e72c9850'
        ],
        'eventId': '00fcaba00e0005b1939b94267283a68f',
        'timestamp': 1595616049,
        'txStatus': '0x01'
      },
      {
        'logIndex': 1,
        'blockNumber': 1034938,
        'blockHash': '0x654299007c2cec34241222e0565bfeaa517c71e1122575b1939b94267283a68f',
        'transactionHash': '0x8b1664e50bafe2cb8dc3c29cbd493ec9e752fc7208d4eb1902f4138fec2544b5',
        'transactionIndex': 14,
        'address': '0x8bbbd80981fe76d44854d8df305e8985c19f0e78',
        'data': '0x0000000000000000000000000000000000000000000000044598f17d365505000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        'topics': [
          '0x2fe5be0146f74c5bce36c0b80911af6c7d86ff27e89d5cfa61fc681327954e5d',
          '0x000000000000000000000000684a8a976635fb7ad74a0134ace990a6a0fcce84',
          '0x000000000000000000000000170346689cc312d8e19959bc68c3ad03e72c9850'
        ],
        'abi': {},
        'eventId': '00fcaba00e0015b1939b94267283a68f',
        'timestamp': 1595616049,
        'txStatus': '0x01',
        'event': null
      },
      {
        'logIndex': 2,
        'blockNumber': 1034938,
        'blockHash': '0x654299007c2cec34241222e0565bfeaa517c71e1122575b1939b94267283a68f',
        'transactionHash': '0x8b1664e50bafe2cb8dc3c29cbd493ec9e752fc7208d4eb1902f4138fec2544b5',
        'transactionIndex': 14,
        'address': '0x8bbbd80981fe76d44854d8df305e8985c19f0e78',
        'data': '0x0000000000000000000000000000000000000000000000044598f17d36550500',
        'topics': [
          '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
          '0x0000000000000000000000000000000000000000000000000000000000000000',
          '0x000000000000000000000000170346689cc312d8e19959bc68c3ad03e72c9850'
        ],
        'abi': {},
        'eventId': '00fcaba00e0025b1939b94267283a68f',
        'timestamp': 1595616049,
        'txStatus': '0x01',
        'event': null
      },
      {
        'logIndex': 3,
        'blockNumber': 1034938,
        'blockHash': '0x654299007c2cec34241222e0565bfeaa517c71e1122575b1939b94267283a68f',
        'transactionHash': '0x8b1664e50bafe2cb8dc3c29cbd493ec9e752fc7208d4eb1902f4138fec2544b5',
        'transactionIndex': 14,
        'address': '0x684a8a976635fb7ad74a0134ace990a6a0fcce84',
        'data': '0x0000000000000000000000000000000000000000000000044598f17d36550500000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000044598f17d3655050000000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000001',
        'topics': [
          '0xf244c12ced134b85172a3a06076c63efa539d91335731f5735298a24148e773d',
          '0x000000000000000000000000a36085f69e2889c224210f603d836748e7dc0088',
          '0x000000000000000000000000170346689cc312d8e19959bc68c3ad03e72c9850'
        ],
        'abi': {},
        'eventId': '00fcaba00e0035b1939b94267283a68f',
        'timestamp': 1595616049,
        'txStatus': '0x01',
        'event': null
      },
      {
        'logIndex': 4,
        'blockNumber': 1034938,
        'blockHash': '0x654299007c2cec34241222e0565bfeaa517c71e1122575b1939b94267283a68f',
        'transactionHash': '0x8b1664e50bafe2cb8dc3c29cbd493ec9e752fc7208d4eb1902f4138fec2544b5',
        'transactionIndex': 14,
        'address': '0x925606edc5863c079b712daed560c31eff8335b9',
        'data': '0x',
        'topics': [
          '0xa74c8847d513feba22a0f0cb38d53081abf97562cdb293926ba243689e7c41ca',
          '0xd5ff7b56a6b1bdf0e086e3eb950c50e392640280b04ef3b44616f1e67f9e3cd0'
        ],
        'event': 'Executed',
        'args': [
          '0xd5ff7b56a6b1bdf0e086e3eb950c50e392640280b04ef3b44616f1e67f9e3cd0'
        ],
        'abi': {
          'anonymous': false,
          'inputs': [
            {
              'indexed': true,
              'name': 'transactionId',
              'type': 'bytes32'
            }
          ],
          'name': 'Executed',
          'type': 'event'
        },
        'signature': 'a74c8847d513feba22a0f0cb38d53081abf97562cdb293926ba243689e7c41ca',
        '_addresses': [],
        'eventId': '00fcaba00e0045b1939b94267283a68f',
        'timestamp': 1595616049,
        'txStatus': '0x01'
      }
    ]
  }
}
