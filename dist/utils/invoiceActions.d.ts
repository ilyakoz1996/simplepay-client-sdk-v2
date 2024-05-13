import { ParsedContractInvoice } from "../types";
/**
 * Combines multiple invoices by their ID, ensuring only the latest version of each invoice is retained.
 *
 * @param {ParsedContractInvoice[]} invoices - An array of parsed contract invoices.
 * @returns {ParsedContractInvoice[]} - An array of combined invoices, with duplicates removed.
 */
export declare const combineInvoicesById: (invoices: ParsedContractInvoice[]) => ParsedContractInvoice[];
/**
* Parses event arguments data into a structured invoice format.
*
* @param {InvoiceStatus} type - The status type of the invoice event.
* @param {any} invoice - The event arguments or invoice data.
* @returns {ParsedContractInvoice} - The parsed contract invoice.
*/
export declare const parseEventArgsData: (type: any, invoice: any) => {
    invoiceId: any;
    createdAt: number;
    updatedAt: number;
    merchantId: any;
    projectId: any;
    productId: any;
    tokenId: number;
    tokenAmount: number;
    tokenPrice: number;
    from: any;
    to: any;
    clientEmail: any;
    transactionId: any;
    status: any;
};
