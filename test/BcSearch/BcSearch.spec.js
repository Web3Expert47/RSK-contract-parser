import { expect } from 'chai'
import nod3 from '../../src/lib/nod3Connect'
import BcSearch from '../../src/lib/BcSearch'
import trace01 from './trace01.json'

let traces = [
  ['0x53ccd2ac4e923d8e74b66828070d6c3cc0c1861c', trace01, true]
]

let search = BcSearch(nod3)

describe('# BC search', function () {
  it('should be connected to RSK testnet', async function () {
    let net = await nod3.net.version()
    expect(net.id).to.be.equal('31')
  })

  describe('isItxDeployment()', function () {
    for (let [address, trace, expected] of traces) {
      it(`should be ${expected}`, () => {
        expect(search.isItxDeployment(address, trace)).to.be.equal(expected)
      })
    }
  })

  describe('deploymentBlock()', function () {
    this.timeout(90000)
    let tests = [['0x4f82e59517c29ed0c73f5351847eb075bf473465', 657077]]
    for (let [address, block] of tests) {
      it(`${address} should return ${block} `, async () => {
        let res = await search.deploymentBlock(address)
        expect(res).to.be.equal(block)
      })
    }
  })

  describe('deploymentTx()', function () {
    this.timeout(90000)
    let tests = [
      ['0x4f82e59517c29ed0c73f5351847eb075bf473465', { blockNumber: 65077, hash: '0xb07be69b3bd8c1713d2f1772a53d2b29c17d5485bfa1f899f8b81227191a5a7a' }],
      ['0x53ccd2ac4e923d8e74b66828070d6c3cc0c1861c', { blockNumber: 426919, transactionHash: '0x18bb48f7168476790d0e1293211b5e8f928e5ef69689518540008bedc282583c' }]
    ]
    for (let [address, expected] of tests) {
      it(`should return the deployment tx for ${address} `, async () => {
        let res = await search.deploymentTx(address)
        for (let e in Object.entries(expected)) {
          let [property, value] = e
          expect(res[property]).to.be.deep.equal(value)
        }
      })
    }
  })
})
