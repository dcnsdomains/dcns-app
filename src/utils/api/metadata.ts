export interface MetadataInit {
  name            : string;
  description?    : string;
  tokenId         : string;
  networkId       : number;
  contractAddress : string;
}

export interface Metadata {
  name: string
  description?: string
  name_length?: number
  url?: string | null
  networkId: number
  contractAddress: string
}

export class Metadata {
  constructor({
    name,
    description,
    tokenId,
    networkId,
    contractAddress,
  }: MetadataInit) {

  }
}