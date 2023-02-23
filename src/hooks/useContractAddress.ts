import { useChainId } from 'wagmi'

export declare type ContractName = 'NamedRegistrar' | 'RegistrarController' | 'PublicResolver' | 'DcNSRegistry' | 'ReverseRegistrar'

const contractAddresses: { [key: number]: { [key: string]: string } } = {
  2000: {
    'NamedRegistrar': '',
    'RegistrarController': '',
    'PublicResolver': '',
    'DcNSRegistry': '',
    'ReverseRegistrar': '',
  },
  568: {
    'NamedRegistrar': '0x2eDd425Fe1AF10280349e687f04583D06A2830c3',
    'RegistrarController': '0x058374D022868525A1d603D0AbA5Dfd65E32d130',
    'PublicResolver': '0xc909B2b9Cd04b298c4b4578c8012CA79baf7267c',
    'DcNSRegistry': '0xdcB09b788c0FFa486e6458C14F37b29DE24046d2',
    'ReverseRegistrar': '',
  }
}

export const useContractAddress = (contractName: ContractName)=> {
  const chainId = useChainId()
  return contractAddresses[chainId][contractName]
}