import { expect } from 'chai'
import orchid from '../src/lib/nativeContracts/bridge-orchid.json'
import wasabi from '../src/lib/nativeContracts/bridge-wasabi.json'
import iris from '../src/lib/nativeContracts/bridge-iris.json'
import fingerroot from '../src/lib/nativeContracts/bridge-fingerroot.json'
import hop from '../src/lib/nativeContracts/bridge-hop.json'
import { getBridgeAbi, RELEASES } from '../src/lib/nativeContracts/bridgeAbi'

/*
  mainnet: {
    0: orchid,
    1591000: wasabi,
    2392700: papyrus,
    3614800: iris,
    4598500: hop,
    5468000: fingerroot
  },
  testnet: {
    0: wasabi,
    863000: papyrus,
    2060500: iris,
    3103000: hop,
    4015800: fingerroot
  }
*/

describe('All abis must be in ascendant order', () => {
  const mainnetAbis = RELEASES['mainnet']
  const testnetAbis = RELEASES['testnet']

  for (let i = 1; i < mainnetAbis.length; i++) {
    it('Should current height be higher than the previous one', () => {
      expect(mainnetAbis[i].height).to.be.greaterThan(mainnetAbis[i - 1].height)
    })
  }

  for (let i = 1; i < testnetAbis.length; i++) {
    it('Should current height be higher than the previous one', () => {
      expect(testnetAbis[i].height).to.be.greaterThan(testnetAbis[i - 1].height)
    })
  }
})

describe('getBridgeAbi(txBlockNumber, bitcoinNetwork) should return the correct ABI for the bridge', () => {
  const mainnetTestExpectations = [
    { height: 0, abi: orchid, name: 'orchid' },
    { height: 1, abi: orchid, name: 'orchid' },
    { height: 3614801, abi: iris, name: 'iris' },
    { height: 5468005, abi: fingerroot, name: 'fingerroot' }
  ]
  const testnetTestExpectatins = [
    { height: 0, abi: wasabi, name: 'wasabi' },
    { height: 1, abi: wasabi, name: 'wasabi' },
    { height: 3103001, abi: hop, name: 'hop' }
  ]

  for (const { height, abi, name } of mainnetTestExpectations) {
    const params = { txBlockNumber: height, bitcoinNetwork: 'mainnet' }

    it(`Should return ${name} abi for height ${height} in ${params.bitcoinNetwork}`, () => {
      expect(getBridgeAbi(params)).to.be.deep.equal(abi)
    })
  }

  for (const { height, abi, name } of testnetTestExpectatins) {
    const params = { txBlockNumber: height, bitcoinNetwork: 'testnet' }

    it(`Should return ${name} abi for height ${height} in ${params.bitcoinNetwork}`, () => {
      expect(getBridgeAbi(params)).to.be.deep.equal(abi)
    })
  }

  it('Should throw an error with a non existent bitcoin network', () => {
    const getAbi = () => getBridgeAbi({ txBlockNumber: 3003, bitcoinNetwork: 'wondernet' })
    expect(getAbi).to.throw()
  })
})
