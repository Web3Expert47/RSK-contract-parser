
import { isAddress } from '@rsksmart/rsk-utils'

export const defaultNativeContracts = {
  bridge: '0x0000000000000000000000000000000001000006',
  remasc: '0x0000000000000000000000000000000001000008'
}

export const parseNativeContracts = nativeContracts => {
  if (typeof nativeContracts !== 'object') throw new TypeError(`nativeContracts must be an object`)
  if (Object.keys(nativeContracts) < 1) throw new Error(`Empty native contracts list`)
  for (let name in nativeContracts) {
    let address = nativeContracts[name]
    if (!isAddress(address)) throw new Error(`Address of ${name} is not an address`)
    nativeContracts[name] = address.toLowerCase()
  }
  return nativeContracts
}

export function NativeContracts ({ nativeContracts } = {}) {
  nativeContracts = parseNativeContracts(nativeContracts || defaultNativeContracts)
  const names = Object.keys(nativeContracts)

  const getNativeContractAddress = contractName => {
    return nativeContracts[contractName]
  }
  const getNativeContractName = address => {
    address = address.toLowerCase()
    return names.find(name => nativeContracts[name] === address)
  }

  const isNativeContract = address => !!getNativeContractName(address)

  const list = () => nativeContracts

  return Object.freeze({ getNativeContractAddress, getNativeContractName, isNativeContract, list })
}

export default NativeContracts
