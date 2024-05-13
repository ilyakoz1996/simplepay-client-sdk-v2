import { Config } from "./config.js";
export declare class History {
    private config;
    constructor(config: Config);
    getInvoice(id: string): Promise<void>;
    /**
 * Parses event arguments and invoice data into a structured format.
 * @param {InvoiceStatus} type The invoice status type.
 * @param {any} invoice The raw event arguments or invoice data.
 * @returns {ParsedContractInvoice} The parsed contract invoice.
 */
    private parseEventArgs;
    /**
 * Fetches and parses event logs based on the given event filter.
 * @private
 * @param {ethers.ContractEventName} eventFilter The ethers event filter to apply.
 * @param {number} fromBlock The block number from which to start fetching events.
 * @param {InvoiceStatus} status The status of the invoice to set for each fetched event.
 * @returns {Promise<ParsedContractInvoice[]>} An array of parsed contract invoices.
 */
    private fetchAndParseEvents;
    /**
 * Fetches invoices from the smart contract based on the specified filter criteria.
 * @param {InvoicesFilter} invoiceFilter The filter criteria for fetching invoices (default: 'all').
 * @returns {Promise<ParsedContractInvoice[]>} An array of filtered and combined invoices.
 * @throws Throws an error if fetching invoices fails.
 */
    getInvoices(invoiceFilter?: any, since?: Date): Promise<any[]>;
    private countBlocksFromTimestamp;
    private generateBlockRanges;
}
