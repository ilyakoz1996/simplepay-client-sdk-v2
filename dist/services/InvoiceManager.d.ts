import { Config } from "./config.js";
export declare class InvoiceManager {
    private config;
    constructor(config: Config);
    fetchInvoices(): Promise<any[]>;
    validateAndSendPostRequest(url: string, body: {
        tokenId: string;
        amount: number;
        from: string;
        productId?: string;
    }): Promise<any>;
}
