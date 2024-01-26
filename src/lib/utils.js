import { keccak256, add0x } from '@rsksmart/rsk-utils'
import { ABI_SIGNATURE, INTERFACE_ID_BYTES } from './types'

export const setAbi = abi => addSignatureDataToAbi(abi, true)

export const abiEvents = abi => abi.filter(v => v.type === 'event')

export const abiMethods = abi => abi.filter(v => v.type === 'function')

export const soliditySignature = name => keccak256(name)

export const soliditySelector = signature => signature.slice(0, 8)

export const solidityName = abi => {
  let { name, inputs } = abi
  inputs = (inputs) ? inputs.map(i => i.type) : []
  return (name) ? `${name}(${inputs.join(',')})` : null
}

export const removeAbiSignatureData = (abi) => {
  abi = Object.assign({}, abi)
  if (undefined !== abi[ABI_SIGNATURE]) delete abi[ABI_SIGNATURE]
  return abi
}

export const getInputsIndexes = abi => {
  let { inputs } = abi
  return (inputs && abi.type === 'event') ? inputs.map(i => i.indexed) : []
}

export const abiSignatureData = abi => {
  let method = solidityName(abi)
  let signature = (method) ? soliditySignature(method) : null
  let index = getInputsIndexes(abi)
  let indexed = (index) ? index.filter(i => i === true).length : 0
  let eventSignature = null
  if ((method && abi.type === 'event')) {
    eventSignature = soliditySignature(`${method}${Buffer.from(index).toString('hex')}`)
  }
  return { method, signature, index, indexed, eventSignature }
}

export const addSignatureDataToAbi = (abi, skip) => {
  abi.map((value, i) => {
    if (!value[ABI_SIGNATURE] || !skip) {
      value[ABI_SIGNATURE] = abiSignatureData(value)
    }
  })
  return abi
}

export const erc165Id = selectors => {
  let id = selectors.map(s => Buffer.from(s, 'hex'))
    .reduce((a, bytes) => {
      for (let i = 0; i < INTERFACE_ID_BYTES; i++) {
        a[i] = a[i] ^ bytes[i]
      }
      return a
    }, Buffer.alloc(INTERFACE_ID_BYTES))
  return add0x(id.toString('hex'))
}

export const erc165IdFromMethods = methods => {
  return erc165Id(methods.map(m => soliditySelector(soliditySignature(m))))
}

export const getSignatureDataFromAbi = abi => {
  return abi[ABI_SIGNATURE]
}

export function filterEvents (abi) {
  const type = 'event'
  // get events from ABI
  let events = abi.filter(a => a.type === type)
  // remove events from ABI
  abi = abi.filter(a => a.type !== type)
  let keys = [...new Set(events.map(e => e[ABI_SIGNATURE].eventSignature))]
  events = keys.map(k => events.find(e => e[ABI_SIGNATURE].eventSignature === k))
  abi = abi.concat(events)
  return abi
}

function filterArr (a) {
  if (!Array.isArray(a)) return a
  return a.find(x => filterArr(x))
}

export async function binarySearchNumber (searchCb, high, low) {
  try {
    high = parseInt(high || 0)
    low = parseInt(low || 0)
    if (typeof searchCb !== 'function') throw new Error('SeachCb must be a function')
    let [l, h] = await Promise.all([low, high].map(b => searchCb(b)))
    if (l !== h) {
      if (high === low + 1) {
        return high
      } else {
        let mid = Math.floor(high / 2 + low / 2)
        let res = await Promise.all([
          binarySearchNumber(searchCb, high, mid),
          binarySearchNumber(searchCb, mid, low)])
        return filterArr(res)
      }
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
