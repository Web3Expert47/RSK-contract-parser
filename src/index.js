import { ContractParser } from './lib/ContractParser'
import { BcSearch } from './lib/BcSearch'
import Contract from './lib/Contract'
import { getBridgeAbi } from './lib/nativeContracts/bridgeAbi'
const abi = { bridge: getBridgeAbi }
export { ContractParser, BcSearch, Contract, abi }
export default ContractParser

// HOTFIX: because the dependency @ethersproject/abi:5.7.0 spam the logs with 'duplicate definition' warning, this temporary fix should silence those messages until a newer version of the library fixes the issue
const originalConsoleLog = console.log
console.log = function (message) {
  if (!String(message).includes('duplicate definition')) {
    originalConsoleLog(message)
  }
}
