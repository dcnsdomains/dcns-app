import getNetwork from '@app/utils/network'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const networkName = req.query.networkName as string
  const contractAddress = req.query.contractAddress as string
  const tokenId = req.query.tokenId as string

  try {
    const { provider } = getNetwork(networkName)
    res.status(200).json({
      name: "tomokisun.eth",
      description: "tomokisun.eth, an ENS name.",
      name_length: 9,
      segment_length: 9,
      url: "https://app.ens.domains/name/tomokisun.eth",
      image: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x22b020a6b21db370e0985f7d6e389cdfd55e599c4baea2b4beca6e4c508e14a3/image",
      image_url: "https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x22b020a6b21db370e0985f7d6e389cdfd55e599c4baea2b4beca6e4c508e14a3/image"
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
