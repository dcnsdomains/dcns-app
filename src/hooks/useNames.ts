import { getNamedRegistrarContract } from '@app/contracts/contracts'
import { BigNumber } from 'ethers'
import { useQuery } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'

const isAddressesEqual = (addr1: string, addr2: string) => {
  return addr1.toLowerCase() == addr2.toLowerCase()
}

export const useNames = (address: string) => {
  const provider = useProvider()
  const contractAddr = useContractAddress('NamedRegistrar')
  const token = getNamedRegistrarContract(contractAddr, provider)

  // ホルダーの過去のtokenIdの送信イベントログすべて取得する。
  const { data: sentLogs } = useQuery(['sentLogs', address], () => token.queryFilter(token.filters.Transfer(address, null)))

  // ホルダーの過去のtokenIdの受信イベントログすべて取得する。
  const { data: receivedLogs } = useQuery(['receivedLogsa', address], () => token.queryFilter(token.filters.Transfer(null, address)))

  // ログを結合し、EventLogを時間が古いものから順に時系列で並べる。
  const logs = sentLogs?.concat(receivedLogs ?? []).sort((a, b) => a.blockNumber - b.blockNumber || a.transactionIndex - b.transactionIndex) ?? []

  // ログを操作して、ホルダーが最終的に持っている最新のtokenIdを取得する
  const owned = new Set<BigNumber>()

  for (const log of logs) {
    if (log.args) {
      const { from, to, tokenId } = log.args
      if (isAddressesEqual(to, address)) {
        owned.add(tokenId)
      } else if (isAddressesEqual(from, address)) {
        owned.delete(tokenId)
      }
    }
  }

  return {
    names: Array.from(owned),
  }
}