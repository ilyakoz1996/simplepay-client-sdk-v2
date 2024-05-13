import { Config } from "./config.js";
export declare class TransactionManager {
    private config;
    constructor(config: Config);
    getTransactionData(transactionHash: string, network: string): Promise<any>;
}
