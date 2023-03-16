import { getDcRegistrarControllerContract } from '@app/contracts/contracts'
import { JsonRpcSigner } from '@ethersproject/providers'
import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'
import { useQuery, useSendTransaction, useSigner } from 'wagmi'
import { useContractAddress } from './useContractAddress'
import { useProvider } from './useProvider'
import { useRentPrice } from './useRentPrice'

export type TxError = {
  reason: string
  code: string
  method: string
  transaction: object
  error: Error
}

export type RecentTransaction = {
  hash: string
  wait: Promise<ethers.providers.TransactionReceipt>
}

export const useSendRegister = (
  name: string,
  addr: string,
  _years: number
) => {
  const years = BigNumber.from(31556951).mul(_years)

  const provider = useProvider()
  const resolverAddr = useContractAddress('PublicResolver')
  const controllerAddr = useContractAddress('DcRegistrarController')
  const controller = getDcRegistrarControllerContract(controllerAddr, provider)
  const { data: signer } = useSigner()
  const { price, isLoading: priceLoading } = useRentPrice(name, years)

  const {
    data: request,
    isLoading: requestLoading,
    error: _requestError,
  } = useQuery(['prepareTx', name, addr, years], async () => {
    const populatedTransaction = await controller.connect(signer as JsonRpcSigner).populateTransaction.registerWithConfig(
      name,
      addr,
      years,
      resolverAddr,
      addr,
      {
        gasLimit: ethers.utils.parseEther('1'),
        value: price,
      }
    )

    let gasLimit = await signer!.estimateGas(populatedTransaction)
    // gasLimit = gasLimit.add(BigNumber.from(45000))
    
    return {
      ...populatedTransaction,
      to: populatedTransaction.to as `0x${string}`,
      gasLimit,
      value: price,
    }
  },
  {
    cacheTime: 0,
    enabled: !!signer && !!price && !priceLoading,
  })

  const [recentTransaction, addRecentTransaction] = useState<RecentTransaction | null>(null)

  const {
    isLoading: transactionLoading,
    error: transactionError,
    sendTransaction,
  } = useSendTransaction({
    mode: 'prepared',
    request,
    onSuccess: (tx) => {
      addRecentTransaction({
        hash: tx.hash,
        wait: tx.wait(),
      })
    }
  })

  const requestError = _requestError as TxError | null

  return {
    sendTransaction,
    requestLoading,
    transactionLoading,
    requestError,
    transactionError,
    recentTransaction,
  }
}
