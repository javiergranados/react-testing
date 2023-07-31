import type { NextApiRequest, NextApiResponse } from 'next'

function sleep1Second() {
  return new Promise((res) => {
    setTimeout(res, 1000)
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<string[] | { message: string }>) {
  await sleep1Second()

  switch (req.query.country) {
    case 'Germany':
      return res.status(200).json(['Mercedes', 'BMW', 'Audi', 'Porsche', 'VW'])
    case 'France':
      return res.status(200).json(['Peugeot', 'Citroen', 'Renault', 'Alpine'])
    case 'Italy':
      return res.status(500).json({ message: 'No italian cars found' })
    default:
      return res.status(500).json({ message: 'Unknown country' })
      break
  }
}
