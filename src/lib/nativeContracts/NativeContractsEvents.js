import { remove0x, add0x, rlp } from '@rsksmart/rsk-utils'
import { getSignatureDataFromAbi } from '../utils'
import FakeAbi from './FakeABI'
export function NativeContractsEvents ({ bitcoinNetwork } = {}) {
  const network = bitcoinNetwork || 'testnet'
  const fakeAbi = FakeAbi(network)
  const decodeAddress = address => {
    address = Buffer.from(remove0x(address), 'hex')
    return add0x(address.toString('hex').slice(-40))
  }

  const decodeEventName = name => {
    return Buffer.from(remove0x(name), 'hex').toString('ascii').replace(/\0/g, '')
  }

  const removeEmptyStartBytes = d => {
    d = (!Buffer.isBuffer(d)) ? Buffer.from(d, 'hex') : d
    return d.slice(d.findIndex(x => x > 0))
  }

  const decodeData = data => {
    let decoded = rlp.decode(data)
    if (!Array.isArray(decoded)) decoded = [decoded]
    return decoded.map(d => add0x(removeEmptyStartBytes(d).toString('hex')))
  }

  const getEventAbi = eventName => fakeAbi.find(a => a.name === eventName && a.type === 'event')

  const decodeByType = (type, value) => {
    if (type === 'address') return decodeAddress(value)
    return value
  }

  const decodeInput = (input, value) => {
    let { type, _filter } = input
    if (_filter && typeof _filter === 'function') {
      value = _filter(value)
    }
    return decodeByType(type, value)
  }

  const removeCustomProperties = obj => {
    const res = Object.assign({}, obj)
    for (let p in res) {
      if (p[0] === '_') delete res[p]
    }
    return res
  }

  const cleanAbi = abi => {
    abi = removeCustomProperties(abi)
    let { inputs } = abi
    if (Array.isArray(inputs)) abi.inputs = inputs.map(input => removeCustomProperties(input))
    return abi
  }

  const decodeLog = log => {
    let topics = [...log.topics]
    let event = decodeEventName(topics.shift())
    let abi = getEventAbi(event)
    if (event && abi) {
      const { signature } = getSignatureDataFromAbi(abi)
      log.event = event
      log.signature = signature
      log.abi = cleanAbi(abi)
      log.args = []
      const decoder = abi._decoder || decodeData
      let dataDecoded = decoder(log.data)
      if (!Array.isArray(dataDecoded)) dataDecoded = [dataDecoded]
      for (let i in abi.inputs) {
        let input = abi.inputs[i]
        let { indexed } = input
        let value = (indexed === true) ? topics[i] : dataDecoded[i - topics.length]
        let decoded = decodeInput(input, value)
        if (decoded) log.args.push(decoded)
      }
    }
    return log
  }
  return Object.freeze({ decodeLog, abi: fakeAbi })
}

export default NativeContractsEvents
