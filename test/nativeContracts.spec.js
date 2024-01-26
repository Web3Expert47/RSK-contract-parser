import { NativeContracts, parseNativeContracts, defaultNativeContracts } from '../src/lib/nativeContracts/NativeContracts'
import { expect } from 'chai'

describe(`#NativeContracts`, function () {
  describe(`parseNativeContracts()`, function () {
    it(`Undefined parameters should throw an error`, () => {
      expect(() => parseNativeContracts()).to.throw(TypeError)
      expect(() => parseNativeContracts(null)).to.throw(TypeError)
      expect(() => parseNativeContracts(undefined)).to.throw(TypeError)
    })
    it(`Invalid addresses should throw an error`, () => {
      expect(() => parseNativeContracts({ test: '0x2000' })).to.throw(Error)
    })
    const test = {
      A: '0x32dfc7A84f24b10B5dded1d8b24f48b96ab56789',
      B: '0xBacfde2094509f3a2323092039230920f3409430'
    }
    const result = parseNativeContracts(test)

    it(`The returned object must have the same keys`, () => {
      expect(Object.keys(test)).to.be.deep.equal(Object.keys(result))
    })

    it(`The returned addresses should be in lower case`, () => {
      for (let n in test) {
        expect(result[n]).to.be.equal(test[n].toLowerCase())
      }
    })
  })
  describe(`NativeContracts instance`, function () {
    let na = NativeContracts()
    let { getNativeContractAddress, getNativeContractName, isNativeContract, list } = na
    let addresses = Object.values(defaultNativeContracts)
    let names = Object.keys(defaultNativeContracts)

    describe(`getNativeContractAddress()`, function () {
      for (let name of names) {
        let address = defaultNativeContracts[name]
        it(`${address} should return ${name}`, () => {
          expect(getNativeContractAddress(name)).to.be.equal(address)
        })
      }
    })

    describe(`getNativeContractName()`, function () {
      for (let name of names) {
        let address = defaultNativeContracts[name]
        it(`${address} should return ${name}`, () => {
          expect(getNativeContractName(address)).to.be.equal(name)
        })
      }
    })

    describe(`isNativeContract()`, function () {

      it(`should return true`, () => {
        expect(isNativeContract(addresses[0])).to.be.deep.equal(true)
      })

      it(`should return false`, () => {
        expect(isNativeContract('0x32dfc7A84f24b10B5dded1d8b24f48b96ab56789')).to.be.deep.equal(false)
      })
    })

    describe(`list()`, function () {
      it(`should return the contracts list`, () => {
        expect(list()).to.be.deep.equal(defaultNativeContracts)
      })
    })
  })
})
