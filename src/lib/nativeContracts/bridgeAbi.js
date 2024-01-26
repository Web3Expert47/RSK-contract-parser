import orchid from './bridge-orchid.json'
import wasabi from './bridge-wasabi.json'
import papyrus from './bridge-papyrus.json'
import iris from './bridge-iris.json'
import fingerroot from './bridge-fingerroot.json'
import hop from './bridge-hop.json'

export const RELEASES = {
  mainnet: [
    { height: 0, abi: orchid },
    { height: 1591000, abi: wasabi },
    { height: 2392700, abi: papyrus },
    { height: 3614800, abi: iris },
    { height: 4598500, abi: hop },
    { height: 5468000, abi: fingerroot }
  ],
  testnet: [
    { height: 0, abi: wasabi },
    { height: 863000, abi: papyrus },
    { height: 2060500, abi: iris },
    { height: 3103000, abi: hop },
    { height: 4015800, abi: fingerroot }
  ]
}

function findmatchingAbi (txHeight, abisWithHeight) {
  const lastIndex = abisWithHeight.length - 1

  if (txHeight >= abisWithHeight[lastIndex].height || txHeight === undefined) {
    return abisWithHeight[lastIndex].abi
  }

  for (let i = 1; i <= lastIndex; i++) {
    const previous = abisWithHeight[i - 1]
    if (txHeight >= previous.height && txHeight < abisWithHeight[i].height) {
      return previous.abi
    }
  }
}

export function getBridgeAbi ({ txBlockNumber, bitcoinNetwork }) {
  if (!['testnet', 'mainnet'].includes(bitcoinNetwork)) {
    throw new Error('Invalid bitcoin network')
  }

  return findmatchingAbi(txBlockNumber, RELEASES[bitcoinNetwork])
}
