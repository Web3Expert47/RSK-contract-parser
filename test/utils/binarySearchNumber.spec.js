import { expect } from 'chai'
import { binarySearchNumber } from '../../src/lib/utils'

let number = 1000
const testNumber = n => n > number

let tests = [
  [[testNumber, number + 1], number + 1],
  [[testNumber, number * 2], number + 1],
  [[testNumber, 100, 200], undefined]
]

describe('binarySearchNumber()', function () {
  for (let [args, expected] of tests) {
    it(`should return ${expected}`, async () => {
      let res = await binarySearchNumber(...args)
      expect(res).to.be.equal(expected)
    })
  }
})
