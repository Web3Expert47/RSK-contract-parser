export const ABI_SIGNATURE = '__signatureData'

export const INTERFACE_ID_BYTES = 4

export const bitcoinNetworks = {
  TESTNET: 'testnet',
  MAINNET: 'mainnet',
  REGTEST: 'regtest'
}

export const bitcoinRskNetWorks = {
  31: bitcoinNetworks.TESTNET,
  30: bitcoinNetworks.MAINNET,
  33: bitcoinNetworks.REGTEST
}

export const contractsInterfaces = {
  ERC20: 'ERC20',
  ERC677: 'ERC677',
  ERC165: 'ERC165',
  ERC721: 'ERC721'
}

const ci = contractsInterfaces

export const tokensInterfaces = [
  ci.ERC20,
  ci.ERC677,
  ci.ERC721
]
