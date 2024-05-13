import { BTCLikeTransactionDetails, TransactionDetails } from "../types.js";
export declare class Explorer {
    evm(hash: string, token: any): Promise<TransactionDetails | Error>;
    tron(hash: string, token: any): Promise<TransactionDetails | Error>;
    bitcoin(hash: string): Promise<BTCLikeTransactionDetails | Error>;
    litecoin(hash: string): Promise<BTCLikeTransactionDetails | Error>;
    private getEVMCoinData;
    private getEVMTokenData;
    private getTronCoinData;
    private getTronTokenData;
    private getBitcoinCoinData;
    private getLitecoinCoinData;
}
