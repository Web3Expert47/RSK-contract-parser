import { assert } from 'chai'
import { ContractParser } from '../src/lib/ContractParser'
import { isAddress } from '@rsksmart/rsk-utils'
import txs from './txs/'

const initConfig = {
  nativeContracts: {
    bridge: '0x0000000000000000000000000000000001000006',
    remasc: '0x0000000000000000000000000000000001000008'
  }
}

describe('# decode events', function () {
  this.timeout(9000)
  for (let t of txs) {
    let id = t.netId || 31
    initConfig.net = { id }
    let { abi, tx } = t

    let parser = new ContractParser({ initConfig, abi, txBlockNumber: (parseInt(tx.blockNumber)) })
    let e = t.expect
    describe(`TX: ${tx.transactionHash}`, function () {
      let decodedLogs = parser.parseTxLogs(tx.logs)

      it(`should return ${e.events.length} events`, function () {
        assert.equal(tx.logs.length, e.events.length)
      })

      for (let i = 0; i < e.events.length; i++) {
        describe(`Event ${i}`, function () {
          let event = e.events[i]
          let decoded = decodedLogs[i]
          it(`should be ${event.event} event`, function () {
            assert.equal(event.event, decoded.event)
          })

          it(`should have a blockHash property`, () => {
            assert.property(decoded, 'blockHash')
          })

          it(`should have a transactionHash property`, () => {
            assert.property(decoded, 'transactionHash')
          })

          it(`should have a transactionIndex property`, () => {
            assert.property(decoded, 'transactionIndex')
          })

          it(`should have an address property`, () => {
            assert.property(decoded, 'address')
            if (event.address) assert.deepEqual(event.address, decoded.address)
          })

          // test decoded events
          if (event.event) {
            it(`addresses field must contain all addresses`, () => {
              const { abi, args, _addresses } = decoded
              abi.inputs.forEach((v, i) => {
                const { type, indexed } = v
                if (type === 'address') {
                  assert.include(_addresses, args[i])
                  assert.isTrue(isAddress(args[i]), `invalid address ${args[i]}`)
                }
                if (type === 'address[]' && indexed) {
                  assert.hasAllKeys(args[i], ['hash', '_isIndexed'])
                  assert.deepEqual(args[i]._isIndexed, true)
                }
              })
            })

            it(`should have an abi property`, () => {
              assert.property(decoded, 'abi')
              if (event.abi) assert.deepEqual(event.abi, decoded.abi)
            })

            it(`should have a signature property`, () => {
              assert.property(decoded, 'signature')
              if (event.signature) assert.deepEqual(event.signature, decoded.signature)
            })

            it(`should have an addresses property`, () => {
              assert.property(decoded, '_addresses')
              assert.typeOf(decoded._addresses, 'array')
              if (event._addresses) assert.deepEqual(event._addresses, decoded._addresses)
            })

            it(`decoded event should include all log properties`, () => {
              for (let p in tx.logs[i]) {
                assert.deepEqual(decoded[p], tx.logs[i][p], p)
              }
            })

            let argsLength = Object.keys(event.args).length
            it(`should have: ${argsLength} arguments`, function () {
              assert.equal(argsLength, Object.keys(decoded.args).length)
            })

            let keys = Object.keys(event.args)

            for (let a in event.args) {
              let arg = event.args[a]
              it(`should have: ${a} arg with value: ${arg}`, function () {
                assert.deepEqual(decoded.args[keys.indexOf(a)], arg)
              })
            }
          }
        })
      }
    })
  }
})
