import getNetwork from '@/utils/network'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const networkName = req.query.networkName as string
  const contractAddress = req.query.contractAddress as string
  const tokenId = req.query.tokenId as string

  try {
    const { provider } = getNetwork(networkName)

    res.status(200).json({
      networkName,
      contractAddress,
      tokenId,
    })
  } catch (error: any) {
    const errorCode = (error?.code && Number(error.code)) || 500
    if (errorCode !== 404) {
      return res.status(errorCode).json({
        message: error.message,
      })
    }
    return res.status(404).json({
      message: 'No results found.',
    })
  }
}
