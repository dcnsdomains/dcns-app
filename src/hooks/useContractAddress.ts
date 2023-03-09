import { useChainId } from 'wagmi'

export declare type ContractName = 'DcNSRegistry' | 'PublicResolver' | 'NamedRegistrar' | 'DcRegistrarController' | 'ReverseRegistrar' | 'ERC721Datastore'

const contractAddresses: { [key: number]: { [key: string]: string } } = {
  2000: {
    'DcNSRegistry': '',
    'PublicResolver': '',
    'NamedRegistrar': '',
    'DcRegistrarController': '',
    'ReverseRegistrar': '',
    'ERC721Datastore': '',
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