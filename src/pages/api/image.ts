import { createSVGfromTemplate } from '@app/utils/api/svg-template'
import getNetwork from '@app/utils/network'
import { createCanvas } from 'canvas'
import type { NextApiRequest, NextApiResponse } from 'next'
const btoa = require('btoa')

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const networkName = req.query.networkName as string
  const contractAddress = req.query.contractAddress as string
  const tokenId = req.query.tokenId as string

  try {
    const { provider } = getNetwork(networkName)
    const domainFontSize = getFontSize('tomokisun.dc')
    console.log('domainFontSize', domainFontSize)

    const svg = createSVGfromTemplate({
      domain: 'tomokisun.dc',
      domainFontSize: domainFontSize,
      isNormalized: true,
      isSubdomain: false,
    })
    const encodeUnicode = btoa(
      encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt(p1, 16));
      })
    )
    const imageUrl = 'data:image/svg+xml;base64,' + encodeUnicode

    const base64 = imageUrl.replace(
      'data:image/svg+xml;base64,',
      ''
    );
    const buffer = Buffer.from(base64, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml',
      'Content-Length': buffer.length,
    })
    res.end(buffer)
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

function getFontSize(name: string): number {
  const canvas = createCanvas(270, 270);
  const ctx = canvas.getContext('2d');
  ctx.font = "20px Plus Jakarta Sans, DejaVu Sans, Noto Color Emoji";
  const fontMetrics = ctx.measureText(name);
  // some nasty hack on calculation
  // 270 - (32.5 px padding both sides * 2)
  const fontSize = Math.floor(20 * (200 / fontMetrics.width));
  return fontSize < 28 ? fontSize : 28;
}