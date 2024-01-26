import Nod3 from '@rsksmart/nod3'

export const nod3Connect = (url) => {
  url = url || process.env['RSK_NODE_URL'] || 'http://localhost:4444'
  return new Nod3(
    new Nod3.providers.HttpProvider(url)
  )
}

export default nod3Connect()
