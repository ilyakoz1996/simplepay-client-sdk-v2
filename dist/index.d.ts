import { ContractEvent } from './types.js';
export declare class SimplePayClient {
    private config;
    private explorer;
    private history;
    private events;
    constructor(merchantId: string, projectId: string);
    getInvoice(invoiceId: string): Promise<void>;
    getInvoices(filters?: {
        status?: string;
        address?: string;
    }): Promise<any[]>;
    getTxData(tokenId: number, txHash: string): Promise<Error | import("./types.js").TransactionDetails | import("./types.js").BTCLikeTransactionDetails | undefined>;
    subscribe(event: ContractEvent, callback: any): Promise<void>;
}
