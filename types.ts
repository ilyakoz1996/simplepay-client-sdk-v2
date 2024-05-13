/**
 * @value {1} Bitcoin (BTC)
 * @value {2} Litecoin (LTC)
 * @value {3} Ethereum (ETH)
 * @value {4} Tether (USDT) on the Ethereum network (ERC20)
 * @value {5} Binance Coin (BNB)
 * @value {6} Tether (USDT) on the Binance Smart Chain (BEP20)
 * @value {7} TRON (TRX)
 * @value {8} Tether (USDT) on the TRON network (TRC20)
 */
export type TokenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export type EventCallback<T> = (data: T) => void;
export type ContractEvent =
  | "InvoiceIssued"
  | "InvoiceProcessing"
  | "InvoiceSuccess"
  | "InvoiceRejected";

export interface ParsedContractInvoice {
  invoiceId?: string,
  createdAt?: number,
  updatedAt?: number | null,
  merchantId: string,
  projectId: string,
  productId: string | null,
  tokenId: TokenId,
  tokenAmount: string,
  tokenPrice: string,
  from: string,
  to: string,
  clientEmail: string,
  transactionId?: string | null;
  status?: any;
}

export interface TransactionDetails {
    timestamp: number;
    transactionId: string;
    fromAddress: string | null;
    toAddress: string | null;
    amount: number;
    currentBlock: number;
    txBlock: number;
    confirmations: number;
}

export interface BTCLikeTransactionDetails {
  timestamp: number,
  transactionId: string;
  inputs: { address: string | null, amount: number }[];
  outputs: { address: string | null, amount: number }[];
  currentBlock: number;
  txBlock: number;
  confirmations: number;
}

export type TokenType = 'native' | 'ERC20' | 'BEP20' | 'TRC20'
export type TokenNetwork = 'bitcoin' | 'litecoin' | 'ethereum' | 'tron' | 'bsc'

export type Token = {
  id: TokenId,
  contractAddress: 'native' | string,
  img: string,
  title: string,
  stable: boolean,
  price: number,
  decimals: number,
  type: TokenType,
  symbol: string,
  network: TokenNetwork
}



// History class

export interface InvoiceHistoryFilters {
    status?: string | string[],
    productId?: string | string[],
    address?: string,
}