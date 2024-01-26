import { filterEvents, addSignatureDataToAbi } from '../src/lib/utils'
import { expect } from 'chai'

describe(`ABI compiler`, function () {
  describe(`filterEvents()`, function () {
    const eventA = {
      type: 'event',
      name: 'test'
    }

    const eventB = {
      type: 'event',
      name: 'test',
      inputs: [
        {
          name: 'from',
          type: 'address'
        },
        {
          name: 'to',
          type: 'address'
        }
      ]
    }
    const eventBB = {
      type: 'event',
      name: 'test',
      inputs: [
        {
          name: 'from',
          type: 'address',
          indexed: true
        },
        {
          name: 'to',
          type: 'address'
        }
      ]
    }
    it(`should remove duplicated events`, () => {
      const abi = filterEvents(addSignatureDataToAbi([eventA, eventA, eventB, eventBB]))
      expect(abi).to.be.deep.equal([eventA, eventB, eventBB])
    })
  })
})
