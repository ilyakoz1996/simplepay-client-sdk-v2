import { Config } from "./config.js";
export declare class PaymentProcessor {
    private config;
    constructor(config: Config);
    processPayment(tokenId: string, amount: number, productId: string): Promise<any>;
}
