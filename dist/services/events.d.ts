import { ContractEvent, EventCallback, ParsedContractInvoice } from "../types.js";
import { Config } from "./config.js";
export declare class Events {
    private config;
    constructor(config: Config);
    /**
     * Sets up a listener for the specified contract event.
     * @param {ContractEvent} eventName The name of the contract event to listen for.
     * @param {Function} callback The callback function to be executed when the event is emitted.
     * @throws Throws an error if setting up the event listener fails.
     */
    on<T extends ParsedContractInvoice>(eventName: ContractEvent, callback: EventCallback<T>): Promise<void>;
}
