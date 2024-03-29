import { useChainId } from 'wagmi'

export declare type ContractName = 'DcNSRegistry' | 'PublicResolver' | 'NamedRegistrar' | 'DcRegistrarController' | 'ReverseRegistrar' | 'ERC721Datastore'

const contractAddresses: { [key: number]: { [key: string]: string } } = {
  2000: {
    'DcNSRegistry': '0xeDD7631fa23382780206f46f978120066253010e',
    'PublicResolver': '0x3CCEd58C134511CA8D410118255f81774d5BE24A',
    'NamedRegistrar': '0xAbB9730D69396ac28DB81B6b43F0D74803c4E3AD',
    'DcRegistrarController': '0xC348f7A377B21933e465f2E9E73A91D6Ee9313Eb',
    'ReverseRegistrar': '0x096B3e5a85583fb01EFB53717e1B6862Cd28ba41',
    'ERC721Datastore': '0x337EEc7a4156461f159CAb977f2627870AbB50c2',
  },
  568: {
    'DcNSRegistry': '0xD007B8EF92D6B17e8f7F6d0A4f774886670679C4',
    'PublicResolver': '0x395a96b58574b4138f4F0B9d4A28935D1107732e',
    'NamedRegistrar': '0xbEE8EfC14b2fe020c1Eb7F5EE810Dffa27d638eD',
    'DcRegistrarController': '0x9060b465DfEf00d42F2e946dD817126A95256Ac2',
    'ReverseRegistrar': '0xef37430185AB743c769fa988Ba6b05dF9AfE4f47',
    'ERC721Datastore': '0x5272a9561234136Ea14FD5D7587D99c231dCd653',
  }
}

export const useContractAddress = (contractName: ContractName)=> {
  const chainId = useChainId()
  return contractAddresses[chainId][contractName]
}