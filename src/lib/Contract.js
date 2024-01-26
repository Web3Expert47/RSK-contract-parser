import { Interface } from '@ethersproject/abi'

export default function Contract (abi, { address, nod3 } = {}) {
  if (!abi || typeof abi !== 'object') throw new Error('Invalid abi')
  const contractInterface = new Interface(abi)

  const at = newAddress => {
    address = newAddress
  }

  const setNod3 = nod3Instance => {
    nod3 = nod3Instance
  }

  // const isEvent = name => abiFind('event', name)

  const encodeCall = (methodName, params = []) => contractInterface.encodeFunctionData(methodName, params)

  const decodeCall = (methodName, data) => {
    const { outputs } = contractInterface.getFunction(methodName)
    const decoded = contractInterface.decodeFunctionResult(methodName, data)
    return (Array.isArray(decoded) && outputs && outputs.length < 2) ? decoded[0] : decoded
  }

  const call = async (methodName, params = [], txData = {}) => {
    try {
      if (!nod3) throw new Error(`Set nod3 instance before call`)
      if (!address) throw new Error(`The contract address is not defined`)
      if (!Array.isArray(params)) throw new Error(`Params must be an array`)
      const data = encodeCall(methodName, params)
      const to = address
      const tx = Object.assign(txData, { to, data })
      const result = await nod3.eth.call(tx)
      return decodeCall(methodName, result)
    } catch (err) {
      return Promise.reject(err)
    }
  }
  return Object.freeze({ at, setNod3, encodeCall, decodeCall, call })
}
