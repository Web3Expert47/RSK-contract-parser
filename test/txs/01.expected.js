import { result as tx } from './01.json'

export default {
  tx,
  expect: {
    events: [
      {
        event: 'OwnershipTransferred',
        address: '0x11944f818fee2c724d4acd1dbc4b4df5dde824f9',
        args: {
          from: '0x0000000000000000000000000000000000000000',
          to: '0x9128785b060d47ab417d6cee72e25358c6bd677f'
        }
      }
    ]
  }
}
