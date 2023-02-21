import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { ethers } from 'ethers';
import { Metadata } from './metadata'

const DC_NAMEHASH = 'a'

const contractAddressToLabelHashMap: { [key: string]: string } = {
  // dogechain
  '': DC_NAMEHASH,

  // dogechain-testnet
  '0xdcB09b788c0FFa486e6458C14F37b29DE24046d2': DC_NAMEHASH,
}

export default async function getDomain(
  provider: StaticJsonRpcProvider,
  networkName: string,
  contractAddress: string,
  tokenId: string,
): Promise<Metadata> {

  let hexId: string, intId;
  if (!tokenId.match(/^0x/)) {
    intId = tokenId
    hexId = ethers.utils.hexZeroPad(
      ethers.utils.hexlify(ethers.BigNumber.from(tokenId)),
      32
    )
  } else {
    intId = ethers.BigNumber.from(tokenId).toString()
    hexId = tokenId
  }

  const labelHash = contractAddressToLabelHashMap[contractAddress.toLowerCase()]

  const metadata = new Metadata({
    name: 'tomokisun.dc, an DcNS name.',
    description: 'tomokisun.dc, an DcNS name.',
    tokenId: hexId,
    networkId: provider._network.chainId,
    contractAddress,
  })
  return metadata
}