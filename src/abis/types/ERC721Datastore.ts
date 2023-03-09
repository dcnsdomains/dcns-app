/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export interface ERC721DatastoreInterface extends utils.Interface {
  functions: {
    "controllers(address)": FunctionFragment;
    "labelhash(address,uint256)": FunctionFragment;
    "name(address,uint256)": FunctionFragment;
    "nodehash(address,uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setController(address,bool)": FunctionFragment;
    "setRecord(address,uint256,string,bytes32,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "controllers"
      | "labelhash"
      | "name"
      | "nodehash"
      | "owner"
      | "renounceOwnership"
      | "setController"
      | "setRecord"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "controllers",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "labelhash",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "name",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "nodehash",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setController",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRecord",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "controllers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "labelhash", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nodehash", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setController",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setRecord", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "ControllerChanged(address,bool)": EventFragment;
    "NewLabelHash(address,uint256,bytes32)": EventFragment;
    "NewName(address,uint256,string)": EventFragment;
    "NewNodeHash(address,uint256,bytes32)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ControllerChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewLabelHash"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewName"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewNodeHash"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export interface ControllerChangedEventObject {
  controller: string;
  enabled: boolean;
}
export type ControllerChangedEvent = TypedEvent<
  [string, boolean],
  ControllerChangedEventObject
>;

export type ControllerChangedEventFilter =
  TypedEventFilter<ControllerChangedEvent>;

export interface NewLabelHashEventObject {
  addr: string;
  tokenId: BigNumber;
  labelhash: string;
}
export type NewLabelHashEvent = TypedEvent<
  [string, BigNumber, string],
  NewLabelHashEventObject
>;

export type NewLabelHashEventFilter = TypedEventFilter<NewLabelHashEvent>;

export interface NewNameEventObject {
  addr: string;
  tokenId: BigNumber;
  name: string;
}
export type NewNameEvent = TypedEvent<
  [string, BigNumber, string],
  NewNameEventObject
>;

export type NewNameEventFilter = TypedEventFilter<NewNameEvent>;

export interface NewNodeHashEventObject {
  addr: string;
  tokenId: BigNumber;
  nodehash: string;
}
export type NewNodeHashEvent = TypedEvent<
  [string, BigNumber, string],
  NewNodeHashEventObject
>;

export type NewNodeHashEventFilter = TypedEventFilter<NewNodeHashEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface ERC721Datastore extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ERC721DatastoreInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    controllers(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    labelhash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    name(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    nodehash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setController(
      controller: PromiseOrValue<string>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRecord(
      _addr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _labelhash: PromiseOrValue<BytesLike>,
      _nodehash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  controllers(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  labelhash(
    addr: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  name(
    addr: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  nodehash(
    addr: PromiseOrValue<string>,
    tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setController(
    controller: PromiseOrValue<string>,
    enabled: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRecord(
    _addr: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _name: PromiseOrValue<string>,
    _labelhash: PromiseOrValue<BytesLike>,
    _nodehash: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    controllers(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    labelhash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    name(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    nodehash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setController(
      controller: PromiseOrValue<string>,
      enabled: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRecord(
      _addr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _labelhash: PromiseOrValue<BytesLike>,
      _nodehash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ControllerChanged(address,bool)"(
      controller?: PromiseOrValue<string> | null,
      enabled?: null
    ): ControllerChangedEventFilter;
    ControllerChanged(
      controller?: PromiseOrValue<string> | null,
      enabled?: null
    ): ControllerChangedEventFilter;

    "NewLabelHash(address,uint256,bytes32)"(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      labelhash?: null
    ): NewLabelHashEventFilter;
    NewLabelHash(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      labelhash?: null
    ): NewLabelHashEventFilter;

    "NewName(address,uint256,string)"(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      name?: null
    ): NewNameEventFilter;
    NewName(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      name?: null
    ): NewNameEventFilter;

    "NewNodeHash(address,uint256,bytes32)"(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      nodehash?: null
    ): NewNodeHashEventFilter;
    NewNodeHash(
      addr?: PromiseOrValue<string> | null,
      tokenId?: PromiseOrValue<BigNumberish> | null,
      nodehash?: null
    ): NewNodeHashEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    controllers(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    labelhash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    nodehash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setController(
      controller: PromiseOrValue<string>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRecord(
      _addr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _labelhash: PromiseOrValue<BytesLike>,
      _nodehash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    controllers(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    labelhash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    nodehash(
      addr: PromiseOrValue<string>,
      tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setController(
      controller: PromiseOrValue<string>,
      enabled: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRecord(
      _addr: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _name: PromiseOrValue<string>,
      _labelhash: PromiseOrValue<BytesLike>,
      _nodehash: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
