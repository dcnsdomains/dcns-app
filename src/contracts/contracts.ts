import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { Contract } from 'ethers'

import { abi as NamedRegistrarContract } from '@/contracts/abis/NamedRegistrar.json'
import { abi as PriceOracleContract } from '@/contracts/abis/PriceOracle.json'
import { abi as PublicResolverContract } from '@/contracts/abis/PublicResolver.json'
import { abi as RegistrarControllerContract } from '@/contracts/abis/RegistrarController.json'
import getNetwork from '@/utils/network';

function getNamedRegistrarContract(address: string, provider: StaticJsonRpcProvider) {
  return new Contract(address, NamedRegistrarContract, provider)
}

function getPriceOracleContract(address: string, provider: StaticJsonRpcProvider) {
  return new Contract(address, PriceOracleContract, provider)
}

function getPublicResolverContract(address: string, provider: StaticJsonRpcProvider) {
  return new Contract(address, PublicResolverContract, provider)
}

function getRegistrarControllerContract(address: string, provider: StaticJsonRpcProvider) {
  return new Contract(address, RegistrarControllerContract, provider)
}
